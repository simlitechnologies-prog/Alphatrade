import { AdminSidebar } from "@/components/dashboard/admin-sidebar";
import { Bell, Search, Shield } from "lucide-react";
import { adminStats } from "@/data/admin";

function AdminTopbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-2">
        <Shield size={16} className="text-brand-danger" />
        <span className="font-display text-sm font-bold text-foreground dark:text-white">Admin Panel</span>
        <span className="rounded-full bg-brand-danger/10 px-2 py-0.5 text-[10px] font-bold text-brand-danger uppercase tracking-wider">
          Restricted
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
          <input
            placeholder="Search users, tickets…"
            className="h-9 w-52 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-foreground placeholder:text-foreground/40 focus:border-brand-danger focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-foreground/60 hover:text-foreground dark:border-slate-700 dark:text-slate-400">
          <Bell size={16} />
          {adminStats.amlFlags > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-danger text-[10px] font-bold text-white">
              {adminStats.amlFlags}
            </span>
          )}
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-danger text-sm font-bold text-white">
          A
        </div>
      </div>
    </header>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
