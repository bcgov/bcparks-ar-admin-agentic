# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### AUTHZ-005 — isAdmin optional chaining

- **Issue:** [#89](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/89)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `AUTHZ-005`
- **Feature:** `features/authz-005-isadmin-optional-chaining.feature`

#### Problem

isAdmin() optional chain stops before .includes(); atypical JWT without roles throws TypeError.

#### Outcome

isAdmin() returns false safely when roles is missing; no TypeError propagates to canActivate().

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
