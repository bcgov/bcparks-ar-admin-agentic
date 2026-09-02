# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### LOG-002 — Keycloak authentication lifecycle log levels

- **Issue:** [#66](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/66)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `LOG-002`
- **Feature:** `features/log-002-keycloak-lifecycle-log-levels.feature`

#### Problem

Keycloak authentication lifecycle callbacks (`onAuthSuccess`, `onAuthError`, `onAuthRefreshSuccess`, `onAuthRefreshError`, `onAuthLogout`) are logged only at **debug**. In realistic deployments (logger default off / above debug), failed authentication, refresh failures, and logout leave no client-side trail. Messages also omit any non-secret identity context.

#### Outcome

1. `onAuthError`, `onAuthRefreshError`, and `onAuthLogout` emit **warn- or error-level** logs (not debug).
2. Those logs include a **non-secret identity hint** when available (e.g. user id and/or email from token claims — never access/refresh tokens or passwords).
3. Automated tests document the chosen levels and redaction.
4. Assessment also Expected a **persistent server-side audit endpoint** to receive these events — that remains **residual** (tracked under LOG-007); this slice does not invent a new backend.

Success callbacks (`onAuthSuccess` / `onAuthRefreshSuccess`) may remain at debug.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Security / ops reviewer | See auth failures and logout in client logs when debug is off |
| Parks staff | No user-visible change |
| Implementer | Clear levels + identity rules; no token leakage |

#### Scope

**In scope**

- Raise log level for `onAuthError`, `onAuthRefreshError`, `onAuthLogout` in the Keycloak service
- Include non-secret identity when available (reuse existing identity helper if present)
- Unit tests for `@R-05.1`–`@R-05.4`
- Append `docs/pr-evidence.md` for LOG-002; must change `src/`

**Out of scope**

- Server-side / SIEM shipping or new audit HTTP endpoint (LOG-007)
- Changing LoggerService default level (LOG-004)
- AuthGuard denial logging (LOG-003 — shipped)
- Implementing logout UX (AUTH-003)

#### Open questions

- **Server-side audit endpoint:** Assessment Expected includes persistent server-side shipping. **Decision for this slice:** client-side warn/error + identity only; document LOG-007 residual in evidence (do not silently drop — call it residual).
- **Warn vs error:** Prefer `warn` for expected logout and `error`/`warn` for auth/refresh failures; implementer may use warn for all three if simpler — tests accept warn or error.

#### Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| BA | | |
| QA (acceptance ownership) | | |

---

## Completed slices (recent)

### TEST-001 — HTTP token interceptor unit coverage

- **Issue:** [#68](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/68) (shipped)
- **Feature:** `features/test-001-token-interceptor.feature`

### LOG-003 — Log authorization failures in the route guard

- **Issue:** [#57](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/57) (shipped)
- **Feature:** `features/log-003-authz-failure-logging.feature`

### LOG-001 — Do not dump full configuration to the browser console

- **Issue:** [#56](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/56) (shipped)
- **Feature:** `features/log-001-no-config-console-dump.feature`

---

## Completed slices

### AUTHZ-001 — Admin route guard path matching

- **Issue:** [#55](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/55) (shipped)
- **Feature:** `features/authz-001-admin-route-guard.feature`
