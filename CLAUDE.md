# Co-Ventures design system repo

This repo is the single source of truth for how Co-Ventures things look:
web apps (dashboard, orbit, vp-form, anything new), decks, emails and
one-off HTML. Nothing lives outside this repo: no design-tool or
claude.ai artifact copy of the tokens.

- `tokens/tokens.json` is canonical. `tokens/tokens.css` (Tailwind 4 +
  shadcn) and `tokens/deck.css` (plain CSS variables) are **generated** from
  it by `npm run build:tokens`. Never edit the generated files; CI fails if
  they are stale. `templates/deck.html` is the deck starter; keep it on
  `deck.css` variables only.
- `registry.json` + `registry/coventures/**` is a shadcn registry. `npm run
  build:registry` writes `public/r/*.json`, which is what consumers install
  from. Commit the output: until the site is on its own domain, consumers
  read it from raw.githubusercontent.com.
- `skills/coventures-design/SKILL.md` is the agent-facing guide. It ships
  through the registry as `@coventures/skill`, so keep it in step with the
  tokens and components. The skill is also this repo's own guide: follow it
  when changing the style-guide site under `app/`.
- The style-guide site (`app/`) renders the tokens and every registry
  component. It imports components from `@/registry/coventures/...` so the
  page is always the real thing, not a copy.

Changing a token: edit `tokens.json` → `npm run build` → check the diff in
`tokens/*.css` and `public/r/theme.json` → commit. Consumers pick it up by
re-running `npx shadcn add @coventures/theme`; decks re-copy `deck.css`.

Tones carry meaning across every surface (peach = attention, lavender =
context, lime = good news); a new component that uses them keeps that
mapping. `Badge` and `Callout` are the two references.

Adding a component: put the source under `registry/coventures/ui` (shadcn
primitive with brand styling) or `registry/coventures/components` (composed
piece), import siblings via `@/registry/coventures/...` (the CLI rewrites
these to the consumer's aliases), add an item to `registry.json`, add an
example to `app/page.tsx`, add it to the `kit` item, and mention it in the
skill.
