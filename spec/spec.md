# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### AUTH-004 — Token refresh failure redirects to login

- **Issue:** [#83](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/83)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `AUTH-004`
- **Feature:** `features/auth-004-token-refresh-redirect.feature`

#### Problem

Silent token-refresh failure only logs; users can remain in a broken authenticated-looking state.

#### Outcome

When updateToken fails after onTokenExpired, the app navigates to /login.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Operators / reviewers | See signed behaviour for this finding |
| Developers | Clear in/out of scope |

#### Scope

**In scope**

- KeycloakService onTokenExpired failure path using window.location.assign('/login')
- Unit tests; append evidence; must change src/

**Out of scope**

- Interceptor 401 semantics (AUTH-006)

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

### VULN-001 shipped — see rematch wiki
