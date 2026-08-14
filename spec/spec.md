# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice — CONFIG-003 (CloudFront HSTS)

**Issue:** [#32](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/32)  
**Finding:** RA CONFIG-003  
**Feature:** `features/config-003-cloudfront-hsts.feature`

### Problem

The CDN redirects HTTP to HTTPS but does not send Strict-Transport-Security, so browsers do not remember that HTTPS is required. First visits (and cache expiry) can still start on HTTP and be stripped.

### Outcome

All CDN cache behaviours send HSTS with a long max-age and includeSubDomains. CORS behaviour the API needs today is preserved. Other security headers (CSP, X-Frame-Options, etc.) are later slices. Proof is structural in the template; live header checks after deploy are residual smoke.

### Users & personas

| Persona | Goal |
| --- | --- |
| Park Operator / BC Parks staff | Site still loads over HTTPS; API calls still work |
| Security reviewer | Confirm HSTS is declared on all three behaviours |
| Platform operator | Template-only change |

### Scope

#### In scope (issue #32)

- Custom CloudFront response headers policy with HSTS
- Attach it to all three cache behaviours
- Keep equivalent CORS to current SimpleCORS

#### Out of scope

- CONFIG-002 CSP, CONFIG-004 XFO/nosniff/referrer/permissions
- CRYPTO-001 TLS floor (shipped)
- Live header negotiation in CI

### Journeys

1. HSTS present on all cache behaviours — see `features/config-003-cloudfront-hsts.feature`

### Non-functional requirements

- Accessibility: no UI change
- Hosting: AWS CloudFront (J6)
- Testability: template inspection

### Open questions (for checkpoint 1 reviewers)

- [x] Accept includeSubDomains + ~1 year max-age as the HSTS baseline for this pilot.

### Traceability

| Finding | Issue | Feature |
| --- | --- | --- |
| RA CONFIG-003 | #32 | `features/config-003-cloudfront-hsts.feature` |

### Sign-off (checkpoint 1) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| Tech lead | | |

> Do not add `ready-for-agent` to #32 until this spec PR is merged.

---

## Completed slices

### CRYPTO-001 — CloudFront viewer TLS minimum

- **Issue:** [#27](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/27) (shipped) · alias CONFIG-001
- **Feature:** `features/crypto-001-cloudfront-tls-minimum.feature`

### LOG-002 — Keycloak lifecycle log levels — [#23](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/23)

### LOG-003 — Auth denial logging — [#15](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/15)

### LOG-001 — No full config console dump — [#19](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/19)

### AUTH-001 — PKCE — [#11](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/11)

### AUTHZ-001 — Admin route guard — [#6](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/6)
