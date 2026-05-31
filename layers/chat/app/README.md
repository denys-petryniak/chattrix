# Client Architecture

This is the **client side** of the chat layer (browser / SSR). Components never
touch the data source directly — they go through composables that hide `$fetch`
and hold shared reactive state. The same "hide the source behind functions"
idea is mirrored on the server (see
[`../server/README.md`](../server/README.md)).

```
CLIENT (browser / SSR)              │  SERVER (Nitro)
                                    │
Component (page.vue)                │
   │ calls                          │
   ▼                                │
Composable / Pinia                  │
(useChats, useProjects)             │
   │ $fetch / useFetch              │
   └──────────► HTTP ──────────────►│  API route (event handler)
                                    │     │
                                    │     ├─► Repository  (data access)
                                    │     └─► Service     (AI, etc.)
                                    │           │
                                    │           ▼
                                    │     data / DB / OpenAI
```

## Composables — the "client-side repository"

`composables/` hide where the data comes from. A component calls
`fetchChats()` or `createChat()` and never knows the endpoint behind it — the
"data source" here is the HTTP API, not an in-memory array.

- **List composables** (`useChats`, `useProjects`) own shared reactive state
  via `useState` and expose actions that wrap `$fetch` / `useFetch`.
- **Entity composables** (`useChat`, `useProject`) derive a single item from
  that shared state with `computed` and expose item-scoped actions.

## State: `useState` vs Pinia

This layer uses Nuxt's `useState` for shared, SSR-friendly state — zero extra
dependencies and enough for the current scope. **Pinia is an interchangeable
alternative** on the client: reach for it only as state grows (many
interrelated stores, DevTools, persistence plugins).

## Key principle

Repository (server) and composable (client) are **siblings split by the HTTP
boundary**, not interchangeable. A client composable cannot replace a server
repository — it has no direct DB access. But the *pattern* is symmetric: both
hide their data source behind plain functions, so consumers stay unaware of
where the data actually lives.
