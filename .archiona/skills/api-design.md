---
name: api-design
when: the plan's Files section lists API routes, request/response types, or shared contracts
priority: high
---

# API Design

Source of truth. Do not invent endpoint shapes or status codes. Follow these rules exactly.

## Routes

- Resource-oriented: `/users`, `/users/:id`, `/users/:id/posts`. No verbs in paths.
- Plural nouns. No singular resource names unless the API explicitly has one of each.
- Nested routes only when the child cannot exist without the parent.

## Request and response

- JSON only. No XML, no form-encoded bodies unless the project uses them.
- Snake_case for JSON fields. Camel case is a common mistake — match the existing project.
- Always return a consistent error envelope: `{ "error": { "code": "...", "message": "..." } }`.

## Status codes

- `200` success with body. `201` created with `Location` header. `204` no body.
- `400` bad input. `401` not authenticated. `403` not authorized. `404` not found. `409` conflict. `422` validation. `429` rate limited.
- `500` only for unexpected server errors. Never return 500 for known failure modes.

## Versioning

- Prefix with `/v1/`, `/v2/`, etc. Bump the version on breaking changes.
- Never break an existing version. Add a new one.

## Contracts

- The plan's Files section must list every endpoint or shared type this change touches.
- If you need a new endpoint not in the plan, stop and ask. Do not expand scope.