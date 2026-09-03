# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### SECRET-004 — remove hardcoded API Gateway ID

- **Issue:** [#97](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/97)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `SECRET-004`
- **Feature:** `features/secret-004-api-gateway-id.feature`

#### Problem

Development API Gateway instance ID hardcoded in template.yaml Default and vars.json.

#### Outcome

No Default for ApiGatewayId; value supplied at deploy via CI vars only.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Operators / reviewers | See signed behaviour for this finding |
| Developers | Clear in/out of scope |

#### Scope

**In scope**

- Implement assessment Expected for this finding
- Unit tests as appropriate
- Append evidence; must change src/ or workflows/

**Out of scope**

- Unrelated findings

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

- Prior rematch slices 1–30 shipped — see wiki
