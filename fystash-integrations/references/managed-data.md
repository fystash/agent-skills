# Managed Data

Database, ObjectStore, and Queue are **State**, not guest-installed servers. Overlays are Run-private. Promotion is explicit.

```yaml
state:
  - name: tickets
    kind: Database
    engine: postgres@16
    schema:
      ref: support-schema@sha256:…
    seed:
      ref: anonymized-tickets-1000@sha256:…
    branchMode: copy-on-write
    reset: exact-seed
    promotion:
      schema: deny
      rows: approval-required
  - name: attachments
    kind: ObjectStore
    branchMode: copy-on-write
  - name: cases
    kind: Queue
    delivery: at-least-once
    mergeMode: never
```

Bind them onto Compute with `bindings.role: data`. Grant Actor capabilities such as `tickets.rows.read`, `attachments.objects.create`, `cases.messages.consume`.

Branches do not clone the third-party system. Promotion never silently merges external state.
