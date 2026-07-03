"use client";

import { useState } from "react";
import { ArrowLeftRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/dashboard/widgets";
import { watchlistItems } from "@/data/dashboard";
import { formatPrice, cn } from "@/lib/utils";

type OrderType = "market" | "limit" | "stop" | "stop-limit";
type Direction = "buy" | "sell";

export default function TradePage() {
  const [direction, setDirection] = useState<Direction>("buy");
  const [orderType, setOrderType] = useState<OrderType>("market");
  const [symbol, setSymbol] = useState("EUR/USD");
  const [lots, setLots] = useState("1.00");
  const [limitPrice, setLimitPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [leverage, setLeverage] = useState("100");
  const [showConfirm, setShowConfirm] = useState(false);

  const asset = watchlistItems.find((w) => w.symbol === symbol) ?? watchlistItems[0];
  const price = asset.price;
  const spread = direction === "buy" ? price * 1.0001 : price * 0.9999;
  const marginRequired = (parseFloat(lots) * price) / parseFloat(leverage);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Order form */}
      <div className="lg:col-span-1 space-y-4">
        <WidgetCard title="Place order">
          {/* Symbol selector */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Instrument</label>
              <select
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 bg-brand-muted px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-900"
              >
                {watchlistItems.map((w) => (
                  <option key={w.symbol} value={w.symbol}>{w.symbol} — {w.name}</option>
                ))}
              </select>
            </div>

            {/* Buy / Sell toggle */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDirection("buy")}
                className={cn("rounded-lg py-3 text-sm font-bold transition-colors", direction === "buy" ? "bg-brand-success text-white" : "bg-green-50 text-brand-success")}
              >
                Buy
              </button>
              <button
                onClick={() => setDirection("sell")}
                className={cn("rounded-lg py-3 text-sm font-bold transition-colors", direction === "sell" ? "bg-brand-danger text-white" : "bg-red-50 text-brand-danger")}
              >
                Sell
              </button>
            </div>

            {/* Order type */}
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Order type</label>
              <div className="flex flex-wrap gap-2">
                {(["market", "limit", "stop", "stop-limit"] as OrderType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setOrderType(t)}
                    className={cn("rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors", orderType === t ? "bg-brand-secondary text-white" : "bg-brand-muted text-foreground/60 hover:text-foreground")}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume */}
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Volume (lots)</label>
              <div className="flex gap-2">
                <button onClick={() => setLots((l) => String(Math.max(0.01, parseFloat(l) - 0.1).toFixed(2)))} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-foreground/60 hover:text-foreground dark:border-slate-700">−</button>
                <input
                  value={lots}
                  onChange={(e) => setLots(e.target.value)}
                  type="number"
                  step="0.1"
                  min="0.01"
                  className="h-11 flex-1 rounded-lg border border-slate-200 bg-brand-muted px-3 text-center text-sm font-semibold text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-900"
                />
                <button onClick={() => setLots((l) => String((parseFloat(l) + 0.1).toFixed(2)))} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-foreground/60 hover:text-foreground dark:border-slate-700">+</button>
              </div>
            </div>

            {/* Limit price (if not market) */}
            {orderType !== "market" && (
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">
                  {orderType === "stop" ? "Stop price" : "Limit price"}
                </label>
                <input
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  type="number"
                  placeholder={formatPrice(price, price > 100 ? 2 : 4)}
                  className="h-11 w-full rounded-lg border border-slate-200 bg-brand-muted px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-900"
                />
              </div>
            )}

            {/* SL / TP */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">Stop loss</label>
                <input
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  type="number"
                  placeholder="Optional"
                  className="h-10 w-full rounded-lg border border-slate-200 bg-brand-muted px-3 text-sm text-foreground focus:border-brand-danger dark:border-slate-700 dark:bg-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">Take profit</label>
                <input
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                  type="number"
                  placeholder="Optional"
                  className="h-10 w-full rounded-lg border border-slate-200 bg-brand-muted px-3 text-sm text-foreground focus:border-brand-success dark:border-slate-700 dark:bg-slate-900"
                />
              </div>
            </div>

            {/* Leverage */}
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Leverage: 1:{leverage}</label>
              <input
                type="range"
                min="1"
                max="100"
                value={leverage}
                onChange={(e) => setLeverage(e.target.value)}
                className="w-full accent-brand-secondary"
              />
              <div className="flex justify-between text-[10px] text-foreground/40 mt-0.5">
                <span>1:1</span><span>1:10</span><span>1:50</span><span>1:100</span>
              </div>
            </div>

            {/* Order summary */}
            <div className="rounded-lg bg-brand-muted p-3 space-y-1.5 text-xs dark:bg-slate-900/50">
              <div className="flex justify-between">
                <span className="text-foreground/50">Price</span>
                <span className="tabular font-medium text-foreground">{formatPrice(price, price > 100 ? 2 : 4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/50">Spread</span>
                <span className="tabular text-foreground/70">{(Math.abs(spread - price) * (price > 100 ? 100 : 10000)).toFixed(1)} pips</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/50">Margin required</span>
                <span className="tabular font-medium text-foreground">${isNaN(marginRequired) ? "—" : marginRequired.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={() => setShowConfirm(true)}
              variant={direction === "buy" ? "success" : "danger"}
              size="lg"
              className="w-full text-base"
            >
              {direction === "buy" ? "Place buy order" : "Place sell order"} · {symbol}
            </Button>
          </div>
        </WidgetCard>
      </div>

      {/* Chart placeholder + market info */}
      <div className="lg:col-span-2 space-y-4">
        <WidgetCard title={`${symbol} — Chart`}>
          <div className="flex h-80 items-center justify-center rounded-lg bg-brand-muted text-foreground/30 dark:bg-slate-900/40">
            <div className="text-center">
              <ArrowLeftRight size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">Live chart — connect market data API</p>
              <p className="text-xs mt-1">TradingView widget or Recharts with live feed</p>
            </div>
          </div>
        </WidgetCard>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Bid", value: formatPrice(price * 0.9999, price > 100 ? 2 : 4) },
            { label: "Ask", value: formatPrice(price * 1.0001, price > 100 ? 2 : 4) },
            { label: "Day high", value: formatPrice(price * 1.003, price > 100 ? 2 : 4) },
            { label: "Day low", value: formatPrice(price * 0.997, price > 100 ? 2 : 4) },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-brand-primary/40">
              <p className="text-xs text-foreground/50">{s.label}</p>
              <p className="tabular mt-1 text-lg font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Margin calculator */}
        <WidgetCard title="Margin calculator">
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            {[
              { label: "Required margin", value: `$${isNaN(marginRequired) ? "—" : marginRequired.toFixed(2)}` },
              { label: "Pip value", value: "$10.00" },
              { label: "Swap long", value: "-$2.40/night" },
              { label: "Swap short", value: "-$1.80/night" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-brand-muted p-3 dark:bg-slate-900/40">
                <p className="text-xs text-foreground/50">{s.label}</p>
                <p className="tabular mt-1 font-semibold text-foreground">{s.value}</p>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-brand-primary">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={20} className="text-brand-accent" />
              <h3 className="font-display font-bold text-foreground">Confirm order</h3>
            </div>
            <div className="space-y-2 text-sm mb-5">
              {[
                ["Symbol", symbol],
                ["Direction", direction.toUpperCase()],
                ["Type", orderType.toUpperCase()],
                ["Volume", `${lots} lots`],
                ["Price", orderType === "market" ? "Market price" : limitPrice || "—"],
                ["Stop loss", stopLoss || "None"],
                ["Take profit", takeProfit || "None"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-foreground/50">{k}</span>
                  <span className="font-medium text-foreground">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="md" className="flex-1" onClick={() => setShowConfirm(false)}>Cancel</Button>
              <Button variant={direction === "buy" ? "success" : "danger"} size="md" className="flex-1" onClick={() => setShowConfirm(false)}>
                Confirm {direction}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
