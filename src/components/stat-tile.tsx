"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Sparkline } from "@/components/sparkline";
import type { StatTile as StatTileData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/**
 * A single headline number — the right form for one current value plus a
 * trend, rather than a one-bar bar chart.
 */
export function StatTile({
  stat,
  index = 0,
}: {
  stat: StatTileData;
  index?: number;
}) {
  const rising = stat.delta >= 0;
  // "Good" depends on the metric, not the direction: low stock climbing is bad.
  const isGood = rising === stat.higherIsBetter;
  const DeltaIcon = rising ? ArrowUpRight : ArrowDownRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -3 }}
      className="glass glass-edge group rounded-2xl p-5 transition-shadow hover:shadow-lg"
    >
      <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>

      <div className="mt-2 flex items-end justify-between gap-3">
        <span className="text-3xl leading-none font-semibold tracking-tight">
          {stat.value.toLocaleString()}
        </span>
        <Sparkline
          data={stat.trend}
          stroke={isGood ? "var(--chart-1)" : "var(--status-serious)"}
          className="opacity-80 transition-opacity group-hover:opacity-100"
        />
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs">
        <span
          className={cn(
            "inline-flex items-center gap-0.5 font-medium",
            isGood ? "text-status-good" : "text-status-serious",
          )}
        >
          <DeltaIcon className="size-3.5" aria-hidden />
          {Math.abs(stat.delta).toFixed(1)}%
        </span>
        <span className="text-muted-foreground">vs last week</span>
      </div>
    </motion.div>
  );
}
