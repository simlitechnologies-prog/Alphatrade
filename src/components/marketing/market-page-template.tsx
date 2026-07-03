"use client";

import { useMemo, useState } from "react";
import { Search, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice, formatPercent, cn } from "@/lib/utils";
import type { Asset } from "@/types/market";

type SortKey = "name" | "change" | "price";

function generateSeries(seed: number, isUp: boolean) {
  const points = 24;
  let value = 100;
  const series = [];
  for (let i = 0; i < points; i++) {
    const drift = isUp ? 0.6 : -0.6;
    const noise = Math.sin(seed + i * 1.3) * 2.4;
    value += drift + noise * 0.4;
    series.push({ i, value });
  }
  return series;
}

function MarketCard({ asset }: { asset: Asset }) {
  const isUp = asset.changePercent >= 0;
  const series = useMemo(
    () => generateSeries(asset.id.length + asset.symbol.length, isUp),
    [asset, isUp]
  );

  return (
    <Card className="group transition-shadow hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display text-base font-bold text-foreground">{asset.symbol}</p>
          <p className="text-xs text-foreground/50">{asset.name}</p>
        </div>
        <Badge tone={asset.marketStatus === "open" ? "success" : "neutral"}>
          {asset.marketStatus === "open" ? "Market open" : asset.marketStatus}
        </Badge>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="tabular text-2xl font-semibold text-foreground">
            {formatPrice(asset.price, asset.price > 100 ? 2 : 4)}
          </p>
          <p className={cn("tabular mt-1 flex items-center gap-1 text-sm font-medium", isUp ? "text-brand-success" : "text-brand-danger")}>
            {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {formatPercent(asset.changePercent)}
          </p>
        </div>
        <div className="h-12 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series}>
              <YAxis hide domain={["dataMin", "dataMax"]} />
              <Line type="monotone" dataKey="value" stroke={isUp ? "#16A34A" : "#DC2626"} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 border-t border-slate-100 pt-3 text-xs text-foreground/50 dark:border-slate-800">
        <span>Day high: <span className="tabular text-foreground/70">{formatPrice(asset.dayHigh, asset.dayHigh > 100 ? 2 : 4)}</span></span>
        <span>Day low: <span className="tabular text-foreground/70">{formatPrice(asset.dayLow, asset.dayLow > 100 ? 2 : 4)}</span></span>
        {asset.volume > 0 && (
          <span className="col-span-2">Volume: <span className="tabular text-foreground/70">{asset.volume.toLocaleString("en-US")}</span></span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="success" size="sm" className="w-full">Buy</Button>
        <Button variant="danger" size="sm" className="w-full">Sell</Button>
      </div>
    </Card>
  );
}

// Inner client component (receives primitive props only)
export function MarketPageClient({
  title,
  assets,
}: {
  title: string;
  assets: Asset[];
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("name");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = assets.filter(
      (a) => a.symbol.toLowerCase().includes(q) || a.name.toLowerCase().includes(q)
    );
    result = [...result].sort((a, b) => {
      if (sort === "name") return a.symbol.localeCompare(b.symbol);
      if (sort === "price") return b.price - a.price;
      return b.changePercent - a.changePercent;
    });
    return result;
  }, [assets, query, sort]);

  return (
    <section className="bg-white py-12 dark:bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-4 text-sm text-foreground placeholder:text-foreground/40 focus:border-brand-secondary dark:border-slate-700 dark:bg-brand-primary/40"
            />
          </div>
          <div className="flex items-center gap-2">
            {(["name", "change", "price"] as SortKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setSort(key)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                  sort === key ? "bg-brand-secondary text-white" : "bg-brand-muted text-foreground/60 hover:text-foreground"
                )}
              >
                {key === "name" ? "A–Z" : key === "change" ? "Top movers" : "Price"}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 text-center text-foreground/50">
            <p>No instruments match &ldquo;{query}&rdquo;.</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((asset) => (
              <MarketCard key={asset.id} asset={asset} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Server-compatible wrapper (no icon prop - hero is rendered server-side)
export function MarketPageTemplate({
  eyebrow,
  title,
  description,
  assets,
}: {
  eyebrow: string;
  title: string;
  description: string;
  assets: Asset[];
}) {
  return (
    <main>
      <Navbar />
      {/* Hero rendered inline */}
      <section className="relative overflow-hidden bg-brand-primary py-16 lg:py-20">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand-accent">{eyebrow}</p>
          <h1 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/65">{description}</p>
        </div>
      </section>

      <MarketPageClient title={title} assets={assets} />
      <Footer />
    </main>
  );
}
