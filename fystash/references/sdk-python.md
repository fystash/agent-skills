# Python SDK

Package `fystash` (`sdks/python`). Generated from the same catalog as TypeScript.

```python
from fystash import client

fy = client("https://api.fystash.ai/v1")
revision = fy.compile_environment(manifest=yaml_text)
```

Errors are `FystashError` with the catalog envelope (`code`, `retryable`, `correlation_id`, `remediation`). Do not rename those fields.

No extra convenience operations. If you need a helper, it must exist on every interface or it is not a platform capability.
