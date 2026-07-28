"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

const W = 640;
const H = 240;
const PAD = { top: 16, right: 16, bottom: 30, left: 44 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

/** Ticks land on clean values rather than the raw max. */
function niceTicks(max: number, count = 4) {
  const raw = max / (count - 1);
  const mag = 10 ** Math.floor(Math.log10(raw || 1));
  const step = Math.ceil(raw / mag) * mag;
  return Array.from({ length: count }, (_, i) => step * i);
}

function Shell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="liquid-glass rounded-xl p-4">
      {/* Single series — the title names it, so no legend box is needed. */}
      <p className="mb-3 text-sm font-semibold">{title}</p>
      {children}
    </div>
  );
}

export function LineChart({
  title,
  data,
  xKey,
  yKey,
  color = "var(--chart-1)",
}: {
  title: string;
  data: Record<string, string | number>[];
  xKey: string;
  yKey: string;
  color?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [hover, setHover] = React.useState<number | null>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const values = data.map((d) => Number(d[yKey]));
  const ticks = niceTicks(Math.max(...values));
  const yMax = ticks[ticks.length - 1];

  const x = (i: number) => PAD.left + (i / (data.length - 1)) * PLOT_W;
  const y = (v: number) => PAD.top + PLOT_H - (v / yMax) * PLOT_H;

  const line = data.map((d, i) => `${x(i)},${y(Number(d[yKey]))}`).join(" ");

  function handleMove(event: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const vx = ((event.clientX - rect.left) / rect.width) * W;
    const idx = Math.round(((vx - PAD.left) / PLOT_W) * (data.length - 1));
    setHover(Math.min(data.length - 1, Math.max(0, idx)));
  }

  // Label every Nth tick so dense date axes don't collide.
  const stride = Math.ceil(data.length / 10);

  return (
    <Shell title={title}>
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full touch-none"
          role="img"
          aria-label={`${title}. Line chart of ${data.length} points.`}
          onPointerMove={handleMove}
          onPointerLeave={() => setHover(null)}
        >
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
                x={PAD.left - 8}
                y={y(t)}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-muted-foreground text-[10px]"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {t.toLocaleString()}
              </text>
            </g>
          ))}

          {data.map((d, i) =>
            i % stride === 0 ? (
              <text
                key={i}
                x={x(i)}
                y={H - 10}
                textAnchor="middle"
                className="fill-muted-foreground text-[10px]"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {d[xKey]}
              </text>
            ) : null,
          )}

          <motion.polyline
            points={line}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduceMotion ? undefined : { pathLength: 0 }}
            animate={reduceMotion ? undefined : { pathLength: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

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
              <circle
                cx={x(hover)}
                cy={y(Number(data[hover][yKey]))}
                r="5"
                fill={color}
                className="stroke-card"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>

        {hover !== null && (
          <div
            className="liquid-glass-strong pointer-events-none absolute top-0 rounded-lg px-2.5 py-1.5 text-xs whitespace-nowrap shadow-lg"
            style={{
              left: `${(x(hover) / W) * 100}%`,
              transform: `translateX(${hover > data.length / 2 ? "-110%" : "10%"})`,
            }}
          >
            <span className="text-muted-foreground">{data[hover][xKey]}</span>{" "}
            <span className="tabular font-semibold">
              {Number(data[hover][yKey]).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </Shell>
  );
}

export function BarChart({
  title,
  data,
  xKey,
  yKey,
  color = "var(--chart-1)",
}: {
  title: string;
  data: Record<string, string | number>[];
  xKey: string;
  yKey: string;
  color?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [hover, setHover] = React.useState<number | null>(null);

  const values = data.map((d) => Number(d[yKey]));
  const ticks = niceTicks(Math.max(...values));
  const yMax = ticks[ticks.length - 1];

  const slot = PLOT_W / data.length;
  // 2px of surface between neighbours keeps adjacent bars separable.
  const barW = Math.max(4, slot - 6);
  const y = (v: number) => PAD.top + PLOT_H - (v / yMax) * PLOT_H;
  const stride = Math.ceil(data.length / 10);

  return (
    <Shell title={title}>
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full touch-none"
          role="img"
          aria-label={`${title}. Bar chart of ${data.length} bars.`}
          onPointerLeave={() => setHover(null)}
        >
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
                x={PAD.left - 8}
                y={y(t)}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-muted-foreground text-[10px]"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {t.toLocaleString()}
              </text>
            </g>
          ))}

          {data.map((d, i) => {
            const value = Number(d[yKey]);
            const cx = PAD.left + slot * i + slot / 2;
            const top = y(value);
            const height = PAD.top + PLOT_H - top;
            return (
              <g key={i} onPointerEnter={() => setHover(i)}>
                {/* Full-height hit target so thin bars stay easy to hover. */}
                <rect
                  x={cx - slot / 2}
                  y={PAD.top}
                  width={slot}
                  height={PLOT_H}
                  fill="transparent"
                />
                {/* Grows via scaleY off the baseline rather than animating
                    `height`, which would repaint the chart every frame. */}
                <motion.rect
                  x={cx - barW / 2}
                  y={top}
                  width={barW}
                  height={height}
                  rx="4"
                  fill={color}
                  opacity={hover === null || hover === i ? 1 : 0.45}
                  style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
                  initial={reduceMotion ? undefined : { scaleY: 0 }}
                  animate={reduceMotion ? undefined : { scaleY: 1 }}
                  transition={{ duration: 0.45, delay: i * 0.012, ease: "easeOut" }}
                />
                {i % stride === 0 && (
                  <text
                    x={cx}
                    y={H - 10}
                    textAnchor="middle"
                    className="fill-muted-foreground text-[10px]"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {d[xKey]}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {hover !== null && (
          <div
            className="liquid-glass-strong pointer-events-none absolute top-0 rounded-lg px-2.5 py-1.5 text-xs whitespace-nowrap shadow-lg"
            style={{
              left: `${((PAD.left + slot * hover + slot / 2) / W) * 100}%`,
              transform: `translateX(${hover > data.length / 2 ? "-110%" : "10%"})`,
            }}
          >
            <span className="text-muted-foreground">{data[hover][xKey]}</span>{" "}
            <span className="tabular font-semibold">
              {Number(data[hover][yKey]).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </Shell>
  );
}
