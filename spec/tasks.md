# Tasks — Token interceptor unit coverage (TEST-001)

Derive from `spec/spec.md` + `features/test-001-token-interceptor.feature`. Issue: [#51](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/51).

## Milestone 1 — Spec file (after checkpoint 2 approval)

- [ ] **TASK-001** — Add `src/app/shared/utils/token-interceptor.spec.ts`. Mock `KeycloakService.getToken` and `refreshToken`. Do **not** modify `token-interceptor.ts` unless a test cannot compile against the current public intercept API.
- [ ] **TASK-002** — Cover: Bearer injection with a token; Bearer header when token is missing/empty; non-403 (include 401) pass-through without refresh; 403 → refresh → retry with header; concurrent 403s share one `refreshToken` call; refresh failure propagates (no logout).
- [ ] **TASK-003** — Update `docs/pr-evidence.md` with `npm run test-ci` (or CI Test job) result. Open **draft** PR linking #51 (`Fixes #51`); do not self-merge. Note AUTH-006 / AUTH-007 as residual follow-ups.

## After checkpoint 2 merge (human)

- [ ] Label #51 `ready-for-agent`
- [ ] Review; merge (checkpoint 3) when tests pass. This slice has no out-of-repo pause.

## Paused (not this slice)

- [ ] SECRET-001 (#46 / PR #50) — waiting on `lza-prod` / `DOMAIN_CERTIFICATE_ARN`

## Completed (prior slices)

- [x] AUTHZ-001 (#6), AUTH-001 (#11), LOG-001 (#19), LOG-003 (#15), LOG-002 (#23), CRYPTO-001 (#27), CONFIG-003 (#32), CONFIG-004 (#36), CONFIG-002 (#41)
