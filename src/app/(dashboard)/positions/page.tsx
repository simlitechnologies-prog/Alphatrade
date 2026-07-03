"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { WidgetCard, StatCard } from "@/components/dashboard/widgets";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import { openPositions, portfolioStats } from "@/data/dashboard";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

export default function PositionsPage() {
  const [positions, setPositions] = useState(openPositions);
  const totalPnL = positions.reduce((s, p) => s + p.pnl, 0);
  const winning = positions.filter((p) => p.pnl > 0).length;

  function closePosition(id: string) {
    setPositions((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Open Positions</h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total open" value={String(positions.length)} icon={Activity} accent="blue" />
        <StatCard label="Total P&L" value={formatCurrency(totalPnL)} trend={portfolioStats.openPnLPercent} icon={TrendingUp} accent={totalPnL >= 0 ? "green" : "red"} />
        <StatCard label="Winning" value={String(winning)} sub={`${positions.length > 0 ? Math.round((winning / positions.length) * 100) : 0}% win rate`} icon={TrendingUp} accent="green" />
        <StatCard label="Losing" value={String(positions.length - winning)} icon={TrendingDown} accent="red" />
      </div>

      <WidgetCard title={`Live positions (${positions.length})`}>
        {positions.length === 0 ? (
          <div className="py-16 text-center text-foreground/40">
            <Activity size={32} className="mx-auto mb-3 opacity-30" />
            <p>No open positions</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-medium text-foreground/50 dark:border-slate-800">
                  {["Symbol", "Dir.", "Lots", "Open @", "Current", "S/L", "T/P", "P&L", "P&L %", "Opened", ""].map((h) => (
                    <th key={h} className="whitespace-nowrap pb-3 pr-4 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {positions.map((pos) => {
                  const isUp = pos.pnl >= 0;
                  return (
                    <tr key={pos.id} className="text-foreground/80 hover:bg-brand-muted/50 dark:hover:bg-slate-900/30">
                      <td className="py-3 pr-4 font-bold text-foreground whitespace-nowrap">{pos.symbol}</td>
                      <td className="py-3 pr-4">
                        <span className={cn("rounded px-2 py-0.5 text-xs font-semibold uppercase", pos.direction === "buy" ? "bg-green-50 text-brand-success" : "bg-red-50 text-brand-danger")}>
                          {pos.direction}
                        </span>
                      </td>
                      <td className="tabular py-3 pr-4">{pos.lots}</td>
                      <td className="tabular py-3 pr-4 text-foreground/60">{pos.openPrice}</td>
                      <td className="tabular py-3 pr-4 font-medium text-foreground">{pos.currentPrice}</td>
                      <td className="tabular py-3 pr-4 text-brand-danger/70">{pos.stopLoss ?? "—"}</td>
                      <td className="tabular py-3 pr-4 text-brand-success/70">{pos.takeProfit ?? "—"}</td>
                      <td className={cn("tabular py-3 pr-4 font-bold", isUp ? "text-brand-success" : "text-brand-danger")}>
                        {isUp ? "+" : ""}{formatCurrency(pos.pnl)}
                      </td>
                      <td className={cn("tabular py-3 pr-4 font-medium", isUp ? "text-brand-success" : "text-brand-danger")}>
                        {formatPercent(pos.pnlPercent)}
                      </td>
                      <td className="py-3 pr-4 text-xs text-foreground/40 whitespace-nowrap">
                        {new Date(pos.openedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => closePosition(pos.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-danger/10 text-brand-danger hover:bg-brand-danger hover:text-white transition-colors"
                          title="Close position"
                        >
                          <X size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </WidgetCard>
    </div>
  );
}
