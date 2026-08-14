# Plan — CloudFront browser security headers (CONFIG-004)

> Architecture and delivery approach for issue [#36](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/36) / RA CONFIG-004.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Extend the existing `CloudFrontHSTSResponseHeadersPolicy` (CONFIG-003) with frame denial, nosniff, Referrer-Policy, and Permissions-Policy. Keep HSTS and CORS. Do not add CSP in this slice.

## Architecture

```text
template.yaml
  CloudFrontHSTSResponseHeadersPolicy (existing)
    SecurityHeadersConfig
      StrictTransportSecurity          ← keep (CONFIG-003)
      FrameOptions: DENY               ← new
      ContentTypeOptions: nosniff      ← new
      ReferrerPolicy: strict-origin-when-cross-origin  ← new
    CustomHeadersConfig
      Permissions-Policy               ← new (not a first-class SecurityHeadersConfig field)
    CorsConfig                         ← keep
  CloudFrontDistribution
    all three cache behaviours already !Ref this policy — leave attachments as-is
```

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Where | Extend `CloudFrontHSTSResponseHeadersPolicy` | One policy, three attachments already in place |
| Frame | `FrameOption: DENY` | Admin UI is not framed |
| MIME | `ContentTypeOptions.Override: true` | CloudFront emits `X-Content-Type-Options: nosniff` |
| Referrer | `strict-origin-when-cross-origin` | Signed Gherkin |
| Permissions | Custom header disabling unused capabilities (camera, microphone, geolocation, payment, usb, interest-cohort) | No native `PermissionsPolicy` property on this resource |
| CSP | Not this PR | CONFIG-002 |
| Proof | Static template assertions | No live AWS in CI |

## Security & privacy

- Residual: headers take effect only after the next CloudFront deploy. Live `curl -I` / browser DevTools header smoke is a human follow-up, not a CI gate.
- Clickjacking/MIME/referrer controls are browser-enforced; they do not replace API authorization.

## Test approach

- Static: `template.yaml` contains FrameOptions DENY, ContentTypeOptions, ReferrerPolicy `strict-origin-when-cross-origin`, and a Permissions-Policy custom header; HSTS + CORS remain; all three behaviours still `!Ref CloudFrontHSTSResponseHeadersPolicy`
- Update `docs/pr-evidence.md`
- No Angular/UI tests required

## Rollout

- Next SAM deploy. Optional human: `curl -I` for `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, plus HSTS.

## Approval (checkpoint 2) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
