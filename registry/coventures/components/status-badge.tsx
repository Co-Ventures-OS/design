import { Badge, type badgeVariants } from "@/registry/coventures/ui/badge";
import type { VariantProps } from "class-variance-authority";

type Tone = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

/**
 * One place that decides which brand tone a status word gets. The syndicate
 * stage map used to be copied into five modals with slightly different
 * colours each time.
 */
const TONES: Record<string, Tone> = {
  // Syndicate stages
  PREP: "default",
  RUN: "lavender",
  CLOSE: "peach",
  COMPLETE: "lime",
  // Ask / task status
  OPEN: "peach",
  "IN PROGRESS": "lavender",
  DONE: "lime",
  COMPLETED: "lime",
  CLOSED: "default",
  CANCELLED: "destructive",
  // Edit history actions
  ARCHIVE: "destructive",
  ARCHIVED: "destructive",
  RESTORE: "lime",
  RESTORED: "lime",
  MERGE: "lavender",
  MERGED: "lavender",
  EDIT: "default",
  EDITED: "default",
  // Health
  OK: "lime",
  HEALTHY: "lime",
  WARN: "peach",
  WARNING: "peach",
  ERROR: "destructive",
  FAILED: "destructive",
  AGENT: "lavender",
};

export function toneFor(status: string | null | undefined): Tone {
  if (!status) return "default";
  return TONES[status.trim().toUpperCase()] ?? "default";
}

interface StatusBadgeProps extends Omit<React.ComponentProps<typeof Badge>, "variant"> {
  status: string | null | undefined;
  /** Override the label; defaults to the status text. */
  label?: React.ReactNode;
}

export function StatusBadge({ status, label, ...props }: StatusBadgeProps) {
  if (!status && !label) return null;
  return (
    <Badge variant={toneFor(status)} {...props}>
      {label ?? status}
    </Badge>
  );
}
