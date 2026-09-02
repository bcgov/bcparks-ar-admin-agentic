# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### LOG-004 — LoggerService default when logLevel missing

- **Issue:** [#75](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/75)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `LOG-004`
- **Feature:** `features/log-004-logger-default-level.feature`

#### Problem

LoggerService initialises to LogLevel.Off. If env.js omits `logLevel`, ConfigService returns undefined and comparisons silence every log — including security warnings — across the application.

#### Outcome

When `logLevel` is unset, the effective level is **Warn** (not Off). A one-time console warning tells operators to set logLevel explicitly for debug. Warnings and errors remain visible.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Operators | Misconfigured deploys still surface warnings/errors |
| Developers | Clear signal when logLevel was omitted |

#### Scope

**In scope**

- Change LoggerService default / effective-level fallback to Warn
- One-time warn when logLevel unset
- Unit tests; append evidence; must change `src/`

**Out of scope**

- Changing deploy pipeline logLevel values (CONFIG-006)
- Structured JSON format (LOG-006)
- Server-side log shipping (LOG-007)

#### Open questions

- None blocking.

#### Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| BA | | |
| QA (acceptance ownership) | | |

---

## Completed slices (recent)

### CONFIG-006 — Deployment pipeline log levels

- **Issue:** [#73](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/73) (shipped)
- **Feature:** `features/config-006-deploy-log-level.feature`

### CONFIG-005 / AUTHZ-002 / …

- Shipped — see rematch wiki
