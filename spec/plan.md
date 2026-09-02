# Plan — LOG-005 sanitized error logging

> Checkpoint 2 for issue [#76](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/76).

## Approach

1. `ConfigService`: inject `Injector`; on remote config failure call `LoggerService.error()` with message string only (lazy resolve to avoid circular DI).
2. `main.ts`: replace `console.error(err)` with message-only `console.error(err?.message ?? String(err))`.
3. Update `config.service.spec.ts` for LoggerService.error spy on failure path.
4. Append `docs/pr-evidence.md`.

## Out of scope

- Structured JSON (LOG-006), global ErrorHandler (LOG-008), SIEM (LOG-007)

## Verification

- Unit tests @R-18.1; static review main.ts @R-18.2; must touch `src/`
