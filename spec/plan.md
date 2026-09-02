# Plan — LOG-007 browser-console logging limitation

> Checkpoint 2 for issue [#78](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/78).

## Approach

1. Add `docs/logging-architecture.md` documenting console-only output and no SIEM yet.
2. Document forward path: optional `window.__env.LOG_SHIPPING_ENDPOINT` — not implemented.
3. Add exported constants + JSDoc on LoggerService referencing the doc (required `src/` touch for rematch gate).
4. Append evidence.

## Out of scope

- HTTP log shipping, CloudWatch RUM, backend audit API

## Verification

- Doc asserts console-only + forward-path keyword (@R-20.1/@R-20.2)
- Must change `src/` (not evidence/docs-only)
