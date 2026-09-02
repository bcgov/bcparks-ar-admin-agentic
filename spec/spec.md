# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### CRYPTO-001 — CloudFront viewer TLS minimum (TLS 1.2+)

- **Issue:** [#74](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/74)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `CRYPTO-001` (merged severity with duplicate `CONFIG-001` — treat as High priority)
- **Feature:** `features/crypto-001-cloudfront-tls-minimum.feature`

#### Problem

The CDN viewer certificate allows TLS 1.0 / 1.1 (`MinimumProtocolVersion: TLSv1`). Those protocols are deprecated and unsafe for a public-sector admin UI edge.

#### Outcome

Viewer TLS minimum is raised to **TLSv1.2_2021** (preferred) or at least **TLSv1.2_2019**, so TLS 1.0/1.1 are not permitted. Assessment Expected is met by the template change; live handshake smoke may be residual after deploy.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Security reviewer | Confirm edge refuses deprecated TLS |
| Parks staff | Modern browsers unaffected |
| Implementer | One-line (or small) template change + evidence |

#### Scope

**In scope**

- Update CloudFront `ViewerCertificate.MinimumProtocolVersion` in `template.yaml` to `TLSv1.2_2021` (or `TLSv1.2_2019` minimum)
- Document in evidence; must change infra template (not evidence-only)
- Static verification of the template value (`@R-06.1`)

**Out of scope**

- Origin SSL protocol changes (already TLS 1.2)
- Other security headers (CONFIG-002/003/004)
- Live production deploy smoke (residual note OK)

#### Open questions

- None blocking. Prefer `TLSv1.2_2021` to match assessment recommendation.

#### Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| BA | | |
| QA (acceptance ownership) | | |

---

## Completed slices (recent)

### LOG-002 — Keycloak authentication lifecycle log levels

- **Issue:** [#66](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/66) (shipped)
- **Feature:** `features/log-002-keycloak-lifecycle-log-levels.feature`

### TEST-001 — HTTP token interceptor unit coverage

- **Issue:** [#68](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/68) (shipped)
- **Feature:** `features/test-001-token-interceptor.feature`

### LOG-003 — Log authorization failures in the route guard

- **Issue:** [#57](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/57) (shipped)
- **Feature:** `features/log-003-authz-failure-logging.feature`

### LOG-001 — Do not dump full configuration to the browser console

- **Issue:** [#56](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/56) (shipped)
- **Feature:** `features/log-001-no-config-console-dump.feature`

---

## Completed slices

### AUTHZ-001 — Admin route guard path matching

- **Issue:** [#55](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/55) (shipped)
- **Feature:** `features/authz-001-admin-route-guard.feature`
