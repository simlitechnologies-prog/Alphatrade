import { WidgetCard } from "@/components/dashboard/widgets";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";

const closedTrades = [
  { id: "c1", symbol: "USD/JPY", direction: "sell", lots: 1.5, openPrice: 158.40, closePrice: 157.10, pnl: 1300, pnlPercent: 0.82, openedAt: "2026-06-28T09:00:00Z", closedAt: "2026-06-29T14:22:00Z" },
  { id: "c2", symbol: "MSFT", direction: "buy", lots: 30, openPrice: 435.20, closePrice: 441.58, pnl: 191.40, pnlPercent: 1.47, openedAt: "2026-06-27T13:00:00Z", closedAt: "2026-06-30T10:15:00Z" },
  { id: "c3", symbol: "ETH/USD", direction: "buy", lots: 2.0, openPrice: 3590.00, closePrice: 3512.90, pnl: -1542.20, pnlPercent: -2.15, openedAt: "2026-06-26T08:30:00Z", closedAt: "2026-06-28T16:40:00Z" },
  { id: "c4", symbol: "XAG/USD", direction: "buy", lots: 5.0, openPrice: 28.90, closePrice: 29.84, pnl: 470.00, pnlPercent: 3.25, openedAt: "2026-06-24T11:00:00Z", closedAt: "2026-06-27T09:30:00Z" },
  { id: "c5", symbol: "SPX500", direction: "buy", lots: 0.5, openPrice: 5440.00, closePrice: 5489.12, pnl: 2456.00, pnlPercent: 0.90, openedAt: "2026-06-20T14:00:00Z", closedAt: "2026-06-30T11:00:00Z" },
];

export default function HistoryPage() {
  const totalPnL = closedTrades.reduce((s, t) => s + t.pnl, 0);
  const winners = closedTrades.filter((t) => t.pnl > 0).length;

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Trade History</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total trades", value: String(closedTrades.length) },
          { label: "Total P&L", value: formatCurrency(totalPnL) },
          { label: "Win rate", value: `${Math.round((winners / closedTrades.length) * 100)}%` },
          { label: "Best trade", value: formatCurrency(Math.max(...closedTrades.map((t) => t.pnl))) },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-brand-primary/40">
            <p className="text-xs text-foreground/50">{s.label}</p>
            <p className="tabular mt-1 text-xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <WidgetCard title="Closed trades">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-medium text-foreground/50 dark:border-slate-800">
                {["Symbol", "Dir.", "Lots", "Open @", "Close @", "P&L", "P&L %", "Opened", "Closed"].map((h) => (
                  <th key={h} className="whitespace-nowrap pb-3 pr-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {closedTrades.map((t) => {
                const isUp = t.pnl >= 0;
                return (
                  <tr key={t.id} className="hover:bg-brand-muted/40 dark:hover:bg-slate-900/20">
                    <td className="py-3 pr-4 font-bold text-foreground whitespace-nowrap">{t.symbol}</td>
                    <td className="py-3 pr-4">
                      <span className={cn("rounded px-2 py-0.5 text-xs font-semibold uppercase", t.direction === "buy" ? "bg-green-50 text-brand-success" : "bg-red-50 text-brand-danger")}>
                        {t.direction}
                      </span>
                    </td>
                    <td className="tabular py-3 pr-4 text-foreground/60">{t.lots}</td>
                    <td className="tabular py-3 pr-4 text-foreground/60">{t.openPrice}</td>
                    <td className="tabular py-3 pr-4 text-foreground/70">{t.closePrice}</td>
                    <td className={cn("tabular py-3 pr-4 font-bold", isUp ? "text-brand-success" : "text-brand-danger")}>
                      {isUp ? "+" : ""}{formatCurrency(t.pnl)}
                    </td>
                    <td className={cn("tabular py-3 pr-4 font-medium", isUp ? "text-brand-success" : "text-brand-danger")}>
                      {formatPercent(t.pnlPercent)}
                    </td>
                    <td className="whitespace-nowrap py-3 pr-4 text-xs text-foreground/40">
                      {new Date(t.openedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                    </td>
                    <td className="whitespace-nowrap py-3 text-xs text-foreground/40">
                      {new Date(t.closedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                    </td>
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
