"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  // Theme isn't known until after hydration; render a placeholder so the
  // button doesn't flash the wrong icon. useSyncExternalStore gives a
  // false-on-server/true-on-client flag without a setState-in-effect cascade.
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} theme`
          : "Toggle theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "liquid-glass relative grid size-10 place-items-center overflow-hidden rounded-full",
        "text-foreground/70 transition-colors hover:text-foreground",
        "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mounted ? (isDark ? "moon" : "sun") : "placeholder"}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="grid place-items-center"
        >
          {mounted && isDark ? (
            <Moon className="size-[18px]" />
          ) : (
            <Sun className="size-[18px]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
