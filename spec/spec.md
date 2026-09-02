# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### AUTHZ-001 — Admin route guard must ignore query string / fragment

- **Issue:** [#55](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/55)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `AUTHZ-001`
- **Feature:** `features/authz-001-admin-route-guard.feature`

#### Problem

Staff who are authenticated but **not** allowed certain admin capabilities can still open admin-only screens by adding a query string (or fragment) to the URL. The client route guard compares the full URL string to a bare path, so `/lock-records?x=1` fails the equality check and the denial never runs.

#### Outcome

Admin-only routes are enforced on the **path** (query and fragment ignored for the capability check). Non-admins are sent home whether or not they append `?…` / `#…`. Admins who hold the capability still reach the screen with query params intact for legitimate filters.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Parks staff (non-admin) | Use day-to-day A&R screens without seeing or opening admin-only tools |
| Parks admin | Open Lock Records / Manage Subareas / Export Reports, including with filters in the query string |
| Security reviewer | Confirm client-side route protection cannot be bypassed by URL tinkering |

#### Scope

**In scope**

- Fix capability checks for admin-only routes so path matching ignores query string and fragment
- Cover bypass and allow paths with automated scenarios in `authz-001-admin-route-guard.feature` (unit-level verification)

**Out of scope**

- Server-side authorization (API must remain authoritative)
- Changing which roles map to each capability
- Header nav visibility (separate finding AUTHZ-003)

#### Open questions

- None blocking — path-only match is the agreed fix shape from the assessment.

#### Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| BA | | |
| QA (acceptance ownership) | | |

---

## Completed slices

_None yet._
