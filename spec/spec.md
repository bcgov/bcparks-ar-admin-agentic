# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice — CONFIG-004 (CloudFront browser security headers)

**Issue:** [#36](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/36)  
**Finding:** RA CONFIG-004  
**Feature:** `features/config-004-cloudfront-security-headers.feature`

### Problem

The CDN now sends HSTS, but still does not tell browsers to refuse framing, refuse MIME sniffing, limit referrers, or restrict powerful browser features. That leaves clickjacking and related browser-abuse paths open on the staff UI.

### Outcome

The existing custom CDN response-headers policy also sets frame denial, nosniff, a strict-enough Referrer-Policy, and a restrictive Permissions-Policy. HSTS and CORS stay as they are. Content-Security-Policy is a later slice. Proof is structural in the template; live headers after deploy are residual smoke.

### Users & personas

| Persona | Goal |
| --- | --- |
| Park Operator / BC Parks staff | App still loads; API CORS still works |
| Security reviewer | Confirm the four headers are declared without dropping HSTS |

### Scope

#### In scope (issue #36)

- X-Frame-Options (DENY or SAMEORIGIN)
- X-Content-Type-Options: nosniff
- Referrer-Policy
- Permissions-Policy
- Keep CONFIG-003 HSTS + CORS

#### Out of scope

- CONFIG-002 CSP
- Live header negotiation in CI

### Journeys

1. Browser security headers present — see `features/config-004-cloudfront-security-headers.feature`

### Non-functional requirements

- No UI change; AWS CloudFront (J6)

### Open questions (for checkpoint 1 reviewers)

- [x] DENY is acceptable for X-Frame-Options (this admin UI is not framed).

### Traceability

| Finding | Issue | Feature |
| --- | --- | --- |
| RA CONFIG-004 | #36 | `features/config-004-cloudfront-security-headers.feature` |

### Sign-off (checkpoint 1) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| Tech lead | | |

> Do not add `ready-for-agent` to #36 until this spec PR is merged.

---

## Completed slices

### CONFIG-003 — CloudFront HSTS — [#32](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/32)
### CRYPTO-001 — Viewer TLS 1.2+ — [#27](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/27)
### LOG-002 — Keycloak lifecycle levels — [#23](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/23)
### LOG-003 — Auth denial logging — [#15](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/15)
### LOG-001 — No config dump — [#19](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/19)
### AUTH-001 — PKCE — [#11](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/11)
### AUTHZ-001 — Admin route guard — [#6](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/6)
