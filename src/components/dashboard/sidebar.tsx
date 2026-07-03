"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PieChart,
  BarChart2,
  Star,
  ArrowLeftRight,
  ClipboardList,
  Activity,
  History,
  ArrowDownToLine,
  ArrowUpFromLine,
  Wallet,
  Newspaper,
  CalendarDays,
  Bell,
  Settings,
  HelpCircle,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/portfolio", label: "Portfolio", icon: PieChart },
      { href: "/dashboard/markets", label: "Markets", icon: BarChart2 },
      { href: "/watchlist", label: "Watchlist", icon: Star },
    ],
  },
  {
    label: "Trading",
    items: [
      { href: "/trade", label: "Trade", icon: ArrowLeftRight },
      { href: "/orders", label: "Orders", icon: ClipboardList },
      { href: "/positions", label: "Positions", icon: Activity },
      { href: "/history", label: "History", icon: History },
    ],
  },
  {
    label: "Finance",
    items: [
      { href: "/deposits", label: "Deposits", icon: ArrowDownToLine },
      { href: "/withdrawals", label: "Withdrawals", icon: ArrowUpFromLine },
      { href: "/wallet", label: "Wallet", icon: Wallet },
    ],
  },
  {
    label: "Insights",
    items: [
      { href: "/dashboard/news", label: "News", icon: Newspaper },
      { href: "/calendar", label: "Calendar", icon: CalendarDays },
      { href: "/alerts", label: "Alerts", icon: Bell },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/settings", label: "Settings", icon: Settings },
      { href: "/support", label: "Support", icon: HelpCircle },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-slate-200 bg-brand-primary transition-all duration-300 dark:border-slate-800",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-2.5 px-4 py-5 border-b border-white/10", collapsed && "justify-center px-0")}>
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-secondary text-white">
            <TrendingUp size={16} strokeWidth={2.5} />
          </span>
          {!collapsed && (
            <span className="font-display text-sm font-bold text-white">
              AlphaTrade
            </span>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-1">
            {!collapsed && (
              <p className="px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                    collapsed && "justify-center px-0",
                    active
                      ? "bg-white/10 text-white font-medium"
                      : "text-white/55 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon size={18} className="shrink-0" />
                  {!collapsed && item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3 space-y-1">
        {!collapsed && (
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-sm font-bold text-white">
              K
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">Kwame Mensah</p>
              <p className="truncate text-xs text-white/40">Pro Account</p>
            </div>
          </div>
        )}
        <button className={cn("flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-white/50 hover:text-white transition-colors", collapsed && "justify-center")}>
          <LogOut size={16} />
          {!collapsed && "Log out"}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn("flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-xs text-white/30 hover:text-white transition-colors", collapsed && "justify-center")}
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}
