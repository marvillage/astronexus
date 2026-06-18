"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/space-weather", label: "Space Weather" },
  { href: "/asteroids", label: "Asteroids" },
  { href: "/satellites", label: "Satellites" },
  { href: "/launches", label: "Launches" },
  { href: "/news", label: "News" },
  { href: "/exoplanets", label: "Exoplanets" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-space-950/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="text-xl">🚀</span>
          <span className="bg-gradient-to-r from-nebula-light to-comet bg-clip-text text-transparent">
            AstroNexus
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-nebula/20 text-nebula-light"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg p-2 text-slate-300 hover:bg-white/5 lg:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="grid grid-cols-2 gap-1 border-t border-white/5 px-4 py-3 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
