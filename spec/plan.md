# Plan — AuthGuard path matching (AUTHZ-001)

> Architecture and delivery approach for issue #55 / RA AUTHZ-001.

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
| Verification | Unit tests in `auth.guard.spec.ts` | No Keycloak/API required for CI proof |

## Security & privacy

- Classification: Internal staff UI
- PIA: No new data flows
- Secrets: None
- Residual risk: Client-side guards are bypassable by a determined user who calls the API directly — API must continue to enforce roles

## Test approach

- Extend `src/app/guards/auth.guard.spec.ts`
- Scenarios from `spec/features/authz-001-admin-route-guard.feature` (`@R-01.1`–`@R-01.5`)
- CI: existing **PR Checks** (`yarn lint` / `yarn test-ci`)
- Append finding block to `docs/pr-evidence.md` on the implementation PR (do not overwrite prior findings)

## Rollout

- Environments: ship with next admin UI deploy (no special cutover)
- Migration: n/a

## Tasks

1. Add path helper (or inline strip) used by all admin `isAllowed` URL checks in `auth.guard.ts`
2. Add/extend unit tests covering query-string bypass and admin allow-with-query
3. Generate/append `docs/pr-evidence.md` for AUTHZ-001 with Review receipt
4. Confirm PR touches `src/` (not evidence-only)

## Approval (checkpoint 2)

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
| Security (if required) | Finding is High; fix is local path match — proceed when TL signs | |
