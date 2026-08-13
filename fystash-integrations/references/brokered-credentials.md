# Brokered credentials

A Binding is the only path a Run receives credential access. Classes:

| Class | Meaning |
|---|---|
| `brokered` | Control plane presents the secret on the outbound dial only. Compute never sees it. Requires `destinationAllowlist`. |
| `exportable` | Explicitly allowed into the guest. Rare; Plan must show it. |
| `ephemeral` | Short-lived material minted for the Run. |

```bash
fystash secret create --name zendesk-support --classification external-api --value … --json
fystash secret binding list --json
```

Rules:

- Never put plaintext in manifests, listings, or Evidence.
- A brokered Binding without an allowlist is an open proxy and is refused.
- Revoke/rotate through Secret operations; do not paste replacement keys into Compute.
- ToolGateway `credentials: project/<name>` names the Secret, not a guest env var.

If a guest asks for `OPENAI_API_KEY` or a SaaS token, refuse and use ModelGateway / ToolGateway instead.
