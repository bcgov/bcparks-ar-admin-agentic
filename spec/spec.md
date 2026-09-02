# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### LOG-006 — Structured JSON log format

- **Issue:** [#77](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/77)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `LOG-006`
- **Feature:** `features/log-006-structured-log-format.feature`

#### Problem

LoggerService emits unstructured plain-text log lines, which are hard to parse, correlate, or alert on automatically.

#### Outcome

Log entries are emitted as JSON objects with level, timestamp, message, and placeholder identity/correlation fields. Warnings and errors set securityEvent true.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Operators / reviewers | See signed behaviour for this finding |
| Developers | Clear in/out of scope |

#### Scope

**In scope**

- Replace plain-text formatter with JSON serialization in LoggerService
- Unit tests for @R-19.1 / @R-19.2
- Append evidence; must change `src/`

**Out of scope**

- SIEM / server-side shipping (LOG-007)
- Wiring real userId/sessionId from Keycloak

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

### LOG-005 — Sanitize error logging

- **Issue:** [#76](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/76) (shipped)
