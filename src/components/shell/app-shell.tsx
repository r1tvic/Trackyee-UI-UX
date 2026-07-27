"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, type LucideIcon } from "lucide-react";

import { Sidebar, SidebarExpandButton } from "@/components/shell/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function AppShell({
  title,
  icon: Icon,
  badge,
  /** Chat fills the viewport and scrolls internally; modules scroll the page. */
  fullBleed = false,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  badge?: string;
  fullBleed?: boolean;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="grain flex h-dvh overflow-hidden">
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 68 : 268 }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className="glass z-20 hidden shrink-0 rounded-r-2xl lg:block"
      >
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(true)} />
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="glass-strong fixed inset-y-0 left-0 z-50 w-[280px] lg:hidden"
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="text-muted-foreground hover:text-foreground absolute top-4 right-3 z-10 rounded-md p-1"
              >
                <X className="size-4" />
              </button>
              <Sidebar
                collapsed={false}
                onToggle={() => setMobileOpen(false)}
                onNavigate={() => setMobileOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-border/60 flex shrink-0 items-center gap-2.5 border-b px-4 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="text-muted-foreground hover:text-foreground rounded-md p-1.5 transition-colors lg:hidden"
          >
            <Menu className="size-4" />
          </button>

          {collapsed && (
            <span className="hidden lg:block">
              <SidebarExpandButton onClick={() => setCollapsed(false)} />
            </span>
          )}

          {Icon && <Icon className="text-primary size-[18px] shrink-0" />}
          <h1 className="font-display truncate text-lg font-semibold tracking-tight">
            {title}
          </h1>
          {badge && (
            <span className="bg-primary/12 text-primary ring-primary/25 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1">
              {badge}
            </span>
          )}

          <ThemeToggle className="ml-auto size-9 shrink-0" />
        </header>

        <main
          className={cn(
            "min-h-0 flex-1",
            fullBleed ? "flex flex-col overflow-hidden" : "overflow-y-auto p-4 sm:p-6",
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
