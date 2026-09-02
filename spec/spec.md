# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### VULN-001 — Historical pill XSS via innerHtml

- **Issue:** [#82](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/82)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `VULN-001`
- **Feature:** `features/vuln-001-historical-pill-xss.feature`

#### Problem

HistoricalPillComponent builds HTML strings and binds them with [innerHtml], enabling stored XSS from sub-area names.

#### Outcome

Highlighting uses plain-text segments with text interpolation (no innerHtml for user-supplied names). Malicious markup displays as text.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Operators / reviewers | See signed behaviour for this finding |
| Developers | Clear in/out of scope |

#### Scope

**In scope**

- HistoricalPillComponent template + getHighlightedMatch
- Unit tests; append evidence; must change src/

**Out of scope**

- Server-side validation of sub-area names

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

### TEST-003 shipped — see rematch wiki
