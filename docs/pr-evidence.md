# PR evidence — [RA TEST-001] TokenInterceptor test coverage

| Field | Value |
| --- | --- |
| PR / branch | current working branch |
| Spec refs | `spec/features/test-001-token-interceptor.feature` |
| Constitution articles touched | none (test-only change) |
| Tasks | TEST-001 |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-08-14T18:52:00Z |

## Intent

Added `src/app/shared/utils/token-interceptor.spec.ts` — a dedicated Jasmine/Karma spec for `TokenInterceptor` using `HttpClientTestingModule`. Zero production code was changed.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| Auth header injected when token present | Yes | Checks `Authorization` header starts with `****** and is non-empty |
| Empty ****** no token | Yes | Checks exact `'Bearer '` header (preserves current behaviour) |
| Non-403 errors pass through without refresh | Yes | 500 and 401 both tested |
| 403 triggers refresh and retry | Yes | Verifies `refreshToken` called once and request retried |
| Refresh failure propagates error | Yes | Verifies error propagates; no logout invented |
| In-flight concurrency: second 403 waits for first refresh | Yes | Uses async `Subject` to simulate overlapping in-flight requests |

## Coverage

`token-interceptor.ts`: **100% statements, 100% branches, 100% functions, 100% lines**

## Residual findings (out of scope — not fixed here)

| Finding | Description | Tracked in |
| --- | --- | --- |
| AUTH-006 | Interceptor refreshes on 403 but not on 401; spec covers 401 pass-through as current behaviour | Future issue |
| AUTH-007 | No host allowlist — Authorization header is sent to all hosts, not just the BC Parks API | Future issue |

---

# PR evidence — [RA CONFIG-002] Missing Content-Security-Policy Header on All CloudFront Cache Behaviors

| Field | Value |
| --- | --- |
| PR / branch | current working branch |
| Spec refs | `spec/spec.md` (CONFIG-002), `spec/features/config-002-cloudfront-csp.feature` |
| Constitution articles touched | J6 |
| Tasks | CONFIG-002 |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-08-14T18:22:00Z |

## Intent

Extended `CloudFrontHSTSResponseHeadersPolicy` in `template.yaml` with a `ContentSecurityPolicy` directive in `SecurityHeadersConfig`. The CSP allowlist is derived from:

- First-party SPA assets (`'self'`)
- Keycloak/loginproxy (`*.gov.bc.ca`, env-specific loginproxy subdomains)
- API Gateway (`*.execute-api.ca-central-1.amazonaws.com`)
- `frame-ancestors 'none'` (complements `X-Frame-Options: DENY`)

All three CloudFront cache behaviors share the same policy so the header is applied uniformly.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| CSP header present on all behaviors | Yes | Shared policy `CloudFrontHSTSResponseHeadersPolicy` |
| `script-src 'self'` | Yes | No CDN scripts, only first-party |
| `connect-src` includes API and loginproxy | Yes | `*.gov.bc.ca`, `*.execute-api.*` |
| `frame-ancestors 'none'` | Yes | Prevents framing |
| `object-src 'none'` | Yes | No plugin content |
| HSTS, CORS, CONFIG-004 headers preserved | Yes | Unchanged |

## Design system & accessibility

No UI changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Static assertion | `grep -n "ContentSecurityPolicy" template.yaml` | Passes |
| Static assertion | `grep -n "frame-ancestors" template.yaml` | Passes |

## Risks & follow-ups

- Live header smoke test after deploy recommended (check `Content-Security-Policy` header via curl or browser devtools).
- If new CDN fonts/scripts are added, `style-src`/`script-src` must be updated.

---

# PR evidence — [RA CONFIG-004] Missing X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy Headers

| Field | Value |
| --- | --- |
| PR / branch | current working branch |
| Spec refs | `spec/spec.md` (CONFIG-004), `spec/features/config-004-cloudfront-security-headers.feature` |
| Constitution articles touched | J6 |
| Tasks | CONFIG-004 |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-08-14T18:10:00Z |

## Intent

Extended `CloudFrontHSTSResponseHeadersPolicy` in `template.yaml` with four additional security headers:

- `X-Frame-Options: DENY` — prevents clickjacking of authenticated admin users
- `X-Content-Type-Options: nosniff` — disables MIME-type sniffing
- `Referrer-Policy: strict-origin-when-cross-origin` — limits referrer leakage
- `Permissions-Policy` (via `CustomHeadersConfig`) — disables unused powerful browser APIs (camera, microphone, geolocation, payment, usb, interest-cohort)

HSTS and CORS from CONFIG-003 are unchanged. CSP (CONFIG-002) is not included per spec scope.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| Sets X-Frame-Options | Yes | `FrameOptions: DENY` in `SecurityHeadersConfig` |
| Sets X-Content-Type-Options: nosniff | Yes | `ContentTypeOptions` in `SecurityHeadersConfig` |
| Sets Referrer-Policy | Yes | `ReferrerPolicy: strict-origin-when-cross-origin` |
| Sets Permissions-Policy | Yes | `CustomHeadersConfig` item |
| HSTS from CONFIG-003 still present | Yes | `StrictTransportSecurity` unchanged |
| CSP not added | Yes | No `ContentSecurityPolicy` block |

## Design system & accessibility

No UI changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Static assertion | `grep -n "FrameOptions" template.yaml` | Passes |
| Static assertion | `grep -n "ContentTypeOptions" template.yaml` | Passes |
| Static assertion | `grep -n "ReferrerPolicy" template.yaml` | Passes |
| Static assertion | `grep -n "Permissions-Policy" template.yaml` | Passes |
| Static assertion | `grep -n "StrictTransportSecurity" template.yaml` | Passes |

## Risks & follow-ups

- Live header smoke test after deploy recommended to confirm all headers emitted.
- `Permissions-Policy` value is restrictive by default; expand if specific APIs are needed in future.

## Human checkpoint 3

Reviewer confirms: PR matches signed spec/plan; no constitution violations; ready to merge.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA CONFIG-003] Missing Strict-Transport-Security (HSTS) Header on All CloudFront Cache Behaviors

| Field | Value |
| --- | --- |
| PR / branch | current working branch |
| Spec refs | `spec/spec.md` (CONFIG-003), `spec/features/config-003-cloudfront-hsts.feature` |
| Constitution articles touched | J6 |
| Tasks | CONFIG-003 |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-08-14T18:00:00Z |

## Intent

Added `AWS::CloudFront::ResponseHeadersPolicy` (`CloudFrontHSTSResponseHeadersPolicy`) to `template.yaml` with `StrictTransportSecurity` (max-age 31536000, includeSubDomains, override) and equivalent CORS settings matching the previous SimpleCORS managed policy. All three CloudFront cache behaviors now reference the new policy via `!Ref CloudFrontHSTSResponseHeadersPolicy` instead of the SimpleCORS policy ID.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| Custom response headers policy sets Strict-Transport-Security | Yes | `CloudFrontHSTSResponseHeadersPolicy` in `template.yaml` |
| All three cache behaviors reference that policy | Yes | `DefaultCacheBehavior` + two `CacheBehaviors` use `!Ref CloudFrontHSTSResponseHeadersPolicy` |
| CORS equivalent to SimpleCORS still declared | Yes | `CorsConfig` block mirrors SimpleCORS (all origins, all methods, all headers, max-age 600) |

## Design system & accessibility

No UI changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Static assertion | `grep -n "StrictTransportSecurity" template.yaml` | Passes |
| Static assertion | `grep -c 'CloudFrontHSTSResponseHeadersPolicy' template.yaml` | 4 (1 resource + 3 refs) |
| Static assertion | `! grep -n "60669652-455b-4ae9-85a4-c4c02393f86c" template.yaml` | Passes (old policy ID absent from cache behaviors) |

## Risks & follow-ups

- Residual live header verification after deploy can confirm the HSTS header is emitted; live testing is intentionally out of scope for merge.
- CSP and X-Frame-Options are explicitly deferred to later slices (CONFIG-002/004).

## Human checkpoint 3

Reviewer confirms: PR matches signed spec/plan; no constitution violations; ready to merge.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA CRYPTO-001] Raise CloudFront viewer TLS minimum

| Field | Value |
| --- | --- |
| PR / branch | current working branch |
| Spec refs | `spec/spec.md` (CRYPTO-001), `spec/features/crypto-001-cloudfront-tls-minimum.feature` |
| Constitution articles touched | P4, P5, P7, J5, J6 |
| Tasks | TASK-001, TASK-002, TASK-003 |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-08-14T17:50:31Z |

## Intent

Raised the CloudFront `ViewerCertificate.MinimumProtocolVersion` in `template.yaml` from `TLSv1` to `TLSv1.2_2021` so viewer connections no longer permit deprecated TLS 1.0/1.1. No certificate ARN, header policy, or origin TLS settings were changed.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| Viewer minimum is TLS 1.2+ | Yes | `template.yaml` now sets `MinimumProtocolVersion: TLSv1.2_2021` |
| Viewer minimum is not `TLSv1` | Yes | Static verification scoped to `template.yaml` confirms `TLSv1` is absent from `ViewerCertificate` |

## Design system & accessibility

No UI changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Static assertion | `grep -n "MinimumProtocolVersion" /home/runner/work/bcparks-ar-admin-agentic/bcparks-ar-admin-agentic/template.yaml` | Passed |
| Static assertion | `! grep -n "MinimumProtocolVersion: TLSv1$" /home/runner/work/bcparks-ar-admin-agentic/bcparks-ar-admin-agentic/template.yaml` | Passed |

## Risks & follow-ups

- Residual human smoke after deploy can confirm negotiated protocols externally; live TLS probing is intentionally out of scope for merge.

## Human checkpoint 3

Reviewer confirms: PR matches signed spec/plan; no constitution violations; ready to merge.

- Reviewer: _______________ Date: _______________

---

# PR evidence — [RA LOG-002] Raise Keycloak lifecycle log levels

| Field | Value |
| --- | --- |
| PR / branch | copilot/ra-log-002-keycloak-authentication-logging |
| Spec refs | `spec/spec.md` (LOG-002), `spec/features/log-002-keycloak-lifecycle-log-levels.feature` |
| Constitution articles touched | P3, P5, P7, J3, J5 |
| Tasks | TASK-001, TASK-002, TASK-003 |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-08-14T17:38:26Z |

## Intent

`KeycloakService` now logs `onAuthError` and `onAuthRefreshError` at `error` level and `onAuthLogout` at `warn` level so those lifecycle events are still visible when debug logging is off. When `preferred_username` is already available, the lifecycle message includes it as a stable identity hint without logging the full token. Local mock auth remains unchanged.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| Auth error logged at warn/error | Yes | `keycloak.service.ts` now emits `loggerService.error(...)` from `onAuthError` |
| Refresh error logged at warn/error | Yes | `keycloak.service.ts` now emits `loggerService.error(...)` from `onAuthRefreshError` |
| Logout logged at warn/error | Yes | `keycloak.service.ts` now emits `loggerService.warn(...)` from `onAuthLogout` |
| Username hint included when available | Yes | Lifecycle log helper appends `preferred_username` from `getUsername()` |

## Design system & accessibility

No UI changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `yarn test-ci --include src/app/services/keycloak.service.spec.ts` | Passed (8/8) |
| Unit | `yarn test-ci` | Passed (208/208) |

## Risks & follow-ups

- Logs remain client-side only; server-side audit capture is explicitly out of scope for LOG-002.

## Human checkpoint 3

Reviewer confirms: PR matches signed spec/plan; no constitution violations; ready to merge.

- Reviewer: _______________ Date: _______________

---

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

---

# PR evidence — [RA AUTH-001] Enable PKCE (S256) on Keycloak OIDC init

| Field | Value |
| --- | --- |
| PR / branch | copilot/fix/auth-001-pkce-s256 |
| Spec refs | spec/features/auth-001-pkce.feature |
| Constitution articles touched | J6 |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-08-12T20:21:00Z |

## Intent

`KeycloakService.init()` now passes `{ pkceMethod: 'S256' }` to the Keycloak JS client for all non-mock sessions, satisfying OAuth 2.0 Security BCP for public OIDC clients (OWASP A07:2021 / CWE-287). Local mock auth (`?localMockAuth=1`) is unaffected — Keycloak `init()` is never called in that path.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| Real session: Keycloak init uses pkceMethod S256 | Yes | `keycloak.service.ts` line `init({ pkceMethod: 'S256' })` |
| Mock auth: Keycloak init not required | Yes | `resolveLocalMockAuth()` short-circuits before KC init; covered by spec test |

## Design system & accessibility

No UI changes.

---

# PR evidence — [RA LOG-001] Do not dump full configuration to browser console

| Field | Value |
| --- | --- |
| PR / branch | current working branch |
| Spec refs | `spec/spec.md` (LOG-001), `spec/features/log-001-no-config-console-dump.feature` |
| Constitution articles touched | J6 |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-08-13T20:54:13.617Z |

## Intent

Removed `console.log('Configuration:', this.configuration)` from `ConfigService.init()` so runtime configuration values are no longer dumped to browser console at `logLevel === 0`.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| No full config dump when logLevel is All (0) | Yes | Verified in `config.service.spec.ts` with `console.log` spy |
| No full config dump when logLevel is not All | Yes | Verified in `config.service.spec.ts` with `console.log` spy |

## Design system & accessibility

No UI changes.

---

# PR evidence — [RA LOG-003] Log authorization failures in AuthGuard

| Field | Value |
| --- | --- |
| PR / branch | copilot/fix/log-003-auth-denial-logging |
| Spec refs | spec/features/log-003-auth-denial-logging.feature |
| Constitution articles touched | J6 |
| Authoring agent | GitHub Copilot Coding Agent |
| Generated | 2026-08-12T22:30:00Z |

## Intent

`AuthGuard` now injects `LoggerService` and emits a `warn`-level log entry before every authorization-failure redirect. Each log entry includes the requested path, the denial reason, and the `preferred_username` identity hint from the session token when available (empty string otherwise). This satisfies LOG-003 (OWASP A09:2021 / CWE-778) without adding any server-side audit endpoint or collecting new personal data beyond what is already in the token.

Additionally, `KeycloakService.getUsername()` is added to expose `preferred_username` for the identity hint.

## Spec traceability

| Scenario / requirement | Implemented? | Notes |
| --- | --- | --- |
| Authenticated but not authorized → warn logged with path + reason | Yes | `auth.guard.ts` logs before `parseUrl('/unauthorized')` |
| Admin-only route denied → warn logged with path + reason | Yes | `auth.guard.ts` logs before each `parseUrl('/')` capability redirect |
| Identity hint (username) included when available | Yes | `keycloak.service.getUsername()` returns `preferred_username` |
| No server-side audit endpoint | Yes | Out of scope; not added |

## Design system & accessibility

No UI changes.

## Tests

| Type | Command / path | Result |
| --- | --- | --- |
| Unit | `yarn test-ci` — `src/app/guards/auth.guard.spec.ts` | Spies assert `logger.warn` called with path + reason for each denial scenario |

## Risks & follow-ups

- Client-side logs are best-effort (browser console); server-side audit is a separate slice.

## Human checkpoint 3

Reviewer confirms: PR matches signed spec/plan; no constitution violations; ready to merge.

- Reviewer: _______________ Date: _______________

---

