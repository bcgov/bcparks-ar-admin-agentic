# Tasks — CONFIG-004 (active)

- [ ] Extend `CloudFrontResponseHeadersPolicy` in `template.yaml`: FrameOptions DENY, ContentTypeOptions nosniff, ReferrerPolicy strict-origin-when-cross-origin, Permissions-Policy via CustomHeadersConfig (camera/microphone/geolocation/payment/usb/interest-cohort disabled); preserve HSTS + CORS
- [ ] Confirm all three cache behaviours still reference `!Ref CloudFrontResponseHeadersPolicy`
- [ ] Append `docs/pr-evidence.md` for CONFIG-004 (do not overwrite prior slices)
- [ ] Checkpoint 3 + merge (must change `template.yaml`; refuse evidence-only)
