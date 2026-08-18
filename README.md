# Fystash Agent Skills

Canonical public Skills for [Fystash](https://fystash.ai), the agent-native sandbox platform.

This repository is the **only** public Skills source (`fystash/agent-skills`, Apache-2.0).
The Go CLI remains the execution surface (`fystash skills install`).

## Skills

| Skill | Use when |
|---|---|
| [`fystash`](fystash/SKILL.md) | Authoring `sandbox.yaml`, choosing Components/State, SDK usage, core lifecycle |
| [`fystash-cli`](fystash-cli/SKILL.md) | login, connect, compile, Plan/apply, wait, exec, Evidence |
| [`fystash-debug`](fystash-debug/SKILL.md) | CLI/API/MCP failures, using canonical error codes |
| [`fystash-integrations`](fystash-integrations/SKILL.md) | ToolGateway, ModelGateway, managed Data, brokered credentials |

## Install

```bash
fystash skills install
```

Or copy the four skill directories into a client skills path (for example `.cursor/skills/` or `~/.claude/skills/`).

## Public surfaces only

Use `https://api.fystash.ai/v1`, `https://mcp.fystash.ai/mcp`, and `https://fystash.ai`.
Never guess Project identity. Never commit credentials. Never call private operator endpoints.

## Validation

```bash
node scripts/validate.mjs
```

W8-9 may wrap these Skill directories as a Codex plugin using `distribution/codex-plugin.json` without duplicating Skill bodies.
