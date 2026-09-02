# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### CONFIG-005 — Enable automatic Trivy security scan triggers

- **Issue:** [#72](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/72)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `CONFIG-005`
- **Feature:** `features/config-005-trivy-triggers.feature`

#### Problem

The Analysis workflow’s Trivy scan has push, pull_request, and schedule triggers commented out — only manual `workflow_dispatch` remains. PR checks run lint/unit tests without a security scan gate, so code can reach main and production without automated Trivy coverage.

#### Outcome

The Analysis workflow runs Trivy automatically on **push to main**, on **pull_request** events, and on a **weekly schedule**, in addition to manual dispatch. The Trivy job still scans vulnerabilities, secrets, and config. Verification is by inspecting workflow YAML (and observing the job on PRs).

#### Users & personas

| Persona | Goal |
| --- | --- |
| Security reviewer | Automatic Trivy gate exists |
| Developers | See scan results on PRs |
| Operators | Weekly scheduled coverage |

#### Scope

**In scope**

- Enable push / pull_request / schedule triggers in `.github/workflows/analysis.yaml`
- Evidence append; must change `.github/workflows/`

**Out of scope**

- Changing Trivy severity thresholds or scanners (unless required to enable triggers)
- Adding Trivy into `on-pr.yaml` as a duplicate if Analysis already runs on pull_request
- Making Trivy a required status check in branch protection (org residual)

#### Open questions

- **Timeout:** Existing 1-minute timeout may be tight once triggers fire more often — document residual if scans time out; do not disable the job.

#### Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| BA | | |
| QA (acceptance ownership) | | |

---

## Completed slices (recent)

### AUTHZ-002 — Enforce admin-only export-reports and review-data

- **Issue:** [#71](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/71) (shipped)
- **Feature:** `features/authz-002-admin-only-routes.feature`

### AUTH-003 / AUTH-002 / SECRET-001 / …

- Shipped — see rematch wiki
