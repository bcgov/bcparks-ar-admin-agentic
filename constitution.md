# Constitution — BC Parks Attendance & Revenue (Admin)

> Constitution for the **A&R Admin** Angular front end (`bcparks-ar-admin` / pilot fork `bcparks-ar-admin-agentic`).
> Amend via pull request. Platform articles stay; brownfield exceptions are called out under **Project articles** (do not silently delete platform text).

**Ministry / program:** Ministry of Environment and Parks (ENV) — Parks and Recreation Program  
**Service:** Attendance and Revenue (A&R) — Admin UI  
**Product URLs:** https://attendance-revenue.bcparks.ca/ (and env-specific hosts such as `dev-ar.bcparks.ca`)  
**Data classification:** Internal staff application (Keycloak-gated). Treat operational attendance/revenue figures and operator identity as sensitive to the program; do not send them to unapproved public model endpoints. `COMPLIANCE.yaml` records PIA and STRA as **completed** (2022-12-01) — confirm current status with the product owner before expanding data use.  
**Deploy target:** Amazon Web Services (static admin UI via SAM / CloudFront / LZA). **Exception to P4** — see J6.  
**Companion API:** https://github.com/bcgov/bcparks-ar-api (not this repo)  
**Last reviewed:** 2026-08-11

---

## Platform articles (do not remove)

### P1 — Accessibility

All user-facing interfaces SHALL meet **WCAG 2.1 Level AA**. Accessibility is a legal duty for public-facing services, not a tier opt-in. Prefer components and patterns that encode accessible behaviour. Do not ship colour-only status, unlabeled icon buttons, or missing form labels.

### P2 — Design system

For **new greenfield** BC Gov services, UI SHOULD use `@bcgov/design-system-react-components` and `@bcgov/design-tokens`, and agents SHOULD query the BC Design System MCP before generating UI.

**This repository (brownfield):** UI SHALL follow the existing **BC Parks / Digital Space** Angular stack already in use — primarily `@digitalspace/bcparks-bootstrap-theme`, `@digitalspace/ngds-forms`, `@digitalspace/ngds-toolkit`, Bootstrap 5 / ng-bootstrap / ngx-bootstrap — and match patterns already present under `src/app/` and `src/assets/`. Do **not** introduce a parallel React Design System or hard-coded one-off brand colours. A migration to the provincial React Design System requires an explicit ADR and product approval (see J6).

### P3 — Privacy

No personal information MAY enter a system, log, model prompt, or third-party AI API until a **Privacy Impact Assessment (PIA)** appropriate to the classification is complete and recorded. Prefer synthetic or anonymized fixtures in lower environments. Do not commit secrets, tokens, or live park operator credentials.

### P4 — Deploy target

Production and primary lower environments for **new greenfield** services SHALL target **OpenShift** on the BC Gov Private Cloud PaaS unless an ADR explicitly documents an exception.

**This repository (brownfield):** production and lower environments are on **AWS** (see `template.yaml`, `samconfig.toml`, LZA deploy workflows). Agents MUST NOT “migrate” hosting to OpenShift as drive-by work. Changes to hosting require an ADR and platform/product approval (see J6).

### P5 — Spec as source of truth

Intent lives in versioned git under `spec/` (`spec.md`, `plan.md`, `tasks.md`, `features/*.feature`, this constitution). Chat is not the system of record. FOI-relevant decisions MUST be reconstructable from git artifacts.

### P6 — Human checkpoints

Humans own: (1) spec sign-off, (2) plan/architecture approval, (3) review & ship. Agents MUST NOT self-merge. Agent branches only; Actions on agent PRs require human approval where org policy requires it.

### P7 — Test integrity

Default: acceptance criteria owned under human review. The same agent session SHOULD NOT both author production code and solely author the only acceptance proof for high-risk behaviour without human QA sign-off. Prefer extending existing Karma/Jasmine unit tests (`yarn test` / `yarn test-ci`) for UI behaviour changes.

### P8 — Approved tools

Agents MAY only use approved MCP servers and model routes for this classification. Sensitive workloads MUST NOT send source or operational data to public model endpoints outside policy. Local coding agents: see `.github/mcp/mcp.json.example` and `.github/tier2/LOCAL.md`.

---

## Project articles (customize)

### J1 — Service purpose

**Attendance & Revenue (A&R) Admin** is the staff-facing front end that lets Park Operators, BC Parks staff, and related BC Government users enter, review, lock, and export park **attendance and revenue** statistics. Those figures inform budgeting and maintenance decisions. This repository is **UI only**; persistence and business APIs live in `bcparks-ar-api`.

### J2 — In scope / out of scope

- **In (this repo):**
  - Angular admin SPA (routes such as Enter Data, Export Reports, Lock Records, Variance Search, Manage Subareas)
  - Activity forms: Frontcountry Camping/Cabins, Day Use, Group Camping, Boating, Backcountry Camping/Cabins
  - AuthN/Z integration via Keycloak (`keycloak-js` / `keycloak-angular`) against the configured realm/client
  - Front-end build, lint, unit tests, and static asset deploy config for the admin UI
- **Out (this repo):**
  - Implementing or deploying `bcparks-ar-api`, DynamoDB schemas, or backend business rules
  - Changing Keycloak realm/client configuration in `loginproxy.gov.bc.ca` (except documenting required `env.js` values)
  - Public anonymous visitor websites (this app is authenticated staff tooling)
  - Drive-by hosting migrations or replacing the Parks theme with an unrelated design system

### J3 — Forbidden patterns

- Calling AWS, DynamoDB, or databases directly from the Angular UI — all data access goes through `bcparks-ar-api` (via `ApiService` / configured `API_LOCATION`)
- Bypassing `AuthGuard` / Keycloak for protected routes, or hard-coding tokens in source
- Committing secrets, `.env` files with real credentials, or production `env.js` values
- Storing or logging passwords, full session tokens, or unnecessary personal identifiers in the browser console or analytics
- Inventing new activity types, fiscal-year rules, or variance thresholds without product/API alignment (canonical lists live in `Constants` and the API)
- Disabling Tier 1 / Tier 2 workflows “to make CI green”
- Adding a second parallel UI framework (e.g. React) inside this Angular app

### J4 — Domain language

| Term | Meaning |
| --- | --- |
| A&R | Attendance and Revenue product |
| Admin UI | This Angular application (`bcparks-ar-admin`) |
| Park Operator | Staff user who submits attendance/revenue for parks they operate |
| Subarea | Subdivision of a park used when entering activity data |
| Activity type | One of: Frontcountry Camping, Frontcountry Cabins, Day Use, Group Camping, Boating, Backcountry Camping, Backcountry Cabins |
| Fiscal year | Reporting year ending in March (`FiscalYearFinalMonth = 3`); timezone `America/Vancouver` |
| Variance | Deviation from expected values (thresholds in `Constants.varianceConfig`); surfaced in Variance Search and form warnings |
| Lock records | Admin capability to lock fiscal-year data against further edits |
| Export reports | Admin capability to export attendance/revenue (and related) datasets |
| Keycloak client | `attendance-and-revenue` in realm `bcparks-service-transformation` |
| sysadmin | Application role (`Constants.ApplicationRoles.ADMIN`) used for elevated capabilities |

### J5 — Non-functional baselines

- **Users / access:** Authenticated staff via Keycloak (IDIR / BCeID / related IdPs as configured for the realm). Unauthorized users see login / not-authorized flows.
- **Quality gate (dev):** `yarn lint` and `yarn test-ci` (ChromeHeadless) SHALL pass on PRs that change application code (existing **PR Checks** workflow).
- **Security scanning:** Do not weaken CodeQL / Analysis / Trivy ignore policy without an explicit security rationale in the PR.
- **Runtime config:** Environment-specific API and Keycloak settings live in `src/env.js` (local) or remote config when `configEndpoint` is enabled — not hard-coded in components.
- **Performance:** Prefer incremental form/list UX already used (resolvers, polling for exports); avoid unbounded client-side loads of export datasets.
- **Retention / records:** Server-side retention is owned by the API and program policy — the UI MUST NOT invent client-only “delete forever” behaviour for locked fiscal data.

### J6 — Architecture exceptions (brownfield)

| Platform article | Exception | Status |
| --- | --- | --- |
| P2 Design system | Parks Digital Space Angular theme (`@digitalspace/*`) instead of provincial React Design System | Accepted until product schedules a migration ADR |
| P4 Deploy target | AWS (CloudFront / S3 / SAM / LZA) instead of OpenShift PaaS | Accepted; hosting changes need ADR + platform approval |

### J7 — Agent / local development notes

- Full interactive UI needs Keycloak (`dev.loginproxy.gov.bc.ca` or equivalent) and a running `bcparks-ar-api` (default `http://localhost:3000`). Prefer stories that can be verified with **lint/unit tests** when those dependencies are unavailable.
- `KEYCLOAK_ENABLED=false` in `env.js` is a local escape hatch only — do not ship that to shared environments.
- Contribute per BC Parks collaboration guide: https://bcgov.github.io/bcparks/collaborate

---

## Amendment

Changes to platform articles require platform / architecture guild agreement (or an explicit ADR recorded in-repo).  
Changes to project articles require the project's usual PR review (checkpoint 2 reviewers for material architecture impact).
