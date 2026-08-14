# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice — LOG-002 (Keycloak lifecycle log levels)

**Issue:** [#23](https://github.com/bcparks-ar-admin-agentic/issues/23)  
**Finding:** RA LOG-002  
**Feature:** `features/log-002-keycloak-lifecycle-log-levels.feature`

### Problem

Authentication lifecycle events (success, error, token refresh failure, logout) are only recorded at the most verbose debug level. In typical deployments those messages are silenced, so failed login, failed refresh, and logout leave no client-side trail.

### Outcome

Failed authentication, failed token refresh, and logout are logged at warn or error so they remain visible when debug is off. Success may stay at a quieter level. When a username is already on the session, the log includes that identity hint — not the full token. Local mock auth (no identity-broker init) is unchanged. A server-side audit sink and changing the default log-off setting (LOG-004) are out of scope.

### Users & personas

| Persona | Goal |
| --- | --- |
| Park Operator / BC Parks staff | Login and logout behave as today; no extra UI |
| Security reviewer | Confirm auth errors and logout are logged above debug |
| Local developer | Unit tests fire callbacks and assert log level without a live IdP |

### Scope

#### In scope (issue #23)

- Raise auth-error, refresh-error, and logout lifecycle logs from debug to warn or error
- Optional identity hint from the existing session username helper
- Unit tests that invoke the callbacks and spy the logger

#### Out of scope

- Server-side persistent audit endpoint
- Logger default Off (LOG-004) / pipeline `logLevel = 0` (CONFIG-006)
- AuthGuard denial logging (LOG-003, shipped)
- Logout *feature* (AUTH-003) — we only log the existing callback if it fires

### Journeys

1. Auth or refresh error is logged at warn/error — see `features/log-002-keycloak-lifecycle-log-levels.feature`
2. Logout is logged at warn/error — same feature

### Non-functional requirements

- Accessibility: no UI change expected
- Privacy: identity hint only (username already in token); no full token or config dump
- Testability: verifiable in CI without live IdP

### Open questions (for checkpoint 1 reviewers)

- [x] Accept client-side warn/error only (no new audit API) for this pilot slice.

### Traceability

| Finding | Issue | Feature |
| --- | --- | --- |
| RA LOG-002 | #23 | `features/log-002-keycloak-lifecycle-log-levels.feature` |

### Sign-off (checkpoint 1) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| Tech lead | | |
| QA (acceptance ownership) | | |

> Do not add `ready-for-agent` to #23 until this table is filled and this spec PR is merged.

---

## Completed slices

### LOG-003 — Auth denial logging

- **Issue:** [#15](https://github.com/bcparks-ar-admin-agentic/issues/15) (shipped)
- **Feature:** `features/log-003-auth-denial-logging.feature`
- **Summary:** AuthGuard warn-logs authorization-failure redirects with path, reason, and optional username.

### LOG-001 — No full config console dump

- **Issue:** [#19](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/19) (shipped)
- **Feature:** `features/log-001-no-config-console-dump.feature`
- **Summary:** ConfigService no longer dumps the full runtime configuration object to the browser console.

### AUTH-001 — PKCE on Keycloak init

- **Issue:** [#11](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/11) (shipped)
- **Feature:** `features/auth-001-pkce.feature`
- **Summary:** Real Keycloak init uses PKCE S256; local mock auth unchanged.

### AUTHZ-001 — Admin route guard path matching

- **Issue:** [#6](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/6) (shipped)
- **Feature:** `features/authz-001-admin-route-guard.feature`
- **Summary:** Admin-only route checks use the URL path only so query/hash cannot skip capability checks.
