# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living slice for the agentic pilot; expand as more rapid-assessment findings are taken up.

## Problem

Staff without elevated permissions can still open certain admin-only screens if they add query parameters to the URL. Route protection compares the full URL string, so a small URL change skips the permission check in the browser. Backend APIs remain the authoritative control, but the admin UI must not present privileged screens to users who should not see them.

## Outcome

Authenticated users without the required capability cannot activate admin-only routes, including when the URL includes query parameters or a fragment. Users with the capability still can. The behaviour is specified in `features/authz-001-admin-route-guard.feature` and verified with automated tests that do not require a live identity provider or API.

## Users & personas

| Persona | Goal |
| --- | --- |
| Park Operator (non-admin) | Enter attendance/revenue; must not reach lock / manage-subareas / export-admin surfaces they are not permitted to use |
| BC Parks sysadmin | Use lock-records, manage-subareas, and related admin routes, including deep links with query params |
| Security reviewer | Confirm client-side route checks are not trivially bypassed |

## Scope

### In scope (this release — issue #6 / AUTHZ-001)

- Close the admin-route guard bypass caused by comparing the full URL (including query/fragment) for:
  - export-reports
  - lock-records
  - review-data
  - manage-subareas
- Unit-test coverage for denied and allowed cases with query strings present

### Out of scope

- Server-side authorization in `bcparks-ar-api` (assumed present; not changed here)
- Adding a logout flow (AUTH-003)
- Header nav visibility for manage-subareas (AUTHZ-003)
- Broader `isAllowed()` fall-through redesign beyond what is needed for path matching (AUTHZ-002) — may be a follow-up
- CloudFront / TLS / CSP findings

## Journeys

1. Non-admin blocked on admin route with query string — see `features/authz-001-admin-route-guard.feature`
2. Admin allowed on admin route with query string — same feature

## Non-functional requirements

- Accessibility: WCAG 2.1 AA (no UI chrome change expected in this slice)
- Privacy: Internal staff app; no new personal data collection
- Availability: No hosting change
- Testability: Fix verifiable via unit tests in CI (`test-ci`)

## Open questions

- [x] Is backend enforcement assumed for privileged mutations? **Yes** — this slice only hardens the UI guard.
- [ ] Should denied attempts be logged client-side (LOG-003)? Deferred to a follow-up issue.

## Traceability

| Finding | Issue | Feature |
| --- | --- | --- |
| RA AUTHZ-001 | #6 | `features/authz-001-admin-route-guard.feature` |

## Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | Pilot — proceed for agentic demo | 2026-08-12 |
| Tech lead | Pilot — proceed for agentic demo | 2026-08-12 |
| QA (acceptance ownership) | Unit tests + feature scenarios | 2026-08-12 |
