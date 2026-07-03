import { WidgetCard } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/card";
import { formatPrice, formatPercent, cn } from "@/lib/utils";
import { tickerAssets } from "@/data/markets";

const classLabel: Record<string, string> = {
  forex: "Forex", stock: "Stock", commodity: "Commodity",
  index: "Index", etf: "ETF", crypto: "Crypto",
};

export default function DashboardMarketsPage() {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Markets</h2>
      <WidgetCard title="All instruments">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-medium text-foreground/50 dark:border-slate-800">
                {["Symbol", "Name", "Class", "Price", "Change", "High", "Low", ""].map((h) => (
                  <th key={h} className="whitespace-nowrap pb-3 pr-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {tickerAssets.map((asset) => {
                const isUp = asset.changePercent >= 0;
                return (
                  <tr key={asset.id} className="hover:bg-brand-muted/40 dark:hover:bg-slate-900/20">
                    <td className="py-3 pr-4 font-bold text-foreground whitespace-nowrap">{asset.symbol}</td>
                    <td className="py-3 pr-4 text-foreground/60 max-w-[160px] truncate">{asset.name}</td>
                    <td className="py-3 pr-4">
                      <Badge tone="neutral" className="text-[10px]">{classLabel[asset.assetClass]}</Badge>
                    </td>
                    <td className="tabular py-3 pr-4 font-semibold text-foreground">
                      {formatPrice(asset.price, asset.price > 100 ? 2 : 4)}
                    </td>
                    <td className={cn("tabular py-3 pr-4 font-medium", isUp ? "text-brand-success" : "text-brand-danger")}>
                      {formatPercent(asset.changePercent)}
                    </td>
                    <td className="tabular py-3 pr-4 text-foreground/50">{formatPrice(asset.dayHigh, asset.dayHigh > 100 ? 2 : 4)}</td>
                    <td className="tabular py-3 pr-4 text-foreground/50">{formatPrice(asset.dayLow, asset.dayLow > 100 ? 2 : 4)}</td>
                    <td className="py-3">
                      <div className="flex gap-1.5">
                        <button className="rounded bg-green-50 px-2.5 py-1 text-xs font-semibold text-brand-success hover:bg-brand-success hover:text-white transition-colors">Buy</button>
                        <button className="rounded bg-red-50 px-2.5 py-1 text-xs font-semibold text-brand-danger hover:bg-brand-danger hover:text-white transition-colors">Sell</button>
                      </div>
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
