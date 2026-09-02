# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### CONFIG-006 — Deployment pipeline log levels

- **Issue:** [#73](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/73)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `CONFIG-006`
- **Feature:** `features/config-006-deploy-log-level.feature`

#### Problem

All three LZA deployment pipelines hardcode `logLevel = 0` (LogLevel.All) in the generated `env.js` artifact. That enables every debug log—and historically the full configuration dump when logLevel is All—in every deployed environment including production.

#### Outcome

Each deploy pipeline writes an environment-appropriate log level into generated `env.js`: production is restrictive (Warn or stricter), test is intermediate, and dev may be more verbose than production. No pipeline leaves logLevel at All (0).

#### Users & personas

| Persona | Goal |
| --- | --- |
| Operators | Prod consoles are not flooded with debug output |
| Security reviewers | Deployed log levels match environment risk |
| Developers | Dev retains useful verbosity |

#### Scope

**In scope**

- Change `logLevel` in `.github/workflows/lza-deploy-admin-{prod,test,dev}.yaml` generated env.js blocks
- Document LogLevel enum mapping in workflow comments
- Append evidence; must change `.github/workflows/`

**Out of scope**

- Runtime log-level switching without redeploy
- Removing browser-console logging entirely (LOG-007)
- Changing local `src/env.js` beyond optional alignment (local residual OK if documented)

#### Open questions

- None blocking — enum mapping follows LoggerService (Error=4, Warn=3, Info=2).

#### Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| BA | | |
| QA (acceptance ownership) | | |

---

## Completed slices (recent)

### CONFIG-005 — Enable automatic Trivy security scan triggers

- **Issue:** [#72](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/72) (shipped)
- **Feature:** `features/config-005-trivy-triggers.feature`

### AUTHZ-002 — Enforce admin-only export-reports and review-data

- **Issue:** [#71](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/71) (shipped)
- **Feature:** `features/authz-002-admin-only-routes.feature`

### AUTH-003 / AUTH-002 / SECRET-001 / …

- Shipped — see rematch wiki
