/**
 * Mock data for the UI template.
 *
 * There is no backend access on this project — every shape here is a guess at
 * what the real Trackyee API probably returns, sized so the layouts are
 * exercised realistically (long SKU names, big numbers, empty-ish rows).
 * Replace with real calls when wiring up; the components only depend on these
 * types, not on where the data comes from.
 */

export type ShipmentStatus =
  | "delivered"
  | "in-transit"
  | "delayed"
  | "exception";

export type Shipment = {
  id: string;
  reference: string;
  destination: string;
  carrier: string;
  items: number;
  status: ShipmentStatus;
  eta: string;
  progress: number;
};

export type StatTile = {
  id: string;
  label: string;
  value: number;
  unit?: string;
  /** Percent change vs the previous period. */
  delta: number;
  /** Whether an increase is a good thing — drives the delta's status color. */
  higherIsBetter: boolean;
  /** 12 points, oldest → newest, for the sparkline. */
  trend: number[];
};

export const stats: StatTile[] = [
  {
    id: "sku",
    label: "Active SKUs",
    value: 12480,
    delta: 3.2,
    higherIsBetter: true,
    trend: [11200, 11310, 11290, 11520, 11680, 11740, 11910, 12040, 12110, 12260, 12390, 12480],
  },
  {
    id: "transit",
    label: "In transit",
    value: 318,
    delta: 12.5,
    higherIsBetter: true,
    trend: [214, 226, 241, 238, 259, 268, 275, 289, 296, 302, 311, 318],
  },
  {
    id: "low-stock",
    label: "Low stock",
    value: 47,
    delta: 18.4,
    higherIsBetter: false,
    trend: [22, 24, 26, 25, 29, 31, 34, 36, 39, 42, 45, 47],
  },
  {
    id: "fulfilled",
    label: "Fulfilled today",
    value: 1962,
    delta: -4.1,
    higherIsBetter: true,
    trend: [2140, 2098, 2160, 2075, 2110, 2044, 2088, 2012, 2050, 1996, 1978, 1962],
  },
];

export const shipments: Shipment[] = [
  {
    id: "1",
    reference: "TRK-90412",
    destination: "Rotterdam DC",
    carrier: "Maersk",
    items: 1240,
    status: "in-transit",
    eta: "Aug 2",
    progress: 62,
  },
  {
    id: "2",
    reference: "TRK-90408",
    destination: "Hamburg Hub",
    carrier: "DHL Freight",
    items: 380,
    status: "delivered",
    eta: "Jul 27",
    progress: 100,
  },
  {
    id: "3",
    reference: "TRK-90395",
    destination: "Felixstowe Yard",
    carrier: "Hapag-Lloyd",
    items: 2105,
    status: "delayed",
    eta: "Aug 6",
    progress: 41,
  },
  {
    id: "4",
    reference: "TRK-90387",
    destination: "Antwerp Cross-dock",
    carrier: "Kuehne+Nagel",
    items: 96,
    status: "exception",
    eta: "—",
    progress: 18,
  },
  {
    id: "5",
    reference: "TRK-90371",
    destination: "Le Havre Terminal",
    carrier: "CMA CGM",
    items: 1588,
    status: "in-transit",
    eta: "Aug 4",
    progress: 74,
  },
  {
    id: "6",
    reference: "TRK-90366",
    destination: "Gdańsk Warehouse",
    carrier: "DSV",
    items: 742,
    status: "delivered",
    eta: "Jul 26",
    progress: 100,
  },
];

/** Weekly inbound vs outbound volume — two series, so it needs a legend. */
export const throughput = [
  { day: "Mon", inbound: 1840, outbound: 1620 },
  { day: "Tue", inbound: 2110, outbound: 1980 },
  { day: "Wed", inbound: 1960, outbound: 2240 },
  { day: "Thu", inbound: 2380, outbound: 2050 },
  { day: "Fri", inbound: 2620, outbound: 2410 },
  { day: "Sat", inbound: 1420, outbound: 1180 },
  { day: "Sun", inbound: 980, outbound: 860 },
];

export type ActivityItem = {
  id: string;
  actor: string;
  action: string;
  target: string;
  at: string;
};

export const activity: ActivityItem[] = [
  {
    id: "1",
    actor: "M. Rao",
    action: "received",
    target: "PO-4471 · 240 units",
    at: "12m ago",
  },
  {
    id: "2",
    actor: "System",
    action: "flagged low stock on",
    target: "SKU-88213",
    at: "34m ago",
  },
  {
    id: "3",
    actor: "J. Alvarez",
    action: "dispatched",
    target: "TRK-90412",
    at: "1h ago",
  },
  {
    id: "4",
    actor: "K. Bauer",
    action: "closed exception on",
    target: "TRK-90344",
    at: "2h ago",
  },
  {
    id: "5",
    actor: "System",
    action: "reconciled cycle count for",
    target: "Aisle D-14",
    at: "3h ago",
  },
];
