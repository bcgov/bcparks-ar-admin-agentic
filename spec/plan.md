# Plan — Browser security headers (CONFIG-004)

> Architecture and delivery for issue [#104](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/104) / RA CONFIG-004.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Extend the existing custom `AWS::CloudFront::ResponseHeadersPolicy` (`CloudFrontResponseHeadersPolicy`) so it also sets **X-Frame-Options DENY**, **X-Content-Type-Options nosniff**, **Referrer-Policy strict-origin-when-cross-origin**, and a restrictive **Permissions-Policy**. Keep all three cache behaviours on that policy. Preserve HSTS + CORS from CONFIG-003. Do **not** add CSP (CONFIG-002). Must change `template.yaml`.

## Architecture

```text
CloudFrontResponseHeadersPolicy
  SecurityHeadersConfig
    StrictTransportSecurity (keep)
    FrameOptions: DENY
    ContentTypeOptions: Override true (nosniff)
    ReferrerPolicy: strict-origin-when-cross-origin
  CustomHeadersConfig (Permissions-Policy)
    camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
  CorsConfig (keep SimpleCORS parity)
CloudFrontDistribution cache behaviours ×3
  ResponseHeadersPolicyId: !Ref CloudFrontResponseHeadersPolicy (unchanged wiring)
```

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Scope | Four headers only | Matches assessment; CSP is CONFIG-002 |
| Frame options | DENY | Strongest clickjacking control for admin UI |
| Referrer | strict-origin-when-cross-origin | Common gov default; reduces leakage |
| Permissions-Policy | CustomHeadersConfig deny-list | Not a native SecurityHeadersConfig property on CloudFront |
| Evidence | `--append --finding CONFIG-004` | Preserve prior receipts |

## Tasks

1. Extend `CloudFrontResponseHeadersPolicy` in `template.yaml` with FrameOptions, ContentTypeOptions, ReferrerPolicy, Permissions-Policy; keep HSTS/CORS
2. Confirm all three behaviours still `!Ref` the policy
3. Append `docs/pr-evidence.md` for CONFIG-004
4. Checkpoint 3 + merge (must change `template.yaml`; refuse evidence-only)

## Approval (checkpoint 2)

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
