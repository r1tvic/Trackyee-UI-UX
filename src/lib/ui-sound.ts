"use client";

import * as React from "react";

const KEY = "trackyee:ui-sound";

/* ------------------------------------------------------------------ prefs */

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

// Opt-out rather than opt-in: absent key means on.
function getSnapshot() {
  try {
    return window.localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
}

const getServerSnapshot = () => true;

export function useSoundEnabled() {
  const enabled = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setEnabled = React.useCallback((next: boolean) => {
    try {
      window.localStorage.setItem(KEY, next ? "on" : "off");
    } catch {
      // Non-fatal — the preference just won't persist.
    }
    listeners.forEach((l) => l());
  }, []);

  return { enabled, setEnabled };
}

/* ------------------------------------------------------------------ audio */

/**
 * Synthesised rather than sampled: two oscillator blips weigh nothing, need no
 * network request, and every parameter stays tunable in one place.
 */
let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function ensureCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 1;
    master.connect(ctx.destination);
  }
  return ctx;
}

/** Browsers refuse to start audio until the user has interacted with the page. */
export function unlockAudio() {
  const c = ensureCtx();
  if (c && c.state === "suspended") void c.resume();
}

type Voice = {
  freq: number;
  gain: number;
  duration: number;
  type?: OscillatorType;
};

function play({ freq, gain, duration, type = "sine" }: Voice) {
  const c = ensureCtx();
  if (!c || c.state !== "running" || !master) return;

  const t = c.currentTime;
  const osc = c.createOscillator();
  const env = c.createGain();
  const lowpass = c.createBiquadFilter();

  // Rolls off the upper harmonics — without this even a quiet blip reads as a
  // sharp electronic beep.
  lowpass.type = "lowpass";
  lowpass.frequency.value = 2400;

  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  // Slight downward glide; a fixed pitch sounds like an alert, a falling one
  // reads as a soft tick.
  osc.frequency.exponentialRampToValueAtTime(freq * 0.86, t + duration);

  // Ramp from near-silence rather than 0 — exponential ramps can't touch zero,
  // and a hard start produces an audible click.
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(gain, t + 0.005);
  env.gain.exponentialRampToValueAtTime(0.0001, t + duration);

  osc.connect(lowpass);
  lowpass.connect(env);
  env.connect(master);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

// Gains are deliberately tiny. 0.018 is barely above the noise floor on
// laptop speakers — audible as texture, not as a notification.
export const playHover = () => play({ freq: 1180, gain: 0.018, duration: 0.05 });
export const playClick = () =>
  play({ freq: 760, gain: 0.038, duration: 0.075, type: "triangle" });

/* ------------------------------------------------------------- delegation */

const INTERACTIVE =
  'a[href],button,[role="button"],[role="tab"],input,select,textarea,summary';

/**
 * One set of delegated listeners on the document rather than handlers on every
 * control — the tree has hundreds of hoverable elements and this keeps it to
 * three listeners total.
 */
export function useUiSounds(enabled: boolean) {
  React.useEffect(() => {
    if (!enabled) return;

    let lastEl: Element | null = null;
    let lastAt = 0;

    const unlock = () => unlockAudio();

    function resolve(target: EventTarget | null) {
      const el = (target as HTMLElement | null)?.closest?.(INTERACTIVE);
      if (!el) return null;
      // Don't sound for controls that can't be used.
      if (el.hasAttribute("disabled") || el.getAttribute("aria-disabled") === "true") {
        return null;
      }
      return el;
    }

    function onOver(e: PointerEvent) {
      // Touch fires pointerover on tap; a sound there would double up with the
      // click sound.
      if (e.pointerType !== "mouse") return;
      const el = resolve(e.target);
      if (!el || el === lastEl) return;
      const now = performance.now();
      // Sweeping the cursor across a list shouldn't machine-gun the speaker.
      if (now - lastAt < 60) return;
      lastEl = el;
      lastAt = now;
      playHover();
    }

    function onOut(e: PointerEvent) {
      if (resolve(e.target) === lastEl) lastEl = null;
    }

    function onClick(e: MouseEvent) {
      if (resolve(e.target)) playClick();
    }

    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("click", onClick);
    };
  }, [enabled]);
}
