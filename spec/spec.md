# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice — LOG-001 (no full config console dump)

**Issue:** [#19](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/19)  
**Finding:** RA LOG-001  
**Feature:** `features/log-001-no-config-console-dump.feature`

### Problem

When logging is set to the most verbose level, the app prints its entire runtime configuration into the browser console. That dump includes API location and identity-broker details (realm, client id, auth URL). Staff or anyone with DevTools during a verbose session can read those values.

### Outcome

Initialising config never writes the full configuration object to the browser console, including when log level is “all”. Automated tests prove this with a console spy. Optional sanitized/dev-only inspection and changing default log level (LOG-004) are out of scope.

### Users & personas

| Persona | Goal |
| --- | --- |
| Park Operator / BC Parks staff | App starts as today; no extra UI |
| Security reviewer | Confirm config is not dumped to DevTools |
| Local developer | Unit tests cover the verbose log-level path |

### Scope

#### In scope (issue #19)

- Stop logging the full configuration object from config initialisation
- Unit tests: logLevel All (0) and a non-All level — no full dump

#### Out of scope

- Sanitized/pretty config dump for local debug (unless already trivial and not required)
- Default log level Off (LOG-004), Keycloak lifecycle levels (LOG-002), auth denial logging (LOG-003)
- Server-side audit sink, CloudFront headers, logout

### Journeys

1. Verbose log level does not dump full config — see `features/log-001-no-config-console-dump.feature`
2. Other log levels also do not dump full config — same feature

### Non-functional requirements

- Accessibility: no UI change expected
- Privacy: do not log full config, tokens, or secrets
- Testability: verifiable in CI without live IdP or remote config endpoint

### Open questions (for checkpoint 1 reviewers)

- [ ] Accept removing the dump entirely (no sanitized replacement) for this pilot slice?

### Traceability

| Finding | Issue | Feature |
| --- | --- | --- |
| RA LOG-001 | #19 | `features/log-001-no-config-console-dump.feature` |

### Sign-off (checkpoint 1) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| Tech lead | | |
| QA (acceptance ownership) | | |

> Do not add `ready-for-agent` to #19 until this table is filled and this spec PR is merged.

---

## In flight (not this slice)

### LOG-003 — Auth denial logging

- **Issue:** [#15](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/15) · impl [PR #18](https://github.com/bcgov/bcparks-ar-admin-agentic/pull/18) (checkpoint 3 pending)
- **Feature:** `features/log-003-auth-denial-logging.feature`

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
