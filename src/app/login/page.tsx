"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  TrendingUp,
  Truck,
} from "lucide-react";

import { TrackyeeMark, Wordmark } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const floatingChips = [
  {
    icon: Truck,
    label: "In transit",
    value: "318",
    className: "left-[4%] top-[18%]",
    delay: 0,
  },
  {
    icon: Boxes,
    label: "Active SKUs",
    value: "12,480",
    className: "right-[6%] top-[34%]",
    delay: 0.8,
  },
  {
    icon: TrendingUp,
    label: "Fulfilled today",
    value: "1,962",
    className: "left-[12%] bottom-[16%]",
    delay: 1.6,
  },
];

export default function LoginPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  // Template only — there is no auth backend wired up here.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => router.push("/dashboard"), 900);
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
    <div className="grain relative flex min-h-dvh flex-col lg:flex-row">
      <ThemeToggle className="absolute top-5 right-5 z-20" />

      {/* Brand panel — decorative, so it drops out entirely on small screens. */}
      <aside className="relative hidden flex-1 overflow-hidden lg:block">
        <div className="relative flex h-full flex-col justify-between p-12 xl:p-16">
          <Link
            href="/"
            className="flex w-fit items-center gap-2.5 rounded-lg focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <TrackyeeMark />
            <Wordmark />
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg"
          >
            <h1 className="font-display text-5xl leading-[1.05] font-semibold tracking-tight xl:text-6xl">
              Every pallet,
              <br />
              <span className="text-primary italic">accounted for.</span>
            </h1>
            <p className="text-muted-foreground mt-6 max-w-md text-lg leading-relaxed">
              Real-time visibility across inbound, outbound, and everything
              parked on a shelf in between.
            </p>
          </motion.div>

          <p className="text-muted-foreground/70 font-mono text-xs">
            © {new Date().getFullYear()} Trackyee — Warehouse Tracker
          </p>

          {floatingChips.map((chip) => (
            <motion.div
              key={chip.label}
              aria-hidden
              className={`glass glass-edge absolute hidden items-center gap-3 rounded-2xl px-4 py-3 xl:flex ${chip.className}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                reduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: 1, y: [0, -12, 0] }
              }
              transition={
                reduceMotion
                  ? { duration: 0.4 }
                  : {
                      opacity: { duration: 0.6, delay: 0.4 + chip.delay * 0.2 },
                      scale: { duration: 0.6, delay: 0.4 + chip.delay * 0.2 },
                      y: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: chip.delay,
                      },
                    }
              }
            >
              <span className="bg-primary/12 text-primary grid size-9 place-items-center rounded-xl">
                <chip.icon className="size-[18px]" />
              </span>
              <span className="leading-tight">
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
      <main className="flex flex-1 items-center justify-center p-6 sm:p-10 lg:max-w-[560px]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="glass-strong glass-edge w-full max-w-md rounded-3xl p-8 sm:p-10"
        >
          <motion.div variants={item} className="lg:hidden">
            <Link href="/" className="mb-8 flex w-fit items-center gap-2.5">
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
                  className="bg-background/40 h-12 rounded-xl pl-10 text-base"
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
                  className="bg-background/40 h-12 rounded-xl pr-11 pl-10 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 rounded p-1 transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
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
