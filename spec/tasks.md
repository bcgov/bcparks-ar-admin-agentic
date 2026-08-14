# Tasks — Production certificate environment input (SECRET-001)

Derive from `spec/spec.md` + `features/secret-001-prod-certificate-arn.feature`. Issue: [#46](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/46).

## Milestone 1 — Workflow change (after checkpoint 2 approval)

- [ ] **TASK-001** — In `.github/workflows/lza-deploy-admin-prod.yaml` SAM `--parameter-overrides`, set `DomainCertificateArn=${{ vars.DOMAIN_CERTIFICATE_ARN }}`. Do not change `environment: lza-prod`. Do not touch dev/test workflows.
- [ ] **TASK-002** — Update `docs/pr-evidence.md` with static proof that the override uses `vars.DOMAIN_CERTIFICATE_ARN` and is not a literal `arn:aws:acm:` value. **Do not reprint the previous ARN.**
- [ ] **TASK-003** — Open **draft** PR linking #46 (`Fixes #46`). Do **not** self-merge. Leave draft.

## After checkpoint 2 merge (human)

- [ ] Label #46 `ready-for-agent` so Copilot can open the draft (optional; allowed)
- [ ] **PAUSE before checkpoint 3 merge** until a human creates GitHub Environment `lza-prod` and sets `DOMAIN_CERTIFICATE_ARN`. Comment the blocker on the issue/PR. Then continue the High queue (TEST-001).

## Completed (prior slices)

- [x] AUTHZ-001 (#6), AUTH-001 (#11), LOG-001 (#19), LOG-003 (#15), LOG-002 (#23), CRYPTO-001 (#27), CONFIG-003 (#32), CONFIG-004 (#36), CONFIG-002 (#41)

## Next (not this slice)

- [ ] TEST-001 token interceptor coverage
