# Agentic SDLC experiment — `bcparks-ar-admin-agentic` (v3 rematch)

**Repo:** [bcgov/bcparks-ar-admin-agentic](https://github.com/bcgov/bcparks-ar-admin-agentic)  
**Pack:** Tier 1 + **Tier 2 v3** (post–agentic-b improvements)  
**Started:** 2026-09-02  
**Comparator:** [bcgov/bcparks-ar-admin-agentic-b](https://github.com/bcgov/bcparks-ar-admin-agentic-b) (completed 45/45)

## Goal

Run the **same 45 recommended** rapid-assessment findings as `agentic-b`, end-to-end, with the **improved** pipeline from day one:

- Evidence-only impl PRs blocked
- Append-only `pr-evidence.md`
- `.github/workflows/` in impl path prefixes
- Unified review receipts
- Prefer **cloud Copilot** (`ready-for-agent`) for implementation
- Simulated human checkpoints (Cursor skills)
- Metrics at **~15** (1/3) and **~30** (2/3) shipped slices; adjust if needed and record adjustments

## Backlog

- [`bcparks-ar-admin-rapid-assessment-tickets.md`](bcparks-ar-admin-rapid-assessment-tickets.md) — all `File?=yes` → `pending` at start

## Adjustments log

| When | Slice # | Change | Why |
| --- | ---: | --- | --- |
| 2026-09-02 | 0 | Closed stale Copilot PR #50 | Pre-reset SECRET-001 draft |
| 2026-09-02 | 1–2 | Spec/plan via orchestrator; impl via Copilot | Prefer cloud for code |
| 2026-09-02 | 2 | Closed conflicted #105 backlog-links PR | Re-link later from main |
| 2026-09-02 | 5 | Plan #116 merged before `tasks.md` commit; follow-up #118 + merge conflict on #117 vs main | Orchestrator raced CI; document: land tasks in same commit as plan |
| 2026-09-02 | 7 | Closed conflicting human PR [#125](https://github.com/bcgov/bcparks-ar-admin-agentic/pull/125) (full security headers) | Out of CONFIG-003 rematch scope; prefer Copilot [#124](https://github.com/bcgov/bcparks-ar-admin-agentic/pull/124) |
| 2026-09-02 | 8 | CONFIG-004 shipped via Copilot [#128](https://github.com/bcgov/bcparks-ar-admin-agentic/pull/128) | Extended HSTS policy with XFO/nosniff/Referrer/Permissions-Policy; CSP deferred to CONFIG-002 |
| 2026-09-02 | 9 | CONFIG-002 shipped via Copilot [#131](https://github.com/bcgov/bcparks-ar-admin-agentic/pull/131) | CSP on shared CloudFront policy; style-src unsafe-inline brownfield residual |
| 2026-09-02 | 10 | AUTH-001 shipped via Copilot [#134](https://github.com/bcgov/bcparks-ar-admin-agentic/pull/134) | PKCE S256 on Keycloak init; unit coverage |
| 2026-09-02 | 11 | SECRET-001 shipped via Copilot [#137](https://github.com/bcgov/bcparks-ar-admin-agentic/pull/137) | DomainCertificateArn from vars; ops must set lza-prod var |
| 2026-09-02 | 12 | AUTH-002 shipped via Copilot [#140](https://github.com/bcgov/bcparks-ar-admin-agentic/pull/140) | tokenParsed via getTokenClaims; JwtUtil unused on real-auth path |
| 2026-09-02 | 13 | AUTH-003 shipped via Copilot [#143](https://github.com/bcgov/bcparks-ar-admin-agentic/pull/143) | Keycloak logout + header Log out |
| _(more during run)_ | | | |

## Metrics reviews

| Milestone | Target | Issue |
| --- | ---: | --- |
| 1/3 | after ~15 shipped | TBD |
| 2/3 | after ~30 shipped | TBD |
