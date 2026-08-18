# sandbox.yaml

Preferred filename: `sandbox.yaml`.

```yaml
apiVersion: sandboxes.fystash.dev/v1alpha1
kind: Sandbox
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
- Compute `template.ref` is the guest image: `python-agent` (default), `node-agent`, `go-agent`. Not a Component kind. See [guest-images.md](guest-images.md).
- Name Components and State; Actors hold capabilities on those names (`workspace.exec`).
- `network.default: deny` unless the workload truly needs egress.
- Compile through the catalog (`fystash sandbox compile --file sandbox.yaml`). Do not invent a second compiler.
- `resources.memory` is freeform above the kind floor (ADR-0152): Compute/Service ≥ 512 MiB, Browser/Desktop ≥ 4 GiB. Omit to take the floor. There is no `small`/`default`/`large` ladder and no class-letter SKU. A shape the host cannot pack is `RUN_CAPACITY_UNAVAILABLE` (503), not a silent shrink.

See the `01-python-workspace` example in `fystash/fystash-sandbox` for a complete accepted manifest.
