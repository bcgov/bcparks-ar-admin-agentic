# Plan — CloudFront Content-Security-Policy (CONFIG-002)

> Architecture and delivery approach for issue [#41](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/41) / RA CONFIG-002.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Add `ContentSecurityPolicy` to the existing `CloudFrontHSTSResponseHeadersPolicy`. Keep HSTS, CORS, and CONFIG-004 headers. Do not create a second policy. Live login/API smoke is residual, not a merge gate.

## Architecture

```text
template.yaml
  CloudFrontHSTSResponseHeadersPolicy (existing)
    SecurityHeadersConfig
      ContentSecurityPolicy            ← new (CONFIG-002)
      FrameOptions / ContentTypeOptions / ReferrerPolicy / HSTS  ← keep
    CustomHeadersConfig
      Permissions-Policy               ← keep
    CorsConfig                         ← keep
  CloudFrontDistribution
    all three cache behaviours already !Ref this policy — leave attachments as-is
```

## CSP header (signed allowlist)

Exact `ContentSecurityPolicy` string (single line in the template):

```
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' https://loginproxy.gov.bc.ca https://*.loginproxy.gov.bc.ca https://*.execute-api.ca-central-1.amazonaws.com https://*.bcparks.ca; frame-src https://loginproxy.gov.bc.ca https://*.loginproxy.gov.bc.ca; form-action 'self' https://loginproxy.gov.bc.ca https://*.loginproxy.gov.bc.ca; object-src 'none'; frame-ancestors 'none'; base-uri 'self'
```

| Directive | Sources | Why |
| --- | --- | --- |
| `script-src` / `default-src` / `base-uri` | `'self'` | Bundled SPA + `env.js`; keycloak-js is npm, not a loginproxy script |
| `style-src` | `'self' 'unsafe-inline'` | Angular / ngx-bootstrap / toastr inline styles |
| `img-src` / `font-src` | `'self' data:` | Local assets + Bootstrap Icons |
| `connect-src` | `'self'` + loginproxy apex+wildcard + `*.execute-api.ca-central-1.amazonaws.com` + `*.bcparks.ca` | `API_LOCATION` (execute-api or CloudFront `/api`) + Keycloak XHR |
| `frame-src` | loginproxy apex + `*.loginproxy.gov.bc.ca` | Keycloak silent SSO iframe |
| `form-action` | `'self'` + loginproxy | Login redirect |
| `object-src` | `'none'` | No plugins |
| `frame-ancestors` | `'none'` | Complements CONFIG-004 DENY |

CSP `https://*.loginproxy.gov.bc.ca` does **not** match apex `https://loginproxy.gov.bc.ca`; both are required.

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Where | Extend existing policy `SecurityHeadersConfig.ContentSecurityPolicy` with `Override: true` | One policy, three attachments |
| Mode | Enforcing CSP (not Report-Only) | Finding asks for the header; report-only would not close it |
| Live smoke | Residual human follow-up after deploy | CI cannot hit loginproxy/API; do **not** block merge on live proof |
| Nonce/hashes | Out of scope | Would require app rebuild |

## Security & privacy

- Residual: a too-tight CSP can break IDIR/BCeID/API until the next deploy. If live smoke fails, widen `connect-src`/`frame-src` with evidence — do not add `'unsafe-eval'` or `*` unless a concrete runtime error requires it.
- CSP is browser-enforced; it does not replace API authorization.

## Test approach

- Static: template contains `ContentSecurityPolicy` with the directives above; loginproxy apex + wildcard; execute-api ca-central-1; `object-src 'none'`; `frame-ancestors 'none'`; no `ContentSecurityPolicy` Report-Only; HSTS/CORS/CONFIG-004 keys remain; three `!Ref CloudFrontHSTSResponseHeadersPolicy`
- Update `docs/pr-evidence.md`
- No Angular tests required

## Rollout

- Next SAM deploy. Optional human: `curl -I` for CSP, then login + one API call. Record failures as residual, not a reason to revert CI-proven template structure.

## Approval (checkpoint 2) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
