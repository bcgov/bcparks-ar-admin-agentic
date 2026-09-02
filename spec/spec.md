# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### AUTH-006 — interceptor refresh on 401

- **Issue:** [#85](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/85)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `AUTH-006`
- **Feature:** `features/auth-006-interceptor-401.feature`

#### Problem

TokenInterceptor triggers token refresh on HTTP 403 (should be 401).

#### Outcome

Interceptor refreshes/retries on 401 only; 403 passes through without refresh.

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
