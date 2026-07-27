import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  OctagonAlert,
  type LucideIcon,
} from "lucide-react";

import type { ShipmentStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/**
 * Status is always icon + label, never color alone — the color is a third,
 * redundant channel so the badge survives CVD, greyscale print and
 * forced-colors.
 */
const config: Record<
  ShipmentStatus,
  { label: string; icon: LucideIcon; color: string; tint: string }
> = {
  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    color: "text-status-good",
    tint: "bg-status-good/10",
  },
  "in-transit": {
    label: "In transit",
    icon: Clock,
    color: "text-chart-1",
    tint: "bg-chart-1/10",
  },
  delayed: {
    label: "Delayed",
    icon: AlertTriangle,
    color: "text-status-serious",
    tint: "bg-status-serious/12",
  },
  exception: {
    label: "Exception",
    icon: OctagonAlert,
    color: "text-status-critical",
    tint: "bg-status-critical/10",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: ShipmentStatus;
  className?: string;
}) {
  const { label, icon: Icon, color, tint } = config[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        tint,
        color,
        className,
      )}
    >
      <Icon className="size-3.5 shrink-0" aria-hidden />
      {label}
    </span>
  );
}
