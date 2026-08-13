# Diagnosis workflow

1. Capture the envelope (`code`, `retryable`, `correlationId`, `remediation`).
2. Run `fystash current --json` if Project or API base is uncertain.
3. Look the `code` up in [error-index.md](error-index.md). Do not rename it.
4. Pull Evidence for the resource:

```bash
fystash evidence list --resourceKind Run --resourceId run_... --json
```

5. Retry only when `retryable` is true. Auth, policy, and schema errors are not retryable.

| Symptom | Start here |
|---|---|
| 401 / login / token | [auth-errors.md](auth-errors.md) |
| Plan refused / region / profile / GPU | [capability-quota.md](capability-quota.md) |
| Run not Ready / wait failed | [run-lifecycle.md](run-lifecycle.md) |
| Branch / overlay / commit | [state-conflicts.md](state-conflicts.md) |
| Tool / model / data provider | [provider-failures.md](provider-failures.md) |

Correlation: pass `--correlation-id` (or `FYSTASH_CORRELATION_ID`) so CLI calls join the Evidence stream.
