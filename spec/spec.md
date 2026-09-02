# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### BW-002 — export-variance typo fix

- **Issue:** [#91](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/91)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `BW-002`
- **Feature:** `features/bw-002-export-variance-typo.feature`

#### Problem

ExportService uses typo 'expor-variance' causing variance status check to fail silently.

#### Outcome

Endpoint key is 'export-variance'; variance job status is retrieved correctly.

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
