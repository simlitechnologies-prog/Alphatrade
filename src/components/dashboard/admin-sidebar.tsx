"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Users, Briefcase, BarChart2, ClipboardList,
  ArrowLeftRight, ArrowDownToLine, ArrowUpFromLine, Newspaper,
  HelpCircle, ShieldCheck, AlertTriangle, FileText, PieChart,
  Bell, UserCog, KeyRound, Lock, Settings, ChevronLeft,
  ChevronRight, TrendingUp, Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin-dashboard/analytics", label: "Analytics", icon: PieChart },
      { href: "/admin-dashboard/reports", label: "Reports", icon: FileText },
    ],
  },
  {
    label: "Users",
    items: [
      { href: "/admin-dashboard/users", label: "Users", icon: Users },
      { href: "/admin-dashboard/accounts", label: "Accounts", icon: Briefcase },
    ],
  },
  {
    label: "Markets & Trading",
    items: [
      { href: "/admin-dashboard/markets", label: "Markets", icon: BarChart2 },
      { href: "/admin-dashboard/orders", label: "Orders", icon: ClipboardList },
      { href: "/admin-dashboard/trades", label: "Trades", icon: ArrowLeftRight },
    ],
  },
  {
    label: "Finance",
    items: [
      { href: "/admin-dashboard/deposits", label: "Deposits", icon: ArrowDownToLine },
      { href: "/admin-dashboard/withdrawals", label: "Withdrawals", icon: ArrowUpFromLine },
    ],
  },
  {
    label: "Compliance",
    items: [
      { href: "/admin-dashboard/kyc", label: "KYC", icon: ShieldCheck },
      { href: "/admin-dashboard/aml", label: "AML", icon: AlertTriangle },
    ],
  },
  {
    label: "Content & Support",
    items: [
      { href: "/admin-dashboard/news", label: "News", icon: Newspaper },
      { href: "/admin-dashboard/support", label: "Support", icon: HelpCircle },
      { href: "/admin-dashboard/notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    label: "Administration",
    items: [
      { href: "/admin-dashboard/admins", label: "Admins", icon: UserCog },
      { href: "/admin-dashboard/roles", label: "Roles", icon: KeyRound },
      { href: "/admin-dashboard/permissions", label: "Permissions", icon: Lock },
      { href: "/admin-dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "flex h-screen flex-col border-r border-slate-800 bg-slate-950 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className={cn("flex items-center gap-2.5 border-b border-slate-800 px-4 py-5", collapsed && "justify-center px-0")}>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-danger text-white">
          <Shield size={16} strokeWidth={2.5} />
        </span>
        {!collapsed && (
          <div>
            <p className="font-display text-sm font-bold text-white">AlphaTrade</p>
            <p className="text-[10px] font-medium uppercase tracking-widest text-red-400">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-1">
            {!collapsed && (
              <p className="px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              const active = pathname === item.href || (item.href !== "/admin-dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                    collapsed && "justify-center px-0",
                    active ? "bg-brand-danger/20 text-brand-danger font-medium" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <item.icon size={17} className="shrink-0" />
                  {!collapsed && item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-3 space-y-1">
        {!collapsed && (
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-danger text-xs font-bold text-white">A</div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-white">Super Admin</p>
              <p className="truncate text-[10px] text-slate-500">admin@alphatrademarkets.com</p>
            </div>
          </div>
        )}
        <Link href="/" className={cn("flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs text-slate-500 hover:text-white transition-colors", collapsed && "justify-center")}>
          <TrendingUp size={14} />
          {!collapsed && "View public site"}
        </Link>
        <button onClick={() => setCollapsed(!collapsed)} className={cn("flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs text-slate-600 hover:text-white transition-colors", collapsed && "justify-center")}>
          {collapsed ? <ChevronRight size={14} /> : <><ChevronLeft size={14} /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}
