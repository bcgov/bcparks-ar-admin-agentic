# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### TEST-001 — HTTP token interceptor unit coverage

- **Issue:** [#68](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/68)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `TEST-001`
- **Feature:** `features/test-001-token-interceptor.feature`

#### Problem

The HTTP token interceptor injects Bearer Authorization on outbound requests and handles 403 token-refresh/retry. It has **no** dedicated automated tests. Regressions in header injection, refresh, or retry can ship undetected.

#### Outcome

A dedicated unit-test suite for the token interceptor covers the assessment Expected behaviours:

1. Bearer header is injected on authenticated requests (non-empty token).
2. When unauthenticated, the request does **not** carry a usable Bearer token value (assessment preferred: header absent; see Open questions for current empty-`Bearer ` behaviour).
3. HTTP 403 triggers token refresh and request retry with an Authorization header.
4. Refresh failure is observable to the caller; assessment also Expected logout on refresh failure — **residual** until a logout mechanism exists (AUTH-003 / AUTH-004); this slice must not invent logout.

Tests run in CI with Angular HTTP testing utilities (no live IdP). Production interceptor logic is unchanged except if a tiny fix is required for tests to compile against the public API.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Developer / reviewer | Catch interceptor regressions in CI |
| Security reviewer | Evidence that auth-header and 403 refresh paths are covered |
| Parks staff | No user-visible change from this slice |

#### Scope

**In scope**

- New `token-interceptor` unit tests covering `@R-04.1`–`@R-04.6`
- Document residual gaps vs assessment Expected (2) header-absent ideal and (4) logout-on-refresh-failure
- Append `docs/pr-evidence.md` for TEST-001

**Out of scope**

- Changing 403 → 401 refresh trigger (AUTH-006)
- Host allowlist for Bearer injection (AUTH-007)
- Implementing logout or login redirect on refresh failure (AUTH-003 / AUTH-004)
- Broader HTTP client / API service test suites (other TEST-* findings)

#### Open questions

- **Expected (2) — header absent vs empty Bearer:** Current interceptor always sets `Authorization: Bearer ` + token-or-empty. Assessment Expected prefers the header absent when unauthenticated. **Decision for this slice:** tests assert there is no *usable* non-empty Bearer token; do not change production header omission here (may revisit with AUTH-007).
- **Expected (4) — logout on refresh failure:** No logout API exists yet (AUTH-003). **Decision for this slice:** tests assert the refresh error is surfaced and that this PR does not add logout; document assessment Expected (4) as residual in evidence.

#### Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| BA | | |
| QA (acceptance ownership) | | |

---

## Completed slices (recent)

### LOG-003 — Log authorization failures in the route guard

- **Issue:** [#57](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/57) (shipped)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `LOG-003`
- **Feature:** `features/log-003-authz-failure-logging.feature`

### LOG-001 — Do not dump full configuration to the browser console

- **Issue:** [#56](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/56) (shipped)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `LOG-001`
- **Feature:** `features/log-001-no-config-console-dump.feature`

---

## Completed slices

### AUTHZ-001 — Admin route guard path matching

- **Issue:** [#55](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/55) (shipped)
- **Feature:** `features/authz-001-admin-route-guard.feature`
