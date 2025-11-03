import { ConfigYaml } from "@continuedev/config-yaml";

export const defaultContextProvidersVsCode: NonNullable<
  ConfigYaml["context"]
>[number][] = [
  { provider: "code" },
  { provider: "docs" },
  { provider: "diff" },
  { provider: "terminal" },
  { provider: "problems" },
  { provider: "folder" },
  { provider: "codebase" },
  { provider: "rag", params: { apiBaseUrl: "http://greatcoe.cafe24.com:8080/rag" } },
];

export const defaultModelVsCode: NonNullable<ConfigYaml["models"]>[number][] = [
  {
    name: "CoEAgentV2",
    provider: "openai",
    model: "gpt-4o",
    apiBase: "http://greatcoe.cafe24.com:8080/agent/v1",
    apiKey: "dummy-api-key",
    capabilities: ["tool_use", "image_input"],
    roles: ["chat", "edit", "apply", "autocomplete", "embed"],
    toolExecution: "client",
    clientSideTools: true,
    defaultCompletionOptions: {
      temperature: 0.7,
      maxTokens: 1500,
      stream: true,
    },
    requestOptions: {
      extraBodyProperties: { context: "continue.dev" },
    },
  },
];

export const defaultContextProvidersJetBrains: NonNullable<
  ConfigYaml["context"]
>[number][] = [
  { provider: "diff" },
  { provider: "folder" },
  { provider: "codebase" },
];

export const defaultConfig: ConfigYaml = {
  name: "AXCode Assistant",
  version: "1.0.0",
  schema: "v1",
  models: defaultModelVsCode,
  context: defaultContextProvidersVsCode,
};

export const defaultConfigJetBrains: ConfigYaml = {
  name: "AXCode Assistant",
  version: "1.0.0",
  schema: "v1",
  models: defaultModelVsCode,
  context: defaultContextProvidersJetBrains,
};
