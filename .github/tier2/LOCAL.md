# Local agent — Tier 2

GitHub Actions / cloud coding agents are optional. The same enrolled repo is meant to be driven from a **local coding agent** (IDE or CLI) against `AGENTS.md` + MCP + `spec/`.

## Mental model

| Path | Who implements |
| --- | --- |
| Label `ready-for-agent` | Cloud coding agent (e.g. Copilot) → draft PR |
| **Local agent** | You + local coding agent in a clone → you open the PR |

Both must respect constitution, `spec/`, and human merge (checkpoint 3). Local work does **not** need `COPILOT_ASSIGN_TOKEN`.

## 1. Open the enrolled repo as the workspace

```bash
gh repo clone OWNER/your-service
cd your-service
# Open this folder as the workspace root for your coding agent
```

Root **`AGENTS.md`** is the instruction entryfile for agents working in the repo.

## 2. Wire MCP (Design System + SDLC)

Pack ships `.github/mcp/mcp.json.example`. Point your agent’s MCP configuration at those servers (tool-specific location varies — project or user MCP settings).

```bash
# Example: copy into a project MCP config your agent reads
cp .github/mcp/mcp.json.example ./mcp.json   # or your tool’s project path
# Edit absolute paths to your ai-sdlc clone
```

Example MCP server entries:

```json
{
  "mcpServers": {
    "bc-design-system": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/to/ai-sdlc/bc-design-system-mcp/dist/index.js"]
    },
    "bcgov-sdlc": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/to/ai-sdlc/bcgov-agentic-glue/sdlc-mcp/dist/index.js"]
    }
  }
}
```

Build MCPs once if needed:

```bash
cd /path/to/ai-sdlc/bc-design-system-mcp && npm ci && npm run build
cd /path/to/ai-sdlc/bcgov-agentic-glue/sdlc-mcp && npm ci && npm run build
```

Reload MCP in your agent. Confirm tools like `get_component`, `get_guidelines`, and constitution lint are available.

**Optional:** GitHub MCP with a PAT for issue/PR context from the agent session.

## 3. Optional project agent rules

Add a short always-on rule / skill in whatever format your agent supports, for example:

```markdown
Follow AGENTS.md. Implement only from signed spec/features and tasks.
Query bc-design-system MCP before UI. Do not merge; open a draft PR.
Update docs/pr-evidence.md on implementation changes.
```

## 4. Typical local task loop

1. **Pick work** — GitHub issue or a row in `spec/tasks.md` with a feature file reference.
2. **Confirm checkpoints** — Spec/plan signed enough for the slice (or you’re only editing `spec/` for checkpoint 1).
3. **Prompt the agent**, e.g.:

   > Implement issue #N / TASK-00X per `spec/features/….feature`.
   > Follow AGENTS.md and constitution. Query Design System MCP for any UI.
   > Open a draft PR; update `docs/pr-evidence.md`. Do not merge.

4. **Review locally** — run app/tests; skim diff vs acceptance criteria.
5. **Push branch + draft PR** — Tier 2 checkpoint gate + spec review run on GitHub.
6. **Human merges** (checkpoint 3).

## 5. Models: local agent vs Actions

Your local agent’s model selection is separate from repo `TIER1_LLM_*` secrets (those are for **GitHub Actions** scripts only).

- Local sessions: use whatever models your org allows in the agent product.
- Actions triage/spec-review LLM: keep `TIER1_LLM_*` on the repo (APIM may require private network — see wiki `synthesis/bcgov-pattern-packs`).

## 6. Pattern repo vs service repo

| Workspace | Use |
| --- | --- |
| `ai-sdlc` | Improve packs, wiki, MCP servers |
| Enrolled service | Implement product work under Spec Kit |

Open the **service** as the workspace when completing feature tasks.

## Quick verify

- [ ] `AGENTS.md` has Tier 2 section  
- [ ] MCP servers connected in the local agent  
- [ ] Agent can call `get_component` / SDLC lint  
- [ ] Agent change lands in a **draft** PR; Actions gate runs  
