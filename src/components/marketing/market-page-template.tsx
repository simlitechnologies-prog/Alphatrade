"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import {
  Search,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Star,
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPercent, cn } from "@/lib/utils";
import type { Asset } from "@/types/market";
import { fetchQuotes } from "@/services/marketData.service";

// Helper to format currency with €
const formatEuro = (value: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// Generate sparkline series
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

// Market Card Component with Live Data
function MarketCard({ asset }: { asset: Asset; onRefresh?: () => void }) {
  const isUp = asset.changePercent >= 0;
  const series = useMemo(
    () => generateSeries(asset.id.length + asset.symbol.length, isUp),
    [asset, isUp],
  );
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  return (
    <Card className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 dark:from-gray-800/50 dark:to-gray-900/50 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-display text-base font-bold text-gray-900 dark:text-white">
              {asset.symbol}
            </p>
            <button
              onClick={() => setIsWatchlisted(!isWatchlisted)}
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <Star
                size={14}
                className={cn(
                  isWatchlisted && "fill-yellow-400 text-yellow-400",
                )}
              />
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {asset.name}
          </p>
        </div>
        <Badge
          tone={asset.marketStatus === "open" ? "success" : "neutral"}
          className="animate-pulse"
        >
          {asset.marketStatus === "open"
            ? "● Live"
            : asset.marketStatus || "Closed"}
        </Badge>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="tabular text-2xl font-bold text-gray-900 dark:text-white">
            {formatEuro(asset.price)}
          </p>
          <p
            className={cn(
              "tabular mt-1 flex items-center gap-1 text-sm font-semibold",
              isUp ? "text-green-600" : "text-red-600",
            )}
          >
            {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {formatPercent(asset.changePercent)}
          </p>
        </div>
        <div className="h-12 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series}>
              <YAxis hide domain={["dataMin", "dataMax"]} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={isUp ? "#16A34A" : "#DC2626"}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 border-t border-gray-100 pt-3 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <span>
          Day high:{" "}
          <span className="tabular text-gray-700 dark:text-gray-300">
            {formatEuro(asset.dayHigh)}
          </span>
        </span>
        <span>
          Day low:{" "}
          <span className="tabular text-gray-700 dark:text-gray-300">
            {formatEuro(asset.dayLow)}
          </span>
        </span>
        {/* ✅ FIXED: Added check for asset.volume */}
        {asset.volume !== undefined && asset.volume > 0 && (
          <span className="col-span-2">
            Volume:{" "}
            <span className="tabular text-gray-700 dark:text-gray-300">
              {asset.volume.toLocaleString("en-US")}
            </span>
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button
          variant="success"
          size="sm"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg hover:shadow-green-200 transition-all duration-300"
          onClick={() =>
            (window.location.href = `/trade?symbol=${asset.symbol}&direction=buy`)
          }
        >
          Buy
        </Button>
        <Button
          variant="danger"
          size="sm"
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-200 transition-all duration-300"
          onClick={() =>
            (window.location.href = `/trade?symbol=${asset.symbol}&direction=sell`)
          }
        >
          Sell
        </Button>
      </div>
    </Card>
  );
}

// Inner client component with live data
export function MarketPageClient({
  title,
  initialAssets,
}: {
  title: string;
  initialAssets: Asset[];
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("name");
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  type SortKey = "name" | "change" | "price";

  // Fetch live data
  const fetchLiveData = useCallback(async () => {
    if (!assets.length) return;

    setLoading(true);
    setError(null);

    try {
      const symbols = assets.map((a) => a.symbol);
      const liveQuotes = await fetchQuotes(symbols);

      // Update assets with live data
      setAssets((prev) =>
        prev.map((asset) => {
          const live = liveQuotes.find((q) => q.symbol === asset.symbol);
          return live ? { ...asset, ...live } : asset;
        }),
      );
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch live data";
      setError(errorMessage);
      console.error("Error fetching live data:", err);
    } finally {
      setLoading(false);
    }
  }, [assets]);

  // Auto-refresh every 10 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(fetchLiveData, 10000);
    return () => clearInterval(interval);
  }, [fetchLiveData, autoRefresh]);

  // Initial load
  useEffect(() => {
    fetchLiveData();
  }, [fetchLiveData]);

  // Filter and sort
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = assets.filter(
      (a) =>
        a.symbol.toLowerCase().includes(q) || a.name.toLowerCase().includes(q),
    );
    result = [...result].sort((a, b) => {
      if (sort === "name") return a.symbol.localeCompare(b.symbol);
      if (sort === "price") return b.price - a.price;
      return b.changePercent - a.changePercent;
    });
    return result;
  }, [assets, query, sort]);

  // Stats
  const gainers = assets.filter((a) => a.changePercent >= 0).length;
  const losers = assets.filter((a) => a.changePercent < 0).length;
  const totalValue = assets.reduce((sum, a) => sum + a.price, 0);

  return (
    <section className="bg-gray-50 py-8 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Stats Bar */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-500">Total Markets</p>
            <p className="mt-1 text-lg font-bold text-gray-900">
              {assets.length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-500">Gainers</p>
            <p className="mt-1 text-lg font-bold text-green-600">{gainers}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-500">Losers</p>
            <p className="mt-1 text-lg font-bold text-red-600">{losers}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-500">Total Value</p>
            <p className="mt-1 text-lg font-bold text-gray-900">
              {formatEuro(totalValue)}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700 col-span-2 sm:col-span-1">
            <p className="text-xs font-medium text-gray-500">Last Updated</p>
            <p className="mt-1 text-sm font-semibold text-gray-700">
              {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {(["name", "change", "price"] as SortKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setSort(key)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
                  sort === key
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800/50 dark:text-gray-400",
                )}
              >
                {key === "name"
                  ? "A–Z"
                  : key === "change"
                    ? "Top Movers"
                    : "Price"}
              </button>
            ))}

            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
                autoRefresh
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400",
              )}
            >
              {autoRefresh ? "Auto Live" : "Paused"}
            </button>

            <button
              onClick={fetchLiveData}
              disabled={loading}
              className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50 dark:hover:bg-gray-800"
            >
              <RefreshCw size={16} className={cn(loading && "animate-spin")} />
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:border-red-800/30 dark:text-red-400">
            ⚠️ {error}
          </div>
        )}

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="mt-16 text-center text-gray-500">
            <p>No instruments match &ldquo;{query}&rdquo;.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((asset) => (
              <MarketCard key={asset.id} asset={asset} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Server-compatible wrapper
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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 lg:py-20">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
            <span className="text-xs font-semibold text-white/80">
              {eyebrow}
            </span>
          </div>
          <h1 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70">
            {description}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                Live Data
              </span>
              <span className="w-px h-4 bg-white/20" />
              <span>{assets.length} Markets</span>
              <span className="w-px h-4 bg-white/20" />
              <span>24/7 Trading</span>
            </div>
          </div>
        </div>
      </section>

      <MarketPageClient title={title} initialAssets={assets} />
      <Footer />
    </main>
  );
}
