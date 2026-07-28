"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

import { unlockAudio, useSoundEnabled } from "@/lib/ui-sound";
import { cn } from "@/lib/utils";

export function SoundToggle({ className }: { className?: string }) {
  const { enabled, setEnabled } = useSoundEnabled();

  // Rendered state depends on localStorage, so hold the server markup until
  // hydration to keep the two in agreement.
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const on = mounted && enabled;

  return (
    <button
      type="button"
      aria-label={on ? "Mute interface sounds" : "Unmute interface sounds"}
      aria-pressed={on}
      onClick={() => {
        // This click is the user gesture the browser wants before audio may
        // start, so unlock here rather than waiting for the next hover.
        unlockAudio();
        setEnabled(!enabled);
      }}
      className={cn(
        "liquid-glass text-muted-foreground hover:text-foreground relative grid size-9 place-items-center overflow-hidden rounded-full transition-colors",
        "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={on ? "on" : "off"}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="grid place-items-center"
        >
          {on ? (
            <Volume2 className="size-[17px]" />
          ) : (
            <VolumeX className="size-[17px]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
