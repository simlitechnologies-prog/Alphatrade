"use client";

import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { PageHeader, AdminCard, AdminStatCard } from "@/components/dashboard/admin-widgets";
import { formatCurrency } from "@/lib/utils";
import { analyticsData, adminStats } from "@/data/admin";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" sub="Platform performance metrics" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <AdminStatCard label="Total users" value={adminStats.totalUsers.toLocaleString()} icon={Users} tone="blue" />
        <AdminStatCard label="Daily active" value={adminStats.activeToday.toLocaleString()} icon={Activity} tone="green" />
        <AdminStatCard label="Daily volume" value={`$${(adminStats.dailyVolume / 1e9).toFixed(2)}B`} icon={TrendingUp} tone="blue" />
        <AdminStatCard label="Monthly revenue" value={formatCurrency(3480000)} icon={DollarSign} tone="green" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AdminCard title="User growth">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={analyticsData.userGrowth} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1e6).toFixed(1)}M`} />
              <Tooltip formatter={(v: unknown) => `${(v as number).toLocaleString()} users`} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Area type="monotone" dataKey="users" stroke="#2563EB" strokeWidth={2.5} fill="url(#aGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </AdminCard>

        <AdminCard title="Monthly revenue">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={analyticsData.revenueByMonth} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1e6).toFixed(1)}M`} />
              <Tooltip formatter={(v: unknown) => formatCurrency(v as number)} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="revenue" radius={[4, 4, 0, 0]} fill="#16A34A" />
            </BarChart>
          </ResponsiveContainer>
        </AdminCard>

        <AdminCard title="Daily trading volume (this week — $B)">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={analyticsData.dailyVolume} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}B`} />
              <Tooltip formatter={(v: unknown) => `$${v}B`} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="volume" radius={[4, 4, 0, 0]} fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </AdminCard>

        <AdminCard title="Top countries by users">
          <div className="space-y-3 pt-1">
            {analyticsData.topCountries.map((c) => (
              <div key={c.country} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm text-foreground">{c.country}</span>
                <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-2 rounded-full bg-brand-secondary" style={{ width: `${c.pct * 7}%` }} />
                </div>
                <span className="tabular w-14 text-right text-xs text-foreground/50">{c.users.toLocaleString()}</span>
                <span className="tabular w-10 text-right text-xs font-semibold text-foreground">{c.pct}%</span>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
