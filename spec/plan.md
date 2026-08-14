# Plan — Keycloak lifecycle log levels (LOG-002)

> Architecture and delivery approach for issue [#23](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/23) / RA LOG-002.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Raise `onAuthError`, `onAuthRefreshError`, and `onAuthLogout` in `KeycloakService.init()` from `loggerService.debug()` to `warn` or `error`. Optionally include `getUsername()` as an identity hint. Prove with unit tests that invoke the callbacks. No server audit API, no LOG-004, no AUTH-003 logout UI.

## Architecture

```text
KeycloakService.init()  (real path only; mock auth short-circuits)
  → new Keycloak(config)
  → callbacks:
       onAuthSuccess        → debug (unchanged)
       onAuthError          → warn/error  ← raise
       onAuthRefreshSuccess → debug (unchanged)
       onAuthRefreshError   → warn/error  ← raise
       onAuthLogout         → warn/error  ← raise
  → init({ pkceMethod: 'S256' })  (AUTH-001, unchanged)
```

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Where to change | `src/app/services/keycloak.service.ts` lifecycle callbacks | Matches finding location |
| Levels | `warn` or `error` for error + logout; success stays debug | Visible when debug is off; success noise stays quiet |
| Identity hint | `getUsername()` when non-empty | Already shipped with LOG-003; no extra PII |
| Server audit | None | Out of scope; residual risk named |
| Mock auth | Unchanged | No Keycloak init; callbacks never attach |
| Tests | Extend `keycloak.service.spec.ts`; spy LoggerService | CI without live IdP |

## Security & privacy

- Classification: Internal staff UI
- PIA: No new data collection; username already on the JWT
- Secrets: None added; do not log tokens
- Residual: Client console only; LOG-004 default Off can still silence logs if `logLevel` is unset; no server-side audit

## Test approach

- Cover `features/log-002-keycloak-lifecycle-log-levels.feature`:
  - After real `init()`, fire `onAuthError` → `warn` or `error` called
  - Fire `onAuthRefreshError` → `warn` or `error` called
  - Fire `onAuthLogout` → `warn` or `error` called
  - When username stubbed, message includes identity hint (at least for auth error)
- CI: `yarn lint` + `yarn test-ci` on the implementation PR
- Update `docs/pr-evidence.md` on the implementation PR

## Rollout

- Ship with next admin UI deploy
- Optional human smoke: real IDIR login failure / logout and confirm DevTools warn/error (not blocking CI)

## Approval (checkpoint 2) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
| Security (if required) | | |

> Do not add `ready-for-agent` to #23 until this table is filled and this plan PR is merged.
