# Plan and apply

```bash
fystash branch create --name work --revision rev_... --json
fystash run plan --revision rev_... --branch br_... --json
fystash plan approve --digest sha256:... --approver agent --json
fystash run apply --revision rev_... --branch br_... --planDigest sha256:... --json
```

Human Plan output always includes the digest. Apply that digest. A mismatched digest is refused.

If apply returns `APPROVAL_REQUIRED`, record `plan approve` for the same digest, then apply again.

Do not invent a helper that applies a different Plan than the one shown.
