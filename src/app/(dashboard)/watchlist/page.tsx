"use client";

import { useState } from "react";
import { Star, Search, Bell, Plus, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { WidgetCard } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { formatPrice, formatPercent, cn } from "@/lib/utils";
import { watchlistItems } from "@/data/dashboard";
import { tickerAssets } from "@/data/markets";

export default function WatchlistPage() {
  const [items, setItems] = useState(watchlistItems);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const suggestions = tickerAssets.filter(
    (a) =>
      !items.find((i) => i.symbol === a.symbol) &&
      (a.symbol.toLowerCase().includes(query.toLowerCase()) ||
        a.name.toLowerCase().includes(query.toLowerCase()))
  );

  function addToWatchlist(symbol: string, name: string, price: number, changePercent: number) {
    setItems((prev) => [...prev, { id: `w${Date.now()}`, symbol, name, price, changePercent }]);
    setQuery("");
    setShowSearch(false);
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-foreground">Watchlist</h2>
        <Button variant="primary" size="sm" onClick={() => setShowSearch(!showSearch)} className="gap-1.5">
          <Plus size={15} /> Add instrument
        </Button>
      </div>

      {/* Search to add */}
      {showSearch && (
        <WidgetCard title="Add to watchlist">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search symbol or name…"
              className="h-11 w-full rounded-lg border border-slate-200 bg-brand-muted pl-9 pr-4 text-sm text-foreground placeholder:text-foreground/40 focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
          {query.length > 0 && (
            <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
              {suggestions.slice(0, 6).map((a) => (
                <button
                  key={a.symbol}
                  onClick={() => addToWatchlist(a.symbol, a.name, a.price, a.changePercent)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 hover:bg-brand-muted transition-colors text-sm dark:hover:bg-slate-900/40"
                >
                  <span>
                    <span className="font-semibold text-foreground">{a.symbol}</span>
                    <span className="ml-2 text-foreground/50">{a.name}</span>
                  </span>
                  <Plus size={14} className="text-brand-secondary" />
                </button>
              ))}
              {suggestions.length === 0 && <p className="p-3 text-xs text-foreground/40">No results found</p>}
            </div>
          )}
        </WidgetCard>
      )}

      {/* Watchlist table */}
      <WidgetCard title={`${items.length} instruments`}>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {items.map((item) => {
            const isUp = item.changePercent >= 0;
            return (
              <div key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <Star size={14} className="shrink-0 text-brand-accent fill-brand-accent" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{item.symbol}</p>
                  <p className="truncate text-xs text-foreground/45">{item.name}</p>
                </div>
                <div className="text-right">
                  <p className="tabular text-sm font-medium text-foreground">
                    {formatPrice(item.price, item.price > 100 ? 2 : 4)}
                  </p>
                  <p className={cn("tabular flex items-center justify-end gap-0.5 text-xs font-medium", isUp ? "text-brand-success" : "text-brand-danger")}>
                    {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {formatPercent(item.changePercent)}
                  </p>
                </div>
                {item.alertPrice && (
                  <span className="hidden sm:flex items-center gap-1 text-xs text-brand-accent bg-amber-50 px-2 py-1 rounded-full dark:bg-amber-950/40">
                    <Bell size={10} />
                    {formatPrice(item.alertPrice, item.alertPrice > 100 ? 2 : 4)}
                  </span>
                )}
                <div className="flex gap-1.5 shrink-0">
                  <button className="rounded-lg bg-green-50 px-2.5 py-1.5 text-xs font-semibold text-brand-success hover:bg-brand-success hover:text-white transition-colors">Buy</button>
                  <button className="rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-brand-danger hover:bg-brand-danger hover:text-white transition-colors">Sell</button>
                  <button onClick={() => remove(item.id)} className="rounded-lg px-2 py-1.5 text-xs text-foreground/30 hover:text-brand-danger transition-colors">✕</button>
                </div>
              </div>
            );
          })}
        </div>
      </WidgetCard>
    </div>
  );
}
