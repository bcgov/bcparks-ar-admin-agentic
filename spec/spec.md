# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### DEP-003 — migrate moment to luxon

- **Issue:** [#94](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/94)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `DEP-003`
- **Feature:** `features/dep-003-moment-to-luxon.feature`

#### Problem

moment maintenance-mode library used alongside luxon in two files.

#### Outcome

moment usages replaced with luxon; moment removed from dependencies.

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
