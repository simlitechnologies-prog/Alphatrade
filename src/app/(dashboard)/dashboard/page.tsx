"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import {
  Wallet,
  TrendingUp,
  Activity,
  ClipboardList,
  Euro,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { StatCard, WidgetCard, PnLBadge } from "@/components/dashboard/widgets";
import { formatPercent, cn } from "@/lib/utils";
import {
  getPortfolioData,
  getPositions,
  getWatchlist,
  getPendingOrders,
  getPortfolioGrowth,
  getDailyPnL,
  getAllocation,
  getNews,
  getCalendarEvents,
  isStaticDemoUser,
} from "@/services/dashboard.service";
import { Spinner } from "@/components/forms/inputs";

// Define types for all data structures
interface PortfolioStats {
  balance: number;
  equity: number;
  freeMargin: number;
  usedMargin: number;
  marginLevel: number;
  todayPnL: number;
  todayPnLPercent: number;
  weeklyPnL: number;
  allTimePnL: number;
  allTimePnLPercent: number;
  currency?: string;
}

interface Position {
  id: string;
  symbol: string;
  direction: "BUY" | "SELL";
  lots: number;
  pnl: number;
  pnlPercent: number;
  entryPrice: number;
  currentPrice: number;
}

interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
}

interface Order {
  id: string;
  symbol: string;
  type: string;
  side: string;
  price: number;
  quantity: number;
  status: string;
}

interface GrowthData {
  month: string;
  value: number;
}

interface DailyPnL {
  day: string;
  pnl: number;
}

interface Allocation {
  name: string;
  value: number;
  color: string;
}

interface NewsItem {
  id: string;
  title: string;
  category: string;
  time: string;
  impact: "high" | "medium" | "low";
}

interface CalendarEvent {
  id: string;
  event: string;
  country: string;
  date: string;
  time: string;
  impact: "high" | "medium" | "low";
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

// Type guard functions
function isValidPortfolioStats(data: unknown): data is PortfolioStats {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.balance === "number" &&
    typeof d.equity === "number" &&
    typeof d.freeMargin === "number" &&
    typeof d.usedMargin === "number" &&
    typeof d.marginLevel === "number" &&
    typeof d.todayPnL === "number" &&
    typeof d.todayPnLPercent === "number" &&
    typeof d.weeklyPnL === "number" &&
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
    (d.direction === "BUY" || d.direction === "SELL") &&
    typeof d.lots === "number" &&
    typeof d.pnl === "number" &&
    typeof d.pnlPercent === "number" &&
    typeof d.entryPrice === "number" &&
    typeof d.currentPrice === "number"
  );
}

function isValidWatchlistItem(data: unknown): data is WatchlistItem {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.id === "string" &&
    typeof d.symbol === "string" &&
    typeof d.name === "string" &&
    typeof d.price === "number" &&
    typeof d.changePercent === "number"
  );
}

function isValidOrder(data: unknown): data is Order {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.id === "string" &&
    typeof d.symbol === "string" &&
    typeof d.type === "string" &&
    typeof d.side === "string" &&
    typeof d.price === "number" &&
    typeof d.quantity === "number" &&
    typeof d.status === "string"
  );
}

function isValidGrowthData(data: unknown): data is GrowthData {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return typeof d.month === "string" && typeof d.value === "number";
}

function isValidDailyPnL(data: unknown): data is DailyPnL {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return typeof d.day === "string" && typeof d.pnl === "number";
}

function isValidAllocation(data: unknown): data is Allocation {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.name === "string" &&
    typeof d.value === "number" &&
    typeof d.color === "string"
  );
}

function isValidNewsItem(data: unknown): data is NewsItem {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.id === "string" &&
    typeof d.title === "string" &&
    typeof d.category === "string" &&
    typeof d.time === "string" &&
    (d.impact === "high" || d.impact === "medium" || d.impact === "low")
  );
}

function isValidCalendarEvent(data: unknown): data is CalendarEvent {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.id === "string" &&
    typeof d.event === "string" &&
    typeof d.country === "string" &&
    typeof d.date === "string" &&
    typeof d.time === "string" &&
    (d.impact === "high" || d.impact === "medium" || d.impact === "low")
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [isStatic, setIsStatic] = useState(false);
  const [portfolioStats, setPortfolioStats] = useState<PortfolioStats | null>(
    null,
  );
  const [openPositions, setOpenPositions] = useState<Position[]>([]);
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([]);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [portfolioGrowthData, setPortfolioGrowthData] = useState<GrowthData[]>(
    [],
  );
  const [dailyPnLData, setDailyPnLData] = useState<DailyPnL[]>([]);
  const [allocationData, setAllocationData] = useState<Allocation[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    async function loadDashboardData() {
      if (!user) {
        return;
      }

      setLoading(true);
      try {
        const userId = user.uid;
        const isStaticUser = isStaticDemoUser(userId);

        setIsStatic(isStaticUser);

        // Get user name
        if (isStaticUser) {
          setUserName("Lukas");
        } else if (user.displayName) {
          setUserName(user.displayName.split(" ")[0]);
        } else {
          setUserName("Trader");
        }

        // Load all data in parallel
        const [
          portfolio,
          positions,
          watchlist,
          orders,
          growth,
          dailyPnl,
          allocation,
          news,
          events,
        ] = await Promise.all([
          getPortfolioData(userId),
          getPositions(userId),
          getWatchlist(userId),
          getPendingOrders(userId),
          getPortfolioGrowth(userId),
          getDailyPnL(userId),
          getAllocation(userId),
          getNews(),
          getCalendarEvents(),
        ]);

        // ✅ FIXED: Use type guards with casting for each data set
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

        // Watchlist
        if (Array.isArray(watchlist)) {
          const validWatchlist = watchlist.filter(
            isValidWatchlistItem,
          ) as WatchlistItem[];
          setWatchlistItems(validWatchlist);
        } else {
          setWatchlistItems([]);
        }

        // Orders
        if (Array.isArray(orders)) {
          const validOrders = orders.filter(isValidOrder) as Order[];
          setPendingOrders(validOrders);
        } else {
          setPendingOrders([]);
        }

        // Growth Data
        if (Array.isArray(growth)) {
          const validGrowth = growth.filter(isValidGrowthData) as GrowthData[];
          setPortfolioGrowthData(validGrowth);
        } else {
          setPortfolioGrowthData([]);
        }

        // Daily P&L
        if (Array.isArray(dailyPnl)) {
          const validDailyPnl = dailyPnl.filter(isValidDailyPnL) as DailyPnL[];
          setDailyPnLData(validDailyPnl);
        } else {
          setDailyPnLData([]);
        }

        // Allocation
        if (Array.isArray(allocation)) {
          const validAllocation = allocation.filter(
            isValidAllocation,
          ) as Allocation[];
          setAllocationData(validAllocation);
        } else {
          setAllocationData([]);
        }

        // News
        if (Array.isArray(news)) {
          const validNews = news.filter(isValidNewsItem) as NewsItem[];
          setNewsItems(validNews);
        } else {
          setNewsItems([]);
        }

        // Calendar Events
        if (Array.isArray(events)) {
          const validEvents = events.filter(
            isValidCalendarEvent,
          ) as CalendarEvent[];
          setCalendarEvents(validEvents);
        } else {
          setCalendarEvents([]);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Spinner size={40} className="text-blue-600" />
          <p className="mt-4 text-sm text-gray-500">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Show empty state for new users (non-static)
  if (!isStatic && (!portfolioStats || portfolioStats.balance === 0)) {
    return (
      <div className="space-y-6">
        {/* Welcome bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome, {userName}! 👋
            </h2>
            <p className="text-sm text-gray-500">
              Start your trading journey by making your first deposit
            </p>
          </div>
        </div>

        {/* Empty State Card */}
        <div className="rounded-2xl border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-12 text-center backdrop-blur-sm">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-200">
            <Euro size={40} className="text-white" />
          </div>
          <h3 className="mt-6 text-2xl font-semibold text-gray-800">
            Your portfolio is empty
          </h3>
          <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto">
            Fund your account to start trading. The first deposit unlocks access
            to 180+ markets, advanced tools, and real-time data.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/deposit"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Make your first deposit
            </a>
            <a
              href="/markets"
              className="rounded-xl border-2 border-gray-200 bg-white px-8 py-3.5 text-sm font-semibold text-gray-700 hover:border-blue-400 hover:shadow-md transition-all duration-300"
            >
              Explore markets
            </a>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {[
              {
                icon: "📊",
                label: "180+ Markets",
                desc: "Forex, Crypto, Indices & more",
                bg: "from-blue-50 to-blue-100",
              },
              {
                icon: "🎯",
                label: "Demo Account",
                desc: "Practice with virtual funds",
                bg: "from-indigo-50 to-indigo-100",
              },
              {
                icon: "🛡️",
                label: "Secure & Regulated",
                desc: "Your funds are safe",
                bg: "from-purple-50 to-purple-100",
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-xl bg-gradient-to-br ${item.bg} p-6 border border-white/50 shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-sm font-semibold text-gray-800">
                  {item.label}
                </p>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If portfolio exists but no positions (has deposit but not trading yet)
  if (
    !isStatic &&
    portfolioStats &&
    portfolioStats.balance > 0 &&
    openPositions.length === 0
  ) {
    return (
      <div className="space-y-6">
        {/* Welcome bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome back, {userName}! 👋
            </h2>
            <p className="text-sm text-gray-500">
              Funded account ready. Start trading to build your portfolio.
            </p>
          </div>
          <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-2.5 text-sm font-semibold text-green-700 border border-green-200">
            Balance: {formatEuro(portfolioStats.balance)}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Balance"
            value={formatEuro(portfolioStats.balance)}
            sub="Ready to trade"
            icon={Wallet}
            accent="blue"
          />
          <StatCard
            label="Today's P&L"
            value={formatEuro(0)}
            sub="No trades yet"
            icon={TrendingUp}
            accent="green"
          />
          <StatCard
            label="Open positions"
            value="0"
            sub="Start your first trade"
            icon={Activity}
            accent="amber"
          />
          <StatCard
            label="Pending orders"
            value="0"
            sub="No pending orders"
            icon={ClipboardList}
            accent="blue"
          />
        </div>

        {/* Call to Action */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <a
            href="/trading"
            className="group rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-600 p-7 text-white hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-3xl mb-3">📈</div>
            <h4 className="text-lg font-semibold">Start Trading</h4>
            <p className="text-sm text-white/80 mt-1">
              Open your first position
            </p>
            <div className="mt-4 inline-block text-sm font-medium text-white/90 group-hover:translate-x-1 transition-transform">
              Get started →
            </div>
          </a>
          <a
            href="/markets"
            className="group rounded-2xl bg-white border-2 border-gray-100 p-7 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-3xl mb-3">🌍</div>
            <h4 className="text-lg font-semibold text-gray-800">
              Explore Markets
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              Find trading opportunities
            </p>
            <div className="mt-4 inline-block text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
              Browse markets →
            </div>
          </a>
          <a
            href="/education"
            className="group rounded-2xl bg-white border-2 border-gray-100 p-7 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-3xl mb-3">📚</div>
            <h4 className="text-lg font-semibold text-gray-800">
              Learn & Grow
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              Trading strategies & insights
            </p>
            <div className="mt-4 inline-block text-sm font-medium text-purple-600 group-hover:translate-x-1 transition-transform">
              Start learning →
            </div>
          </a>
        </div>
      </div>
    );
  }

  // Full dashboard for static user or active trader
  const topPositions = openPositions.slice(0, 4);
  const topWatchlist = watchlistItems.slice(0, 6);
  const upcomingEvents = calendarEvents.slice(0, 4);

  return (
    <div className="space-y-7">
      {/* Welcome bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-blue-100/50 backdrop-blur-sm">
        <div>
          <h2 className="font-display text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Good {new Date().getHours() < 12 ? "morning" : "afternoon"},{" "}
            {userName}! 👋
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · <span className="font-medium text-blue-600">Live trading</span>
          </p>
        </div>

        {portfolioStats && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/80 rounded-xl border border-gray-200">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Euro size={16} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Balance</p>
                <p className="text-sm font-bold text-gray-800">
                  {formatEuro(portfolioStats.balance || 0)}
                </p>
              </div>
            </div>
            <PnLBadge
              value={portfolioStats.todayPnL}
              percent={portfolioStats.todayPnLPercent}
            />
          </div>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Portfolio balance"
          value={formatEuro(portfolioStats?.balance || 0)}
          trend={portfolioStats?.allTimePnLPercent}
          sub="all time"
          icon={Wallet}
          accent="blue"
        />
        <StatCard
          label="Today's P&L"
          value={formatEuro(portfolioStats?.todayPnL || 0)}
          trend={portfolioStats?.todayPnLPercent}
          sub="vs yesterday"
          icon={TrendingUp}
          accent="green"
        />
        <StatCard
          label="Open positions"
          value={String(openPositions.length)}
          sub={`Margin: ${formatEuro(portfolioStats?.usedMargin || 0)}`}
          icon={Activity}
          accent="amber"
        />
        <StatCard
          label="Pending orders"
          value={String(pendingOrders.length)}
          sub="awaiting execution"
          icon={ClipboardList}
          accent="blue"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Portfolio growth */}
        <WidgetCard title="Portfolio growth" className="lg:col-span-2">
          {portfolioGrowthData && portfolioGrowthData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={portfolioGrowthData}
                margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1">
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
                  fill="url(#pGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[200px] items-center justify-center text-sm text-gray-400">
              No portfolio history yet
            </div>
          )}
        </WidgetCard>

        {/* Asset allocation */}
        <WidgetCard title="Asset allocation">
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {allocationData.map((entry, index) => (
                    <Cell
                      key={entry.name || index}
                      fill={entry.color || "#E5E7EB"}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3 w-full space-y-2">
              {allocationData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-xs group hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full transition-transform group-hover:scale-110"
                      style={{ background: item.color }}
                    />
                    <span className="text-gray-600 font-medium">
                      {item.name}
                    </span>
                  </div>
                  <span className="tabular font-semibold text-gray-800">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </WidgetCard>
      </div>

      {/* Middle row: positions + watchlist */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Open positions */}
        <WidgetCard
          title={`Open positions (${openPositions.length})`}
          action={
            openPositions.length > 0 ? (
              <a
                href="/positions"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
              >
                View all →
              </a>
            ) : undefined
          }
        >
          {openPositions.length > 0 ? (
            <div className="space-y-2.5">
              {topPositions.map((pos) => {
                const isUp = pos.pnl >= 0;
                return (
                  <div
                    key={pos.id}
                    className="flex items-center justify-between rounded-xl bg-gray-50/80 px-4 py-3 hover:bg-gray-100/80 transition-all duration-200 border border-gray-100/50"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "h-2.5 w-2.5 shrink-0 rounded-full",
                          isUp ? "bg-green-500" : "bg-red-500",
                        )}
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {pos.symbol}
                        </p>
                        <p className="text-xs text-gray-400 capitalize">
                          {pos.direction} · {pos.lots} lots
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={cn(
                          "tabular text-sm font-bold",
                          isUp ? "text-green-600" : "text-red-600",
                        )}
                      >
                        {isUp ? "+" : ""}
                        {formatEuro(pos.pnl)}
                      </p>
                      <p
                        className={cn(
                          "tabular text-xs font-medium",
                          isUp ? "text-green-500" : "text-red-500",
                        )}
                      >
                        {formatPercent(pos.pnlPercent)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-gray-400">
              No open positions. Start trading to see them here.
            </div>
          )}
        </WidgetCard>

        {/* Watchlist */}
        <WidgetCard
          title="Watchlist"
          action={
            watchlistItems.length > 0 ? (
              <a
                href="/watchlist"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
              >
                Manage →
              </a>
            ) : undefined
          }
        >
          {watchlistItems.length > 0 ? (
            <div className="space-y-1.5">
              {topWatchlist.map((item) => {
                const isUp = item.changePercent >= 0;
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-gray-50/80 transition-all duration-200 cursor-default"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {item.symbol}
                      </p>
                      <p className="text-xs text-gray-400">{item.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="tabular text-sm font-medium text-gray-800">
                        {formatEuro(item.price)}
                      </p>
                      <p
                        className={cn(
                          "tabular text-xs font-semibold",
                          isUp ? "text-green-600" : "text-red-600",
                        )}
                      >
                        {formatPercent(item.changePercent)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-gray-400">
              Your watchlist is empty. Add instruments to track.
            </div>
          )}
        </WidgetCard>
      </div>

      {/* Bottom row: daily P&L + news + calendar */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Daily P&L bar chart */}
        <WidgetCard title="Daily P&L this week">
          {dailyPnLData && dailyPnLData.some((d) => d.pnl !== 0) ? (
            <ResponsiveContainer width="100%" height={140}>
              <BarChart
                data={dailyPnLData}
                margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `€${v}`}
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
                <Bar dataKey="pnl" radius={[6, 6, 0, 0]}>
                  {dailyPnLData.map((entry) => (
                    <Cell
                      key={entry.day}
                      fill={entry.pnl >= 0 ? "#16A34A" : "#DC2626"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[140px] items-center justify-center text-sm text-gray-400">
              No P&L data available yet
            </div>
          )}
        </WidgetCard>

        {/* News feed */}
        <WidgetCard
          title="Market news"
          action={
            <a
              href="/dashboard/news"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
            >
              All news →
            </a>
          }
        >
          <div className="space-y-3.5">
            {newsItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 border-b border-gray-100 pb-3.5 last:border-0 last:pb-0"
              >
                <span
                  className={cn(
                    "mt-1 h-2 w-2 shrink-0 rounded-full",
                    item.impact === "high" ? "bg-red-500" : "bg-blue-400",
                  )}
                />
                <div>
                  <p className="text-sm font-medium text-gray-800 leading-snug">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {item.category} · {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>

        {/* Economic calendar */}
        <WidgetCard
          title="Upcoming events"
          action={
            <a
              href="/calendar"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
            >
              Full calendar →
            </a>
          }
        >
          <div className="space-y-3.5">
            {upcomingEvents.map((ev) => (
              <div
                key={ev.id}
                className="flex items-start gap-3 border-b border-gray-100 pb-3.5 last:border-0 last:pb-0"
              >
                <span
                  className={cn(
                    "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                    ev.impact === "high"
                      ? "bg-red-500"
                      : ev.impact === "medium"
                        ? "bg-blue-400"
                        : "bg-gray-300",
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {ev.event}
                  </p>
                  <p className="text-xs text-gray-400">
                    {ev.country} · {ev.date} {ev.time} UTC
                  </p>
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>

      {/* Equity summary strip */}
      {portfolioStats && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {[
            {
              label: "Equity",
              value: formatEuro(portfolioStats.equity || 0),
            },
            {
              label: "Free margin",
              value: formatEuro(portfolioStats.freeMargin || 0),
            },
            {
              label: "Used margin",
              value: formatEuro(portfolioStats.usedMargin || 0),
            },
            {
              label: "Margin level",
              value: `${(portfolioStats.marginLevel || 0).toFixed(1)}%`,
            },
            {
              label: "Weekly P&L",
              value: formatEuro(portfolioStats.weeklyPnL || 0),
            },
            {
              label: "All-time P&L",
              value: formatEuro(portfolioStats.allTimePnL || 0),
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 p-4 hover:shadow-md transition-all duration-300 hover:border-blue-200"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                {item.label}
              </p>
              <p className="tabular mt-1.5 text-sm font-bold text-gray-800">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
