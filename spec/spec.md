# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice — TEST-001 (token interceptor coverage)

**Issue:** [#51](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/51)  
**Finding:** RA TEST-001  
**Feature:** `features/test-001-token-interceptor.feature`

### Problem

The HTTP interceptor that attaches the staff session token to outbound requests, and that retries after a 403 by refreshing that token, has no automated tests. Regressions in header injection or refresh/retry would ship unnoticed.

### Outcome

A focused unit spec covers the **current** interceptor behaviour:

1. Authenticated requests get a Bearer token header
2. Non-403 failures pass through without a refresh
3. HTTP 403 triggers a token refresh and retries the request
4. Refresh failure surfaces the error (no new logout path)
5. Concurrent 403s share one in-flight refresh

This slice does **not** change interceptor production code except as required to make tests compile. AUTH-006 (401 vs 403) and AUTH-007 (host allowlist) stay follow-ups. The assessment’s “omit header when unauthenticated” and “logout on refresh failure” are **not** current behaviour and are out of scope.

### Users & personas

| Persona | Goal |
| --- | --- |
| Developer | Catch interceptor regressions in CI |
| Security reviewer | Confirm coverage matches today’s 403-refresh design |

### Scope

#### In scope (#51)

- `token-interceptor.spec.ts` covering the scenarios above
- HttpClient testing module (or equivalent Karma/Jasmine HTTP mocks already in the project)

#### Out of scope

- Changing 403 to 401 (AUTH-006)
- Restricting which hosts receive the Bearer header (AUTH-007)
- Adding logout on refresh failure
- E2E / live Keycloak tests

### Journeys

1. See `features/test-001-token-interceptor.feature`

### Non-functional requirements

- Tests run in existing `yarn test-ci`
- No production behaviour change

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

## Completed slices

### SECRET-001 — Prod certificate input

- **Issue:** [#46](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/46) (paused: `lza-prod` / `DOMAIN_CERTIFICATE_ARN` not configured; draft PR open)
- **Feature:** `features/secret-001-prod-certificate-arn.feature`

### CONFIG-002 — Content-Security-Policy

- **Issue:** [#41](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/41) (shipped)
- **Feature:** `features/config-002-cloudfront-csp.feature`

### CONFIG-004 — Browser security headers

- **Issue:** [#36](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/36) (shipped)
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
