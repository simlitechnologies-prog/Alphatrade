"use client";

import { Bell, Search, Sun, Moon } from "lucide-react";
import { useState } from "react";

export function DashboardTopbar({ title }: { title: string }) {
  const [dark, setDark] = useState(false);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-brand-primary/60">
      <h1 className="font-display text-lg font-bold text-foreground">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
          <input
            placeholder="Search markets…"
            className="h-9 w-48 rounded-lg border border-slate-200 bg-brand-muted pl-8 pr-3 text-xs text-foreground placeholder:text-foreground/40 focus:border-brand-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-900"
          />
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-foreground/60 hover:text-foreground transition-colors dark:border-slate-700"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-foreground/60 hover:text-foreground transition-colors dark:border-slate-700">
          <Bell size={16} />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-danger text-[10px] font-bold text-white">
            3
          </span>
        </button>

        {/* Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-secondary text-sm font-bold text-white">
          K
        </div>
      </div>
    </header>
  );
}
