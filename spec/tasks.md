# Tasks — CloudFront browser security headers (CONFIG-004)

Derive from `spec/spec.md` + `features/config-004-cloudfront-security-headers.feature`. Issue: [#36](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/36).

## Milestone 1 — Extend shared response policy (after checkpoint 2 approval)

- [ ] **TASK-001** — In `template.yaml` `CloudFrontHSTSResponseHeadersPolicy` `SecurityHeadersConfig`, add:
  - `FrameOptions`: `FrameOption: DENY`, `Override: true`
  - `ContentTypeOptions`: `Override: true`
  - `ReferrerPolicy`: `ReferrerPolicy: strict-origin-when-cross-origin`, `Override: true`
  Keep existing `StrictTransportSecurity`.
- [ ] **TASK-002** — Add `CustomHeadersConfig` with `Permissions-Policy` disabling unused capabilities (`camera=()`, `microphone=()`, `geolocation=()`, `payment=()`, `usb=()`, `interest-cohort=()`), `Override: true`
- [ ] **TASK-003** — Keep CORS and all three `ResponseHeadersPolicyId: !Ref CloudFrontHSTSResponseHeadersPolicy` attachments. Do **not** add Content-Security-Policy (CONFIG-002).
- [ ] **TASK-004** — Update `docs/pr-evidence.md` with static proof; open **draft** PR linking #36 (`Fixes #36`); do not self-merge

## After checkpoint 2 merge (human)

- [ ] Label #36 `ready-for-agent`
- [ ] Review; merge (checkpoint 3). Live header smoke is residual.

## Completed (prior slices)

- [x] AUTHZ-001 (#6), AUTH-001 (#11), LOG-001 (#19), LOG-003 (#15), LOG-002 (#23), CRYPTO-001 (#27), CONFIG-003 (#32)

## Next (not this slice)

- [ ] CONFIG-002 CSP
