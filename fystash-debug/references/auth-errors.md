# Auth errors

| Code | Meaning |
|---|---|
| `UNAUTHENTICATED` | No usable credential. Run `fystash login` or set `FYSTASH_ACCESS_TOKEN` for headless. |
| `POLICY_DENIED` | Authenticated, but this Actor/Project cannot perform the operation. |
| `RESOURCE_NOT_FOUND` | The id is wrong, or this credential cannot see the resource. |
| `SECRET_ACCESS_DENIED` | Secret/Binding policy refused the access. Do not print plaintext. |

Headless connect without a token:

```text
connect --non-interactive requires FYSTASH_ACCESS_TOKEN
```

Never commit `~/.fystash/credentials.json`. Never echo stored access or refresh tokens. If `fystash current` shows unauthenticated, fix auth before retrying mutating calls.
