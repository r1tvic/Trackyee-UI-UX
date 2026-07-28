import { redirect } from "next/navigation";

/**
 * The template opens on the login screen. The index of every designed screen
 * moved to /screens so the root could be the real entry point.
 */
export default function Home() {
  redirect("/login");
}
