"use client";

import {
  Wallet,
  TrendingUp,
  Activity,
  ClipboardList,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { StatCard, WidgetCard, PnLBadge } from "@/components/dashboard/widgets";
import { formatCurrency, formatPrice, formatPercent, cn } from "@/lib/utils";
import {
  portfolioStats,
  openPositions,
  pendingOrders,
  watchlistItems,
  portfolioGrowthData,
  dailyPnLData,
  allocationData,
  newsItems,
  calendarEvents,
} from "@/data/dashboard";

export default function DashboardPage() {
  const topPositions = openPositions.slice(0, 4);
  const topWatchlist = watchlistItems.slice(0, 6);
  const upcomingEvents = calendarEvents.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Good morning, Kwame 👋</h2>
          <p className="text-sm text-foreground/50">Monday, June 30, 2026 · London session open</p>
        </div>
        <PnLBadge value={portfolioStats.todayPnL} percent={portfolioStats.todayPnLPercent} />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Portfolio balance"
          value={formatCurrency(portfolioStats.balance)}
          trend={portfolioStats.allTimePnLPercent}
          sub="all time"
          icon={Wallet}
          accent="blue"
        />
        <StatCard
          label="Today's P&L"
          value={formatCurrency(portfolioStats.todayPnL)}
          trend={portfolioStats.todayPnLPercent}
          sub="vs yesterday"
          icon={TrendingUp}
          accent="green"
        />
        <StatCard
          label="Open positions"
          value={String(openPositions.length)}
          sub={`Margin: ${formatCurrency(portfolioStats.usedMargin)}`}
          icon={Activity}
          accent="amber"
        />
        <StatCard
          label="Pending orders"
          value={String(pendingOrders.length)}
          sub="awaiting execution"
          icon={ClipboardList}
          accent="blue"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Portfolio growth */}
        <WidgetCard title="Portfolio growth" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={portfolioGrowthData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: unknown) => formatCurrency(v as number)} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Area type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2} fill="url(#pGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </WidgetCard>

        {/* Asset allocation */}
        <WidgetCard title="Asset allocation">
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={allocationData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} dataKey="value" paddingAngle={3}>
                  {allocationData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 w-full space-y-1.5">
              {allocationData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-foreground/60">{item.name}</span>
                  </div>
                  <span className="tabular font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </WidgetCard>
      </div>

      {/* Middle row: positions + watchlist */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Open positions */}
        <WidgetCard
          title={`Open positions (${openPositions.length})`}
          action={<a href="/positions" className="text-brand-secondary hover:underline">View all</a>}
        >
          <div className="space-y-2">
            {topPositions.map((pos) => {
              const isUp = pos.pnl >= 0;
              return (
                <div key={pos.id} className="flex items-center justify-between rounded-lg bg-brand-muted px-3 py-2.5 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2.5">
                    <span className={cn("h-2 w-2 shrink-0 rounded-full", isUp ? "bg-brand-success" : "bg-brand-danger")} />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{pos.symbol}</p>
                      <p className="text-xs text-foreground/45 capitalize">{pos.direction} · {pos.lots} lots</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("tabular text-sm font-semibold", isUp ? "text-brand-success" : "text-brand-danger")}>
                      {isUp ? "+" : ""}{formatCurrency(pos.pnl)}
                    </p>
                    <p className={cn("tabular text-xs", isUp ? "text-brand-success" : "text-brand-danger")}>
                      {formatPercent(pos.pnlPercent)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </WidgetCard>

        {/* Watchlist */}
        <WidgetCard
          title="Watchlist"
          action={<a href="/watchlist" className="text-brand-secondary hover:underline">Manage</a>}
        >
          <div className="space-y-1">
            {topWatchlist.map((item) => {
              const isUp = item.changePercent >= 0;
              return (
                <div key={item.id} className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-brand-muted transition-colors dark:hover:bg-slate-900/40">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.symbol}</p>
                    <p className="text-xs text-foreground/45">{item.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="tabular text-sm text-foreground">{formatPrice(item.price, item.price > 100 ? 2 : 4)}</p>
                    <p className={cn("tabular text-xs font-medium", isUp ? "text-brand-success" : "text-brand-danger")}>
                      {formatPercent(item.changePercent)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </WidgetCard>
      </div>

      {/* Bottom row: daily P&L + news + calendar */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Daily P&L bar chart */}
        <WidgetCard title="Daily P&L this week">
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={dailyPnLData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip formatter={(v: unknown) => formatCurrency(v as number)} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                {dailyPnLData.map((entry) => (
                  <Cell key={entry.day} fill={entry.pnl >= 0 ? "#16A34A" : "#DC2626"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </WidgetCard>

        {/* News feed */}
        <WidgetCard
          title="Market news"
          action={<a href="/dashboard/news" className="text-brand-secondary hover:underline">All news</a>}
        >
          <div className="space-y-3">
            {newsItems.slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-start gap-2.5 border-b border-slate-100 pb-3 last:border-0 last:pb-0 dark:border-slate-800">
                <span className={cn("mt-0.5 h-2 w-2 shrink-0 rounded-full", item.impact === "high" ? "bg-brand-danger" : "bg-brand-accent")} />
                <div>
                  <p className="text-xs font-medium text-foreground leading-snug">{item.title}</p>
                  <p className="mt-0.5 text-[10px] text-foreground/40">{item.category} · {item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>

        {/* Economic calendar */}
        <WidgetCard
          title="Upcoming events"
          action={<a href="/calendar" className="text-brand-secondary hover:underline">Full calendar</a>}
        >
          <div className="space-y-3">
            {upcomingEvents.map((ev) => (
              <div key={ev.id} className="flex items-start gap-2.5 border-b border-slate-100 pb-3 last:border-0 last:pb-0 dark:border-slate-800">
                <span className={cn("mt-1 h-1.5 w-1.5 shrink-0 rounded-full", ev.impact === "high" ? "bg-brand-danger" : ev.impact === "medium" ? "bg-brand-accent" : "bg-slate-300")} />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-medium text-foreground">{ev.event}</p>
                  <p className="text-[10px] text-foreground/40">{ev.country} · {ev.date} {ev.time} UTC</p>
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>

      {/* Equity summary strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {[
          { label: "Equity", value: formatCurrency(portfolioStats.equity) },
          { label: "Free margin", value: formatCurrency(portfolioStats.freeMargin) },
          { label: "Used margin", value: formatCurrency(portfolioStats.usedMargin) },
          { label: "Margin level", value: `${portfolioStats.marginLevel.toFixed(1)}%` },
          { label: "Weekly P&L", value: formatCurrency(portfolioStats.weeklyPnL) },
          { label: "All-time P&L", value: formatCurrency(portfolioStats.allTimePnL) },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-brand-primary/40">
            <p className="text-[10px] font-medium uppercase tracking-wide text-foreground/40">{item.label}</p>
            <p className="tabular mt-1 text-sm font-semibold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
