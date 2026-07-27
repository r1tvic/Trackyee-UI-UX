"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { throughput } from "@/lib/mock-data";

const W = 720;
const H = 260;
const PAD = { top: 20, right: 64, bottom: 32, left: 52 };

const SERIES = [
  { key: "inbound", label: "Inbound", color: "var(--chart-1)" },
  { key: "outbound", label: "Outbound", color: "var(--chart-2)" },
] as const;

const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

export function ThroughputChart() {
  const reduceMotion = useReducedMotion();
  const [hover, setHover] = React.useState<number | null>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const max = Math.max(...throughput.flatMap((d) => [d.inbound, d.outbound]));
  // Round the top of the scale up to a clean number so ticks read well.
  const yMax = Math.ceil(max / 500) * 500;

  const x = (i: number) => PAD.left + (i / (throughput.length - 1)) * PLOT_W;
  const y = (v: number) => PAD.top + PLOT_H - (v / yMax) * PLOT_H;

  const ticks = Array.from({ length: 4 }, (_, i) => (yMax / 3) * i);

  function pointsFor(key: (typeof SERIES)[number]["key"]) {
    return throughput.map((d, i) => [x(i), y(d[key])] as const);
  }

  function handleMove(event: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    // Map client px into viewBox units before comparing against x().
    const vx = ((event.clientX - rect.left) / rect.width) * W;
    const ratio = (vx - PAD.left) / PLOT_W;
    const idx = Math.round(ratio * (throughput.length - 1));
    setHover(Math.min(throughput.length - 1, Math.max(0, idx)));
  }

  const active = hover === null ? null : throughput[hover];

  return (
    <div className="glass glass-edge rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight">
            Weekly throughput
          </h3>
          <p className="text-muted-foreground text-sm">
            Units moved per day, this week
          </p>
        </div>

        {/* Legend is always present for 2+ series — identity never rests on color alone. */}
        <ul className="flex items-center gap-4">
          {SERIES.map((s) => (
            <li key={s.key} className="flex items-center gap-1.5 text-sm">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: s.color }}
                aria-hidden
              />
              <span className="text-muted-foreground">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-4">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full touch-none"
          role="img"
          aria-label="Line chart of inbound and outbound units moved per day this week."
          onPointerMove={handleMove}
          onPointerLeave={() => setHover(null)}
        >
          <defs>
            {SERIES.map((s) => (
              <linearGradient
                key={s.key}
                id={`fill-${s.key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={s.color} stopOpacity="0.18" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>

          {/* Grid + ticks stay recessive so the data reads first. */}
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={y(t)}
                y2={y(t)}
                className="stroke-border"
                strokeWidth="1"
              />
              <text
                x={PAD.left - 10}
                y={y(t)}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-muted-foreground text-[11px]"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {t.toLocaleString()}
              </text>
            </g>
          ))}

          {throughput.map((d, i) => (
            <text
              key={d.day}
              x={x(i)}
              y={H - 10}
              textAnchor="middle"
              className="fill-muted-foreground text-[11px]"
            >
              {d.day}
            </text>
          ))}

          {SERIES.map((s) => {
            const pts = pointsFor(s.key);
            const line = pts.map(([px, py]) => `${px},${py}`).join(" ");
            return (
              <g key={s.key}>
                <polygon
                  points={`${line} ${x(throughput.length - 1)},${PAD.top + PLOT_H} ${PAD.left},${PAD.top + PLOT_H}`}
                  fill={`url(#fill-${s.key})`}
                />
                <motion.polyline
                  points={line}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduceMotion ? undefined : { pathLength: 0 }}
                  animate={reduceMotion ? undefined : { pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                {/* Direct label at the series end — readable without the legend. */}
                <text
                  x={x(throughput.length - 1) + 10}
                  y={pts[pts.length - 1][1]}
                  dominantBaseline="middle"
                  className="text-[11px] font-medium"
                  fill={s.color}
                >
                  {s.label}
                </text>
              </g>
            );
          })}

          {hover !== null && (
            <g>
              <line
                x1={x(hover)}
                x2={x(hover)}
                y1={PAD.top}
                y2={PAD.top + PLOT_H}
                className="stroke-foreground/25"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              {SERIES.map((s) => (
                <circle
                  key={s.key}
                  cx={x(hover)}
                  cy={y(throughput[hover][s.key])}
                  r="5"
                  fill={s.color}
                  // 2px surface ring keeps the two markers separable where they overlap.
                  className="stroke-card"
                  strokeWidth="2"
                />
              ))}
            </g>
          )}
        </svg>

        {active && hover !== null && (
          <div
            className="glass-strong pointer-events-none absolute top-2 rounded-xl px-3 py-2 text-xs shadow-lg"
            style={{
              left: `${(x(hover) / W) * 100}%`,
              transform: `translateX(${hover > throughput.length / 2 ? "-110%" : "10%"})`,
            }}
          >
            <p className="mb-1 font-semibold">{active.day}</p>
            {SERIES.map((s) => (
              <p key={s.key} className="flex items-center gap-2 whitespace-nowrap">
                <span
                  className="size-2 rounded-full"
                  style={{ background: s.color }}
                  aria-hidden
                />
                <span className="text-muted-foreground">{s.label}</span>
                <span className="tabular ml-auto font-medium">
                  {active[s.key].toLocaleString()}
                </span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
