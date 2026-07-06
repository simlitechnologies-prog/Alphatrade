"use client";

import { useState } from "react";
import {
  Star,
  Search,
  Bell,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  AlertCircle,
  TrendingUp,
  X,
} from "lucide-react";
import { WidgetCard } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { formatPercent, cn } from "@/lib/utils";
import { watchlistItems } from "@/data/dashboard";
import { tickerAssets } from "@/data/markets";

// Helper to format currency with €
const formatEuro = (value: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export default function WatchlistPage() {
  const [items, setItems] = useState(watchlistItems);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const suggestions = tickerAssets.filter(
    (a) =>
      !items.find((i) => i.symbol === a.symbol) &&
      (a.symbol.toLowerCase().includes(query.toLowerCase()) ||
        a.name.toLowerCase().includes(query.toLowerCase())),
  );

  function addToWatchlist(
    symbol: string,
    name: string,
    price: number,
    changePercent: number,
  ) {
    setItems((prev) => [
      ...prev,
      {
        id: `w${Date.now()}`,
        symbol,
        name,
        price,
        changePercent,
        addedAt: new Date().toISOString(),
      },
    ]);
    setQuery("");
    setShowSearch(false);
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  const totalValue = items.reduce((sum, item) => sum + item.price, 0);
  const averageChange =
    items.reduce((sum, item) => sum + item.changePercent, 0) /
    (items.length || 1);
  const gainers = items.filter((item) => item.changePercent >= 0).length;
  const losers = items.filter((item) => item.changePercent < 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-blue-100/50 backdrop-blur-sm">
        <div>
          <h2 className="font-display text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Watchlist
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {items.length} instruments tracked
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowSearch(!showSearch)}
          className="gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300"
        >
          <Plus size={15} /> Add instrument
        </Button>
      </div>

      {/* Quick Stats */}
      {items.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Total Value
            </p>
            <p className="mt-1 text-lg font-bold text-gray-800">
              {formatEuro(totalValue)}
            </p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Avg. Change
            </p>
            <p
              className={cn(
                "mt-1 text-lg font-bold",
                averageChange >= 0 ? "text-green-600" : "text-red-600",
              )}
            >
              {averageChange >= 0 ? "+" : ""}
              {averageChange.toFixed(1)}%
            </p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Gainers
            </p>
            <p className="mt-1 text-lg font-bold text-green-600">{gainers}</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Losers
            </p>
            <p className="mt-1 text-lg font-bold text-red-600">{losers}</p>
          </div>
        </div>
      )}

      {/* Search to add */}
      {showSearch && (
        <WidgetCard
          title="Add to Watchlist"
          className="border-2 border-blue-200 dark:border-blue-800"
          action={
            <button
              onClick={() => setShowSearch(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          }
        >
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search symbol or name…"
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-9 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200"
            />
          </div>
          {query.length > 0 && (
            <div className="mt-3 space-y-1 max-h-48 overflow-y-auto">
              {suggestions.slice(0, 6).map((a) => (
                <button
                  key={a.symbol}
                  onClick={() =>
                    addToWatchlist(a.symbol, a.name, a.price, a.changePercent)
                  }
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 hover:bg-gray-50 transition-colors text-sm dark:hover:bg-gray-800/50 group"
                >
                  <span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {a.symbol}
                    </span>
                    <span className="ml-2 text-gray-400 dark:text-gray-500">
                      {a.name}
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {formatEuro(a.price)}
                    </span>
                    <Plus
                      size={14}
                      className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </span>
                </button>
              ))}
              {suggestions.length === 0 && (
                <div className="p-4 text-center text-sm text-gray-400">
                  <AlertCircle size={16} className="mx-auto mb-1" />
                  No results found
                </div>
              )}
            </div>
          )}
          {query.length === 0 && (
            <div className="mt-2 p-4 text-center text-xs text-gray-400">
              Search for instruments to add to your watchlist
            </div>
          )}
        </WidgetCard>
      )}

      {/* Watchlist table */}
      <WidgetCard
        title={`${items.length} Instruments`}
        className="overflow-hidden"
      >
        {items.length > 0 ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {items.map((item) => {
              const isUp = item.changePercent >= 0;
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0 hover:bg-gray-50/50 transition-colors rounded-lg px-2 group"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Star
                    size={16}
                    className="shrink-0 text-yellow-400 fill-yellow-400 cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => remove(item.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {item.symbol}
                    </p>
                    <p className="truncate text-xs text-gray-400 dark:text-gray-500">
                      {item.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="tabular text-sm font-bold text-gray-900 dark:text-white">
                      {formatEuro(item.price)}
                    </p>
                    <p
                      className={cn(
                        "tabular flex items-center justify-end gap-0.5 text-xs font-semibold",
                        isUp ? "text-green-600" : "text-red-600",
                      )}
                    >
                      {isUp ? (
                        <ArrowUpRight size={12} />
                      ) : (
                        <ArrowDownRight size={12} />
                      )}
                      {formatPercent(item.changePercent)}
                    </p>
                  </div>

                  {item.alertPrice && (
                    <span className="hidden sm:flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30">
                      <Bell size={10} />
                      {formatEuro(item.alertPrice)}
                    </span>
                  )}

                  <div className="flex gap-1.5 shrink-0">
                    <button className="rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-3 py-1.5 text-xs font-bold text-white hover:shadow-lg hover:shadow-green-200 transition-all duration-200 hover:-translate-y-0.5">
                      Buy
                    </button>
                    <button className="rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-3 py-1.5 text-xs font-bold text-white hover:shadow-lg hover:shadow-red-200 transition-all duration-200 hover:-translate-y-0.5">
                      Sell
                    </button>
                    <button
                      onClick={() => remove(item.id)}
                      className={cn(
                        "rounded-lg px-2 py-1.5 text-xs text-gray-300 transition-all duration-200",
                        hoveredItem === item.id &&
                          "text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10",
                      )}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-200">
              <Star size={24} className="text-white" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
              Your watchlist is empty
            </h3>
            <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
              Add instruments you want to track. Click the &quot; Add instrument
              &quot; button to get started.
            </p>
            <button
              onClick={() => setShowSearch(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-blue-200 transition-all duration-300"
            >
              <Plus size={16} />
              Add your first instrument
            </button>
          </div>
        )}
      </WidgetCard>

      {/* Quick Actions */}
      {items.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <button className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-2xl">📈</span>
              <TrendingUp size={20} className="opacity-75" />
            </div>
            <p className="mt-2 text-sm font-semibold">Quick Trade</p>
            <p className="text-xs text-white/70">Open trading panel</p>
          </button>
          <button className="rounded-xl bg-white border border-gray-200 p-4 hover:border-blue-300 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-2xl">🔔</span>
              <Bell size={20} className="text-gray-400" />
            </div>
            <p className="mt-2 text-sm font-semibold text-gray-800">
              Set Alerts
            </p>
            <p className="text-xs text-gray-400">Price notifications</p>
          </button>
          <button className="rounded-xl bg-white border border-gray-200 p-4 hover:border-blue-300 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-2xl">📊</span>
              <Search size={20} className="text-gray-400" />
            </div>
            <p className="mt-2 text-sm font-semibold text-gray-800">Analyze</p>
            <p className="text-xs text-gray-400">Technical analysis</p>
          </button>
          <button className="rounded-xl bg-white border border-gray-200 p-4 hover:border-blue-300 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-2xl">📋</span>
              <ArrowUpRight size={20} className="text-gray-400" />
            </div>
            <p className="mt-2 text-sm font-semibold text-gray-800">Export</p>
            <p className="text-xs text-gray-400">Download watchlist</p>
          </button>
        </div>
      )}
    </div>
  );
}
