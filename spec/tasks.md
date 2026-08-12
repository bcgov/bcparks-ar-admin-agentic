# Tasks — Auth denial logging (LOG-003)

Derive from `spec/spec.md` + `features/log-003-auth-denial-logging.feature`. Issue: [#15](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/15).

## Milestone 1 — Log AuthGuard denials (after checkpoint 2 approval)

- [ ] **TASK-001** — Inject `LoggerService` into `AuthGuard` (`src/app/guards/auth.guard.ts`) and call `warn` before each authorization-failure redirect (`isAuthorized` false → `/unauthorized`; each `isAllowed` failure → `/`) — covers both feature scenarios
- [ ] **TASK-002** — Include requested path (path-only) and denial reason in the warn message; add a stable identity hint when available without logging the raw token
- [ ] **TASK-003** — Extend `src/app/guards/auth.guard.spec.ts` so both scenarios assert `LoggerService.warn` was called with path + reason
- [ ] **TASK-004** — Run `yarn lint` and `yarn test-ci`; update `docs/pr-evidence.md` on the implementation PR
- [ ] **TASK-005** — Open **draft** PR linking #15; do not self-merge

## After checkpoint 2 merge (human)

- [ ] Add label `ready-for-agent` to #15 **or** implement locally from this task list
- [ ] Approve waiting Actions on the draft PR; review; merge (checkpoint 3)

## Completed (prior slices)

- [x] AUTHZ-001 — AuthGuard path matching (#6) — shipped
- [x] AUTH-001 — PKCE S256 on Keycloak init (#11) — shipped

## Backlog (not this slice)

- [ ] AUTH-003 — Logout
- [ ] AUTH-004 — Token refresh failure UX
- [ ] AUTH-007 — Bearer host allowlist
- [ ] LOG-001 — Config object console dump
- [ ] LOG-002 — Keycloak lifecycle log levels
- [ ] LOG-004 — LoggerService default Off
- [ ] AUTHZ-002 — Dead export-reports / review-data guards
