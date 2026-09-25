# Archiona

## What this is

Archiona is a pre-coding gate. Before an AI agent writes any code, it must
read the workflow, follow the skills, and produce a plan that you approve.

## Daily loop

1. `archiona plan --slug <slug> --title "<title>"`
2. Fill every section in `.archiona/plans/<slug>.md`
3. Tick `- [x] **Approved**`
4. Agent reads the matching skill in `.archiona/skills/` and implements
5. `archiona validate` before merging

## Skills

Skills under `.archiona/skills/` are the source of truth for how the agent
writes code. Edit them to enforce your project's conventions. The agent
must read the matching skill before writing code in that area.

## Commands

```bash
archiona plan --slug <s> --title "<t>"   # scaffold a plan
archiona validate                         # check plan
archiona hook [--only <a,b,...>]          # wire coding agents
archiona doctor                           # check agent coverage
archiona update [--dry-run]               # refresh seeded files after upgrading
```

## Containment

Archiona works only inside this project. Every Archiona artifact (plans,
skills, agent instruction files) is written under this repo root — never to
a home dir, global config, or another project. Run commands from any
subdirectory: the CLI anchors to this repo by finding `.archiona/`.

## Upgrading

When you upgrade the archiona package, run `archiona update` to refresh
`.archiona/workflow.md`, `workflow.config.json`, `README.md`, and
`skills/` from the installed templates. Your plans, archive, and docs are
never touched. Then run `archiona hook` to regenerate agent instruction files.
