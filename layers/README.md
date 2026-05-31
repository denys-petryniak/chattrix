# Layers

The app is modularized with [Nuxt layers](https://nuxt.com/docs/getting-started/layers).
Each layer is a self-contained slice with its own `nuxt.config.ts`, and Nuxt
auto-registers everything under this `layers/` directory — no manual `extends`
needed.

```
layers/
├─ base/    foundation shared by the whole app
└─ chat/    the chat feature (app + server + shared)
```

## `base/` — foundation

App-wide shell and configuration that any feature can build on:

- `app/components/` — layout chrome (`AppHeader`, `AppSidebar`,
  `MarkdownRenderer`, `TypewriterText`)
- `app/layouts/` — the default layout
- `app/assets/css/` — global styles
- `app/utils/` — shared helpers (e.g. `dateUtils`)
- `nuxt.config.ts` — registers `@nuxt/ui`, `@nuxtjs/mdc`, global CSS

## `chat/` — the chat feature

Everything specific to projects, chats, and messages, split across the
client / server boundary:

- `app/` — client side: components, composables, pages
  (see [`chat/app/README.md`](chat/app/README.md))
- `server/` — server side: API routes, repository, services
  (see [`chat/server/README.md`](chat/server/README.md))
- `shared/` — code reused by both sides: `types/`, `utils/` (mock data)

## Named-layer aliases

Nuxt auto-creates a `#layers/<name>` alias for each layer, so imports stay
stable instead of using fragile relative paths — e.g.
`#layers/chat/server/repository/chatRepository`. See the
[Nuxt named layer aliases docs](https://nuxt.com/docs/4.x/guide/going-further/layers#named-layer-aliases).

## Why layers

- **Modularity** — each feature is isolated and could be extracted or reused.
- **Clear boundaries** — `base` (foundation) vs `chat` (feature) vs
  `shared` (cross-cutting types/utils).
- **Scales cleanly** — new features become new sibling layers without touching
  the existing ones.
