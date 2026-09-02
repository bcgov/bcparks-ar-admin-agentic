# Plan — Token claims from Keycloak session (AUTH-002)

> Architecture and delivery for issue [#69](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/69) / RA AUTH-002.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Introduce a KeycloakService helper (e.g. `getTokenClaims()`) that returns `keycloakAuth.tokenParsed` for real sessions. Route `isAuthorized`, `isAdmin`, `getWelcomeMessage`, `getIdpFromToken`, and any other KeycloakService JwtUtil.decodeToken call sites for authz/identity through that helper. Unit tests assert tokenParsed is used and JwtUtil.decodeToken is not invoked on the real-auth path. Must change `src/`.

## Architecture

```text
KeycloakService.getTokenClaims()
  -> keycloakAuth.tokenParsed
isAuthorized / isAdmin / getWelcomeMessage / getIdpFromToken / …
  -> getTokenClaims()   // was JwtUtil.decodeToken(getToken())
```

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Source of truth | Keycloak `tokenParsed` | Library-verified with session |
| JwtUtil | Leave utility; stop using on real-auth claim path | Matches assessment intent |
| Tests | Unit spies | No live IdP |

## Tasks

1. Add getTokenClaims (or equivalent); rewire KeycloakService claim consumers
2. Unit tests for claim source on real-auth path
3. Append evidence
4. Checkpoint 3 + merge (must change `src/`)

## Approval (checkpoint 2)

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
