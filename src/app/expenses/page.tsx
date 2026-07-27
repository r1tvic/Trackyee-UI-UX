"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  IndianRupee,
  Receipt,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { StatGrid } from "@/components/chat/stat-grid";
import { EmptyState } from "@/components/empty-state";
import { AppShell } from "@/components/shell/app-shell";
import { expenseSummary } from "@/lib/mock-data";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function ExpensesPage() {
  const { month, expenses, revenue, entries } = expenseSummary;
  const net = revenue - expenses;

  return (
    <AppShell title="Expense Reports" icon={IndianRupee}>
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="flex items-center justify-center gap-2">
          <button
            aria-label="Previous month"
            className="glass hover:bg-foreground/[0.07] rounded-xl p-2 transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="glass glass-edge rounded-xl px-4 py-2 text-sm font-medium">
            {month}
          </span>
          <button
            aria-label="Next month"
            className="glass hover:bg-foreground/[0.07] rounded-xl p-2 transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <StatGrid
          items={[
            { label: "Expenses", value: inr(expenses), tone: "critical", icon: TrendingDown },
            { label: "Revenue", value: inr(revenue), tone: "good", icon: TrendingUp },
            { label: "Profit / loss", value: inr(net), tone: "info", icon: IndianRupee },
            { label: "Entries this month", value: String(entries), tone: "accent", icon: FileText },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="glass glass-edge flex items-center gap-3 rounded-2xl p-4"
        >
          <span className="bg-chart-1/12 text-chart-1 grid size-10 shrink-0 place-items-center rounded-xl">
            <TrendingUp className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold">
              Net {net >= 0 ? "profit" : "loss"} of {inr(Math.abs(net))}
            </span>
            <span className="text-muted-foreground block text-xs">
              {month} — revenue {inr(revenue)} minus expenses {inr(expenses)}
            </span>
          </span>
        </motion.div>

        <EmptyState
          icon={Receipt}
          title={`No expense data for ${month}`}
          hint="Expenses are recorded by the admin"
        />
      </div>
    </AppShell>
  );
}
