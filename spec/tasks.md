# Tasks — PKCE on Keycloak init (AUTH-001)

Derive from `spec/spec.md` + `features/auth-001-pkce.feature`. Issue: [#11](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/11).

## Milestone 1 — Enable PKCE (after checkpoint 2 approval)

- [ ] **TASK-001** — Change real Keycloak `init({})` to include `pkceMethod: 'S256'` in `KeycloakService` — covers scenario *Real Keycloak init enables PKCE S256*
- [ ] **TASK-002** — Add/extend unit tests proving init options include PKCE S256 on the real-auth path, and that local mock auth does not require Keycloak PKCE init — covers both feature scenarios
- [ ] **TASK-003** — Run `yarn lint` and `yarn test-ci`; update `docs/pr-evidence.md` on the implementation PR
- [ ] **TASK-004** — Open **draft** PR linking #11; do not self-merge

## After checkpoint 2 merge (human)

- [ ] Add label `ready-for-agent` to #11 **or** implement locally from this task list
- [ ] Approve waiting Actions on the draft PR; review; merge (checkpoint 3)

## Completed (prior slice)

- [x] AUTHZ-001 — AuthGuard path matching (#6) — shipped

## Backlog (not this slice)

- [ ] AUTH-003 — Logout
- [ ] AUTH-004 — Token refresh failure UX
- [ ] AUTH-007 — Bearer host allowlist
- [ ] LOG-003 — Log authorization denials
