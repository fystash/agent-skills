# Evidence

```bash
fystash evidence list --resourceKind Run --resourceId run_... --json
```

`resourceKind` is the catalog kind (`Run`, `Secret`, …), not a lowercase nickname. Empty lists usually mean the kind/id pair is wrong.

Evidence is append-only. Correlation ids join CLI calls to the stream (`--correlation-id` / `FYSTASH_CORRELATION_ID`).
