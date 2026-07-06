"use client";

import { useState } from "react";
import { WidgetCard } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/card";
import { formatPercent, cn } from "@/lib/utils";
import { tickerAssets } from "@/data/markets";
import {
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Star,
  ArrowUpDown,
} from "lucide-react";

const classLabel: Record<string, string> = {
  forex: "Forex",
  stock: "Stock",
  commodity: "Commodity",
  index: "Index",
  etf: "ETF",
  crypto: "Crypto",
};

const classColors: Record<string, string> = {
  forex: "bg-blue-100 text-blue-700 border-blue-200",
  stock: "bg-purple-100 text-purple-700 border-purple-200",
  commodity: "bg-amber-100 text-amber-700 border-amber-200",
  index: "bg-indigo-100 text-indigo-700 border-indigo-200",
  etf: "bg-teal-100 text-teal-700 border-teal-200",
  crypto: "bg-orange-100 text-orange-700 border-orange-200",
};

// Helper to format currency with €
const formatEuro = (value: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export default function DashboardMarketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("symbol");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

  // Get unique asset classes for filter
  const assetClasses = [
    "all",
    ...new Set(tickerAssets.map((a) => a.assetClass)),
  ];

  // Filter and search assets
  const filteredAssets = tickerAssets
    .filter((asset) => {
      const matchesSearch =
        asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesClass =
        selectedClass === "all" || asset.assetClass === selectedClass;
      return matchesSearch && matchesClass;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "symbol":
          comparison = a.symbol.localeCompare(b.symbol);
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        case "change":
          comparison = a.changePercent - b.changePercent;
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        default:
          comparison = 0;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

  const toggleWatchlist = (symbol: string) => {
    const newWatchlist = new Set(watchlist);
    if (newWatchlist.has(symbol)) {
      newWatchlist.delete(symbol);
    } else {
      newWatchlist.add(symbol);
    }
    setWatchlist(newWatchlist);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortableHeader = ({
    field,
    children,
  }: {
    field: string;
    children: React.ReactNode;
  }) => (
    <th
      className="whitespace-nowrap pb-3 pr-4 font-medium cursor-pointer hover:text-foreground transition-colors select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortField === field && (
          <ArrowUpDown
            size={12}
            className={cn(
              "transition-transform",
              sortDirection === "desc" && "rotate-180",
            )}
          />
        )}
      </div>
    </th>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-blue-100/50 backdrop-blur-sm">
        <div>
          <h2 className="font-display text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Markets Overview
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {tickerAssets.length} instruments available for trading
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              {tickerAssets.filter((a) => a.changePercent >= 0).length} Up
            </span>
            <span className="inline-flex items-center gap-1 ml-2">
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              {tickerAssets.filter((a) => a.changePercent < 0).length} Down
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by symbol or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-9 pr-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all cursor-pointer"
          >
            {assetClasses.map((cls) => (
              <option key={cls} value={cls}>
                {cls === "all" ? "All Classes" : classLabel[cls] || cls}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 ml-auto text-xs text-gray-400">
          <span>{filteredAssets.length} results</span>
        </div>
      </div>

      {/* Markets Table */}
      <WidgetCard title="All Instruments" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-100 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="whitespace-nowrap pb-3.5 pr-4 font-medium w-10">
                  <span className="sr-only">Watchlist</span>
                </th>
                <SortableHeader field="symbol">Symbol</SortableHeader>
                <SortableHeader field="name">Name</SortableHeader>
                <th className="whitespace-nowrap pb-3.5 pr-4 font-medium">
                  Class
                </th>
                <SortableHeader field="price">Price</SortableHeader>
                <SortableHeader field="change">Change</SortableHeader>
                <th className="whitespace-nowrap pb-3.5 pr-4 font-medium">
                  High
                </th>
                <th className="whitespace-nowrap pb-3.5 pr-4 font-medium">
                  Low
                </th>
                <th className="whitespace-nowrap pb-3.5 font-medium text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAssets.map((asset) => {
                const isUp = asset.changePercent >= 0;
                const isWatchlisted = watchlist.has(asset.symbol);

                return (
                  <tr
                    key={asset.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="py-3 pr-4">
                      <button
                        onClick={() => toggleWatchlist(asset.symbol)}
                        className="text-gray-300 hover:text-yellow-400 transition-colors"
                      >
                        <Star
                          size={16}
                          className={cn(
                            "transition-all",
                            isWatchlisted && "fill-yellow-400 text-yellow-400",
                          )}
                        />
                      </button>
                    </td>
                    <td className="py-3 pr-4 font-bold text-gray-900 whitespace-nowrap">
                      {asset.symbol}
                    </td>
                    <td className="py-3 pr-4 text-gray-800 max-w-[160px] truncate">
                      {asset.name}
                    </td>
                    <td className="py-3 pr-4">
                      <Badge
                        tone="neutral"
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-wide border",
                          classColors[asset.assetClass] ||
                            "bg-gray-100 text-gray-700 border-gray-200",
                        )}
                      >
                        {classLabel[asset.assetClass] || asset.assetClass}
                      </Badge>
                    </td>
                    <td className="tabular py-3 pr-4 font-bold text-gray-900">
                      {formatEuro(asset.price)}
                    </td>
                    <td
                      className={cn(
                        "tabular py-3 pr-4 font-semibold",
                        isUp ? "text-green-600" : "text-red-600",
                      )}
                    >
                      <div className="flex items-center gap-1">
                        {isUp ? (
                          <TrendingUp size={14} />
                        ) : (
                          <TrendingDown size={14} />
                        )}
                        {formatPercent(asset.changePercent)}
                      </div>
                    </td>
                    <td className="tabular py-3 pr-4 text-gray-800 font-medium">
                      {formatEuro(asset.dayHigh)}
                    </td>
                    <td className="tabular py-3 pr-4 text-gray-800 font-medium">
                      {formatEuro(asset.dayLow)}
                    </td>
                    <td className="py-3">
                      <div className="flex gap-1.5 justify-center">
                        <button className="rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-3.5 py-1.5 text-xs font-bold text-white hover:shadow-lg hover:shadow-green-200 transition-all duration-200 hover:-translate-y-0.5">
                          Buy
                        </button>
                        <button className="rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-3.5 py-1.5 text-xs font-bold text-white hover:shadow-lg hover:shadow-red-200 transition-all duration-200 hover:-translate-y-0.5">
                          Sell
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {filteredAssets.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-gray-400">
              Showing {filteredAssets.length} of {tickerAssets.length}{" "}
              instruments
            </span>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-gray-500">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                {filteredAssets.filter((a) => a.changePercent >= 0).length} Up
              </span>
              <span className="flex items-center gap-1.5 text-gray-500">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                {filteredAssets.filter((a) => a.changePercent < 0).length} Down
              </span>
            </div>
          </div>
        )}
      </WidgetCard>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {[
          { label: "Total Markets", value: tickerAssets.length, icon: "📊" },
          {
            label: "Gainers",
            value: tickerAssets.filter((a) => a.changePercent >= 0).length,
            icon: "📈",
          },
          {
            label: "Losers",
            value: tickerAssets.filter((a) => a.changePercent < 0).length,
            icon: "📉",
          },
          {
            label: "Top Gainer",
            value:
              tickerAssets.length > 0
                ? tickerAssets.reduce((a, b) =>
                    a.changePercent > b.changePercent ? a : b,
                  ).symbol
                : "—",
            icon: "🚀",
          },
          {
            label: "Top Loser",
            value:
              tickerAssets.length > 0
                ? tickerAssets.reduce((a, b) =>
                    a.changePercent < b.changePercent ? a : b,
                  ).symbol
                : "—",
            icon: "💀",
          },
          {
            label: "Watchlist",
            value: watchlist.size,
            icon: "⭐",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 p-4 hover:shadow-md transition-all duration-300 hover:border-blue-200"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl">{item.icon}</span>
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {item.label}
            </p>
            <p className="mt-0.5 text-sm font-bold text-gray-800">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
