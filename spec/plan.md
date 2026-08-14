# Plan — CloudFront browser security headers (CONFIG-004)

> Issue [#36](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/36); checkpoint 1 merged.

## Summary

Extend `CloudFrontHSTSResponseHeadersPolicy` in `template.yaml`. Use native CloudFront `SecurityHeadersConfig` for frame denial, nosniff, and referrer policy; use `CustomHeadersConfig` for `Permissions-Policy`. Preserve HSTS, CORS, and all three behavior references. No CSP.

## Decisions

| Header | Configuration |
| --- | --- |
| X-Frame-Options | `FrameOption: DENY`, override |
| X-Content-Type-Options | native ContentTypeOptions, override |
| Referrer-Policy | `strict-origin-when-cross-origin`, override |
| Permissions-Policy | custom header disabling camera, microphone, geolocation, payment, usb (override) |

## Risks and proof

- CloudFront property casing/schema must be valid; static review / `sam validate --lint` if available.
- Restrictive Permissions-Policy must only disable capabilities unused by the app.
- Confirm HSTS + CORS remain and the policy still has three attachments.
- Existing PR lint/test remain green; live `curl -I` is residual.

## Scope exclusions

CSP (CONFIG-002), UI code, APIs, origins, TLS, certificate ARN.

## Approval — checkpoint 2

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
