# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice — CONFIG-004 (browser security headers)

**Issue:** [#36](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/36)  
**Finding:** RA CONFIG-004  
**Feature:** `features/config-004-cloudfront-security-headers.feature`

### Problem

CloudFront responses do not prevent framing or MIME sniffing, do not constrain referrer detail, and do not disable unused browser capabilities. This weakens browser-side protection for the authenticated admin UI.

### Outcome

The shared CloudFront response policy adds frame denial, nosniff, strict-origin-when-cross-origin referrer handling, and a restrictive permissions policy. HSTS and CORS from CONFIG-003 remain. CSP is a separate later slice.

### Users & personas

| Persona | Goal |
| --- | --- |
| BC Parks staff | App and API continue working normally |
| Security reviewer | Confirm the four protections are emitted by the shared policy |
| Platform operator | Extend the existing policy; keep three behavior attachments |

### Scope

#### In scope (#36)

- Frame protection, nosniff, Referrer-Policy, Permissions-Policy
- Preserve HSTS/CORS and all three attachments
- Static template proof

#### Out of scope

- CSP (CONFIG-002)
- App UI/API changes
- Live deploy/header probe in CI

### Journeys

1. Shared policy contains browser protections — see `features/config-004-cloudfront-security-headers.feature`

### Non-functional requirements

- No UI change; AWS hosting remains
- Static proof in evidence; post-deploy smoke residual

### Traceability

| Finding | Issue | Feature |
| --- | --- | --- |
| RA CONFIG-004 | #36 | `features/config-004-cloudfront-security-headers.feature` |

### Sign-off (checkpoint 1) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| Tech lead | | |
| QA | | |

> Do not add `ready-for-agent` to #36 until this spec PR is merged.

---

## Completed slices

### CONFIG-003 — CloudFront HSTS

- **Issue:** [#32](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/32) (shipped)
- **Feature:** `features/config-003-cloudfront-hsts.feature`

### CONFIG-003 — CloudFront HSTS — [#32](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/32)
### CRYPTO-001 — Viewer TLS 1.2+ — [#27](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/27)
### LOG-002 — Keycloak lifecycle levels — [#23](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/23)
### LOG-003 — Auth denial logging — [#15](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/15)
### LOG-001 — No config dump — [#19](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/19)
### AUTH-001 — PKCE — [#11](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/11)
### AUTHZ-001 — Admin route guard — [#6](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/6)
