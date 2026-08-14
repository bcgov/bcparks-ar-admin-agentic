# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice — SECRET-001 (prod certificate input)

**Issue:** [#46](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/46)  
**Finding:** RA SECRET-001  
**Feature:** `features/secret-001-prod-certificate-arn.feature`

### Problem

The production deploy workflow embeds a full ACM certificate identifier (including the production cloud account) in the repository. Anyone who can read the repo can enumerate that account.

### Outcome

The production deploy step reads the certificate identifier from a production environment input (`DOMAIN_CERTIFICATE_ARN`) instead of a literal in the workflow file. Non-production workflows are unchanged. The value itself is not copied into specs, evidence, or review comments.

**Delivery pause:** do not merge the workflow change until a human has created the `lza-prod` GitHub Environment and set `vars.DOMAIN_CERTIFICATE_ARN`. Merging first would break production deploys.

### Users & personas

| Persona | Goal |
| --- | --- |
| Platform operator | Prod deploy still receives a valid certificate identifier |
| Security reviewer | Confirm the workflow no longer contains a literal ACM ARN |
| Release manager | Know the environment variable must exist before the change ships |

### Scope

#### In scope (#46)

- Replace the hardcoded `DomainCertificateArn` on the LZA prod deploy workflow with `${{ vars.DOMAIN_CERTIFICATE_ARN }}`
- Static proof that the prod workflow no longer contains a literal `arn:aws:acm:` on that parameter
- Document the `lza-prod` environment prerequisite

#### Out of scope

- Dev/test hardcoded ARNs (SECRET-002)
- Creating the GitHub Environment or writing the secret/variable (human / org admin)
- Rotating the certificate
- Putting the ARN in comments, evidence, or this spec

### Journeys

1. Prod workflow uses environment input — see `features/secret-001-prod-certificate-arn.feature`

### Non-functional requirements

- No application code change
- Evidence must not reprint the ARN

### Traceability

| Finding | Issue | Feature |
| --- | --- | --- |
| RA SECRET-001 | #46 | `features/secret-001-prod-certificate-arn.feature` |

### Sign-off (checkpoint 1) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| Tech lead | | |
| QA | | |

> Do not add `ready-for-agent` to #46 until this spec PR is merged. Do not merge the implementation PR until `lza-prod` / `DOMAIN_CERTIFICATE_ARN` exists.

---

## Completed slices

### CONFIG-002 — Content-Security-Policy

- **Issue:** [#41](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/41) (shipped)
- **Feature:** `features/config-002-cloudfront-csp.feature`

### CONFIG-004 — Browser security headers

- **Issue:** [#36](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/36) (shipped)
- **Feature:** `features/config-004-cloudfront-security-headers.feature`

### CONFIG-003 — CloudFront HSTS

- **Issue:** [#32](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/32) (shipped)
- **Feature:** `features/config-003-cloudfront-hsts.feature`

### CRYPTO-001 — Viewer TLS 1.2+ — [#27](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/27)
### LOG-002 — Keycloak lifecycle levels — [#23](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/23)
### LOG-003 — Auth denial logging — [#15](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/15)
### LOG-001 — No config dump — [#19](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/19)
### AUTH-001 — PKCE — [#11](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/11)
### AUTHZ-001 — Admin route guard — [#6](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/6)
