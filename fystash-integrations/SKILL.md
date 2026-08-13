---
name: fystash-integrations
description: >-
  Configures Fystash ToolGateway, ModelGateway, managed Data, mock/record/replay/live
  connector modes, and brokered credentials. Use when an Environment needs outbound
  tools, model routes, Database/ObjectStore/Queue, external connectors, or when
  credentials must stay out of Compute.
---

# Fystash integrations

Integrations are Environment Components and Bindings, not guest SDK plugins.

Rules:

1. Credentials are Project Secrets delivered by Binding class `brokered`. They never enter Compute.
2. Connector mode is explicit: `deny` / `mock` / `record` / `replay` / `live`.
3. Direct guest egress is not a substitute for a Gateway (`network.default: deny`).
4. Writes may need exact-call approval and idempotency. Uncertain writes return `EXTERNAL_WRITE_UNCERTAIN` — do not silently retry.

## Read next

- ToolGateway: [references/tool-gateway.md](references/tool-gateway.md)
- ModelGateway: [references/model-gateway.md](references/model-gateway.md)
- Managed Data: [references/managed-data.md](references/managed-data.md)
- Modes: [references/mock-replay-record-live.md](references/mock-replay-record-live.md)
- Credentials: [references/brokered-credentials.md](references/brokered-credentials.md)

For compile/Plan/apply, use `fystash-cli`. For provider error codes, use `fystash-debug`.
