# Tasks — CONFIG-004 (active)

- [x] Extend `CloudFrontResponseHeadersPolicy` in `template.yaml`: FrameOptions DENY, ContentTypeOptions nosniff, ReferrerPolicy strict-origin-when-cross-origin, Permissions-Policy via CustomHeadersConfig (camera/microphone/geolocation/payment/usb/interest-cohort disabled); preserve HSTS + CORS
- [x] Confirm all three cache behaviours still reference `!Ref CloudFrontResponseHeadersPolicy`
- [x] Append `docs/pr-evidence.md` for CONFIG-004 (do not overwrite prior slices)
- [ ] Checkpoint 3 + merge (must change `template.yaml`; refuse evidence-only)
