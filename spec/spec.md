# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### CONFIG-002 — Content-Security-Policy on CloudFront responses

- **Issue:** [#63](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/63)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `CONFIG-002`
- **Feature:** `features/config-002-cloudfront-csp.feature`

#### Problem

No Content-Security-Policy is emitted on CloudFront responses, and `src/index.html` has no CSP meta fallback. Without CSP the browser cannot restrict script sources, object sources, or frame ancestors. The SPA authenticates via loginproxy.gov.bc.ca (Keycloak) and calls attendance API hosts — those must be allowlisted for connect/frame without opening script execution to arbitrary origins.

#### Outcome

The shared custom response headers policy (all three cache behaviours) sets a **sourced Content-Security-Policy** that at minimum:

1. Limits **script-src** to same origin (`'self'`) — Keycloak JS is bundled from the app origin
2. Allows **connect-src** / **frame-src** (and form-action as needed) for loginproxy and attendance/API hosts used by the app
3. Sets **object-src 'none'** and **frame-ancestors 'none'**
4. Preserves HSTS, CORS, and CONFIG-004 browser headers (XFO / nosniff / Referrer / Permissions-Policy)

#### Users & personas

| Persona | Goal |
| --- | --- |
| Security reviewer | Confirm CSP on every behaviour with loginproxy allowlisted |
| Parks staff | Login and API calls still work under CSP |
| Implementer | Template-only change + evidence |

#### Scope

**In scope**

- Add `ContentSecurityPolicy` to existing `CloudFrontResponseHeadersPolicy` in `template.yaml`
- Keep all three behaviours on that policy
- Evidence append; must change `template.yaml`

**Out of scope**

- Adding a CSP `<meta>` tag in `index.html` if the response header covers all behaviours (header is preferred; meta only if needed as residual)
- Changing HSTS / CORS / CONFIG-004 headers beyond preserving them
- Live login/API smoke after deploy (residual)

#### Open questions

- **style-src 'unsafe-inline':** Angular/Bootstrap may require it for this brownfield app — acceptable if documented in evidence; prefer `'self'` plus `'unsafe-inline'` over wide-open style sources.
- **Exact host patterns:** Prefer `loginproxy.gov.bc.ca` / `*.loginproxy.gov.bc.ca`, `*.execute-api.ca-central-1.amazonaws.com`, `*.bcparks.ca` to match production IdP and API shapes.

#### Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| BA | | |
| QA (acceptance ownership) | | |

---

## Completed slices (recent)

### CONFIG-004 — Browser security headers (frame / MIME / referrer / permissions)

- **Issue:** [#104](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/104) (shipped)
- **Feature:** `features/config-004-cloudfront-security-headers.feature`

### CONFIG-003 — CloudFront HSTS on all cache behaviours

- **Issue:** [#64](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/64) (shipped)
- **Feature:** `features/config-003-cloudfront-hsts.feature`

### CRYPTO-001 / LOG-002 / TEST-001 / LOG-003 / LOG-001 / AUTHZ-001

- Shipped — see rematch wiki
