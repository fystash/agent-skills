# Auth, connect, current

```bash
fystash login
fystash whoami --json
fystash connect --project prj_...
fystash current
fystash logout
```

Headless:

```bash
export FYSTASH_API_URL=https://api.fystash.ai/v1
export FYSTASH_ACCESS_TOKEN=...   # do not print or commit
export FYSTASH_PROJECT_ID=prj_...
fystash connect --non-interactive --json
```

`connect` writes commit-safe `.fystash/project.json` (no tokens) and a managed `AGENTS.md` block.

`--non-interactive` never installs Agent Skills unless `--install-skills` is also passed.

```bash
fystash skills install
fystash connect --non-interactive --install-skills --json
```

Credentials live in `~/.fystash/credentials.json` mode `0600`. Never echo them.
