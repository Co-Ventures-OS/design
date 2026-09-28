import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: ReactNode;
  /** One line under the title, muted. */
  description?: ReactNode;
  /** Right-aligned controls; wrap under the title on narrow screens. */
  actions?: ReactNode;
  /** Small label above the title, e.g. the entity type. */
  eyebrow?: ReactNode;
  className?: string;
}

/**
 * The page title block every authenticated page starts with. The h1 picks
 * up Ovo from the base layer; nothing here sets a font.
 */
export function PageHeader({ title, description, actions, eyebrow, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="min-w-0">
        {eyebrow && (
          <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </div>
        )}
        <h1 className="text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
