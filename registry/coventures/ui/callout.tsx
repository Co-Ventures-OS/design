import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Brand callouts: a short aside on a pastel block, ink text, optional icon
// and title. Same three tones as Badge so a tone means the same thing
// everywhere:
//   peach     – attention: a caveat, a deadline, something to check
//   lavender  – context: background, what an agent did, why this is here
//   lime      – good news: done, confirmed, a tip that saves time
//   default   – neutral aside on a muted fill
// Not for errors; ErrorState / Alert destructive own those.
const calloutVariants = cva(
  "group/callout relative grid w-full gap-0.5 rounded-lg px-4 py-3 text-left text-sm text-foreground has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-muted",
        peach: "bg-brand-peach",
        lavender: "bg-brand-lavender",
        lime: "bg-brand-lime",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Callout({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof calloutVariants>) {
  return (
    <div
      data-slot="callout"
      data-variant={variant}
      role="note"
      className={cn(calloutVariants({ variant }), className)}
      {...props}
    />
  )
}

function CalloutTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="callout-title"
      className={cn("font-medium leading-snug", className)}
      {...props}
    />
  )
}

function CalloutDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="callout-description"
      className={cn("leading-relaxed text-foreground/80 [&_a]:underline [&_a]:underline-offset-2 [&_p:not(:last-child)]:mb-1", className)}
      {...props}
    />
  )
}

export { Callout, CalloutTitle, CalloutDescription, calloutVariants }
