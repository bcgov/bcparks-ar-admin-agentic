# Plan — LOG-004 LoggerService default when logLevel missing

> Checkpoint 2 for issue [#75](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/75).

## Approach

1. Change `LoggerService` so the effective level falls back to `LogLevel.Warn` when `ConfigService.logLevel` is `undefined`/`null` (do not keep `Off` as the silent default).
2. Emit a one-time `console.warn` advising operators to set `logLevel` explicitly for debug.
3. Add/extend unit tests in `logger.service.spec.ts` covering @R-17.1 and @R-17.2.
4. Append `docs/pr-evidence.md`.

## Out of scope

- Deploy pipeline logLevel values (CONFIG-006 — already shipped)
- Structured JSON logs (LOG-006)
- Server-side shipping (LOG-007)

## Risks

- More console noise in misconfigured envs (intentional)
- Tests that assumed Off-when-unset need updating

## Verification

- Unit tests for missing logLevel → Warn; one-time warn message
- Append evidence; must touch `src/`
