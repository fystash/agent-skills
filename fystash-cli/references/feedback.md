# Feedback

Report a Fystash-side hurdle to the Fystash team, then continue the task with a workaround. Only report Fystash-side issues — never problems in the user's own workload or `environment.yaml`.

No login required. Project/org from `.fystash/project.json` is attached when present. Secrets are redacted locally before send.

```bash
fystash feedback --json \
  --type bug \
  --component cli \
  --title "run wait treats ready as success but docs say running" \
  --detail "wait exits on ready; docs say running. Repro: fystash run wait run_…" \
  --area run \
  --command "fystash run wait run_…" \
  --error "<verbatim envelope>" \
  --code RUN_STATE_CONFLICT \
  --expected "wait until running" \
  --doc "fystash-cli/references/run.md" \
  --workaround "poll getRun" \
  --severity major
```

Required: `--type`, `--component`, `--title`, `--detail` (or `--file`). `--language` is required when `--component sdk`. Machine mode never prompts; missing flags are usage (exit 2).

`--type`:

- "This is not working" (it should, per docs/contract) → `bug`
- Docs/skill instructed X, reality required Y → also `bug`, with `--doc`, `--expected`, `--workaround`
- "What I want is not supported" → `feature-request`
- Works, but confusing or awkward → `friction`
- anything else → `other`

`--component`: `api` | `cli` | `sdk` | `mcp` | `skills` | `docs` | `console` | `other`

`--severity`: `blocker` | `major` | `minor` (default `minor`)

`--area` (optional): `auth` | `compile` | `plan` | `run` | `evidence` | `browser` | `desktop` | `tool-gateway` | `model-gateway` | `data` | `secrets` | `publication` | `batch` | `sandbox` | `billing` | `other`

JSON stdout: `{ "id", "url", "status": "received" | "duplicate" }`. Duplicate reports fold into the existing GitHub issue. Then continue the user's task — never block on the report.
