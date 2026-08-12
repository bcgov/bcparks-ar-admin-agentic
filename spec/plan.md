# Plan — Auth denial logging (LOG-003)

> Architecture and delivery approach for issue [#15](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/15) / RA LOG-003.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Inject `LoggerService` into `AuthGuard` and emit `warn` **before** each authorization-failure redirect (`/unauthorized` or home `/` for admin-only routes). Log payload includes requested path, denial reason, and a stable identity hint when available. Prove via unit tests with a `LoggerService` spy. No server-side audit API, no route-policy changes, no UI.

## Architecture

```text
Router navigation
  → AuthGuard.canActivate(route, state)
       ├─ not authenticated → login / IdP (unchanged; not this slice)
       ├─ not authorized → logger.warn(...) → /unauthorized
       ├─ admin-only denied → logger.warn(...) → /
       └─ allowed → true
```

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Where to log | `AuthGuard` at each authz-failure redirect | Matches finding location; minimal blast radius |
| Log level | `LoggerService.warn` | Visible above typical info/debug; matches signed spec |
| Identity hint | Prefer existing Keycloak helpers (e.g. username/preferred_username/sub if already exposed); never log raw JWT or full config | Privacy; constitution-friendly |
| Path in log | Use same path-only form as AUTHZ-001 (`requestPath`) | Consistent with guard matching |
| Server audit | Out of scope | Explicit CP1 acceptance for pilot |
| Log-level residual | Environments with `LogLevel.Off` still won’t print (LOG-004) | Document; do not fix LOG-004 here |
| Verification | Extend `auth.guard.spec.ts` | CI without live IdP |

## Security & privacy

- Classification: Internal staff UI
- PIA: No new data collection; only session-derived identity hints already available to the guard
- Secrets: None
- Residual risk: Client-console logs are not a durable SIEM; acceptable for this pilot per CP1

## Test approach

- Cover `features/log-003-auth-denial-logging.feature`:
  - Unauthorized → `warn` called with path + reason; redirect to `/unauthorized`
  - Admin-only denial (e.g. lock-records) → `warn` called with path + reason; redirect to `/`
- CI: `yarn lint` + `yarn test-ci` on the implementation PR
- Update `docs/pr-evidence.md` on the implementation PR

## Rollout

- Ship with next admin UI deploy
- No data migration
- Optional human smoke: trigger an unauthorized or non-admin admin-route hit locally / lower env and confirm warn appears when log level allows

## Approval (checkpoint 2) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
| Security (if required) | | |

> Do not add `ready-for-agent` to #15 until this table is filled and this plan PR is merged.
