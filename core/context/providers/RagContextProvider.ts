import {
  ContextItem,
  ContextProviderDescription,
  ContextProviderExtras,
  ContextSubmenuItem,
  LoadSubmenuItemsArgs,
} from "../../index.js";
import { BaseContextProvider } from "../index.js";
import { retrieveContextItemsFromEmbeddings } from "../retrieval/retrieval.js";

class RagContextProvider extends BaseContextProvider {
  static description: ContextProviderDescription = {
    title: "rag",
    displayTitle: "RAG 검색",
    description: "RAG 임베딩을 사용하여 관련 정보를 검색합니다",
    type: "submenu",
    renderInlineAs: "📚",
  };

  async getContextItems(
    query: string,
    extras: ContextProviderExtras,
  ): Promise<ContextItem[]> {
    // query는 실제로는 submenu에서 선택된 그룹명이 됩니다
    const groupName = query;

    // 실제 RAG 서버에 검색 요청
    try {
      const apiBaseUrl = this.options?.apiBaseUrl || "http://localhost:8001";
      const ragSearchUrl = `${apiBaseUrl}/api/v1/search`;

      console.log(
        `RAG 검색 API 호출: ${ragSearchUrl}, 그룹: ${groupName}, 쿼리: ${extras.fullInput}`,
      );

      const response = await fetch(ragSearchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: extras.fullInput, // 사용자의 전체 입력을 검색 쿼리로 사용
          group_name: groupName, // 선택된 그룹명 (Swagger API 스펙: group_name)
          k: this.options?.maxResults ?? 10, // 결과 개수 (Swagger API 스펙: k)
        }),
        signal: AbortSignal.timeout(10000), // 10초 타임아웃
      });

      if (!response.ok) {
        throw new Error(
          `RAG API 호출 실패: ${response.status} ${response.statusText}`,
        );
      }

      const ragResults = await response.json();

      if (!Array.isArray(ragResults) || ragResults.length === 0) {
        return [
          {
            description: `RAG 검색 결과 없음 (그룹: ${groupName})`,
            content: `"${groupName}" 그룹에서 "${extras.fullInput}"에 대한 RAG 검색 결과를 찾을 수 없습니다.`,
            name: `RAG: ${groupName} - 결과 없음`,
          },
        ];
      }

      console.log(`RAG 검색 성공: ${ragResults.length}개 결과`, ragResults);

      // RAG 서버 응답을 ContextItem 형태로 변환
      return ragResults.map((result, index) => ({
        name: `RAG: ${groupName} (${index + 1}) - ${result.title || result.filename || `결과 ${index + 1}`}`,
        description: `${groupName} 그룹 RAG 검색: ${result.title || result.filename || result.description || ""}`,
        content: result.content || result.text || JSON.stringify(result),
        uri: result.filepath
          ? {
              type: "file" as const,
              value: result.filepath,
            }
          : undefined,
      }));
    } catch (error) {
      console.error("RAG 검색 중 오류 발생:", error);

      // API 호출 실패 시 fallback으로 기존 임베딩 검색 사용
      console.log("RAG API 실패, 로컬 임베딩 검색으로 fallback");

      const fallbackResults = await retrieveContextItemsFromEmbeddings(
        extras,
        {
          nRetrieve: this.options?.nRetrieve ?? 15,
          nFinal: this.options?.nFinal ?? 4, // 4개로 제한
          useReranking: this.options?.useReranking ?? true,
        },
        undefined,
      );

      return fallbackResults.map((item, index) => ({
        ...item,
        name: `RAG Fallback: ${groupName} (${index + 1})`,
        description: `로컬 검색 결과 - ${groupName}: ${item.description}`,
      }));
    }
  }

  async loadSubmenuItems(
    args: LoadSubmenuItemsArgs,
  ): Promise<ContextSubmenuItem[]> {
    try {
      // Backend API에서 group name 목록 가져오기
      const groups = await this.fetchGroupNamesFromAPI();

      return groups.map((groupName: string) => ({
        id: groupName,
        title: `${groupName}`,
        description: `${groupName}`,
      }));
    } catch (error) {
      console.error("그룹 목록 로드 중 오류:", error);

      // Fallback: 기본 그룹 목록 사용
      const defaultGroups = this.options?.groups || [
        "authentication",
        "database",
        "api",
        "ui-components",
        "tests",
        "utils",
        "models",
        "services",
        "controllers",
        "middleware",
      ];

      return defaultGroups.map((groupName: string) => ({
        id: groupName,
        title: `${groupName}(기본값)`,
        description: `${groupName} (기본값)`,
      }));
    }
  }

  private async fetchGroupNamesFromAPI(): Promise<string[]> {
    try {
      // 설정에서 API URL 가져오기 (기본값: localhost:8001)
      const apiBaseUrl = this.options?.apiBaseUrl || "http://localhost:8001";
      const apiUrl = `${apiBaseUrl}/api/v1/groups`;

      console.log(`RAG 그룹 목록 API 호출: ${apiUrl}`);

      // Backend API 호출
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // 30초 타임아웃 설정 (RAG API 응답 시간이 매우 느림)
        signal: AbortSignal.timeout(30000),
      });

      if (!response.ok) {
        throw new Error(
          `API 호출 실패: ${response.status} ${response.statusText}`,
        );
      }

      const groups: string[] = await response.json();

      if (!Array.isArray(groups)) {
        throw new Error("API 응답이 배열 형태가 아닙니다");
      }

      console.log(`RAG 그룹 목록 로드 성공: ${groups.length}개 그룹`, groups);
      return groups;
    } catch (error) {
      console.error("Backend API 호출 오류:", error);
      throw error;
    }
  }
}

export default RagContextProvider;
