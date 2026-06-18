import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "AstroNexus — The unified space intelligence platform",
  description:
    "Space weather alerts, near-Earth object tracking, live satellite passes, launches, and space news from ISRO, NASA, ESA, SpaceX — in one dashboard.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="starfield antialiased">
        <Nav />
        <main className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6">{children}</main>
        <footer className="border-t border-white/5 py-8 text-center text-sm text-slate-500">
          🚀 AstroNexus · Data from NASA, NOAA SWPC, The Space Devs, Spaceflight News &amp; NASA
          Exoplanet Archive · MVP build
        </footer>
      </body>
    </html>
  );
}
