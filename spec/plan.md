# Plan — CloudFront HSTS (CONFIG-003)

> Architecture and delivery approach for issue [#32](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/32) / RA CONFIG-003.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Replace the managed SimpleCORS response headers policy on all three CloudFront cache behaviours with a custom `AWS::CloudFront::ResponseHeadersPolicy` that sets HSTS and preserves CORS. Do not add CSP or XFO in this slice.

## Architecture

```text
template.yaml
  CloudFrontSecurityHeadersPolicy (new)
    StrictTransportSecurity: max-age=31536000; includeSubDomains; override
    CORS: Access-Control-Allow-Origin * (equivalent to SimpleCORS)
  CloudFrontDistribution
    DefaultCacheBehavior.ResponseHeadersPolicyId → !Ref policy
    CacheBehaviors[api].ResponseHeadersPolicyId → !Ref policy
    CacheBehaviors[spa].ResponseHeadersPolicyId → !Ref policy
```

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| HSTS | max-age 31536000, includeSubDomains, override | Assessment baseline |
| CORS | Keep allow-origin * + needed methods/headers | Don’t break `/api/*` |
| CSP/XFO | Not this PR | CONFIG-002 / CONFIG-004 |
| Proof | Template contains HSTS + three !Ref attachments | No live AWS in CI |

## Security & privacy

- Residual: HSTS only after next CloudFront deploy; preload list not required this slice.

## Test approach

- Static: `template.yaml` defines ResponseHeadersPolicy with StrictTransportSecurity; all three behaviours reference it; SimpleCORS id `60669652-…` is gone
- Update `docs/pr-evidence.md`

## Rollout

- Next SAM deploy. Optional human: `curl -I` for Strict-Transport-Security.

## Approval (checkpoint 2) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
