"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CreditCard, IndianRupee, Lock, Package, Save, Users } from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { AppShell } from "@/components/shell/app-shell";
import { payRates } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function PayrollPage() {
  const [values, setValues] = React.useState(() =>
    Object.fromEntries(payRates.map((r) => [r.id, String(r.value)])),
  );

  return (
    <AppShell title="Payroll" icon={CreditCard} badge="Owner View">
      <div className="mx-auto max-w-5xl space-y-4">
        <section className="glass glass-edge rounded-2xl p-5 sm:p-6">
          <h2 className="font-display flex items-center gap-2 text-lg font-semibold tracking-tight">
            <IndianRupee className="text-primary size-[18px]" />
            Pay rates
          </h2>
          <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
            Pay is calculated per <strong className="text-foreground">unit</strong>{" "}
            (item handled). Each worker can have their own rate — set a default
            here, then override individuals in the table below.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {payRates.map((rate, i) => (
              <motion.div
                key={rate.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className={cn(
                  "glass glass-edge rounded-xl p-4",
                  rate.ownerOnly && "ring-primary/30 ring-1",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="flex items-start gap-2">
                    <span
                      className={cn(
                        "grid size-7 shrink-0 place-items-center rounded-lg",
                        rate.ownerOnly
                          ? "bg-primary/12 text-primary"
                          : "bg-chart-1/12 text-chart-1",
                      )}
                    >
                      {rate.ownerOnly ? (
                        <Lock className="size-3.5" />
                      ) : rate.id === "unit" ? (
                        <Package className="size-3.5" />
                      ) : (
                        <Users className="size-3.5" />
                      )}
                    </span>
                    <span className="text-sm leading-tight font-medium">
                      {rate.label}
                    </span>
                  </span>

                  {rate.ownerOnly && (
                    <span className="bg-primary/12 text-primary ring-primary/25 shrink-0 rounded-full px-2 py-0.5 text-[0.6rem] font-semibold tracking-wide uppercase ring-1">
                      Owner only
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <div className="glass focus-within:ring-ring/50 flex min-w-0 flex-1 items-center gap-1 rounded-lg px-2.5 py-1.5 focus-within:ring-3">
                    <span className="text-muted-foreground shrink-0 text-sm">₹</span>
                    <input
                      value={values[rate.id]}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, [rate.id]: e.target.value }))
                      }
                      inputMode="numeric"
                      aria-label={rate.label}
                      className="tabular w-full min-w-0 bg-transparent text-sm outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-opacity hover:opacity-90",
                      rate.ownerOnly
                        ? "bg-primary text-primary-foreground"
                        : "bg-chart-1 text-white",
                      "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                    )}
                  >
                    <Save className="size-3.5" />
                    Save
                  </button>
                </div>

                <p className="text-muted-foreground mt-2.5 text-xs leading-relaxed">
                  {rate.help}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <EmptyState
          icon={Package}
          title="No picking data uploaded yet"
          hint="Upload an Excel file to see payroll calculations"
        />
      </div>
    </AppShell>
  );
}
