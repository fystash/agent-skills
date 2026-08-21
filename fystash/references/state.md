# State

State is named, branched, and overlay-isolated per Run.

| Field | Meaning |
|---|---|
| `kind` | Drive (filesystem), plus managed data kinds when declared |
| `persistence` | `durable` survives Runs via Branch head |
| `branchMode` | typically `copy-on-write` |
| `onRunEnd` | `discard` or `commit` (catalog also has `require-promotion` for Browser profiles) |

`onRunEnd` is honest as:

- `discard` — drop the overlay when the Run ends unless you already `fystash branch commit`. Use this for throwaway work.
- `commit` — catalog accepts this. The overlay is the intended Branch head when the Run ends. Use this when a Drive file must survive `sandbox stop`.

Mounts bind State onto a Component path. Writes stay on the Run overlay until `onRunEnd: commit` or `fystash branch commit --participants <state-name>` (State names, not actor names). Destroying a Run with `onRunEnd: discard` does not advance the Branch.

Never treat Evidence as a place to store secrets or raw State dumps.
