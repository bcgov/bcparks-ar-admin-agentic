# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### SECRET-002 — Non-production AWS account IDs not hardcoded

- **Issue:** [#79](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/79)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `SECRET-002`
- **Feature:** `features/secret-002-nonprod-account-ids.feature`

#### Problem

Non-production AWS account IDs and certificate ARNs are hardcoded across CI/CD workflows, scripts, and templates.

#### Outcome

Dev/test deploys read DomainCertificateArn from vars; SAM template has no committed ARN default; setup scripts require account/profile via env vars.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Operators / reviewers | See signed behaviour for this finding |
| Developers | Clear in/out of scope |

#### Scope

**In scope**

- lza-deploy-admin-dev/test workflows
- template.yaml DomainCertificateArn Default removal
- Setup/migration scripts env-var requirements
- Append evidence; must change `.github/workflows/` and/or scripts

**Out of scope**

- Provisioning GitHub environment vars (operator)
- SECRET-004 ApiGatewayId

#### Open questions

- None blocking.

#### Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| BA | | |
| QA (acceptance ownership) | | |

---

## Completed slices (recent)

### LOG-007 … prior rematch slices shipped
