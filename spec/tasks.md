# Tasks — CloudFront HSTS (CONFIG-003)

Derive from `spec/spec.md` + `features/config-003-cloudfront-hsts.feature`. Issue: [#32](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/32).

## Milestone 1 — HSTS policy (after checkpoint 2 approval)

- [ ] **TASK-001** — Add `AWS::CloudFront::ResponseHeadersPolicy` in `template.yaml` with Strict-Transport-Security (max-age ≥ 31536000, includeSubDomains, override) and CORS equivalent to SimpleCORS
- [ ] **TASK-002** — Point all three cache behaviours’ `ResponseHeadersPolicyId` at that resource (`!Ref`); remove `60669652-455b-4ae9-85a4-c4c02393f86c`
- [ ] **TASK-003** — Do **not** add CSP, X-Frame-Options, nosniff, Referrer-Policy, or Permissions-Policy in this PR
- [ ] **TASK-004** — Update `docs/pr-evidence.md`; open **draft** PR linking #32; do not self-merge

## After checkpoint 2 merge (human)

- [ ] Label #32 `ready-for-agent`
- [ ] Review; merge (checkpoint 3). Live header smoke is residual.

## Completed (prior slices)

- [x] AUTHZ-001 (#6), AUTH-001 (#11), LOG-001 (#19), LOG-003 (#15), LOG-002 (#23), CRYPTO-001 (#27)

## Next (not this slice)

- [ ] CONFIG-004 other headers, CONFIG-002 CSP
