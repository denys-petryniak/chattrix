# Server Architecture

This layer follows a layered architecture that separates **HTTP handling**,
**data access**, and **external logic**. Each layer has a single
responsibility and can change independently of the others.

```
HTTP request
   │
   ▼
API route (event handler)   ← api/
   │   parses params/body, validates, shapes the HTTP response,
   │   and coordinates the layers below
   ├──────────────┐
   ▼              ▼
Repository     Service       ← repository/   services/
(data access)  (external logic)
```

## Repository — "where the data lives"

`repository/` hides the **data source** behind a set of plain functions
(`getAllChats`, `createMessageForChat`, ...). Today the data is an in-memory
array; tomorrow it can be a real database.

**Why it matters:** routes never know how data is stored — they just call a
function. Swapping the in-memory store for a database means rewriting only the
repository; every route stays untouched.

## Service — "external or complex logic"

`services/` encapsulates logic that is **not about storage** — talking to an
external API, heavy computation, etc. Here it wraps the AI SDK
(`generateChatResponse`, `generateChatTitle`).

**Why it matters:** services stay pure and independent. They receive what they
need as arguments rather than reaching into the data layer themselves, which
keeps them easy to test in isolation.

## API route — the coordinator

A route handler is a thin orchestrator: read the request, call the repository
and/or service functions it needs, and return the HTTP response (including
`createError` for 404/400). All real work lives in the layers below.

## Key insight

**Repository and Service are siblings, not a stack.** Neither wraps the other —
the route calls each directly as needed. For example, `messages/generate.post.ts`
reads history via the repository, calls the service to generate a reply, then
writes the result back via the repository:

```
Repository (read) → Service (AI) → Repository (write)
```

Calling a service directly is expected, not an exception: the repository is
**not** a mandatory middleman in front of the service.
