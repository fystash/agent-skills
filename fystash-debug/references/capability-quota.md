# Capability and quota

Plan must fail here rather than allocate and discover later.

| Code | Meaning |
|---|---|
| `RUN_CAPABILITY_UNAVAILABLE` | Requested capability is not on this Project. Ask `fystash capabilities`. |
| `REGION_UNAVAILABLE` | Named region cannot serve this Plan. |
| `COMPUTE_PROFILE_UNAVAILABLE` | Compute class is not offered. |
| `ACCELERATOR_PROFILE_UNAVAILABLE` / `ACCELERATOR_UNAVAILABLE` | GPU/accelerator not available. Do not infer GPU from schema presence. |
| `QUOTA_EXCEEDED` / `BUDGET_EXCEEDED` | Organization quota or Project budget stopped allocation. |
| `CONNECTOR_UNAVAILABLE` / `LICENSE_UNAVAILABLE` | Connector or license is not enabled. |
| `APPROVAL_REQUIRED` | Show the Plan, record `fystash plan approve --digest … --approver …`, apply the same digest. |

Do not bypass Plan. Do not retry a capability miss hoping a different region appears.
