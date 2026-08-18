# ModelGateway

Declare a `ModelGateway` Component. Keys stay in Project Secrets. Readiness is Route Revision + Provider resolution — unknown pins fail Component start, never a silent mock.

```yaml
components:
  - name: models
    kind: ModelGateway
    routes:
      - name: policy
        use: route@sha256:…
        allow: [generate, embed]
      - name: judge
        use: route@sha256:…
        protected: true
        allow: [generate]
actors:
  - name: coding-agent
    kind: Agent
    capabilities:
      - models.policy.generate
```

Pin `use:` to a Route Revision digest. Protected judge routes are not for the workload actor.

CLI:

```bash
fystash run models get --run run_... --component models --json
fystash run models invoke --run run_... --component models --actor coding-agent --route policy --operation generate --json
```

Do not put provider API keys in `sandbox.yaml` or guest env vars.
