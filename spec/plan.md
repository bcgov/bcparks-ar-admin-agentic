# Plan — Token interceptor unit coverage (TEST-001)

> Architecture and delivery approach for issue [#51](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/51) / RA TEST-001.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Add `src/app/shared/utils/token-interceptor.spec.ts` covering current `TokenInterceptor` behaviour. Do **not** change production interceptor logic (no 401 handling, no host allowlist, no logout-on-refresh-failure).

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

Prefer constructing `TokenInterceptor` with a mock `KeycloakService` and a fake `HttpHandler`, or Angular 19 `provideHttpClient` + `provideHttpClientTesting()` / `HttpTestingController`. Either is fine if all Gherkin scenarios are asserted.

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Production code | Tests only | Finding is missing coverage, not a logic bug |
| Empty token | Still `Bearer ` (empty) | Current `getToken() \|\| ''` |
| 401 | Pass through | AUTH-006 follow-up |
| Host allowlist | None | AUTH-007 follow-up |
| Refresh failure | Propagate error | Current `throwError`; do not add logout |
| CI | Existing `test-ci` job | No new runner |

## Security & privacy

- Tests must not log real tokens. Use fixtures like `test-token`.
- Residual: interceptor still attaches Bearer to every host (AUTH-007) and ignores 401 (AUTH-006). Record in evidence, do not fix here.

## Test approach

| Scenario | Assertion |
| --- | --- |
| Bearer attached | `Authorization` is `Bearer test-token` when `getToken()` returns `test-token` |
| Missing token | Header is `Bearer ` (empty suffix); `refreshToken` not called on success |
| Non-403 | e.g. 500 or 401 → error propagated; `refreshToken` not called |
| 403 success | `refreshToken` called; retry has Bearer header |
| Concurrent 403 | `refreshToken` called once; both retries proceed after refresh |
| Refresh fail | `refreshToken` errors; subscriber gets error; no logout API called |

Update `docs/pr-evidence.md` with test command + pass.

## Rollout

- Merge when CI Test job is green. No deploy smoke.

## Approval (checkpoint 2) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
