# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### AUTH-007 — Bearer host allowlist

- **Issue:** [#86](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/86)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `AUTH-007`
- **Feature:** `features/auth-007-interceptor-allowlist.feature`

#### Problem

Bearer token injected into every outbound request with no host allowlist.

#### Outcome

Authorization header is added only when request host matches API_LOCATION origin.

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
