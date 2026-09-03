# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### LOG-009 — sanitize debug log identifiers

- **Issue:** [#96](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/96)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `LOG-009`
- **Feature:** `features/log-009-sanitize-debug-logs.feature`

#### Problem

Debug logs interpolate ORCS codes, sub-area IDs, and fiscal values exposing internal identifiers.

#### Outcome

Debug messages use generic labels; identifiers gated behind explicit developer flag or removed.

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
