"use client";

import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Users, DollarSign, Activity, AlertTriangle,
  ShieldCheck, HelpCircle, TrendingUp, ArrowDownToLine,
} from "lucide-react";
import { AdminStatCard, AdminCard, PageHeader } from "@/components/dashboard/admin-widgets";
import { formatCurrency } from "@/lib/utils";
import { adminStats, analyticsData, kycQueue, amlFlags, adminTickets } from "@/data/admin";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        sub={`Platform overview · ${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`}
      />

      {/* KPI Row 1 */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <AdminStatCard label="Total users" value={adminStats.totalUsers.toLocaleString()} sub={`+${adminStats.newThisWeek.toLocaleString()} this week`} icon={Users} tone="blue" />
        <AdminStatCard label="Active today" value={adminStats.activeToday.toLocaleString()} sub="unique sessions" icon={Activity} tone="green" />
        <AdminStatCard label="Daily volume" value={`$${(adminStats.dailyVolume / 1e9).toFixed(2)}B`} sub="trading volume" icon={TrendingUp} tone="blue" />
        <AdminStatCard label="Total deposited" value={`$${(adminStats.totalDeposited / 1e9).toFixed(1)}B`} sub="all time" icon={ArrowDownToLine} tone="green" />
      </div>

      {/* KPI Row 2 — alerts */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <AdminStatCard label="Pending KYC" value={adminStats.pendingKYC} sub="awaiting review" icon={ShieldCheck} tone="amber" alert={adminStats.pendingKYC > 0} />
        <AdminStatCard label="AML flags" value={adminStats.amlFlags} sub="need attention" icon={AlertTriangle} tone="red" alert={adminStats.amlFlags > 0} />
        <AdminStatCard label="Open tickets" value={adminStats.openTickets} sub="support queue" icon={HelpCircle} tone="amber" alert />
        <AdminStatCard label="Pending withdrawals" value={adminStats.pendingWithdrawals} sub="awaiting approval" icon={DollarSign} tone="amber" alert />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AdminCard title="User growth (6 months)">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={analyticsData.userGrowth} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="uGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1e6).toFixed(1)}M`} />
              <Tooltip formatter={(v: unknown) => `${(v as number).toLocaleString()} users`} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Area type="monotone" dataKey="users" stroke="#2563EB" strokeWidth={2} fill="url(#uGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </AdminCard>

        <AdminCard title="Monthly revenue ($)">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticsData.revenueByMonth} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1e6).toFixed(1)}M`} />
              <Tooltip formatter={(v: unknown) => formatCurrency(v as number)} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="revenue" radius={[4, 4, 0, 0]} fill="#16A34A" />
            </BarChart>
          </ResponsiveContainer>
        </AdminCard>
      </div>

      {/* Action queues */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* KYC queue */}
        <AdminCard
          title={`KYC queue (${kycQueue.filter(k => k.status === "pending").length} pending)`}
          action={<a href="/admin-dashboard/kyc" className="text-brand-secondary hover:underline">Review all</a>}
        >
          <div className="space-y-2">
            {kycQueue.slice(0, 4).map((app) => (
              <div key={app.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 dark:bg-slate-800">
                <div>
                  <p className="text-sm font-medium text-foreground dark:text-white">{app.userName}</p>
                  <p className="text-xs text-foreground/45">{app.country} · {app.idType}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${app.risk === "high" ? "bg-red-50 text-brand-danger" : app.risk === "medium" ? "bg-amber-50 text-brand-accent" : "bg-green-50 text-brand-success"}`}>
                  {app.risk}
                </span>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* AML flags */}
        <AdminCard
          title={`AML flags (${amlFlags.length})`}
          action={<a href="/admin-dashboard/aml" className="text-brand-danger hover:underline">Review all</a>}
        >
          <div className="space-y-2">
            {amlFlags.map((flag) => (
              <div key={flag.id} className="flex items-start gap-2.5 rounded-lg bg-slate-50 px-3 py-2.5 dark:bg-slate-800">
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${flag.severity === "critical" ? "bg-brand-danger" : flag.severity === "high" ? "bg-orange-500" : "bg-brand-accent"}`} />
                <div>
                  <p className="text-sm font-medium text-foreground dark:text-white">{flag.userName}</p>
                  <p className="text-xs text-foreground/45">{flag.flagType}</p>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Open tickets */}
        <AdminCard
          title={`Support tickets (${adminTickets.filter(t => t.status === "open").length} open)`}
          action={<a href="/admin-dashboard/support" className="text-brand-secondary hover:underline">View all</a>}
        >
          <div className="space-y-2">
            {adminTickets.filter(t => t.status === "open").slice(0, 4).map((t) => (
              <div key={t.id} className="rounded-lg bg-slate-50 px-3 py-2.5 dark:bg-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-foreground/40">{t.id}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${t.priority === "urgent" ? "bg-red-50 text-brand-danger" : t.priority === "high" ? "bg-amber-50 text-brand-accent" : "bg-slate-100 text-slate-500"}`}>{t.priority}</span>
                </div>
                <p className="mt-0.5 text-xs font-medium text-foreground dark:text-white truncate">{t.subject}</p>
                <p className="text-[10px] text-foreground/40">{t.userName} · {t.category}</p>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      {/* Top countries */}
      <AdminCard title="Top countries by user count">
        <div className="space-y-3">
          {analyticsData.topCountries.map((c) => (
            <div key={c.country} className="flex items-center gap-3">
              <span className="w-32 shrink-0 text-sm text-foreground dark:text-white">{c.country}</span>
              <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-2 rounded-full bg-brand-secondary" style={{ width: `${c.pct}%` }} />
              </div>
              <span className="tabular w-16 text-right text-xs text-foreground/50">{c.users.toLocaleString()}</span>
              <span className="tabular w-10 text-right text-xs font-medium text-foreground dark:text-white">{c.pct}%</span>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
