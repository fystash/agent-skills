# mock / record / replay / live

Per connector (and testMode overlays), mode is explicit:

| Mode | Behavior |
|---|---|
| `deny` | Calls refused (`TOOL_MODE_DENIED`) |
| `mock` | Synthesize from the output schema; no provider dial |
| `record` | Execute live and append a redacted recording |
| `replay` | Answer only from the Run recording (`TOOL_REPLAY_MISS` on miss) |
| `live` | Execute against the provider |

`testMode.connectors: mock` is the evaluation default overlay. Replay does not imply the real provider was mutated.

Writes:

- `provider-key` requires `idempotencyKey` (`TOOL_IDEMPOTENCY_REQUIRED`)
- `fystash-key` dedups by call digest
- `none` may return `EXTERNAL_WRITE_UNCERTAIN` and must not be silently retried

Every call is one `tool.call` meter unit and one redacted Evidence record. Plan must list live vs mock/replay before apply.
