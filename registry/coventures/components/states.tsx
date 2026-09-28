import type { ReactNode } from "react";
import { AlertCircleIcon, InboxIcon, type LucideIcon } from "lucide-react";
import { Spinner } from "@/registry/coventures/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/registry/coventures/ui/alert";
import { Skeleton } from "@/registry/coventures/ui/skeleton";
import { cn } from "@/lib/utils";

/** Centered spinner with an optional line of text. */
export function LoadingState({ label = "Loading…", className }: { label?: string; className?: string }) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3 py-16 text-sm text-muted-foreground", className)}
      role="status"
    >
      <Spinner className="size-6" />
      {label}
    </div>
  );
}

/** A few grey bars in a card shape, for content that has a known layout. */
export function SkeletonRows({ rows = 4, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-4" style={{ width: `${90 - (i % 3) * 18}%` }} />
      ))}
    </div>
  );
}

interface EmptyStateProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: LucideIcon;
  action?: ReactNode;
  className?: string;
}

/** "Nothing here" block. Ten pages used to draw their own. */
export function EmptyState({ title, description, icon: Icon = InboxIcon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-12 text-center",
        className
      )}
    >
      <Icon className="size-6 text-muted-foreground" strokeWidth={1.5} />
      <div className="text-sm font-medium">{title}</div>
      {description && <div className="max-w-sm text-sm text-muted-foreground">{description}</div>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/** Inline error block for a failed load. */
export function ErrorState({ title = "Something went wrong", message, action, className }: {
  title?: string;
  message?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <Alert variant="destructive" className={className}>
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      {message && <AlertDescription>{message}</AlertDescription>}
      {action && <div className="mt-2">{action}</div>}
    </Alert>
  );
}
