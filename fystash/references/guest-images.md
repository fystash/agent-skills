# Guest images

A Compute `template.ref` selects a bootable ext4 (ADR-0147 / ADR-0154). **Languages are not Components.**

| Base | On disk |
|---|---|
| `python-agent` | git, curl, jq, rg, python3, venv, pip, uv, pytest |
| `node-agent` | that + Node |
| `go-agent` | that + Go |
| `browser-agent` | python-agent + chrome-headless-shell |
| `desktop-agent` | python-agent + Xvfb |

`network.default: deny` still blocks `git clone` unless the Drive is seeded or egress is allowed. Do not bake `claude` / `codex` / `gh` into the guest.

```bash
fystash init compute
fystash init node
fystash init go
```
