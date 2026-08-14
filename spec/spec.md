# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice — TEST-001 (token interceptor coverage)

**Issue:** [#51](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/51)  
**Finding:** RA TEST-001  
**Feature:** `features/test-001-token-interceptor.feature`

### Problem

The HTTP helper that attaches the staff session token to API calls, and retries after a forbidden response by refreshing that token, has no automated tests. A regression in header injection or refresh/retry would ship unnoticed.

### Outcome

There is a focused unit spec for that helper covering **current** behaviour:

- Requests include an `Authorization: Bearer …` header from the session token (empty Bearer when no token — do not change that here).
- Errors other than 403 pass through without a refresh.
- A 403 triggers a token refresh and a retry of the same request with the (possibly new) header.
- If a refresh is already in flight, later 403s wait for it rather than starting a second refresh.
- If refresh fails, the error is propagated (no new logout behaviour in this slice).

### Users & personas

| Persona | Goal |
| --- | --- |
| Developer | Catch interceptor regressions in CI |
| Security reviewer | Confirm token attachment and 403 retry are locked by tests |
| Staff user | No behaviour change |

### Scope

#### In scope (#51)

- New `token-interceptor.spec.ts` (or equivalent) for `TokenInterceptor`
- Coverage listed under Outcome
- Tests use the existing Angular HTTP testing utilities; mock Keycloak `getToken` / `refreshToken`

#### Out of scope

- Changing interceptor behaviour (including adding logout on refresh failure)
- AUTH-006: treat 401 the same as 403
- AUTH-007: only attach tokens to allowlisted API hosts
- E2E / live Keycloak

### Journeys

1. Interceptor coverage — see `features/test-001-token-interceptor.feature`

### Non-functional requirements

- Tests run in existing `npm run test-ci` / CI Test job
- No production code change unless a test cannot compile against current API (prefer tests-only)

### Traceability

| Finding | Issue | Feature |
| --- | --- | --- |
| RA TEST-001 | #51 | `features/test-001-token-interceptor.feature` |

### Sign-off (checkpoint 1) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| Tech lead | | |
| QA | | |

> Do not add `ready-for-agent` to #51 until this spec PR is merged.

---

## Paused slices

### SECRET-001 — Prod certificate environment input

- **Issue:** [#46](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/46) (paused)
- **Feature:** `features/secret-001-prod-certificate-arn.feature`
- **Draft impl:** [#50](https://github.com/bcgov/bcparks-ar-admin-agentic/pull/50)
- **Blocker:** GitHub Environment `lza-prod` / `DOMAIN_CERTIFICATE_ARN` is not configured (API 404). Do not merge until a human sets it.

---

## Completed slices

### CONFIG-002 — Content-Security-Policy

- **Issue:** [#41](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/41) (shipped)
- **Feature:** `features/config-002-cloudfront-csp.feature`

### CONFIG-004 — Browser security headers

- **Issue:** [#36](https://github.com/bcparks-ar-admin-agentic/issues/36) (shipped)
- **Feature:** `features/config-004-cloudfront-security-headers.feature`

### CONFIG-003 — CloudFront HSTS

- **Issue:** [#32](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/32) (shipped)
- **Feature:** `features/config-003-cloudfront-hsts.feature`

### CRYPTO-001 — Viewer TLS 1.2+ — [#27](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/27)
### LOG-002 — Keycloak lifecycle levels — [#23](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/23)
### LOG-003 — Auth denial logging — [#15](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/15)
### LOG-001 — No config dump — [#19](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/19)
### AUTH-001 — PKCE — [#11](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/11)
### AUTHZ-001 — Admin route guard — [#6](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/6)
