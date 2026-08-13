# environment.yaml

Canonical filename: `environment.yaml`.

```yaml
apiVersion: environments.fystash.dev/v1alpha1
kind: Environment
metadata:
  name: python-workspace
spec:
  lifecycle:
    mode: episodic
  components:
    - name: workspace
      kind: Compute
      template:
        ref: python-agent@sha256:0000000000000000000000000000000000000000000000000000000000000001
      resources:
        cpu: 2
        memory: 4Gi
      mounts:
        - state: working-directory
          path: /workspace
  state:
    - name: working-directory
      kind: Drive
      persistence: durable
      branchMode: copy-on-write
      onRunEnd: discard
  actors:
    - name: agent
      kind: Agent
      role: worker
      capabilities:
        - workspace.exec
  network:
    default: deny
```

Rules:

- Pin template refs with `@sha256:…`. Mutable tags are refused (`ENVIRONMENT_REFERENCE_MUTABLE`).
- Name Components and State; Actors hold capabilities on those names (`workspace.exec`).
- `network.default: deny` unless the workload truly needs egress.
- Compile through the catalog (`fystash environment compile --file environment.yaml`). Do not invent a second compiler.

See the `01-python-workspace` example in `fystash/fystash-sandbox` for a complete accepted manifest.
