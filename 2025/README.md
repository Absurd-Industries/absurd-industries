# Absurd Industries — 2025 archive

A frozen snapshot of everything the 2026 kraft/stamp redesign replaced or retired at the root.
Kept reachable so old links don't rot after the new site took over `/`.

## What's here

**Old homepage + replaced pages** (pre-2026 dark / Jura / "sassy side of science"):
- `index.html` — the old homepage.
- `contact.html`, `policies.html`, `privacy-policy.html`, `terms-and-conditions.html` — old legal pages.
- `lampy.html`, `project.html`, `drone-genesis.html`, `supersaber-workshop.html`,
  `play-with-lights.html` — old product / workshop pages.
- `foss-devroom.html` — the IndiaFOSS **2025** Hardware Devroom page (superseded by the live
  `/hardware-devroom/`).

**Retired legacy apps** (never part of the redesign, no longer linked from the live site):
- `amartha/` — 3D / creative playground.
- `profile/` — Marie-Curie maker profile app.
- `inventory/` — inventory app.
- `courses/` — course/learning page.
- `quotes/` — RFQ / invoice templates.

**`assets/`** — the full original asset library (~64M: `videos/`, `images/`, the old Jura
`css/` + `scss/`, `favicon/`). This lives here now, not at root. Every archived page and app
references it via `/2025/assets/…` (or, for the moved apps, a relative `../assets/…`).

## Self-contained by design

These pages navigate **within `/2025/`** — Home, legal, and cross-links all resolve to their
archived siblings, and assets load from `/2025/assets/`. The only things they reach outside the
archive are genuinely shared/external: the shared brand logo (`/assets/brand/absurd-industries-logo.png`)
and external links (shop, Discord, social, maps, payment).

The live root keeps only a **slim `/assets/`** — the ~4.6M subset the current site actually uses
(the `favicon/` set, a handful of product/OG images, `videos/lampy-loop.mp4`). Everything else was
moved here rather than duplicated.

## Where it's reachable

- **Now:** `https://absurd.industries/2025/` (this folder, on the main GH Pages deploy).

## To wire `2025.absurd.industries` (the subdomain — manual, one-time)

A second subdomain can't be served from the same repo's Pages, so use the frozen branch:
1. The **`archive-2025`** git branch holds the *full* repo as-of-the-redesign (old `index.htm`
   at root). Push it to a dedicated repo (e.g. `Absurd-Industries/2025-absurd-industries`),
   or enable Pages "deploy from branch" on a repo that serves it.
2. On that deploy, set the repo's `CNAME` to `2025.absurd.industries`.
3. Add a DNS **CNAME** record: `2025` → `<org>.github.io` (or the Pages target).

Until then, the `/2025/` folder above is the live archive.
