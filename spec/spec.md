# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### TEST-003 — E2E scaffold and smoke coverage

- **Issue:** [#81](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/81)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `TEST-003`
- **Feature:** `features/test-003-e2e-scaffold.feature`

#### Problem

No end-to-end or security-focused integration tests exist.

#### Outcome

Playwright is present with a smoke test for the app shell and documentation of planned auth-boundary tests. Full Keycloak OIDC automation is deferred.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Operators / reviewers | See signed behaviour for this finding |
| Developers | Clear in/out of scope |

#### Scope

**In scope**

- @playwright/test, playwright.config, e2e smoke, docs/e2e-testing.md, yarn e2e script
- Append evidence; must change package/src/e2e paths

**Out of scope**

- Full Keycloak OIDC automation
- Making e2e a required CI gate

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

### SECRET-003 shipped — see rematch wiki
