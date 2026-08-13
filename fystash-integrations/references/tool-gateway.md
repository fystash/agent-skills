# ToolGateway

Declare a `ToolGateway` Component. The Gateway is control-plane-side; Compute does not hold provider tokens.

```yaml
components:
  - name: tools
    kind: ToolGateway
    connectors:
      - name: zendesk
        use: zendesk@3
        credentials: project/zendesk-support
        mode: live
        allow: [tickets.read, tickets.tags.update]
    testMode:
      connectors: mock
actors:
  - name: support-agent
    kind: Agent
    capabilities:
      - tools.zendesk.tickets.read
      - tools.zendesk.tickets.tags.update
```

CLI (catalog):

```bash
fystash run tools get --run run_... --component tools --json
fystash run tools discover --run run_... --component tools --actor support-agent --json
fystash run tools invoke --run run_... --component tools --actor support-agent --connector zendesk --operation tickets.read --json
```

Exact-call approval is a Plan/approval concern (`APPROVAL_REQUIRED`). Do not mint a second CLI that bypasses the Gateway.
