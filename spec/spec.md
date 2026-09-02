# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### AUTH-005 — require KEYCLOAK_CLIENT_ID

- **Issue:** [#84](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/84)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `AUTH-005`
- **Feature:** `features/auth-005-keycloak-client-id.feature`

#### Problem

Hardcoded fallback OAuth client ID 'nrpti-admin' when KEYCLOAK_CLIENT_ID absent.

#### Outcome

Init fails clearly when KEYCLOAK_CLIENT_ID is missing; no nrpti-admin fallback.

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
