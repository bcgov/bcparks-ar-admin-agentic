# Tasks — CloudFront Content-Security-Policy (CONFIG-002)

Derive from `spec/spec.md` + `features/config-002-cloudfront-csp.feature`. Issue: [#41](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/41).

## Milestone 1 — Add CSP to shared response policy (after checkpoint 2 approval)

- [ ] **TASK-001** — In `template.yaml` `CloudFrontHSTSResponseHeadersPolicy` `SecurityHeadersConfig`, add `ContentSecurityPolicy` with `Override: true` and the locked CSP string from `spec/plan.md` (script `'self'`; style `'self' 'unsafe-inline'`; img/font `'self' data:`; connect `'self'` + loginproxy + execute-api + `*.bcparks.ca`; frame-src loginproxy; form-action `'self'` + loginproxy; `object-src 'none'`; `frame-ancestors 'none'`; `base-uri 'self'`). Include both `https://loginproxy.gov.bc.ca` and `https://*.loginproxy.gov.bc.ca`.
- [ ] **TASK-002** — Keep HSTS, CORS, FrameOptions, ContentTypeOptions, ReferrerPolicy, Permissions-Policy, and all three `ResponseHeadersPolicyId: !Ref CloudFrontHSTSResponseHeadersPolicy` attachments. Do **not** create a second policy.
- [ ] **TASK-003** — Update `docs/pr-evidence.md` with static proof; open **draft** PR linking #41 (`Fixes #41`); do not self-merge

## After checkpoint 2 merge (human)

- [ ] Label #41 `ready-for-agent`
- [ ] Review; merge (checkpoint 3). Live login/API CSP smoke is residual — not a merge gate.

## Completed (prior slices)

- [x] AUTHZ-001 (#6), AUTH-001 (#11), LOG-001 (#19), LOG-003 (#15), LOG-002 (#23), CRYPTO-001 (#27), CONFIG-003 (#32), CONFIG-004 (#36)

## Next (not this slice)

- [ ] SECRET-001 certificate ARN env var
