# Co Ventures design system

One source of truth for the Co Ventures look, consumed by URL from every
project: web apps get a [shadcn registry](https://ui.shadcn.com/docs/registry),
decks and one-off HTML get `deck.css` and a starter template, and agents
get a skill. Everything lives in this repo; there is no external design tool. Style guide: **https://design.coventures.vc** (until the domain
is live, the registry is served from this repo on GitHub).

```
tokens/tokens.json        canonical tokens (edit this)
tokens/tokens.css         generated: Tailwind 4 + shadcn consumers
tokens/deck.css           generated: plain CSS variables for decks / HTML
templates/deck.html       starter deck built on deck.css
registry.json             shadcn registry manifest
registry/coventures/      component sources
public/r/*.json           built registry (what `shadcn add` downloads)
skills/coventures-design/ the agent skill
app/                      the style-guide site (Next.js)
```

## Use it in a web app

1. Point the project at the registry in `components.json`:

   ```json
   "registries": {
     "@coventures": "https://raw.githubusercontent.com/Co-Ventures-OS/design/main/public/r/{name}.json"
   }
   ```

   (Swap to `https://design.coventures.vc/r/{name}.json` once the site is
   deployed.)

2. Install the kit, or pieces of it:

   ```bash
   npx shadcn@latest add @coventures/kit
   npx shadcn@latest add @coventures/theme @coventures/button @coventures/callout
   ```

   `theme` drops `app/coventures.css`. Import it in `globals.css` right after
   `@import "tailwindcss";` and delete any colour `:root` block it replaces.

3. Load the fonts in `app/layout.tsx`:

   ```tsx
   import { Ovo, Work_Sans } from "next/font/google";
   const ovo = Ovo({ weight: "400", subsets: ["latin"], variable: "--font-ovo" });
   const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans" });
   <html className={`${ovo.variable} ${workSans.variable}`}>
   ```

4. Add one line to the project's `CLAUDE.md`: *"UI: use the Co Ventures
   design system (skill in `.claude/skills/coventures-design`, registry
   `@coventures`). Never hand-roll a button or invent a colour."*

## Use it in a deck or any HTML

Copy `templates/deck.html`, or link `tokens/deck.css` and the Google Fonts
URL from `tokens.json` in your own page. When the page must be self-contained
(a claude.ai artifact, an email), paste `deck.css` inline.

## Develop

```bash
npm install
npm run build:tokens     # tokens.json -> tokens.css + deck.css
npm run build:registry   # registry.json -> public/r/*.json
npm run dev              # style guide on :3000
npm run check            # fails if generated files are stale
```

Deploys to Railway on push to `main` via the shared
`Co-Ventures-OS/.github` Railway workflow (needs a `RAILWAY_TOKEN` repo
secret scoped to the design project).
