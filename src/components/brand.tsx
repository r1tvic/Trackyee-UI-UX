import { cn } from "@/lib/utils";

/**
 * Stacked-crates mark — reads as boxes on a shelf at small sizes.
 * Monochrome: the top crate is separated by fill weight, not hue.
 */
export function TrackyeeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("size-8", className)}
    >
      <rect
        x="3"
        y="17"
        width="12"
        height="12"
        rx="3"
        className="fill-foreground/15 stroke-foreground"
        strokeWidth="1.75"
      />
      <rect
        x="17"
        y="17"
        width="12"
        height="12"
        rx="3"
        className="fill-foreground/15 stroke-foreground"
        strokeWidth="1.75"
      />
      <rect
        x="10"
        y="3"
        width="12"
        height="12"
        rx="3"
        className="fill-foreground stroke-foreground"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-[1.35rem] leading-none font-semibold tracking-tight",
        className,
      )}
    >
      Trackyee
    </span>
  );
}
