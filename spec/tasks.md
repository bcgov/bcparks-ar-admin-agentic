# Tasks — Keycloak lifecycle log levels (LOG-002)

Derive from `spec/spec.md` + `features/log-002-keycloak-lifecycle-log-levels.feature`. Issue: [#23](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/23).

## Milestone 1 — Raise lifecycle log levels (after checkpoint 2 approval)

- [ ] **TASK-001** — In `src/app/services/keycloak.service.ts`, change `onAuthError`, `onAuthRefreshError`, and `onAuthLogout` from `loggerService.debug(...)` to `warn` or `error`; include `getUsername()` identity hint when non-empty. Leave success callbacks at debug. Do not change mock-auth short-circuit or PKCE init.
- [ ] **TASK-002** — Extend `src/app/services/keycloak.service.spec.ts`: after real `init()`, invoke the three callbacks; spy `LoggerService.warn`/`error`; cover identity hint on auth error.
- [ ] **TASK-003** — Run `yarn lint` and `yarn test-ci`; update `docs/pr-evidence.md` on the implementation PR
- [ ] **TASK-004** — Open **draft** PR linking #23; do not self-merge

## After checkpoint 2 merge (human)

- [ ] Add label `ready-for-agent` to #23 **or** implement locally from this task list
- [ ] Approve waiting Actions on the draft PR; review; merge (checkpoint 3)

## Completed (prior slices)

- [x] AUTHZ-001 — AuthGuard path matching (#6) — shipped
- [x] AUTH-001 — PKCE S256 on Keycloak init (#11) — shipped
- [x] LOG-001 — No config console dump (#19) — shipped
- [x] LOG-003 — AuthGuard denial logging (#15) — shipped

## Backlog (not this slice)

- [ ] LOG-004 — LoggerService default Off
- [ ] AUTH-003 — Logout
