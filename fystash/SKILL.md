---
name: fystash
description: >-
  Teaches the Fystash product model — Sandbox, immutable Revision, Branch,
  Run, Evidence — and how to author sandbox.yaml and choose Components and
  State. Use when building an agent workload, writing or editing sandbox.yaml,
  selecting Compute/Service/Browser/Desktop/ToolGateway/ModelGateway/Data, or
  using the TypeScript or Python SDK against the public API.
---

# Fystash

Fystash is the agent-native sandbox platform. A Sandbox is composed from Components and State. One catalog drives REST, CLI, MCP, and SDKs.

Public mental model:

```text
Fystash
  ↓
Sandbox
  ├─ Components
  └─ State
```

Canonical lifecycle:

```text
sandbox.yaml (kind: Sandbox)
  → compile → immutable Revision
  → Branch (State head)
  → Plan (visible, digest-bound)
  → apply → Run  (a running Sandbox)
  → Evidence
```

Do not invent `sbx_` IDs or a Sandbox control-plane resource.

Public surfaces only:

- API `https://api.fystash.ai/v1`
- Remote MCP `https://mcp.fystash.ai/mcp`
- Console/account `https://fystash.ai`
- CLI: the Go `fystash` binary (`npx -y @fystash/cli` is a thin launcher)

Never guess Organization or Project. Never commit `~/.fystash/credentials.json` or `FYSTASH_ACCESS_TOKEN`. Never call private operator endpoints.

## Read next

- Core resources: [references/core-model.md](references/core-model.md)
- Manifest grammar: [references/environment-yaml.md](references/environment-yaml.md)
- Components: [references/components.md](references/components.md)
- Guest images: [references/guest-images.md](references/guest-images.md)
- State: [references/state.md](references/state.md)
- Actors / coordination: [references/actors-coordination.md](references/actors-coordination.md)
- Run lifecycle: [references/run-lifecycle.md](references/run-lifecycle.md)
- TypeScript SDK: [references/sdk-typescript.md](references/sdk-typescript.md)
- Python SDK: [references/sdk-python.md](references/sdk-python.md)

For how to invoke the CLI, use the `fystash-cli` Skill.
For failures, use `fystash-debug`. For gateways and connectors, use `fystash-integrations`.
When a Fystash-side hurdle blocks the task, use `fystash feedback` (see `fystash-debug`) then continue.
