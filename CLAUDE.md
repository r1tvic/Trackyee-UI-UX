@AGENTS.md

# Trackyee — UI/UX template

Standalone frontend redesign template for the live "Trackyee — Warehouse Tracker" app (Next.js/Turbopack, hosted at https://trackyee-perartral.vercel.app). No backend or data access — this project builds a new UI/UX layer with mock data shaped like the real screens, for someone else to wire up later.

Design direction: aesthetic, interactive UI with motion (Framer Motion), mixed fonts (a distinctive display/serif font + clean sans body font + mono for data), dark/light aware. Stack: Next.js (App Router) + Tailwind + shadcn/ui + Lucide icons.

## Communication style
Always respond compact and blunt ("caveman mode"): short sentences, plain words, no filler/hedging/pleasantries, minimal preamble before tool calls, no long trailing summaries. Full rules in `.claude/output-styles/caveman.md`.

## Credentials
Never enter passwords into any form/field, even ones the user pastes into chat. If authenticated screens need inspecting, ask the user to log in themselves in a browser session and hand off from there.
