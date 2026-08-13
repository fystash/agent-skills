# Run wait, exec, stop

```bash
fystash run wait run_... --timeout 10m --json
fystash run exec run_... -- echo hello
fystash run exec --run run_... --component workspace --actor agent --command echo --command hello
fystash run get run_... --json
fystash run list --json
fystash run stop run_... --outcome cancelled --json
```

`run wait` polls `getRun`. Success: `ready` or `running`. Terminal failure: `failed` / `cancelled` / `expired`. `succeeded` is terminal success.

`--` separates Fystash flags from guest argv. The `--` form defaults `component=workspace` and `actor=agent`. Do not invoke a local shell; exec runs in the guest.
