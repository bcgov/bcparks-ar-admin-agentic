# Plan — User-initiated logout (AUTH-003)

> Issue [#70](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/70) / RA AUTH-003. Checkpoint 2.

## Summary

Add `KeycloakService.logout()` calling `keycloakAuth.logout({ redirectUri })` with app origin/base. Wire header “Log out” when authenticated. Update AuthGuard “we don’t have a logout” comment. Unit tests for service (+ header). Must change `src/`.

## Architecture

```text
Header "Log out" -> KeycloakService.logout()
  -> keycloakAuth.logout({ redirectUri: <origin/base> })
AuthGuard comments updated
```

## Tasks

1. Implement KeycloakService.logout + tests
2. Header Log out control + tests as practical
3. Update AuthGuard comment
4. Append evidence; CP3 merge

## Approval (checkpoint 2)

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
