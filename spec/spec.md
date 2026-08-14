# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice — CONFIG-002 (Content-Security-Policy)

**Issue:** [#41](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/41)  
**Finding:** RA CONFIG-002  
**Feature:** `features/config-002-cloudfront-csp.feature`

### Problem

Responses from the admin UI host do not tell the browser which script, style, image, font, connect, or frame sources are allowed. Without that policy, injected script can run, and the Keycloak login host is not an explicit allowlisted partner.

### Outcome

The shared response-headers policy emits a Content-Security-Policy whose allowlist matches how this app actually loads:

- First-party UI assets (scripts, styles, images, fonts) from the same host
- API calls to the configured attendance API host (same host via `/api`, API Gateway, or `*.bcparks.ca`)
- Keycloak / loginproxy (`loginproxy.gov.bc.ca` and `*.loginproxy.gov.bc.ca`) for token/XHR, silent-check iframe, and login navigation
- Inline styles required by the current UI libraries
- No plugins (`object-src` none); no embedding this app in other sites (`frame-ancestors` none)

HSTS, CORS, and the CONFIG-004 browser headers remain. Proof is structural inspection of the hosting template. Live login/API smoke after deploy is residual.

### Users & personas

| Persona | Goal |
| --- | --- |
| BC Parks staff | Login, API calls, and the UI continue to work after CSP is on |
| Security reviewer | Confirm CSP is present on the shared policy with a sourced allowlist |
| Platform operator | Extend the existing policy; keep three behavior attachments |

### Scope

#### In scope (#41)

- CSP on the existing shared response-headers policy
- Allowlist derived from SPA assets, API `connect-src`, and Keycloak/loginproxy (see below)
- Preserve HSTS, CORS, and CONFIG-004 headers and all three attachments
- Static template proof

#### Out of scope

- New response-headers policy
- App UI/API/Keycloak client changes
- Nonce/hash-based `script-src` or removing `'unsafe-inline'` from styles in this slice
- Live deploy / login smoke in CI

### Derived allowlist (pre-plan)

Reviewed `src/index.html`, `angular.json` (bundled jQuery/Bootstrap/Popper/keycloak-js — not a CDN), `src/styles.scss` (Bootstrap Icons fonts), `src/env.js` / deploy workflows (`API_LOCATION`, `KEYCLOAK_URL`), and Keycloak init (token XHR + possible silent iframe).

| Directive | Sources | Why |
| --- | --- | --- |
| `default-src` / `script-src` / `base-uri` | `'self'` | Bundled SPA + `env.js`; Keycloak JS is npm-bundled, not loaded from loginproxy |
| `style-src` | `'self' 'unsafe-inline'` | Angular/component styles, ngx-bootstrap datepicker, ngx-toastr |
| `img-src` / `font-src` | `'self' data:` | Local assets + Bootstrap Icons |
| `connect-src` | `'self'` + loginproxy + `*.execute-api.ca-central-1.amazonaws.com` + `*.bcparks.ca` | API via `API_LOCATION`; Keycloak token/userinfo |
| `frame-src` | loginproxy hosts | Keycloak silent SSO iframe |
| `form-action` | `'self'` + loginproxy hosts | Login redirect/form |
| `object-src` | `'none'` | No plugins |
| `frame-ancestors` | `'none'` | Complements CONFIG-004 frame denial |

Exact header string is a checkpoint 2 decision. CSP host wildcards: `https://*.loginproxy.gov.bc.ca` does **not** match apex `https://loginproxy.gov.bc.ca` — both must be listed.

### Journeys

1. Shared policy contains CSP with the derived allowlist — see `features/config-002-cloudfront-csp.feature`

### Non-functional requirements

- No UI change; AWS hosting remains
- Static proof in evidence; post-deploy login/API header smoke residual

### Traceability

| Finding | Issue | Feature |
| --- | --- | --- |
| RA CONFIG-002 | #41 | `features/config-002-cloudfront-csp.feature` |

### Sign-off (checkpoint 1) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| Tech lead | | |
| QA | | |

> Do not add `ready-for-agent` to #41 until this spec PR is merged.

---

## Completed slices

### CONFIG-004 — Browser security headers

- **Issue:** [#36](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/36) (shipped)
- **Feature:** `features/config-004-cloudfront-security-headers.feature`

### CONFIG-003 — CloudFront HSTS

- **Issue:** [#32](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/32) (shipped)
- **Feature:** `features/config-003-cloudfront-hsts.feature`

### CRYPTO-001 — Viewer TLS 1.2+ — [#27](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/27)
### LOG-002 — Keycloak lifecycle levels — [#23](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/23)
### LOG-003 — Auth denial logging — [#15](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/15)
### LOG-001 — No config dump — [#19](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/19)
### AUTH-001 — PKCE — [#11](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/11)
### AUTHZ-001 — Admin route guard — [#6](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/6)
