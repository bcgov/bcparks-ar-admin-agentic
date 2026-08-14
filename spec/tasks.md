# Tasks — CloudFront Content-Security-Policy (CONFIG-002)

Derive from `spec/spec.md` + `features/config-002-cloudfront-csp.feature`. Issue: [#41](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/41).

## Milestone 1 — CSP on shared policy (after checkpoint 2 approval)

- [ ] **TASK-001** — In `template.yaml` `CloudFrontHSTSResponseHeadersPolicy` `SecurityHeadersConfig`, add `ContentSecurityPolicy` with `Override: true` and the exact policy string from `spec/plan.md` (script `'self'`; style `'self' 'unsafe-inline'`; img/font `'self' data:`; connect `'self'` + loginproxy apex+wildcard + `*.execute-api.ca-central-1.amazonaws.com` + `*.bcparks.ca`; frame-src loginproxy apex+wildcard; form-action `'self'` + loginproxy; `object-src 'none'`; `frame-ancestors 'none'`; `base-uri 'self'`)
- [ ] **TASK-002** — Keep HSTS, CORS, CONFIG-004 headers (`FrameOptions`, `ContentTypeOptions`, `ReferrerPolicy`, `Permissions-Policy`) and all three `ResponseHeadersPolicyId: !Ref CloudFrontHSTSResponseHeadersPolicy` attachments. Do **not** add a second policy or Report-Only CSP.
- [ ] **TASK-003** — Update `docs/pr-evidence.md` with static proof of the directives; open **draft** PR linking #41 (`Fixes #41`); do not self-merge

## After checkpoint 2 merge (human)

- [ ] Label #41 `ready-for-agent`
- [ ] Review; merge (checkpoint 3). Live login/API header smoke is residual — not a merge gate.

## Completed (prior slices)

- [x] AUTHZ-001 (#6), AUTH-001 (#11), LOG-001 (#19), LOG-003 (#15), LOG-002 (#23), CRYPTO-001 (#27), CONFIG-003 (#32), CONFIG-004 (#36)

## Next (not this slice)

- [ ] SECRET-001, TEST-001
