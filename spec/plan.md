# Plan — PKCE on Keycloak init (AUTH-001)

> Architecture and delivery approach for issue [#11](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/11) / RA AUTH-001.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

For **real** Keycloak sessions, pass `pkceMethod: 'S256'` into `keycloak-js` `init(...)` instead of `init({})`. Leave **local mock auth** on the early-return path (no Keycloak adapter init). Prove via unit/service tests that the real-auth init options include PKCE S256. No hosting, Design System, or realm admin changes in this slice.

## Architecture

```text
App bootstrap
  → ConfigService (ENVIRONMENT, KEYCLOAK_*)
  → KeycloakService.init()
       ├─ if local mock auth → fake JWT session (unchanged)
       └─ else if KEYCLOAK_ENABLED → keycloakAuth.init({ pkceMethod: 'S256' })
            → OIDC authorize + token with PKCE
```

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| PKCE method | `S256` only | OAuth 2.0 Security BCP; supported by keycloak-js v25 |
| Where to set it | Options object on `init(...)` in `KeycloakService` | Matches finding location; minimal blast radius |
| Local mock auth | Unchanged early return | Stand-up without IdP roles must keep working |
| IdP / realm changes | None in-repo; document residual risk if login fails | Client already public OIDC; PKCE is usually client-side |
| UI / hosting | No change | Constitution J6 |
| Verification | Extend `keycloak.service.spec.ts` (or equivalent) | CI without live loginproxy |

## Security & privacy

- Classification: Internal staff UI
- PIA: No new data collection
- Secrets: None
- Residual risk: If the Keycloak client were misconfigured to reject PKCE, real login could fail until platform adjusts the client — mitigate by smoke-testing IDIR against `dev.loginproxy` after merge (human), and by keeping mock auth for local UI work

## Test approach

- Cover `features/auth-001-pkce.feature` scenarios in unit tests:
  - Real path: init called with options including PKCE S256 (spy/mock Keycloak constructor/adapter)
  - Mock path: adapter `init` not used for PKCE when local mock auth is active
- CI: `yarn lint` + `yarn test-ci` on the implementation PR
- Update `docs/pr-evidence.md` on the implementation PR

## Rollout

- Ship with next admin UI deploy
- No data migration
- Optional human smoke: real IDIR login on a lower environment after deploy

## Approval (checkpoint 2) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
| Security (if required) | | |

> Do not add `ready-for-agent` to #11 until this table is filled and this plan PR is merged.
