import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/registry/coventures/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: ReactNode;
  value: ReactNode;
  /** Percentage change vs the previous period. null renders a dash. */
  delta?: { pct: number | null; previous?: string } | null;
  hint?: ReactNode;
  /** Anything to render below the value (sparkline, progress bar). */
  footer?: ReactNode;
  href?: string;
  className?: string;
}

function DeltaPill({ pct }: { pct: number | null }) {
  if (pct === null || !Number.isFinite(pct)) {
    return <span className="text-xs text-muted-foreground">&mdash;</span>;
  }
  const positive = pct >= 0;
  return (
    <span
      className={cn(
        "rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums",
        positive ? "bg-brand-lime text-foreground" : "bg-destructive/10 text-destructive"
      )}
    >
      {positive ? "↑" : "↓"} {Math.abs(pct).toFixed(0)}%
    </span>
  );
}

/**
 * One KPI tile. Replaces the three separate stat-card implementations that
 * lived in analytics, the investor modal and the overview tab.
 */
export function StatCard({ label, value, delta, hint, footer, href, className }: StatCardProps) {
  const inner = (
    <Card
      className={cn(
        "flex h-full flex-col gap-0 p-4 transition-shadow",
        href && "hover:shadow-sm",
        className
      )}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
        {delta !== undefined && delta !== null && <DeltaPill pct={delta.pct} />}
      </div>
      <div className="text-2xl leading-none font-semibold tabular-nums">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
      {delta?.previous && <div className="mt-1 text-[11px] text-muted-foreground">vs {delta.previous}</div>}
      {footer && <div className="mt-auto pt-3">{footer}</div>}
    </Card>
  );
  return href ? (
    <Link href={href} className="block h-full">
      {inner}
    </Link>
  ) : (
    inner
  );
}
