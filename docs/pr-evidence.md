# PR evidence — [RA AUTHZ-001] Fix AuthGuard bypass via query params on admin routes

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-authz-001-fix-authguard-bypass |
| Spec refs | spec/features/authz-001-admin-route-guard.feature |
| Constitution articles touched | P5, P7, J3, J5 |
| Tasks | TASK-001, TASK-002, TASK-003 |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-08-12T17:08:12.846Z |

## Intent

`AuthGuard` now compares the requested admin route by path, ignoring any query string or fragment before evaluating the existing capability checks. This closes the client-side bypass for `/export-reports`, `/lock-records`, `/review-data`, and `/manage-subareas` while preserving normal access for allowed admin users.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| Non-admin denied on `/lock-records?x=1` | Yes | Covered by `src/app/guards/auth.guard.spec.ts` query-string deny case |
| Non-admin denied on `/manage-subareas?foo=bar` | Yes | Covered by `src/app/guards/auth.guard.spec.ts` query-string deny case |
| Non-admin denied on `/export-reports?download=1` | Yes | Covered by `src/app/guards/auth.guard.spec.ts` query-string deny case |
| Admin allowed on `/lock-records?fiscal=2024` | Yes | Covered by `src/app/guards/auth.guard.spec.ts` allow case |
| Path matching ignores fragment / multi-param suffixes | Yes | Covered by deny cases for `/review-data?fiscal=2024#summary` and `/manage-subareas?foo=bar&baz=qux` |


## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | None — no UI component changes |
| Tokens used (not hard-coded colour) | None — no styling changes |
| BC Sans imported | Unchanged |
| Manual a11y notes | No user-facing UI changes; guard redirect behavior only |

## Public-service minimums

Checklist IDs addressed this PR: N/A — no public UI/content change

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `yarn test-ci --include src/app/guards/auth.guard.spec.ts` | Passed (10/10) |
| Acceptance / feature | `spec/features/authz-001-admin-route-guard.feature` via `src/app/guards/auth.guard.spec.ts` | Covered |
| A11y automation | N/A | No UI change |

## Risks & follow-ups

- Client-side route protection is hardened, but backend authorization in `bcparks-ar-api` remains the authoritative control plane.

## Human checkpoint 3

Reviewer confirms: PR matches signed spec/plan; no constitution violations; ready to merge.

- Reviewer: _______________ Date: _______________
