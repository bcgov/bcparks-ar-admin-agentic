# Tasks — CloudFront browser security headers (CONFIG-004)

Issue #36; feature `features/config-004-cloudfront-security-headers.feature`.

- [ ] **TASK-001** — Extend existing `SecurityHeadersConfig` with FrameOptions DENY, ContentTypeOptions, and ReferrerPolicy strict-origin-when-cross-origin; all override.
- [ ] **TASK-002** — Add custom `Permissions-Policy` disabling unused camera, microphone, geolocation, payment, and usb capabilities.
- [ ] **TASK-003** — Prove HSTS/CORS and three policy refs remain; do not add CSP.
- [ ] **TASK-004** — Run checks, update evidence, open draft PR linking #36; do not self-merge.
