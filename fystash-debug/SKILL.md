---
name: fystash-debug
description: >-
  Diagnoses Fystash CLI, API, MCP, and Run failures using the canonical error
  catalog. Use when a command fails, a Run is not Ready, auth expires, a
  capability or quota is denied, State conflicts, ToolGateway or ModelGateway
  providers fail, Evidence must be inspected, or a Fystash-side hurdle should be
  reported with fystash feedback.
---

# Fystash debug

Failures return a catalog envelope: `code`, `message`, `retryable`, `correlationId`, optional `remediation`. Use that `code`. Do not invent a new one.

```bash
fystash current --json
fystash evidence list --resourceKind Run --resourceId run_... --json
```

Public surfaces only: `https://api.fystash.ai/v1`, `https://mcp.fystash.ai/mcp`. Never suggest private operator or GCP console paths.

When diagnosis shows a Fystash-side defect (platform bug, docs/skill mismatch, missing capability, or DX friction), report it then continue:

```bash
fystash feedback --json \
  --type bug --component cli --area run \
  --title "<one-line summary>" \
  --detail "<what happened vs expected, minimal repro>" \
  --command "<the failing call>" \
  --error "<verbatim envelope>" \
  --code <CODE> \
  --workaround "<what you did instead>"
```

Never file the caller's own workload. Never block the user on the report. Full flags: the fystash-cli skill's Feedback section.

## Read next

- Workflow: [references/diagnosis.md](references/diagnosis.md)
- Auth: [references/auth-errors.md](references/auth-errors.md)
- Capability / quota: [references/capability-quota.md](references/capability-quota.md)
- Run lifecycle: [references/run-lifecycle.md](references/run-lifecycle.md)
- State conflicts: [references/state-conflicts.md](references/state-conflicts.md)
- Provider failures: [references/provider-failures.md](references/provider-failures.md)
- Full code index: [references/error-index.md](references/error-index.md)

For how to invoke the CLI, use `fystash-cli`. For product model, use `fystash`.
