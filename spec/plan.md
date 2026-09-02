# Plan — Keycloak lifecycle log levels (LOG-002)

> Architecture and delivery for issue [#66](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/66) / RA LOG-002.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Raise `onAuthError`, `onAuthRefreshError`, and `onAuthLogout` in `KeycloakService` from `debug` to **warn** (or error). Include a non-secret identity hint via existing `getUserIdentity()` when available. Unit-test `@R-05.1`–`@R-05.4`. Append evidence. **Must change `src/`** (agentic-b failure mode was evidence-only).

Server-side audit endpoint remains LOG-007 residual.

## Architecture

```text
KeycloakService.init
  onAuthError / onAuthRefreshError / onAuthLogout
    → LoggerService.warn|error({ event, identity?, … })  // not debug
  onAuthSuccess / onAuthRefreshSuccess
    → may stay debug
```

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Level for errors/logout | `warn` (acceptable: `error`) | Survives non-debug deployments |
| Identity | `getUserIdentity()` fields only | No tokens |
| Success callbacks | Leave at debug | Assessment prioritised errors/logout |
| Server audit API | Out of scope | LOG-007 |
| Evidence | `--append --finding LOG-002` | Preserve prior receipts |

## Test approach

- Spy `LoggerService.warn` / `error` in `keycloak.service.spec.ts`
- Invoke callbacks after init (or extract/test callback wiring)
- Assert no raw token in logged payload
- CI lint/test

## Tasks

1. Elevate three callbacks; add identity hint; keep success at debug
2. Unit tests `@R-05.1`–`@R-05.4`
3. Append `docs/pr-evidence.md` for LOG-002 (note LOG-007 residual)
4. Checkpoint 3 + merge (must change `src/`)

## Approval (checkpoint 2)

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
