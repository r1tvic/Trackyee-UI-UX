import Link from "next/link";
import { ArrowRight, LayoutDashboard, LogIn } from "lucide-react";

import { TrackyeeMark, Wordmark } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

/** Index for the template itself — a way into the two designed screens. */
export default function Home() {
  return (
    <div className="grain flex min-h-dvh flex-col items-center justify-center p-6">
      <ThemeToggle className="absolute top-5 right-5" />

      <div className="glass-strong glass-edge w-full max-w-xl rounded-3xl p-8 text-center sm:p-12">
        <div className="mb-6 flex items-center justify-center gap-2.5">
          <TrackyeeMark className="size-9" />
          <Wordmark className="text-2xl" />
        </div>

        <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          UI/UX <span className="text-primary italic">template</span>
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-md">
          A redesigned front end for Trackyee — glass surfaces, mixed type, and
          motion, running on mock data.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            render={<Link href="/login" />}
            nativeButton={false}
            className="group h-11 rounded-xl px-5 text-base"
          >
            <LogIn />
            Login screen
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            variant="outline"
            render={<Link href="/dashboard" />}
            nativeButton={false}
            className="h-11 rounded-xl px-5 text-base"
          >
            <LayoutDashboard />
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
