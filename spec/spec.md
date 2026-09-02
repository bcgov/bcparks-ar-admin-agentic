# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### AUTH-001 — PKCE (S256) on Keycloak OIDC init

- **Issue:** [#62](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/62)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `AUTH-001`
- **Feature:** `features/auth-001-pkce.feature`

#### Problem

Keycloak client is initialised with an empty options object — no PKCE method. For a public browser OIDC client, OAuth 2.0 Security BCP requires PKCE so a stolen authorization code cannot be exchanged for tokens independently.

#### Outcome

When Keycloak is enabled and the adapter is initialised for a real session, init options include **PKCE method S256**. Staff login success path is otherwise unchanged. Unit/service tests prove the init options without a live IdP.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Parks staff | Login still works |
| Security reviewer | Confirm S256 PKCE on real init |
| Developer (local) | Unit tests cover init options |

#### Scope

**In scope**

- Pass `pkceMethod: 'S256'` (or equivalent) on Keycloak adapter init for real auth
- Unit/service test(s) asserting init options
- Evidence append; must change `src/` (refuse evidence-only)

**Out of scope**

- Implementing a full `?localMockAuth=1` feature if not already present (constitution J7 documents intent; this finding is PKCE only — do not silently expand)
- IdP / loginproxy client configuration changes (residual smoke after merge)
- Logout, refresh, or interceptor changes

#### Open questions

- **IdP client support:** Assume loginproxy clients already allow PKCE (standard for public clients). Post-merge IDIR smoke is residual human check.
- **keycloak-js API:** Prefer documented `pkceMethod: 'S256'` on `init()` for the version in package.json.

#### Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| BA | | |
| QA (acceptance ownership) | | |

---

## Completed slices (recent)

### CONFIG-002 — Content-Security-Policy on CloudFront responses

- **Issue:** [#63](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/63) (shipped)
- **Feature:** `features/config-002-cloudfront-csp.feature`

### CONFIG-004 / CONFIG-003 / CRYPTO-001 / LOG-002 / TEST-001 / LOG-003 / LOG-001 / AUTHZ-001

- Shipped — see rematch wiki
