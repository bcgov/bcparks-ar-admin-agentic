# Agentic SDLC pilot notes (bcparks-ar-admin-agentic)

## Scope for first Tier 2 story
Prefer a **non-runtime** change that does not need Keycloak or `bcparks-ar-api`:

- docs / AGENTS.md / constitution fill-in
- lint or unit-test-only fixes
- harness/config improvements

## Proven Tier 1 (2026-08-11)
- Preflight green
- Issue triage on thin bug issue → `bug` + `needs-detail`
- Demo fail CI → CI diagnose opened diagnosis issue

## Local stand-up (mock API + mock auth)

- Mock API: `ai-sdlc/pilots/local-dev/mock-api` → `npm start` (port **3000**)
- Admin UI: `yarn start` → http://localhost:4200/
- **Unauthorized after IDIR?** Your IDIR is valid but has no `attendance-and-revenue` client roles in Keycloak. For local UI + mock API only, open:

  http://localhost:4200/?localMockAuth=1

  That installs a fake **sysadmin** session (`ENVIRONMENT=local` only). Clear with `?localMockAuth=0`.

## Next / in flight
1. ~~Fill `constitution.md`~~ (done — PR #5)
2. First rapid-assessment story: **AUTHZ-001** — issue [#6](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/6)
3. Spec slice on branch / PR for checkpoint 1–2, then `ready-for-agent` for Copilot draft PR
4. Checkpoint gate + heuristic spec review on the implementation PR
5. Local mock auth (`?localMockAuth=1`) for stand-up without Keycloak role grants
