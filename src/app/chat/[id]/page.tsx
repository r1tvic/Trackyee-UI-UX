"use client";

import { useParams } from "next/navigation";
import {
  AlertTriangle,
  BarChart3,
  Boxes,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  HelpCircle,
  Package,
  Percent,
  TrendingDown,
  TrendingUp,
  User,
  Users,
  Zap,
} from "lucide-react";

import { BarChart, LineChart } from "@/components/chat/charts";
import { Composer } from "@/components/chat/composer";
import { DataTable, type Column } from "@/components/chat/data-table";
import { AssistantMessage, UserMessage } from "@/components/chat/message";
import { StatGrid } from "@/components/chat/stat-grid";
import { AppShell } from "@/components/shell/app-shell";
import {
  chatHistory,
  dailyAttendance,
  presence,
  workerDailyPicks,
  workerHourly,
  type WorkerPresence,
} from "@/lib/mock-data";

const presenceColumns: Column<WorkerPresence>[] = [
  { key: "worker", header: "Worker" },
  {
    key: "days",
    header: "Days",
    align: "right",
    render: (row) => `${row.days}/${row.ofDays}`,
  },
  {
    key: "attendancePct",
    header: "Attendance %",
    align: "right",
    render: (row) => `${row.attendancePct}%`,
  },
  {
    key: "avgActiveHrs",
    header: "Avg active hrs",
    align: "right",
    render: (row) => `${row.avgActiveHrs} hrs`,
  },
  { key: "usualStart", header: "Usual start", align: "right" },
  { key: "shift", header: "Shift" },
];

export default function ChatThreadPage() {
  const params = useParams<{ id: string }>();
  const thread = chatHistory.find((t) => t.id === params.id);

  return (
    <AppShell
      title={thread?.title ?? "Chat"}
      icon={BarChart3}
      badge={thread?.module}
      fullBleed
    >
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <UserMessage at="02:16 pm">suresh&apos;s leave history</UserMessage>

          <AssistantMessage
            at="02:16 pm"
            intro="Full attendance overview derived from scan data:"
          >
            <StatGrid
              items={[
                { label: "Total workers", value: "20", tone: "info", icon: Users },
                { label: "Avg attendance", value: "59%", tone: "critical", icon: Percent },
                { label: "Best day", value: "04-26", tone: "good", icon: TrendingUp },
                { label: "Worst day", value: "04-23", tone: "critical", icon: TrendingDown },
              ]}
            />

            <DataTable
              title="Worker presence"
              columns={presenceColumns}
              rows={presence}
              caption={`Showing ${presence.length} rows`}
            />

            <LineChart
              title="Daily attendance count"
              data={dailyAttendance}
              xKey="date"
              yKey="count"
            />
          </AssistantMessage>

          <UserMessage at="02:37 pm">Get me karubalu&apos;s summary</UserMessage>

          <AssistantMessage
            at="02:37 pm"
            intro="Today's snapshot — 93% attendance, 0 picks so far."
          >
            <StatGrid
              items={[
                { label: "Attendance", value: "93%", tone: "good", icon: Percent },
                { label: "Present", value: "14", tone: "good", icon: CheckCircle2 },
                { label: "Absent", value: "1", tone: "critical", icon: AlertTriangle },
                { label: "Paid leave", value: "0", tone: "info", icon: Calendar },
                { label: "Unmarked", value: "0", tone: "warning", icon: HelpCircle },
                { label: "Total picks", value: "0", tone: "info", icon: Package },
                { label: "Units moved", value: "0", tone: "accent", icon: Boxes },
                { label: "Pickers active", value: "0", tone: "neutral", icon: Users },
              ]}
            />
          </AssistantMessage>

          <UserMessage at="02:38 pm">what about shahjafe?</UserMessage>

          <AssistantMessage
            at="02:38 pm"
            intro="Detailed performance for shahjafe:"
          >
            <StatGrid
              items={[
                { label: "Worker", value: "shahjafe", tone: "good", icon: User },
                { label: "Total picks", value: "425", tone: "info", icon: Package },
                { label: "Days worked", value: "15", tone: "accent", icon: Calendar },
                { label: "Picks/day", value: "28.3", tone: "warning", icon: TrendingUp },
                { label: "Picks/hour", value: "10.4", tone: "good", icon: Zap },
                { label: "Orders", value: "136", tone: "info", icon: ClipboardList },
                { label: "Unique items", value: "360", tone: "accent", icon: Boxes },
                { label: "Peak hour", value: "21:00", tone: "warning", icon: Clock },
              ]}
            />

            <BarChart
              title="shahjafe — daily picking trend"
              data={workerDailyPicks}
              xKey="date"
              yKey="picks"
            />

            <BarChart
              title="shahjafe — hourly distribution"
              data={workerHourly}
              xKey="hour"
              yKey="picks"
            />
          </AssistantMessage>
        </div>
      </div>

      <Composer />
    </AppShell>
  );
}
