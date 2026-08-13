# Tool, model, and data provider failures

Credentials never enter Compute. Failures are catalog codes, not HTTP folklore.

| Code | Meaning |
|---|---|
| `TOOL_GATEWAY_NOT_LIVE` | No live Gateway on this Run. |
| `TOOL_OPERATION_UNKNOWN` | Operation is not on the pinned Connector. |
| `TOOL_CAPABILITY_DENIED` / `TOOL_MODE_DENIED` | Actor or mode (`deny`/`mock`/`record`/`replay`/`live`) refused the call. |
| `TOOL_REPLAY_MISS` | Replay had no matching recording. |
| `TOOL_IDEMPOTENCY_REQUIRED` | Write requires `idempotencyKey`. |
| `EXTERNAL_PROVIDER_ERROR` / `EXTERNAL_PROVIDER_TIMEOUT` | Third-party failed. |
| `EXTERNAL_WRITE_UNCERTAIN` | Write may have applied; do not silently retry (`none` idempotency). |
| `MODEL_GATEWAY_NOT_LIVE` | No live Model Gateway. |
| `MODEL_PROVIDER_UNAVAILABLE` / `MODEL_ROUTE_UNAVAILABLE` | Registry resolution failed. |
| `MODEL_CAPABILITY_DENIED` / `MODEL_BUDGET_EXCEEDED` | Actor or budget refused the invoke. |
| `DATA_ENGINE_UNAVAILABLE` / `DATA_ENDPOINT_NOT_LIVE` | Managed Data not ready. |
| `DATA_CAPABILITY_DENIED` / `DATA_PROMOTION_DENIED` | Rows/objects/messages or promotion refused. |

Inspect Evidence `tool.call` / model / data records (redacted). Do not ask the user for provider API keys to paste into Compute.
