"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

/** The live app spends a lot of time pre-upload, so empty states carry weight. */
export function EmptyState({
  icon: Icon,
  title,
  hint,
}: {
  icon: LucideIcon;
  title: string;
  hint?: string;
}) {
  return (
    <div className="glass glass-edge grid place-items-center rounded-2xl px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="bg-foreground/5 text-muted-foreground mx-auto mb-4 grid size-14 place-items-center rounded-2xl">
          <Icon className="size-6" />
        </span>
        <p className="font-medium">{title}</p>
        {hint && (
          <p className="text-muted-foreground mt-1 text-sm">{hint}</p>
        )}
      </motion.div>
    </div>
  );
}
