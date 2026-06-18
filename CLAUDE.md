# Absurd Industries — Project Map

Open-source STEAM community platform built with Astro, Vue 3, and Tailwind CSS, deployed on Cloudflare Pages.

## Architecture

```
src/
├── layouts/BaseLayout.astro    ← Every page wraps in this (head, fonts, logo, footer, bottom bar)
├── components/                 ← Astro (static) and Vue (interactive) components
├── pages/                      ← File-based routing, [slug].astro for dynamic routes
├── data/                       ← Typed mock data arrays (future D1 API drop-in)
├── styles/global.css           ← Shared CSS (cards, buttons, tags, nav, animations)
└── types/index.ts              ← All TypeScript interfaces
```

## Tech Stack

- **Astro 6** — static-first with per-page SSR opt-in
- **Vue 3** — interactive islands via `@astrojs/vue` (Composition API, `<script setup>`)
- **Tailwind CSS 3** — utility classes, single config in `tailwind.config.mjs`
- **Cloudflare Pages** — hosting via `@astrojs/cloudflare` adapter
- **pnpm** — package manager

## Design System

Colors (defined in `tailwind.config.mjs`):
- `kraft` (#D4B896) — background, paper texture
- `ink` (#1A1A1A) — primary text
- `stamp` (#FF5900) — accent, CTAs
- `paper` (#FAF3E8) — card backgrounds
- `funded` (#2A5F41) — success/funded state
- `stencil` (#6B5B4A) — secondary text

Fonts: Fraunces (serif headings) + DM Sans (sans body)
Icons: Phosphor Icons (bold weight) + FontAwesome (brand icons)
Cards: SVG feTurbulence displacement filters for organic paper-cut edges

## Key Patterns

### Adding a new page
1. Create `src/pages/your-page.astro` (or `src/pages/section/index.astro`)
2. Import and wrap with `<BaseLayout title="Page Title" activeTab="section">`
3. Use existing components: `Card`, `Tag`, `ProgressBar`
4. For interactive parts, create a `.vue` file and use `client:load` or `client:visible`

### Adding a new data type
1. Add the interface to `src/types/index.ts`
2. Create `src/data/your-type.ts` with a typed array export
3. Shape it like a future API response (the array will later be replaced by a D1 query)

### Static vs Vue island decision
- **Static (Astro):** Anything that doesn't need client-side JS — cards, layouts, tags, footers
- **Vue island:** Anything with user interaction — search, filters, modals, toggles, forms
- Default to `client:visible` (lazy). Use `client:load` only for above-fold interactive elements

### Component conventions
- One component per file, flat naming: `CampaignCard.astro`, not `cards/Campaign.astro`
- Props interface at the top with JSDoc on non-obvious fields
- Astro components: destructure `Astro.props` in frontmatter
- Vue components: `<script setup lang="ts">` with `defineProps<{...}>()`

## Commands

```bash
pnpm dev        # Start dev server (localhost:4321)
pnpm build      # Build for production
pnpm preview    # Preview production build locally
pnpm check      # TypeScript checking
```

## Content Data

All mock data lives in `src/data/*.ts` as typed arrays. Each file exports a const array
shaped like what a future Cloudflare D1 API would return. When the API is built, swap the
import for a fetch call — the types stay the same.

- `campaigns.ts` — campaign listings (INR only)
- `makers.ts` — maker profiles
- `events.ts` — Bengaluru-first STEAM events
- `requests.ts` — community requests
- `friends.ts` — partner logos for "Friends of Absurd"
- `navigation.ts` — bottom bar tabs and mega menu items

## Deployment

Cloudflare Pages with `@astrojs/cloudflare` adapter. All pages prerender by default (static).
Pages that need server-side rendering add `export const prerender = false` in frontmatter.

## Legacy Pages

Unchanged legacy sub-sites live in `public/` and are served as static files:
- `public/hardware-devroom/` — Hardware Devroom event site
- `public/amartha/` — Amartha sub-project
- `public/quotes/` — RFQ management tool

Reference HTML from the pre-Astro site is in `_reference/` for visual comparison.
