# Absurd Industries — 2025 archive

A frozen snapshot of the pre-2026 homepage (dark / Jura / "sassy side of science"),
kept so it stays reachable after the kraft/stamp redesign took over the root.

## What's here
- `index.html` — the old homepage. Asset/links were rewritten to **absolute root paths**
  (`/assets/...`, `/policies.htm`, etc.) so it renders correctly when served from `/2025/`.
  It reuses the still-live root `/assets/` (CSS, images, favicon) — no binaries duplicated.

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
