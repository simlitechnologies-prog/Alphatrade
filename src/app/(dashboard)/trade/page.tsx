"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ArrowLeftRight,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Info,
  Zap,
  Shield,
  Clock,
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/dashboard/widgets";
import { watchlistItems } from "@/data/dashboard";
import { cn } from "@/lib/utils";
import { fetchQuotes, fetchCandles } from "@/services/marketData.service";
import type { Candle, Asset } from "@/types/market";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Helper to format currency with €
const formatEuro = (value: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

type OrderType = "market" | "limit" | "stop" | "stop-limit";
type Direction = "buy" | "sell";

// Quick lot presets
const LOT_PRESETS = [0.01, 0.1, 0.5, 1.0, 2.0, 5.0];

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live data states
  const [livePrice, setLivePrice] = useState<number | null>(null);
  const [candleData, setCandleData] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Get price from live data or default
  const price = livePrice ?? 1.05; // Default fallback price

  // Fetch live data
  const fetchLiveData = useCallback(async () => {
    if (!symbol) return;

    setRefreshing(true);
    setError(null);

    try {
      // Fetch quote
      const quotes: Asset[] = await fetchQuotes([symbol]);
      if (quotes.length > 0) {
        const quote = quotes[0];
        setLivePrice(quote.price);
        setIsConnected(true);
        setLastUpdated(new Date());
      }

      // Fetch candle data for chart
      const candles: Candle[] = await fetchCandles(symbol, "1h", 50);
      if (candles.length > 0) {
        setCandleData(candles);
      }
    } catch (err) {
      console.error("Error fetching live data:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch live data";
      setError(errorMessage);
      setIsConnected(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [symbol]);

  // Auto-refresh every 5 seconds
  useEffect(() => {
    fetchLiveData();

    const interval = setInterval(() => {
      fetchLiveData();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchLiveData]);

  // Re-fetch when symbol changes
  useEffect(() => {
    fetchLiveData();
  }, [symbol, fetchLiveData]);

  // Calculate derived values
  const spread = direction === "buy" ? price * 1.0001 : price * 0.9999;
  const marginRequired = (parseFloat(lots) * price) / parseFloat(leverage);
  const pipValue = (parseFloat(lots) * 10).toFixed(2);
  const totalValue = parseFloat(lots) * price;
  const bid = price * 0.9999;
  const ask = price * 1.0001;
  const dayHigh = price * 1.003;
  const dayLow = price * 0.997;

  // Format candle data for chart
  const chartData = candleData.map((candle) => ({
    time: new Date(candle.timestamp).toLocaleTimeString(),
    price: candle.close,
    volume: candle.volume,
  }));

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirm(false);
      // Show success message (you can add toast notification here)
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-blue-100/50 backdrop-blur-sm">
        <div>
          <h2 className="font-display text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Trading
          </h2>
          <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-2">
            Place orders with {symbol}
            <span className="inline-flex items-center gap-1 text-xs">
              {isConnected ? (
                <>
                  <Wifi size={12} className="text-green-500" />
                  <span className="text-green-600">Live</span>
                </>
              ) : (
                <>
                  <WifiOff size={12} className="text-red-500" />
                  <span className="text-red-600">Offline</span>
                </>
              )}
            </span>
            {lastUpdated && (
              <span className="text-xs text-gray-400">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchLiveData}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} className={cn(refreshing && "animate-spin")} />
            <span className="text-xs font-medium text-gray-700">Refresh</span>
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/80 border border-gray-200">
            <Shield size={14} className="text-green-600" />
            <span className="text-xs font-medium text-gray-700">
              1:{leverage} Leverage
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/80 border border-gray-200">
            <Clock size={14} className="text-blue-600" />
            <span className="text-xs font-medium text-gray-700">
              Market Hours
            </span>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:border-red-800/30 dark:text-red-400">
          ⚠️ {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Order form */}
        <div className="lg:col-span-1 space-y-4">
          <WidgetCard
            title="Place Order"
            className="border border-gray-200 shadow-sm"
          >
            <div className="space-y-4">
              {/* Symbol selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Instrument
                </label>
                <select
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 text-sm text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200"
                >
                  {watchlistItems.map((w) => (
                    <option key={w.symbol} value={w.symbol}>
                      {w.symbol} — {w.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Live price display */}
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50/50 p-3 border border-blue-200 dark:from-blue-950/30 dark:to-indigo-950/30 dark:border-blue-800/30">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">
                    Current Price
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    {formatEuro(price)}
                  </span>
                </div>
              </div>

              {/* Buy / Sell toggle */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDirection("buy")}
                  className={cn(
                    "rounded-xl py-3 text-sm font-bold transition-all duration-200 transform",
                    direction === "buy"
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-200"
                      : "bg-green-50 text-green-600 hover:bg-green-100",
                  )}
                >
                  <TrendingUp size={16} className="inline mr-1.5" />
                  Buy
                </button>
                <button
                  onClick={() => setDirection("sell")}
                  className={cn(
                    "rounded-xl py-3 text-sm font-bold transition-all duration-200 transform",
                    direction === "sell"
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-200"
                      : "bg-red-50 text-red-600 hover:bg-red-100",
                  )}
                >
                  <TrendingDown size={16} className="inline mr-1.5" />
                  Sell
                </button>
              </div>

              {/* Order type */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Order Type
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    ["market", "limit", "stop", "stop-limit"] as OrderType[]
                  ).map((t) => (
                    <button
                      key={t}
                      onClick={() => setOrderType(t)}
                      className={cn(
                        "rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-all duration-200",
                        orderType === t
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Volume (lots)
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setLots((l) =>
                        String(Math.max(0.01, parseFloat(l) - 0.1).toFixed(2)),
                      )
                    }
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all dark:border-gray-700"
                  >
                    −
                  </button>
                  <input
                    value={lots}
                    onChange={(e) => setLots(e.target.value)}
                    type="number"
                    step="0.1"
                    min="0.01"
                    className="h-11 flex-1 rounded-xl border border-gray-200 bg-gray-50/50 px-3 text-center text-sm font-semibold text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200"
                  />
                  <button
                    onClick={() =>
                      setLots((l) => String((parseFloat(l) + 0.1).toFixed(2)))
                    }
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all dark:border-gray-700"
                  >
                    +
                  </button>
                </div>
                <div className="flex gap-1 mt-1.5">
                  {LOT_PRESETS.map((lot) => (
                    <button
                      key={lot}
                      onClick={() => setLots(String(lot))}
                      className="flex-1 rounded-lg bg-gray-50 px-2 py-1 text-[10px] font-medium text-gray-600 hover:bg-gray-200 transition-colors dark:bg-gray-800/50 dark:text-gray-400"
                    >
                      {lot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Limit price (if not market) */}
              {orderType !== "market" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    {orderType === "stop" ? "Stop price" : "Limit price"}
                  </label>
                  <input
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(e.target.value)}
                    type="number"
                    placeholder={formatEuro(price)}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 text-sm text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200"
                  />
                </div>
              )}

              {/* SL / TP */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Stop Loss
                  </label>
                  <input
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    type="number"
                    placeholder="Optional"
                    className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 text-sm text-gray-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Take Profit
                  </label>
                  <input
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.value)}
                    type="number"
                    placeholder="Optional"
                    className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 text-sm text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200"
                  />
                </div>
              </div>

              {/* Leverage */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Leverage
                  </label>
                  <span className="text-xs font-bold text-blue-600">
                    1:{leverage}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={leverage}
                  onChange={(e) => setLeverage(e.target.value)}
                  className="w-full h-1.5 rounded-full bg-gray-200 appearance-none cursor-pointer accent-blue-600 dark:bg-gray-700"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                  <span>1:1</span>
                  <span>1:10</span>
                  <span>1:50</span>
                  <span>1:100</span>
                </div>
              </div>

              {/* Order summary */}
              <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 space-y-1.5 text-sm dark:from-gray-800/50 dark:to-gray-800/30">
                <div className="flex justify-between">
                  <span className="text-gray-500">Price</span>
                  <span className="tabular font-semibold text-gray-800 dark:text-gray-200">
                    {formatEuro(price)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Spread</span>
                  <span className="tabular text-gray-600">
                    {(
                      Math.abs(spread - price) * (price > 100 ? 100 : 10000)
                    ).toFixed(1)}{" "}
                    pips
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Value</span>
                  <span className="tabular font-semibold text-gray-800 dark:text-gray-200">
                    {formatEuro(totalValue)}
                  </span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500">Margin Required</span>
                  <span className="tabular font-bold text-blue-600">
                    {isNaN(marginRequired) ? "—" : formatEuro(marginRequired)}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => setShowConfirm(true)}
                variant={direction === "buy" ? "success" : "danger"}
                size="lg"
                className="w-full text-base font-bold shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {direction === "buy" ? "Buy" : "Sell"} {symbol}
                <Zap size={16} className="ml-2" />
              </Button>
            </div>
          </WidgetCard>
        </div>

        {/* Chart + market info */}
        <div className="lg:col-span-2 space-y-4">
          <WidgetCard
            title={`${symbol} — Live Chart`}
            className="border border-gray-200 shadow-sm"
          >
            {loading ? (
              <div className="flex h-80 items-center justify-center">
                <div className="text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                  <p className="mt-4 text-sm text-gray-400">
                    Loading chart data...
                  </p>
                </div>
              </div>
            ) : candleData.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={["auto", "auto"]}
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => formatEuro(v)}
                  />
                  <Tooltip
                    formatter={(v: unknown) => formatEuro(v as number)}
                    contentStyle={{
                      fontSize: 12,
                      borderRadius: 12,
                      border: "none",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      padding: "12px 16px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    fill="url(#colorPrice)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-80 items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-800/10">
                <div className="text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
                    <ArrowLeftRight size={28} className="text-white" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                    No chart data available
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {error || "Waiting for market data..."}
                  </p>
                </div>
              </div>
            )}
          </WidgetCard>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              {
                label: "Bid",
                value: formatEuro(bid),
                change: "-0.01%",
              },
              {
                label: "Ask",
                value: formatEuro(ask),
                change: "+0.01%",
              },
              {
                label: "Day High",
                value: formatEuro(dayHigh),
                change: "+0.3%",
              },
              {
                label: "Day Low",
                value: formatEuro(dayLow),
                change: "-0.3%",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-gray-800/50"
              >
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {s.label}
                </p>
                <p className="tabular mt-1 text-lg font-bold text-gray-800 dark:text-white">
                  {s.value}
                </p>
                <p
                  className={cn(
                    "text-xs font-medium mt-0.5",
                    s.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600",
                  )}
                >
                  {s.change}
                </p>
              </div>
            ))}
          </div>

          {/* Margin calculator */}
          <WidgetCard
            title="Margin Calculator"
            className="border border-gray-200 shadow-sm"
          >
            <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              {[
                {
                  label: "Required Margin",
                  value: formatEuro(marginRequired),
                  highlight: true,
                },
                {
                  label: "Pip Value",
                  value: formatEuro(parseFloat(pipValue)),
                  highlight: false,
                },
                {
                  label: "Swap Long",
                  value: "-€2.40/night",
                  highlight: false,
                  warning: true,
                },
                {
                  label: "Swap Short",
                  value: "-€1.80/night",
                  highlight: false,
                  warning: true,
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className={cn(
                    "rounded-xl p-3",
                    s.highlight
                      ? "bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 dark:from-blue-950/30 dark:to-indigo-950/30 dark:border-blue-800/30"
                      : s.warning
                        ? "bg-amber-50/50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-800/30"
                        : "bg-gray-50/50 border border-gray-200 dark:bg-gray-800/30 dark:border-gray-700",
                  )}
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {s.label}
                  </p>
                  <p
                    className={cn(
                      "tabular mt-1 font-semibold",
                      s.highlight
                        ? "text-blue-700 dark:text-blue-400"
                        : "text-gray-800 dark:text-gray-200",
                    )}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </WidgetCard>

          {/* Quick tips */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 border border-blue-200 dark:from-blue-950/30 dark:to-indigo-950/30 dark:border-blue-800/30">
              <Info size={16} className="text-blue-600 mb-1.5" />
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Market Hours
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                24/5 • Monday - Friday
              </p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 p-4 border border-amber-200 dark:from-amber-950/30 dark:to-orange-950/30 dark:border-amber-800/30">
              <AlertTriangle size={16} className="text-amber-600 mb-1.5" />
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Risk Warning
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Trading involves risk
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation modal */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-700 animate-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center",
                    direction === "buy" ? "bg-green-100" : "bg-red-100",
                  )}
                >
                  {direction === "buy" ? (
                    <TrendingUp size={20} className="text-green-600" />
                  ) : (
                    <TrendingDown size={20} className="text-red-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-gray-800 dark:text-white">
                    Confirm Order
                  </h3>
                  <p className="text-xs text-gray-500">
                    Review your order details
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-5 bg-gray-50/50 rounded-xl p-4 dark:bg-gray-800/30">
                {[
                  ["Symbol", symbol],
                  ["Direction", direction.toUpperCase()],
                  ["Type", orderType.toUpperCase()],
                  ["Volume", `${lots} lots`],
                  [
                    "Price",
                    orderType === "market" ? "Market price" : limitPrice || "—",
                  ],
                  ["Stop Loss", stopLoss || "None"],
                  ["Take Profit", takeProfit || "None"],
                  ["Margin", formatEuro(marginRequired)],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-0.5">
                    <span className="text-gray-500">{k}</span>
                    <span
                      className={cn(
                        "font-medium text-gray-800 dark:text-gray-200",
                        k === "Margin" &&
                          "text-blue-600 dark:text-blue-400 font-bold",
                      )}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1 border-gray-300 hover:bg-gray-50 dark:border-gray-600"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant={direction === "buy" ? "success" : "danger"}
                  size="md"
                  className="flex-1 font-bold"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></span>
                      Processing...
                    </>
                  ) : (
                    `Confirm ${direction}`
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
