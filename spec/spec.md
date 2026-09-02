# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### SECRET-003 — Route53 hosted zone ID not hardcoded

- **Issue:** [#80](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/80)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `SECRET-003`
- **Feature:** `features/secret-003-route53-zone-id.feature`

#### Problem

Route53 hosted zone ID is hardcoded in the pre-migration certificate setup script.

#### Outcome

Zone ID comes from ROUTE53_ZONE_ID env var or dynamic AWS lookup for bcparks.ca — no literal zone ID in source.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Operators / reviewers | See signed behaviour for this finding |
| Developers | Clear in/out of scope |

#### Scope

**In scope**

- pre-migration-certificate-setup.sh resolution helper
- Append evidence; must change scripts under repo

**Out of scope**

- Changing post-deploy scripts already using dynamic lookup

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

### SECRET-002 shipped — see rematch wiki
