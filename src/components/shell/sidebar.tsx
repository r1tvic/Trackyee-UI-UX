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

  return (
    <div className="flex h-full flex-col gap-4 p-3">
      <div className="flex items-center justify-between gap-2 px-1">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-lg focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <TrackyeeMark className="size-6 shrink-0" />
          {!collapsed && <Wordmark className="text-lg" />}
        </Link>

        {!collapsed && (
          <button
            type="button"
            onClick={onToggle}
            aria-label="Collapse sidebar"
            className="text-muted-foreground hover:text-foreground hidden rounded-md p-1 transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none lg:block"
          >
            <ChevronLeft className="size-4" />
          </button>
        )}
      </div>

      <Link
        href="/chat"
        onClick={onNavigate}
        className={cn(
          "glass glass-edge flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium",
          "hover:bg-foreground/[0.07] transition-colors",
          "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
          collapsed && "justify-center px-0",
        )}
      >
        <Plus className="size-4 shrink-0" />
        {!collapsed && "New Chat"}
      </Link>

      <nav className="flex flex-col gap-0.5">
        {!collapsed && (
          <p className="text-muted-foreground/70 px-3 pb-1.5 text-[0.68rem] font-semibold tracking-widest uppercase">
            Modules
          </p>
        )}
        {modules.map((entry) => {
          const active = pathname === entry.href;
          return (
            <Link
              key={entry.href}
              href={entry.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              title={collapsed ? entry.label : undefined}
              className={cn(
                "relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
                collapsed && "justify-center px-0",
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
              {!collapsed && <span className="relative">{entry.label}</span>}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="min-h-0 flex-1 overflow-y-auto">
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
                    onClick={onNavigate}
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
      )}

      <div
        className={cn(
          "glass mt-auto flex items-center gap-2.5 rounded-xl p-2.5",
          collapsed && "justify-center",
        )}
      >
        <span className="bg-accent/15 text-accent grid size-8 shrink-0 place-items-center rounded-full">
          <Eye className="size-4" />
        </span>
        {!collapsed && (
          <>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-medium">Owner</span>
              <span className="text-muted-foreground block font-mono text-xs">
                {TENANT}
              </span>
            </span>
            <Link
              href="/login"
              aria-label="Log out"
              className="text-muted-foreground hover:text-destructive ml-auto rounded-md p-1.5 transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <LogOut className="size-4" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

/** Rail shown when the sidebar is collapsed on desktop. */
export function SidebarExpandButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Expand sidebar"
      className="text-muted-foreground hover:text-foreground rounded-md p-1.5 transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <PanelLeft className="size-4" />
    </button>
  );
}

export { AnimatePresence };
