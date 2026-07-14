---
name: typescript
when: writing or modifying any .ts or .tsx file
priority: high
---

# TypeScript

Source of truth. Do not invent patterns. Follow these rules exactly.

## Strict types

- No `any`. Use `unknown` and narrow with type guards.
- No `as` casts except at boundaries (parsing JSON, reading external input).
- All function parameters and return types explicit unless the signature is trivial (one-liner, single expression).

## Errors

- Throw `Error` subclasses with a clear message. Never throw strings.
- Catch only when you can recover or add context. Let everything else bubble.

## Imports

- Use the project's import style (ESM or CommonJS). Match neighboring files.
- No barrel re-exports unless the project already uses them.
- Sort imports: external, then internal, then relative.

## Naming

- Types and interfaces: `PascalCase`. Functions and variables: `camelCase`.
- Constants at module scope: `SCREAMING_SNAKE_CASE` only when truly constant (env-derived config, magic numbers with meaning).
- Files: `kebab-case.ts` unless the project uses another convention.

## Tests

- One assertion per test where reasonable.
- Name tests after behavior: `it("rejects empty input")`, not `it("works")`.
- Mock at the boundary, not deep in the call stack.