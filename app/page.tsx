import tokens from "@/tokens/tokens.json";
import { Button } from "@/registry/coventures/ui/button";
import { Badge } from "@/registry/coventures/ui/badge";
import { PageHeader } from "@/registry/coventures/components/page-header";
import { StatCard } from "@/registry/coventures/components/stat-card";
import { StatusBadge } from "@/registry/coventures/components/status-badge";
import { EmptyState, ErrorState, LoadingState, SkeletonRows } from "@/registry/coventures/components/states";
import { ArrowRightIcon, PlusIcon } from "lucide-react";

const REGISTRY = "https://raw.githubusercontent.com/Co-Ventures-OS/design/main/public/r/{name}.json";

type Swatch = { name: string; value: string; role?: string };

function swatches(): Swatch[] {
  const c = tokens.color as Record<string, { value: unknown; role?: string }>;
  const out: Swatch[] = [];
  for (const [name, def] of Object.entries(c)) {
    if (typeof def.value === "string") out.push({ name, value: def.value, role: def.role });
    else if (Array.isArray(def.value)) def.value.forEach((v, i) => out.push({ name: `${name}-${i + 1}`, value: v, role: def.role }));
  }
  return out;
}

function Section({ id, title, lede, children }: { id: string; title: string; lede?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-12">
      <div className="mb-6">
        <h2 className="font-heading text-2xl text-heading">{title}</h2>
        {lede && <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{lede}</p>}
      </div>
      {children}
    </section>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-card p-4 text-xs leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}

function Ramp({ name }: { name: "neutral" | "accent" }) {
  const ramp = tokens.color[name].value as Record<string, string>;
  return (
    <div>
      <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{name}</div>
      <div className="flex overflow-hidden rounded-lg border border-border">
        {Object.entries(ramp).map(([k, v]) => (
          <div key={k} className="flex-1" title={`${name}-${k} ${v}`}>
            <div className="h-10" style={{ background: v }} />
            <div className="px-1 py-1 text-center text-[10px] tabular-nums text-muted-foreground">{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const nav = [
    ["colour", "Colour"], ["type", "Type"], ["space", "Space & radius"], ["buttons", "Buttons"], ["badges", "Badges"],
    ["header", "Page header"], ["stats", "Stat cards"], ["states", "States"], ["install", "Install"],
  ];
  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 sm:px-8">
      <header className="sticky top-0 z-10 -mx-4 mb-8 border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs">
          <span className="font-sans uppercase tracking-[0.10em]">Co-Ventures</span>
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="text-muted-foreground hover:text-foreground">{label}</a>
          ))}
          <a href="https://github.com/Co-Ventures-OS/design" className="ml-auto text-muted-foreground hover:text-foreground">GitHub</a>
        </div>
      </header>

      <PageHeader
        eyebrow={`Design system · v${tokens.version}`}
        title="Everything Co-Ventures builds, one look"
        description="Tokens, components and rules. Web apps install from the shadcn registry; decks start from the deck template; agents read the skill."
        actions={
          <>
            <Button asChild><a href="#install">Install <ArrowRightIcon data-icon="inline-end" /></a></Button>
            <Button variant="outline" asChild><a href="https://github.com/Co-Ventures-OS/design/blob/main/tokens/tokens.json">tokens.json</a></Button>
          </>
        }
      />

      <Section id="colour" title="Colour" lede="Cream canvas, ink text, white surfaces. Three pastel tones do the accent work. Gradients are for hero art and decks only.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {swatches().map((s) => (
            <div key={s.name} className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="h-16" style={{ background: s.value }} />
              <div className="p-2">
                <div className="text-xs font-medium">{s.name}</div>
                <div className="text-[11px] tabular-nums text-muted-foreground">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Ramp name="neutral" />
          <Ramp name="accent" />
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {Object.entries(tokens.gradient).map(([k, v]) => (
            <div key={k} className="overflow-hidden rounded-lg border border-border">
              <div className="h-20" style={{ background: v }} />
              <div className="bg-card p-2 text-xs font-medium">gradient-{k}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="type" title="Type" lede="Ovo for display and h1 only, one weight, never bold. Work Sans for everything else. The wordmark is Work Sans, uppercase, 0.10em tracking.">
        <div className="space-y-6">
          {Object.entries(tokens.type.display).map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-4 overflow-hidden">
              <span className="w-24 shrink-0 text-[11px] tabular-nums text-muted-foreground">display-{k} · {v}</span>
              <span className="truncate font-heading text-heading" style={{ fontSize: `min(${v}, 9vw)`, lineHeight: 1, letterSpacing: "-0.02em" }}>Sunrise 2026</span>
            </div>
          ))}
          {Object.entries(tokens.type.body).map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-4">
              <span className="w-24 shrink-0 text-[11px] tabular-nums text-muted-foreground">body-{k} · {v}</span>
              <span style={{ fontSize: v }}>What happens to four million Australians when the model changes?</span>
            </div>
          ))}
          <div className="flex items-baseline gap-4">
            <span className="w-24 shrink-0 text-[11px] text-muted-foreground">wordmark</span>
            <span className="uppercase tracking-[0.10em]">Co-Ventures</span>
          </div>
        </div>
      </Section>

      <Section id="space" title="Space & radius" lede="A 12-step spacing scale shared by web and decks. Web cards are 10px radius; deck cards are square; chips 5px; pills 30px.">
        <div className="flex flex-wrap items-end gap-3">
          {Object.entries(tokens.space).map(([k, v]) => (
            <div key={k} className="flex flex-col items-center gap-1">
              <div className="bg-brand-lavender" style={{ width: v, height: v, maxWidth: 96, maxHeight: 96 }} />
              <span className="text-[10px] tabular-nums text-muted-foreground">{k} · {v}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          {Object.entries(tokens.radius).filter(([k]) => !k.startsWith("$")).map(([k, v]) => (
            <div key={k} className="flex flex-col items-center gap-1">
              <div className="size-16 border border-foreground bg-card" style={{ borderRadius: v }} />
              <span className="text-[10px] text-muted-foreground">{k} · {v}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="buttons" title="Buttons" lede="Pills. default is solid ink; outline is a thin ink border that tints on hover and never inverts. The rest are utility variants for dense chrome.">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Apply for funding</Button>
          <Button variant="outline">Talk to us</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Archive</Button>
          <Button variant="link">Link</Button>
          <Button size="icon" aria-label="Add"><PlusIcon /></Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large <ArrowRightIcon data-icon="inline-end" /></Button>
        </div>
        <Code>{`import { Button } from "@/components/ui/button";\n<Button>Apply for funding</Button>\n<Button variant="outline">Talk to us</Button>`}</Code>
      </Section>

      <Section id="badges" title="Badges" lede="Small radius, uppercase, tracked. peach / lavender / lime are the brand tones; StatusBadge picks the tone from the status word so every app colours COMPLETE the same way.">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Default</Badge>
          <Badge variant="peach">Peach</Badge>
          <Badge variant="lavender">Lavender</Badge>
          <Badge variant="lime">Lime</Badge>
          <Badge variant="solid">Solid</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {["PREP", "RUN", "CLOSE", "COMPLETE", "OPEN", "IN PROGRESS", "DONE", "WARN", "ERROR", "AGENT"].map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </div>
        <Code>{`import { StatusBadge, toneFor } from "@/components/shared/StatusBadge";\n<StatusBadge status="COMPLETE" />   // lime`}</Code>
      </Section>

      <Section id="header" title="Page header" lede="The block every page starts with. The h1 gets Ovo from the base layer; nothing here sets a font.">
        <div className="rounded-lg border border-border bg-card p-6">
          <PageHeader
            eyebrow="Syndicate"
            title="Sunrise 2026"
            description="Closing 14 October · 38 of 60 allocations committed"
            actions={<><Button variant="outline" size="sm">Export</Button><Button size="sm">Add investor</Button></>}
          />
        </div>
      </Section>

      <Section id="stats" title="Stat cards" lede="One KPI tile: label, value, delta pill, hint, footer slot, optional link.">
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard label="Committed" value="$2.4m" delta={{ pct: 12, previous: "last week" }} hint="of $3.0m target" />
          <StatCard label="Investors" value="38" delta={{ pct: -4 }} />
          <StatCard label="Days left" value="15" delta={null} footer={<div className="h-1.5 rounded-full bg-muted"><div className="h-full w-2/3 rounded-full bg-primary" /></div>} />
        </div>
      </Section>

      <Section id="states" title="States" lede="Every data view needs loading, skeleton, empty and error. Use these four; do not draw your own.">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card"><LoadingState /></div>
          <div className="rounded-lg border border-border bg-card p-4"><SkeletonRows /></div>
          <EmptyState title="No investors yet" description="Add the first one or import from Folk." action={<Button size="sm">Add investor</Button>} />
          <ErrorState message="The Brain did not answer in time. Try again." action={<Button size="sm" variant="outline">Retry</Button>} />
        </div>
      </Section>

      <Section id="install" title="Install" lede="Web apps install by URL through the shadcn CLI. Decks copy templates/deck.html. Agents get the skill with the kit.">
        <Code>{`// components.json\n"registries": {\n  "@coventures": "${REGISTRY}"\n}\n\n// then\nnpx shadcn@latest add @coventures/kit\n\n// app/globals.css, after @import "tailwindcss";\n@import "./coventures.css";`}</Code>
        <p className="mt-4 text-sm text-muted-foreground">
          Items: theme · button · badge · page-header · stat-card · states · status-badge · skill · kit.
          Everything else (Dialog, Table, Tabs, Select…) is stock shadcn and picks up the theme automatically. Decks: <a className="underline" href="https://github.com/Co-Ventures-OS/design/blob/main/templates/deck.html">templates/deck.html</a>.
        </p>
      </Section>
    </main>
  );
}
