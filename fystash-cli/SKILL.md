---
name: fystash-cli
description: >-
  Operates the canonical Go Fystash CLI for authentication, Project connect,
  sandbox compile, Plan/apply, sandbox start/exec/evidence/stop, run wait/exec, Evidence, and
  fystash feedback. Use when the user needs fystash login, connect, current, compile, sandbox start, plan, apply, wait, exec,
  evidence, batch, publication, feedback, or machine-mode --json behavior.
---

# Fystash CLI

Canonical binary: Go `fystash`. `npx -y @fystash/cli` only launches that binary.

Rules:

1. Run `fystash current` before material operations if context is uncertain.
2. Use `--json` (or non-TTY stdout) when a script or agent will parse output.
3. Do not bypass Plan. Apply the digest you just showed.
4. Do not guess Project. Use `connect` / `--project` / `.fystash/project.json`.
5. Never use private operator endpoints. API base is `https://api.fystash.ai/v1`.

Exit codes: `0` success, `1` operation/runtime failure, `2` usage.

## Read next

- Auth / connect / current: [references/auth-connect.md](references/auth-connect.md)
- Compile: [references/environment.md](references/environment.md)
- Plan / apply: [references/plan-apply.md](references/plan-apply.md)
- Run / wait / exec / stop: [references/run.md](references/run.md)
- Evidence: [references/evidence.md](references/evidence.md)
- Batch: [references/batch.md](references/batch.md)
- Publication / release: [references/release.md](references/release.md)
- Feedback: [references/feedback.md](references/feedback.md)

Global flags (same meaning on every command): `--json` `--project` `--api-url` `--profile` `--timeout` `--correlation-id` `--no-color`.

## Feedback

When you hit a hurdle that is Fystash's fault — something that should work but doesn't, a capability you needed but isn't supported, instructions (docs/skill) that reality contradicts, or needless friction — report it with `fystash feedback`, then continue the user's task with a workaround. Never file feedback for problems in the user's own workload, `environment.yaml`, or app code.

See [references/feedback.md](references/feedback.md).
