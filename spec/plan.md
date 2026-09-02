# Plan — CloudFront HSTS (CONFIG-003)

> Architecture and delivery for issue [#64](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/64) / RA CONFIG-003.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Replace managed SimpleCORS response headers policy with a **custom** `AWS::CloudFront::ResponseHeadersPolicy` that sets HSTS (`max-age` ≥ 31536000, `includeSubDomains`, preload if supported) **and** CORS equivalent to SimpleCORS. Attach to all three cache behaviours. Do **not** add CSP/XFO/Referrer/Permissions (CONFIG-002/004). Must change `template.yaml`.

## Architecture

```text
CloudFrontHSTSResponseHeadersPolicy
  SecurityHeadersConfig.StrictTransportSecurity
  CorsConfig (SimpleCORS parity)
CloudFrontDistribution cache behaviours ×3
  ResponseHeadersPolicyId: !Ref CloudFrontHSTSResponseHeadersPolicy
```

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Scope | HSTS + CORS only | Keep CONFIG-002/004 separate |
| max-age | 31536000 | Assessment / preload readiness |
| Evidence | `--append --finding CONFIG-003` | Preserve receipts |

## Tasks

1. Add custom response headers policy; wire all three behaviours
2. Append `docs/pr-evidence.md` for CONFIG-003
3. Checkpoint 3 + merge (must change `template.yaml`)

## Approval (checkpoint 2)

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
