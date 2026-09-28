---
name: coventures-design
description: Co-Ventures brand and UI system. Load before styling anything in a Co-Ventures project (web app, deck, mockup, email, landing page) — colours, fonts, type scale, spacing, components, and how to install them.
---

# Co-Ventures design system

Source of truth: https://github.com/Co-Ventures-OS/design (tokens in
`tokens/tokens.json`; style guide at https://design.coventures.vc).

## The look in one paragraph

Warm cream canvas (`#f5f1ee`), near-black ink (`#1e1e1e`), white surfaces.
Three pastel brand tones for badges, chips and blocks: peach `#f6d9c0`,
lavender `#ecdcf2`, lime `#dfe8b3`. Headings are **Ovo** (serif, one 400
weight, never bold). Body is **Work Sans**. Buttons are pills: solid ink, or a
thin ink outline that tints on hover and never inverts. Badges are small-radius
uppercase tracked labels on a pastel. Web cards have a 10px radius; deck cards
are square. Gradients (warm lime→amber→coral, cool blue→lilac→pink) are for
hero art and decks, not UI chrome.

## Web apps (Next.js + Tailwind 4 + shadcn)

Install, never hand-roll:

```bash
# once per project: add the registry to components.json
#   "registries": { "@coventures": "https://design.coventures.vc/r/{name}.json" }
npx shadcn@latest add @coventures/kit      # theme + components + this skill
npx shadcn@latest add @coventures/button   # or one at a time
```

Then in `app/globals.css`, after `@import "tailwindcss";`, add
`@import "./coventures.css";` and delete any hand-written `:root` colour block.
Load fonts in `app/layout.tsx` with next/font: `Ovo({ weight: "400", variable:
"--font-ovo" })` and `Work_Sans({ variable: "--font-work-sans" })`, and put both
`.variable` classes on `<html>`.

Rules:

- Use semantic utilities: `bg-background`, `bg-card`, `text-foreground`,
  `text-muted-foreground`, `border-border`, `bg-primary`. Brand tones:
  `bg-brand-peach`, `bg-brand-lavender`, `bg-brand-lime`. Never raw `gray-*`,
  `zinc-*`, `violet-*` or hex values in components.
- Use `Button`, `Badge`, `PageHeader`, `StatCard`, `StatusBadge`,
  `LoadingState` / `SkeletonRows` / `EmptyState` / `ErrorState` from the
  registry. Other primitives (Dialog, Table, Tabs, Select…) come from stock
  shadcn: `npx shadcn@latest add dialog`.
- `h1` gets Ovo from the base layer. Never add `font-semibold` / `font-bold`
  to it. Do not set `font-heading` on anything below h2.
- Status words map to tones through `toneFor()`; do not invent a colour for
  a status.
- To change a colour app-wide, change `tokens.json` in the design repo and
  re-install `@coventures/theme`. Do not patch `coventures.css` locally.

## Decks, mockups, emails, plain HTML

There is no claude.ai design-system artifact; the repo is the only source.
Start from `templates/deck.html` in the design repo (raw:
https://raw.githubusercontent.com/Co-Ventures-OS/design/main/templates/deck.html)
and paste
https://raw.githubusercontent.com/Co-Ventures-OS/design/main/tokens/deck.css
inline when the page must be self-contained. Fonts:
`https://fonts.googleapis.com/css2?family=Ovo&family=Work+Sans:wght@400;500;600&display=swap`.

Deck conventions: cream background, ink text, display headings in Ovo at
the `--fs-display-*` scale with `--lh-display` (1.0) and
`--tracking-display` (-0.02em); body in Work Sans at `--fs-body-*`; square
cards with a 1px ink rule; one pastel block per slide; one gradient per deck
at most, for the hero. Wordmark bottom-left (Work Sans, uppercase, `0.10em`
tracking), page number bottom-right. Never bold Ovo.
## Tokens (quick reference)

| Token | Value |
|---|---|
| canvas / cream | `#f5f1ee` |
| surface / white | `#ffffff` |
| ink | `#1e1e1e` (headings `#000000`) |
| grey (deck secondary text) | `#808694` |
| peach · lavender · lime | `#f6d9c0` · `#ecdcf2` · `#dfe8b3` |
| warm stops | `#dae152` `#f2bc61` `#f59e8b` |
| cool stops | `#dde8ff` `#e7ddff` `#f6b5ff` |
| green stop | `#bbed6b` |
| destructive (web) | `#b3261e` |
| space scale | 4 8 12 16 24 32 48 64 96 120 146 180 px |
| radius | chip 5px · card 10px (web) / 0 (deck) · pill 30px |
| display type | 120 96 72 64 48 32 px |
| body type | 20 16 14 12 px |
