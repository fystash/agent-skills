# Core model

| Resource | What it is |
|---|---|
| **Environment** | Versioned, branchable definition of the system an agent operates in. Manifest: `environment.yaml`. |
| **Revision** | Immutable compile of an Environment. Content-addressed. Same manifest → same Revision. |
| **Branch** | Named State head over a Revision. Overlay is Run-private until commit. |
| **Plan** | Allocation preview. Must be shown before apply. Bound by digest. |
| **Run** | Live topology for one execution of a Revision on a Branch. |
| **Evidence** | Append-only causal record. Required for billing and audit. |

`World` is a deprecated alias of Environment. Prefer `kind: Environment` and `apiVersion: environments.fystash.dev/v1alpha1`.

There is one operation catalog. A capability is not complete if only one interface can use it.
