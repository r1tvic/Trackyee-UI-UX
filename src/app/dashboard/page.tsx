"use client";

import { motion } from "framer-motion";

import { AppShell } from "@/components/app-shell";
import { StatTile } from "@/components/stat-tile";
import { StatusBadge } from "@/components/status-badge";
import { ThroughputChart } from "@/components/throughput-chart";
import { activity, shipments, stats } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <AppShell>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6"
      >
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Good morning, <span className="text-primary italic">Madhan</span>
        </h1>
        <p className="text-muted-foreground mt-1.5">
          Here&apos;s what moved across your warehouses today.
        </p>
      </motion.div>

      <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => (
          <StatTile key={stat.id} stat={stat} index={i} />
        ))}
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ThroughputChart />
        </div>

        <section
          aria-label="Recent activity"
          className="glass glass-edge rounded-2xl p-5 sm:p-6"
        >
          <h3 className="font-display text-lg font-semibold tracking-tight">
            Activity
          </h3>
          <ol className="mt-4 space-y-4">
            {activity.map((entry, i) => (
              <motion.li
                key={entry.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                className="flex gap-3 text-sm"
              >
                <span className="bg-primary/50 mt-1.5 size-1.5 shrink-0 rounded-full" aria-hidden />
                <span className="min-w-0">
                  <span className="font-medium">{entry.actor}</span>{" "}
                  <span className="text-muted-foreground">{entry.action}</span>{" "}
                  <span className="font-mono text-[0.8rem]">{entry.target}</span>
                  <span className="text-muted-foreground/70 mt-0.5 block text-xs">
                    {entry.at}
                  </span>
                </span>
              </motion.li>
            ))}
          </ol>
        </section>
      </div>

      {/* Table doubles as the relief view for chart colors that sit under 3:1. */}
      <section
        aria-label="Active shipments"
        className="glass glass-edge mt-4 overflow-hidden rounded-2xl"
      >
        <div className="flex items-center justify-between p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold tracking-tight">
            Active shipments
          </h3>
          <span className="text-muted-foreground text-sm">
            {shipments.length} of 214
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="text-muted-foreground border-border border-y text-left">
                <th scope="col" className="px-5 py-2.5 font-medium sm:px-6">Reference</th>
                <th scope="col" className="px-5 py-2.5 font-medium">Destination</th>
                <th scope="col" className="px-5 py-2.5 font-medium">Carrier</th>
                <th scope="col" className="px-5 py-2.5 text-right font-medium">Items</th>
                <th scope="col" className="px-5 py-2.5 font-medium">Status</th>
                <th scope="col" className="px-5 py-2.5 font-medium">Progress</th>
                <th scope="col" className="px-5 py-2.5 text-right font-medium sm:px-6">ETA</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment, i) => (
                <motion.tr
                  key={shipment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.05 }}
                  className="border-border/60 hover:bg-foreground/[0.03] border-b transition-colors last:border-0"
                >
                  <td className="px-5 py-3 font-mono text-[0.8rem] font-medium sm:px-6">
                    {shipment.reference}
                  </td>
                  <td className="px-5 py-3">{shipment.destination}</td>
                  <td className="text-muted-foreground px-5 py-3">
                    {shipment.carrier}
                  </td>
                  <td className="tabular px-5 py-3 text-right">
                    {shipment.items.toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={shipment.status} />
                  </td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-2">
                      <span className="bg-foreground/10 h-1.5 w-20 overflow-hidden rounded-full">
                        <motion.span
                          initial={{ width: 0 }}
                          animate={{ width: `${shipment.progress}%` }}
                          transition={{ duration: 0.7, delay: 0.5 + i * 0.05 }}
                          className="bg-primary block h-full rounded-full"
                        />
                      </span>
                      <span className="tabular text-muted-foreground text-xs">
                        {shipment.progress}%
                      </span>
                    </span>
                  </td>
                  <td className="tabular px-5 py-3 text-right sm:px-6">
                    {shipment.eta}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
