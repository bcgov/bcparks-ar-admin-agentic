# BC Parks A&R Admin — Rapid Assessment ticket backlog

Source: [`comms/drafts/bcparks-ar-admin-rapid-assessment/`](bcparks-ar-admin-rapid-assessment/) (extracted from `rapid-assessment.zip`, assessment `ra-2026-07-21T171227Z`).
Target repo for issues: [`bcgov/bcparks-ar-admin-agentic-b`](https://github.com/bcgov/bcparks-ar-admin-agentic-b).

Companion CSV (same rows): [`bcparks-ar-admin-rapid-assessment-tickets.csv`](bcparks-ar-admin-rapid-assessment-tickets.csv)

**Pipeline test reset:** 2026-08-31 — all GitHub filing status cleared; pick a row and file the first issue to exercise Tier 2 v3 checkpoints.

**How to use:** pick one row with **GitHub** = `pending` and **File?** = `yes`, open the matching detail section below, then create the issue. After creating, replace `pending` with the issue number/URL.

Dedup: synthesis merged 3 pairs — file primaries only (`CRYPTO-001`, `CONFIG-005`, `VULN-002`). Rows marked `skip-duplicate` should not become separate issues.

Generated: 2026-08-12 · Reset for agentic-b: 2026-08-31 · Raw findings: **55** · Recommended to file: **45** · Optional (Informational): **7** · Skip duplicates: **3**

## Index

| ID | Severity | Domain | Component | Title | File? | GitHub |
| --- | --- | --- | --- | --- | --- | --- |
| AUTH-001 | High | AUTHENTICATION | auth-layer | Keycloak OIDC client initialised with `{}` — PKCE (S256) not config... | yes | #62 |
| AUTHZ-001 | High | AUTHORIZATION | auth-layer | Authorization bypass via URL query parameter injection on admin-onl... | yes | shipped #55 |
| CONFIG-002 | High | CONFIGURATION | cloudfront-cdn | Missing Content-Security-Policy Header on All CloudFront Cache Beha... | yes | #63 |
| CONFIG-003 | High | CONFIGURATION | cloudfront-cdn | Missing Strict-Transport-Security (HSTS) Header on All CloudFront C... | yes | shipped #64 |
| CONFIG-004 | High | CONFIGURATION | cloudfront-cdn | Missing X-Frame-Options, X-Content-Type-Options, Referrer-Policy, a... | yes | #104 |
| LOG-001 | High | SECURITY_LOGGING | shared-infrastructure | Full configuration object written to browser console | yes | shipped #56 |
| LOG-002 | High | SECURITY_LOGGING | auth-layer | Keycloak authentication lifecycle events logged at debug level only | yes | shipped #66 |
| LOG-003 | High | SECURITY_LOGGING | auth-layer | Authorization failures in AuthGuard are never logged | yes | shipped #57 |
| SECRET-001 | High | SECRETS | cloudfront-cdn | Production AWS Account ID Embedded in ACM Certificate ARN in Prod C... | yes | #67 |
| TEST-001 | High | TESTING | auth-layer | HTTP token interceptor has zero test coverage | yes | shipped #68 |
| AUTH-002 | Medium | AUTHENTICATION | auth-layer | Client-side `JwtUtil.decodeToken()` performs no signature verificat... | yes | #69 |
| AUTH-003 | Medium | AUTHENTICATION | auth-layer | No logout mechanism exists; sessions end only on token expiry (risk... | yes | #70 |
| AUTHZ-002 | Medium | AUTHORIZATION | auth-layer | Dead guard conditions for export-reports and review-data — isAllowe... | yes | #71 |
| CONFIG-005 | Medium | CONFIGURATION | cloudfront-cdn | Security Scan Gate (Trivy) Has All Automatic CI/CD Triggers Disabled | yes | #72 |
| CONFIG-006 | Medium | CONFIGURATION | shared-infrastructure | logLevel = 0 (LogLevel.All) Hardcoded in All Deployment Pipelines I... | yes | #73 |
| CRYPTO-001 | Medium | CRYPTOGRAPHY | cloudfront-cdn | CloudFront viewer TLS minimum version permits deprecated TLS 1.0 an... | yes | shipped #74 |
| LOG-004 | Medium | SECURITY_LOGGING | shared-infrastructure | LoggerService defaults to LogLevel.Off — all logging silenced if lo... | yes | #75 |
| LOG-005 | Medium | SECURITY_LOGGING | shared-infrastructure | Raw error objects logged directly to console — potential stack trac... | yes | #76 |
| LOG-006 | Medium | SECURITY_LOGGING | shared-infrastructure | No structured log format — all output is unstructured plain text | yes | #77 |
| LOG-007 | Medium | SECURITY_LOGGING | shared-infrastructure | All application logging is browser-console only — no server-side pe... | yes | #78 |
| SECRET-002 | Medium | SECRETS | cloudfront-cdn | Non-Production AWS Account IDs Hardcoded Across CI/CD Workflows, Sc... | yes | #79 |
| SECRET-003 | Medium | SECRETS | cloudfront-cdn | Route53 Hosted Zone ID Hardcoded in Pre-Migration Script | yes | #80 |
| TEST-003 | Medium | TESTING | angular-spa-shell | No end-to-end or security-focused integration tests exist | yes | #81 |
| VULN-001 | Medium | INJECTION | enter-data-module | Stored XSS via [innerHtml] binding with unsanitized HTML constructi... | yes | #82 |
| AUTH-004 | Low | AUTHENTICATION | auth-layer | Silent token-refresh failure only logs; no forced redirect to `/log... | yes | #83 |
| AUTH-005 | Low | AUTHENTICATION | auth-layer | Hardcoded fallback OAuth client ID `'nrpti-admin'` when `KEYCLOAK_C... | yes | #84 |
| AUTH-006 | Low | AUTHENTICATION | shared-infrastructure | `TokenInterceptor` triggers token refresh on HTTP 403 (should be 401) | yes | #85 |
| AUTH-007 | Low | AUTHENTICATION | shared-infrastructure | Bearer token injected into every outbound request with no host allo... | yes | #86 |
| AUTHZ-003 | Low | AUTHORIZATION | angular-spa-shell | manage-subareas navigation link visible in header for non-admin users | yes | #87 |
| AUTHZ-004 | Low | AUTHORIZATION | auth-layer | isAdmin() uses hardcoded role string instead of centralized constant | yes | #88 |
| AUTHZ-005 | Low | AUTHORIZATION | auth-layer | Incomplete optional chaining in isAdmin() can throw TypeError on at... | yes | #89 |
| BW-001 | Low | CODE_VULNERABILITY | lock-records-module | Lock Records component has no unlock workflow — lock parameter hard... | yes | #90 |
| BW-002 | Low | CODE_VULNERABILITY | export-reports-module | Export service has typo 'expor-variance' — variance job status chec... | yes | #91 |
| DEP-001 | Low | DEPENDENCIES | angular-spa-shell | `chart.js@4.4.1` declared as runtime dependency but never imported ... | yes | #92 |
| DEP-002 | Low | DEPENDENCIES | angular-spa-shell | `jquery@3.7.1` loaded globally but unused by Bootstrap 5 (unused, ~... | yes | #93 |
| DEP-003 | Low | DEPENDENCIES | api-client-services | `moment@2.30.1` maintenance-mode legacy library used alongside `luxon` | yes | #94 |
| LOG-008 | Low | SECURITY_LOGGING | angular-spa-shell | No global Angular ErrorHandler registered — unhandled errors go onl... | yes | #95 |
| LOG-009 | Low | SECURITY_LOGGING | api-client-services | Internal system identifiers included in debug log messages | yes | #96 |
| SECRET-004 | Low | SECRETS | aws-api-gateway | API Gateway Instance ID Hardcoded in SAM Template Default and Deplo... | yes | #97 |
| SECRET-005 | Low | SECRETS | keycloak-idp | Keycloak Client ID and Development Server URLs Committed in Tracked... | yes | #98 |
| TEST-004 | Low | TESTING | shared-infrastructure | Core services data.service, event.service, auto-fetch.service, side... | yes | #99 |
| TEST-005 | Low | TESTING | angular-spa-shell | Deployment pipelines execute build and deploy without running tests | yes | #100 |
| TEST-006 | Low | TESTING | angular-spa-shell | No code coverage threshold configured — coverage can degrade withou... | yes | #101 |
| VULN-002 | Low | INJECTION | api-client-services | URL query string constructed without encodeURIComponent() in ApiSer... | yes | #102 |
| VULN-003 | Low | INJECTION | export-reports-module | window.open() called with backend-supplied signedURL without URL sc... | yes | #103 |
| BW-004 | Informational | AUTHORIZATION | enter-data-module | Activity form loads park/sub-area data from URL query params withou... | optional | pending |
| BW-005 | Informational | CONFIGURATION | shared-infrastructure | AutoFetch background polling interval hardcoded — not drawn from Co... | optional | pending |
| DEP-004 | Informational | DEPENDENCIES | angular-spa-shell | `@babel/traverse@7.23.2` (build tool) misclassified in runtime depe... | optional | pending |
| DEP-005 | Informational | DEPENDENCIES | angular-spa-shell | `@typescript-eslint/types` (lint tool) misclassified in runtime dep... | optional | pending |
| DEP-006 | Informational | DEPENDENCIES | shared-infrastructure | `guid-typescript@1.0.9` unmaintained (no updates since 2018) — supp... | optional | pending |
| DEP-007 | Informational | DEPENDENCIES | enter-data-module | `@digitalspace/ngds-forms/toolkit@0.0.111` pre-release internal pac... | optional | pending |
| TEST-007 | Informational | TESTING | shared-infrastructure | nav-card and non-resident-revenue shared components have no test co... | optional | pending |
| CONFIG-001 | High | CRYPTOGRAPHY | cloudfront-cdn | TLS 1.0/1.1 Allowed as Minimum Protocol Version on CloudFront Viewe... | skip-duplicate → CRYPTO-001 | pending |
| TEST-002 | Medium | TESTING | angular-spa-shell | Trivy security scan workflow disabled for all automatic triggers | skip-duplicate → CONFIG-005 | pending |
| BW-003 | Low | CODE_VULNERABILITY | api-client-services | API query string builder does not URL-encode parameter values | skip-duplicate → VULN-002 | pending |

---

## Ticket details (copy into GitHub)

### AUTH-001

- **Suggested title:** [RA AUTH-001] Keycloak OIDC client initialised with {} — PKCE (S256) not configured for a public brow...
- **Severity:** High
- **Domain / OWASP / CWE:** AUTHENTICATION / A07:2021 / CWE-287
- **Component:** auth-layer
- **Location:** `src/app/services/keycloak.service.ts:86-87`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:high, domain:authentication`
- **Cross-refs:** —

<details>
<summary>Issue body for AUTH-001</summary>

```markdown
## Problem

Keycloak client initialised with empty options object `{}` — no `pkceMethod: 'S256'` specified. The keycloak-js v25 adapter supports PKCE but does not enforce it by default. For browser-based public OIDC clients, the OAuth 2.0 Security Best Current Practice mandates PKCE to prevent authorization code interception.

## Impact

Without PKCE, an attacker who can observe the OIDC redirect callback (via malicious browser extension, open redirect on the same origin, or traffic interception) can steal the authorization code and independently exchange it for tokens at the Keycloak token endpoint.

## Evidence / location

- `src/app/services/keycloak.service.ts:86-87`

```
this.keycloakAuth
  .init({})
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `AUTH-001`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### AUTHZ-001

- **Suggested title:** [RA AUTHZ-001] Authorization bypass via URL query parameter injection on admin-only routes
- **Severity:** High
- **Domain / OWASP / CWE:** AUTHORIZATION / A01:2021 / CWE-863
- **Component:** auth-layer
- **Location:** `src/app/guards/auth.guard.ts:74-93`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:high, domain:authorization`
- **Cross-refs:** —

<details>
<summary>Issue body for AUTHZ-001</summary>

```markdown
## Problem

AuthGuard.canActivate() checks access to /lock-records and /manage-subareas using exact string equality against RouterStateSnapshot.url. Angular includes query parameters in state.url, so navigating to /lock-records?x=1 produces state.url === '/lock-records?x=1', which does not match '/lock-records'. The condition evaluates to false and the guard returns true, permitting any authenticated non-admin user to access the LockRecordsComponent or ManageSubareasComponent.

## Evidence / location

- `src/app/guards/auth.guard.ts:74-93`

```
if (
  !this.keycloakService.isAllowed('lock-records') &&
  state.url === '/lock-records'
) {
  return this.router.parseUrl('/');
}

if (!this.keycloakService.isAllowed('manage-subareas') &&
  state.url === '/manage-subareas'
) {
  return this.router.parseUrl('/');
}
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `AUTHZ-001`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### CONFIG-002

- **Suggested title:** [RA CONFIG-002] Missing Content-Security-Policy Header on All CloudFront Cache Behaviors
- **Severity:** High
- **Domain / OWASP / CWE:** CONFIGURATION / A05:2021 / CWE-16
- **Component:** cloudfront-cdn
- **Location:** `template.yaml:123-125`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:high, domain:configuration`
- **Cross-refs:** —

<details>
<summary>Issue body for CONFIG-002</summary>

```markdown
## Problem

All three CloudFront cache behaviors use the AWS-managed SimpleCORS response headers policy (60669652-455b-4ae9-85a4-c4c02393f86c), which provides only Access-Control-Allow-Origin: * and does not configure a Content-Security-Policy header. The SPA's src/index.html contains no <meta http-equiv="Content-Security-Policy"> fallback tag. Without CSP the browser cannot restrict script sources, object sources, or frame ancestors, allowing any injected script to execute. The application loads Keycloak JS from loginproxy.gov.bc.ca without an explicit allowlist entry.

## Evidence / location

- `template.yaml:123-125`

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `CONFIG-002`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### CONFIG-003

- **Suggested title:** [RA CONFIG-003] Missing Strict-Transport-Security (HSTS) Header on All CloudFront Cache Behaviors
- **Severity:** High
- **Domain / OWASP / CWE:** CONFIGURATION / A05:2021 / CWE-16
- **Component:** cloudfront-cdn
- **Location:** `template.yaml:123-125`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:high, domain:configuration`
- **Cross-refs:** —

<details>
<summary>Issue body for CONFIG-003</summary>

```markdown
## Problem

None of the three CloudFront cache behaviors emit a Strict-Transport-Security header. While ViewerProtocolPolicy: redirect-to-https ensures HTTP requests are redirected, the absence of HSTS means browsers do not pre-load the HTTPS requirement and cannot enforce HTTPS for subsequent requests without first making an HTTP connection. This leaves users vulnerable to SSL-stripping attacks on first contact or after browser-cache expiry, and prevents the domain from being submitted to the HSTS preload list.

## Evidence / location

- `template.yaml:123-125`

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `CONFIG-003`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### CONFIG-004

- **Suggested title:** [RA CONFIG-004] Missing X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Polic...
- **Severity:** High
- **Domain / OWASP / CWE:** CONFIGURATION / A05:2021 / CWE-16
- **Component:** cloudfront-cdn
- **Location:** `template.yaml:123-153`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:high, domain:configuration`
- **Cross-refs:** —

<details>
<summary>Issue body for CONFIG-004</summary>

```markdown
## Problem

The SimpleCORS managed response headers policy (60669652-455b-4ae9-85a4-c4c02393f86c) applied to all three cache behaviors does not include X-Frame-Options (exposes authenticated admin users to clickjacking), X-Content-Type-Options: nosniff (enables MIME-type confusion attacks on served static assets), Referrer-Policy (referrer headers leak origin URL to any external resource), or Permissions-Policy (browser feature access is unrestricted). No custom response headers policy is defined on any cache behavior to supplement this managed policy.

## Evidence / location

- `template.yaml:123-153`

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `CONFIG-004`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### LOG-001

- **Suggested title:** [RA LOG-001] Full configuration object written to browser console
- **Severity:** High
- **Domain / OWASP / CWE:** SECURITY_LOGGING / A09:2021 / CWE-532
- **Component:** shared-infrastructure
- **Location:** `src/app/services/config.service.ts:42-44`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:high, domain:security-logging`
- **Cross-refs:** —

<details>
<summary>Issue body for LOG-001</summary>

```markdown
## Problem

In config.service.ts lines 42-44, when the runtime logLevel equals 0, console.log('Configuration:', this.configuration) dumps the entire configuration object to the browser console. This object contains API_LOCATION, API_PUBLIC_PATH, KEYCLOAK_URL, KEYCLOAK_REALM, and KEYCLOAK_CLIENT_ID. Any authenticated user who opens browser DevTools during a debug-mode session will see all of these values.

## Evidence / location

- `src/app/services/config.service.ts:42-44`

## Expected

Remove this console.log call entirely. If configuration inspection is needed in development, sanitize the object first to omit security-relevant fields, or gate the output behind an environment.production === false check with additional field filtering.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `LOG-001`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### LOG-002

- **Suggested title:** [RA LOG-002] Keycloak authentication lifecycle events logged at debug level only
- **Severity:** High
- **Domain / OWASP / CWE:** SECURITY_LOGGING / A09:2021 / CWE-778
- **Component:** auth-layer
- **Location:** `src/app/services/keycloak.service.ts:53-71`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:high, domain:security-logging`
- **Cross-refs:** —

<details>
<summary>Issue body for LOG-002</summary>

```markdown
## Problem

All five Keycloak authentication lifecycle callbacks in keycloak.service.ts (onAuthSuccess, onAuthError, onAuthRefreshSuccess, onAuthRefreshError, onAuthLogout) use loggerService.debug(). Because LoggerService defaults to LogLevel.Off and debug is the lowest active level, these events are silenced in virtually all realistic deployments. Failed authentication (onAuthError) and logout (onAuthLogout) are security-critical events that must be captured. No user identity or session information is included in any of these log messages.

## Evidence / location

- `src/app/services/keycloak.service.ts:53-71`

## Expected

Elevate onAuthError, onAuthRefreshError, and onAuthLogout to loggerService.error() or loggerService.warn(). Include user identity derived from the token where available. Implement a persistent server-side audit log endpoint to receive these security events.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `LOG-002`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### LOG-003

- **Suggested title:** [RA LOG-003] Authorization failures in AuthGuard are never logged
- **Severity:** High
- **Domain / OWASP / CWE:** SECURITY_LOGGING / A09:2021 / CWE-778
- **Component:** auth-layer
- **Location:** `src/app/guards/auth.guard.ts:53-55`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:high, domain:security-logging`
- **Cross-refs:** —

<details>
<summary>Issue body for LOG-003</summary>

```markdown
## Problem

In auth.guard.ts lines 53-55, when isAuthorized() returns false the guard silently redirects to /unauthorized with no log entry of any kind. The same is true for all five route-specific isAllowed() checks later in canActivate(). An attacker probing authorization boundaries, or an insider attempting to access a privileged route, leaves no trace in any log or audit trail.

## Evidence / location

- `src/app/guards/auth.guard.ts:53-55`

## Expected

Add loggerService.warn() calls before each authorization-failure redirect. Include the requested URL (state.url), the authenticated user's identity (extracted from the Keycloak token), and the reason for denial. Implement a structured security audit event format: { eventType, userId, email, requestedUrl, outcome, timestamp }.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `LOG-003`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### SECRET-001

- **Suggested title:** [RA SECRET-001] Production AWS Account ID Embedded in ACM Certificate ARN in Prod CI/CD Workflow
- **Severity:** High
- **Domain / OWASP / CWE:** SECRETS / A05:2021 / CWE-798
- **Component:** cloudfront-cdn
- **Location:** `.github/workflows/lza-deploy-admin-prod.yaml:115-115`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:high, domain:secrets`
- **Cross-refs:** —

<details>
<summary>Issue body for SECRET-001</summary>

```markdown
## Problem

The production deployment workflow hardcodes a full ACM certificate ARN containing the production AWS Account ID (569945793587). This identifier is committed to the public repository, enabling infrastructure enumeration, targeted IAM cross-account policy attacks, and social engineering. The certificate ARN should be moved to a GitHub Actions environment variable.

## Evidence / location

- `.github/workflows/lza-deploy-admin-prod.yaml:115-115`

## Expected

Remove the hardcoded DomainCertificateArn value from the SAM deploy step. Store the ARN as a GitHub Actions environment variable (e.g., vars.DOMAIN_CERTIFICATE_ARN) and reference it as ${{ vars.DOMAIN_CERTIFICATE_ARN }} in the workflow.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `SECRET-001`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### TEST-001

- **Suggested title:** [RA TEST-001] HTTP token interceptor has zero test coverage
- **Severity:** High
- **Domain / OWASP / CWE:** TESTING / A07:2021 / CWE-561
- **Component:** auth-layer
- **Location:** `src/app/shared/utils/token-interceptor.ts:1-1`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:high, domain:testing`
- **Cross-refs:** —

<details>
<summary>Issue body for TEST-001</summary>

```markdown
## Problem

The file `src/app/shared/utils/token-interceptor.ts` implements the Bearer token HTTP interceptor that injects Authorization headers on every outbound API request and handles 403 token-refresh logic. No spec file exists for this class. Any regression — including accidental token leakage, missing token injection, or broken 403 handling — would go entirely undetected by the automated test suite.

## Evidence / location

- `src/app/shared/utils/token-interceptor.ts:1-1`

```
No file matching `token-interceptor.spec.ts` found anywhere in the repository; confirmed via file_search across all 82 spec files.
```

## Expected

Add a dedicated spec for `TokenInterceptor` using Angular's `HttpClientTestingModule`. Cover: (1) Bearer header is injected on authenticated requests; (2) header is absent when unauthenticated; (3) 403 response triggers token refresh and request retry; (4) refresh failure causes logout.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `TEST-001`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### AUTH-002

- **Suggested title:** [RA AUTH-002] Client-side JwtUtil.decodeToken() performs no signature verification; drives role/IDP d...
- **Severity:** Medium
- **Domain / OWASP / CWE:** AUTHENTICATION / A07:2021 / CWE-287
- **Component:** auth-layer
- **Location:** `src/app/shared/utils/jwt-utils.ts:38-52`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:medium, domain:authentication`
- **Cross-refs:** —

<details>
<summary>Issue body for AUTH-002</summary>

```markdown
## Problem

Custom `JwtUtil.decodeToken()` performs Base64 decode of the JWT payload only; no cryptographic signature verification is performed. This function is called by `isAuthorized()`, `isAdmin()`, `getWelcomeMessage()`, and `getIdpFromToken()`. By contrast, `isAuthenticated()` checks the Keycloak library's own `authenticated` flag, creating an inconsistency between authentication state (library-verified) and authorization/role decisions (custom unverified decode).

## Impact

Client-side access control decisions for roles and IDP identity are driven by an unverified JWT payload decode, creating a maintenance hazard and a potential gap where library state and decoded claims diverge.

## Evidence / location

- `src/app/shared/utils/jwt-utils.ts:38-52`

```
static decodeToken(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) { return null; }
    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) { return null; }
    return JSON.parse(decoded);
  } catch (e) { return null; }
}
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `AUTH-002`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### AUTH-003

- **Suggested title:** [RA AUTH-003] No logout mechanism exists; sessions end only on token expiry (risk on shared terminals)
- **Severity:** Medium
- **Domain / OWASP / CWE:** AUTHENTICATION / A07:2021 / CWE-384
- **Component:** auth-layer
- **Location:** `src/app/guards/auth.guard.ts:46-59`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:medium, domain:authentication`
- **Cross-refs:** —

<details>
<summary>Issue body for AUTH-003</summary>

```markdown
## Problem

No logout mechanism is implemented anywhere in the application. `keycloakService.login()` exists but no corresponding `logout()` method is present. The `AuthGuard` source code contains an explicit comment acknowledging this gap: 'we don't have a logout, so there is no point allowing the user to select a different IDP'. No logout button is present in the application header.

## Impact

Sessions can only be terminated passively via Keycloak token expiry. Users on shared devices (government staff terminals, shared workstations) cannot proactively end their session, leaving authenticated sessions open for subsequent users.

## Evidence / location

- `src/app/guards/auth.guard.ts:46-59`

```
// Store the identity provider that was used to successfully log in.
// Even if the user is unauthorized, we still want to store this because
// we don't have a logout, so there is no point allowing the user to select
// a different IDP, as Keycloak will just ignore the selection when the user
// is authenticated already.
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `AUTH-003`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### AUTHZ-002

- **Suggested title:** [RA AUTHZ-002] Dead guard conditions for export-reports and review-data — isAllowed() always returns t...
- **Severity:** Medium
- **Domain / OWASP / CWE:** AUTHORIZATION / A01:2021 / CWE-862
- **Component:** auth-layer
- **Location:** `src/app/services/keycloak.service.ts:155-166`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:medium, domain:authorization`
- **Cross-refs:** AUTHZ-001

<details>
<summary>Issue body for AUTHZ-002</summary>

```markdown
## Problem

KeycloakService.isAllowed() returns true unconditionally for any route name not present in the hardcoded adminOnlyRoutes array. Neither 'export-reports' nor 'review-data' is in that array, so the corresponding guard blocks in AuthGuard.canActivate() (lines 67-86) are permanently dead code. A unit test in auth.guard.spec.ts (line 41) validates the blocking behavior when isAllowed returns false for export-reports, confirming the restriction was originally intended but the isAllowed() implementation was never updated to enforce it.

## Evidence / location

- `src/app/services/keycloak.service.ts:155-166`

```
isAllowed(service): boolean {
    // admin only routes
    let adminOnlyRoutes = [
      'lock-records',
      'manage-subareas'
    ]
    if (!adminOnlyRoutes.find(route => route === service)) {
      return true;
    }

    return this.isAdmin();
  }
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `AUTHZ-002`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### CONFIG-005

- **Suggested title:** [RA CONFIG-005] Security Scan Gate (Trivy) Has All Automatic CI/CD Triggers Disabled
- **Severity:** Medium
- **Domain / OWASP / CWE:** CONFIGURATION / A05:2021 / CWE-1068
- **Component:** cloudfront-cdn
- **Location:** `.github/workflows/analysis.yaml:1-10`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:medium, domain:configuration`
- **Cross-refs:** TEST-002

<details>
<summary>Issue body for CONFIG-005</summary>

```markdown
## Problem

The analysis.yaml workflow contains a Trivy repository scan covering vulnerabilities, secrets, and IaC misconfigurations. However, all automatic triggers (push to main, pull_request, scheduled cron) are commented out, leaving only manual workflow_dispatch. The PR check workflow (on-pr.yaml) runs only lint and unit tests with no security scanning step. Code can be merged to main and deployed to all environments—including production via lza-deploy-admin-prod.yaml—without any automated security scan gate executing.

## Evidence / location

- `.github/workflows/analysis.yaml:1-10`

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `CONFIG-005`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### CONFIG-006

- **Suggested title:** [RA CONFIG-006] logLevel = 0 (LogLevel.All) Hardcoded in All Deployment Pipelines Including Production
- **Severity:** Medium
- **Domain / OWASP / CWE:** CONFIGURATION / A05:2021 / CWE-489
- **Component:** shared-infrastructure
- **Location:** `.github/workflows/lza-deploy-admin-prod.yaml:73-87`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:medium, domain:configuration`
- **Cross-refs:** LOG-001

<details>
<summary>Issue body for CONFIG-006</summary>

```markdown
## Problem

All three deployment pipelines (lza-deploy-admin-prod.yaml line 77, lza-deploy-admin-test.yaml line 76, lza-deploy-admin-dev.yaml line 80) hardcode window.__env.logLevel = 0 in the generated env.js artifact. LogLevel.All = 0 in the application's LoggerService enum, causing every debug-level log entry—including Keycloak OIDC lifecycle events—to be written to the browser console. Additionally, ConfigService.init() unconditionally calls console.log('Configuration:', this.configuration) when logLevel === 0, logging the full window.__env object (including API_LOCATION, KEYCLOAK_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT_ID) to the browser console on every page load in every deployed environment.

## Evidence / location

- `.github/workflows/lza-deploy-admin-prod.yaml:73-87`

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `CONFIG-006`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### CRYPTO-001

> Merged severity with duplicate `CONFIG-001`: treat as **High** when prioritizing.

- **Suggested title:** [RA CRYPTO-001] CloudFront viewer TLS minimum version permits deprecated TLS 1.0 and TLS 1.1
- **Severity:** Medium
- **Domain / OWASP / CWE:** CRYPTOGRAPHY / A02:2021 / CWE-326
- **Component:** cloudfront-cdn
- **Location:** `template.yaml:89-92`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:medium, domain:cryptography`
- **Cross-refs:** CONFIG-001

<details>
<summary>Issue body for CRYPTO-001</summary>

```markdown
## Problem

The CloudFront distribution's ViewerCertificate block sets MinimumProtocolVersion to TLSv1. AWS maps this to the TLSv1 security policy, which permits viewer connections using TLS 1.0, TLS 1.1, and TLS 1.2. TLS 1.0 and TLS 1.1 are deprecated by RFC 8996 (March 2021) and prohibited by PCI DSS v4.0 (effective March 2025). TLS 1.0 is vulnerable to the BEAST attack (CVE-2011-3389) on CBC cipher suites. Clients using modern browsers will negotiate TLS 1.2 or higher, but legacy clients and downgrade attacks can force TLS 1.0.

## Evidence / location

- `template.yaml:89-92`

```
ViewerCertificate:
  AcmCertificateArn: !Ref DomainCertificateArn
  SslSupportMethod: sni-only
  MinimumProtocolVersion: TLSv1
```

## Expected

Change MinimumProtocolVersion to TLSv1.2_2021 (recommended) or TLSv1.2_2019 at minimum. The TLSv1.2_2021 policy enforces TLS 1.2 or higher and modern cipher suites (ECDHE with AES-GCM/CHACHA20) only, removing all TLS 1.0/1.1 support.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `CRYPTO-001`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### LOG-004

- **Suggested title:** [RA LOG-004] LoggerService defaults to LogLevel.Off — all logging silenced if logLevel not configured
- **Severity:** Medium
- **Domain / OWASP / CWE:** SECURITY_LOGGING / A09:2021 / CWE-778
- **Component:** shared-infrastructure
- **Location:** `src/app/services/logger.service.ts:18-18`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:medium, domain:security-logging`
- **Cross-refs:** —

<details>
<summary>Issue body for LOG-004</summary>

```markdown
## Problem

The LoggerService level property is initialised to LogLevel.Off at line 18. The shouldLog() method reads logLevel from ConfigService, whose getter returns window['__env'].logLevel. If env.js does not explicitly define logLevel, the getter returns undefined and all log levels fail the comparison, silencing every log statement across the entire application. Any deployment that omits logLevel from env.js configuration will have zero application-level logging.

## Evidence / location

- `src/app/services/logger.service.ts:18-18`

## Expected

Change the default level to LogLevel.Warn or LogLevel.Error so that errors and security warnings are always captured. Document the requirement to set logLevel explicitly for debug logging. Add a startup check that warns via console.warn if logLevel is not configured.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `LOG-004`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### LOG-005

- **Suggested title:** [RA LOG-005] Raw error objects logged directly to console — potential stack trace exposure
- **Severity:** Medium
- **Domain / OWASP / CWE:** SECURITY_LOGGING / A09:2021 / CWE-209
- **Component:** shared-infrastructure
- **Location:** `src/app/services/config.service.ts:37-37`
- **Confidence:** medium
- **Suggested labels:** `rapid-assessment, severity:medium, domain:security-logging`
- **Cross-refs:** —

<details>
<summary>Issue body for LOG-005</summary>

```markdown
## Problem

config.service.ts line 37 calls console.error('Error getting remote configuration:', e) with the raw exception object, potentially exposing failed request URLs (revealing internal API topology) and JavaScript stack traces. Similarly, main.ts line 12 calls console.error(err) on the full Angular bootstrap error, which includes Angular component and module names. Both calls bypass the LoggerService entirely and are visible to any user with browser DevTools open.

## Evidence / location

- `src/app/services/config.service.ts:37-37`

## Expected

Route both error paths through LoggerService.error() using only the error message string (e.message), not the full error object. For main.ts bootstrap errors, consider shipping a sanitised error report to a server-side monitoring endpoint.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `LOG-005`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### LOG-006

- **Suggested title:** [RA LOG-006] No structured log format — all output is unstructured plain text
- **Severity:** Medium
- **Domain / OWASP / CWE:** SECURITY_LOGGING / A09:2021 / CWE-778
- **Component:** shared-infrastructure
- **Location:** `src/app/services/logger.service.ts:48-57`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:medium, domain:security-logging`
- **Cross-refs:** —

<details>
<summary>Issue body for LOG-006</summary>

```markdown
## Problem

The entryToString() method in logger.service.ts lines 48-57 produces a human-readable string of the form '(Level) timestamp message'. There is no structured JSON format, no correlation ID, no user identity, no session ID, and no request context in any log message. This makes log analysis, automated alerting, and forensic investigation impractical — there is no way to correlate log entries with a specific user or request.

## Evidence / location

- `src/app/services/logger.service.ts:48-57`

## Expected

Redesign LoggerService to emit structured JSON objects: { level, timestamp, userId, sessionId, correlationId, message, context }. For security events, add a securityEvent boolean flag. Integrate a log shipping mechanism to send structured logs to a server-side endpoint or SIEM.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `LOG-006`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### LOG-007

- **Suggested title:** [RA LOG-007] All application logging is browser-console only — no server-side persistence
- **Severity:** Medium
- **Domain / OWASP / CWE:** SECURITY_LOGGING / A09:2021 / CWE-778
- **Component:** shared-infrastructure
- **Location:** `src/app/services/logger.service.ts:53-53`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:medium, domain:security-logging`
- **Cross-refs:** —

<details>
<summary>Issue body for LOG-007</summary>

```markdown
## Problem

The sole output mechanism in LoggerService is console.log(this.entryToString(logEntry)) at line 53. Browser console output is ephemeral — it disappears when the tab is closed. There is no HTTP log shipping to any server endpoint, no integration with AWS CloudWatch RUM, Azure Application Insights, or any log aggregation platform, and no persistent audit trail of any kind from the frontend application.

## Evidence / location

- `src/app/services/logger.service.ts:53-53`

## Expected

Add a server-side log shipping path to LoggerService. At minimum, batch and POST structured security events to a dedicated backend endpoint via the existing ApiService. Consider integrating a production-grade RUM/monitoring SDK for comprehensive frontend observability.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `LOG-007`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### SECRET-002

- **Suggested title:** [RA SECRET-002] Non-Production AWS Account IDs Hardcoded Across CI/CD Workflows, Scripts, and Infrastru...
- **Severity:** Medium
- **Domain / OWASP / CWE:** SECRETS / A05:2021 / CWE-798
- **Component:** cloudfront-cdn
- **Location:** `setup-lza-admin-dev-environment.sh:36-36`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:medium, domain:secrets`
- **Cross-refs:** —

<details>
<summary>Issue body for SECRET-002</summary>

```markdown
## Problem

Two non-production AWS Account IDs (059942063916 for LZA dev/test and 856925536711 for the legacy account) are hardcoded in setup scripts, CI/CD workflows, vars.json, and template.yaml SAM defaults. This enables infrastructure enumeration and use of account IDs in crafted IAM principals. The SAM template Default: values create a risk of silent deployment to the wrong account.

## Evidence / location

- `setup-lza-admin-dev-environment.sh:36-36`

## Expected

Remove AWS Account IDs from all source files. Pass account IDs via CI/CD environment variables only. Remove the Default: values from template.yaml parameters that accept account-specific ARNs, and source them exclusively from parameter-overrides in deployment workflows.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `SECRET-002`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### SECRET-003

- **Suggested title:** [RA SECRET-003] Route53 Hosted Zone ID Hardcoded in Pre-Migration Script
- **Severity:** Medium
- **Domain / OWASP / CWE:** SECRETS / A05:2021 / CWE-798
- **Component:** cloudfront-cdn
- **Location:** `pre-migration-certificate-setup.sh:77-77`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:medium, domain:secrets`
- **Cross-refs:** —

<details>
<summary>Issue body for SECRET-003</summary>

```markdown
## Problem

The bcparks.ca Route53 hosted zone ID (Z016985813W44F7VV5I65) is hardcoded in pre-migration-certificate-setup.sh. While not a credential on its own, this identifier enables immediate targeted DNS record manipulation if combined with an IAM credential compromise, eliminating the reconnaissance phase of an attack.

## Evidence / location

- `pre-migration-certificate-setup.sh:77-77`

## Expected

Replace the hardcoded ROUTE53_ZONE_ID with a dynamic lookup: aws route53 list-hosted-zones-by-name --dns-name bcparks.ca --query 'HostedZones[0].Id' --output text | sed 's|/hostedzone/||'

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `SECRET-003`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### TEST-003

- **Suggested title:** [RA TEST-003] No end-to-end or security-focused integration tests exist
- **Severity:** Medium
- **Domain / OWASP / CWE:** TESTING / A01:2021 / CWE-1059
- **Component:** angular-spa-shell
- **Location:** `package.json:1-20`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:medium, domain:testing`
- **Cross-refs:** —

<details>
<summary>Issue body for TEST-003</summary>

```markdown
## Problem

The repository contains 82 Jasmine unit-test spec files but no end-to-end or integration test framework (no Cypress, Playwright, Protractor, or equivalent). No tests exercise the full Keycloak OIDC authentication flow, verify that guarded routes reject unauthenticated requests at the HTTP level, confirm that the AuthGuard correctly enforces role-based access at deployment time, or test any authorization boundary. Security properties of the application are entirely unverified by automated tests.

## Evidence / location

- `package.json:1-20`

```
`package.json` contains no `cypress`, `playwright`, `protractor`, or equivalent E2E dependency. Grep across all spec files finds no HTTP-level authorization boundary tests or end-to-end auth flow tests.
```

## Expected

Introduce an E2E test framework (Cypress or Playwright) and add at minimum: (1) unauthenticated access to guarded routes returns redirect to login; (2) a user without the required role is redirected to /unauthorized; (3) the export, lock-records, and manage-subareas routes are inaccessible without the correct Keycloak role.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `TEST-003`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### VULN-001

- **Suggested title:** [RA VULN-001] Stored XSS via [innerHtml] binding with unsanitized HTML construction in HistoricalPill...
- **Severity:** Medium
- **Domain / OWASP / CWE:** INJECTION / A03:2021 / CWE-79
- **Component:** enter-data-module
- **Location:** `src/app/shared/components/historical-pill/historical-pill.component.ts:15-37`
- **Confidence:** medium
- **Suggested labels:** `rapid-assessment, severity:medium, domain:injection`
- **Cross-refs:** —

<details>
<summary>Issue body for VULN-001</summary>

```markdown
## Problem

getHighlightedMatch() in HistoricalPillComponent constructs raw HTML strings by concatenating park sub-area name substrings (from the database) using '<span>' + value + '</span>' template, then returns them for binding to [innerHtml]. No explicit DomSanitizer.sanitize() call is present in TypeScript; protection relies entirely on Angular's implicit runtime sanitization at the binding point. A sysadmin who sets a malicious sub-area name could cause persistent XSS for all users who open the sub-area typeahead.

## Evidence / location

- `src/app/shared/components/historical-pill/historical-pill.component.ts:15-37`

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `VULN-001`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### AUTH-004

- **Suggested title:** [RA AUTH-004] Silent token-refresh failure only logs; no forced redirect to /login on expiry
- **Severity:** Low
- **Domain / OWASP / CWE:** AUTHENTICATION / A07:2021 / CWE-384
- **Component:** auth-layer
- **Location:** `src/app/services/keycloak.service.ts:74-83`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:low, domain:authentication`
- **Cross-refs:** —

<details>
<summary>Issue body for AUTH-004</summary>

```markdown
## Problem

The `onTokenExpired` handler calls `updateToken()` but the `.catch` block only logs the error. When a background token refresh fails (e.g., Keycloak session expired, offline token revoked), no forced navigation to `/login` occurs. The user remains on the application UI in an authenticated-looking state with an expired, non-refreshable token.

## Impact

Users remain in an indeterminate authenticated state after session expiry. Subsequent API calls will fail silently (or return 401/403 errors) rather than presenting a clean re-authentication flow, which may confuse users and mask the root cause.

## Evidence / location

- `src/app/services/keycloak.service.ts:74-83`

```
this.keycloakAuth.onTokenExpired = () => {
  this.keycloakAuth
    .updateToken()
    .then((refreshed) => {
      this.loggerService.log(`KC refreshed token?: ${refreshed}`);
    })
    .catch((err) => {
      this.loggerService.log(`KC refresh error: ${err}`);
    });
};
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `AUTH-004`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### AUTH-005

- **Suggested title:** [RA AUTH-005] Hardcoded fallback OAuth client ID 'nrpti-admin' when KEYCLOAK_CLIENT_ID absent
- **Severity:** Low
- **Domain / OWASP / CWE:** AUTHENTICATION / A07:2021 / CWE-287
- **Component:** auth-layer
- **Location:** `src/app/services/keycloak.service.ts:43-47`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:low, domain:authentication`
- **Cross-refs:** —

<details>
<summary>Issue body for AUTH-005</summary>

```markdown
## Problem

When the `KEYCLOAK_CLIENT_ID` runtime configuration key is absent, the application silently falls back to a hardcoded OAuth client ID `'nrpti-admin'`, which belongs to the Natural Resources Project Tracking Infrastructure — a different BC Gov application.

## Impact

Misconfigured deployments where `KEYCLOAK_CLIENT_ID` is missing will silently attempt authentication against the wrong Keycloak client registration, causing authentication failures that are difficult to diagnose. In the unlikely event the fallback client ID is registered in the same realm, cross-application token acceptance could occur.

## Evidence / location

- `src/app/services/keycloak.service.ts:43-47`

```
const config = {
  url: this.keycloakUrl,
  realm: this.keycloakRealm,
  clientId: !keycloak_client_id ? 'nrpti-admin' : keycloak_client_id,
};
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `AUTH-005`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### AUTH-006

- **Suggested title:** [RA AUTH-006] TokenInterceptor triggers token refresh on HTTP 403 (should be 401)
- **Severity:** Low
- **Domain / OWASP / CWE:** AUTHENTICATION / A07:2021 / CWE-384
- **Component:** shared-infrastructure
- **Location:** `src/app/shared/utils/token-interceptor.ts:37-39`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:low, domain:authentication`
- **Cross-refs:** —

<details>
<summary>Issue body for AUTH-006</summary>

```markdown
## Problem

The `TokenInterceptor` triggers a token refresh when it receives an HTTP 403 (Forbidden) response. RFC 9110 defines 401 (Unauthorized) as the signal for invalid or expired credentials, and 403 (Forbidden) as the signal for authenticated-but-insufficient-permission. Using 403 as the refresh trigger conflates authorization failures with authentication failures.

## Impact

Genuine authorization failures (valid token, insufficient role) unnecessarily trigger a token refresh cycle followed by a second authorization failure, masking the real cause and potentially creating a misleading UX. In edge cases, this may cause a refresh loop if the backend consistently returns 403 for a given resource.

## Evidence / location

- `src/app/shared/utils/token-interceptor.ts:37-39`

```
return next.handle(request).pipe(
  catchError(error => {
    if (error.status === 403) {
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `AUTH-006`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### AUTH-007

- **Suggested title:** [RA AUTH-007] Bearer token injected into every outbound request with no host allowlist
- **Severity:** Low
- **Domain / OWASP / CWE:** AUTHENTICATION / A07:2021 / CWE-287
- **Component:** shared-infrastructure
- **Location:** `src/app/shared/utils/token-interceptor.ts:62-70`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:low, domain:authentication`
- **Cross-refs:** —

<details>
<summary>Issue body for AUTH-007</summary>

```markdown
## Problem

`addAuthHeader()` injects the `Authorization: Bearer` header unconditionally into every outbound `HttpClient` request with no URL or hostname allowlist. All HTTP requests, regardless of destination host, receive the Keycloak JWT.

## Impact

If any future or incidental `HttpClient` call is made to a third-party domain (analytics, external asset services, third-party APIs), the Keycloak JWT would be transmitted to that host, potentially leaking user identity and session context to unintended recipients.

## Evidence / location

- `src/app/shared/utils/token-interceptor.ts:62-70`

```
private addAuthHeader(request: HttpRequest<any>): HttpRequest<any> {
  const authToken: string = this.auth.getToken() || '';

  request = request.clone({
    setHeaders: { Authorization: 'Bearer ' + authToken }
  });

  return request;
}
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `AUTH-007`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### AUTHZ-003

- **Suggested title:** [RA AUTHZ-003] manage-subareas navigation link visible in header for non-admin users
- **Severity:** Low
- **Domain / OWASP / CWE:** AUTHORIZATION / A01:2021 / CWE-862
- **Component:** angular-spa-shell
- **Location:** `src/app/header/header.component.ts:31-40`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:low, domain:authorization`
- **Cross-refs:** AUTHZ-001

<details>
<summary>Issue body for AUTHZ-003</summary>

```markdown
## Problem

HeaderComponent.routes is populated by filtering the router config with isAllowed() checks for 'export-reports' and 'lock-records', but no check is applied for 'manage-subareas'. The manage-subareas route falls through to the default case and is included in the header navigation for all authenticated users. Combined with AUTHZ-001, a non-admin user can click the visible link and bypass the admin guard by appending any query parameter.

## Evidence / location

- `src/app/header/header.component.ts:31-40`

```
this.routes = router.config.filter(function (obj) {
      if (obj.path === 'export-reports') {
        return keycloakService.isAllowed('export-reports');
      } else if (obj.path === 'lock-records') {
        return keycloakService.isAllowed('lock-records')
      }
        {
        return obj.path !== '**' && obj.path !== 'unauthorized';
      }
    });
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `AUTHZ-003`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### AUTHZ-004

- **Suggested title:** [RA AUTHZ-004] isAdmin() uses hardcoded role string instead of centralized constant
- **Severity:** Low
- **Domain / OWASP / CWE:** AUTHORIZATION / A01:2021 / CWE-250
- **Component:** auth-layer
- **Location:** `src/app/services/keycloak.service.ts:173-184`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:low, domain:authorization`
- **Cross-refs:** —

<details>
<summary>Issue body for AUTHZ-004</summary>

```markdown
## Problem

KeycloakService.isAdmin() compares against the hardcoded string literal 'sysadmin' rather than Constants.ApplicationRoles.ADMIN ('sysadmin' in constants.ts). If the Keycloak role name is renamed and constants.ts is updated, isAdmin() silently returns false for all users, bypassing all admin-route enforcement without any compile-time error, test failure, or runtime warning.

## Evidence / location

- `src/app/services/keycloak.service.ts:173-184`

```
isAdmin(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    const jwt = JwtUtil.decodeToken(token);
    return jwt?.resource_access?.['attendance-and-revenue']?.roles.includes(
      'sysadmin'
    );
  }
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `AUTHZ-004`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### AUTHZ-005

- **Suggested title:** [RA AUTHZ-005] Incomplete optional chaining in isAdmin() can throw TypeError on atypically-structured JWT
- **Severity:** Low
- **Domain / OWASP / CWE:** AUTHORIZATION / A01:2021 / CWE-703
- **Component:** auth-layer
- **Location:** `src/app/services/keycloak.service.ts:181-182`
- **Confidence:** medium
- **Suggested labels:** `rapid-assessment, severity:low, domain:authorization`
- **Cross-refs:** —

<details>
<summary>Issue body for AUTHZ-005</summary>

```markdown
## Problem

In KeycloakService.isAdmin(), the optional chain operator is applied up to ['attendance-and-revenue'] but not before .roles.includes(). If a JWT contains resource_access['attendance-and-revenue'] as an object without a 'roles' property, the expression throws TypeError: Cannot read properties of undefined (reading 'includes'). This propagates uncaught through isAllowed() into canActivate(), where Angular's router behavior is version-dependent.

## Evidence / location

- `src/app/services/keycloak.service.ts:181-182`

```
return jwt?.resource_access?.['attendance-and-revenue']?.roles.includes(
      'sysadmin'
    );
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `AUTHZ-005`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### BW-001

- **Suggested title:** [RA BW-001] Lock Records component has no unlock workflow — lock parameter hardcoded to true
- **Severity:** Low
- **Domain / OWASP / CWE:** CODE_VULNERABILITY / A04:2021 / —
- **Component:** lock-records-module
- **Location:** `src/app/lock-records/lock-records.component.ts:53-55`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:low, domain:code-vulnerability`
- **Cross-refs:** —

<details>
<summary>Issue body for BW-001</summary>

```markdown
## Problem

LockRecordsComponent.submit() always calls FiscalYearLockService.lockUnlockFiscalYear(year, true) with lock=true. The service correctly implements both lock and unlock paths but the component provides no code path that invokes unlock. Once a fiscal year is locked via the UI it cannot be unlocked through the application.

## Evidence / location

- `src/app/lock-records/lock-records.component.ts:53-55`

## Expected

Add an unlock option to the Lock Records UI (separate Unlock button or a lock/unlock toggle) and pass lock=false to lockUnlockFiscalYear().

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `BW-001`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### BW-002

- **Suggested title:** [RA BW-002] Export service has typo 'expor-variance' — variance job status check silently fails
- **Severity:** Low
- **Domain / OWASP / CWE:** CODE_VULNERABILITY / A04:2021 / —
- **Component:** export-reports-module
- **Location:** `src/app/services/export.service.ts:30-35`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:low, domain:code-vulnerability`
- **Cross-refs:** —

<details>
<summary>Issue body for BW-002</summary>

```markdown
## Problem

ExportService.checkForReports() passes endpoint key 'expor-variance' (missing 't') to ApiService.get() in the variance dataType branch. The correct key is 'export-variance'. The API call fails and the catch block sets the data service item to null, masking the failure. Users may inadvertently start duplicate export jobs.

## Evidence / location

- `src/app/services/export.service.ts:30-35`

## Expected

Correct the typo on line 31 from 'expor-variance' to 'export-variance'.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `BW-002`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### DEP-001

- **Suggested title:** [RA DEP-001] chart.js@4.4.1 declared as runtime dependency but never imported (unused)
- **Severity:** Low
- **Domain / OWASP / CWE:** DEPENDENCIES / A06:2021 / CWE-1104
- **Component:** angular-spa-shell
- **Location:** `package.json:34-34`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:low, domain:dependencies`
- **Cross-refs:** —

<details>
<summary>Issue body for DEP-001</summary>

```markdown
## Problem

chart.js@4.4.1 is declared in runtime dependencies but has zero import references in any source file. No 'import ... from chart.js' statement was found in src/**/*.ts after exhaustive grep search.

## Impact

Unused runtime dependency increases node_modules footprint and means any future vulnerability advisory for chart.js would flag this project despite the code never being executed in the browser bundle.

## Evidence / location

- `package.json:34-34`

```
"chart.js": "^4.3.0",
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `DEP-001`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### DEP-002

- **Suggested title:** [RA DEP-002] jquery@3.7.1 loaded globally but unused by Bootstrap 5 (unused, ~90KB attack surface)
- **Severity:** Low
- **Domain / OWASP / CWE:** DEPENDENCIES / A06:2021 / CWE-1104
- **Component:** angular-spa-shell
- **Location:** `package.json:36-36`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:low, domain:dependencies`
- **Cross-refs:** —

<details>
<summary>Issue body for DEP-002</summary>

```markdown
## Problem

jquery@3.7.1 is declared in runtime dependencies and loaded as a global script via angular.json, but Bootstrap 5.3.3 (the version used in this project) does not require jQuery. No 'import ... from jquery' statement exists in any TypeScript source file. jquery is referenced only in the angular.json scripts array as a global include.

## Impact

jQuery (~90KB gzipped) is loaded into every browser session unnecessarily. jQuery's powerful DOM manipulation APIs increase the attack surface for DOM-based XSS and prototype pollution attacks.

## Evidence / location

- `package.json:36-36`

```
"jquery": "^3.6.0",
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `DEP-002`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### DEP-003

- **Suggested title:** [RA DEP-003] moment@2.30.1 maintenance-mode legacy library used alongside luxon
- **Severity:** Low
- **Domain / OWASP / CWE:** DEPENDENCIES / A06:2021 / CWE-1104
- **Component:** api-client-services
- **Location:** `package.json:40-40`
- **Confidence:** medium
- **Suggested labels:** `rapid-assessment, severity:low, domain:dependencies`
- **Cross-refs:** —

<details>
<summary>Issue body for DEP-003</summary>

```markdown
## Problem

moment@2.30.1 is declared in runtime dependencies and used at src/app/services/activity.service.ts:9 and src/app/shared/utils/utils.ts:1. The moment project officially describes itself as a legacy project in maintenance mode, recommending alternatives. The project already uses luxon@3.4.4 for date/time in 7 other source files. No CVEs detected via vulnx-mcp for moment@2.30.1. Confidence medium as maintenance-mode classification is based on the moment project page, not a vendor-issued EOL notice.

## Impact

Maintaining a maintenance-mode library alongside its modern replacement (luxon) doubles the date/time library bundle weight (~70KB for moment vs ~24KB for luxon minified) and splits the codebase across two date handling patterns. Future security patches may be delayed or unavailable.

## Evidence / location

- `package.json:40-40`

```
"moment": "^2.29.4",
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `DEP-003`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### LOG-008

- **Suggested title:** [RA LOG-008] No global Angular ErrorHandler registered — unhandled errors go only to console
- **Severity:** Low
- **Domain / OWASP / CWE:** SECURITY_LOGGING / A09:2021 / CWE-390
- **Component:** angular-spa-shell
- **Location:** `src/app/app.module.ts:53-75`
- **Confidence:** medium
- **Suggested labels:** `rapid-assessment, severity:low, domain:security-logging`
- **Cross-refs:** —

<details>
<summary>Issue body for LOG-008</summary>

```markdown
## Problem

Angular's default ErrorHandler logs uncaught exceptions only to console.error(). No custom ErrorHandler is registered in AppModule's providers array (lines 53-75), so unhandled runtime errors — including security-relevant crashes such as failed token parsing or unexpected crypto operations — are not captured in any audit log or reporting system.

## Evidence / location

- `src/app/app.module.ts:53-75`

## Expected

Implement a custom ErrorHandler class that forwards unhandled errors to a server-side monitoring endpoint. Register it in AppModule providers as { provide: ErrorHandler, useClass: AppErrorHandler }.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `LOG-008`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### LOG-009

- **Suggested title:** [RA LOG-009] Internal system identifiers included in debug log messages
- **Severity:** Low
- **Domain / OWASP / CWE:** SECURITY_LOGGING / A09:2021 / CWE-532
- **Component:** api-client-services
- **Location:** `src/app/services/activity.service.ts:43-44`
- **Confidence:** medium
- **Suggested labels:** `rapid-assessment, severity:low, domain:security-logging`
- **Cross-refs:** —

<details>
<summary>Issue body for LOG-009</summary>

```markdown
## Problem

Debug messages across multiple service classes interpolate ORCS park codes, sub-area IDs, fiscal year values, activity types, and date parameters directly into log strings. For example, activity.service.ts line 43: loggerService.debug('Subarea GET: ${orcs} ${subAreaId} ${activity} ${date}'). Similar patterns appear in sub-area.service.ts line 35 and fiscal-year-lock.service.ts line 37. While these are not authentication secrets, they expose internal system identifiers and data access patterns in the browser console to any authenticated user with DevTools open.

## Evidence / location

- `src/app/services/activity.service.ts:43-44`

## Expected

Use generic event labels in debug messages rather than interpolating system identifiers. If specific identifiers are needed for debugging, gate them behind an explicit developer mode flag rather than including them in all debug output.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `LOG-009`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### SECRET-004

- **Suggested title:** [RA SECRET-004] API Gateway Instance ID Hardcoded in SAM Template Default and Deployment Config
- **Severity:** Low
- **Domain / OWASP / CWE:** SECRETS / A05:2021 / CWE-798
- **Component:** aws-api-gateway
- **Location:** `template.yaml:31-31`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:low, domain:secrets`
- **Cross-refs:** —

<details>
<summary>Issue body for SECRET-004</summary>

```markdown
## Problem

The development API Gateway instance ID (qdp6hi0i78) is committed as a Default: parameter value in template.yaml and in vars.json. This derives the backend API URL https://qdp6hi0i78.execute-api.ca-central-1.amazonaws.com/api, enabling API probing. The Default: in template.yaml will silently use this value if no override is supplied, risking misconfigured deployments.

## Evidence / location

- `template.yaml:31-31`

## Expected

Remove the Default: value from the ApiGatewayId parameter in template.yaml. Remove ApiGatewayId from vars.json. Supply the value exclusively at deploy time via CI/CD parameter-overrides using GitHub Actions variables (${{ vars.AR_API_ID }}).

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `SECRET-004`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### SECRET-005

- **Suggested title:** [RA SECRET-005] Keycloak Client ID and Development Server URLs Committed in Tracked env.js
- **Severity:** Low
- **Domain / OWASP / CWE:** SECRETS / A05:2021 / CWE-312
- **Component:** keycloak-idp
- **Location:** `src/env.js:17-19`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:low, domain:secrets`
- **Cross-refs:** SECRET-004

<details>
<summary>Issue body for SECRET-005</summary>

```markdown
## Problem

src/env.js is not listed in .gitignore and is committed to the repository, containing the Keycloak OIDC client ID (attendance-and-revenue), the development Keycloak server URL (https://dev.loginproxy.gov.bc.ca/auth), and the realm name. Although OIDC SPA client IDs are inherently public, committing env.js contradicts the env.js.template pattern and risks accidental overwrite of production runtime configuration with development values.

## Evidence / location

- `src/env.js:17-19`

## Expected

Add src/env.js to .gitignore. Keep only src/env.js.template in version control. Document the local dev setup process to generate env.js from the template using the CI/CD secret-injection pattern already in place.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `SECRET-005`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### TEST-004

- **Suggested title:** [RA TEST-004] Core services data.service, event.service, auto-fetch.service, sidebar.service, toast.s...
- **Severity:** Low
- **Domain / OWASP / CWE:** TESTING / — / CWE-1059
- **Component:** shared-infrastructure
- **Location:** `src/app/services/data.service.ts:1-1`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:low, domain:testing`
- **Cross-refs:** —

<details>
<summary>Issue body for TEST-004</summary>

```markdown
## Problem

Six service files in `src/app/services/` have no corresponding spec file: `data.service.ts` (the primary reactive BehaviorSubject state bus consumed by virtually every component), `event.service.ts` (application-wide event bus), `auto-fetch.service.ts` (data-fetch orchestration), `sidebar.service.ts`, `toast.service.ts`, and `breadcrumb.service.ts`. A regression in `data.service.ts` in particular — such as a state mutation bug or incorrect observable stream — would impact the entire application but would go undetected.

## Evidence / location

- `src/app/services/data.service.ts:1-1`

```
Directory listing of `src/app/services/` confirms absence of spec files for `data.service.ts`, `event.service.ts`, `auto-fetch.service.ts`, `sidebar.service.ts`, `toast.service.ts`, and `breadcrumb.service.ts`.
```

## Expected

Add unit tests for `DataService` covering BehaviorSubject initialisation, `setItemValue`, `getItemValue`, and `watchItem` streams. Prioritise `DataService` and `AutoFetchService` as the services with the widest application impact.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `TEST-004`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### TEST-005

- **Suggested title:** [RA TEST-005] Deployment pipelines execute build and deploy without running tests
- **Severity:** Low
- **Domain / OWASP / CWE:** TESTING / — / CWE-1059
- **Component:** angular-spa-shell
- **Location:** `.github/workflows/lza-deploy-admin-dev.yaml:50-65`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:low, domain:testing`
- **Cross-refs:** —

<details>
<summary>Issue body for TEST-005</summary>

```markdown
## Problem

All three deployment workflows (`lza-deploy-admin-dev.yaml`, `lza-deploy-admin-test.yaml`, `lza-deploy-admin-prod.yaml`) run `yarn build` followed by AWS SAM deployment steps. None includes a `yarn test-ci` step. If a change that breaks tests is merged to `main` (even accidentally after a PR gate bypass), it will be built and deployed to all environments — including production — without any test validation.

## Evidence / location

- `.github/workflows/lza-deploy-admin-dev.yaml:50-65`

```
`lza-deploy-admin-dev.yaml` steps sequence: Checkout → Setup Node.js → Setup Python → Setup AWS SAM → Configure AWS credentials → Install dependencies → Build application → Generate env.js → SAM deploy. No test step present.
```

## Expected

Add a `yarn test-ci` step before the `Build application` step in all three deployment workflows. This creates a second test gate independent of the PR check, ensuring regressions cannot reach deployed environments.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `TEST-005`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### TEST-006

- **Suggested title:** [RA TEST-006] No code coverage threshold configured — coverage can degrade without failing CI
- **Severity:** Low
- **Domain / OWASP / CWE:** TESTING / — / CWE-1059
- **Component:** angular-spa-shell
- **Location:** `angular.json:112-145`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:low, domain:testing`
- **Cross-refs:** —

<details>
<summary>Issue body for TEST-006</summary>

```markdown
## Problem

The Angular test configuration in `angular.json` sets `codeCoverage: true`, which causes Karma to generate a text coverage summary, but no `coverageThresholds` object is defined. Additionally, `karma.conf.js` configures only a `text` coverage reporter — no HTML or LCOV output is produced. There is no build-breaking gate: coverage can fall to any level without failing CI, and there is no persistent coverage artifact to track trends over time.

## Evidence / location

- `angular.json:112-145`

```
`angular.json` line 122: `"codeCoverage": true`. No `coverageThresholds` key present. `karma.conf.js` lines 28–33: `coverageReporter` lists only `{ type: 'text' }`.
```

## Expected

Add a `coverageThresholds` block to the `test` configuration in `angular.json` (e.g., `{ "statements": 60, "branches": 50, "functions": 60, "lines": 60 }`). Update `karma.conf.js` to include `lcovonly` and `html` reporters to enable coverage trend tracking in CI.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `TEST-006`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### VULN-002

- **Suggested title:** [RA VULN-002] URL query string constructed without encodeURIComponent() in ApiService.generateQuerySt...
- **Severity:** Low
- **Domain / OWASP / CWE:** INJECTION / A03:2021 / CWE-20
- **Component:** api-client-services
- **Location:** `src/app/services/api.service.ts:55-64`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:low, domain:injection`
- **Cross-refs:** —

<details>
<summary>Issue body for VULN-002</summary>

```markdown
## Problem

generateQueryString() builds HTTP query strings via template literal string concatenation (&key=value) without applying encodeURIComponent() to values. URL-special characters in parameter values (&, =, #, %) would corrupt the query structure. Current call sites pass numeric/enum values only, making this a latent weakness. Exploitation becomes possible if future changes route free-text inputs through this method.

## Evidence / location

- `src/app/services/api.service.ts:55-64`

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `VULN-002`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### VULN-003

- **Suggested title:** [RA VULN-003] window.open() called with backend-supplied signedURL without URL scheme validation
- **Severity:** Low
- **Domain / OWASP / CWE:** INJECTION / A01:2021 / CWE-601
- **Component:** export-reports-module
- **Location:** `src/app/export-reports/export-reports.component.ts:356-359`
- **Confidence:** medium
- **Suggested labels:** `rapid-assessment, severity:low, domain:injection`
- **Cross-refs:** —

<details>
<summary>Issue body for VULN-003</summary>

```markdown
## Problem

ExportReportsComponent.downloadReport() calls window.open(this.signedURL, '_blank') where signedURL is assigned directly from the backend API JSON response field without client-side URL scheme validation. No startsWith('https://') check or URL allowlist is applied. Modern browsers block javascript: URIs in window.open(), but the absence of scheme validation is a defence-in-depth gap that would be exploitable if the backend API response were tampered with.

## Evidence / location

- `src/app/export-reports/export-reports.component.ts:356-359`

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `VULN-003`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### BW-004

- **Suggested title:** [RA BW-004] Activity form loads park/sub-area data from URL query params without client-side owners...
- **Severity:** Informational
- **Domain / OWASP / CWE:** AUTHORIZATION / A01:2021 / CWE-639
- **Component:** enter-data-module
- **Location:** `src/app/resolvers/form.resolver.ts:17-28`
- **Confidence:** medium
- **Suggested labels:** `rapid-assessment, severity:informational, domain:authorization`
- **Cross-refs:** —

<details>
<summary>Issue body for BW-004</summary>

```markdown
## Problem

FormResolver.resolve() reads orcs, subAreaId, and date directly from route.queryParams and passes them to SubAreaService.fetchSubArea() without checking that the requested orcs/subAreaId pair belongs to the user's permitted park list. An authenticated user can craft a deep-link URL to attempt to access activity data for any park. Backend enforcement is required and assumed.

## Evidence / location

- `src/app/resolvers/form.resolver.ts:17-28`

## Expected

Before issuing API requests in FormResolver, verify the requested orcs/subAreaId appears in the user's loaded ENTER_DATA_PARK list. Redirect to /enter-data if not found.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `BW-004`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### BW-005

- **Suggested title:** [RA BW-005] AutoFetch background polling interval hardcoded — not drawn from ConfigService
- **Severity:** Informational
- **Domain / OWASP / CWE:** CONFIGURATION / A05:2021 / —
- **Component:** shared-infrastructure
- **Location:** `src/app/services/auto-fetch.service.ts:4-4`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:informational, domain:configuration`
- **Cross-refs:** —

<details>
<summary>Issue body for BW-005</summary>

```markdown
## Problem

AutoFetchService has a hardcoded timeIntevalSeconds = 60 * 60 (3600 seconds). A TODO comment acknowledges this should come from ConfigService. The interval cannot be adjusted per environment without a code change and redeployment.

## Evidence / location

- `src/app/services/auto-fetch.service.ts:4-4`

## Expected

Expose AUTO_FETCH_INTERVAL_SECONDS in env.js / ConfigService and read it in AutoFetchService.run().

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `BW-005`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### DEP-004

- **Suggested title:** [RA DEP-004] @babel/traverse@7.23.2 (build tool) misclassified in runtime dependencies
- **Severity:** Informational
- **Domain / OWASP / CWE:** DEPENDENCIES / A08:2021 / CWE-1357
- **Component:** angular-spa-shell
- **Location:** `package.json:26-26`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:informational, domain:dependencies`
- **Cross-refs:** —

<details>
<summary>Issue body for DEP-004</summary>

```markdown
## Problem

@babel/traverse@7.23.2 is declared in the runtime 'dependencies' section. This is a Babel AST traversal library used exclusively at build time. It was pinned here to force resolution away from CVE-2023-45133 (affected <7.23.2; 7.23.2 is the patched release). The correct approach for Yarn Classic (v1) is to use the top-level 'resolutions' field. Its misclassification means it may be evaluated as a production dependency by security scanners.

## Impact

Security scanner false-positive risk. Build-time tools evaluated as production dependencies may trigger unnecessary remediation cycles. No runtime exploitation risk since @babel/traverse is not imported in any application source file.

## Evidence / location

- `package.json:26-26`

```
"@babel/traverse": "7.23.2",
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `DEP-004`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### DEP-005

- **Suggested title:** [RA DEP-005] @typescript-eslint/types (lint tool) misclassified in runtime dependencies
- **Severity:** Informational
- **Domain / OWASP / CWE:** DEPENDENCIES / A08:2021 / CWE-1357
- **Component:** angular-spa-shell
- **Location:** `package.json:32-32`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:informational, domain:dependencies`
- **Cross-refs:** —

<details>
<summary>Issue body for DEP-005</summary>

```markdown
## Problem

@typescript-eslint/types@^8.0.0 is declared in the runtime 'dependencies' section. This package provides TypeScript type definitions for ESLint rules and is a linting/development tool with no runtime use in a browser-deployed Angular SPA. It belongs in 'devDependencies'.

## Impact

Security scanner false-positive risk. Linting types evaluated as production dependencies may trigger unnecessary remediation cycles. No direct runtime security impact in the browser.

## Evidence / location

- `package.json:32-32`

```
"@typescript-eslint/types": "^8.0.0",
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `DEP-005`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### DEP-006

- **Suggested title:** [RA DEP-006] guid-typescript@1.0.9 unmaintained (no updates since 2018) — supply-chain risk
- **Severity:** Informational
- **Domain / OWASP / CWE:** DEPENDENCIES / A08:2021 / CWE-1357
- **Component:** shared-infrastructure
- **Location:** `package.json:35-35`
- **Confidence:** medium
- **Suggested labels:** `rapid-assessment, severity:informational, domain:dependencies`
- **Cross-refs:** —

<details>
<summary>Issue body for DEP-006</summary>

```markdown
## Problem

guid-typescript@1.0.9 is declared in runtime dependencies and used at src/app/services/toast.service.ts:3 (import { Guid } from 'guid-typescript'). The package was last published to npm in 2018 and has received no updates in over 6 years. Unmaintained npm packages carry elevated supply-chain risk: npm account takeover, ownership transfer to malicious actors, and dependency confusion attacks are ongoing threats for dormant packages. Confidence medium as unmaintained status is based on npm publication date (external knowledge).

## Impact

Dormant npm package ownership represents a supply-chain attack vector. A malicious actor could publish a new version under compromised credentials.

## Evidence / location

- `package.json:35-35`

```
"guid-typescript": "^1.0.9",
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `DEP-006`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### DEP-007

- **Suggested title:** [RA DEP-007] @digitalspace/ngds-forms/toolkit@0.0.111 pre-release internal packages in production
- **Severity:** Informational
- **Domain / OWASP / CWE:** DEPENDENCIES / A08:2021 / CWE-1357
- **Component:** enter-data-module
- **Location:** `package.json:28-29`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:informational, domain:dependencies`
- **Cross-refs:** —

<details>
<summary>Issue body for DEP-007</summary>

```markdown
## Problem

@digitalspace/ngds-forms@0.0.111 and @digitalspace/ngds-toolkit@0.0.111 are declared in runtime dependencies at exact pre-release (0.0.x) semver versions. Both are BC Parks internal packages published on the public npm registry. Pre-release versioning signals API instability and typically indicates limited formal security vetting. Exact version pins mean security updates require explicit manual version bumps.

## Impact

Pre-release internal packages in production carry supply-chain risk: the packages are publicly accessible on npm, their security history is not publicly documented, and the 0.0.x versioning indicates they may not have undergone formal security review.

## Evidence / location

- `package.json:28-29`

```
"@digitalspace/ngds-forms": "0.0.111",
    "@digitalspace/ngds-toolkit": "0.0.111",
```

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `DEP-007`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### TEST-007

- **Suggested title:** [RA TEST-007] nav-card and non-resident-revenue shared components have no test coverage
- **Severity:** Informational
- **Domain / OWASP / CWE:** TESTING / — / —
- **Component:** shared-infrastructure
- **Location:** `src/app/shared/components/nav-card/nav-card.component.ts:1-1`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:informational, domain:testing`
- **Cross-refs:** —

<details>
<summary>Issue body for TEST-007</summary>

```markdown
## Problem

Two shared UI components — `nav-card` and `non-resident-revenue` — have no spec files. These are reusable components rendered in multiple views. While not directly security-relevant, their absence from the test suite represents a gap in the overall coverage inventory.

## Evidence / location

- `src/app/shared/components/nav-card/nav-card.component.ts:1-1`

```
Directory listings of `src/app/shared/components/nav-card/` and `src/app/shared/components/non-resident-revenue/` confirm no `.spec.ts` files exist in either directory.
```

## Expected

Add basic component creation and input/output binding tests for `NavCardComponent` and `NonResidentRevenueComponent`.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `TEST-007`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
```

</details>

### CONFIG-001

> **Do not file separately.** Duplicate of `CRYPTO-001` (same defect).

- **Suggested title:** [RA CONFIG-001] TLS 1.0/1.1 Allowed as Minimum Protocol Version on CloudFront Viewer-Facing Connections
- **Severity:** High
- **Domain / OWASP / CWE:** CRYPTOGRAPHY / A02:2021 / CWE-326
- **Component:** cloudfront-cdn
- **Location:** `template.yaml:89-92`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:high, domain:cryptography, duplicate`
- **Cross-refs:** CRYPTO-001

<details>
<summary>Issue body for CONFIG-001</summary>

```markdown
## Problem

ViewerCertificate.MinimumProtocolVersion is set to TLSv1 in template.yaml, permitting TLS 1.0 and TLS 1.1 viewer connections to the CloudFront distribution. Both protocol versions are deprecated by RFC 8996 (March 2021) and are vulnerable to POODLE (CVE-2014-3566) and BEAST attacks. The origin-to-CloudFront leg correctly restricts to TLSv1.2, but this protection does not cover the viewer-facing leg. The recommended CloudFront setting is TLSv1.2_2021 or TLSv1.2_2019.

## Evidence / location

- `template.yaml:89-92`

## Expected

_See assessment finding detail; propose fix in PR._

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `CONFIG-001`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
- Duplicate of `CRYPTO-001` — do not open a second issue
```

</details>

### TEST-002

> **Do not file separately.** Duplicate of `CONFIG-005` (same defect).

- **Suggested title:** [RA TEST-002] Trivy security scan workflow disabled for all automatic triggers
- **Severity:** Medium
- **Domain / OWASP / CWE:** TESTING / A06:2021 / CWE-1059
- **Component:** angular-spa-shell
- **Location:** `.github/workflows/analysis.yaml:3-11`
- **Confidence:** high
- **Suggested labels:** `rapid-assessment, severity:medium, domain:testing, duplicate`
- **Cross-refs:** CONFIG-005

<details>
<summary>Issue body for TEST-002</summary>

```markdown
## Problem

The `analysis.yaml` GitHub Actions workflow contains a Trivy scan covering vulnerabilities, secrets, and configuration (`scanners: "vuln,secret,config"`). However, the `push`, `pull_request`, and `schedule` triggers are all commented out (lines 3–9). The workflow fires only on `workflow_dispatch` (manual invocation). Dependency CVE scanning and secret scanning therefore provide no automated gate — a PR introducing a critical dependency or a hardcoded secret will merge without any automated scan.

## Evidence / location

- `.github/workflows/analysis.yaml:3-11`

```
Lines 4–9 of `analysis.yaml` are commented out with `#`. Only `workflow_dispatch:` remains active.
```

## Expected

Re-enable at minimum the `pull_request` trigger on `analysis.yaml` so that Trivy SCA and secret scanning run automatically on every PR. Consider also adding a `schedule` trigger for weekly baseline scanning against the default branch.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `TEST-002`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
- Duplicate of `CONFIG-005` — do not open a second issue
```

</details>

### BW-003

> **Do not file separately.** Duplicate of `VULN-002` (same defect).

- **Suggested title:** [RA BW-003] API query string builder does not URL-encode parameter values
- **Severity:** Low
- **Domain / OWASP / CWE:** CODE_VULNERABILITY / A03:2021 / CWE-116
- **Component:** api-client-services
- **Location:** `src/app/services/api.service.ts:54-62`
- **Confidence:** medium
- **Suggested labels:** `rapid-assessment, severity:low, domain:code-vulnerability, duplicate`
- **Cross-refs:** VULN-002

<details>
<summary>Issue body for BW-003</summary>

```markdown
## Problem

ApiService.generateQueryString() builds HTTP query strings by direct string template concatenation without encodeURIComponent(). Parameter values containing reserved characters (&, =, +, #) will split the query string, misrouting values to incorrect keys or silently truncating remaining parameters. Affected workflows: data entry, variance review, manage-subareas.

## Evidence / location

- `src/app/services/api.service.ts:54-62`

## Expected

Replace concatenation with encodeURIComponent() on both key and value, or use the browser's URLSearchParams API.

## Source

- Rapid assessment `ra-2026-07-21T171227Z` finding `BW-003`
- Ticket backlog: `docs/bcparks-ar-admin-rapid-assessment-tickets.md` (this repo)
- Duplicate of `VULN-002` — do not open a second issue
```

</details>

