# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### CONFIG-004 — Browser security headers (frame / MIME / referrer / permissions)

- **Issue:** [#104](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/104)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `CONFIG-004`
- **Feature:** `features/config-004-cloudfront-security-headers.feature`

#### Problem

CloudFront responses lack baseline browser protections: no X-Frame-Options (clickjacking risk for authenticated admin UI), no X-Content-Type-Options: nosniff (MIME confusion on static assets), no Referrer-Policy (origin URL leakage to third parties), and no Permissions-Policy (unused browser capabilities unrestricted). The finding originally noted managed SimpleCORS alone; CONFIG-003 already replaced that with a custom HSTS+CORS policy — this slice extends that same custom policy.

#### Outcome

The shared custom response headers policy, attached to **all three** cache behaviours, sets:

1. **X-Frame-Options:** DENY (no framing)
2. **X-Content-Type-Options:** nosniff
3. **Referrer-Policy:** strict-origin-when-cross-origin
4. **Permissions-Policy:** disables unused capabilities (at minimum camera, microphone, geolocation, payment, usb, interest-cohort)

HSTS and CORS from CONFIG-003 remain. Content-Security-Policy remains for CONFIG-002 (not silently narrowed here — CSP is a separate finding).

#### Users & personas

| Persona | Goal |
| --- | --- |
| Security reviewer | Confirm four headers on every behaviour |
| Parks staff | Admin UI not framable / MIME-sniffable |
| Implementer | Template-only change + evidence |

#### Scope

**In scope**

- Extend existing custom `AWS::CloudFront::ResponseHeadersPolicy` with FrameOptions, ContentTypeOptions, ReferrerPolicy, and Permissions-Policy (custom header if not a native SecurityHeadersConfig property)
- Keep all three behaviours on that policy
- Evidence append; must change `template.yaml`

**Out of scope**

- Content-Security-Policy (CONFIG-002)
- Changing HSTS max-age / preload or CORS parity from CONFIG-003 beyond preserving them
- Live header smoke after deploy (residual)
- Submitting HSTS preload list (ops residual)

#### Open questions

- **Permissions-Policy value:** Prefer a restrictive deny-list for unused capabilities (camera, microphone, geolocation, payment, usb, interest-cohort). If CloudFront schema requires CustomHeadersConfig for Permissions-Policy, that is acceptable. Document the exact value in evidence.

#### Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| BA | | |
| QA (acceptance ownership) | | |

---

## Completed slices (recent)

### CONFIG-003 — CloudFront HSTS on all cache behaviours

- **Issue:** [#64](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/64) (shipped)
- **Feature:** `features/config-003-cloudfront-hsts.feature`

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
