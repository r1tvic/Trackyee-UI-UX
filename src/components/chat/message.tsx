"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

import { TrackyeeMark } from "@/components/brand";

export function UserMessage({
  children,
  at,
}: {
  children: React.ReactNode;
  at: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-end gap-1"
    >
      <div className="flex items-center gap-2.5">
        <p className="glass glass-edge max-w-[min(38rem,80vw)] rounded-2xl px-4 py-2.5 text-sm">
          {children}
        </p>
        <span className="bg-foreground text-background grid size-8 shrink-0 place-items-center rounded-full">
          <User className="size-4" />
        </span>
      </div>
      <span className="text-muted-foreground/70 mr-11 text-xs">{at}</span>
    </motion.div>
  );
}

export function AssistantMessage({
  intro,
  at,
  children,
}: {
  intro: string;
  at: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex gap-2.5"
    >
      <span className="glass grid size-8 shrink-0 place-items-center rounded-full">
        <TrackyeeMark className="size-4" />
      </span>

      <div className="min-w-0 flex-1 space-y-3">
        <p className="text-sm">{intro}</p>
        {children}
        <p className="text-muted-foreground/70 text-xs">{at}</p>
      </div>
    </motion.div>
  );
}
