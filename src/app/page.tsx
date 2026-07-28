import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  CreditCard,
  IndianRupee,
  LogIn,
  MessageSquare,
  Package,
  Store,
} from "lucide-react";

import { TrackyeeMark, Wordmark } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";

const screens = [
  { href: "/login", label: "Login", icon: LogIn },
  { href: "/chat/suresh-leave", label: "Chat — with results", icon: MessageSquare },
  { href: "/chat", label: "Chat — empty", icon: MessageSquare },
  { href: "/ecommerce", label: "E-Commerce", icon: Store },
  { href: "/attendance", label: "Attendance", icon: ClipboardList },
  { href: "/picking", label: "Picking Data", icon: Package },
  { href: "/expenses", label: "Expenses", icon: IndianRupee },
  { href: "/payroll", label: "Payroll", icon: CreditCard },
];

/** Index for the template itself — a way into every designed screen. */
export default function Home() {
  return (
    <div className="grain flex min-h-dvh flex-col items-center justify-center p-6">
      <ThemeToggle className="absolute top-5 right-5" />

      <div className="glass-strong glass-edge w-full max-w-2xl rounded-3xl p-8 sm:p-10">
        <div className="mb-6 flex items-center gap-2.5">
          <TrackyeeMark className="size-9" />
          <Wordmark className="text-2xl" />
        </div>

        <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          UI/UX <span className="italic">template</span>
        </h1>
        <p className="text-muted-foreground mt-3 max-w-md">
          A redesigned front end for Trackyee — glass surfaces, mixed type, and
          motion, running on mock data.
        </p>

        <ul className="mt-8 grid gap-2 sm:grid-cols-2">
          {screens.map((screen) => (
            <li key={screen.href}>
              <Link
                href={screen.href}
                className="glass glass-edge group hover:bg-foreground/[0.07] flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <screen.icon className="text-primary size-4 shrink-0" />
                {screen.label}
                <ArrowRight className="ml-auto size-4 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-60" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
