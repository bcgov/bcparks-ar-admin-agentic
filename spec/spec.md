# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### LOG-008 — global ErrorHandler

- **Issue:** [#95](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/95)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `LOG-008`
- **Feature:** `features/log-008-global-error-handler.feature`

#### Problem

No custom Angular ErrorHandler; unhandled errors only hit console.error.

#### Outcome

AppErrorHandler registered; unhandled errors logged via LoggerService with sanitized output.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Operators / reviewers | See signed behaviour for this finding |
| Developers | Clear in/out of scope |

#### Scope

**In scope**

- Implement assessment Expected for this finding
- Unit tests as appropriate
- Append evidence; must change src/ or workflows/

**Out of scope**

- Remote monitoring endpoint / SIEM integration
- Unrelated findings

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

- Prior rematch slices 1–30 shipped — see wiki
