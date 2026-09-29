# Archiona

## What this is

Archiona is a pre-coding gate. Before an AI agent writes any code, it must
read the workflow, follow the skills, and produce a plan that you approve.

## Daily loop

1. `archiona plan --slug <slug> --title "<title>"`
2. Fill every section in `.archiona/plans/<slug>.md`
3. Tick `- [x] **Approved**`
4. Agent reads the matching skill in `.archiona/skills/` and implements
5. After all persona tasks are complete and `archiona validate` returns 0,
   tick `- [x] **Implemented**` in the plan
6. `archiona validate` one final time — it must pass with the
   Implemented gate ticked before merging

## Skills

Skills under `.archiona/skills/` are the source of truth for how the agent
writes code. Edit them to enforce your project's conventions. The agent
must read the matching skill before writing code in that area.

## Commands

```bash
archiona plan --slug <s> --title "<t>"   # scaffold a plan
archiona validate                         # check plan (includes Implemented gate)
archiona hook [--only <a,b,...>]          # wire coding agents
archiona doctor                           # check agent coverage
archiona update [--dry-run]               # refresh seeded files after upgrading

# If `archiona` is not in your PATH, use `npx archiona <command>` instead.
```

## Invoking the CLI

Prefer `archiona <command>`; if the command is not found, run
`npx archiona <command>` — it loads the same installed package and
resolves to this repo's `.archiona/` the same way. Never look up
Archiona rules outside this repo because a command failed.

## Containment

Archiona works only inside this project. Every Archiona artifact (plans,
skills, agent instruction files) is written under this repo root — never to
a home dir, global config, or another project. The one exception is the
Obsidian vault: the agent reads it in Phase 2 and updates the project note
in Phase 6. Set `vaultPath` and `projectSlug` in `workflow.config.json` to
configure which vault folder this project uses.

## Obsidian Vault (v5.6.0)

The vault (default `d:\personal`) is the project's knowledge source.
Before reading the repo, the agent reads `<vaultPath>/<projectSlug>/` and
`<vaultPath>/archiona/`. After implementing, it updates
`<vaultPath>/<projectSlug>/<plan-slug>.md`.

Configure in `.archiona/workflow.config.json`:

- `vaultPath` — absolute path to the Obsidian vault root (default `d:\personal`)
- `projectSlug` — folder name inside the vault for this project (e.g. `kinora`)
- `vaultEnabled` — set `false` to disable without removing the folder.

## Upgrading

When you upgrade the archiona package, run `archiona update` to refresh
`.archiona/workflow.md`, `workflow.config.json`, `README.md`, and
`skills/` from the installed templates. Your plans, archive, and docs are
never touched. Then run `archiona hook` to regenerate agent instruction files.
