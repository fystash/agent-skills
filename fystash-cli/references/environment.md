# Environment compile

```bash
fystash environment compile --file environment.yaml --json
cat environment.yaml | fystash environment compile --stdin --json
```

`--file` and `--stdin` send bytes as the catalog `manifest` field. `--manifest` remains valid. Do not combine `--file`/`--stdin` with `--manifest`.

TTY prints Revision id and digest. Non-TTY / `--json` prints the REST Revision object.

Alias: `fystash env compile`. Deprecated: `fystash world compile`.
