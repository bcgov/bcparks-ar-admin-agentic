# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice — LOG-003 (auth denial logging)

**Issue:** [#15](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/15)  
**Finding:** RA LOG-003  
**Feature:** `features/log-003-auth-denial-logging.feature`

### Problem

When staff are signed in but lack the right capability for a page, the app quietly redirects them (to unauthorized or home). Those denials are not written to any log. Someone probing admin routes or hitting unauthorized after login leaves no client-side trail for operators to review.

### Outcome

Every authorization-failure redirect from the route guard records a warn-level log that includes the requested path and why access was denied, plus a stable identity hint when the session already has one (not the raw token). Staff experience (redirect destinations) stays the same. Automated tests prove the log calls without a live identity provider. Building a server-side audit API is not part of this slice.

### Users & personas

| Persona | Goal |
| --- | --- |
| Park Operator / BC Parks staff | Same redirects as today when not allowed |
| Security reviewer / ops | See warn logs when authorization is denied |
| Local developer | Behaviour covered in unit tests; mock auth still works |

### Scope

#### In scope (issue #15)

- Warn-level log on each AuthGuard authorization-failure redirect (not authorized; admin-only route denied)
- Log content: requested path, denial reason, identity hint when available
- Unit tests asserting the log is emitted for both scenarios

#### Out of scope

- Server-side / central audit sink (future finding or platform work)
- Changing who is allowed on which routes (AUTHZ-002 and related)
- Raising Keycloak lifecycle log levels (LOG-002), dumping or scrubbing config logs (LOG-001)
- Logout (AUTH-003), PKCE (shipped), CloudFront headers

### Journeys

1. Unauthorized user denial is logged — see `features/log-003-auth-denial-logging.feature`
2. Admin-only route denial is logged — same feature

### Non-functional requirements

- Accessibility: no UI change expected
- Privacy: only identity hints already present in the session; no new PII collection; do not log full tokens or full config
- Testability: verifiable in CI without live IdP
- Residual: whether warn lines appear in a given environment still depends on configured log level (LOG-004 is separate)

### Open questions (for checkpoint 1 reviewers)

- [ ] Is browser-console warn acceptable for this pilot slice, with server-side audit deferred explicitly?

### Traceability

| Finding | Issue | Feature |
| --- | --- | --- |
| RA LOG-003 | #15 | `features/log-003-auth-denial-logging.feature` |

### Sign-off (checkpoint 1) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| Tech lead | | |
| QA (acceptance ownership) | | |

> Do not add `ready-for-agent` to #15 until this table is filled and this spec PR is merged.

---

## Completed slices

### AUTH-001 — PKCE on Keycloak init

- **Issue:** [#11](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/11) (shipped)
- **Feature:** `features/auth-001-pkce.feature`
- **Summary:** Real Keycloak init uses PKCE S256; local mock auth unchanged.

### AUTHZ-001 — Admin route guard path matching

- **Issue:** [#6](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/6) (shipped)
- **Feature:** `features/authz-001-admin-route-guard.feature`
- **Summary:** Admin-only route checks use the URL path only so query/hash cannot skip capability checks.
