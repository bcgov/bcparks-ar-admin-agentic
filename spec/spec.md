# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### TEST-005 — test gate in deploy workflows

- **Issue:** [#100](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/100)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `TEST-005`
- **Feature:** `features/test-005-deploy-test-gate.feature`

#### Problem

LZA deploy workflows build and deploy without running yarn test-ci.

#### Outcome

All three lza-deploy workflows run yarn test-ci before build.

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
