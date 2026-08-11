# Operate Tier 2

Human playbook for **day-to-day use** of the Tier 2 pattern after enrol.  
For first-time setup see [ENROL.md](ENROL.md). Backends & coding agent: [AGENTIC.md](AGENTIC.md). Local IDE agents: [LOCAL.md](LOCAL.md).

**What Tier 2 is:** spec-driven delivery — constitution + Spec Kit in git, human checkpoints, PR gates, optional Copilot assign, optional MCP for local agents.  
**What it is not:** a replacement for Tier 1 intake automation. Prefer running **with Tier 1** (`enrol --with-tier1`).

---

## Who does what

| Role | Responsibilities |
| --- | --- |
| **Product / tech lead** | Owns constitution placeholders → real standards; signs checkpoint 1–2; merges (checkpoint 3) |
| **Developers** | Write `spec/` and features; implement from signed work; draft PRs only until gate is green |
| **Local coding agent users** | Follow `AGENTS.md` + MCP; never self-merge |
| **Repo maintainers** | `tier2.config.json`, secrets (`COPILOT_ASSIGN_TOKEN`, LLM), branch protection, MCP paths |
| **Platform** | Pack updates, org Copilot coding-agent policy, APIM/runner access for Actions LLM |

---

## The story of a change

```text
Constitution (living standards)
        ↓
Spec + features  ──►  Checkpoint 1 (human: did we agree what to build?)
        ↓
Plan             ──►  Checkpoint 2 (human: is the plan sound?)
        ↓
Implement (local agent or Copilot cloud) ──► draft PR
        ↓
Checkpoint gate + spec review (CI)
        ↓
Human merge      ──►  Checkpoint 3 (does the PR match what we said?)
```

Agents may draft; **humans** accept intent, plan, and ship.

---

## Artifacts you keep current

| Path | Role |
| --- | --- |
| `constitution.md` (and/or `.specify/memory/constitution.md`) | Non-negotiables: security, a11y, logging, stack |
| `spec/spec.md` | Technology-light “what” |
| `spec/features/*.feature` | Acceptance scenarios |
| `spec/plan.md` | Approach for the slice |
| `spec/tasks.md` | Implementable breakdown |
| `docs/pr-evidence.md` | Evidence pack for reviews (when required) |
| `AGENTS.md` | Entryfile for coding agents |
| `tier2.config.json` | Gates, review mode, coding-agent assign |

Fill `{{PLACEHOLDER}}`s before treating the repo as production-ready.

---

## Human checkpoints (operate these deliberately)

| # | When | Owner asks | Exit |
| --- | --- | --- | --- |
| **1 — Spec** | Before implementation of a slice | Is the behaviour clear and testable? | Spec + features agreed (PR or recorded review) |
| **2 — Plan** | Before coding the slice | Is the approach safe and sized? | `spec/plan.md` agreed |
| **3 — Ship** | Before merge to the default branch | Does this PR match spec/plan and clear gates? | Human merge only |

Do not turn off the checkpoint gate to “make CI green.” Fix the artifacts or the PR scope.

---

## Two ways to implement

### A. Local coding agent (default day-to-day)

1. Clone the **service** repo (not the pattern monorepo) as the agent workspace.
2. Wire MCP from `.github/mcp/mcp.json.example` — see [LOCAL.md](LOCAL.md).
3. Prompt against a signed issue / `spec/tasks.md` row; require a **draft** PR.
4. Let checkpoint gate + spec review run on GitHub; you merge.

No `COPILOT_ASSIGN_TOKEN` required for this path.

### B. Copilot cloud coding agent

1. Issue uses the Feature template (spec ref + acceptance).
2. Add label **`ready-for-agent`** (configurable).
3. Workflow assigns Copilot → Copilot opens a **draft** PR.
4. Gate + review run; **you** merge.

Needs: coding agent enabled on the repo + secret **`COPILOT_ASSIGN_TOKEN`** (user PAT — `GITHUB_TOKEN` cannot assign). Details: [AGENTIC.md](AGENTIC.md).

You can use A and B on different issues; both must respect the same checkpoints.

---

## What CI enforces

| Workflow | Purpose |
| --- | --- |
| **Tier 2 / Preflight** | Manual sanity (scripts, config) |
| **Checkpoint gate** | PR fails if required constitution/spec/plan/features are missing for the paths touched |
| **Spec review** | Heuristic and/or LLM / gh-aw comment on implementation PRs |
| **Assign coding agent** | Label → Copilot (if enabled) |

If Tier 1 is enrolled, triage / docs drift / CI diagnose continue as in the [Tier 1 operate](../tier1/OPERATE.md) playbook — separate config file (`tier1.config.json`).

---

## Config you’ll actually touch

Root file: **`tier2.config.json`**.

| Knob | Typical use |
| --- | --- |
| `checkpoints.*` | What the gate requires; `impl_path_prefixes` must match your code layout |
| `checkpoints.strict_placeholders` | Tighten when scaffolds are filled |
| `spec_review.mode` | `heuristic` · `auto` · `llm` · `gh-aw` |
| `spec_review.require_evidence` / `evidence_path` | Expect `docs/pr-evidence.md` updates |
| `coding_agent.auto_assign` | `false` = label is human signal only |
| `coding_agent.assign_label` | Default `ready-for-agent` |
| `agent.llm.*` | Actions LLM for spec review (same secret family as Tier 1: `TIER1_LLM_*`) |

`include_tier1: true` documents intent; enrol still needs `--with-tier1`.

### Review backends — stay on one writer

Same rule as Tier 1: don’t let Actions LLM **and** gh-aw both comment on every PR. Set `spec_review.mode` to match the backend you want. Tier 1’s `agent.mode` is independent — you may use gh-aw for triage and heuristic for spec review, or align them for simplicity.

---

## Normal weekly rhythm

1. **Preflight** after pack or config changes (Tier 2 and Tier 1 if present).
2. **Constitution PR** when standards change — treat it as architecture review, not a drive-by edit.
3. **One vertical slice** at a time: spec → plan → implement → draft PR → merge.
4. **Label hygiene** — only `ready-for-agent` when the slice is ready for a cloud agent (acceptance clear, checkpoints 1–2 done).
5. **Read gate failures** — missing feature file or plan usually means the PR is ahead of the paper trail; fix artifacts, don’t bypass.
6. **Evidence** — keep `docs/pr-evidence.md` honest when `require_evidence` is on.

---

## First-week checklist (after enrol)

- [ ] Actions: workflow permissions **Read and write**
- [ ] **Tier 2 / Preflight** green (and Tier 1 preflight if enrolled)
- [ ] Replace constitution / spec placeholders for a thin pilot slice
- [ ] Open a constitution or spec PR and practice checkpoint 1
- [ ] Wire local MCP **or** set `COPILOT_ASSIGN_TOKEN` + confirm `copilot-swe-agent` is available
- [ ] Land one **draft** implementation PR; confirm checkpoint gate + spec review run
- [ ] Human merges (checkpoint 3) — confirm branch protection doesn’t allow bot self-merge

---

## Troubleshooting

| Symptom | Likely cause | What to try |
| --- | --- | --- |
| Checkpoint gate fails on every PR | Placeholders / missing `spec/` files / wrong `impl_path_prefixes` | Fill scaffold; align prefixes with real paths; see gate logs |
| Spec review silent | `spec_review.enabled: false` or mode/skip mismatch | Check config; ensure PR touches `spec_review.paths` |
| Double review comments | Actions + gh-aw both writing | One `spec_review.mode` |
| `ready-for-agent` no draft PR | Coding agent off, bad PAT, or assign workflow failed | `suggestedActors` / secret / workflow log — see AGENTIC.md |
| Local agent ignores DS / constitution | MCP not wired or wrong absolute paths | [LOCAL.md](LOCAL.md); rebuild MCP `dist/` |
| LLM review 403 | APIM private network vs GitHub-hosted runners | Use heuristic/gh-aw for review, or private runners — wiki pattern-packs status |
| Tier 1 quiet after Tier 2 enrol | Forgot `--with-tier1` | Re-run enrol with the flag (keeps existing configs) |

Org blockers (APIM, Copilot): pattern monorepo `wiki/synthesis/bcgov-pattern-packs.md`, or ask platform.

---

## Updating the pack

```bash
./patterns/tier2/enrol.sh /path/to/your-service --with-tier1 [--with-gh-aw]
```

Overwrites Tier 2 workflows/scripts; preserves existing `tier2.config.json`, `tier1.config.json`, and filled `spec/` / constitution when already present. Diff carefully. Re-compile gh-aw locks after editing `.md` sources.

---

## Related docs

| Doc | Use when |
| --- | --- |
| [ENROL.md](ENROL.md) | First install |
| [AGENTIC.md](AGENTIC.md) | Modes, Copilot assign, Azure/APIM, gh-aw |
| [LOCAL.md](LOCAL.md) | IDE / local agent loop |
| Tier 1 operate | Intake automation — `.github/tier1/OPERATE.md` if enrolled with Tier 1 |
