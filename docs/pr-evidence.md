# PR evidence — [RA AUTHZ-001] Admin route guard ignores query string

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-authz-001-fix-authorization-bypass |
| Spec refs | spec/features/authz-001-admin-route-guard.feature, spec/features/example-happy-path.feature |
| Constitution articles touched | P5, P7, J3, J5 |
| Tasks | AUTHZ-001 entries in spec/tasks.md |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-09-02T17:20:43.332Z |

## Intent

Admin-only route checks now evaluate the route path without query strings or fragments before checking the user's Keycloak capabilities. Authenticated non-admin users are redirected away from protected admin routes even when a URL includes query parameters, while users with the required capability remain allowed.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `authz-001-admin-route-guard.feature` | Yes | Covered by focused Karma/Jasmine tests in `src/app/guards/auth.guard.spec.ts` for `@R-01.1`–`@R-01.5`. |
| `example-happy-path.feature` | Not applicable | Out of scope for AUTHZ-001; listed by evidence generator because it is present under `spec/features/`. |


## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | Not applicable — no UI changes. |
| Tokens used (not hard-coded colour) | Not applicable — no style changes. |
| BC Sans imported | Not applicable — unchanged. |
| Manual a11y notes | Not applicable — route guard logic only. |

## Public-service minimums

Checklist IDs addressed this PR: Not applicable — no user interface changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `yarn test-ci --include src/app/guards/auth.guard.spec.ts` | Passed: 10 SUCCESS |
| Acceptance / feature | `spec/features/authz-001-admin-route-guard.feature` | Implemented by unit coverage for `@R-01.1`–`@R-01.5`. |
| A11y automation | Not run | Not applicable — no UI changes. |

## Risks & follow-ups

- This is client-side route protection and should remain paired with server-side/API authorization for sensitive operations.

## Review receipt (checkpoint 3)

Same shape as `REVIEW.md` — required before merge. Do not replace with a free-form sign-off.

**Checked:** AUTHZ-001 `@R-01.1`–`@R-01.5`; `spec/tasks.md`; targeted guard unit tests.

**Could not check:** Full interactive Keycloak/browser flow; local environment lacks live Keycloak/API dependencies.

**Residual risk:** Client-side guard cannot replace backend authorization; no backend changes are in this UI-only repository.

- Reviewer: _______________ Date: _______________
