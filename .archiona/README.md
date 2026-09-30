# Archiona

Pre-coding gate: before an AI agent writes code, it reads the vault, writes a
plan, and waits for your approval. The full rule is `.archiona/workflow.md`.

## Daily loop

1. Agent reads the Obsidian vault (`vaultPath`/`projectSlug` in
   `workflow.config.json`), then the repo files it will touch.
2. `archiona plan --slug <slug> --title "<title>"` and fill every section:
   Evidence, Problem, Files, Dependencies, Test plan, Rollback.
3. You review and tick `- [x] **Approved**`.
4. Agent reads the matching skill in `.archiona/skills/` and changes only the
   planned files.
5. Agent runs the Test plan and `archiona validate` (FAIL blocks, WARN is
   advisory), then writes `<vaultPath>/<projectSlug>/<slug>.md`.
6. Tick `- [x] **Implemented**`.

Auth, secrets, or schema changes: also read the `security` or `database`
persona under `.archiona/skills/personas/`.

## Skills

Skills under `.archiona/skills/` are the source of truth for how the agent
writes code. Edit them to enforce your project's conventions; add your own.
`archiona update` only removes skills Archiona itself retired — never yours.

## Commands

```bash
archiona plan --slug <s> --title "<t>"   # scaffold a plan
archiona validate [--slug <s>]            # check the plan
archiona hook [--only <a,b,...>]          # wire coding agents
archiona doctor                           # check agent coverage
archiona update [--dry-run]               # resync seeded files, remove retired skills
```

If `archiona` is not found, the npm global folder (`npm prefix -g`,
`%APPDATA%\npm` on Windows) is not on PATH. `npx archiona <command>` works
meanwhile, but only on a machine where Archiona is `npm link`ed — the package
is not on the npm registry.

## Containment

Plans, skills, and agent files live in this repo. The Obsidian vault is the
only out-of-repo read/write.

Configure the vault in `.archiona/workflow.config.json`:

- `vaultPath`: vault root (default `d:\personal`)
- `projectSlug`: this project's folder in the vault; empty = vault off
- `vaultEnabled`: `false` disables the vault without clearing the slug

## Upgrading

After upgrading Archiona, run `archiona update --dry-run`, then
`archiona update`, then `archiona hook`. Plans, archive, and docs are never
touched.
