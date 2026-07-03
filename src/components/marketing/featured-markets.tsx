import Link from "next/link";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice, formatPercent, cn } from "@/lib/utils";
import { featuredMarkets } from "@/data/markets";

const classLabel: Record<string, string> = {
  forex: "Forex",
  stock: "Stock",
  commodity: "Commodity",
  index: "Index",
  etf: "ETF",
  crypto: "Crypto",
};

export function FeaturedMarkets() {
  return (
    <section className="bg-brand-muted py-20 lg:py-28" id="markets">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand-secondary">
              Live markets
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              Featured markets, moving now
            </h2>
          </div>
          <Link href="/markets">
            <Button variant="outline" size="sm">
              View all markets
            </Button>
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredMarkets.map((asset) => {
            const isUp = asset.changePercent >= 0;
            return (
              <Card
                key={asset.id}
                className="group transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <Badge tone="neutral">{classLabel[asset.assetClass]}</Badge>
                  {isUp ? (
                    <ArrowUpRight size={16} className="text-brand-success" />
                  ) : (
                    <ArrowDownRight size={16} className="text-brand-danger" />
                  )}
                </div>
                <p className="font-display mt-4 text-lg font-bold text-foreground">
                  {asset.symbol}
                </p>
                <p className="text-xs text-foreground/50">{asset.name}</p>
                <p className="tabular mt-4 text-2xl font-semibold text-foreground">
                  {formatPrice(asset.price, asset.price > 100 ? 2 : 4)}
                </p>
                <p
                  className={cn(
                    "tabular mt-1 text-sm font-medium",
                    isUp ? "text-brand-success" : "text-brand-danger"
                  )}
                >
                  {formatPercent(asset.changePercent)}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button variant="success" size="sm" className="w-full">
                    Buy
                  </Button>
                  <Button variant="danger" size="sm" className="w-full">
                    Sell
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
