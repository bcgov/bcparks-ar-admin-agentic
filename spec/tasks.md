# Tasks — CONFIG-002 (active)

- [ ] Add `ContentSecurityPolicy` to `CloudFrontResponseHeadersPolicy` in `template.yaml` (script-src 'self'; connect/frame allow loginproxy + attendance/API hosts; object-src none; frame-ancestors none; style-src may include 'unsafe-inline' for brownfield); preserve HSTS, CORS, CONFIG-004 headers
- [ ] Confirm all three cache behaviours still reference `!Ref CloudFrontResponseHeadersPolicy`
- [ ] Append `docs/pr-evidence.md` for CONFIG-002 (do not overwrite prior slices)
- [ ] Checkpoint 3 + merge (must change `template.yaml`; refuse evidence-only)
