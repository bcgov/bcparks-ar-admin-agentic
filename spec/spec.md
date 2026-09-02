# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### AUTHZ-004 — isAdmin role constant

- **Issue:** [#88](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/88)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `AUTHZ-004`
- **Feature:** `features/authz-004-isadmin-role-constant.feature`

#### Problem

isAdmin() uses hardcoded role string instead of centralized constant.

#### Outcome

isAdmin() uses Constants.ApplicationRoles.ADMIN with no behaviour change when value is sysadmin.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Operators / reviewers | See signed behaviour for this finding |
| Developers | Clear in/out of scope |

#### Scope

**In scope**

- Implement assessment Expected for this finding
- Unit tests as appropriate
- Append evidence; must change src/

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

- Prior rematch slices shipped — see wiki
