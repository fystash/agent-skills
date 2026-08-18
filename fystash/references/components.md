# Components

A Sandbox composes Components. Each kind is a catalog resource, not a special case.

| Kind | Role |
|---|---|
| Compute | Guest process workspace (`run exec`) |
| Service | Long-running HTTP process / preview |
| Browser | Managed browser session + typed actions |
| Desktop | Managed display session + typed actions |
| ToolGateway | Brokered outbound tools; credentials never enter Compute |
| ModelGateway | Brokered model routes; keys never enter Compute |
| Database / ObjectStore / Queue | Managed Data, Run-private overlay |

Declare `name`, `kind`, and a pinned `template.ref` (or engine pin for Browser/Desktop). **Languages are bases, not kinds:** `python-agent` (default), `node-agent`, `go-agent` — see [guest-images.md](guest-images.md). Resources (`cpu`, `memory`) feed Plan placement. Omitted Compute/Service resolve to **2 vCPU / 512 MiB**; omitted Browser/Desktop resolve to **2 vCPU / 4 GiB** (ADR-0152). Declaring below the floor is `COMPONENT_RESOURCES_BELOW_FLOOR`, not a silent bump. Do not assume GPU from schema presence — ask `fystash capabilities`.
