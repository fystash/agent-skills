# Batch

Batch is a catalog resource, not a CLI-only helper.

Typical argv (see `fystash --help` Evaluation / Batch):

```bash
fystash batch list --json
```

Do not dispatch a Batch without the Plan/approval rules that apply to its members. High-cost batches may require approval (`BATCH_HIGH_COST` / `batch-cost` grants as documented on the operation).
