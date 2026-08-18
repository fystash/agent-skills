# Sandbox compile

```bash
fystash sandbox compile --file sandbox.yaml --json
cat sandbox.yaml | fystash sandbox compile --stdin --json
```

`--file` and `--stdin` send bytes as the catalog `manifest` field. `--manifest` remains valid. Do not combine `--file`/`--stdin` with `--manifest`.

TTY prints Revision id and digest. Non-TTY / `--json` prints the REST Revision object.

Deprecated alias: `fystash environment compile` / `fystash env compile`. World manifests still compile through `sandbox compile`.
