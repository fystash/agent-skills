# Run lifecycle

```text
compile Environment → Revision
create Branch on that Revision
run plan → inspect digest, cost, region, approvals
plan approve (if required)
run apply --planDigest <digest>
run wait <run-id>
run exec <run-id> -- …
evidence list --resourceKind Run --resourceId <run-id>
run stop <run-id> --outcome cancelled|succeeded|failed
```

States you will see include `starting`, `ready`, `running`, and terminals `succeeded` / `failed` / `cancelled` / `expired`.

`fystash run wait` succeeds on `ready` / `running`. Do not apply a different Plan than the one shown. Do not skip Plan.
