# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### AUTH-003 — User-initiated logout

- **Issue:** [#70](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/70)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `AUTH-003`
- **Feature:** `features/auth-003-logout.feature`

#### Problem

There is no logout: Keycloak login exists, but no `logout()` API and no header control. AuthGuard comments acknowledge the gap. On shared terminals, sessions only end when tokens expire.

#### Outcome

Authenticated staff can **proactively end their session**: `KeycloakService` exposes logout that calls the Keycloak adapter logout with a redirect URI, and the application header shows a **Log out** control when authenticated. AuthGuard comments that claimed “we don’t have a logout” are updated so they don’t contradict behaviour. Unit tests cover service logout (and header wiring as practical).

#### Users & personas

| Persona | Goal |
| --- | --- |
| Parks staff on shared workstation | End session before leaving |
| Security reviewer | Confirm adapter logout + visible control |
| Developer | Unit tests without live IdP |

#### Scope

**In scope**

- `KeycloakService.logout()` → `keycloakAuth.logout({ redirectUri })` (or equivalent)
- Header “Log out” control when authenticated
- Update obsolete AuthGuard comment(s)
- Unit tests; evidence; must change `src/`

**Out of scope**

- Inventing full `localMockAuth` logout path (not present)
- IdP realm logout configuration changes beyond client redirectUri
- Changing IDP selection UX beyond what’s needed once logout exists

#### Open questions

- **Redirect URI:** Prefer current origin / app base URL after logout (document exact choice in evidence).

#### Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| BA | | |
| QA (acceptance ownership) | | |

---

## Completed slices (recent)

### AUTH-002 — Role/IDP claims from library-verified Keycloak session

- **Issue:** [#69](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/69) (shipped)
- **Feature:** `features/auth-002-token-claims.feature`

### SECRET-001 / AUTH-001 / CONFIG-* / …

- Shipped — see rematch wiki
