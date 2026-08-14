# Tasks — No full config console dump (LOG-001)

Derive from `spec/spec.md` + `features/log-001-no-config-console-dump.feature`. Issue: [#19](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/19).

## Milestone 1 — Stop config dump (after checkpoint 2 approval)

- [ ] **TASK-001** — Remove the `console.log('Configuration:', this.configuration)` block in `ConfigService.init()` (`src/app/services/config.service.ts`) — covers both feature scenarios
- [ ] **TASK-002** — Extend `src/app/services/config.service.spec.ts`: spy `console.log`; assert no full-config dump when `logLevel === 0` and when logLevel is not All
- [ ] **TASK-003** — Run `yarn lint` and `yarn test-ci`; update `docs/pr-evidence.md` on the implementation PR
- [ ] **TASK-004** — Open **draft** PR linking #19; do not self-merge

## After checkpoint 2 merge (human)

- [ ] Add label `ready-for-agent` to #19 **or** implement locally from this task list
- [ ] Approve waiting Actions on the draft PR; review; merge (checkpoint 3)

## Completed (prior slices)

- [x] AUTHZ-001 — AuthGuard path matching (#6) — shipped
- [x] AUTH-001 — PKCE S256 on Keycloak init (#11) — shipped

## In flight (not this slice)

- [ ] LOG-003 — AuthGuard denial logging (#15 / PR #18)

## Backlog (not this slice)

- [ ] LOG-002 — Keycloak lifecycle log levels
- [ ] LOG-004 — LoggerService default Off
- [ ] AUTH-003 — Logout
