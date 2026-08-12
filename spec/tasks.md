# Tasks — AuthGuard path matching (AUTHZ-001)

Derive from `spec.md` + `features/authz-001-admin-route-guard.feature`. Issue: #6.

## Milestone 1 — Close query-string bypass

- [ ] **TASK-001** — Change `AuthGuard` admin-route checks to compare path without query/fragment (all four protected routes) — covers scenarios *Non-admin denied with query string* and *Admin allowed with query string*
- [ ] **TASK-002** — Add/extend unit tests in `auth.guard.spec.ts` for denied + allowed cases with `?…` URLs (and at least one fragment or multi-param case)
- [ ] **TASK-003** — Run `yarn lint` and `yarn test-ci`; update `docs/pr-evidence.md` on the implementation PR
- [ ] **TASK-004** — Open **draft** PR linking #6; do not self-merge

## Backlog (follow-ups, not this PR)

- [ ] LOG-003 — Log authorization denials in the guard
- [ ] AUTHZ-002 — Review `isAllowed()` fall-through for unlisted routes
- [ ] AUTHZ-003 — Hide manage-subareas nav for non-admins
