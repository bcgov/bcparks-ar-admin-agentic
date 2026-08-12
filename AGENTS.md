# AGENTS.md (Tier 1)

This repository uses **Tier 1** automation from the BC Gov agentic SDLC pattern:

1. **Issue triage** — labels and asks for detail on thin issues
2. **Docs drift** — periodic check that docs keep up with code
3. **CI diagnose** — comments a diagnosis on failed workflow runs

Backend is selected by `agent.mode` in `tier1.config.json`: `heuristic` | `auto` | `llm` | `gh-aw` (see `.github/tier1/AGENTIC.md`).

## For coding agents

- Do not disable Tier 1 workflows to “make CI green.”
- Prefer updating `docs/` in the same PR when you change public APIs under `src/`.
- Write issue bodies with: problem, expected, actual, steps — triage bots flag thin descriptions.
- Configuration: `tier1.config.json` at repo root.

## Upgrade path

Tier 2 adds Spec Kit, constitution, Design System MCP, and human checkpoints. See the platform `bcgov-agentic-glue` bundles when you are ready.

## Tier 2 — Spec-driven delivery

This repository is enrolled in **Tier 2** of the BC Gov agentic SDLC pattern.

### Before implementing

1. Confirm work is in `spec/tasks.md` and traced to `spec/features/*.feature` (or an explicit spec section).
2. Read root [`constitution.md`](constitution.md) — this is an **Angular** admin UI on **AWS** using the **BC Parks / Digital Space** theme (`@digitalspace/*`), not a greenfield React + OpenShift app.
3. Match existing `src/app/` patterns; do not introduce a parallel UI stack. Prefer Design System MCP guidance only when it does not conflict with J2/J6 in the constitution.
4. Do not invent scope outside the signed `spec/spec.md`. Backend behaviour belongs in `bcparks-ar-api`.

### Checkpoints (humans)

1. Spec sign-off  
2. Plan / architecture approval  
3. Review & ship (no agent self-merge)

### Evidence

Update `docs/pr-evidence.md` on implementation PRs (`node .github/tier2/packs/pr-evidence/generate.mjs`).

### Labels

- `ready-for-agent` — triggers **Tier 2 / Assign coding agent** (Copilot draft PR), when `COPILOT_ASSIGN_TOKEN` is set
