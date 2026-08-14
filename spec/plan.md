# Plan — CloudFront Content-Security-Policy (CONFIG-002)

> Architecture and delivery approach for issue [#41](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/41) / RA CONFIG-002.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Add CSP to the existing `CloudFrontHSTSResponseHeadersPolicy`. Keep HSTS, CORS, and CONFIG-004 headers. Do not create a second policy. Live login/API smoke is residual, not a merge gate.

## Architecture

```text
template.yaml
  CloudFrontHSTSResponseHeadersPolicy (existing)
    SecurityHeadersConfig
      StrictTransportSecurity, FrameOptions, ContentTypeOptions, ReferrerPolicy  ← keep
      ContentSecurityPolicy.ContentSecurityPolicy  ← new (string below)
    CustomHeadersConfig.Permissions-Policy         ← keep
    CorsConfig                                     ← keep
  CloudFrontDistribution
    all three cache behaviours already !Ref this policy — leave attachments as-is
```

## Locked CSP string

Derived in checkpoint 1 from `src/index.html`, `angular.json` (bundled jQuery/Bootstrap/Popper/`keycloak-js`, not a CDN), `src/styles.scss` (Bootstrap Icons), `API_LOCATION` / deploy `API_GATEWAY_URL`, and Keycloak `KEYCLOAK_URL` (`dev.loginproxy.gov.bc.ca` / `loginproxy.gov.bc.ca`). Apex `loginproxy.gov.bc.ca` is listed separately because `*.loginproxy.gov.bc.ca` does not match it.

```
default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' https://*.loginproxy.gov.bc.ca https://loginproxy.gov.bc.ca https://*.execute-api.ca-central-1.amazonaws.com https://*.bcparks.ca; frame-src https://*.loginproxy.gov.bc.ca https://loginproxy.gov.bc.ca; form-action 'self' https://*.loginproxy.gov.bc.ca https://loginproxy.gov.bc.ca
```

CloudFront native field: `SecurityHeadersConfig.ContentSecurityPolicy` with `Override: true`.

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Where | Extend existing policy | Three attachments already in place |
| `script-src` | `'self'` only | Keycloak JS is npm-bundled via `angular.json` scripts |
| `style-src` | include `'unsafe-inline'` | Angular / ngx-bootstrap / ngx-toastr; nonce migration is later |
| API hosts | `'self'` + execute-api + `*.bcparks.ca` | `API_LOCATION` may be CloudFront `/api`, execute-api, or custom domain |
| IdP | both apex and `*.loginproxy.gov.bc.ca` | token XHR, silent iframe, login navigation |
| Proof | Static template assertions | No live AWS in CI |
| Live smoke | Residual after deploy | Not required to merge CP3 |

## Security & privacy

- Residual: headers take effect only after the next CloudFront deploy. Human follow-up: `curl -I` for `Content-Security-Policy` plus a login + one API call watching the console for CSP violations.
- CSP is browser-enforced; it does not replace API authorization.
- `'unsafe-inline'` on styles is an accepted residual for this slice.

## Test approach

- Static: `template.yaml` `ContentSecurityPolicy` contains the locked string (or equivalent directives); HSTS + CORS + CONFIG-004 headers remain; all three behaviours still `!Ref CloudFrontHSTSResponseHeadersPolicy`
- Update `docs/pr-evidence.md`
- No Angular/UI tests required

## Rollout

- Next SAM deploy. Optional human: header probe + IDIR login + one API request.

## Approval (checkpoint 2) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
