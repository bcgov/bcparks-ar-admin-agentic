# Plan — CONFIG-006 deployment pipeline log levels

> Checkpoint 2 for issue [#73](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/73).

## Approach

Replace hardcoded `window.__env.logLevel = 0` in all three LZA deploy workflows with environment-appropriate values from `LogLevel` enum:

| Pipeline | Environment | New logLevel | Enum name |
| --- | --- | --- | --- |
| `lza-deploy-admin-prod.yaml` | lza-prod | 4 | Error |
| `lza-deploy-admin-test.yaml` | lza-test | 3 | Warn |
| `lza-deploy-admin-dev.yaml` | lza-dev | 2 | Info |

Add inline YAML comments referencing `LogLevel` enum in `logger.service.ts` for maintainers.

## Out of scope

- Runtime log level switching (requires redeploy)
- Removing LoggerService console output entirely
- SIEM integration
- Changing local `src/env.js` (optional residual)

## Risks

- Operators debugging prod issues lose debug-level console output (intentional; use lower envs)
- LOG-001 already prevents config dump at logLevel 0; this removes the All level trigger in deploys

## Verification

- Grep deploy workflows for `logLevel = 0` → zero matches
- Static assert prod/test/dev values match @R-16.1 and @R-16.2
- Append `docs/pr-evidence.md` (must touch `.github/workflows/`)
