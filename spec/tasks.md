# Tasks — CloudFront viewer TLS minimum (CRYPTO-001)

Derive from `spec/spec.md` + `features/crypto-001-cloudfront-tls-minimum.feature`. Issue: [#27](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/27).

## Milestone 1 — Raise TLS floor (after checkpoint 2 approval)

- [ ] **TASK-001** — In `template.yaml` `ViewerCertificate`, set `MinimumProtocolVersion: TLSv1.2_2021` (replace `TLSv1`). Do not change ResponseHeadersPolicyId, origins, or certificate ARN.
- [ ] **TASK-002** — Prove statically (comment/grep in evidence, or a tiny test/script) that the viewer minimum is not `TLSv1`
- [ ] **TASK-003** — Update `docs/pr-evidence.md`; open **draft** PR linking #27; do not self-merge

## After checkpoint 2 merge (human)

- [ ] Add label `ready-for-agent` to #27
- [ ] Review; merge (checkpoint 3). Post-deploy TLS smoke is residual.

## Completed (prior slices)

- [x] AUTHZ-001 (#6), AUTH-001 (#11), LOG-001 (#19), LOG-003 (#15), LOG-002 (#23)

## Backlog (not this slice)

- [ ] CONFIG-003 HSTS, CONFIG-004 headers, CONFIG-002 CSP
- [ ] SECRET-001
