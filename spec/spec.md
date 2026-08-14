# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice — CRYPTO-001 (CloudFront viewer TLS minimum)

**Issue:** [#27](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/27)  
**Finding:** RA CRYPTO-001 (duplicate CONFIG-001; merged severity High)  
**Feature:** `features/crypto-001-cloudfront-tls-minimum.feature`

### Problem

The public CDN allows outdated TLS 1.0 and 1.1 for people connecting to the admin UI. Modern browsers usually negotiate a newer protocol, but the floor is too low for current cryptographic guidance.

### Outcome

The CDN viewer TLS floor is TLS 1.2 or higher (policy `TLSv1.2_2021`, or `TLSv1.2_2019` at minimum). Proof is a static check of the infrastructure template. Live handshake after deploy is residual human smoke. Response headers (HSTS, CSP, XFO) are separate findings.

### Users & personas

| Persona | Goal |
| --- | --- |
| Park Operator / BC Parks staff | HTTPS still works in current browsers |
| Security reviewer | Confirm TLS 1.0/1.1 are no longer permitted on the viewer certificate |
| Platform operator | Template change only; no SPA behaviour change |

### Scope

#### In scope (issue #27)

- Raise CloudFront `MinimumProtocolVersion` off `TLSv1`
- Static/template verification in CI or evidence

#### Out of scope

- CONFIG-002 CSP, CONFIG-003 HSTS, CONFIG-004 other security headers
- Certificate ARN / SECRET-001
- Origin protocol (already TLS 1.2)
- Live TLS negotiation test in CI

### Journeys

1. Viewer TLS minimum is TLS 1.2+ — see `features/crypto-001-cloudfront-tls-minimum.feature`

### Non-functional requirements

- Accessibility: no UI change
- Hosting: AWS CloudFront remains (constitution J6 exception)
- Testability: template string/SAM check; no live AWS required for merge

### Open questions (for checkpoint 1 reviewers)

- [x] Accept `TLSv1.2_2021` as the target policy (not TLS 1.3-only).

### Traceability

| Finding | Issue | Feature |
| --- | --- | --- |
| RA CRYPTO-001 (alias CONFIG-001) | #27 | `features/crypto-001-cloudfront-tls-minimum.feature` |

### Sign-off (checkpoint 1) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| Tech lead | | |
| QA (acceptance ownership) | | |

> Do not add `ready-for-agent` to #27 until this table is filled and this spec PR is merged.

---

## Completed slices

### LOG-002 — Keycloak lifecycle log levels

- **Issue:** [#23](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/23) (shipped)
- **Feature:** `features/log-002-keycloak-lifecycle-log-levels.feature`
- **Summary:** Auth error, refresh error, and logout log at warn/error with optional username hint.

### LOG-003 — Auth denial logging

- **Issue:** [#15](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/15) (shipped)
- **Feature:** `features/log-003-auth-denial-logging.feature`

### LOG-001 — No full config console dump

- **Issue:** [#19](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/19) (shipped)
- **Feature:** `features/log-001-no-config-console-dump.feature`

### AUTH-001 — PKCE on Keycloak init

- **Issue:** [#11](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/11) (shipped)
- **Feature:** `features/auth-001-pkce.feature`

### AUTHZ-001 — Admin route guard path matching

- **Issue:** [#6](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/6) (shipped)
- **Feature:** `features/authz-001-admin-route-guard.feature`
