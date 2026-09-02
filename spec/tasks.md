# Tasks — AUTH-001 (active)

- [x] Update `src/app/services/keycloak.service.ts` so Keycloak `init` uses `pkceMethod: 'S256'` (not `{}`)
- [x] Add or update unit test(s) in `src/app/services/keycloak.service.spec.ts` asserting init options include PKCE S256
- [x] Append `docs/pr-evidence.md` for AUTH-001 (do not overwrite prior slices)
- [ ] Checkpoint 3 + merge (must change `src/`; refuse evidence-only)
