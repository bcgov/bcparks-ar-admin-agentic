# Tasks — AUTHZ-002 (active)

- [ ] Add `export-reports` and `review-data` to `adminOnlyRoutes` in `KeycloakService.isAllowed()`
- [ ] Unit tests: non-admin denied / admin allowed for both capabilities
- [ ] Unit tests: AuthGuard redirects non-admin from `/export-reports` and `/review-data`
- [ ] Append `docs/pr-evidence.md` for AUTHZ-002
- [ ] Checkpoint 3 + merge (must change `src/`; refuse evidence-only)
