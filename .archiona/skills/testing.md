---
name: testing
when: writing or modifying test files, or when the plan's Test plan section needs concrete cases
priority: high
---

# Testing

Source of truth. Do not improvise test strategies. Follow these rules exactly.

## What to test

- The behavior named in the plan's Test plan section. Nothing else.
- One test per observable behavior. If you find yourself testing internals, the design is wrong — go back to the plan.

## Structure

- Arrange, Act, Assert. One of each per test.
- No shared mutable state between tests.
- Each test creates its own inputs and expected outputs.

## Mocking

- Mock at the boundary (network, filesystem, clock). Never mock the unit under test.
- Use the project's existing test runner and assertion library. Match neighboring tests.
- No "mock everything" patterns.

## Coverage

- Cover the happy path and the named failure paths from the plan.
- Do not chase 100% line coverage. Cover behaviors.

## Naming

- Test files mirror the source: `foo.ts` → `foo.test.ts`.
- Test names describe behavior, not implementation.