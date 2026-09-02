# Plan — AuthGuard authorization failure logging (LOG-003)

> Architecture and delivery for issue #57 / RA LOG-003.

## Summary

Emit **warn**-level authorization-failure logs from `AuthGuard` when an authenticated user is denied (not authorized for the app, or missing a capability for an admin route). Do **not** log tokens, full config, or secrets. Extend unit tests for `@R-03.1`–`@R-03.4`. Append evidence for LOG-003.

## Architecture

```text
AuthGuard.canActivate
  → denial path (unauthorized / capability)
  → LoggerService.warn (or equivalent) with route path + reason code
  → redirect as today
```

Prefer existing `LoggerService` if present; otherwise a minimal structured warn that does not dump Keycloak objects.

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Log level | warn | Assessment / security-relevant without error noise for expected denials |
| Payload | path + denial reason (e.g. `not-authorized`, `capability:lock-records`) | Auditable; no tokens |
| Scope | AuthGuard only | Matches finding; header/nav logging out of scope |
| Evidence | `--append --finding LOG-003` | Preserve prior receipts |

## Test approach

- Spies on logger in `auth.guard.spec.ts`
- CI lint/test
- Must change `src/`

## Tasks

1. Inject/use logger on AuthGuard denial paths
2. Unit tests `@R-03.1`–`@R-03.4`
3. Append `docs/pr-evidence.md` for LOG-003
4. Checkpoint 3 + merge

## Approval (checkpoint 2)

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
