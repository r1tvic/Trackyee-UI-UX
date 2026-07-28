"use client";

import * as React from "react";

const KEY = "trackyee:sidebar-collapsed";

/**
 * Collapse state has to outlive the component.
 *
 * Every route renders its own <AppShell>, so this state remounts on each
 * navigation — collapsing the sidebar and then clicking any nav item made it
 * silently spring back open. Persisting it keeps the sidebar where the user
 * put it.
 *
 * Read through useSyncExternalStore rather than an effect: localStorage is an
 * external store, and setState-in-effect causes a cascading second render on
 * every mount. getServerSnapshot returns the expanded default so SSR and the
 * first client paint agree.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Keep other tabs in sync too.
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(KEY) === "true";
  } catch {
    // Private mode or blocked storage — fall back to expanded.
    return false;
  }
}

const getServerSnapshot = () => false;

export function useSidebarCollapsed() {
  const collapsed = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setCollapsed = React.useCallback((next: boolean) => {
    try {
      window.localStorage.setItem(KEY, String(next));
    } catch {
      // Non-fatal: the sidebar just won't remember across navigations.
    }
    // The attribute drives width and label visibility in CSS; React state only
    // carries the aria wiring and click behaviour.
    document.documentElement.toggleAttribute("data-sidebar-collapsed", next);
    listeners.forEach((l) => l());
  }, []);

  return { collapsed, setCollapsed };
}
