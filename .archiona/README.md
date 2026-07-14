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
```

## Version

Workflow version: 4.0.0
