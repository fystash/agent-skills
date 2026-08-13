# State

State is named, branched, and overlay-isolated per Run.

| Field | Meaning |
|---|---|
| `kind` | Drive (filesystem), plus managed data kinds when declared |
| `persistence` | `durable` survives Runs via Branch head |
| `branchMode` | typically `copy-on-write` |
| `onRunEnd` | `discard` drops the overlay unless committed |

Mounts bind State onto a Component path. Writes stay on the Run overlay until `branch commit`. Destroying a Run with `onRunEnd: discard` does not advance the Branch.

Never treat Evidence as a place to store secrets or raw State dumps.
