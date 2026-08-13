# Run lifecycle failures

`fystash run wait` succeeds on `ready` / `running`. Terminal `failed` / `cancelled` / `expired` is exit 1. `succeeded` is terminal success.

| Code | Meaning |
|---|---|
| `TIMEOUT` | Wait or HTTP deadline. Raise `--timeout` only after checking Evidence. |
| `APPROVAL_REQUIRED` | Apply without a matching digest-bound grant. |
| `ACTOR_CAPABILITY_DENIED` | Exec/capability check failed before side effects. |
| `ENVIRONMENT_REFERENCE_MUTABLE` | Template ref is not pinned `@sha256:…`. Recompile. |
| `IDEMPOTENCY_KEY_REUSED` | Same key, different intent. Mint a new key for a new Run. |
| `INFRASTRUCTURE_UNAVAILABLE` | Retryable platform issue (`retryable: true`). |

```bash
fystash run get run_... --json
fystash evidence list --resourceKind Run --resourceId run_... --json
fystash run stop run_... --outcome cancelled --json
```

Do not treat a cancelled Run as Ready. Do not apply a different Plan than the one shown.
