# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### SECRET-001 — Production certificate ARN not hardcoded in CI

- **Issue:** [#67](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/67)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `SECRET-001`
- **Feature:** `features/secret-001-prod-certificate-arn.feature`

#### Problem

The production deploy workflow embeds a full ACM certificate ARN (including the production AWS account ID) in the repository. That enables infrastructure enumeration and related attacks. The ARN must not be a committed literal.

#### Outcome

The LZA production deploy workflow supplies **DomainCertificateArn** from a GitHub Actions environment variable (`vars.DOMAIN_CERTIFICATE_ARN`), not a literal ACM ARN in the workflow file. Evidence must not reprint the secret ARN value.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Security reviewer | Confirm no literal ACM ARN / account id in workflow |
| Platform operator | Set `DOMAIN_CERTIFICATE_ARN` on the prod GitHub Environment before next deploy |
| Implementer | Workflow-only change + evidence |

#### Scope

**In scope**

- Replace hardcoded `DomainCertificateArn=...` in `.github/workflows/lza-deploy-admin-prod.yaml` with `${{ vars.DOMAIN_CERTIFICATE_ARN }}`
- Evidence append; must change `.github/workflows/` (refuse evidence-only)
- Document that the GitHub Environment variable must exist before the next prod deploy (ops residual, not a scope narrowing of the code fix)

**Out of scope**

- Non-prod workflows / other hardcoded account identifiers (separate SECRET-* findings)
- Actually setting the GitHub Environment variable in this PR (human/ops; call out residual)
- Printing the ARN in evidence

#### Open questions

- **Environment name:** Confirm the workflow’s GitHub Environment (e.g. `lza-prod`) is where `DOMAIN_CERTIFICATE_ARN` will be set — note in evidence if the workflow already uses an environment block.

#### Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| BA | | |
| QA (acceptance ownership) | | |

---

## Completed slices (recent)

### AUTH-001 — PKCE (S256) on Keycloak OIDC init

- **Issue:** [#62](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/62) (shipped)
- **Feature:** `features/auth-001-pkce.feature`

### CONFIG-002 / CONFIG-004 / CONFIG-003 / CRYPTO-001 / LOG-* / TEST-001 / AUTHZ-001

- Shipped — see rematch wiki
