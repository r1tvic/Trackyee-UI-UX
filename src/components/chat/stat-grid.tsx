"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type Tone = "good" | "info" | "critical" | "warning" | "accent" | "neutral";

/**
 * Tone drives an icon chip, not the number's meaning on its own — each tile
 * always carries its label, so color is a redundant channel.
 */
const tones: Record<Tone, { chip: string; value: string }> = {
  good: { chip: "bg-status-good/12 text-status-good", value: "text-status-good" },
  info: { chip: "bg-chart-1/12 text-chart-1", value: "text-chart-1" },
  critical: { chip: "bg-status-critical/12 text-status-critical", value: "text-status-critical" },
  warning: { chip: "bg-status-warning/12 text-status-warning", value: "text-status-warning" },
  accent: { chip: "bg-primary/12 text-primary", value: "text-primary" },
  neutral: { chip: "bg-foreground/8 text-muted-foreground", value: "text-foreground" },
};

export type StatItem = {
  label: string;
  value: string;
  tone: Tone;
  icon: LucideIcon;
};

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
      {items.map((item, i) => {
        const tone = tones[item.tone];
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="glass glass-edge rounded-xl p-3"
          >
            <div className="flex items-start gap-2">
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-lg",
                  tone.chip,
                )}
              >
                <item.icon className="size-3.5" aria-hidden />
              </span>
              <span className="text-muted-foreground min-w-0 truncate text-[0.7rem] leading-tight">
                {item.label}
              </span>
            </div>
            <p
              className={cn(
                "mt-2 text-xl leading-none font-semibold tracking-tight",
                tone.value,
              )}
            >
              {item.value}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
