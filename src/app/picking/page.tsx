"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";

import { Composer } from "@/components/chat/composer";
import { AppShell } from "@/components/shell/app-shell";
import { suggestedPrompts } from "@/lib/mock-data";

export default function PickingDataPage() {
  return (
    <AppShell title="Picking Data" icon={Package} fullBleed>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass glass-edge mb-5 grid size-16 place-items-center rounded-2xl"
        >
          <Package className="text-primary size-7" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="font-display text-3xl font-semibold tracking-tight"
        >
          Trackyee
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="text-muted-foreground mt-1.5 text-sm"
        >
          Upload an Excel file to view your dashboard
        </motion.p>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-8 flex max-w-xl flex-wrap justify-center gap-2"
        >
          {suggestedPrompts.map((prompt) => (
            <li key={prompt}>
              <button
                type="button"
                className="glass glass-edge hover:bg-foreground/[0.07] rounded-full px-3.5 py-2 text-sm transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                {prompt}
              </button>
            </li>
          ))}
        </motion.ul>
      </div>

      <Composer />
    </AppShell>
  );
}
