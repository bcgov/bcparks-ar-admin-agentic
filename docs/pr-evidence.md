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

---

# PR evidence — [RA LOG-001] Do not dump full configuration to console

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-log-001-stop-console-logging |
| Spec refs | spec/features/authz-001-admin-route-guard.feature, spec/features/example-happy-path.feature, spec/features/log-001-no-config-console-dump.feature |
| Constitution articles touched | P3, P5, P7, J3, J5 |
| Tasks | LOG-001 entries in spec/tasks.md |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-09-02T17:26:32.740Z |

## Intent

`ConfigService.init()` no longer writes the full runtime configuration object to the browser console when `logLevel` is `0`. The app continues to load front-end env and optional remote configuration as before, without exposing API or Keycloak settings through a debug console dump.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `authz-001-admin-route-guard.feature` | Not applicable | Out of scope for LOG-001; retained from the feature index. |
| `example-happy-path.feature` | Not applicable | Out of scope for LOG-001; retained from the feature index. |
| `log-001-no-config-console-dump.feature` | Yes | Covered by focused Karma/Jasmine tests in `src/app/services/config.service.spec.ts` for `@R-02.1`. |


## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | Not applicable — no UI changes. |
| Tokens used (not hard-coded colour) | Not applicable — no style changes. |
| BC Sans imported | Not applicable — unchanged. |
| Manual a11y notes | Not applicable — configuration service logic only. |

## Public-service minimums

Checklist IDs addressed this PR: Not applicable — no user interface changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `yarn test-ci --include src/app/services/config.service.spec.ts` | Passed: 5 SUCCESS |
| Lint | `yarn lint` | Passed with existing warnings: 0 errors, 59 `@angular-eslint/prefer-standalone` warnings in unrelated files. |
| Acceptance / feature | `spec/features/log-001-no-config-console-dump.feature` | Implemented by unit coverage for `@R-02.1`. |
| A11y automation | Not run | Not applicable — no UI changes. |

## Risks & follow-ups

- Existing `console.error('Error getting remote configuration:', e)` remains unchanged because broader raw-error logging is tracked by LOG-005 and is out of scope for this slice.

## Review receipt (checkpoint 3)

Same shape as `REVIEW.md` — required before merge. Do not replace with a free-form sign-off.

**Checked:** LOG-001 `@R-02.1`; `spec/tasks.md`; targeted `ConfigService` unit tests.

**Could not check:** Full interactive browser startup against live Keycloak/API configuration; local environment lacks live deployment dependencies.

**Residual risk:** Other console logging findings remain tracked separately; this slice only removes the full configuration dump from `ConfigService.init()`.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA LOG-003] Log authorization failures in AuthGuard

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-log-003-log-authorization-failures |
| Spec refs | spec/features/authz-001-admin-route-guard.feature, spec/features/example-happy-path.feature, spec/features/log-001-no-config-console-dump.feature, spec/features/log-003-authz-failure-logging.feature |
| Constitution articles touched | P3, P5, P7, J3, J5 |
| Tasks | LOG-003 entries in spec/tasks.md |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-09-02T17:37:45.099Z |

## Intent

`AuthGuard` now emits a warn-level, structured security audit log entry (`{ eventType, userId, email, requestedUrl, outcome, timestamp }`) immediately before every authorization-failure redirect: the app-level "not authorized" redirect and all four route-specific capability-denial redirects. `KeycloakService.getUserIdentity()` extracts only the non-secret `sub`/`email` claims from the current token so the guard never logs the raw access token or other credential material. Allowed activations are unaffected and continue to emit no log entry.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `authz-001-admin-route-guard.feature` | Not applicable | Out of scope for LOG-003; retained from the feature index. |
| `example-happy-path.feature` | Not applicable | Out of scope for LOG-003; retained from the feature index. |
| `log-001-no-config-console-dump.feature` | Not applicable | Out of scope for LOG-003; retained from the feature index. |
| `log-003-authz-failure-logging.feature` | Yes | `@R-03.1`–`@R-03.4` covered by focused Karma/Jasmine tests in `src/app/guards/auth.guard.spec.ts` and `src/app/services/keycloak.service.spec.ts`. |


## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | Not applicable — no UI changes. |
| Tokens used (not hard-coded colour) | Not applicable — no style changes. |
| BC Sans imported | Not applicable — unchanged. |
| Manual a11y notes | Not applicable — guard/logging logic only, no rendered UI change. |

## Public-service minimums

Checklist IDs addressed this PR: Not applicable — no user interface changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `yarn test-ci --include src/app/guards/auth.guard.spec.ts --include src/app/services/keycloak.service.spec.ts` | Passed: 21 SUCCESS |
| Lint | `yarn lint` | Passed with existing warnings: 0 errors, 59 pre-existing `@angular-eslint/prefer-standalone` warnings in unrelated files. |
| Acceptance / feature | `spec/features/log-003-authz-failure-logging.feature` | Implemented by unit coverage for `@R-03.1`–`@R-03.4`, including an assertion that no raw token substring appears in the emitted log entry. |
| A11y automation | Not run | Not applicable — no UI changes. |

## Risks & follow-ups

- This is client-side, browser-console logging only (via the existing `LoggerService`); centralized/server-side shipping of these audit events is tracked separately under LOG-007 and is out of scope here.
- `LoggerService` currently defaults to `LogLevel.Off` (tracked separately as LOG-004), which could silence these warn-level entries depending on runtime configuration; no scope change was made to address that here.

## Review receipt (checkpoint 3)

Same shape as `REVIEW.md` — required before merge. Do not replace with a free-form sign-off.

**Checked:** LOG-003 `@R-03.1`–`@R-03.4`; `spec/tasks.md`; targeted `AuthGuard`/`KeycloakService` unit tests; manual review confirming no raw token/secret appears in logged fields.

**Could not check:** Full interactive Keycloak/browser flow; local environment lacks live Keycloak/API dependencies.

**Residual risk:** Logging is browser-console only via `LoggerService`; no server-side/SIEM shipping (LOG-007) and `LogLevel.Off` default (LOG-004) remain tracked as separate findings.

- Reviewer: _______________ Date: _______________
- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA TEST-001] HTTP token interceptor coverage

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-test-001-add-token-interceptor-spec |
| Spec refs | spec/features/authz-001-admin-route-guard.feature, spec/features/example-happy-path.feature, spec/features/log-001-no-config-console-dump.feature, spec/features/log-003-authz-failure-logging.feature, spec/features/test-001-token-interceptor.feature |
| Constitution articles touched | P3, P5, P7, J3, J5 |
| Tasks | TEST-001 entries in `spec/tasks.md` |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-09-02T17:54:30.039Z |

## Intent

`TokenInterceptor` now has focused HttpClient testing coverage for token injection, 403 refresh/retry behavior, refresh failures, non-403 failures, and concurrent 403 handling. Production interceptor behavior is unchanged.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `authz-001-admin-route-guard.feature` | Not applicable | Out of scope for TEST-001; retained from the feature index. |
| `example-happy-path.feature` | Not applicable | Out of scope for TEST-001; retained from the feature index. |
| `log-001-no-config-console-dump.feature` | Not applicable | Out of scope for TEST-001; retained from the feature index. |
| `log-003-authz-failure-logging.feature` | Not applicable | Out of scope for TEST-001; retained from the feature index. |
| `test-001-token-interceptor.feature` | Yes | `@R-04.1`–`@R-04.6` covered by `src/app/shared/utils/token-interceptor.spec.ts`. |


## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | Not applicable — no UI changes. |
| Tokens used (not hard-coded colour) | Not applicable — no style changes. |
| BC Sans imported | Not applicable — unchanged. |
| Manual a11y notes | Not applicable — interceptor test coverage only. |

## Public-service minimums

Checklist IDs addressed this PR: Not applicable — no user interface changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `yarn test-ci --include src/app/shared/utils/token-interceptor.spec.ts` | Passed: 6 SUCCESS; 100% coverage for `token-interceptor.ts`. |
| Acceptance / feature | `spec/features/test-001-token-interceptor.feature` | Implemented by unit coverage for `@R-04.1`–`@R-04.6`. |
| A11y automation | Not run | Not applicable — no UI changes. |

## Risks & follow-ups

- AUTH-003/AUTH-004: refresh failure is surfaced; logout is not present in the production service and remains deferred as required by this slice.
- AUTH-006: only 403 starts a token refresh; 401 behavior remains unchanged.
- AUTH-007: requests are not host-allowlisted; this coverage slice intentionally preserves current behavior.

## Review receipt (checkpoint 3)

Same shape as `REVIEW.md` — required before merge. Do not replace with a free-form sign-off.

**Checked:** TEST-001 `@R-04.1`–`@R-04.6`; `spec/tasks.md`; targeted interceptor unit tests.

**Could not check:** Full interactive Keycloak/browser flow; local environment uses a mocked `KeycloakService`.

**Residual risk:** AUTH-003/AUTH-004 logout, AUTH-006 401 handling, and AUTH-007 request host allowlisting remain explicitly out of scope.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA LOG-002] Keycloak authentication lifecycle log levels

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-log-002-elevate-logging-levels |
| Spec refs | spec/features/authz-001-admin-route-guard.feature, spec/features/example-happy-path.feature, spec/features/log-001-no-config-console-dump.feature, spec/features/log-002-keycloak-lifecycle-log-levels.feature, spec/features/log-003-authz-failure-logging.feature, spec/features/test-001-token-interceptor.feature |
| Constitution articles touched | P1–P8 (confirm) |
| Tasks | see spec/tasks.md |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-09-02T18:07:27.923Z |

## Intent

Keycloak auth error, token refresh error, and logout lifecycle callbacks now emit above-debug log entries through the existing `LoggerService`, while auth success and refresh success remain debug-only. The elevated entries include only a minimal identity hint (`sub` and `email` claims when available) and do not include raw access tokens, refresh tokens, or credentials.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `authz-001-admin-route-guard.feature` | Not applicable | Out of scope for LOG-002; retained from the feature index. |
| `example-happy-path.feature` | Not applicable | Out of scope for LOG-002; retained from the feature index. |
| `log-001-no-config-console-dump.feature` | Not applicable | Out of scope for LOG-002; retained from the feature index. |
| `log-002-keycloak-lifecycle-log-levels.feature` | Yes | `@R-05.1`–`@R-05.4` covered by focused Karma/Jasmine tests in `src/app/services/keycloak.service.spec.ts`. |
| `log-003-authz-failure-logging.feature` | Not applicable | Out of scope for LOG-002; retained from the feature index. |
| `test-001-token-interceptor.feature` | Not applicable | Out of scope for LOG-002; retained from the feature index. |


## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | Not applicable — no UI changes. |
| Tokens used (not hard-coded colour) | Not applicable — no style changes. |
| BC Sans imported | Not applicable — unchanged. |
| Manual a11y notes | Not applicable — Keycloak service logging only, no rendered UI change. |

## Public-service minimums

Checklist IDs addressed this PR: Not applicable — no user interface changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `yarn test-ci --include src/app/services/keycloak.service.spec.ts` | Passed: 10 SUCCESS |
| Lint | `yarn lint` | Passed with existing warnings: 0 errors, 59 pre-existing `@angular-eslint/prefer-standalone` warnings in unrelated files. |
| Acceptance / feature | `spec/features/log-002-keycloak-lifecycle-log-levels.feature` | Implemented by unit coverage for `@R-05.1`–`@R-05.4`, including an assertion that the raw token does not appear in emitted lifecycle log messages. |
| A11y automation | Not run | Not applicable — no UI changes. |

## Risks & follow-ups

- Server-side/SIEM shipping of auth lifecycle audit events remains deferred to LOG-007, as directed by the signed LOG-002 spec slice for this UI-only repository.
- `LoggerService` still defaults to `LogLevel.Off` (tracked separately as LOG-004); this slice only raises the selected lifecycle callbacks above debug.

## Review receipt (checkpoint 3)

Same shape as `REVIEW.md` — required before merge. Do not replace with a free-form sign-off.

**Checked:** LOG-002 `@R-05.1`–`@R-05.4`; `spec/spec.md` active LOG-002 slice; `spec/tasks.md`; targeted `KeycloakService` unit tests; manual review confirming no raw token/secret appears in logged lifecycle message fields.

**Could not check:** Full interactive Keycloak/browser lifecycle against a live IdP; local environment uses a mocked Keycloak JS object.

**Residual risk:** Persistent server-side audit endpoint/shipping is out of scope for LOG-002 and remains tracked as LOG-007; `LogLevel.Off` default remains tracked as LOG-004.

- Reviewer: _______________ Date: _______________
