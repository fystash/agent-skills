# TypeScript SDK

Package `@fystash/sdk`. The client is generated from the operation catalog. Do not hand-write extra operations.

```ts
import { httpClient } from "@fystash/sdk";

const client = httpClient("https://api.fystash.ai/v1", {
  accessToken: process.env.FYSTASH_ACCESS_TOKEN,
  projectId: process.env.FYSTASH_PROJECT_ID,
});

const revision = await client.compileEnvironment({
  manifest: yamlText,
});
```

`callOperation(client, operationId, input)` exists for catalog-driven callers (CLI/MCP). Unknown operation ids fail loudly.

Use the same public API base as the CLI. Never point an SDK at a private operator URL.
