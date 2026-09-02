# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### LOG-003 — Log authorization failures in the route guard

- **Issue:** [#57](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/57)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `LOG-003`
- **Feature:** `features/log-003-authz-failure-logging.feature`

#### Problem

When the admin UI denies access (user lacks required roles, or lacks a route-specific capability), the guard redirects without recording any security-relevant log. Probing of authorization boundaries leaves no client-side audit trail.

#### Outcome

Every authorization denial in the route guard emits a warn-level (or equivalent security-appropriate) log entry that includes enough context to investigate the attempt (requested path/URL, denial reason, and a non-secret user identifier when available) and **never** includes access tokens, refresh tokens, passwords, or full credential material.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Security / ops reviewer | See authorization denials in logs when investigating abuse or misconfiguration |
| Parks staff (denied) | Still redirected as today; experience unchanged aside from logging |
| Implementer | Clear acceptance criteria and tests for log level and redaction |

#### Scope

**In scope**

- Log before each authorization-failure redirect in the route guard:
  - authenticated but not authorized for the application (redirect to unauthorized)
  - authenticated and authorized, but not allowed a protected route capability (redirect away from that route)
- Structured, security-relevant fields suitable for audit (e.g. event type, outcome, requested URL/path, denial reason, user id and/or email when present, timestamp)
- Automated tests that document warn-level (or chosen equivalent) behaviour and assert secrets/tokens are not logged
- Preserve existing redirect destinations and allow/deny decisions (logging only; no authz rule changes)

**Out of scope**

- Server-side / centralized SIEM shipping (other LOG-* findings)
- Changing authentication flows, login, or logout
- Changing which roles or capabilities are required
- Broader logging framework redesign (LOG-004+)

#### Open questions

- None blocking. Prefer warn-level via the existing application logger; if log level config would silence warnings in some environments, note that in implementation PR evidence (related: LOG-004) but do not expand scope.

#### Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| BA | | |
| QA (acceptance ownership) | | |

---

## Completed slices (recent)

### LOG-001 — Do not dump full configuration to the browser console

- **Issue:** [#56](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/56) (open; Copilot implementation PR in flight — not yet merged/shipped)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `LOG-001`
- **Feature:** `features/log-001-no-config-console-dump.feature`
- **Note:** Spec/plan for LOG-001 are on `main`; treat as pending ship until #56 is closed. LOG-003 proceeds as the next active rematch slice.

---

## Completed slices

### AUTHZ-001 — Admin route guard path matching

- **Issue:** [#55](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/55) (shipped)
- **Feature:** `features/authz-001-admin-route-guard.feature`
