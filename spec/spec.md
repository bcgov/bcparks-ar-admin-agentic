# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### AUTHZ-002 — Enforce admin-only export-reports and review-data

- **Issue:** [#71](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/71)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `AUTHZ-002`
- **Feature:** `features/authz-002-admin-only-routes.feature`

#### Problem

`KeycloakService.isAllowed()` only treats `lock-records` and `manage-subareas` as admin-only. `export-reports` and `review-data` always return true for non-admins, so AuthGuard blocks for those routes are dead. A unit test already expects denial for export-reports when `isAllowed` is false — the list was never updated.

#### Outcome

`export-reports` and `review-data` are admin-only capabilities: non-admins are denied by `isAllowed`, admins are allowed. AuthGuard redirects non-admins away from those paths. Unit tests cover service + guard behaviour. Expected is not narrowed.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Non-admin staff | Cannot reach export-reports / review-data |
| Admin staff | Can use those capabilities |
| Security reviewer | Dead guard conditions become live |

#### Scope

**In scope**

- Add `export-reports` and `review-data` to admin-only route list in `isAllowed()`
- Unit tests for isAllowed + AuthGuard redirects
- Evidence; must change `src/`

**Out of scope**

- New routes beyond these two
- Server-side API authorization (companion API)

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

### AUTH-003 — User-initiated logout

- **Issue:** [#70](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/70) (shipped)
- **Feature:** `features/auth-003-logout.feature`

### AUTH-002 / SECRET-001 / AUTH-001 / CONFIG-* / …

- Shipped — see rematch wiki
