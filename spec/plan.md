# Plan — LOG-006 structured JSON log format

> Checkpoint 2 for issue [#77](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/77).

## Approach

Replace `entryToString()` plain-text formatter with JSON serialization containing:
`level`, `timestamp` (ISO-8601), `message`, `userId`, `sessionId`, `correlationId`, `context`, `securityEvent`.

- `warn()` and `error()` set `securityEvent: true` by default (@R-19.2)
- Identity/correlation fields null until wired to Keycloak (extensible)
- SIEM shipping out of scope

## Verification

- Unit tests parse JSON output and assert fields (@R-19.1, @R-19.2)
- Append evidence; must touch `src/`
