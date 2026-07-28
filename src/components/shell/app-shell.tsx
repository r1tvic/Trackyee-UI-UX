"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, type LucideIcon } from "lucide-react";

import { Sidebar } from "@/components/shell/sidebar";
import { useSidebarCollapsed } from "@/components/shell/use-sidebar";
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
  const { collapsed, setCollapsed } = useSidebarCollapsed();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="flex h-dvh gap-3 overflow-hidden p-3">
      {/* Desktop sidebar. When collapsed the whole rail is the expand target;
          children stop propagation so links still just navigate. */}
      <aside
        onClick={collapsed ? () => setCollapsed(false) : undefined}
        role={collapsed ? "button" : undefined}
        tabIndex={collapsed ? 0 : undefined}
        aria-label={collapsed ? "Expand sidebar" : undefined}
        onKeyDown={
          collapsed
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setCollapsed(false);
                }
              }
            : undefined
        }
        className={cn(
          "liquid-glass sidebar-rail z-20 hidden shrink-0 overflow-hidden rounded-2xl lg:block",
          collapsed && "hover:bg-foreground/[0.04] cursor-e-resize",
        )}
      >
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </aside>

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
              className="liquid-glass-strong fixed inset-y-0 left-0 z-50 w-[280px] lg:hidden"
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

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {/* Rounded panel rather than a full-bleed bar — a square-cornered
            header butted against the rounded sidebar read as a mistake. */}
        <header className="liquid-glass flex shrink-0 items-center gap-2.5 rounded-2xl px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="text-muted-foreground hover:text-foreground rounded-md p-1.5 transition-colors lg:hidden"
          >
            <Menu className="size-4" />
          </button>

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
            fullBleed
              ? "flex flex-col overflow-hidden"
              : "overflow-y-auto pb-1",
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
