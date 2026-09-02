# Plan — No config console dump (LOG-001)

> Architecture and delivery approach for issue #56 / RA LOG-001.

## Summary

Remove the `console.log` of the full configuration object from `ConfigService` initialization. Add/adjust unit coverage so the dump cannot regress unnoticed. No hosting or Design System changes.

## Architecture

```text
App init → ConfigService.init()
         → load env / optional remote config
         → (was) console.log(configuration)  → remove
         → consumers read config via service API
```

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Fix location | `src/app/services/config.service.ts` | Assessment points here |
| Replacement logging | None for this slice (or LoggerService only if already used without dumping full object) | Avoid gold-plating; other LOG findings cover structured logging |
| Verification | Unit test asserting `console.log` not called with configuration (spy) | Matches `@R-02.1` |
| Evidence | Append AUTHZ-safe: use `--append --finding LOG-001` on `docs/pr-evidence.md` | Pack requires append-only |

## Security & privacy

- Classification: Internal staff UI
- Reduces casual exposure of endpoints/config in DevTools
- No new data flows

## Test approach

- Extend `config.service.spec.ts` (or equivalent)
- CI: PR Checks lint/test
- Append `docs/pr-evidence.md` for LOG-001

## Tasks

1. Remove configuration console dump from config init
2. Unit test for `@R-02.1`
3. Append evidence for LOG-001 (do not overwrite AUTHZ-001)
4. Confirm `src/` changed (not evidence-only)

## Approval (checkpoint 2)

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
| Security (if required) | Low-risk removal of console dump — proceed when TL signs | |
