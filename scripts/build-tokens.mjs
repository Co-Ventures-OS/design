// Generates every derived token file from tokens/tokens.json.
//   tokens/tokens.css  Tailwind 4 + shadcn consumers (web apps)
//   tokens/deck.css    plain CSS custom properties for decks / Design canvases / HTML
// Run: npm run build:tokens. Check-in the outputs; CI verifies they are current.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const t = JSON.parse(readFileSync(join(root, "tokens/tokens.json"), "utf8"));
const c = (k) => t.color[k].value;
const ramp = (name) => Object.entries(t.color[name].value).map(([k, v]) => `  --brand-${name}-${k}: ${v};`).join("\n");
const header = (what) => `/* GENERATED from tokens/tokens.json by scripts/build-tokens.mjs. Do not edit.
   Co-Ventures design tokens v${t.version} — ${what} */\n`;

// ---------------------------------------------------------------- tokens.css
const web = `${header("web (Tailwind 4 + shadcn)")}
/* Three layers, top to bottom. Change the top layer to rebrand; the layers
   below derive from it and components only ever read the bottom one.
     1. Brand tokens    (--brand-*)              raw palette + fonts
     2. Semantic tokens (--background, --primary) shadcn's vocabulary mapped onto the brand
     3. Tailwind theme  (@theme inline)          exposes 1+2 as utilities
   Fonts: load Ovo and Work Sans (next/font or the Google Fonts link in
   tokens.json) and expose them as --font-ovo / --font-work-sans. The family
   names below are the fallback when those variables are absent. */

:root {
  /* ---- 1. Brand ----------------------------------------------------------- */
  --brand-canvas: ${c("canvas")};
  --brand-surface: ${c("surface")};
  --brand-ink: ${c("ink")};
  --brand-heading: ${c("ink-pure")};
  --brand-grey: ${c("grey")};
  --brand-peach: ${c("peach")};
  --brand-lavender: ${c("lavender")};
  --brand-lime: ${c("lime")};
  --brand-ink-soft: ${c("ink-soft")};
  --brand-ink-faint: ${c("ink-faint")};
  --brand-ink-hair: ${c("ink-hair")};
  --brand-warm-1: ${c("warm")[0]};
  --brand-warm-2: ${c("warm")[1]};
  --brand-warm-3: ${c("warm")[2]};
  --brand-cool-1: ${c("cool")[0]};
  --brand-cool-2: ${c("cool")[1]};
  --brand-cool-3: ${c("cool")[2]};
  --brand-green: ${c("green")};
  --brand-gradient-warm: ${t.gradient.warm};
  --brand-gradient-cool: ${t.gradient.cool};
  --brand-gradient-green: ${t.gradient.green};

${ramp("neutral")}

${ramp("accent")}

  --brand-radius: ${t.radius.base};
  --brand-radius-chip: ${t.radius.chip};
  --brand-radius-pill: ${t.radius.pill};

  /* ---- 2. Semantic (shadcn vocabulary) ------------------------------------ */
  --background: var(--brand-canvas);
  --foreground: var(--brand-ink);
  --heading: var(--brand-heading);

  --card: var(--brand-surface);
  --card-foreground: var(--brand-ink);
  --popover: var(--brand-surface);
  --popover-foreground: var(--brand-ink);

  --primary: var(--brand-ink);
  --primary-foreground: #ffffff;
  --secondary: var(--brand-neutral-200);
  --secondary-foreground: var(--brand-ink);
  --muted: var(--brand-neutral-200);
  --muted-foreground: var(--brand-neutral-500);
  --accent: var(--brand-neutral-200);
  --accent-foreground: var(--brand-ink);
  --destructive: ${c("destructive")};

  --border: var(--brand-neutral-200);
  --input: var(--brand-neutral-300);
  --ring: var(--brand-ink);

  --radius: var(--brand-radius);

${c("chart").map((v, i) => `  --chart-${i + 1}: ${v};`).join("\n")}

  --sidebar: var(--brand-canvas);
  --sidebar-foreground: var(--brand-ink);
  --sidebar-primary: var(--brand-ink);
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: var(--brand-neutral-200);
  --sidebar-accent-foreground: var(--brand-ink);
  --sidebar-border: var(--brand-neutral-200);
  --sidebar-ring: var(--brand-ink);
}

/* Dark mode is not designed yet. The variables exist so shadcn components
   compile; flipping \`.dark\` on <html> will look rough until a dark ramp is
   drawn. */
.dark {
  --background: #171514;
  --foreground: var(--brand-canvas);
  --heading: #ffffff;
  --card: #211e1c;
  --card-foreground: var(--brand-canvas);
  --popover: #211e1c;
  --popover-foreground: var(--brand-canvas);
  --primary: var(--brand-canvas);
  --primary-foreground: var(--brand-ink);
  --secondary: #2e2a28;
  --secondary-foreground: var(--brand-canvas);
  --muted: #2e2a28;
  --muted-foreground: var(--brand-neutral-400);
  --accent: #2e2a28;
  --accent-foreground: var(--brand-canvas);
  --destructive: #e0574f;
  --border: rgb(255 255 255 / 10%);
  --input: rgb(255 255 255 / 15%);
  --ring: var(--brand-neutral-400);
  --sidebar: #171514;
  --sidebar-foreground: var(--brand-canvas);
  --sidebar-primary: var(--brand-canvas);
  --sidebar-primary-foreground: var(--brand-ink);
  --sidebar-accent: #2e2a28;
  --sidebar-accent-foreground: var(--brand-canvas);
  --sidebar-border: rgb(255 255 255 / 10%);
  --sidebar-ring: var(--brand-neutral-400);
}

/* ---- 3. Tailwind theme ---------------------------------------------------- */
@theme inline {
  /* Typography -> font-sans, font-heading */
  --font-sans: var(--font-work-sans, "${t.font.body.family}"), "${t.font.body.family}", ${t.font.body.fallback};
  --font-heading: var(--font-ovo, "${t.font.display.family}"), "${t.font.display.family}", ${t.font.display.fallback};

  /* Semantic colours -> bg-background, text-muted-foreground, border-border ... */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-heading: var(--heading);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
${c("chart").map((_, i) => `  --color-chart-${i + 1}: var(--chart-${i + 1});`).join("\n")}
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  /* Brand tones -> bg-brand-peach, text-brand-lavender, border-brand-lime ... */
  --color-brand-peach: var(--brand-peach);
  --color-brand-lavender: var(--brand-lavender);
  --color-brand-lime: var(--brand-lime);
  --color-brand-grey: var(--brand-grey);
  --color-brand-green: var(--brand-green);
  --color-brand-warm-1: var(--brand-warm-1);
  --color-brand-warm-2: var(--brand-warm-2);
  --color-brand-warm-3: var(--brand-warm-3);
  --color-brand-cool-1: var(--brand-cool-1);
  --color-brand-cool-2: var(--brand-cool-2);
  --color-brand-cool-3: var(--brand-cool-3);

  /* Brand ramps -> bg-neutral-200, text-accent-600 (shadow Tailwind's own scales) */
${Object.keys(t.color.neutral.value).map((k) => `  --color-neutral-${k}: var(--brand-neutral-${k});`).join("\n")}
${Object.keys(t.color.accent.value).map((k) => `  --color-accent-${k}: var(--brand-accent-${k});`).join("\n")}

  /* Radius scale, all derived from --radius */
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
  --radius-chip: var(--brand-radius-chip);
  --radius-pill: var(--brand-radius-pill);
}

/* ---- Base ----------------------------------------------------------------- */
@layer base {
  /* Tailwind v4 defaults borders to currentcolor; keep a soft neutral border
     for elements that don't name one. */
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--border, currentcolor);
  }

  * {
    @apply outline-ring/50;
  }

  html {
    @apply font-sans antialiased;
  }

  body {
    @apply bg-background text-foreground;
  }

  /* Page titles: Ovo, black, regular weight (Ovo ships only a 400 cut, so
     font-semibold/bold on an h1 would render faux-bold). */
  h1 {
    @apply font-heading font-normal text-heading tracking-[${t.type.tracking["web-h1"]}];
    line-height: ${t.type.leading["web-h1"]};
  }

  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
`;

// ------------------------------------------------------------------ deck.css
const deck = `${header("decks and plain HTML (no Tailwind)")}
/* Load fonts with: <link rel="stylesheet" href="${t.font.google}"> */
:root {
  /* Palette */
  --cv-cream: ${c("canvas")};
  --cv-white: ${c("surface")};
  --cv-ink: ${c("ink")};
  --cv-ink-pure: ${c("ink-pure")};
  --cv-grey: ${c("grey")};
  --cv-peach: ${c("peach")};
  --cv-lavender: ${c("lavender")};
  --cv-lime: ${c("lime")};
  --cv-warm-1: ${c("warm")[0]};
  --cv-warm-2: ${c("warm")[1]};
  --cv-warm-3: ${c("warm")[2]};
  --cv-cool-1: ${c("cool")[0]};
  --cv-cool-2: ${c("cool")[1]};
  --cv-cool-3: ${c("cool")[2]};
  --cv-green: ${c("green")};
  --cv-gradient-warm: ${t.gradient.warm};
  --cv-gradient-cool: ${t.gradient.cool};
  --cv-gradient-green: ${t.gradient.green};

  /* Short aliases used inside slides */
  --bg: var(--cv-cream);
  --ink: var(--cv-ink);
  --ink-soft: ${c("ink-soft")};
  --ink-faint: ${c("ink-faint")};
  --ink-hair: ${c("ink-hair")};
  --line: var(--cv-ink);
  --grey: var(--cv-grey);
  --peach: var(--cv-peach);
  --lavender: var(--cv-lavender);
  --lime: var(--cv-lime);
  --sand: var(--peach);
  --lilac: var(--lavender);
  --sage: var(--lime);

  /* Type */
  --serif: "${t.font.display.family}", ${t.font.display.fallback};
  --sans: "${t.font.body.family}", ${t.font.body.fallback};
  --mono: "${t.font.body.family}", ${t.font.body.fallback};
  --font-display: var(--serif);
  --font-body: var(--sans);
  --font-wordmark: var(--sans);
${Object.entries(t.type.display).map(([k, v]) => `  --fs-display-${k}: ${v};`).join("\n")}
${Object.entries(t.type.body).map(([k, v]) => `  --fs-body-${k}: ${v};`).join("\n")}
  --lh-display: ${t.type.leading.display};
  --lh-display-loose: ${t.type.leading["display-loose"]};
  --lh-body: ${t.type.leading.body};
  --tracking-display: ${t.type.tracking.display};
  --tracking-display-tight: ${t.type.tracking["display-tight"]};
  --tracking-body: ${t.type.tracking.body};
  --tracking-wordmark: ${t.type.tracking.wordmark};

  /* Space */
${Object.entries(t.space).map(([k, v]) => `  --space-${k}: ${v};`).join("\n")}

  /* Radius (deck cards are square; chips and pills are rounded) */
  --radius-card: ${t.radius.none};
  --radius-chip: ${t.radius.chip};
  --radius-pill: ${t.radius.pill};
  --radius-circle: ${t.radius.circle};
}
`;

writeFileSync(join(root, "tokens/tokens.css"), web);
writeFileSync(join(root, "tokens/deck.css"), deck);
console.log("wrote tokens/tokens.css and tokens/deck.css");
