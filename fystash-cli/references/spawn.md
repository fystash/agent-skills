# Spawn

`fystash spawn` is an operating helper (not catalog op 230). It compiles the
pinned cloud-agent Sandbox (Compute `medium` + Drive + ModelGateway), Plans,
auto-applies that digest, clones `--repo` into `/workspace`, and runs Grok
Build headless against the in-guest OpenAI proxy.

```
fystash spawn --repo https://github.com/org/repo.git --prompt "…"
```

v1 pins: harness `grok-build`, model `grok-build-0.1`, `api_backend=chat_completions`.
Guest credential is `FYSTASH_MODEL_TOKEN` (never `XAI_API_KEY`). The guest
OpenAI proxy is `http://<run-dns>:11434/v1` on the TAP DNS address (never
GCE metadata). Spawn also sets `GROK_CLI_CHAT_PROXY_BASE_URL` to that URL so
Grok does not dial `cli-chat-proxy.grok.com`. Network is
deny-by-default with `github.com` plus GitHub clone/asset CDNs allowed
(`codeload.github.com`, `release-assets.githubusercontent.com`,
`objects.githubusercontent.com`). The grok pin is the public
`fystash/agent-skills` release `grok-build-1.0.5`.

Flags: `--dry-run` `--json` `--keep` `--continue` `--branch` `--pr`.
Default: wait until Grok exits, then stop. `--keep` leaves the Run Ready.

The guest OpenAI proxy forwards `tools` and returns `tool_calls` so Grok
can write files. After `--keep`, inspect with public `run exec` (one `--`
before guest argv, or repeated `--command` flags).

Do not `curl | bash` https://x.ai/cli/install.sh. Do not pass the provider
key on argv. Create Project Secret `xai` once (`fystash secret create --name xai
--classification external-api`); spawn binds it as the Model Provider credential.
