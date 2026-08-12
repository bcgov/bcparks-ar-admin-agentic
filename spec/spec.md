# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice — AUTH-001 (PKCE on login)

**Issue:** [#11](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/11)  
**Finding:** RA AUTH-001  
**Feature:** `features/auth-001-pkce.feature`

### Problem

Staff sign in through the government’s identity broker in the browser. The app starts that login flow without the modern proof-of-possession step (PKCE) that public browser apps are expected to use. Without it, a stolen one-time login code from the redirect could be turned into a session by someone else.

### Outcome

Real browser login uses PKCE (S256). Local mock auth used for stand-up without IdP roles is unchanged. Automated tests prove the real-auth path configures PKCE without needing a live identity provider in CI.

### Users & personas

| Persona | Goal |
| --- | --- |
| Park Operator / BC Parks staff | Sign in safely via IDIR / BCeID as today |
| Security reviewer | Confirm public OIDC client follows PKCE expectation |
| Local developer | Keep `?localMockAuth=1` working without Keycloak |

### Scope

#### In scope (issue #11)

- Enable PKCE S256 on real Keycloak initialisation
- Automated proof (unit/service test) that init options include PKCE S256 for the real-auth path
- Confirm local mock auth still bypasses Keycloak init

#### Out of scope

- Changing Keycloak realm/client settings in `loginproxy.gov.bc.ca` (except documenting if IdP must allow PKCE — expected for modern clients)
- Logout flow (AUTH-003), token refresh UX (AUTH-004), host allowlist on bearer injection (AUTH-007)
- AUTHZ / CloudFront / logging findings

### Journeys

1. Real auth init configures PKCE — see `features/auth-001-pkce.feature`
2. Local mock auth does not require Keycloak PKCE init — same feature

### Non-functional requirements

- Accessibility: no UI change expected
- Privacy: no new personal data collection
- Testability: verifiable in CI without live IdP

### Open questions (for checkpoint 1 reviewers)

- [ ] Does the existing Keycloak client `attendance-and-revenue` already allow/require PKCE, or is any IdP-side change needed? (Likely none for keycloak-js S256; confirm with platform if login fails after the code change.)

### Traceability

| Finding | Issue | Feature |
| --- | --- | --- |
| RA AUTH-001 | #11 | `features/auth-001-pkce.feature` |

### Sign-off (checkpoint 1) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| Tech lead | | |
| QA (acceptance ownership) | | |

> Do not add `ready-for-agent` to #11 until this table is filled and this spec PR is merged.

---

## Completed slices

### AUTHZ-001 — Admin route guard path matching

- **Issue:** [#6](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/6) (shipped)
- **Feature:** `features/authz-001-admin-route-guard.feature`
- **Summary:** Admin-only route checks use the URL path only so query/hash cannot skip capability checks.
