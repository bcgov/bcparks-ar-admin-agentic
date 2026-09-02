# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### CONFIG-003 — CloudFront HSTS on all cache behaviours

- **Issue:** [#64](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/64)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `CONFIG-003`
- **Feature:** `features/config-003-cloudfront-hsts.feature`

#### Problem

None of the CloudFront cache behaviours emit `Strict-Transport-Security`. HTTPS redirects alone do not give browsers a durable HTTPS requirement, leaving first-contact / cache-expiry SSL-stripping risk and blocking HSTS preload readiness.

#### Outcome

A custom CloudFront response headers policy sets **HSTS** (`max-age` ≥ 31536000, `includeSubDomains`) and is attached to **all three** cache behaviours. CORS behaviour equivalent to the previous managed SimpleCORS policy is preserved. Other security headers (CSP, XFO, Referrer-Policy, Permissions-Policy) remain for CONFIG-002 / CONFIG-004.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Security reviewer | Confirm HSTS on every behaviour |
| Parks staff | Modern browsers remember HTTPS |
| Implementer | Template-only change + evidence |

#### Scope

**In scope**

- Custom `AWS::CloudFront::ResponseHeadersPolicy` with HSTS (+ CORS parity with SimpleCORS)
- Wire all three cache behaviours to that policy (replace managed SimpleCORS id)
- Evidence append; must change `template.yaml`

**Out of scope**

- CSP (CONFIG-002), XFO / nosniff / Referrer / Permissions-Policy (CONFIG-004)
- HSTS preload list submission (ops residual)
- Live header smoke (residual after deploy)

#### Open questions

- **Preload directive:** Assessment mentions preload list readiness. CloudFront `StrictTransportSecurity` may support `Preload`. Prefer enabling preload when the property exists; if not available in the resource schema used here, document residual and still ship max-age + includeSubDomains.

#### Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| BA | | |
| QA (acceptance ownership) | | |

---

## Completed slices (recent)

### CRYPTO-001 — CloudFront viewer TLS minimum (TLS 1.2+)

- **Issue:** [#74](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/74) (shipped)
- **Feature:** `features/crypto-001-cloudfront-tls-minimum.feature`

### LOG-002 — Keycloak authentication lifecycle log levels

- **Issue:** [#66](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/66) (shipped)
- **Feature:** `features/log-002-keycloak-lifecycle-log-levels.feature`

### TEST-001 — HTTP token interceptor unit coverage

- **Issue:** [#68](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/68) (shipped)
- **Feature:** `features/test-001-token-interceptor.feature`

### LOG-003 / LOG-001 / AUTHZ-001

- Shipped — see prior rematch rows

---

## Completed slices

### AUTHZ-001 — Admin route guard path matching

- **Issue:** [#55](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/55) (shipped)
- **Feature:** `features/authz-001-admin-route-guard.feature`
