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
| Constitution articles touched | P3, P5, P7 |
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
| Authoring agent | GitHub Copilot Coding Agent |
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

---

# PR evidence — [RA CONFIG-006] Deployment pipeline log levels

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-config-006-fix-loglevel-hardcode |
| Spec refs | spec/features/config-006-deploy-log-level.feature |
| Tasks | CONFIG-006 entries in `spec/tasks.md` |
| Authoring agent | GitHub Copilot Coding Agent |

## Intent

Replace the hardcoded `window.__env.logLevel = 0` (`LogLevel.All`) in all three LZA deployment
pipelines with environment-appropriate values, so production and test no longer emit
debug-level console output (including Keycloak OIDC lifecycle events) by default.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `config-006-deploy-log-level.feature` `@R-16.1` | Yes | `lza-deploy-admin-prod.yaml` now sets `window.__env.logLevel = 4` (`LogLevel.Error`), which is not `All` (0) and is Warn or more restrictive. |
| `config-006-deploy-log-level.feature` `@R-16.2` | Yes | `lza-deploy-admin-test.yaml` sets `logLevel = 3` (`Warn`); `lza-deploy-admin-dev.yaml` sets `logLevel = 2` (`Info`), which is more verbose than prod (4) and test (3), and prod remains the most restrictive. |

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Static | `grep -rn "logLevel = 0" .github/workflows/` | PASS — zero matches; no deploy pipeline leaves `logLevel` at `LogLevel.All`. |
| Static | `python3 -c "import yaml; yaml.safe_load(open(f))"` for all three edited workflow files | PASS — YAML remains valid after edits. |
| Manual inspection | `lza-deploy-admin-{prod,test,dev}.yaml` generated `env.js` blocks | PASS — prod=4 (Error), test=3 (Warn), dev=2 (Info); inline comments document the `LogLevel` enum mapping from `src/app/services/logger.service.ts` for future maintainers. |

## Risks & follow-ups

- Accepted gap (out of scope per `spec/spec.md`): runtime log-level switching without
  a redeploy is not implemented; changing the deployed level still requires a pipeline run.
- Accepted gap (out of scope, tracked separately as LOG-007): browser-console logging
  itself is not removed — only the default verbosity is reduced per environment.
- The previously reported `ConfigService.init()` unconditional `console.log('Configuration:', ...)`
  dump was already remediated under LOG-001 (`spec/features/log-001-no-config-console-dump.feature`);
  current `ConfigService.init()` contains no such call, so no additional code change was needed here.
- Local `src/env.js` (used for local dev, not deployed) is unchanged; this residual is
  explicitly accepted as out of scope in `spec/spec.md`.

## Review receipt (checkpoint 3)

**Checked:** All three `.github/workflows/lza-deploy-admin-{prod,test,dev}.yaml` files no longer
contain `logLevel = 0`; prod/test/dev values (4/3/2) match `@R-16.1`/`@R-16.2`; current
`ConfigService.init()` source confirmed to already lack the config-dump `console.log` described
in the issue (remediated previously under LOG-001).

**Could not check:** A live deployment run of the LZA pipelines (sandbox has no AWS/GitHub Actions
execution environment); relied on static YAML inspection and value verification instead.

**Residual risk:** None identified beyond the accepted, explicitly out-of-scope gaps noted above.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA LOG-004] LoggerService default when logLevel missing

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-log-004-update-logger-default-level |
| Spec refs | spec/features/log-004-logger-default-level.feature, spec/spec.md (LOG-004), spec/plan.md, spec/tasks.md |
| Constitution articles touched | N/A — logging behaviour only, no UI/DS component changes |
| Tasks | TASK-001, TASK-002, TASK-003, TASK-004 (spec/tasks.md) |
| Authoring agent | GitHub Copilot coding agent |
| Generated | 2026-09-02T20:38:28.215Z |

## Intent

`LoggerService` previously defaulted its effective log level to `LogLevel.Off` whenever
`ConfigService.logLevel` was `undefined` (i.e. `env.js` omitted `logLevel`), silencing every
log statement including security-relevant warnings and errors. `LoggerService` now falls back
to `LogLevel.Warn` in that case, and emits a one-time `console.warn` telling operators to set
`logLevel` explicitly in `env.js` if they want debug-level logging.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `log-004-logger-default-level.feature` `@R-17.1` | Yes | `LoggerService.shouldLog()` now substitutes `LogLevel.Warn` when `ConfigService.logLevel` is `undefined`, instead of leaving every level below `LogLevel.Off` (6) failing the comparison. `level` field default changed from `LogLevel.Off` to `LogLevel.Warn` to match. |
| `log-004-logger-default-level.feature` `@R-17.2` | Yes | `LoggerService` constructor and `shouldLog()` call a new private `warnMissingLogLevel()` helper that emits `console.warn(...)` exactly once (guarded by `hasWarnedMissingLogLevel`) referencing `logLevel` and instructing operators to set it explicitly for debug logging. |

## Design system & accessibility

N/A — this change is limited to `src/app/services/logger.service.ts` (a non-UI service); no templates, styles, or DS components are touched.

## Public-service minimums

N/A — no UI change.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `npx ng test --watch=false --browsers=ChromeHeadlessNoSandbox --include='**/logger.service.spec.ts'` | PASS — 3/3 (added 2 new specs covering `@R-17.1` default-to-Warn and `@R-17.2` one-time console.warn; existing "should be created" spec still passes) |
| Unit (regression) | `npx ng test --watch=false --browsers=ChromeHeadlessNoSandbox --include='**/config.service.spec.ts'` | PASS — 5/5 unaffected |
| Acceptance / feature | spec/features/log-004-logger-default-level.feature | Mapped 1:1 to the two new unit test cases above (Karma/Jasmine is the project's existing test runner; no separate Gherkin executor is wired up in this repo) |

## Risks & follow-ups

- Misconfigured deployments that omit `logLevel` will now surface more console output (Warn/Error/Fatal) than before, where they were previously silent. This is the intended fix.
- Deploy pipeline `logLevel` values themselves are out of scope (already addressed by CONFIG-006 / #73).

## Review receipt (checkpoint 3)

**Checked:** `src/app/services/logger.service.ts` diff; `src/app/services/logger.service.spec.ts` new specs pass locally against Karma/ChromeHeadless; `config.service.spec.ts` regression pass; manual read-through of `shouldLog()`/constructor logic against both feature scenarios (`@R-17.1`, `@R-17.2`).

**Could not check:** End-to-end verification against a real deployed `env.js` (no CI/deploy environment available in this sandbox); did not run the full test suite (`npm run test-ci`) due to sandbox time constraints — ran targeted specs only.

**Residual risk:** None identified beyond the accepted, explicitly out-of-scope gaps noted above.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA LOG-005] Raw error objects logged directly to console — potential stack trace exposure

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-log-005-sanitize-error-logging |
| Spec refs | spec/features/log-005-sanitize-error-logging.feature, spec/spec.md (LOG-005), spec/plan.md, spec/tasks.md |
| Constitution articles touched | N/A — logging behaviour only, no UI/DS component changes |
| Tasks | TASK-001, TASK-002, TASK-003, TASK-004 (spec/tasks.md) |
| Authoring agent | GitHub Copilot coding agent |
| Generated | 2026-09-02T20:49:40.932Z |

## Intent

`ConfigService.init()` previously called `console.error('Error getting remote configuration:', e)`
with the raw exception object, which can leak failed request URLs and JavaScript stack traces to
anyone with browser DevTools open. `main.ts`'s Angular bootstrap `.catch(err => console.error(err))`
had the same problem. Both paths now log only a sanitised message string: `ConfigService` routes
its error through `LoggerService.error()` (resolved lazily via `Injector` to avoid a constructor-time
circular dependency, since `LoggerService` itself depends on `ConfigService` for its log level), and
`main.ts` logs `err?.message ?? String(err)` instead of the raw error object.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `log-005-sanitize-error-logging.feature` `@R-18.1` | Yes | `ConfigService.init()` catch block now builds a `message` string (`e.message` when available, else `String(e)`) and calls `this.injector.get(LoggerService).error(...)` with that string only; the raw `e` object is never passed to `console.error`. |
| `log-005-sanitize-error-logging.feature` `@R-18.2` | Yes | `main.ts` bootstrap `.catch()` now logs `err?.message ?? String(err)` via `console.error`, not the full error object. |

## Design system & accessibility

N/A — this change is limited to `src/app/services/config.service.ts` and `src/main.ts` (non-UI); no templates, styles, or DS components are touched.

## Public-service minimums

N/A — no UI change.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `npx ng test --watch=false --browsers=ChromeHeadlessNoSandbox --include='**/config.service.spec.ts'` | PASS — 5/5 (updated "should be created and throw" spec to assert the sanitised message is logged via `LoggerService`/`console.log`, not the raw error via `console.error`) |
| Unit (regression) | `npx ng test --watch=false --browsers=ChromeHeadlessNoSandbox --include='**/logger.service.spec.ts'` | PASS — 3/3 unaffected |
| Unit (full suite) | `npx ng test --watch=false --browsers=ChromeHeadlessNoSandbox` | PASS — 234/234 |
| Acceptance / feature | spec/features/log-005-sanitize-error-logging.feature | Mapped 1:1 to the two unit test assertions above (Karma/Jasmine is the project's existing test runner; no separate Gherkin executor is wired up in this repo) |
| Manual | Reviewed `main.ts` diff — bootstrap catch only ever logs `err?.message ?? String(err)` | Confirmed no raw error object reaches `console.error` |

## Risks & follow-ups

- Structured JSON log format (LOG-006), a global `ErrorHandler` (LOG-008), and shipping sanitised
  bootstrap errors to a server-side monitoring endpoint (LOG-007) remain out of scope for this slice,
  as noted in `spec/spec.md`.

## Review receipt (checkpoint 3)

**Checked:** `src/app/services/config.service.ts` and `src/main.ts` diffs; `config.service.spec.ts` updated spec passes locally against Karma/ChromeHeadless; full existing unit test suite (234/234) passes with no regressions; manual read-through confirming no raw error/exception object is passed to `console.error`/`LoggerService.error` on either path.

**Could not check:** End-to-end verification against a real deployed environment or a genuine Angular bootstrap failure (no CI/deploy environment available in this sandbox).

**Residual risk:** None identified beyond the accepted, explicitly out-of-scope follow-ups noted above (LOG-006, LOG-007, LOG-008).

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA LOG-006] Structured JSON log format

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-log-006-redesign-logger-service |
| Spec refs | spec/features/log-006-structured-log-format.feature, spec/spec.md (LOG-006), spec/plan.md, spec/tasks.md |
| Constitution articles touched | N/A — logging behaviour only, no UI/DS component changes |
| Tasks | TASK-001, TASK-002, TASK-003, TASK-004 (spec/tasks.md) |
| Authoring agent | GitHub Copilot coding agent |
| Generated | 2026-09-02T20:58:20.080Z |

## Intent

`LoggerService.log()` previously built a plain-text string via `entryToString()`
(`'(Level) timestamp message'`) with no way to correlate entries with a user, session, or request.
`log()` now builds a structured object — `{ level, timestamp, userId, sessionId, correlationId,
message, context, securityEvent }` — and serializes it with `JSON.stringify()` before passing it to
`console.log()`. `timestamp` is ISO-8601 (`Date.toISOString()`), `userId`/`sessionId`/`correlationId`/
`context` are `null` placeholders (extensible once wired to Keycloak/request context — out of scope
per `spec/spec.md`), and `securityEvent` is `true` whenever the entry is logged at `Warn`/`Error`/
`Fatal` level (i.e. `level >= LogLevel.Warn`), `false` for `Debug`/`Info`.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `log-006-structured-log-format.feature` `@R-19.1` | Yes | `LoggerService.log()` now emits `JSON.stringify({ level, timestamp, userId, sessionId, correlationId, message, context, securityEvent })` instead of a plain-text string; `userId`/`sessionId`/`correlationId` are present as `null` placeholders. |
| `log-006-structured-log-format.feature` `@R-19.2` | Yes | `securityEvent` is computed as `level >= LogLevel.Warn && level !== LogLevel.Off`, so `warn()`, `error()`, and `fatal()` always set it `true`; `debug()`/`info()` set it `false`. |

## Design system & accessibility

N/A — this change is limited to `src/app/services/logger.service.ts` (non-UI); no templates, styles, or DS components are touched.

## Public-service minimums

N/A — no UI change.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `npx ng test --watch=false --browsers=ChromeHeadlessNoSandbox --include='**/logger.service.spec.ts'` | PASS — 5/5 (2 new specs added: JSON-parseable output with required fields for `@R-19.1`; `securityEvent` true for warn/error and false for debug/info for `@R-19.2`) |
| Acceptance / feature | spec/features/log-006-structured-log-format.feature | Mapped 1:1 to the two unit test assertions above (Karma/Jasmine is the project's existing test runner; no separate Gherkin executor is wired up in this repo) |
| Manual | Ran the updated suite and inspected the `console.log` output captured by the spy | Confirmed valid JSON with `level`, `timestamp`, `message`, `userId`, `sessionId`, `correlationId`, `context`, `securityEvent` fields |

## Risks & follow-ups

- SIEM / server-side log shipping (LOG-007), wiring real `userId`/`sessionId`/`correlationId` from
  Keycloak/request context, and a global Angular `ErrorHandler` (LOG-008) remain out of scope for
  this slice, as noted in `spec/spec.md`.

## Review receipt (checkpoint 3)

**Checked:** `src/app/services/logger.service.ts` diff; `logger.service.spec.ts` new/updated specs pass locally against Karma/ChromeHeadless (5/5); manual read-through confirming every `log()` call path (`debug`/`info`/`warn`/`error`/`fatal`) produces valid JSON with the required fields and correct `securityEvent` flag.

**Could not check:** End-to-end verification against a real deployed environment or a genuine log-shipping/SIEM integration (explicitly out of scope for this slice; no CI/deploy environment available in this sandbox).

**Residual risk:** None identified beyond the accepted, explicitly out-of-scope follow-ups noted above (LOG-007, LOG-008, wiring real identity/correlation values).

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA LOG-007] Document browser-console logging limitation

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-log-007-add-server-side-logging |
| Spec refs | spec/features/log-007-browser-console-logging.feature |
| Constitution articles touched | P3, P5, P7, J3, J5 |
| Tasks | LOG-007 entries in spec/tasks.md |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-09-02T21:07:51.407Z |

## Intent

The logging architecture now explicitly documents that LoggerService emits structured entries only to the browser console and has no server-side persistence or SIEM integration. It also documents the inactive, optional `LOG_SHIPPING_ENDPOINT` configuration name as the approved forward path without introducing log shipping.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `log-007-browser-console-logging.feature` `@R-20.1` | Yes | `docs/logging-architecture.md` records console-only output and the absence of server-side persistence and SIEM integration. |
| `log-007-browser-console-logging.feature` `@R-20.2` | Yes | Documents the optional inactive `LOG_SHIPPING_ENDPOINT` hook without requiring an endpoint. |


## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | Not applicable — no UI changes. |
| Tokens used (not hard-coded colour) | Not applicable — no UI changes. |
| BC Sans imported | Not applicable — unchanged. |
| Manual a11y notes | Not applicable — no user-facing changes. |

## Public-service minimums

Checklist IDs addressed this PR: Not applicable — no user interface changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `yarn test-ci --include src/app/services/logger.service.spec.ts` | Passed: 6 SUCCESS |
| Lint | `yarn lint` | Passed: 0 errors; 59 existing unrelated standalone-component warnings. |
| Acceptance / feature | `spec/features/log-007-browser-console-logging.feature` | Satisfied by documentation inspection for `@R-20.1`–`@R-20.2`. |
| A11y automation | Not run | Not applicable — no UI changes. |

## Risks & follow-ups

- Server-side shipping remains intentionally out of scope. A future implementation requires API, retention, access-control, and privacy approval before the reserved configuration name can become active.

## Review receipt (checkpoint 3)

**Checked:** LOG-007 `@R-20.1`–`@R-20.2`; `spec/spec.md`; `spec/tasks.md`; `docs/logging-architecture.md`; LoggerService constant; focused Karma/Jasmine tests and lint.

**Could not check:** A backend shipping endpoint or SIEM integration, because the signed LOG-007 scope explicitly excludes implementation.

**Residual risk:** Browser-console logs remain ephemeral until a separately approved backend log-shipping implementation is delivered.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA SECRET-002] Remove hardcoded non-production AWS account IDs

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-secret-002-remove-hardcoded-aws-ids |
| Spec refs | spec/features/secret-002-nonprod-account-ids.feature |
| Constitution articles touched | P1, P5, P7 |
| Tasks | see spec/tasks.md |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-09-02T21:12:34.381Z |

## Intent

Non-production account IDs and certificate ARNs are no longer committed in deployment
workflows, scripts, SAM defaults, or local parameter variables. Deployments now source
certificate ARNs from GitHub environment variables, while scripts require account/profile
values through environment variables.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `secret-002-nonprod-account-ids.feature` `@R-21.1`–`@R-21.4` | Yes | Workflows use `vars.DOMAIN_CERTIFICATE_ARN`; the SAM parameter has no default; scripts require account/profile environment variables. |


## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | Not applicable — no UI changes. |
| Tokens used (not hard-coded colour) | Not applicable — no UI changes. |
| BC Sans imported | Not applicable — unchanged. |
| Manual a11y notes | Not applicable — no UI changes. |

## Public-service minimums

Checklist IDs addressed this PR: Not applicable — no UI changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Static | Focused Python assertions, `bash -n`, `sam validate --template template.yaml --lint` | Passed |
| Acceptance / feature | spec/features/secret-002-nonprod-account-ids.feature | Satisfied by static workflow, template, and script inspection for `@R-21.1`–`@R-21.4`. |
| A11y automation | Not run | Not applicable — no UI changes. |

## Risks & follow-ups

- GitHub environment variables must be populated before dev/test deployment.

## Review receipt (checkpoint 3)

Same shape as `REVIEW.md` — required before merge. Do not replace with a free-form sign-off.

**Checked:** SECRET-002 `@R-21.1`–`@R-21.4`; `spec/spec.md`; `spec/tasks.md`; changed workflows, scripts, `template.yaml`, and `vars.json`; focused static checks and SAM validation.

**Could not check:** A live deployment or GitHub environment variable configuration; those require the remote AWS/GitHub environments.

**Residual risk:** Deployments fail if required environment variables are missing, which is preferable to silently using an account-specific default.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA SECRET-003] Resolve Route53 hosted zone ID dynamically

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-secret-003-replace-hardcoded-zone-id |
| Spec refs | spec/features/auth-001-pkce.feature, spec/features/auth-002-token-claims.feature, spec/features/auth-003-logout.feature, spec/features/authz-001-admin-route-guard.feature, spec/features/authz-002-admin-only-routes.feature, spec/features/config-002-cloudfront-csp.feature, spec/features/config-003-cloudfront-hsts.feature, spec/features/config-004-cloudfront-security-headers.feature, spec/features/config-005-trivy-triggers.feature, spec/features/config-006-deploy-log-level.feature, spec/features/crypto-001-cloudfront-tls-minimum.feature, spec/features/example-happy-path.feature, spec/features/log-001-no-config-console-dump.feature, spec/features/log-002-keycloak-lifecycle-log-levels.feature, spec/features/log-003-authz-failure-logging.feature, spec/features/log-004-logger-default-level.feature, spec/features/log-005-sanitize-error-logging.feature, spec/features/log-006-structured-log-format.feature, spec/features/log-007-browser-console-logging.feature, spec/features/secret-001-prod-certificate-arn.feature, spec/features/secret-002-nonprod-account-ids.feature, spec/features/secret-003-route53-zone-id.feature, spec/features/test-001-token-interceptor.feature |
| Constitution articles touched | P1–P8 (confirm) |
| Tasks | see spec/tasks.md |
| Authoring agent | unspecified |
| Generated | 2026-09-02T21:17:33.535Z |

## Intent

The pre-migration certificate setup script no longer commits a Route53 hosted zone ID.
It uses `ROUTE53_ZONE_ID` when supplied, or dynamically looks up the `bcparks.ca`
zone and removes the `/hostedzone/` prefix when the variable is unset.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `auth-001-pkce.feature` | TODO | |
| `auth-002-token-claims.feature` | TODO | |
| `auth-003-logout.feature` | TODO | |
| `authz-001-admin-route-guard.feature` | TODO | |
| `authz-002-admin-only-routes.feature` | TODO | |
| `config-002-cloudfront-csp.feature` | TODO | |
| `config-003-cloudfront-hsts.feature` | TODO | |
| `config-004-cloudfront-security-headers.feature` | TODO | |
| `config-005-trivy-triggers.feature` | TODO | |
| `config-006-deploy-log-level.feature` | TODO | |
| `crypto-001-cloudfront-tls-minimum.feature` | TODO | |
| `example-happy-path.feature` | TODO | |
| `log-001-no-config-console-dump.feature` | TODO | |
| `log-002-keycloak-lifecycle-log-levels.feature` | TODO | |
| `log-003-authz-failure-logging.feature` | TODO | |
| `log-004-logger-default-level.feature` | TODO | |
| `log-005-sanitize-error-logging.feature` | TODO | |
| `log-006-structured-log-format.feature` | TODO | |
| `log-007-browser-console-logging.feature` | TODO | |
| `secret-001-prod-certificate-arn.feature` | TODO | |
| `secret-002-nonprod-account-ids.feature` | TODO | |
| `secret-003-route53-zone-id.feature` `@R-22.1`–`@R-22.2` | Yes | The script has no literal hosted zone ID and resolves the zone from the environment or AWS lookup. |
| `test-001-token-interceptor.feature` | TODO | |


## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | Not applicable — no UI changes. |
| Tokens used (not hard-coded colour) | Not applicable — no UI changes. |
| BC Sans imported | Not applicable — unchanged. |
| Manual a11y notes | Not applicable — no UI changes. |

## Public-service minimums

Checklist IDs addressed this PR: Not applicable — no UI changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Static | `bash -n pre-migration-certificate-setup.sh`; focused SECRET-003 assertions | Passed |
| Acceptance / feature | `spec/features/secret-003-route53-zone-id.feature` `@R-22.1`–`@R-22.2` | Satisfied by script inspection and focused static assertions. |
| A11y automation | Not run | Not applicable — no UI changes. |

## Risks & follow-ups

- AWS CLI access and Route53 permissions are required for the fallback lookup at runtime.

## Review receipt (checkpoint 3)

Same shape as `REVIEW.md` — required before merge. Do not replace with a free-form sign-off.

**Checked:** SECRET-003 `@R-22.1`–`@R-22.2`; `spec/spec.md`; `spec/tasks.md`; `pre-migration-certificate-setup.sh`; focused static assertions and `bash -n`.

**Could not check:** A live AWS Route53 lookup or certificate migration; those require the deployment environment.

**Residual risk:** The fallback lookup fails if the configured AWS profile lacks Route53 list permission or the hosted zone is unavailable.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA VULN-001] Render historical pill highlights as plain text

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-vuln-001-fix-stored-xss |
| Spec refs | spec/features/auth-001-pkce.feature, spec/features/auth-002-token-claims.feature, spec/features/auth-003-logout.feature, spec/features/authz-001-admin-route-guard.feature, spec/features/authz-002-admin-only-routes.feature, spec/features/config-002-cloudfront-csp.feature, spec/features/config-003-cloudfront-hsts.feature, spec/features/config-004-cloudfront-security-headers.feature, spec/features/config-005-trivy-triggers.feature, spec/features/config-006-deploy-log-level.feature, spec/features/crypto-001-cloudfront-tls-minimum.feature, spec/features/example-happy-path.feature, spec/features/log-001-no-config-console-dump.feature, spec/features/log-002-keycloak-lifecycle-log-levels.feature, spec/features/log-003-authz-failure-logging.feature, spec/features/log-004-logger-default-level.feature, spec/features/log-005-sanitize-error-logging.feature, spec/features/log-006-structured-log-format.feature, spec/features/log-007-browser-console-logging.feature, spec/features/secret-001-prod-certificate-arn.feature, spec/features/secret-002-nonprod-account-ids.feature, spec/features/secret-003-route53-zone-id.feature, spec/features/test-001-token-interceptor.feature, spec/features/test-003-e2e-scaffold.feature, spec/features/vuln-001-historical-pill-xss.feature |
| Constitution articles touched | P1–P8 (confirm) |
| Tasks | see spec/tasks.md |
| Authoring agent | unspecified |
| Generated | 2026-09-02T21:42:55.566Z |

## Intent

Historical sub-area name highlighting now binds plain-text match segments rather
than generated HTML. Malicious markup is displayed literally and cannot create
elements in the typeahead.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `auth-001-pkce.feature` | TODO | |
| `auth-002-token-claims.feature` | TODO | |
| `auth-003-logout.feature` | TODO | |
| `authz-001-admin-route-guard.feature` | TODO | |
| `authz-002-admin-only-routes.feature` | TODO | |
| `config-002-cloudfront-csp.feature` | TODO | |
| `config-003-cloudfront-hsts.feature` | TODO | |
| `config-004-cloudfront-security-headers.feature` | TODO | |
| `config-005-trivy-triggers.feature` | TODO | |
| `config-006-deploy-log-level.feature` | TODO | |
| `crypto-001-cloudfront-tls-minimum.feature` | TODO | |
| `example-happy-path.feature` | TODO | |
| `log-001-no-config-console-dump.feature` | TODO | |
| `log-002-keycloak-lifecycle-log-levels.feature` | TODO | |
| `log-003-authz-failure-logging.feature` | TODO | |
| `log-004-logger-default-level.feature` | TODO | |
| `log-005-sanitize-error-logging.feature` | TODO | |
| `log-006-structured-log-format.feature` | TODO | |
| `log-007-browser-console-logging.feature` | TODO | |
| `secret-001-prod-certificate-arn.feature` | TODO | |
| `secret-002-nonprod-account-ids.feature` | TODO | |
| `secret-003-route53-zone-id.feature` | TODO | |
| `test-001-token-interceptor.feature` | TODO | |
| `test-003-e2e-scaffold.feature` | TODO | |
| `vuln-001-historical-pill-xss.feature` | Yes | `@R-24.1`–`@R-24.2`: text interpolation and literal malicious-markup rendering test |


## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | Existing historical-pill component |
| Tokens used (not hard-coded colour) | No visual-token changes |
| BC Sans imported | Existing application styling unchanged |
| Manual a11y notes | Preserves the existing semantic spans and highlight class; the content remains readable as text |

## Public-service minimums

Checklist IDs addressed this PR: R-24.1, R-24.2

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `yarn test-ci --include='src/app/shared/components/historical-pill/historical-pill.component.spec.ts'` | Passed: 3/3 |
| Acceptance / feature | `spec/features/vuln-001-historical-pill-xss.feature` | Covered by focused unit test |
| A11y automation | Not applicable; no new interactive UI |

## Risks & follow-ups

- Server-side validation of sub-area names is explicitly out of scope for VULN-001.

## Review receipt (checkpoint 3)

Same shape as `REVIEW.md` — required before merge. Do not replace with a free-form sign-off.

**Checked:** VULN-001 `@R-24.1`–`@R-24.2`; `spec/features/vuln-001-historical-pill-xss.feature`; component TypeScript/template; focused malicious-markup rendering test.

**Could not check:** Live authenticated typeahead against the API; it requires Keycloak and the companion API.

**Residual risk:** Server-side validation is out of scope; this UI now renders all sub-area name content as text.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA AUTH-004] Token refresh failure redirects to login

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-auth-004-fix-token-refresh-redirect |
| Spec refs | spec/features/auth-004-token-refresh-redirect.feature |
| Constitution articles touched | P3, P5, P7, J3, J5 |
| Tasks | AUTH-004 TASK-001–TASK-003 in `spec/tasks.md` |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-09-02T21:52:30.183Z |

## Intent

When a background Keycloak token refresh fails after `onTokenExpired` (session expired or refresh token revoked), `KeycloakService` now logs the failure above debug and forces a full-page navigation to the login page instead of leaving the user in an authenticated-looking state with an unusable token. Successful refreshes are unchanged.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| `auth-004-token-refresh-redirect.feature` | Yes | `@R-25.1` covered by `src/app/services/keycloak.service.spec.ts` ("redirects to login when the background token refresh fails"). The handler is only registered when Keycloak is enabled, so local mock auth is unaffected. |
| All other `spec/features/*.feature` | Not applicable | Out of scope for AUTH-004; retained from the feature index. |

## Design system & accessibility

| Check | Result |
| --- | --- |
| DS components used (list) | Not applicable — no UI markup changes; the existing `/login` page is reused. |
| Tokens used (not hard-coded colour) | Not applicable — no style changes. |
| BC Sans imported | Not applicable — unchanged. |
| Manual a11y notes | Redirect lands on the existing login page, giving a clean re-authentication flow rather than a silent failure state; no new components rendered. |

## Public-service minimums

Checklist IDs addressed this PR: Not applicable — no new user interface elements.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `yarn test-ci --include src/app/services/keycloak.service.spec.ts` | Passed: 29 SUCCESS |
| Unit (full suite) | `yarn test-ci` | Passed: 242 SUCCESS |
| Lint | `yarn lint` | Passed: 0 errors, 59 pre-existing `@angular-eslint/prefer-standalone` warnings in unrelated files. |
| Acceptance / feature | `spec/features/auth-004-token-refresh-redirect.feature` | Implemented by unit coverage for `@R-25.1`, plus tests that a successful refresh does not redirect and that the login URL respects the app base href without looping when already on `/login`. |
| A11y automation | Not run | Not applicable — no UI changes. |

## Risks & follow-ups

- The refresh failure log level was raised from `log` to `error` so the forced redirect is diagnosable; no token material is logged.
- `refreshToken()` (the interceptor-driven refresh path) still surfaces failures to its caller and is unchanged; interceptor 401/403 semantics remain deferred to AUTH-006.
- AUTH-003 logout behaviour is unchanged by this slice.

## Review receipt (checkpoint 3)

Same shape as `REVIEW.md` — required before merge. Do not replace with a free-form sign-off.

**Checked:** AUTH-004 `@R-25.1`; `spec/tasks.md` TASK-001–TASK-003; targeted and full Karma/Jasmine suites; `yarn lint`.

**Could not check:** A live Keycloak session expiring in a deployed environment; the redirect is verified only through unit tests with a mocked adapter.

**Residual risk:** AUTH-006 (401 handling) and AUTH-007 (request host allowlisting) remain out of scope and unaddressed.

- Reviewer: _______________ Date: _______________
