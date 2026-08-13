# Components

An Environment composes Components. Each kind is a catalog resource, not a special case.

| Kind | Role |
|---|---|
| Compute | Guest process workspace (`run exec`) |
| Service | Long-running HTTP process / preview |
| Browser | Managed browser session + typed actions |
| Desktop | Managed display session + typed actions |
| ToolGateway | Brokered outbound tools; credentials never enter Compute |
| ModelGateway | Brokered model routes; keys never enter Compute |
| Database / ObjectStore / Queue | Managed Data, Run-private overlay |

Declare `name`, `kind`, and a pinned `template.ref` (or engine pin for Browser/Desktop). Resources (`cpu`, `memory`) feed Plan placement. Do not assume GPU from schema presence — ask `fystash capabilities`.
