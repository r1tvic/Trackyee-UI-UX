"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Store, Warehouse } from "lucide-react";

import { AppShell } from "@/components/shell/app-shell";
import { warehouses } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function ECommercePage() {
  const [active, setActive] = React.useState(
    warehouses.find((w) => w.active)?.id ?? warehouses[0].id,
  );

  return (
    <AppShell title="E-Commerce" icon={Store} badge="Owner">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Warehouses
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Select a warehouse to manage. The entire app then shows only that
          warehouse&apos;s data.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {warehouses.map((warehouse, i) => {
            const isActive = warehouse.id === active;
            return (
              <motion.button
                key={warehouse.id}
                type="button"
                onClick={() => setActive(warehouse.id)}
                aria-pressed={isActive}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                whileHover={{ y: -3 }}
                className={cn(
                  "glass glass-edge rounded-2xl p-5 text-left transition-shadow hover:shadow-lg",
                  "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                  isActive && "ring-foreground/35 ring-2",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "grid size-10 place-items-center rounded-xl transition-colors",
                      isActive
                        ? "bg-foreground text-background"
                        : "bg-foreground/8 text-muted-foreground",
                    )}
                  >
                    <Warehouse className="size-5" />
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="warehouse-active"
                      className="bg-foreground text-background inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
                    >
                      <Check className="size-3" />
                      Active
                    </motion.span>
                  )}
                </div>

                <p className="mt-4 text-lg font-semibold">{warehouse.name}</p>
                <p className="text-muted-foreground mt-0.5 text-sm">
                  {isActive
                    ? "Currently managing this warehouse"
                    : "Click to switch to this warehouse"}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
