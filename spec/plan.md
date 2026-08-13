# Plan — No full config console dump (LOG-001)

> Architecture and delivery approach for issue [#19](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/19) / RA LOG-001.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Remove the `console.log('Configuration:', this.configuration)` block in `ConfigService.init()` that fires when `logLevel === 0`. Prove with unit tests that `console.log` is not used to dump the full config object (verbose and non-verbose paths). No sanitized dump, no LOG-004, no UI.

## Architecture

```text
App bootstrap
  → ConfigService.init()
       ├─ load window.__env (± remote /config)
       ├─ previously: if logLevel === 0 → console.log(full config)  ← remove
       └─ return
```

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Where to change | `ConfigService.init()` in `src/app/services/config.service.ts` | Matches finding location |
| Replacement dump | None | CP1 accepted remove-entirely |
| Tests | Extend `config.service.spec.ts`; spy `console.log` | CI without live config endpoint |
| Remote config fetch | Unchanged | Out of scope |
| LOG-004 default Off | Unchanged | Separate finding |

## Security & privacy

- Classification: Internal staff UI
- PIA: No new data collection; we stop exposing config in DevTools
- Secrets: None added
- Residual: Other `console.log` / debug paths may still leak fragments (LOG-005 etc.)

## Test approach

- Cover `features/log-001-no-config-console-dump.feature`:
  - `logLevel === 0` after init → `console.log` not called with the full configuration dump (`'Configuration:'` / the config object)
  - non-zero / undefined logLevel → still no dump
- CI: `yarn lint` + `yarn test-ci` on the implementation PR
- Update `docs/pr-evidence.md` on the implementation PR

## Rollout

- Ship with next admin UI deploy
- No data migration
- Optional human smoke: local start with verbose logLevel, confirm DevTools has no full config dump

## Approval (checkpoint 2) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
| Security (if required) | | |

> Do not add `ready-for-agent` to #19 until this table is filled and this plan PR is merged.
