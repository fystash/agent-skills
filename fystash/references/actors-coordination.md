# Actors and coordination

Actors are declared on the Sandbox and projected onto the Run.

- `kind: Agent` for the workload actor. Give it the minimum capabilities (`workspace.exec`, `workspace.files.read`, …).
- Human actors are distinct. Do not collapse them into the agent identity.
- Capability denials happen **before** side effects (`ACTOR_CAPABILITY_DENIED`).
- Coordination (Mailbox, Channel, Barrier) is Run-scoped. Do not leak it across Runs.

Exec must name the Actor: `fystash run exec <run-id> --component workspace --actor agent -- command…` or the `--` form (defaults `workspace` / `agent`).
