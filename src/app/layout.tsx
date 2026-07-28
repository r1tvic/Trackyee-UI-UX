import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face. SOFT rounds the terminals, WONK enables the curly swash
// alternates — that's what gives headings their character.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: "Trackyee — Warehouse Tracker",
  description:
    "Track inventory, shipments, and warehouse operations in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint so a collapsed sidebar is already narrow
            when the page appears. Without it the rail renders expanded, then
            visibly animates shut on every navigation. Must live in <head> — a
            <script> directly inside <html> is invalid and breaks hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('trackyee:sidebar-collapsed')==='true'){document.documentElement.setAttribute('data-sidebar-collapsed','')}}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* enableSystem is off on purpose: with it on, next-themes follows the
            OS and defaultTheme only applies when there's no system preference,
            so a light-mode OS never saw the intended dark default. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="mesh-bg" aria-hidden />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
