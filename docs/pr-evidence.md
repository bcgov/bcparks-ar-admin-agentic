# PR evidence — [RA AUTHZ-001] Fix AuthGuard bypass via query params on admin routes

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-authz-001-fix-authguard-bypass |
| Spec refs | spec/features/authz-001-admin-route-guard.feature |
| Constitution articles touched | P5, P7, J3, J5 |
| Tasks | TASK-001, TASK-002, TASK-003 |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-08-12T17:08:12.846Z |

## Intent

`AuthGuard` now compares the requested admin route by path, ignoring any query string or fragment before evaluating the existing capability checks. This closes the client-side bypass for `/export-reports`, `/lock-records`, `/review-data`, and `/manage-subareas` while preserving normal access for allowed admin users.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| Non-admin denied on `/lock-records?x=1` | Yes | Covered by `src/app/guards/auth.guard.spec.ts` query-string deny case |
| Non-admin denied on `/manage-subareas?foo=bar` | Yes | Covered by `src/app/guards/auth.guard.spec.ts` query-string deny case |
| Non-admin denied on `/export-reports?download=1` | Yes | Covered by `src/app/guards/auth.guard.spec.ts` query-string deny case |
| Admin allowed on `/lock-records?fiscal=2024` | Yes | Covered by `src/app/guards/auth.guard.spec.ts` allow case |
| Path matching ignores fragment / multi-param suffixes | Yes | Covered by deny cases for `/review-data?fiscal=2024#summary` and `/manage-subareas?foo=bar&baz=qux` |


## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | None — no UI component changes |
| Tokens used (not hard-coded colour) | None — no styling changes |
| BC Sans imported | Unchanged |
| Manual a11y notes | No user-facing UI changes; guard redirect behavior only |

## Public-service minimums

Checklist IDs addressed this PR: N/A — no public UI/content change

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `yarn test-ci --include src/app/guards/auth.guard.spec.ts` | Passed (10/10) |
| Acceptance / feature | `spec/features/authz-001-admin-route-guard.feature` via `src/app/guards/auth.guard.spec.ts` | Covered |
| A11y automation | N/A | No UI change |

## Risks & follow-ups

- Client-side route protection is hardened, but backend authorization in `bcparks-ar-api` remains the authoritative control plane.

## Human checkpoint 3

Reviewer confirms: PR matches signed spec/plan; no constitution violations; ready to merge.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA AUTH-001] Enable PKCE (S256) on Keycloak OIDC init

| Field | Value |
| --- | --- |
| PR / branch | copilot/fix/auth-001-pkce-s256 |
| Spec refs | spec/features/auth-001-pkce.feature |
| Constitution articles touched | J6 |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-08-12T20:21:00Z |

## Intent

`KeycloakService.init()` now passes `{ pkceMethod: 'S256' }` to the Keycloak JS client for all non-mock sessions, satisfying OAuth 2.0 Security BCP for public OIDC clients (OWASP A07:2021 / CWE-287). Local mock auth (`?localMockAuth=1`) is unaffected — Keycloak `init()` is never called in that path.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| Real session: Keycloak init uses pkceMethod S256 | Yes | `keycloak.service.ts` line `init({ pkceMethod: 'S256' })` |
| Mock auth: Keycloak init not required | Yes | `resolveLocalMockAuth()` short-circuits before KC init; covered by spec test |

## Design system & accessibility

No UI changes.

---

# PR evidence — [RA LOG-003] Log authorization failures in AuthGuard

| Field | Value |
| --- | --- |
| PR / branch | copilot/fix/log-003-auth-denial-logging |
| Spec refs | spec/features/log-003-auth-denial-logging.feature |
| Constitution articles touched | J6 |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-08-12T22:30:00Z |

## Intent

`AuthGuard` now injects `LoggerService` and emits a `warn`-level log entry before every authorization-failure redirect. Each log entry includes the requested path, the denial reason, and the `preferred_username` identity hint from the session token when available (empty string otherwise). This satisfies LOG-003 (OWASP A09:2021 / CWE-778) without adding any server-side audit endpoint or collecting new personal data beyond what is already in the token.

Additionally, `KeycloakService.getUsername()` is added to expose `preferred_username` for the identity hint.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| Authenticated but not authorized → warn logged with path + reason | Yes | `auth.guard.ts` logs before `parseUrl('/unauthorized')` |
| Admin-only route denied → warn logged with path + reason | Yes | `auth.guard.ts` logs before each `parseUrl('/')` capability redirect |
| Identity hint (username) included when available | Yes | `keycloak.service.getUsername()` returns `preferred_username` |
| No server-side audit endpoint | Yes | Out of scope; not added |

## Design system & accessibility

No UI changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `yarn test-ci` — `src/app/guards/auth.guard.spec.ts` | Spies assert `logger.warn` called with path + reason for each denial scenario |

## Risks & follow-ups

- Client-side logs are best-effort (browser console); server-side audit is a separate slice.

## Human checkpoint 3

Reviewer confirms: PR matches signed spec/plan; no constitution violations; ready to merge.

- Reviewer: _______________ Date: _______________
