import { cn } from "@/lib/utils";

/**
 * Bare trend line for stat tiles. Decorative context for the value beside it —
 * the tile's number and delta carry the actual information, so this is
 * aria-hidden and carries no axes or labels.
 */
export function Sparkline({
  data,
  className,
  stroke = "currentColor",
}: {
  data: number[];
  className?: string;
  stroke?: string;
}) {
  const width = 120;
  const height = 36;
  const pad = 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;

  const points = data.map((value, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2);
    const y = height - pad - ((value - min) / span) * (height - pad * 2);
    return [x, y] as const;
  });

  const line = points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const [lastX, lastY] = points[points.length - 1];
  const gradientId = `spark-${data.length}-${Math.round(data[0])}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("h-9 w-[120px] overflow-visible", className)}
      aria-hidden
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.22" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`${line} ${width - pad},${height} ${pad},${height}`}
        fill={`url(#${gradientId})`}
      />
      <polyline
        points={line}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={lastX} cy={lastY} r="3" fill={stroke} />
    </svg>
  );
}
