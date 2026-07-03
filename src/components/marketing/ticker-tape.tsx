import { tickerAssets } from "@/data/markets";
import { formatPrice, formatPercent, cn } from "@/lib/utils";

function TickerItem({ asset }: { asset: (typeof tickerAssets)[number] }) {
  const isUp = asset.changePercent >= 0;
  return (
    <div className="flex items-center gap-3 px-6 py-3 whitespace-nowrap border-r border-white/10">
      <span className="font-display text-sm font-semibold text-white">
        {asset.symbol}
      </span>
      <span className="tabular text-sm text-white/80">
        {formatPrice(asset.price, asset.price > 100 ? 2 : 4)}
      </span>
      <span
        className={cn(
          "tabular text-xs font-medium px-1.5 py-0.5 rounded",
          isUp ? "text-green-400" : "text-red-400"
        )}
      >
        {formatPercent(asset.changePercent)}
      </span>
    </div>
  );
}

export function TickerTape() {
  const loop = [...tickerAssets, ...tickerAssets];
  return (
    <div
      className="relative w-full overflow-hidden bg-brand-primary border-y border-white/10"
      role="region"
      aria-label="Live market price ticker"
    >
      <div className="flex ticker-track w-max">
        {loop.map((asset, i) => (
          <TickerItem key={`${asset.id}-${i}`} asset={asset} />
        ))}
      </div>
    </div>
  );
}
