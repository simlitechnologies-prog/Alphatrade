"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { WidgetCard, StatCard, PnLBadge } from "@/components/dashboard/widgets";
import { formatPercent, cn } from "@/lib/utils";
import { TrendingUp, PieChart as PieIcon, BarChart2 } from "lucide-react";
import { useAuth } from "../../../../contexts/AuthContext";
import {
  getPortfolioData,
  getPositions,
  getPortfolioGrowth,
  getAllocation,
} from "@/services/dashboard.service";
import { Spinner } from "@/components/forms/inputs";

// Define types for the data structures
interface PortfolioStats {
  balance: number;
  equity: number;
  usedMargin: number;
  todayPnL: number;
  todayPnLPercent: number;
  allTimePnL: number;
  allTimePnLPercent: number;
}

interface Position {
  id: string;
  symbol: string;
  direction: "buy" | "sell";
  lots: number;
  openPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  stopLoss: number | null;
  takeProfit: number | null;
}

interface GrowthData {
  month: string;
  value: number;
}

interface AllocationData {
  name: string;
  value: number;
  color: string;
}

interface MonthlyReturn {
  month: string;
  return: number;
}

// Type guard functions
function isValidPortfolioStats(data: unknown): data is PortfolioStats {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.balance === "number" &&
    typeof d.equity === "number" &&
    typeof d.usedMargin === "number" &&
    typeof d.todayPnL === "number" &&
    typeof d.todayPnLPercent === "number" &&
    typeof d.allTimePnL === "number" &&
    typeof d.allTimePnLPercent === "number"
  );
}

function isValidPosition(data: unknown): data is Position {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.id === "string" &&
    typeof d.symbol === "string" &&
    (d.direction === "buy" || d.direction === "sell") &&
    typeof d.lots === "number" &&
    typeof d.openPrice === "number" &&
    typeof d.currentPrice === "number" &&
    typeof d.pnl === "number" &&
    typeof d.pnlPercent === "number"
  );
}

function isValidGrowthData(data: unknown): data is GrowthData {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return typeof d.month === "string" && typeof d.value === "number";
}

function isValidAllocation(data: unknown): data is AllocationData {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.name === "string" &&
    typeof d.value === "number" &&
    typeof d.color === "string"
  );
}

// Helper to format currency with €
const formatEuro = (value: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export default function PortfolioPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [portfolioStats, setPortfolioStats] = useState<PortfolioStats | null>(
    null,
  );
  const [openPositions, setOpenPositions] = useState<Position[]>([]);
  const [portfolioGrowthData, setPortfolioGrowthData] = useState<GrowthData[]>(
    [],
  );
  const [allocationData, setAllocationData] = useState<AllocationData[]>([]);

  useEffect(() => {
    async function loadPortfolioData() {
      if (!user) {
        console.log("🔴 No user found in portfolio");
        return;
      }

      setLoading(true);
      try {
        const userId = user.uid;

        // Load data using the same services as dashboard
        const [portfolio, positions, growth, allocation] = await Promise.all([
          getPortfolioData(userId),
          getPositions(userId),
          getPortfolioGrowth(userId),
          getAllocation(userId),
        ]);

        // ✅ FIXED: Use type guards with casting
        // Portfolio Stats
        if (portfolio && isValidPortfolioStats(portfolio)) {
          setPortfolioStats(portfolio);
        } else {
          setPortfolioStats(null);
        }

        // Positions
        if (Array.isArray(positions)) {
          const validPositions = positions.filter(
            isValidPosition,
          ) as Position[];
          setOpenPositions(validPositions);
        } else {
          setOpenPositions([]);
        }

        // Growth Data
        if (Array.isArray(growth)) {
          const validGrowth = growth.filter(isValidGrowthData) as GrowthData[];
          setPortfolioGrowthData(validGrowth);
        } else {
          setPortfolioGrowthData([]);
        }

        // Allocation
        if (Array.isArray(allocation)) {
          const validAllocation = allocation.filter(
            isValidAllocation,
          ) as AllocationData[];
          setAllocationData(validAllocation);
        } else {
          setAllocationData([]);
        }
      } catch (error) {
        console.error("Error loading portfolio data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolioData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Spinner size={40} className="text-blue-600" />
          <p className="mt-4 text-sm text-gray-500">
            Loading portfolio data...
          </p>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!portfolioStats || portfolioStats.balance === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-blue-100/50">
          <div>
            <h2 className="font-display text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Portfolio
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Start trading to build your portfolio
            </p>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-12 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-200">
            <TrendingUp size={40} className="text-white" />
          </div>
          <h3 className="mt-6 text-xl font-semibold text-gray-800">
            No positions yet
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Your portfolio is empty. Start trading to see your positions here.
          </p>
          <div className="mt-6">
            <a
              href="/trading"
              className="inline-flex rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-sm font-semibold text-white hover:shadow-lg hover:shadow-blue-200 transition-all duration-300"
            >
              Start Trading
            </a>
          </div>
        </div>
      </div>
    );
  }

  const totalPnL = openPositions.reduce((s, p) => s + p.pnl, 0);
  // Calculate open P&L percent based on positions
  const totalOpenPnLPercent =
    portfolioStats.balance > 0 ? (totalPnL / portfolioStats.balance) * 100 : 0;

  // Generate monthly returns from growth data if available
  const monthlyReturns: MonthlyReturn[] =
    portfolioGrowthData.length > 0
      ? portfolioGrowthData.map((item, index) => {
          const prevValue =
            index > 0 ? portfolioGrowthData[index - 1].value : item.value;
          const returnPercent =
            prevValue > 0 ? ((item.value - prevValue) / prevValue) * 100 : 0;
          return {
            month: item.month,
            return: parseFloat(returnPercent.toFixed(1)),
          };
        })
      : [
          { month: "Jan", return: 0 },
          { month: "Feb", return: 0 },
          { month: "Mar", return: 0 },
          { month: "Apr", return: 0 },
          { month: "May", return: 0 },
          { month: "Jun", return: 0 },
        ];

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-blue-100/50 backdrop-blur-sm">
        <div>
          <h2 className="font-display text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Portfolio Overview
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Track your investments and performance
          </p>
        </div>
        {portfolioStats && (
          <PnLBadge
            value={portfolioStats.todayPnL}
            percent={portfolioStats.todayPnLPercent}
          />
        )}
      </div>

      {/* Summary stats - using consistent data structure */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Portfolio balance"
          value={formatEuro(portfolioStats.balance)}
          trend={portfolioStats.allTimePnLPercent}
          sub="all time"
          icon={TrendingUp}
          accent="blue"
        />
        <StatCard
          label="Open P&L"
          value={formatEuro(totalPnL)}
          trend={totalOpenPnLPercent}
          sub="vs cost"
          icon={PieIcon}
          accent="green"
        />
        <StatCard
          label="Equity"
          value={formatEuro(portfolioStats.equity || portfolioStats.balance)}
          sub={`Margin: ${formatEuro(portfolioStats.usedMargin || 0)}`}
          icon={BarChart2}
          accent="amber"
        />
        <StatCard
          label="All-time P&L"
          value={formatEuro(portfolioStats.allTimePnL || 0)}
          trend={portfolioStats.allTimePnLPercent}
          sub="total return"
          icon={TrendingUp}
          accent="green"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <WidgetCard
          title="Portfolio Growth (6 months)"
          className="lg:col-span-2"
        >
          {portfolioGrowthData && portfolioGrowthData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart
                data={portfolioGrowthData}
                margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="pGrad2" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`}
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
                  dataKey="value"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  fill="url(#pGrad2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[220px] items-center justify-center text-sm text-gray-400">
              No portfolio history yet
            </div>
          )}
        </WidgetCard>

        <WidgetCard title="Asset Allocation">
          {allocationData && allocationData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    dataKey="value"
                    paddingAngle={4}
                  >
                    {allocationData.map((e) => (
                      <Cell key={e.name} fill={e.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: unknown) => `${v}%`}
                    contentStyle={{
                      fontSize: 12,
                      borderRadius: 12,
                      border: "none",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      padding: "12px 16px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 space-y-2">
                {allocationData.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between text-xs group hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors"
                  >
                    <span className="flex items-center gap-2 text-gray-600 font-medium">
                      <span
                        className="h-2.5 w-2.5 rounded-full transition-transform group-hover:scale-110"
                        style={{ background: item.color }}
                      />
                      {item.name}
                    </span>
                    <span className="tabular font-semibold text-gray-800">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex h-[220px] items-center justify-center text-sm text-gray-400">
              No allocation data available
            </div>
          )}
        </WidgetCard>
      </div>

      {/* Monthly returns */}
      <WidgetCard title="Monthly Returns (%)">
        <ResponsiveContainer width="100%" height={160}>
          <BarChart
            data={monthlyReturns}
            margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              formatter={(v: unknown) => `${v}%`}
              contentStyle={{
                fontSize: 12,
                borderRadius: 12,
                border: "none",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                padding: "12px 16px",
              }}
            />
            <Bar dataKey="return" radius={[6, 6, 0, 0]}>
              {monthlyReturns.map((e) => (
                <Cell
                  key={e.month}
                  fill={e.return >= 0 ? "#16A34A" : "#DC2626"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </WidgetCard>

      {/* Positions table */}
      <WidgetCard title={`Open Positions (${openPositions.length})`}>
        {openPositions.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider border-b-2 border-gray-100">
                    {[
                      "Symbol",
                      "Direction",
                      "Lots",
                      "Open price",
                      "Current",
                      "P&L",
                      "P&L %",
                      "S/L",
                      "T/P",
                    ].map((h) => (
                      <th
                        key={h}
                        className="pb-3.5 pr-4 font-medium whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {openPositions.map((pos) => {
                    const isUp = pos.pnl >= 0;
                    return (
                      <tr
                        key={pos.id}
                        className="text-gray-700 hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-3.5 pr-4 font-bold text-gray-900 whitespace-nowrap">
                          {pos.symbol}
                        </td>
                        <td className="py-3.5 pr-4">
                          <span
                            className={cn(
                              "inline-flex rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wide",
                              pos.direction === "buy"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700",
                            )}
                          >
                            {pos.direction}
                          </span>
                        </td>
                        <td className="tabular py-3.5 pr-4 font-medium">
                          {pos.lots}
                        </td>
                        <td className="tabular py-3.5 pr-4 font-medium">
                          {formatEuro(pos.openPrice)}
                        </td>
                        <td className="tabular py-3.5 pr-4 font-medium">
                          {formatEuro(pos.currentPrice)}
                        </td>
                        <td
                          className={cn(
                            "tabular py-3.5 pr-4 font-bold",
                            isUp ? "text-green-600" : "text-red-600",
                          )}
                        >
                          {isUp ? "+" : ""}
                          {formatEuro(pos.pnl)}
                        </td>
                        <td
                          className={cn(
                            "tabular py-3.5 pr-4 font-semibold",
                            isUp ? "text-green-600" : "text-red-600",
                          )}
                        >
                          {formatPercent(pos.pnlPercent)}
                        </td>
                        <td className="tabular py-3.5 pr-4 text-gray-800 font-mono">
                          {pos.stopLoss ? formatEuro(pos.stopLoss) : "—"}
                        </td>
                        <td className="tabular py-3.5 pr-4 text-gray-800 font-mono">
                          {pos.takeProfit ? formatEuro(pos.takeProfit) : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Showing {openPositions.length} position
                {openPositions.length > 1 ? "s" : ""}
              </span>
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-xs text-gray-400">Total P&L</span>
                  <span
                    className={cn(
                      "ml-2 text-sm font-bold",
                      totalPnL >= 0 ? "text-green-600" : "text-red-600",
                    )}
                  >
                    {totalPnL >= 0 ? "+" : ""}
                    {formatEuro(totalPnL)}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="py-8 text-center text-sm text-gray-400">
            No open positions. Start trading to see them here.
          </div>
        )}
      </WidgetCard>

      {/* Quick stats summary cards */}
      {openPositions.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: "Total Positions",
              value: openPositions.length,
              icon: "📊",
            },
            {
              label: "Win Rate",
              value:
                openPositions.length > 0
                  ? `${Math.round((openPositions.filter((p) => p.pnl >= 0).length / openPositions.length) * 100)}%`
                  : "0%",
              icon: "🎯",
            },
            {
              label: "Best Trade",
              value:
                openPositions.length > 0
                  ? formatEuro(Math.max(...openPositions.map((p) => p.pnl)))
                  : formatEuro(0),
              icon: "🚀",
            },
            {
              label: "Worst Trade",
              value:
                openPositions.length > 0
                  ? formatEuro(Math.min(...openPositions.map((p) => p.pnl)))
                  : formatEuro(0),
              icon: "📉",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 p-4 hover:shadow-md transition-all duration-300 hover:border-blue-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{item.icon}</span>
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
      )}
    </div>
  );
}
