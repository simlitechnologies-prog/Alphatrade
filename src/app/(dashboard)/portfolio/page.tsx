"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";
import { WidgetCard, StatCard, PnLBadge } from "@/components/dashboard/widgets";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import {
  portfolioStats, openPositions, portfolioGrowthData, allocationData,
} from "@/data/dashboard";
import { TrendingUp, PieChart as PieIcon, BarChart2 } from "lucide-react";

const monthlyReturns = [
  { month: "Jan", return: 4.2 }, { month: "Feb", return: -2.3 },
  { month: "Mar", return: 6.5 }, { month: "Apr", return: 1.8 },
  { month: "May", return: 6.3 }, { month: "Jun", return: 11.8 },
];

export default function PortfolioPage() {
  const totalPnL = openPositions.reduce((s, p) => s + p.pnl, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-bold text-foreground">Portfolio</h2>
        <PnLBadge value={portfolioStats.todayPnL} percent={portfolioStats.todayPnLPercent} />
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Portfolio balance" value={formatCurrency(portfolioStats.balance)} icon={TrendingUp} accent="blue" />
        <StatCard label="Open P&L" value={formatCurrency(totalPnL)} trend={portfolioStats.openPnLPercent} icon={PieIcon} accent="green" />
        <StatCard label="Equity" value={formatCurrency(portfolioStats.equity)} icon={BarChart2} accent="amber" />
        <StatCard label="All-time P&L" value={formatCurrency(portfolioStats.allTimePnL)} trend={portfolioStats.allTimePnLPercent} icon={TrendingUp} accent="green" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <WidgetCard title="Portfolio growth (6 months)" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={portfolioGrowthData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="pGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: unknown) => formatCurrency(v as number)} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Area type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2.5} fill="url(#pGrad2)" />
            </AreaChart>
          </ResponsiveContainer>
        </WidgetCard>

        <WidgetCard title="Allocation">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={allocationData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" paddingAngle={4}>
                {allocationData.map((e) => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v: unknown) => `${v}%`} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {allocationData.map((item) => (
              <div key={item.name} className="flex justify-between text-xs">
                <span className="flex items-center gap-1.5 text-foreground/60">
                  <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                  {item.name}
                </span>
                <span className="tabular font-medium text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>

      {/* Monthly returns */}
      <WidgetCard title="Monthly returns (%)">
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={monthlyReturns} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip formatter={(v: unknown) => `${v}%`} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Bar dataKey="return" radius={[4, 4, 0, 0]}>
              {monthlyReturns.map((e) => <Cell key={e.month} fill={e.return >= 0 ? "#16A34A" : "#DC2626"} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </WidgetCard>

      {/* Positions table */}
      <WidgetCard title={`Open positions (${openPositions.length})`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-medium text-foreground/50 border-b border-slate-100 dark:border-slate-800">
                {["Symbol", "Direction", "Lots", "Open price", "Current", "P&L", "P&L %", "S/L", "T/P"].map((h) => (
                  <th key={h} className="pb-3 pr-4 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {openPositions.map((pos) => {
                const isUp = pos.pnl >= 0;
                return (
                  <tr key={pos.id} className="text-foreground/80">
                    <td className="py-3 pr-4 font-semibold text-foreground whitespace-nowrap">{pos.symbol}</td>
                    <td className="py-3 pr-4">
                      <span className={cn("rounded px-2 py-0.5 text-xs font-medium uppercase", pos.direction === "buy" ? "bg-green-50 text-brand-success" : "bg-red-50 text-brand-danger")}>
                        {pos.direction}
                      </span>
                    </td>
                    <td className="tabular py-3 pr-4">{pos.lots}</td>
                    <td className="tabular py-3 pr-4">{pos.openPrice}</td>
                    <td className="tabular py-3 pr-4">{pos.currentPrice}</td>
                    <td className={cn("tabular py-3 pr-4 font-semibold", isUp ? "text-brand-success" : "text-brand-danger")}>
                      {isUp ? "+" : ""}{formatCurrency(pos.pnl)}
                    </td>
                    <td className={cn("tabular py-3 pr-4 font-medium", isUp ? "text-brand-success" : "text-brand-danger")}>
                      {formatPercent(pos.pnlPercent)}
                    </td>
                    <td className="tabular py-3 pr-4 text-foreground/50">{pos.stopLoss ?? "—"}</td>
                    <td className="tabular py-3 pr-4 text-foreground/50">{pos.takeProfit ?? "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </WidgetCard>
    </div>
  );
}
