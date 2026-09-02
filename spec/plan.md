# Plan — Content-Security-Policy (CONFIG-002)

> Architecture and delivery for issue [#63](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/63) / RA CONFIG-002.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Add `ContentSecurityPolicy` to the existing custom `CloudFrontResponseHeadersPolicy`. Keep all three cache behaviours on that policy. Preserve HSTS, CORS, and CONFIG-004 headers. Must change `template.yaml`.

## Architecture

```text
CloudFrontResponseHeadersPolicy
  SecurityHeadersConfig
    ContentSecurityPolicy: (sourced policy string)
      default-src 'self'
      script-src 'self'
      style-src 'self' 'unsafe-inline'   # brownfield Angular/Bootstrap
      img-src 'self' data:; font-src 'self' data:
      connect-src 'self' loginproxy + API hosts
      frame-src / form-action: loginproxy
      object-src 'none'; frame-ancestors 'none'; base-uri 'self'
    (+ existing HSTS / XFO / nosniff / Referrer)
  CustomHeadersConfig Permissions-Policy (keep)
  CorsConfig (keep)
```

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Delivery | Response header on shared policy | Covers all behaviours; preferred over meta-only |
| script-src | `'self'` | keycloak-js bundled via angular.json |
| IdP / API | loginproxy + execute-api + bcparks hosts | Matches assessment allowlist need |
| style-src | include `'unsafe-inline'` | Brownfield Angular/Bootstrap; document in evidence |
| Evidence | append CONFIG-002 | Preserve receipts |

## Tasks

1. Add ContentSecurityPolicy to `template.yaml` policy; preserve other headers
2. Confirm three behaviours still `!Ref` the policy
3. Append `docs/pr-evidence.md`
4. Checkpoint 3 + merge (must change `template.yaml`)

## Approval (checkpoint 2)

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
