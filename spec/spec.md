# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### LOG-005 — Sanitize error logging

- **Issue:** [#76](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/76)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `LOG-005`
- **Feature:** `features/log-005-sanitize-error-logging.feature`

#### Problem

Raw error objects are logged to the console (ConfigService remote config failures; Angular bootstrap catch), which can expose stack traces and internal URLs in DevTools.

#### Outcome

Failure paths log **message strings only** (via LoggerService where available; message-only console.error at bootstrap). Raw Error objects are not passed to console.error.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Operators | Errors visible without leaking stacks |
| Security reviewers | No raw exception dumps in console |

#### Scope

**In scope**

- ConfigService remote-config error path
- `main.ts` bootstrap catch
- Unit tests; append evidence; must change `src/`

**Out of scope**

- Structured JSON format (LOG-006)
- Global ErrorHandler (LOG-008)
- Server-side shipping (LOG-007)

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

### LOG-004 — LoggerService default when logLevel missing

- **Issue:** [#75](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/75) (shipped)

### CONFIG-006 — Deployment pipeline log levels

- **Issue:** [#73](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/73) (shipped)
