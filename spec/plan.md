# Plan — Keycloak PKCE S256 (AUTH-001)

> Architecture and delivery for issue [#62](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/62) / RA AUTH-001.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Change Keycloak adapter `init({})` to `init({ pkceMethod: 'S256' })` in `src/app/services/keycloak.service.ts`. Add unit coverage asserting init options. Must change `src/` (refuse evidence-only). Append evidence.

## Architecture

```text
KeycloakService.init()
  when KEYCLOAK_ENABLED:
    new Keycloak(config)
    keycloakAuth.init({ pkceMethod: 'S256' })  // was {}
keycloak.service.spec.ts
  asserts init called with pkceMethod S256
```

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| API | `pkceMethod: 'S256'` on init | keycloak-js v25; matches assessment |
| Tests | Unit spy on init | No live IdP in CI |
| Mock auth | Do not invent full localMockAuth | Out of AUTH-001 scope; constitution residual |
| Evidence | append AUTH-001 | Preserve receipts |

## Tasks

1. Update `keycloak.service.ts` init options to include PKCE S256
2. Add/update unit test(s) for init options
3. Append `docs/pr-evidence.md`
4. Checkpoint 3 + merge (must change `src/`)

## Approval (checkpoint 2)

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
