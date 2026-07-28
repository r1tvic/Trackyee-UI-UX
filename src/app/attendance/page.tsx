"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Percent,
  Users,
} from "lucide-react";

import { StatGrid } from "@/components/chat/stat-grid";
import { AppShell } from "@/components/shell/app-shell";
import { workers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const tabs = ["Daily", "Monthly", "Workers"] as const;

export default function AttendancePage() {
  const [tab, setTab] = React.useState<(typeof tabs)[number]>("Daily");

  return (
    <AppShell title="Attendance Reports" icon={ClipboardList}>
      <div className="mx-auto max-w-6xl space-y-5">
        <div
          role="tablist"
          aria-label="Attendance view"
          className="liquid-glass grid grid-cols-3 gap-1 rounded-2xl p-1"
        >
          {tabs.map((entry) => (
            <button
              key={entry}
              role="tab"
              aria-selected={tab === entry}
              onClick={() => setTab(entry)}
              className={cn(
                "relative rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                tab === entry
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab === entry && (
                <motion.span
                  layoutId="attendance-tab"
                  className="bg-primary/12 ring-primary/25 absolute inset-0 rounded-xl ring-1"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{entry}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            aria-label="Previous day"
            className="glass hover:bg-foreground/[0.07] rounded-xl p-2 transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="liquid-glass tabular rounded-xl px-4 py-2 text-sm font-medium">
            28 / 07 / 2026
          </span>
          <button
            aria-label="Next day"
            className="glass hover:bg-foreground/[0.07] rounded-xl p-2 transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <StatGrid
          items={[
            { label: "Attendance", value: "0%", icon: Percent, emphasis: true },
            { label: "Total", value: String(workers.length), icon: Users },
            { label: "Present", value: "0", icon: CheckCircle2 },
            { label: "Paid leave", value: "0", icon: Calendar },
            { label: "Absent", value: "0", icon: AlertTriangle },
          ]}
          className="lg:grid-cols-5"
        />

        <section aria-label="Worker status">
          <h2 className="text-muted-foreground/70 mb-2 px-1 text-[0.68rem] font-semibold tracking-widest uppercase">
            Worker status
          </h2>

          {/* Animated once as a list, not 15 times. Each row is a blurred
              surface, and staggering them meant 15 concurrent backdrop
              recomposites. */}
          <motion.ul
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-1.5"
          >
            {workers.map((worker) => (
              <li
                key={worker.id}
                className="liquid-glass hover:bg-foreground/[0.05] flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors"
              >
                <span className="min-w-0 flex-1 truncate text-sm font-medium">
                  {worker.name}
                </span>
                <span className="text-muted-foreground shrink-0 font-mono text-xs">
                  {worker.id}
                </span>
                <span className="text-muted-foreground bg-foreground/5 hidden shrink-0 rounded-md px-2 py-0.5 text-xs sm:inline">
                  {worker.shift}
                </span>
                <span className="bg-foreground/8 text-muted-foreground shrink-0 rounded-full px-2.5 py-1 text-xs">
                  Unmarked
                </span>
              </li>
            ))}
          </motion.ul>
        </section>
      </div>
    </AppShell>
  );
}
