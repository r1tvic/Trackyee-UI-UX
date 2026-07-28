"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ClipboardList,
  CreditCard,
  Eye,
  IndianRupee,
  LogOut,
  MessageSquare,
  Package,
  PanelLeft,
  Plus,
  Store,
  type LucideIcon,
} from "lucide-react";

import { TrackyeeMark, Wordmark } from "@/components/brand";
import { chatHistory, TENANT } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type NavItem = { label: string; icon: LucideIcon; href: string };

const modules: NavItem[] = [
  { label: "E-Commerce", icon: Store, href: "/ecommerce" },
  { label: "Attendance", icon: ClipboardList, href: "/attendance" },
  { label: "Picking Data", icon: Package, href: "/picking" },
  { label: "Expenses", icon: IndianRupee, href: "/expenses" },
  { label: "Payroll", icon: CreditCard, href: "/payroll" },
];

export function Sidebar({
  collapsed,
  onToggle,
  onNavigate,
}: {
  collapsed: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  /**
   * When collapsed, the whole rail is a click target that expands it. Every
   * interactive child stops the click from reaching that handler, so following
   * a link navigates without also springing the sidebar open — which is the
   * behaviour that made collapsing feel broken before.
   */
  function handleItemClick(event: React.MouseEvent) {
    if (collapsed) event.stopPropagation();
    onNavigate?.();
  }

  return (
    <div className="flex h-full flex-col gap-4 p-3">
      <div className="sidebar-header flex items-center justify-between gap-2 px-1">
        {/* Not "/" — that's the login redirect now, so the brand would have
            thrown you out of the app. */}
        <Link
          href="/chat"
          onClick={handleItemClick}
          className="flex items-center gap-2 rounded-lg focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <TrackyeeMark className="size-6 shrink-0" />
          <Wordmark className="sidebar-label text-lg" />
        </Link>

        {/* Always rendered so there is a real control in both states — the
            click-anywhere behaviour on the rail is a convenience, not the
            only way back. */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          className="text-muted-foreground hover:text-foreground hover:bg-foreground/8 hidden shrink-0 rounded-md p-1 transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none lg:block"
        >
          {collapsed ? (
            <PanelLeft className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
        </button>
      </div>

      <Link
        href="/chat"
        onClick={handleItemClick}
        className={cn(
          "liquid-glass sidebar-center-when-collapsed flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium",
          "hover:bg-foreground/[0.07] transition-colors",
          "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        )}
      >
        <Plus className="size-4 shrink-0" />
        <span className="sidebar-label">New Chat</span>
      </Link>

      <nav className="flex flex-col gap-0.5">
        <p className="text-muted-foreground/70 sidebar-label px-3 pb-1.5 text-[0.68rem] font-semibold tracking-widest uppercase">
          Modules
        </p>
        {modules.map((entry) => {
          const active = pathname === entry.href;
          return (
            <Link
              key={entry.href}
              href={entry.href}
              onClick={handleItemClick}
              aria-current={active ? "page" : undefined}
              title={collapsed ? entry.label : undefined}
              className={cn(
                "sidebar-center-when-collapsed relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="bg-primary/12 ring-primary/25 absolute inset-0 rounded-xl ring-1"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <entry.icon className="relative size-[18px] shrink-0" />
              <span className="sidebar-label relative">{entry.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* History is text-only, so it's hidden wholesale rather than squeezed
          into the 68px rail. aria-hidden keeps it out of the a11y tree too. */}
      <div
        className="sidebar-label min-h-0 flex-1 overflow-y-auto"
        aria-hidden={collapsed}
      >
        <p className="text-muted-foreground/70 px-3 pb-1 text-[0.68rem] font-semibold tracking-widest uppercase">
          History
        </p>
        <p className="text-muted-foreground/50 px-3 pb-1.5 text-xs">Older</p>
          <ul className="flex flex-col gap-0.5">
            {chatHistory.map((thread) => {
              const href = `/chat/${thread.id}`;
              const active = pathname === href;
              return (
                <li key={thread.id}>
                  <Link
                    href={href}
                    onClick={handleItemClick}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors",
                      "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                      active
                        ? "bg-foreground/[0.07] text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
                    )}
                  >
                    <MessageSquare className="size-4 shrink-0" />
                    <span className="truncate">{thread.title}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="liquid-glass sidebar-center-when-collapsed mt-auto flex items-center gap-2.5 rounded-xl p-2.5">
        <span className="bg-foreground text-background grid size-8 shrink-0 place-items-center rounded-full">
          <Eye className="size-4" />
        </span>
        <span className="sidebar-label min-w-0 leading-tight">
          <span className="block truncate text-sm font-medium">Owner</span>
          <span className="text-muted-foreground block font-mono text-xs">
            {TENANT}
          </span>
        </span>
        <Link
          href="/login"
          onClick={handleItemClick}
          aria-label="Log out"
          aria-hidden={collapsed}
          tabIndex={collapsed ? -1 : undefined}
          className="text-muted-foreground hover:text-destructive sidebar-label ml-auto rounded-md p-1.5 transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <LogOut className="size-4" />
        </Link>
      </div>
    </div>
  );
}

export { AnimatePresence };
