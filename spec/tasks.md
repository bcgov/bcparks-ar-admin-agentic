# Tasks — AUTH-002 (active)

- [ ] Add `getTokenClaims()` (or equivalent) on `KeycloakService` returning `keycloakAuth.tokenParsed` for real sessions
- [ ] Rewire `isAuthorized`, `isAdmin`, `getWelcomeMessage`, `getIdpFromToken`, and other KeycloakService authz/identity helpers to use it (not `JwtUtil.decodeToken` on the real-auth path)
- [ ] Add/update unit tests asserting tokenParsed is used and JwtUtil.decodeToken is not used on that path
- [ ] Append `docs/pr-evidence.md` for AUTH-002 (do not overwrite prior slices)
- [ ] Checkpoint 3 + merge (must change `src/`; refuse evidence-only)
