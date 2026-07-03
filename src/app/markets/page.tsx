import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, DollarSign, BarChart2, Globe2, Layers, Bitcoin } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/marketing/page-hero";
import { Card } from "@/components/ui/card";
import { TickerTape } from "@/components/marketing/ticker-tape";
import { tickerAssets } from "@/data/markets";
import { formatPrice, formatPercent, cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Markets Overview",
  description: "Explore 180+ markets on AlphaTrade — forex pairs, global stocks, commodities, indices, ETFs and crypto.",
};

const categories = [
  { href: "/forex", label: "Forex", icon: DollarSign, description: "70+ major, minor and exotic currency pairs", count: 70 },
  { href: "/stocks", label: "Stocks", icon: TrendingUp, description: "US and global equities from NYSE, NASDAQ and more", count: 60 },
  { href: "/commodities", label: "Commodities", icon: Globe2, description: "Gold, silver, oil, gas and agricultural products", count: 20 },
  { href: "/indices", label: "Indices", icon: BarChart2, description: "Major world indices including S&P 500, FTSE, DAX", count: 15 },
  { href: "/etfs", label: "ETFs", icon: Layers, description: "Exchange-traded funds tracking sectors and asset classes", count: 25 },
  { href: "/cryptocurrency", label: "Crypto", icon: Bitcoin, description: "Top cryptocurrencies by market capitalisation", count: 15 },
];

export default function MarketsPage() {
  const topMovers = [...tickerAssets]
    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
    .slice(0, 6);

  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="All markets"
        title="180+ markets, one account"
        description="From major forex pairs to US tech stocks and crypto — trade every market that matters without switching platforms."
        icon={BarChart2}
      />
      <TickerTape />

      {/* Category cards */}
      <section className="bg-white py-16 dark:bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Browse by asset class</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link key={cat.href} href={cat.href}>
                <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow group">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                      <cat.icon size={20} />
                    </span>
                    <div>
                      <p className="font-display font-semibold text-foreground">{cat.label}</p>
                      <p className="text-xs text-foreground/50">{cat.count}+ instruments</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-foreground/60">{cat.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top movers */}
      <section className="bg-brand-muted py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Today&apos;s top movers</h2>
          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-brand-primary/40">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-xs text-foreground/50">
                  <th className="px-5 py-3 text-left font-medium">Instrument</th>
                  <th className="px-5 py-3 text-right font-medium">Price</th>
                  <th className="px-5 py-3 text-right font-medium">Change</th>
                  <th className="px-5 py-3 text-right font-medium">Day High</th>
                  <th className="px-5 py-3 text-right font-medium">Day Low</th>
                  <th className="px-5 py-3 text-right font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {topMovers.map((asset, i) => {
                  const isUp = asset.changePercent >= 0;
                  return (
                    <tr key={asset.id} className={cn("border-b border-slate-100 dark:border-slate-800 last:border-0", i % 2 === 0 ? "" : "bg-slate-50/50 dark:bg-slate-900/20")}>
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-foreground">{asset.symbol}</p>
                        <p className="text-xs text-foreground/50">{asset.name}</p>
                      </td>
                      <td className="tabular px-5 py-3.5 text-right text-foreground">
                        {formatPrice(asset.price, asset.price > 100 ? 2 : 4)}
                      </td>
                      <td className={cn("tabular px-5 py-3.5 text-right font-medium", isUp ? "text-brand-success" : "text-brand-danger")}>
                        {formatPercent(asset.changePercent)}
                      </td>
                      <td className="tabular px-5 py-3.5 text-right text-foreground/60">
                        {formatPrice(asset.dayHigh, asset.dayHigh > 100 ? 2 : 4)}
                      </td>
                      <td className="tabular px-5 py-3.5 text-right text-foreground/60">
                        {formatPrice(asset.dayLow, asset.dayLow > 100 ? 2 : 4)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="rounded bg-brand-success/10 px-2.5 py-1 text-xs font-medium text-brand-success hover:bg-brand-success hover:text-white transition-colors">Buy</button>
                          <button className="rounded bg-brand-danger/10 px-2.5 py-1 text-xs font-medium text-brand-danger hover:bg-brand-danger hover:text-white transition-colors">Sell</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
