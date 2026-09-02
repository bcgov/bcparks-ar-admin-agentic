# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### LOG-007 — Browser-console logging limitation documented

- **Issue:** [#78](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/78)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `LOG-007`
- **Feature:** `features/log-007-browser-console-logging.feature`

#### Problem

All application logging is browser-console only with no documented persistence or forward path, so operators cannot tell whether SIEM gaps are intentional.

#### Outcome

Logging architecture is documented as console-only today, with an optional future LOG_SHIPPING_ENDPOINT hook described but not implemented. LoggerService carries matching constants/JSDoc so the constraint is visible in src/.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Operators / reviewers | See signed behaviour for this finding |
| Developers | Clear in/out of scope |

#### Scope

**In scope**

- Add docs/logging-architecture.md (console-only + forward path)
- Add LoggerService constants/JSDoc referencing the doc (must touch src/)
- Append evidence

**Out of scope**

- Implementing HTTP log shipping or SIEM SDKs
- Backend audit endpoint

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

### LOG-006 — Structured JSON log format

- **Issue:** [#77](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/77) (shipped)
