"use client";

import * as React from "react";
import { Paperclip, SendHorizontal } from "lucide-react";

export function Composer() {
  const [value, setValue] = React.useState("");

  return (
    // No scrim here: the thread scrolls in a sibling box above this one, so
    // nothing ever passes behind the composer. The fade this used to carry
    // was painting an opaque slab of --background over the colour mesh, with
    // a hard edge across the bottom of the screen.
    <div className="shrink-0 px-4 pt-4 pb-5 sm:px-6">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="liquid-glass-strong mx-auto flex max-w-3xl items-center gap-2 rounded-2xl px-3 py-2"
      >
        <button
          type="button"
          aria-label="Attach an Excel file"
          className="text-muted-foreground hover:text-foreground grid size-11 shrink-0 place-items-center rounded-lg transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:size-9"
        >
          <Paperclip className="size-[18px]" />
        </button>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask about picking data, attendance, expenses…"
          aria-label="Message"
          // 16px on phones: iOS Safari zooms the page in when you focus an
          // input smaller than that and never zooms back out, which wrecks
          // the whole layout for the rest of the session.
          className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent py-1.5 text-base outline-none md:text-sm"
        />

        <button
          type="submit"
          disabled={!value.trim()}
          aria-label="Send"
          className="bg-primary text-primary-foreground grid size-11 shrink-0 place-items-center rounded-xl transition-opacity disabled:opacity-40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:size-9"
        >
          <SendHorizontal className="size-4" />
        </button>
      </form>

      <p className="text-muted-foreground/70 mt-2 text-center text-xs">
        Upload an Excel file to analyze picking data, or type queries like
        &ldquo;top pickers&rdquo; or &ldquo;who was late today&rdquo;
      </p>
    </div>
  );
}
