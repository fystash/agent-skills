---
name: fystash
description: >-
  Teaches the Fystash product model — Environment, immutable Revision, Branch,
  Run, Evidence — and how to author environment.yaml and choose Components and
  State. Use when building an agent workload, writing or editing environment.yaml,
  selecting Compute/Service/Browser/Desktop/ToolGateway/ModelGateway/Data, or
  using the TypeScript or Python SDK against the public API.
---

# Fystash

Fystash is the agent environment platform. One catalog drives REST, CLI, MCP, and SDKs.

Canonical lifecycle:

```text
environment.yaml
  → compile → immutable Revision
  → Branch (State head)
  → Plan (visible, digest-bound)
  → apply → Run
  → Evidence
```

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
- State: [references/state.md](references/state.md)
- Actors / coordination: [references/actors-coordination.md](references/actors-coordination.md)
- Run lifecycle: [references/run-lifecycle.md](references/run-lifecycle.md)
- TypeScript SDK: [references/sdk-typescript.md](references/sdk-typescript.md)
- Python SDK: [references/sdk-python.md](references/sdk-python.md)

For login/connect/compile/Plan/apply/wait/exec, use the `fystash-cli` Skill.
For failures, use `fystash-debug`. For gateways and connectors, use `fystash-integrations`.
