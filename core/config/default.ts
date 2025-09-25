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
  { provider: "rag", params: { apiBaseUrl: "http://10.34.238.61:8001/rag" } },
];

export const defaultModelVsCode: NonNullable<ConfigYaml["models"]>[number][] = [
  {
    name: "GPT-4o Mini",
    provider: "openai",
    model: "gpt-4o-mini",
    apiBase: "http://10.34.238.61:8000/v1",
    apiKey: "",
    roles: ["chat", "edit", "apply"],
    defaultCompletionOptions: {
      temperature: 0.7,
      maxTokens: 1500,
      stream: true,
    },
    requestOptions: {
      extraBodyProperties: { context: "continue.dev", group_name: "MyTeamA" },
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
