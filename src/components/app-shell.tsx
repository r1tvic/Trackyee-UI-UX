"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  Search,
  Settings,
  Truck,
  Warehouse,
} from "lucide-react";

import { TrackyeeMark, Wordmark } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", active: true },
  { label: "Inventory", icon: Boxes, href: "#" },
  { label: "Shipments", icon: Truck, href: "#" },
  { label: "Warehouses", icon: Warehouse, href: "#" },
  { label: "Reports", icon: BarChart3, href: "#" },
  { label: "Settings", icon: Settings, href: "#" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grain flex min-h-dvh">
      {/* Rail collapses to icons on md, hides entirely on mobile. */}
      <aside className="glass sticky top-0 hidden h-dvh shrink-0 flex-col gap-1 rounded-r-3xl p-3 md:flex lg:w-60 lg:p-4">
        <Link
          href="/"
          className="mb-6 flex items-center gap-2.5 rounded-lg px-2 py-1 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <TrackyeeMark className="size-7 shrink-0" />
          <Wordmark className="hidden lg:inline" />
        </Link>

        <nav className="flex flex-col gap-1">
          {nav.map((entry) => (
            <Link
              key={entry.label}
              href={entry.href}
              aria-current={entry.active ? "page" : undefined}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                entry.active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
              )}
            >
              {entry.active && (
                <motion.span
                  layoutId="nav-active"
                  className="bg-primary/12 absolute inset-0 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <entry.icon className="relative size-[18px] shrink-0" />
              <span className="relative hidden lg:inline">{entry.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 md:hidden">
            <TrackyeeMark className="size-7" />
          </Link>

          <div className="glass glass-edge relative flex h-10 max-w-md flex-1 items-center rounded-full px-4">
            <Search className="text-muted-foreground size-4 shrink-0" aria-hidden />
            <input
              type="search"
              placeholder="Search SKUs, shipments, locations…"
              aria-label="Search"
              className="placeholder:text-muted-foreground ml-2.5 w-full bg-transparent text-sm outline-none"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <span
              className="glass grid size-10 shrink-0 place-items-center rounded-full text-sm font-semibold"
              title="Madhan R.A."
            >
              MR
            </span>
          </div>
        </header>

        <main className="flex-1 px-4 pb-10 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
