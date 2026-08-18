# Canonical error index

Generated from the Fystash error catalog. Do not invent codes. Look up the `code` field on the CLI/API/MCP envelope.

## invalid_request

The request or manifest is not well formed, or contradicts itself. No amount of retrying helps until the caller changes something.

Default retryable: false. Typical HTTP: 400, 410, 422.

| Code | Summary | Remediation |
|---|---|---|
| `REQUEST_MALFORMED` | The request body could not be parsed. | Send a well-formed JSON body with the documented content type. |
| `REQUEST_FIELD_UNKNOWN` | The request contains a property the API does not recognise. | Remove the property, or upgrade to an API version that defines it. GET /versions lists supported versions. |
| `REQUEST_FIELD_INVALID` | A property is present but its value is not acceptable. |  |
| `REQUEST_FIELD_MISSING` | A required property is absent. |  |
| `IDENTIFIER_MALFORMED` | A value is not a canonical public identifier. |  |
| `IDENTIFIER_KIND_MISMATCH` | An identifier of the wrong resource kind was supplied. |  |
| `API_VERSION_SUNSET` | The requested API version is no longer served. | Read GET /versions and move to the current version. |
| `MANIFEST_PARSE_FAILED` | The World manifest is not parseable YAML or JSON. |  |
| `MANIFEST_API_VERSION_UNSUPPORTED` | The manifest declares an apiVersion group this deployment does not compile. |  |
| `MANIFEST_SCHEMA_INVALID` | The manifest parses but does not satisfy the World schema. |  |
| `MANIFEST_KIND_DEPRECATED` | The manifest uses a deprecated kind; use kind: Sandbox. | Change the manifest to apiVersion: sandboxes.fystash.dev/v1alpha1 and kind: Sandbox. |
| `SANDBOX_TOPOLOGY_INVALID` | The Sandbox graph is not a valid topology: a dependency cycle, an unreachable Component or a missing private endpoint. |  |
| `SANDBOX_REFERENCE_UNRESOLVED` | A reference in the Sandbox manifest names something that does not exist. |  |
| `SANDBOX_REFERENCE_MUTABLE` | A reference is a mutable tag rather than a pinned digest. |  |
| `SANDBOX_MODULE_EXPANSION_FAILED` | A Composition Module could not be expanded into the explicit graph. |  |
| `ENVIRONMENT_TOPOLOGY_INVALID` | The Environment graph is not a valid topology: a dependency cycle, an unreachable Component or a missing private endpoint. |  |
| `COMPONENT_RESOURCES_BELOW_FLOOR` | A bootable Component declares CPU or memory below its kind floor. | Raise `resources.memory` to the kind floor (Compute/Service 512Mi, Browser/Desktop 4Gi), omit it to take the floor, or use `resources.shape: medium` (4 GiB). Browser `shape: small` is below floor. |
| `ENVIRONMENT_REFERENCE_UNRESOLVED` | A reference in the manifest names something that does not exist. |  |
| `ENVIRONMENT_REFERENCE_MUTABLE` | A reference is a mutable tag rather than a pinned digest. | Pin the reference to a digest, or run plan with resolution enabled and commit the resolved manifest. |
| `ENVIRONMENT_MODULE_EXPANSION_FAILED` | A Composition Module could not be expanded into the explicit graph. |  |
| `WORLD_TOPOLOGY_INVALID` | DEPRECATED alias of ENVIRONMENT_TOPOLOGY_INVALID (ADR-0026). |  |
| `WORLD_REFERENCE_UNRESOLVED` | DEPRECATED alias of ENVIRONMENT_REFERENCE_UNRESOLVED (ADR-0026). |  |
| `WORLD_REFERENCE_MUTABLE` | DEPRECATED alias of ENVIRONMENT_REFERENCE_MUTABLE (ADR-0026). | Pin the reference to a digest, or run plan with resolution enabled and commit the resolved manifest. |
| `WORLD_MODULE_EXPANSION_FAILED` | DEPRECATED alias of ENVIRONMENT_MODULE_EXPANSION_FAILED (ADR-0026). |  |
| `ACTOR_CAPABILITY_INVALID` | An Actor declares a capability naming a Component or coordination resource the World does not define. |  |
| `STATE_BINDING_INVALID` | A mount or State binding does not match a declared State resource. |  |
| `TASK_INTERFACE_MISMATCH` | A Task does not satisfy the Task Interface pinned by the World Revision. |  |
| `CREDENTIAL_REQUIREMENT_UNMET` | A required Credential Requirement in the Environment manifest has no satisfying Secret Binding for the target Branch. | Create a Secret Binding that satisfies the requirement for the target Branch, or mark the requirement optional. |
| `CREDENTIAL_REQUIREMENT_INVALID` | A Credential Requirement is malformed: it carries a value or provider location, duplicates another requirement's name, or is referenced by a Component that declares no such requirement. |  |
| `SECRET_REDACTION_REFUSED` | Redaction could not complete, so the record was refused; nothing suspect was persisted. |  |
| `RELEASE_SECRET_BINDING_UNRESOLVED` | A Release cannot be planned because a Credential Requirement of its Environment has no satisfying Secret Binding. | Bind a Secret version that satisfies the requirement for the Release's target Branch, then re-plan. |
| `DATA_RESET_UNSUPPORTED` | The State resource does not support the requested reset policy. |  |
| `PREVIEW_ENDPOINT_NOT_DECLARED` | The named preview target is not an HTTP-capable endpoint the Run declared. |  |
| `BROWSER_ACTION_INVALID` | The named Browser action is not one the typed-action surface supports, or its arguments are malformed. |  |
| `DESKTOP_ACTION_INVALID` | The named Desktop action is not one the typed-action surface supports, or its arguments are malformed. |  |
| `TOOL_IDEMPOTENCY_REQUIRED` | A write through a provider-key idempotency strategy must carry the caller's idempotency key. |  |
| `MODEL_CAPABILITY_UNSUPPORTED` | The resolved provider or route cannot satisfy a requested model capability. |  |
| `TRIGGER_PAYLOAD_INVALID` | The occurrence payload failed accept filters or schema checks. |  |
| `TASKSET_SHARD_INVALID` | Taskset shard assembly refused: empty shard, overlapping Task ids, or invalid shard order. |  |
| `BATCH_SEED_INVALID` | Batch seed policy is invalid or uses an unsupported derivation algorithm. |  |
| `SIM_PROTOCOL_UNSUPPORTED` | Simulator protocol version or capability is unsupported. |  |
| `TRAIN_HELD_OUT_OVERLAP` | Training and held-out Tasksets overlap or are identical. |  |
| `PUBLIC_INTERFACE_NOT_FOUND` | A Publication route targets an Environment public interface that is not declared on the pinned Revision. |  |
| `WAF_PROFILE_UNKNOWN` | The Publication WAF profile is not in the platform closed set. |  |
| `ROLLOUT_STAGE_INVALID` | The requested Rollout advance skips, reverses, or otherwise violates the declared strategy/stage sequence. |  |

## unauthenticated

No usable credential was presented.

Default retryable: false. Typical HTTP: 401.

| Code | Summary | Remediation |
|---|---|---|
| `UNAUTHENTICATED` | No credential was presented, or the credential is not valid. |  |
| `TRIGGER_UNAUTHORIZED` | Webhook or Manual ingress failed authentication or authorization. |  |

## not_found

The named resource does not exist, or is not visible to this caller.

Default retryable: false. Typical HTTP: 404.

| Code | Summary | Remediation |
|---|---|---|
| `RESOURCE_NOT_FOUND` | The resource does not exist, or is not visible to this caller. |  |
| `ACTOR_UNKNOWN` | No Actor with this name is declared on the Run. |  |
| `SECRET_NOT_FOUND` | The named Secret, Secret version or Secret Binding does not exist, or is not visible to this caller. |  |
| `BROWSER_PAGE_NOT_FOUND` | The named Page does not exist in this Browser Session. |  |
| `TOOL_OPERATION_UNKNOWN` | The named operation is not one the Connector definition declares. |  |
| `TOOL_REPLAY_MISS` | Replay mode holds no recorded call matching this request. |  |
| `MODEL_ROUTE_UNKNOWN` | The named route is not one this ModelGateway binds. |  |
| `MODEL_OPERATION_UNKNOWN` | The named operation is not one the pinned Model Route Revision declares. |  |
| `COORDINATION_UNKNOWN` | No Mailbox, Channel or Barrier with this name is declared on the Run. |  |
| `TRIGGER_UNKNOWN` | No Trigger with this identifier exists in the Project. |  |
| `ACTIVATION_UNKNOWN` | No Activation with this identifier exists. |  |
| `TIMER_UNKNOWN` | No Timer with this identifier exists on the Run. |  |
| `TASKSET_UNKNOWN` | No Taskset with this identifier or digest exists in the Project registry. |  |
| `TASK_UNKNOWN` | No Task with this identifier or digest exists in the Project registry. |  |
| `BATCH_UNKNOWN` | No Batch with this identifier exists in the Project registry. |  |
| `BATCH_MEMBER_UNKNOWN` | No Batch Member with this identifier exists. |  |
| `SIM_SESSION_UNKNOWN` | No Simulator session with this identifier exists. |  |
| `EVALUATION_UNKNOWN` | The Evaluation id is not known or is closed. |  |
| `TRAIN_PROVIDER_UNKNOWN` | Training Provider is unknown. |  |
| `TRAIN_JOB_UNKNOWN` | Training Job is unknown. |  |
| `ACCELERATOR_LEASE_UNKNOWN` | Accelerator Lease is unknown. |  |
| `MODEL_RELEASE_UNKNOWN` | No Model Release exists at the named id. |  |

## policy_denied

The request is well formed but the caller, Actor or Project policy does not permit it.

Default retryable: false. Typical HTTP: 403, 428.

| Code | Summary | Remediation |
|---|---|---|
| `POLICY_DENIED` | Project or organization policy forbids the operation. |  |
| `ACTOR_CAPABILITY_DENIED` | The Actor does not hold the capability this action requires. |  |
| `PROTECTED_RESOURCE_ACCESS_DENIED` | The caller attempted to read protected verifier input, hidden tests, judge-only messages or reward internals. |  |
| `SECRET_ACCESS_DENIED` | The Run or Actor is not bound to the requested Secret. |  |
| `SECRET_BINDING_DENIED` | No Secret Binding authorizes this Secret version for the exact Environment, Branch, Component, Actor and purpose. |  |
| `APPROVAL_REQUIRED` | A human approval must be recorded before this operation can proceed. | Record an approval for the exact subject, then repeat the request. |
| `DATA_CAPABILITY_DENIED` | The Actor lacks the capability required for this managed-data operation. |  |
| `DATA_PROMOTION_DENIED` | The promotion is refused by the State resource's promotion policy. |  |
| `RUN_RESUME_FALLBACK_DENIED` | The preferred resume class was unavailable and fallback was not allowed. |  |
| `PREVIEW_GRANT_EXPIRED` | The Preview Access Grant has expired or been revoked. |  |
| `PREVIEW_GRANT_FORBIDDEN` | The preview route would expose a forbidden control or data endpoint. |  |
| `BROWSER_ORIGIN_DENIED` | The navigation target is outside the Browser's allowed origin/egress policy. |  |
| `BROWSER_CAPABILITY_DENIED` | The Actor lacks the capability this Browser action requires. |  |
| `BROWSER_PROFILE_PROMOTION_DENIED` | Browser Profile promotion is refused by policy or missing capability. |  |
| `DESKTOP_CAPABILITY_DENIED` | The Actor lacks the capability this Desktop operation requires. |  |
| `DESKTOP_CHANNEL_DENIED` | The clipboard channel this operation uses is denied by the Desktop's declared policy. |  |
| `TOOL_CAPABILITY_DENIED` | The Actor lacks the connector-scoped capability this invocation requires. |  |
| `TOOL_MODE_DENIED` | The Connector binding's effective mode is deny. |  |
| `MODEL_CAPABILITY_DENIED` | The Actor lacks the route-scoped capability this invocation requires. |  |
| `COORDINATION_UNAUTHORIZED` | The Actor or platform sender is not authorized on this coordination resource. |  |
| `TIMER_CAPABILITY_DENIED` | The Actor lacks timer.create / timer.cancel / timer.list for this Timer declaration. |  |
| `EVALUATION_LEAKAGE_DETECTED` | Reward or protected material leaked into an ordinary observation or export. |  |
| `TRAIN_CHECKPOINT_FABRICATED` | Provider failure cannot fabricate a successful Checkpoint. |  |
| `ACCELERATOR_FALLBACK_DENIED` | Silent accelerator fallback was refused. |  |
| `RELEASE_IMMUTABLE` | An existing Release pin or plan cannot be mutated. |  |
| `ROLLBACK_STATE_INCOMPATIBLE` | Traffic rollback would imply rolling back incompatible durable State or external side effects. |  |
| `STATE_COMPATIBILITY_UNVERIFIED` | shared-compatible Release has no compatibility verification before traffic advances. |  |
| `STATE_ISOLATION_REQUIRED` | isolated-candidate Release cannot take traffic until candidate isolation is pinned. |  |
| `STATE_CUTOVER_REQUIRED` | exclusive-cutover Release cannot take overlapping writable traffic until cutover is approved. |  |
| `DIRECT_BACKEND_ACCESS_DENIED` | Direct worker/backend access is refused; the Publication edge is the only path in. |  |
| `PREVIEW_IS_NOT_PUBLICATION` | A Preview Access Grant cannot satisfy Publication edge exposure. |  |
| `ROLLOUT_GATE_REFUSED` | A stage gate (minimum duration, minimum requests, or protected smoke) refused the advance. |  |
| `ROLLOUT_APPROVAL_REQUIRED` | A digest-bound rollout-advance approval is required before this stage can advance. |  |
| `MODEL_PROMOTION_GATE_FAILED` | A Model Release promotion gate is missing or failed. |  |
| `MODEL_RELEASE_IMMUTABLE` | A promoted Model Release pin cannot be mutated. |  |
| `MODEL_ROUTE_MUTATION_FORBIDDEN` | A Model Route Revision cannot be mutated in place. |  |
| `MODEL_WEIGHTS_NOT_EXPORTABLE` | Downloadable weights were requested without an exportable provider capability. |  |
| `MODEL_ENV_RELEASE_INCOMPATIBLE` | Model Release and Environment Release serving compatibility check failed. |  |
| `HARDENING_PROFILE_GAP` | The §15.7 launch profile matrix has uncovered required entries. |  |
| `HARDENING_ISOLATION_FAILED` | Adversarial cross-tenant isolation probe observed a leak. |  |
| `HARDENING_REGIONAL_DRILL_FAILED` | Regional failover drill failed. |  |
| `HARDENING_EVIDENCE_BILLING_MISMATCH` | Evidence completeness and billing totals do not reconcile. |  |
| `HARDENING_LICENSE_DENIED` | Launch license entitlement denied. |  |
| `HARDENING_FALSE_GA_CLAIM` | A soak or 24×7 GA claim was asserted without proof. |  |

## capability_unavailable

A required region, profile, engine, license, connector or quota-backed capability is not available. Plan must fail here rather than allocate and discover it later.

Default retryable: false. Typical HTTP: 422.

| Code | Summary | Remediation |
|---|---|---|
| `RUN_CAPABILITY_UNAVAILABLE` | No compatible capability profile is available for the requested Run. |  |
| `REGION_UNAVAILABLE` | The requested region does not offer a capability this World needs. |  |
| `COMPUTE_PROFILE_UNAVAILABLE` | No Compute profile satisfies the declared resources in an available region. |  |
| `ACCELERATOR_PROFILE_UNAVAILABLE` | A required Accelerator Lease cannot be placed. |  |
| `BROWSER_ENGINE_UNAVAILABLE` | The requested Browser engine or version is not offered here. |  |
| `DESKTOP_ENGINE_UNAVAILABLE` | The requested Desktop operating system profile is not offered here. |  |
| `DATA_ENGINE_UNAVAILABLE` | The requested managed Database, ObjectStore or Queue engine is not offered here. |  |
| `CONNECTOR_UNAVAILABLE` | A Tool Gateway Connector referenced by the World is not configured in this Project. |  |
| `LICENSE_UNAVAILABLE` | A licensed operating system, browser or desktop engine has no available entitlement. |  |
| `PRODUCTION_PROFILE_UNAVAILABLE` | The requested production hosting profile, including multi-zone minimums, cannot be satisfied. |  |
| `DOMAIN_PREREQUISITE_UNMET` | Domain ownership, DNS delegation or certificate prerequisites are not met. |  |
| `DOMAIN_OWNERSHIP_UNVERIFIED` | The Domain Binding hostname has not completed ownership verification. |  |
| `DOMAIN_DNS_MISCONFIGURED` | Observed DNS records do not match the instructions required for this Domain Binding. |  |
| `TLS_CERTIFICATE_PENDING` | Managed TLS certificate for the Domain Binding is not yet ACTIVE. |  |
| `TLS_CERTIFICATE_FAILED` | Managed TLS certificate issuance or renewal failed for the Domain Binding. |  |
| `RUN_MEMORY_RESUME_UNAVAILABLE` | Memory-resume was requested but the Run profile or checkpoint does not support it. |  |
| `MODEL_PROVIDER_UNAVAILABLE` | A Model Provider referenced by a pinned Route Revision is not configured in this Project. |  |
| `MODEL_ROUTE_UNAVAILABLE` | A Model Route Revision referenced by the Environment is not registered in this Project. |  |

## quota_or_budget_denied

An organization quota, Project budget or concurrency limit stops the operation before allocation.

Default retryable: false. Typical HTTP: 429.

| Code | Summary | Remediation |
|---|---|---|
| `QUOTA_EXCEEDED` | An organization or Project quota would be exceeded. |  |
| `BUDGET_EXCEEDED` | The operation would exceed a configured budget. |  |
| `CONCURRENCY_LIMIT_EXCEEDED` | Too many concurrent Runs, Batch Members or actions for this Project. |  |
| `RATE_LIMITED` | Too many requests in the current window. | Back off and repeat after the interval named in the response. |
| `MODEL_BUDGET_EXCEEDED` | The call would cross a Run, Actor or Route cost or token ceiling. |  |
| `TRIGGER_THROTTLED` | The Trigger's activation rate or concurrency limit refused this occurrence. |  |
| `BATCH_BUDGET_EXCEEDED` | Dispatch refused because the next Member would exceed the Batch budget. |  |

## concurrency_conflict

Another operation holds the resource, or changed it since the caller last observed it.

Default retryable: false. Typical HTTP: 409.

| Code | Summary | Remediation |
|---|---|---|
| `SECRET_VERSION_IMMUTABLE` | The request attempted to mutate an immutable Secret version. | Rotate the Secret to create a new version, then re-point the Binding. |
| `DATA_ENDPOINT_NOT_LIVE` | The managed Database, ObjectStore or Queue endpoint is not live on this Run. |  |
| `RESOURCE_CONFLICT` | Another operation changed the resource concurrently. |  |
| `RUN_STATE_CONFLICT` | The Run is not in a state where this action is defined. |  |
| `BRANCH_HEAD_CONFLICT` | The Branch head moved since the caller last observed it. |  |
| `INPUT_LEASE_HELD` | Another Actor holds the exclusive Browser or Desktop input lease. |  |
| `BROWSER_SESSION_NOT_LIVE` | The Browser Component has no live Session to act on. |  |
| `DESKTOP_SESSION_NOT_LIVE` | The Desktop Component has no live Session to act on. |  |
| `DESKTOP_STALE_FRAME` | The action names a frame the screen has since superseded. |  |
| `TOOL_GATEWAY_NOT_LIVE` | The ToolGateway Component has no live Gateway to call through. |  |
| `MODEL_GATEWAY_NOT_LIVE` | The ModelGateway Component has no live Gateway to call through. |  |
| `MAILBOX_MAX_IN_FLIGHT` | The Mailbox already has the maximum number of unacknowledged in-flight messages. |  |
| `MAILBOX_EXHAUSTED` | Mailbox redelivery was exhausted; the message is dead-lettered or the Run fails per onExhausted. |  |
| `BARRIER_TIMEOUT` | A Barrier timed out before release conditions were met. |  |
| `RUN_COORDINATION_PENDING` | Suspension refused because unacknowledged run-scoped coordination would be lost. |  |
| `TRIGGER_PAUSED` | The Trigger is paused and will not accept new occurrences. |  |
| `TIMER_NOT_DUE` | The Timer's due time has not passed yet. |  |
| `TIMER_ALREADY_TERMINAL` | The Timer is already in a terminal state. |  |
| `EVALUATION_STATE_CONFLICT` | The Evaluation cannot accept this operation in its current state. |  |
| `TRAIN_STATE_CONFLICT` | Training Job/Iteration cannot accept this operation in its current state. |  |
| `EDGE_NOT_READY` | The Publication Edge Attachment is not ready to serve. |  |

## stale_reference

The request names a Revision, State generation or observed generation that is no longer current.

Default retryable: false. Typical HTTP: 409.

| Code | Summary | Remediation |
|---|---|---|
| `REVISION_STALE` | The named World Revision is deprecated or superseded for this operation. |  |
| `STATE_GENERATION_STALE` | The named State generation is no longer the Branch head. |  |
| `OBSERVED_GENERATION_STALE` | The caller's observed generation precondition no longer holds. | Re-read the resource, confirm the change is still wanted, and repeat with the new observed generation. |
| `SIM_STALE_FRAME` | The action cited a stale observation frame. |  |

## idempotency_conflict

A client request key was reused with a materially different request.

Default retryable: false. Typical HTTP: 409.

| Code | Summary | Remediation |
|---|---|---|
| `IDEMPOTENCY_KEY_REUSED` | The client request key was already used with a materially different request. |  |

## infrastructure_retryable

A platform component failed in a way that the identical request could survive.

Default retryable: true. Typical HTTP: 503, 504.

| Code | Summary | Remediation |
|---|---|---|
| `RUN_CAPACITY_UNAVAILABLE` | No host can take the Run right now. |  |
| `INFRASTRUCTURE_UNAVAILABLE` | A platform dependency is temporarily unavailable. |  |
| `HOST_LOST` | The worker hosting this Run was lost. |  |
| `RUN_CHECKPOINT_FAILED` | A Run checkpoint could not be written or validated. |  |
| `RUN_INFRASTRUCTURE` | The host or guest infrastructure failed while the Run was executing. | Mark the Run terminal, then start again on the same Branch. If it repeats, run fystash diagnose and fystash error explain RUN_INFRASTRUCTURE. |
| `RUN_MEMORY_RESUME_FAILED` | Memory-resume was attempted and could not restore preserved process state. |  |
| `STATE_COMMIT_UNACKNOWLEDGED` | A State adapter did not durably acknowledge its generation. |  |
| `EVIDENCE_UNACKNOWLEDGED` | Required Evidence could not be durably recorded. |  |
| `TIMEOUT` | The operation exceeded its deadline inside the platform. |  |
| `ACCELERATOR_UNAVAILABLE` | Requested accelerator capacity is unavailable. |  |

## application_failure

The customer's own workload failed. The platform behaved correctly.

Default retryable: false. Typical HTTP: 422.

| Code | Summary | Remediation |
|---|---|---|
| `PROCESS_EXITED_NONZERO` | The customer's process exited with a non-zero status. |  |
| `COMPONENT_FAILED` | A Component Instance entered its failed state. |  |
| `READINESS_TIMEOUT` | A Component did not satisfy its declared readiness gate in time. |  |

## verifier_failure

Protected verification did not pass, or could not run. Never conflated with application failure, because an unrun verifier must not read as a passing one.

Default retryable: false. Typical HTTP: 422.

| Code | Summary | Remediation |
|---|---|---|
| `VERIFIER_FAILED` | Protected verification ran and did not pass. |  |
| `VERIFIER_UNAVAILABLE` | Protected verification could not run. |  |

## external_provider_failure

A third-party system reached through the Tool Gateway failed.

Default retryable: false. Typical HTTP: 502, 504.

| Code | Summary | Remediation |
|---|---|---|
| `EXTERNAL_PROVIDER_ERROR` | A third-party provider returned an error through the Tool Gateway. |  |
| `EXTERNAL_PROVIDER_TIMEOUT` | A read-only provider call timed out. |  |
| `EXTERNAL_WRITE_UNCERTAIN` | A provider write may or may not have taken effect. | Establish the provider-side outcome before repeating. Do not retry automatically. |
| `MODEL_FALLBACK_EXHAUSTED` | The primary target and every declared fallback target failed. |  |

Total codes: 178.
