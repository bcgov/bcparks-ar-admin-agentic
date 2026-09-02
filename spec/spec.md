# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### AUTH-002 — Role/IDP claims from library-verified Keycloak session

- **Issue:** [#69](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/69)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `AUTH-002`
- **Feature:** `features/auth-002-token-claims.feature`

#### Problem

`JwtUtil.decodeToken()` only Base64-decodes the JWT payload — no signature verification. `isAuthorized()`, `isAdmin()`, `getWelcomeMessage()`, and `getIdpFromToken()` (and similar helpers) use that unverified decode, while `isAuthenticated()` trusts the Keycloak adapter. Library auth state and custom claim reads can diverge.

#### Outcome

For a real Keycloak session, role / IDP / welcome / identity helpers read claims from the **Keycloak adapter’s verified parsed token** (`tokenParsed` or equivalent), not via `JwtUtil.decodeToken` on that path. Unit tests prove the helpers use library claims. Client-side controls remain defence-in-depth (API still enforces authz).

#### Users & personas

| Persona | Goal |
| --- | --- |
| Parks staff | Roles/welcome message still work after login |
| Security reviewer | Claim reads aligned with Keycloak session |
| Developer | Unit tests without live IdP |

#### Scope

**In scope**

- Route Keycloak-path claim consumers (`isAuthorized`, `isAdmin`, `getWelcomeMessage`, `getIdpFromToken`, and any other `JwtUtil.decodeToken` callers in `KeycloakService` used for authz/identity) through adapter `tokenParsed`
- Unit tests covering claim source
- Evidence append; must change `src/`

**Out of scope**

- Implementing cryptographic JWT verification inside `JwtUtil` itself (prefer Keycloak library verification)
- Inventing full `localMockAuth` (constitution residual; if added later, mock path may decode a fake token)
- Server-side authorization changes (companion API)

#### Open questions

- **Helper consolidation:** Prefer a single `getTokenClaims()` (or equivalent) used by all KeycloakService claim readers to avoid missing a call site.

#### Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| BA | | |
| QA (acceptance ownership) | | |

---

## Completed slices (recent)

### SECRET-001 — Production certificate ARN not hardcoded in CI

- **Issue:** [#67](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/67) (shipped)
- **Feature:** `features/secret-001-prod-certificate-arn.feature`

### AUTH-001 / CONFIG-* / CRYPTO-001 / LOG-* / TEST-001 / AUTHZ-001

- Shipped — see rematch wiki
