/**
 * Mock data for the UI template.
 *
 * There is no backend access on this project. Every shape here is modelled on
 * what the live Trackyee app actually renders (worker IDs, shift codes, ₹ pay
 * rates, picks-per-hour, chat widgets) so the layouts get exercised with
 * realistic content — long Tamil names, 20-row tables, zeroed empty months.
 * Replace with real calls when wiring up; components depend on these types,
 * not on where the data comes from.
 */

export const TENANT = "TCA8";

export type Shift = "S1" | "S2" | "S3" | "Night";

export type AttendanceMark = "present" | "absent" | "paid-leave" | "unmarked";

export type Worker = {
  id: string;
  name: string;
  shift: Shift;
  mark: AttendanceMark;
};

/** Roster as shown on the Attendance module — alphabetical, IDs not sequential. */
export const workers: Worker[] = [
  { id: "TCA8-003", name: "Aisha Gani Mohamed Imran", shift: "S1", mark: "unmarked" },
  { id: "TCA8-013", name: "Balakrishnan", shift: "Night", mark: "unmarked" },
  { id: "TCA8-015", name: "Dhivya", shift: "S2", mark: "unmarked" },
  { id: "TCA8-012", name: "Hariprasath", shift: "S1", mark: "unmarked" },
  { id: "TCA8-009", name: "Hemalatha", shift: "S1", mark: "unmarked" },
  { id: "TCA8-006", name: "Keerthana", shift: "S2", mark: "unmarked" },
  { id: "TCA8-010", name: "Mukesh", shift: "Night", mark: "unmarked" },
  { id: "TCA8-001", name: "Pradeep", shift: "S1", mark: "unmarked" },
  { id: "TCA8-007", name: "Priya R", shift: "S2", mark: "unmarked" },
  { id: "TCA8-011", name: "Ramaprabha", shift: "S3", mark: "unmarked" },
  { id: "TCA8-008", name: "Ranjani D", shift: "S2", mark: "unmarked" },
  { id: "TCA8-016", name: "Saleem", shift: "Night", mark: "unmarked" },
  { id: "TCA8-002", name: "SNEHA B", shift: "S2", mark: "unmarked" },
  { id: "TCA8-004", name: "Suhail", shift: "S1", mark: "unmarked" },
  { id: "TCA8-014", name: "Yogeshwari", shift: "S3", mark: "unmarked" },
];

export const warehouses = [
  { id: "selaiyur", name: "Selaiyur", active: true },
  { id: "velachery", name: "Velachery", active: false },
  { id: "vellore", name: "Vellore", active: false },
];

/* ---------------------------------------------------------------- payroll */

export type PayRate = {
  id: string;
  label: string;
  value: number;
  help: string;
  ownerOnly?: boolean;
};

export const payRates: PayRate[] = [
  {
    id: "unit",
    label: "Default rate per unit",
    value: 0,
    help: "Applied to every picker who doesn't have a custom rate set.",
  },
  {
    id: "daily",
    label: "Default attendance daily pay",
    value: 100,
    help: "Paid per present day this month, from the Attendance module.",
  },
  {
    id: "overtime",
    label: "Default overtime pay",
    value: 80,
    help: "Paid per overtime hour. OT = overtime hours × this.",
  },
  {
    id: "parcel",
    label: "My earning per parcel",
    value: 2500,
    help: "Your earning for every parcel (order) shipped. Only visible to you.",
    ownerOnly: true,
  },
];

/* --------------------------------------------------------------- presence */

export type WorkerPresence = {
  worker: string;
  days: number;
  ofDays: number;
  attendancePct: number;
  avgActiveHrs: number;
  usualStart: string;
  shift: Shift;
};

/** Usernames here are the scan-system handles, not the roster display names. */
export const presence: WorkerPresence[] = [
  { worker: "suhailzs", days: 28, ofDays: 31, attendancePct: 90, avgActiveHrs: 8.2, usualStart: "10:27", shift: "S1" },
  { worker: "pradezs", days: 25, ofDays: 31, attendancePct: 81, avgActiveHrs: 5.8, usualStart: "12:11", shift: "S1" },
  { worker: "mukeslb", days: 25, ofDays: 31, attendancePct: 81, avgActiveHrs: 3.6, usualStart: "18:22", shift: "Night" },
  { worker: "sivakuha", days: 25, ofDays: 31, attendancePct: 81, avgActiveHrs: 6.5, usualStart: "15:21", shift: "Night" },
  { worker: "qcranjin", days: 24, ofDays: 31, attendancePct: 77, avgActiveHrs: 7.1, usualStart: "10:53", shift: "S2" },
  { worker: "rpriyram", days: 24, ofDays: 31, attendancePct: 77, avgActiveHrs: 6.4, usualStart: "09:11", shift: "S2" },
  { worker: "yuvahema", days: 23, ofDays: 31, attendancePct: 74, avgActiveHrs: 5.8, usualStart: "09:19", shift: "S1" },
  { worker: "keerkeec", days: 22, ofDays: 31, attendancePct: 71, avgActiveHrs: 6.7, usualStart: "09:09", shift: "S2" },
  { worker: "mkramapr", days: 22, ofDays: 31, attendancePct: 71, avgActiveHrs: 7.2, usualStart: "07:33", shift: "S1" },
  { worker: "tmoaisha", days: 21, ofDays: 31, attendancePct: 68, avgActiveHrs: 5.4, usualStart: "07:19", shift: "S1" },
  { worker: "snelbala", days: 18, ofDays: 31, attendancePct: 58, avgActiveHrs: 2.5, usualStart: "08:54", shift: "S2" },
  { worker: "balakriq", days: 17, ofDays: 31, attendancePct: 55, avgActiveHrs: 1.8, usualStart: "18:15", shift: "Night" },
  { worker: "shahjafe", days: 15, ofDays: 31, attendancePct: 48, avgActiveHrs: 2.6, usualStart: "18:54", shift: "Night" },
  { worker: "sentdyog", days: 14, ofDays: 31, attendancePct: 45, avgActiveHrs: 7.4, usualStart: "13:25", shift: "S3" },
  { worker: "karubalu", days: 13, ofDays: 31, attendancePct: 42, avgActiveHrs: 3.0, usualStart: "16:10", shift: "Night" },
  { worker: "tezanith", days: 12, ofDays: 31, attendancePct: 39, avgActiveHrs: 7.0, usualStart: "13:25", shift: "S3" },
  { worker: "adhivyma", days: 12, ofDays: 31, attendancePct: 39, avgActiveHrs: 4.7, usualStart: "15:09", shift: "S3" },
  { worker: "rajathdm", days: 11, ofDays: 31, attendancePct: 35, avgActiveHrs: 6.1, usualStart: "14:13", shift: "S3" },
  { worker: "rsaleabd", days: 10, ofDays: 31, attendancePct: 32, avgActiveHrs: 2.8, usualStart: "18:16", shift: "Night" },
  { worker: "SPEAR", days: 4, ofDays: 31, attendancePct: 13, avgActiveHrs: 0.7, usualStart: "10:35", shift: "S2" },
];

/** Daily headcount from scan data — drives the line chart in chat. */
export const dailyAttendance = [
  { date: "04-03", count: 9 }, { date: "04-04", count: 12 }, { date: "04-05", count: 13 },
  { date: "04-06", count: 12 }, { date: "04-07", count: 12 }, { date: "04-08", count: 12 },
  { date: "04-09", count: 14 }, { date: "04-10", count: 13 }, { date: "04-11", count: 9 },
  { date: "04-12", count: 9 }, { date: "04-13", count: 13 }, { date: "04-14", count: 14 },
  { date: "04-15", count: 15 }, { date: "04-16", count: 12 }, { date: "04-17", count: 10 },
  { date: "04-18", count: 13 }, { date: "04-19", count: 14 }, { date: "04-20", count: 13 },
  { date: "04-21", count: 11 }, { date: "04-22", count: 12 }, { date: "04-23", count: 4 },
  { date: "04-24", count: 12 }, { date: "04-25", count: 14 }, { date: "04-26", count: 15 },
  { date: "04-27", count: 12 }, { date: "04-28", count: 13 }, { date: "04-29", count: 14 },
  { date: "04-30", count: 14 }, { date: "05-01", count: 13 }, { date: "05-02", count: 14 },
  { date: "05-03", count: 13 },
];

/** One worker's daily picks — the bar chart in the drill-down reply. */
export const workerDailyPicks = [
  { date: "04-03", picks: 4 }, { date: "04-05", picks: 64 }, { date: "04-07", picks: 2 },
  { date: "04-09", picks: 17 }, { date: "04-12", picks: 12 }, { date: "04-14", picks: 39 },
  { date: "04-15", picks: 17 }, { date: "04-17", picks: 19 }, { date: "04-20", picks: 20 },
  { date: "04-22", picks: 32 }, { date: "04-27", picks: 76 }, { date: "04-28", picks: 11 },
  { date: "04-30", picks: 36 }, { date: "05-01", picks: 46 }, { date: "05-02", picks: 19 },
];

export const workerHourly = [
  { hour: "06:00", picks: 2 }, { hour: "17:00", picks: 3 }, { hour: "18:00", picks: 4 },
  { hour: "19:00", picks: 5 }, { hour: "20:00", picks: 1 }, { hour: "21:00", picks: 199 },
  { hour: "22:00", picks: 158 }, { hour: "23:00", picks: 41 },
];

/* --------------------------------------------------------------- expenses */

export type ExpenseSummary = {
  month: string;
  expenses: number;
  revenue: number;
  entries: number;
};

/** July is deliberately empty — the live app spends a lot of time in this state. */
export const expenseSummary: ExpenseSummary = {
  month: "July 2026",
  expenses: 0,
  revenue: 0,
  entries: 0,
};

/* ------------------------------------------------------------------- chat */

export type ChatThread = {
  id: string;
  title: string;
  module?: string;
};

export const chatHistory: ChatThread[] = [
  { id: "attendance-today", title: "Get me today's attendance" },
  { id: "suresh-leave", title: "suresh's leave history", module: "Attendance" },
];

export type StatCard = {
  label: string;
  value: string;
  tone: "good" | "info" | "critical" | "warning" | "neutral" | "accent";
  icon: string;
};

/** Suggested prompts on the empty chat state. */
export const suggestedPrompts = [
  "Who was late today?",
  "Top pickers this month",
  "Show me absentees this week",
  "Payroll summary for June",
];
