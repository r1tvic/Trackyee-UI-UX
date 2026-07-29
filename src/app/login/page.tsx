"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Clock,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Moon,
  Package,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import { TrackyeeMark, Wordmark } from "@/components/brand";
import { SoundToggle } from "@/components/sound-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSoundEnabled, useUiSounds } from "@/lib/ui-sound";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Decorative stat chips scattered behind the brand copy.
 *
 * Positions, drift distance, duration and delay are all hand-picked rather
 * than generated: random values would differ between the server and client
 * render and trip hydration. Durations are deliberately co-prime-ish (5.4s,
 * 7.1s, 6.3s…) so the chips never fall into visible lockstep.
 */
const floatingChips = [
  { icon: Users, label: "Present today", value: "14 / 15",
    pos: { top: "8%", left: "5%" }, drift: -14, duration: 6.4, delay: 0, tilt: -2 },
  { icon: Boxes, label: "Picks this month", value: "33,612",
    pos: { top: "9%", left: "58%" }, drift: -10, duration: 7.1, delay: 0.9, tilt: 1.5 },
  { icon: TrendingUp, label: "Avg picks / hour", value: "10.4",
    pos: { bottom: "10%", left: "6%" }, drift: -16, duration: 5.8, delay: 1.7, tilt: 2 },
  { icon: Moon, label: "Night shift", value: "4",
    pos: { top: "22%", right: "8%" }, drift: -9, duration: 8.2, delay: 0.4, tilt: -1.5 },
  { icon: Clock, label: "Overtime", value: "128 hrs",
    pos: { top: "31%", right: "4%" }, drift: -13, duration: 6.9, delay: 2.3, tilt: 2.5 },
  { icon: Package, label: "Units moved", value: "2,053",
    pos: { bottom: "8%", left: "56%" }, drift: -11, duration: 5.4, delay: 1.2, tilt: -2.5 },
  { icon: Zap, label: "Peak hour", value: "21:00",
    pos: { bottom: "22%", right: "13%" }, drift: -15, duration: 7.6, delay: 2.9, tilt: 1 },
];

export default function LoginPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  // Login sits outside AppShell, so it wires up sound itself — and ships the
  // mute control with it rather than leaving the first screen uncontrollable.
  const { enabled: soundEnabled } = useSoundEnabled();
  useUiSounds(soundEnabled);

  // Template only — there is no auth backend wired up here.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => router.push("/chat/suresh-leave"), 900);
  }

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <div className="relative flex min-h-dvh flex-col lg:flex-row">
      <span className="absolute top-5 right-5 z-20 flex items-center gap-1.5">
        <SoundToggle className="size-11 sm:size-9" />
        <ThemeToggle className="size-11 sm:size-9" />
      </span>

      {/* Brand panel — decorative, so it drops out entirely on small screens. */}
      <aside className="relative hidden flex-1 overflow-hidden lg:block">
        <div className="relative flex h-full flex-col p-12 xl:p-16">
          {/* Back to the screen index — "/" redirects here, so it would just
              reload the page. */}
          <Link
            href="/screens"
            className="flex w-fit items-center gap-2.5 rounded-lg focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <TrackyeeMark />
            <Wordmark />
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-w-xl flex-1 flex-col justify-center text-left"
          >
            <h1 className="font-display text-6xl leading-[1.02] font-semibold tracking-tight xl:text-7xl 2xl:text-8xl">
              Every shift,
              <br />
              <span className="italic">accounted for.</span>
            </h1>
            <p className="text-muted-foreground mt-8 max-w-md text-lg leading-relaxed">
              Attendance, picking rates and payroll across your warehouses —
              just ask for it.
            </p>
          </motion.div>

          <p className="text-muted-foreground/70 font-mono text-xs">
            © {new Date().getFullYear()} Trackyee — Warehouse Tracker
          </p>

          {floatingChips.map((chip) => (
            <motion.div
              key={chip.label}
              aria-hidden
              style={{ ...chip.pos, rotate: chip.tilt }}
              className="liquid-glass pointer-events-none absolute hidden items-center gap-3 rounded-2xl px-4 py-3 xl:flex"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                reduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: 1, y: [0, chip.drift, 0] }
              }
              transition={
                reduceMotion
                  ? { duration: 0.4 }
                  : {
                      opacity: { duration: 0.6, delay: 0.3 + chip.delay * 0.15 },
                      scale: { duration: 0.6, delay: 0.3 + chip.delay * 0.15 },
                      y: {
                        duration: chip.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: chip.delay,
                      },
                    }
              }
            >
              <span className="bg-primary/12 text-primary grid size-9 shrink-0 place-items-center rounded-xl">
                <chip.icon className="size-[18px]" />
              </span>
              <span className="leading-tight whitespace-nowrap">
                <span className="text-muted-foreground block text-xs">
                  {chip.label}
                </span>
                <span className="block text-base font-semibold">
                  {chip.value}
                </span>
              </span>
            </motion.div>
          ))}
        </div>
      </aside>

      {/* Form panel */}
      <main className="flex flex-1 items-center justify-center p-6 sm:p-10 lg:max-w-[35rem] lg:pl-8 lg:pr-16 xl:pr-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="liquid-glass-strong w-full max-w-md rounded-3xl p-8 sm:p-10"
        >
          <motion.div variants={item} className="lg:hidden">
            <Link href="/screens" className="mb-8 flex w-fit items-center gap-2.5">
              <TrackyeeMark />
              <Wordmark />
            </Link>
          </motion.div>

          <motion.h2
            variants={item}
            className="font-display text-4xl font-semibold tracking-tight"
          >
            Welcome Back
          </motion.h2>
          <motion.p variants={item} className="text-muted-foreground mt-2">
            Sign in to your Trackyee account
          </motion.p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <motion.div variants={item} className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className="bg-background/40 h-12 rounded-xl pl-10 text-[16px] md:text-base"
                />
              </div>
            </motion.div>

            <motion.div variants={item} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary rounded text-xs transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  className="bg-background/40 h-12 rounded-xl pr-11 pl-10 text-[16px] md:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-1 grid size-11 -translate-y-1/2 place-items-center rounded transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:right-2 sm:size-9"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <Button
                type="submit"
                disabled={submitting}
                className="group h-12 w-full rounded-xl text-base shadow-lg shadow-primary/20"
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          <motion.p
            variants={item}
            className="text-muted-foreground mt-8 text-center text-sm"
          >
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              className="text-primary rounded font-medium hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Contact your admin
            </Link>
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
}
