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

## Next / in flight
1. ~~Fill `constitution.md`~~ (done — PR #5)
2. First rapid-assessment story: **AUTHZ-001** — issue [#6](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/6)
3. Spec slice on branch / PR for checkpoint 1–2, then `ready-for-agent` for Copilot draft PR
4. Checkpoint gate + heuristic spec review on the implementation PR
