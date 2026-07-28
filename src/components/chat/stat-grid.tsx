"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type StatItem = {
  label: string;
  value: string;
  icon: LucideIcon;
  /** Promotes one tile in a group — use for the number the reader came for. */
  emphasis?: boolean;
};

/**
 * On a monochrome palette there is no tone channel, so every tile gets the
 * same ink and meaning rests on the label and icon. That is deliberate:
 * varying the grey per tile would imply an encoding that isn't there.
 */
export function StatGrid({
  items,
  className,
}: {
  items: StatItem[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.04 }}
          className={cn(
            "glass glass-edge rounded-xl p-3",
            item.emphasis && "ring-foreground/15 ring-1",
          )}
        >
          <div className="flex items-start gap-2">
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-lg",
                item.emphasis
                  ? "bg-foreground text-background"
                  : "bg-foreground/8 text-muted-foreground",
              )}
            >
              <item.icon className="size-3.5" aria-hidden />
            </span>
            <span className="text-muted-foreground min-w-0 truncate text-[0.7rem] leading-tight">
              {item.label}
            </span>
          </div>
          <p className="mt-2 text-xl leading-none font-semibold tracking-tight">
            {item.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
