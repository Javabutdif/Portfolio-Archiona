---
title: Archiona Workflow
type: orchestrator
version: 5.6.0
status: active
project_type: fullstack
---

# Archiona Workflow (v5.6.0 — Persona-Gated + Project Containment + Senior Discipline + Implemented Gate + Obsidian Vault)

This is the rule every coding agent must follow before writing code.

## Project containment (hard rule)

Archiona is embedded in this project and works **only inside this repo**.

- Every Archiona artifact — plans, skills, agent instruction files — is written
  under the repo root: `.archiona/` for workflow data, `.cursor/`, `.github/`,
  `AGENTS.md`, etc. for agent hooks. Nothing Archiona-owned goes to the home
  dir or global config.
- **The Obsidian vault is the sole exception.** The vault (configured via
  `vaultPath` in `.archiona/workflow.config.json`, default `d:\personal`) is
  a dedicated knowledge source that Archiona reads **before** the repo and
  updates **after** each phase. Vault writes are the only out-of-repo writes
  Archiona makes. Project notes live under `<vaultPath>/<projectSlug>/` where
  `projectSlug` is set in `workflow.config.json` (e.g. `kinora`). Global
  Archiona notes live under `<vaultPath>/archiona/`.
- Plan **Files** entries are repo-relative paths. No absolute paths, no `~`,
  no `..` that resolves outside the repo root. `archiona validate` rejects
  files that escape the repo.
- Run Archiona commands from any subdirectory of the repo. The CLI anchors to
  the repo root by walking up to the nearest `.archiona/` — writes always land
  in this project, never in the working directory by accident.
- **Invoking the CLI.** Prefer `archiona <command>`; if the command is not
  found in the shell, run `npx archiona <command>` — it loads the same
  installed package and resolves to this repo's `.archiona/` the same way.
  Never look up Archiona rules outside this repo because a command failed.
- If a task needs to touch a file outside this repo, stop and ask. It is out
  of scope for this project's Archiona.

## Persona System

Every change flows through persona-gated phases. The agent auto-switches personas
based on the current workflow step. Read `currentPersona` from the plan frontmatter
before starting any work.

### Persona Taxonomy

| Phase    | Persona      | Skill Location                                  |
| -------- | ------------ | ----------------------------------------------- |
| Init     | `pm`         | `.archiona/skills/personas/pm/SKILL.md`         |
| Evidence | `researcher` | `.archiona/skills/personas/researcher/SKILL.md` |
| Design   | `architect`  | `.archiona/skills/personas/architect/SKILL.md`  |
| Tests    | `tester`     | `.archiona/skills/personas/tester/SKILL.md`     |
| Security | `security`   | `.archiona/skills/personas/security/SKILL.md`   |
| Build    | `developer`  | `.archiona/skills/personas/developer/SKILL.md`  |
| Frontend | `frontend`   | `.archiona/skills/personas/frontend/SKILL.md`   |
| Backend  | `backend`    | `.archiona/skills/personas/backend/SKILL.md`    |
| Database | `database`   | `.archiona/skills/personas/database/SKILL.md`   |
| DevOps   | `devops`     | `.archiona/skills/personas/devops/SKILL.md`     |
| Review   | `reviewer`   | `.archiona/skills/personas/reviewer/SKILL.md`   |
| QA       | `qa`         | `.archiona/skills/personas/qa/SKILL.md`         |
| Safety   | `safety`     | `.archiona/skills/personas/safety/SKILL.md`     |
| Skills   | `skills`     | `.archiona/skills/personas/skills/SKILL.md`     |
| Analysis | `analyst`    | `.archiona/skills/personas/analyst/SKILL.md`    |
| Senior   | `senior`     | `.archiona/skills/personas/senior/SKILL.md`     |

`senior` is a discipline layer, not a phase: it runs on top of every other
persona. Read it before acting as any persona and before producing any output
a human engineer would sign off on.

## Senior discipline (applies to every persona)

From `.archiona/skills/personas/senior/SKILL.md`:

- No AI-shaped code. Match the style of the existing project; read the
  nearest files before writing. No boilerplate, no invented abstractions.
- Evidence before claims. Cite the file, config, skill rule, or command
  output behind every claim. No source, no claim.
- Cross-check every deliverable against the plan, the domain skills, and the
  existing files before handoff.
- Execute the Test plan with real output. Recording is not execution.
- Silence in a skill + no existing answer = stop and ask, not guess.

## Phase 1: Init (pm)

1. Read this file (`workflow.md`).
2. Find or create a plan: `archiona plan --slug <slug> --title "<title>" [--goal "..."]`.
3. If `--goal` was provided, the Goal section is pre-filled. Otherwise, write it.
4. Decompose goal into Persona Tasks. Each task: single responsibility, ≤15 min.
5. Set `currentPersona: pm` in plan frontmatter.

## Phase 2: Evidence (researcher)

1. Switch persona: `archiona persona <slug> --set researcher`.
2. **Read the Obsidian vault first — always, automatically, without asking.**
   Read `vaultPath` and `projectSlug` from `.archiona/workflow.config.json`.
   Open `<vaultPath>/<projectSlug>/` and read every `.md` file in that
   folder. Also read the global notes under `<vaultPath>/archiona/`.
   The vault is the project's prior knowledge. Summarize what the vault
   already knows about this project, its conventions, and past decisions.
   **Only after this**, read the repo files the change will touch. Do not
   skip this step — even when the vault folder is empty, confirm it was
   checked. This rule overrides "no notes vault" containment: the vault is
   the one sanctioned out-of-repo destination.
3. Read all files the change will touch. Read relevant config and existing skills.
4. Fill Evidence section: cite vault notes **and** repo files. Vault
   references use the form `<vaultPath>/<projectSlug>/<note>.md`.
5. Analyst reviews: flag risks, edge cases.
6. Switch to `architect`.

## Phase 3: Design (architect)

1. Switch persona: `archiona persona <slug> --set architect`.
2. Design file structure, module boundaries, data flow.
3. Fill Files section with concrete paths.
4. Fill Dependencies section.
5. Architect signs off.

## Phase 4: Tests (tester)

1. Switch persona: `archiona persona <slug> --set tester`.
2. Write Test plan: specific commands, expected outcomes, happy + failure paths.
3. Security reviews: auth paths, injection vectors, secret exposure.
4. If security flags issues, return to Phase 3.

## Phase 5: Approve (human)

1. Reviewer (human) checks Evidence, Files, Test plan, Rollback.
2. Tick `- [x] **Approved**`.
3. Set `currentPersona: developer`.

## Phase 6: Build (developer)

1. Read `currentPersona` from plan.
2. Read matching domain skill (`frontend`, `backend`, `database`, etc.) AND the `developer` persona skill.
3. Implement ONLY files in plan's Files section.
4. Mark each Persona Task as completed in the plan.
5. **Update the Obsidian vault — always, automatically, without asking.**
   Write or update a note under `<vaultPath>/<projectSlug>/` describing
   the change, files touched, decisions made, and any new conventions
   introduced. Use the note filename `<plan-slug>.md`. This is the only
   out-of-repo write Archiona makes. Do not skip this step — the next plan
   depends on it.
6. Developer self-checks against plan.

## Phase 7: Validate (qa)

1. Switch persona: `archiona persona <slug> --set qa`.
2. Run `archiona validate`.
3. Fix every error.
4. QA executes Test plan manually or via automation.
5. Report defects if any; return to Phase 6.

## Phase 8: Review (reviewer)

1. Switch persona: `archiona persona <slug> --set reviewer`.
2. Verify contract adherence.
3. Verify rollback instructions are valid.
4. Sign off.

## Phase 9: Implemented gate (operator)

After Phase 8 passes, the operator ticks the final gate:

- [ ] **Implemented**

1. Confirm every Persona Task is `- [x]`.
2. Confirm `archiona validate` returns 0 with all persona tasks complete.
3. Confirm the Obsidian vault note for this plan exists under
   `<vaultPath>/<projectSlug>/` and reflects the final state.
4. Tick `- [x] **Implemented**` in the plan file.
5. Run `archiona validate` one final time — it must pass with
   `plan-implemented` no longer reported.
6. Only then is the change ready for merge.

## Why skills

Skills under `.archiona/skills/` exist so you do not generate code based on your
own defaults. Each persona has its own skill, plus domain skills (typescript,
api-design, frontend-design, etc.). The persona skill tells you the workflow
phase; the domain skill tells you the coding conventions.

## Rules

- No code without an approved plan including an Evidence section.
- No file changes outside the plan's file list.
- No new dependencies not listed under Dependencies.
- **All Archiona writes stay inside this repo — except the Obsidian vault.**
  Plans, skills, and agent instruction files live under the repo root. The
  vault (at `vaultPath`) is the only out-of-repo destination: agents read
  it in Phase 2 and write/update the project note in Phase 6.
- **Plan Files are repo-relative.** No absolute paths, no `~`, no `..` that
  escapes the repo root. `archiona validate` enforces this. Vault notes are
  cited in Evidence with their absolute vault path — they are read-only
  references, not plan Files entries.
- **Evidence must cite the vault.** When a vault is configured and exists,
  the Evidence section must reference which vault notes were read. A plan
  with no vault reference fails the senior cross-check when vault notes
  exist for this project.
- Read the persona skill before starting a phase. Read the domain skill before writing code.
- Test plan must describe how to verify the change.
- Rollback must describe how to undo the change.
- Evidence section must document reading affected files, config, and patterns.
- All Persona Tasks must be marked completed before validation passes.
- **The Implemented gate is the final sign-off.** After every persona task
  is `- [x]` and `archiona validate` returns 0, tick `- [x] **Implemented**`
  in the plan. Until that box is checked, the plan is incomplete and
  `archiona validate` rejects it with a `plan-implemented` error. The
  Implemented checkbox is the operator's confirmation that the work has been
  carried out as planned — no merge without it.
- **Never read or log contents of `.env`, `.env.*`, `.pem`, `.key`, `~/.ssh/*`, or any secret-bearing file.** Reference paths only, never values.
- **No deliverable without the senior cross-check** (evidence cited, plan +
  domain skills + existing files reconciled, test plan executed with real
  output). See `skills/personas/senior/SKILL.md`.
- Use `archiona validate --slug <s>` to target a specific plan. Without `--slug`, validates the most recently created plan (by `created` timestamp).

## When the workflow and the user conflict

The workflow wins. Escalate by editing this file or the matching skill, not by
ignoring them.
