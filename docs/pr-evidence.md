# PR evidence — [RA CONFIG-005] Enable automatic Trivy security scan triggers

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-config-005-trivy-triggers |
| Spec refs | spec/features/config-005-trivy-triggers.feature |
| Tasks | CONFIG-005 entries in `spec/tasks.md` |
| Authoring agent | GitHub Copilot Coding Agent |

## Intent

The Analysis workflow now runs its existing Trivy vulnerability, secret, and configuration scan on pushes to `main`, pull requests, and a weekly schedule, while retaining manual dispatch.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `config-005-trivy-triggers.feature` `@R-15.1` | Yes | Active `push` (main), `pull_request`, and weekly `schedule` triggers are declared in `.github/workflows/analysis.yaml`. |
| `config-005-trivy-triggers.feature` `@R-15.2` | Yes | Existing Trivy configuration retains `vuln,secret,config` scanners. |

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Static | `.github/workflows/analysis.yaml` | Passed — workflow trigger and Trivy configuration inspection confirms the required active triggers and scanners. |
| Acceptance / feature | `spec/features/config-005-trivy-triggers.feature` | Satisfied by the static workflow inspection above. |

## Risks & follow-ups

- GitHub repository branch protection may still need a maintainer to mark the Analysis workflow as a required status check; branch protection is explicitly out of scope.
- The existing one-minute Trivy timeout is unchanged; a timeout after automatic activation remains a residual operational risk.

## Review receipt (checkpoint 3)

**Checked:** CONFIG-005 `@R-15.1`–`@R-15.2`; `spec/spec.md`; `spec/tasks.md`; `.github/workflows/analysis.yaml`.

**Could not check:** A live GitHub Actions run; workflow execution requires the remote GitHub environment.

**Residual risk:** Required-status branch protection and post-deployment scan verification remain maintainer/CI environment actions; the existing Trivy timeout remains unchanged.

- Reviewer: _______________ Date: _______________

---

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

# PR evidence — [RA CONFIG-004] CloudFront browser security headers

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-config-004-security-headers |
| Spec refs | spec/features/config-004-cloudfront-security-headers.feature |
| Tasks | CONFIG-004 entries in `spec/tasks.md` |
| Authoring agent | GitHub Copilot Coding Agent |

## Intent

The shared CloudFront response headers policy now adds `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive `Permissions-Policy` disabling camera, microphone, geolocation, payment, USB, and interest-cohort capabilities. HSTS and SimpleCORS-equivalent CORS remain unchanged, and CSP is intentionally out of scope for CONFIG-002.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `config-004-cloudfront-security-headers.feature` | Yes | `@R-08.1` is covered by static inspection of the shared policy and all three cache-behaviour references in `template.yaml`. |

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Static | `sam validate --lint --region ca-central-1` | Passed — valid SAM template with native security headers and custom Permissions-Policy header. |
| Static | `grep -n "ResponseHeadersPolicyId" template.yaml` | Confirmed all three cache behaviours reference `!Ref CloudFrontResponseHeadersPolicy`. |
| Acceptance / feature | `spec/features/config-004-cloudfront-security-headers.feature` | Satisfied by the static template checks above. |

## Risks & follow-ups

- Live response-header smoke testing against the deployed CloudFront distribution remains residual and requires deployment; this repository has no live CloudFront test job.

## Review receipt (checkpoint 3)

**Checked:** CONFIG-004 `@R-08.1`; `spec/spec.md`; `spec/tasks.md`; `template.yaml` security-header configuration and three behaviour references; SAM validation.

**Could not check:** Live headers from the deployed CloudFront distribution.

**Residual risk:** Post-deploy verification is deferred; CSP remains separately tracked under CONFIG-002.

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
| Constitution articles touched | P3, P5, P6, J3, J5 |
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

---

# PR evidence — [RA CRYPTO-001] CloudFront viewer TLS minimum version

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-crypto-001-update-tls-minimum-version |
| Spec refs | spec/features/authz-001-admin-route-guard.feature, spec/features/crypto-001-cloudfront-tls-minimum.feature, spec/features/example-happy-path.feature, spec/features/log-001-no-config-console-dump.feature, spec/features/log-002-keycloak-lifecycle-log-levels.feature, spec/features/log-003-authz-failure-logging.feature, spec/features/test-001-token-interceptor.feature |
| Constitution articles touched | P1–P8 (confirm) |
| Tasks | see spec/tasks.md |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-09-02T18:24:21.523Z |

## Intent

`template.yaml` CloudFront `ViewerCertificate.MinimumProtocolVersion` changed from `TLSv1` to `TLSv1.2_2021`, so the edge no longer negotiates TLS 1.0/1.1 viewer connections. Origin-to-CloudFront TLS was already 1.2 and is unchanged.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `authz-001-admin-route-guard.feature` | Not applicable | Out of scope for CRYPTO-001; retained from the feature index. |
| `crypto-001-cloudfront-tls-minimum.feature` | Yes | `@R-06.1` covered by static inspection of `template.yaml`: `MinimumProtocolVersion: TLSv1.2_2021`, no remaining `TLSv1` (bare) value. |
| `example-happy-path.feature` | Not applicable | Out of scope for CRYPTO-001; retained from the feature index. |
| `log-001-no-config-console-dump.feature` | Not applicable | Out of scope for CRYPTO-001; retained from the feature index. |
| `log-002-keycloak-lifecycle-log-levels.feature` | Not applicable | Out of scope for CRYPTO-001; retained from the feature index. |
| `log-003-authz-failure-logging.feature` | Not applicable | Out of scope for CRYPTO-001; retained from the feature index. |
| `test-001-token-interceptor.feature` | Not applicable | Out of scope for CRYPTO-001; retained from the feature index. |


## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | Not applicable — no UI changes. |
| Tokens used (not hard-coded colour) | Not applicable — no style changes. |
| BC Sans imported | Not applicable — unchanged. |
| Manual a11y notes | Not applicable — infrastructure template change only, no rendered UI change. |

## Public-service minimums

Checklist IDs addressed this PR: Not applicable — no user interface changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Static | `grep MinimumProtocolVersion template.yaml` | Confirmed value is `TLSv1.2_2021`; no bare `TLSv1` remains in the `ViewerCertificate` block. |
| Acceptance / feature | `spec/features/crypto-001-cloudfront-tls-minimum.feature` | Satisfied by the static template check for `@R-06.1`. |
| A11y automation | Not run | Not applicable — no UI changes. |

## Risks & follow-ups

- Live TLS handshake smoke against the deployed CloudFront distribution is residual; this PR only changes the SAM template value. Confirming the deployed distribution enforces TLS 1.2+ after the next deploy is a follow-up outside this repo's CI.

## Review receipt (checkpoint 3)

Same shape as `REVIEW.md` — required before merge. Do not replace with a free-form sign-off.

**Checked:** CRYPTO-001 `@R-06.1`; `spec/spec.md` active CRYPTO-001 slice; `spec/tasks.md`; `template.yaml` diff confirming `MinimumProtocolVersion: TLSv1.2_2021`; origin SSL protocols in `template.yaml` remain `TLSv1.2` (unchanged, out of scope).

**Could not check:** Live TLS handshake against the deployed CloudFront distribution; this is an infra template-only change validated statically.

**Residual risk:** Post-deploy live smoke test of the viewer TLS policy is deferred; no code path exists in this repo's CI to exercise a live CloudFront handshake.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA CONFIG-003] CloudFront HSTS on all cache behaviours

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-config-003-fix-hsts-header |
| Spec refs | spec/features/authz-001-admin-route-guard.feature, spec/features/config-003-cloudfront-hsts.feature, spec/features/crypto-001-cloudfront-tls-minimum.feature, spec/features/example-happy-path.feature, spec/features/log-001-no-config-console-dump.feature, spec/features/log-002-keycloak-lifecycle-log-levels.feature, spec/features/log-003-authz-failure-logging.feature, spec/features/test-001-token-interceptor.feature |
| Constitution articles touched | P1–P8 (confirm) |
| Tasks | see spec/tasks.md |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-09-02T18:36:31.007Z |

## Intent

`template.yaml` now declares a custom `AWS::CloudFront::ResponseHeadersPolicy` (`CloudFrontResponseHeadersPolicy`) that emits `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` and preserves CORS behaviour equivalent to the managed SimpleCORS policy. All three cache behaviours (default, `/${ApiStage}/*`, `${BaseHref}*`) reference the custom policy instead of the managed SimpleCORS id, so every response carries HSTS. No other security headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy) are added — those remain with CONFIG-002 / CONFIG-004.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `authz-001-admin-route-guard.feature` | Not applicable | Out of scope for CONFIG-003; retained from the feature index. |
| `config-003-cloudfront-hsts.feature` | Yes | `@R-07.1` covered by static inspection of `template.yaml`: custom response headers policy with `AccessControlMaxAgeSec: 31536000`, `IncludeSubdomains: true`, `Preload: true`, `Override: true`; all three cache behaviours use `!Ref CloudFrontResponseHeadersPolicy`; `CorsConfig` mirrors SimpleCORS (`*` origins, `*` headers, `GET/HEAD/OPTIONS`, credentials false, origin override true). |
| `crypto-001-cloudfront-tls-minimum.feature` | Not applicable | Delivered in a previous slice; unchanged here. |
| `example-happy-path.feature` | Not applicable | Out of scope for CONFIG-003; retained from the feature index. |
| `log-001-no-config-console-dump.feature` | Not applicable | Out of scope for CONFIG-003; retained from the feature index. |
| `log-002-keycloak-lifecycle-log-levels.feature` | Not applicable | Out of scope for CONFIG-003; retained from the feature index. |
| `log-003-authz-failure-logging.feature` | Not applicable | Out of scope for CONFIG-003; retained from the feature index. |
| `test-001-token-interceptor.feature` | Not applicable | Out of scope for CONFIG-003; retained from the feature index. |


## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | Not applicable — no UI changes. |
| Tokens used (not hard-coded colour) | Not applicable — no style changes. |
| BC Sans imported | Not applicable — unchanged. |
| Manual a11y notes | Not applicable — infrastructure template change only, no rendered UI change. |

## Public-service minimums

Checklist IDs addressed this PR: Not applicable — no user interface changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Static | `sam validate --lint --region ca-central-1` | Passed — `template.yaml is a valid SAM Template` with the new `AWS::CloudFront::ResponseHeadersPolicy` resource. |
| Static | `grep -n "ResponseHeadersPolicyId" template.yaml` | All three cache behaviours resolve to `!Ref CloudFrontResponseHeadersPolicy`; the managed SimpleCORS id is no longer referenced. |
| Acceptance / feature | `spec/features/config-003-cloudfront-hsts.feature` | `@R-07.1` satisfied by the static template checks above. |
| A11y automation | Not run | Not applicable — no UI changes. |

## Risks & follow-ups

- Live header smoke (`curl -sI https://dev-ar.bcparks.ca`) against the deployed distribution is residual; this PR only changes the SAM template and no CI job exercises a live CloudFront response.
- `Preload: true` signals preload readiness only; actually submitting the domain to the HSTS preload list is an operator action outside this repo and requires the parent domain owner's agreement (`includeSubDomains` applies to the aliased domain).
- CSP, X-Frame-Options, Referrer-Policy and Permissions-Policy are intentionally not added here; they remain tracked as CONFIG-002 / CONFIG-004.
- The custom policy name is `${AWS::StackName}-${Env}-security-headers`; response headers policy names must be unique per AWS account, so a name collision with a pre-existing policy would fail the stack update.

## Review receipt (checkpoint 3)

Same shape as `REVIEW.md` — required before merge. Do not replace with a free-form sign-off.

**Checked:** CONFIG-003 `@R-07.1`; `spec/spec.md` active CONFIG-003 slice; `spec/plan.md`; `spec/tasks.md`; `template.yaml` diff adding `CloudFrontResponseHeadersPolicy` and wiring all three cache behaviours; `sam validate --lint` passing.

**Could not check:** Live `Strict-Transport-Security` response header from the deployed CloudFront distribution, and live CORS parity after the managed-policy swap; both need a post-deploy smoke test.

**Residual risk:** Post-deploy header/CORS smoke is deferred; HSTS preload list submission remains an operator action; remaining security headers stay with CONFIG-002 / CONFIG-004.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA CONFIG-002] Content-Security-Policy on CloudFront responses

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-config-002-add-csp-header |
| Spec refs | spec/features/config-002-cloudfront-csp.feature |
| Constitution articles touched | P5, P6, P7, J5 |
| Tasks | CONFIG-002 entries in spec/tasks.md |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-09-02T19:00:07.790Z |

## Intent

The shared CloudFront response headers policy now emits a sourced `Content-Security-Policy` on every configured cache behaviour. The policy limits scripts to the app origin, blocks plugins and framing ancestors, and allowlists loginproxy plus attendance/API host patterns for connection, frame, and form flows while preserving HSTS, CORS, and CONFIG-004 headers.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `config-002-cloudfront-csp.feature` | Yes | `@R-09.1` is covered by static inspection of `template.yaml`: the shared `CloudFrontResponseHeadersPolicy` sets CSP and all three behaviours reference that policy. |

## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | Not applicable — no UI changes. |
| Tokens used (not hard-coded colour) | Not applicable — no style changes. |
| BC Sans imported | Not applicable — unchanged. |
| Manual a11y notes | Not applicable — infrastructure header only. |

## Public-service minimums

Checklist IDs addressed this PR: Not applicable — no user interface changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Static | `sam validate --lint --region ca-central-1` | Passed — valid SAM template with CloudFront CSP response header configuration. |
| Static | `grep -n "ContentSecurityPolicy\|ResponseHeadersPolicyId" template.yaml` | Confirmed CSP is configured and all three cache behaviours reference `!Ref CloudFrontResponseHeadersPolicy`. |
| Acceptance / feature | `spec/features/config-002-cloudfront-csp.feature` | Satisfied by the static template checks above. |
| A11y automation | Not run | Not applicable — no UI changes. |

## Risks & follow-ups

- Live header smoke testing against the deployed CloudFront distribution remains residual and requires deployment; this repository has no live CloudFront test job.
- `style-src 'unsafe-inline'` is intentionally retained for the brownfield Angular/Bootstrap app as allowed by the CONFIG-002 spec; scripts remain limited to `'self'`.
- API/connect allowlists use `*.execute-api.${AWSRegion}.amazonaws.com` and `*.bcparks.ca` to avoid silently narrowing environment-specific attendance API hosts beyond the signed spec.
- No CSP `<meta>` fallback was added because the response header is configured on the shared policy used by all three behaviours.

## Review receipt (checkpoint 3)

Same shape as `REVIEW.md` — required before merge. Do not replace with a free-form sign-off.

**Checked:** CONFIG-002 `@R-09.1`; `spec/spec.md`; `spec/plan.md`; `spec/tasks.md`; `template.yaml` CSP directives and three behaviour references; SAM validation.

**Could not check:** Live deployed `Content-Security-Policy` response header, interactive Keycloak login, and live attendance/API calls under CSP; these require a deployed CloudFront distribution and live dependencies.

**Residual risk:** Post-deploy header and authentication/API smoke testing is deferred; the brownfield `style-src 'unsafe-inline'` allowance remains documented above.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA AUTH-001] PKCE S256 on Keycloak OIDC init

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-auth-001-fix-pkce-configuration |
| Spec refs | spec/features/auth-001-pkce.feature, spec/features/authz-001-admin-route-guard.feature, spec/features/config-002-cloudfront-csp.feature, spec/features/config-003-cloudfront-hsts.feature, spec/features/config-004-cloudfront-security-headers.feature, spec/features/crypto-001-cloudfront-tls-minimum.feature, spec/features/example-happy-path.feature, spec/features/log-001-no-config-console-dump.feature, spec/features/log-002-keycloak-lifecycle-log-levels.feature, spec/features/log-003-authz-failure-logging.feature, spec/features/test-001-token-interceptor.feature |
| Constitution articles touched | P5, P6, P7, J2, J5 |
| Tasks | see spec/tasks.md |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-09-02T19:08:08.445Z |

## Intent

Keycloak initialization for real enabled sessions now explicitly uses PKCE with S256. The login flow is otherwise unchanged, while authorization codes are bound to the browser-generated PKCE verifier.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `auth-001-pkce.feature` | Yes | `@R-10.1` is covered by `KeycloakService` unit coverage that asserts `init` receives exactly `{ pkceMethod: 'S256' }` when Keycloak is enabled. |
| Other indexed features | Not applicable | Unchanged and out of scope for AUTH-001. |


## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | Not applicable — no UI changes. |
| Tokens used (not hard-coded colour) | Not applicable — no style changes. |
| BC Sans imported | Not applicable — unchanged. |
| Manual a11y notes | Not applicable — authentication adapter configuration only. |

## Public-service minimums

Checklist IDs addressed this PR: Not applicable — no user interface changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `yarn test-ci --include=src/app/services/keycloak.service.spec.ts` | Passed — 11 tests, including the new assertion for PKCE S256 init options. |
| Acceptance / feature | `spec/features/auth-001-pkce.feature` | `@R-10.1` satisfied by the focused Keycloak service test. |
| A11y automation | Not run | Not applicable — no rendered UI change. |

## Risks & follow-ups

- Keycloak realm/client configuration is outside this repository. A post-deploy login smoke test must confirm the deployed client accepts S256 PKCE.

## Review receipt (checkpoint 3)

Same shape as `REVIEW.md` — required before merge. Do not replace with a free-form sign-off.

**Checked:** AUTH-001 `@R-10.1`; `spec/spec.md`; `spec/tasks.md`; `src/app/services/keycloak.service.ts`; focused Keycloak service unit tests.

**Could not check:** A live Keycloak/loginproxy authorization-code exchange against a deployed client; it requires environment credentials and client configuration outside this repository.

**Residual risk:** The deployed Keycloak client must support S256 PKCE; validate this with an IDIR login smoke test after deployment.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA SECRET-001] Production certificate ARN from GitHub Environment variable

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-secret-001-remove-hardcoded-arn-again |
| Spec refs | spec/features/auth-001-pkce.feature, spec/features/authz-001-admin-route-guard.feature, spec/features/config-002-cloudfront-csp.feature, spec/features/config-003-cloudfront-hsts.feature, spec/features/config-004-cloudfront-security-headers.feature, spec/features/crypto-001-cloudfront-tls-minimum.feature, spec/features/example-happy-path.feature, spec/features/log-001-no-config-console-dump.feature, spec/features/log-002-keycloak-lifecycle-log-levels.feature, spec/features/log-003-authz-failure-logging.feature, spec/features/secret-001-prod-certificate-arn.feature, spec/features/test-001-token-interceptor.feature |
| Constitution articles touched | P1–P8 (confirm) |
| Tasks | see spec/tasks.md |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-09-02T19:14:46.684Z |

## Intent

The production SAM deployment now receives the ACM certificate ARN from the
`DOMAIN_CERTIFICATE_ARN` GitHub Actions environment variable instead of a
committed literal. This keeps the production AWS account identifier out of the
public workflow source.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `secret-001-prod-certificate-arn.feature` | Yes | `DomainCertificateArn` references `vars.DOMAIN_CERTIFICATE_ARN`; no literal ACM ARN remains in the production workflow. |
| Other indexed features | Not applicable | Unchanged and out of scope for SECRET-001. |


## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | Not applicable — no UI changes. |
| Tokens used (not hard-coded colour) | Not applicable — no style changes. |
| BC Sans imported | Not applicable — unchanged. |
| Manual a11y notes | Not applicable — no rendered UI change. |

## Public-service minimums

Checklist IDs addressed this PR: Not applicable — no user interface changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Static acceptance check | `spec/features/secret-001-prod-certificate-arn.feature`; workflow inspection with `rg` | Passed — variable reference is present and no literal ACM ARN/account ID remains. |
| Unit / A11y automation | Not run | No application or rendered UI changes. |

## Risks & follow-ups

- The platform operator must set `DOMAIN_CERTIFICATE_ARN` on the `lza-prod` GitHub Environment before the next production deployment.

## Review receipt (checkpoint 3)

Same shape as `REVIEW.md` — required before merge. Do not replace with a free-form sign-off.

**Checked:** SECRET-001 `@R-11.1`; `spec/spec.md`; `spec/plan.md`;
`spec/tasks.md`; `.github/workflows/lza-deploy-admin-prod.yaml`.

**Could not check:** The configured GitHub Environment variable value and a
live production deployment; both require platform operator access.

**Residual risk:** The production deployment will fail until the platform
operator sets `DOMAIN_CERTIFICATE_ARN` on the `lza-prod` environment.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA AUTH-002] Route role/IDP claim reads through library-verified tokenParsed

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-auth-002-fix-jwt-util-verification |
| Spec refs | spec/features/auth-002-token-claims.feature |
| Constitution articles touched | P5, P7, J3, J5 |
| Tasks | AUTH-002 entries in spec/tasks.md |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-09-02T19:24:21.857Z |

## Intent

`KeycloakService` role, IDP, welcome-message, and identity helpers previously read claims via the custom `JwtUtil.decodeToken()` (a Base64 payload decode with no signature verification). A new `KeycloakService.getTokenClaims()` now returns the Keycloak adapter's own library-verified `tokenParsed`, and `isAuthorized`, `isAdmin`, `getWelcomeMessage`, `getIdpFromToken`, and `getUserIdentity` all read claims through it instead. `isAuthenticated` already relied on the adapter's `authenticated` flag, so authentication and authorization/identity decisions are now aligned on the same library-verified session state. `JwtUtil.decodeToken` itself is left unchanged as a general-purpose utility (out of scope per spec) but is no longer used on the real-auth claim path.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `auth-002-token-claims.feature` (@R-12.1) | Yes | Covered by focused Karma/Jasmine tests in `src/app/services/keycloak.service.spec.ts` asserting `getTokenClaims()`/`tokenParsed` is used and `JwtUtil.decodeToken` is not called for `isAuthorized`, `isAdmin`, `getWelcomeMessage`, `getIdpFromToken`, and `getUserIdentity`. |

## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | Not applicable — no UI changes. |
| Tokens used (not hard-coded colour) | Not applicable — no style changes. |
| BC Sans imported | Not applicable — unchanged. |
| Manual a11y notes | Not applicable — service logic only. |

## Public-service minimums

Checklist IDs addressed this PR: Not applicable — no user interface changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `yarn test-ci --include src/app/services/keycloak.service.spec.ts --include src/app/shared/utils/jwt-utils.spec.ts` | Passed: 18 SUCCESS |
| Acceptance / feature | `spec/features/auth-002-token-claims.feature` | Implemented by unit coverage for `@R-12.1`. |
| A11y automation | Not run | Not applicable — no UI changes. |

## Risks & follow-ups

- `JwtUtil.decodeToken` itself still performs no signature verification; it remains as a utility but is no longer used to drive role/IDP/identity decisions on the real Keycloak auth path (accepted gap per spec: implementing cryptographic verification inside `JwtUtil` is out of scope, since the Keycloak adapter already verifies the session).
- If a `localMockAuth` path is added later, it may still need a decode step (e.g. for a fake token) separate from the real-auth `tokenParsed` path documented here.

## Review receipt (checkpoint 3)

Same shape as `REVIEW.md` — required before merge. Do not replace with a free-form sign-off.

**Checked:** `isAuthorized`, `isAdmin`, `getWelcomeMessage`, `getIdpFromToken`, and `getUserIdentity` all route through `KeycloakService.getTokenClaims()` (`tokenParsed`); `JwtUtil.decodeToken` is no longer imported/used in `keycloak.service.ts`; unit tests assert `decodeToken` spy is not called for each rewired helper; `auth-002-token-claims.feature` @R-12.1.

**Could not check:** End-to-end behaviour against a live Keycloak realm (no IdP available in this environment); relied on unit-level adapter mocks (`tokenParsed`) instead.

**Residual risk:** `JwtUtil.decodeToken` remains unverified and is still exported for any future caller; no lint rule prevents re-introducing it on the real-auth path. Server-side/API authorization remains the enforcement boundary regardless of client-side claim source.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA AUTH-003] User-initiated logout

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-auth-003-add-logout-mechanism |
| Spec refs | spec/features/auth-003-logout.feature |
| Constitution articles touched | P1, P2, P5, P7, J3, J5 |
| Tasks | AUTH-003 entries in spec/tasks.md |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-09-02T19:34:37.089Z |

## Intent

Authenticated staff now have a visible **Log out** control in the application header. Activating it delegates to `KeycloakService.logout()`, which calls the Keycloak adapter logout API with the application base URL as `redirectUri`, allowing users on shared terminals to proactively end their session.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `auth-003-logout.feature` (`@R-13.1`) | Yes | `KeycloakService.logout()` calls `keycloakAuth.logout({ redirectUri })`, using the current app base URL resolved against `window.location.origin`. Covered by `src/app/services/keycloak.service.spec.ts`. |
| `auth-003-logout.feature` (`@R-13.2`) | Yes | Header shows native button controls labelled “Log out” when `KeycloakService.isAuthenticated()` is true, and clicking one invokes `KeycloakService.logout()`. Covered by `src/app/header/header.component.spec.ts`. |
| AuthGuard obsolete comment | Yes | Removed the comment claiming there is no logout and replaced it with wording consistent with logout support. |


## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | Brownfield app follows existing BC Parks/Digital Space Angular stack per constitution P2; added native `<button>` controls using existing Bootstrap/Parks header patterns. BC Design System MCP was not available in this environment. |
| Tokens used (not hard-coded colour) | Existing `$bcgold` and `$secondary-nav` theme tokens; no new hard-coded brand colours. |
| BC Sans imported | Unchanged; no font changes. |
| Manual a11y notes | Log out controls use visible text labels and native buttons, so they are keyboard activatable and exposed with an accessible name. |

## Public-service minimums

Checklist IDs addressed this PR: P1 accessibility baseline for labelled, keyboard-operable controls.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `yarn test-ci --include src/app/services/keycloak.service.spec.ts --include src/app/header/header.component.spec.ts` | Passed: 18 SUCCESS |
| Lint | `yarn lint` | Passed with existing warnings: 0 errors, 59 pre-existing `@angular-eslint/prefer-standalone` warnings. |
| Build | `yarn build` | Passed with pre-existing Sass deprecation/selector warnings from the existing style stack. |
| Acceptance / feature | `spec/features/auth-003-logout.feature` | Implemented by focused service and header unit coverage for `@R-13.1` and `@R-13.2`. |
| A11y automation | Not run | No automated a11y test harness exists for this header slice; manual review performed for native labelled button controls. |

## Risks & follow-ups

- Full live Keycloak logout redirect could not be exercised locally; this repository’s test environment uses mocked Keycloak objects and no live IdP.
- The redirect URI choice is the app base URL resolved from the document `<base>` element against `window.location.origin`, matching the spec preference for current origin / app base URL.
- No `localMockAuth` logout path was invented, per the AUTH-003 out-of-scope constraints.

## Review receipt (checkpoint 3)

Same shape as `REVIEW.md` — required before merge. Do not replace with a free-form sign-off.

**Checked:** AUTH-003 `@R-13.1`–`@R-13.2`; `spec/spec.md` active AUTH-003 slice; `spec/tasks.md`; `KeycloakService.logout()` adapter call; header button visibility/click wiring; obsolete AuthGuard comment removed; focused unit tests, lint, and build.

**Could not check:** End-to-end browser flow against a live Keycloak realm, including actual identity provider logout and post-logout redirect; no live IdP/API dependencies are available in this environment. BC Design System MCP was not available, so UI review used the repository’s brownfield Parks/Digital Space constitution guidance.

**Residual risk:** Logout depends on Keycloak realm/client redirect configuration accepting the app base URL. Post-deploy smoke testing should confirm the configured environment redirects correctly.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA AUTHZ-002] Enforce admin-only access for export-reports and review-data routes

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-authz-002-fix-dead-guard-conditions |
| Spec refs | spec/features/auth-001-pkce.feature, spec/features/auth-002-token-claims.feature, spec/features/auth-003-logout.feature, spec/features/authz-001-admin-route-guard.feature, spec/features/config-002-cloudfront-csp.feature, spec/features/config-003-cloudfront-hsts.feature, spec/features/config-004-cloudfront-security-headers.feature, spec/features/crypto-001-cloudfront-tls-minimum.feature, spec/features/example-happy-path.feature, spec/features/log-001-no-config-console-dump.feature, spec/features/log-002-keycloak-lifecycle-log-levels.feature, spec/features/log-003-authz-failure-logging.feature, spec/features/secret-001-prod-certificate-arn.feature, spec/features/test-001-token-interceptor.feature |
| Constitution articles touched | P1–P8 (confirm) |
| Tasks | see spec/tasks.md |
| Authoring agent | unspecified |
| Generated | 2026-09-02T20:06:01.993Z |

## Intent

`KeycloakService.isAllowed()` hardcoded an `adminOnlyRoutes` array containing only
`lock-records` and `manage-subareas`, so the `AuthGuard.canActivate()` blocks that
guard `/export-reports` and `/review-data` for non-admin users were permanently
dead code — `isAllowed()` returned `true` unconditionally for any route not in
that list. Added `export-reports` and `review-data` to `adminOnlyRoutes` so the
existing guard/sidebar/home-page checks that already call
`isAllowed('export-reports')` / `isAllowed('review-data')` actually enforce the
admin-only restriction, matching the behaviour already asserted by
`auth.guard.spec.ts`.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `auth-001-pkce.feature` | N/A | Not touched by this change |
| `auth-002-token-claims.feature` | N/A | Not touched by this change |
| `auth-003-logout.feature` | N/A | Not touched by this change |
| `authz-001-admin-route-guard.feature` | Yes | `export-reports` and `review-data` now enforced as admin-only, extending existing admin-route-guard coverage |
| `config-002-cloudfront-csp.feature` | N/A | Not touched by this change |
| `config-003-cloudfront-hsts.feature` | N/A | Not touched by this change |
| `config-004-cloudfront-security-headers.feature` | N/A | Not touched by this change |
| `crypto-001-cloudfront-tls-minimum.feature` | N/A | Not touched by this change |
| `example-happy-path.feature` | N/A | Not touched by this change |
| `log-001-no-config-console-dump.feature` | N/A | Not touched by this change |
| `log-002-keycloak-lifecycle-log-levels.feature` | N/A | Not touched by this change |
| `log-003-authz-failure-logging.feature` | Yes | Existing `AuthGuard` audit logging (`not_allowed:export-reports` / `not_allowed:review-data`) now actually fires for non-admins, per `auth.guard.spec.ts` |
| `secret-001-prod-certificate-arn.feature` | N/A | Not touched by this change |
| `test-001-token-interceptor.feature` | N/A | Not touched by this change |


## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | N/A — no UI/template changes, service-layer authorization fix only |
| Tokens used (not hard-coded colour) | N/A |
| BC Sans imported | N/A |
| Manual a11y notes | N/A |

## Public-service minimums

Checklist IDs addressed this PR: N/A (authorization bug fix, no UI change)

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `ng test --include='**/keycloak.service.spec.ts'` | PASS — added `isAllowed()` coverage for `lock-records`, `manage-subareas`, `export-reports`, `review-data` (admin vs. non-admin) plus a non-admin-only route control case |
| Unit | `ng test --include='**/auth.guard.spec.ts'` | PASS (40/40) — pre-existing spec assertions for `export-reports`/`review-data` blocking now exercise real enforcement instead of a permanently-true stub |
| Unit | `ng test --include='**/home.component.spec.ts' --include='**/header.component.spec.ts' --include='**/sidebar.component.spec.ts' --include='**/export-reports.component.spec.ts'` | PASS (11/11) — these specs mock `isAllowed()` directly and are unaffected |
| A11y automation | N/A | No UI change |

## Risks & follow-ups

- Accepted gap: `isAllowed()` remains a hardcoded route-name allowlist rather than
  a data-driven/config-driven permission model. This matches the existing design
  used for `lock-records`/`manage-subareas` and is out of scope for this fix,
  which only closes the AUTHZ-002 gap (dead guard conditions for
  `export-reports`/`review-data`).

## Review receipt (checkpoint 3)

Same shape as `REVIEW.md` — required before merge. Do not replace with a free-form sign-off.

**Checked:** `KeycloakService.isAllowed()` now enforces `sysadmin` role for
`export-reports` and `review-data`, consistent with `lock-records` /
`manage-subareas`; `AuthGuard` unit tests (`auth.guard.spec.ts`) pass unchanged;
new `KeycloakService` unit tests (`keycloak.service.spec.ts`) cover admin/non-admin
outcomes for all four admin-only routes plus a non-admin-only control route.

**Could not check:** End-to-end verification against a live Keycloak realm/token
(sandbox has no Keycloak instance); relied on unit tests with mocked token claims.

**Residual risk:** None identified beyond the accepted gap noted above.

- Reviewer: _______________ Date: _______________
