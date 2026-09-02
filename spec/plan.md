# Plan — Token interceptor unit coverage (TEST-001)

> Architecture and delivery for issue [#68](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/68) / RA TEST-001.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Add `src/app/shared/utils/token-interceptor.spec.ts` covering **current** `TokenInterceptor` behaviour for `@R-04.1`–`@R-04.6`. Do **not** change production interceptor logic (no 401 handling, no host allowlist, no logout-on-refresh-failure). Append evidence for TEST-001; must touch `src/`.

## Architecture

```text
token-interceptor.spec.ts
  mock KeycloakService { getToken(), refreshToken() }
  TokenInterceptor.intercept(req, next)
    addAuthHeader → Authorization: Bearer <token or ''>
    403 → refreshToken() → retry with header
    other errors → throwError (no refresh)
    concurrent 403 → wait on tokenRefreshed$ (single refresh)
```

Prefer `HttpClientTestingModule` / `HttpTestingController` (or Angular `provideHttpClient` + testing helpers) with `HTTP_INTERCEPTORS` registering `TokenInterceptor`.

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Production code | Tests only | Finding is missing coverage, not a logic bug |
| Empty token | Still `Bearer ` (empty) | Current `getToken() \|\| ''`; assert no *usable* token (`@R-04.2`) |
| 401 | Pass through | AUTH-006 follow-up |
| Host allowlist | None | AUTH-007 follow-up |
| Refresh failure | Propagate error; no logout | Current `throwError`; AUTH-003/004 residual for assessment Expected (4) |
| Evidence | `--append --finding TEST-001` | Preserve prior receipts |

## Security & privacy

- Tests must not log real tokens. Use fixtures like `test-token`.
- Residual: interceptor still attaches Bearer to every host (AUTH-007), refreshes on 403 not 401 (AUTH-006), and does not logout on refresh failure (AUTH-003/004). Record in evidence.

## Test approach

| Scenario | Assertion |
| --- | --- |
| `@R-04.1` Bearer attached | `Authorization` is `Bearer test-token` when `getToken()` returns `test-token` |
| `@R-04.2` Missing token | Header has no non-empty Bearer token value (empty suffix OK) |
| `@R-04.3` 403 success | `refreshToken` called; retry has Bearer header |
| `@R-04.4` Refresh fail | Error propagated; no logout API called |
| `@R-04.5` Non-403 | e.g. 500 or 401 → error propagated; `refreshToken` not called |
| `@R-04.6` Concurrent 403 | `refreshToken` called once |

## Tasks

1. Add `token-interceptor.spec.ts` covering `@R-04.1`–`@R-04.6`
2. Append `docs/pr-evidence.md` for TEST-001 (note Expected (2)/(4) residuals)
3. Checkpoint 3 + merge (must change `src/`)

## Approval (checkpoint 2)

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
