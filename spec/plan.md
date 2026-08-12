# Plan — AuthGuard path matching (AUTHZ-001)

> Architecture and delivery approach for issue #6 / RA AUTHZ-001.

## Summary

Harden `AuthGuard` so admin-route permission checks use the **path** portion of the requested URL (ignore query string and fragment). Extend existing Karma/Jasmine tests. No dependency or hosting changes. No Design System / OpenShift migration.

## Architecture

```text
Browser → AuthGuard.canActivate(route, state)
        → KeycloakService.isAllowed(capability)
        → allow component | redirect to "/" or "/unauthorized" | login flow

API authorization remains in bcparks-ar-api (out of scope).
```

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Match strategy | Compare path only (strip `?` / `#` from `state.url`), or equivalent Router URL-tree path | Fixes exact-string bypass; minimal diff |
| Scope of routes | Same four admin checks already in the guard | Matches finding; avoids unrelated AUTHZ-002 redesign |
| UI stack | Existing Angular + Parks theme | Constitution J6 |
| Hosting | Unchanged AWS | Constitution J6 |
| Verification | Unit tests in `auth.guard.spec.ts` | Pilot preference: no Keycloak/API required |

## Security & privacy

- Classification: Internal staff UI
- PIA: No new data flows
- Secrets: None
- Residual risk: Client-side guards are bypassable by a determined user who calls the API directly — API must continue to enforce roles

## Test approach

- Extend `src/app/guards/auth.guard.spec.ts`
- Scenarios from `spec/features/authz-001-admin-route-guard.feature`
- CI: existing **PR Checks** (`yarn lint` / `yarn test-ci`)
- Update `docs/pr-evidence.md` on the implementation PR

## Rollout

- Environments: ship with next admin UI deploy (no special cutover)
- Migration: n/a

## Approval (checkpoint 2)

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | Pilot — proceed for agentic demo | 2026-08-12 |
| Security (if required) | Finding is High; fix is local path match — proceed | 2026-08-12 |
