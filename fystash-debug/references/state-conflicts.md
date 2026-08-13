# State conflicts

State is Branch-owned with a Run-private overlay.

| Code | Meaning |
|---|---|
| `BRANCH_HEAD_CONFLICT` | Head moved since the caller last observed it. Re-read the Branch. |
| `STATE_GENERATION_STALE` | Named generation is no longer current. |
| `STATE_COMMIT_UNACKNOWLEDGED` | Commit did not fully acknowledge. Do not assume the head advanced. |
| `STATE_BINDING_INVALID` | Mount/binding does not match declared State. |
| `STATE_ISOLATION_REQUIRED` / `STATE_CUTOVER_REQUIRED` | Overlay/isolation rules blocked the operation. |

Writes stay on the overlay until `fystash branch commit`. `onRunEnd: discard` drops the overlay when the Run ends.

Do not store secrets in Evidence. Do not treat Evidence as a State dump.
