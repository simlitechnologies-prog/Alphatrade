export interface Position {
  id: string;
  symbol: string;
  name: string;
  direction: "buy" | "sell";
  lots: number;
  openPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  openedAt: string;
  stopLoss?: number;
  takeProfit?: number;
}

export interface Order {
  id: string;
  symbol: string;
  type: "market" | "limit" | "stop" | "stop-limit";
  direction: "buy" | "sell";
  lots: number;
  price: number;
  status: "open" | "pending" | "filled" | "cancelled";
  createdAt: string;
  filledAt?: string;
}

export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "trade_profit" | "trade_loss" | "swap" | "commission";
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  method?: string;
  createdAt: string;
  reference: string;
}

export interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  alertPrice?: number;
}

export interface CalendarEvent {
  id: string;
  date: string;
  time: string;
  event: string;
  country: string;
  impact: "high" | "medium" | "low";
  forecast?: string;
  previous?: string;
  actual?: string;
}

export const portfolioStats = {
  balance: 128940.55,
  equity: 131204.30,
  freeMargin: 98432.10,
  usedMargin: 32772.20,
  marginLevel: 400.3,
  openPnL: 2263.75,
  openPnLPercent: 1.76,
  todayPnL: 1842.40,
  todayPnLPercent: 1.43,
  weeklyPnL: 4210.80,
  weeklyPnLPercent: 3.38,
  allTimePnL: 28940.55,
  allTimePnLPercent: 28.94,
};

export const openPositions: Position[] = [
  { id: "p1", symbol: "EUR/USD", name: "Euro / US Dollar", direction: "buy", lots: 2.0, openPrice: 1.0812, currentPrice: 1.0847, pnl: 700.00, pnlPercent: 0.32, openedAt: "2026-06-30T08:14:22Z", stopLoss: 1.0750, takeProfit: 1.0950 },
  { id: "p2", symbol: "AAPL", name: "Apple Inc.", direction: "buy", lots: 50, openPrice: 208.90, currentPrice: 213.45, pnl: 227.50, pnlPercent: 2.18, openedAt: "2026-06-29T14:30:00Z", stopLoss: 200.00, takeProfit: 230.00 },
  { id: "p3", symbol: "XAU/USD", name: "Gold Spot", direction: "buy", lots: 0.5, openPrice: 2340.20, currentPrice: 2364.80, pnl: 1230.00, pnlPercent: 1.05, openedAt: "2026-06-28T10:02:11Z", stopLoss: 2300.00, takeProfit: 2420.00 },
  { id: "p4", symbol: "TSLA", name: "Tesla, Inc.", direction: "sell", lots: 20, openPrice: 255.40, currentPrice: 248.12, pnl: 145.60, pnlPercent: 2.85, openedAt: "2026-06-30T09:45:00Z", stopLoss: 265.00, takeProfit: 230.00 },
  { id: "p5", symbol: "BTC/USD", name: "Bitcoin", direction: "buy", lots: 0.42, openPrice: 65200.00, currentPrice: 67340.55, pnl: 898.43, pnlPercent: 3.28, openedAt: "2026-06-27T16:20:00Z", stopLoss: 60000.00, takeProfit: 72000.00 },
  { id: "p6", symbol: "GBP/USD", name: "British Pound", direction: "sell", lots: 1.5, openPrice: 1.2692, currentPrice: 1.2734, pnl: -630.00, pnlPercent: -0.33, openedAt: "2026-06-30T11:10:00Z", stopLoss: 1.2820, takeProfit: 1.2550 },
];

export const pendingOrders: Order[] = [
  { id: "o1", symbol: "EUR/USD", type: "limit", direction: "buy", lots: 1.0, price: 1.0780, status: "pending", createdAt: "2026-06-30T10:20:00Z" },
  { id: "o2", symbol: "NVDA", type: "limit", direction: "buy", lots: 30, price: 118.00, status: "pending", createdAt: "2026-06-30T09:05:00Z" },
  { id: "o3", symbol: "SPX500", type: "stop", direction: "sell", lots: 0.5, price: 5420.00, status: "pending", createdAt: "2026-06-29T15:30:00Z" },
];

export const recentOrders: Order[] = [
  { id: "o4", symbol: "BTC/USD", type: "market", direction: "buy", lots: 0.42, price: 65200.00, status: "filled", createdAt: "2026-06-27T16:20:00Z", filledAt: "2026-06-27T16:20:01Z" },
  { id: "o5", symbol: "AAPL", type: "market", direction: "buy", lots: 50, price: 208.90, status: "filled", createdAt: "2026-06-29T14:30:00Z", filledAt: "2026-06-29T14:30:00Z" },
  { id: "o6", symbol: "EUR/GBP", type: "limit", direction: "sell", lots: 2.0, price: 0.8490, status: "cancelled", createdAt: "2026-06-28T12:00:00Z" },
  { id: "o7", symbol: "XAU/USD", type: "market", direction: "buy", lots: 0.5, price: 2340.20, status: "filled", createdAt: "2026-06-28T10:02:11Z", filledAt: "2026-06-28T10:02:12Z" },
];

export const transactions: Transaction[] = [
  { id: "t1", type: "deposit", amount: 5000.00, currency: "USD", status: "completed", method: "Bank transfer", createdAt: "2026-06-25T09:00:00Z", reference: "DEP-2026-0089" },
  { id: "t2", type: "trade_profit", amount: 1842.40, currency: "USD", status: "completed", createdAt: "2026-06-30T00:00:00Z", reference: "PNL-2026-0622" },
  { id: "t3", type: "withdrawal", amount: 2000.00, currency: "USD", status: "completed", method: "Bank transfer", createdAt: "2026-06-20T11:00:00Z", reference: "WDR-2026-0041" },
  { id: "t4", type: "trade_profit", amount: 3210.80, currency: "USD", status: "completed", createdAt: "2026-06-29T00:00:00Z", reference: "PNL-2026-0621" },
  { id: "t5", type: "commission", amount: -42.30, currency: "USD", status: "completed", createdAt: "2026-06-29T14:30:00Z", reference: "COM-2026-1104" },
  { id: "t6", type: "swap", amount: -12.80, currency: "USD", status: "completed", createdAt: "2026-06-30T00:00:00Z", reference: "SWP-2026-0980" },
  { id: "t7", type: "deposit", amount: 10000.00, currency: "USD", status: "completed", method: "Card", createdAt: "2026-06-10T14:22:00Z", reference: "DEP-2026-0061" },
  { id: "t8", type: "trade_loss", amount: -890.40, currency: "USD", status: "completed", createdAt: "2026-06-18T00:00:00Z", reference: "PNL-2026-0592" },
];

export const watchlistItems: WatchlistItem[] = [
  { id: "w1", symbol: "EUR/USD", name: "Euro / US Dollar", price: 1.0847, changePercent: 0.19, alertPrice: 1.0950 },
  { id: "w2", symbol: "BTC/USD", name: "Bitcoin", price: 67340.55, changePercent: 1.93 },
  { id: "w3", symbol: "NVDA", name: "NVIDIA Corporation", price: 124.87, changePercent: 3.23, alertPrice: 130.00 },
  { id: "w4", symbol: "XAU/USD", name: "Gold Spot", price: 2364.80, changePercent: 0.48 },
  { id: "w5", symbol: "SPX500", name: "S&P 500", price: 5489.12, changePercent: 0.34 },
  { id: "w6", symbol: "GBP/USD", name: "British Pound", price: 1.2734, changePercent: -0.36 },
  { id: "w7", symbol: "ETH/USD", name: "Ethereum", price: 3512.90, changePercent: -1.18 },
  { id: "w8", symbol: "AAPL", name: "Apple Inc.", price: 213.45, changePercent: 1.03 },
];

export const calendarEvents: CalendarEvent[] = [
  { id: "e1", date: "2026-07-01", time: "12:30", event: "US Non-Farm Payrolls", country: "USD", impact: "high", forecast: "185K", previous: "175K" },
  { id: "e2", date: "2026-07-01", time: "12:30", event: "US Unemployment Rate", country: "USD", impact: "high", forecast: "3.9%", previous: "4.0%" },
  { id: "e3", date: "2026-07-02", time: "09:00", event: "UK Services PMI", country: "GBP", impact: "medium", forecast: "52.8", previous: "52.1" },
  { id: "e4", date: "2026-07-03", time: "12:30", event: "US Initial Jobless Claims", country: "USD", impact: "medium", forecast: "235K", previous: "238K" },
  { id: "e5", date: "2026-07-07", time: "18:00", event: "Federal Reserve Meeting Minutes", country: "USD", impact: "high", previous: "—" },
  { id: "e6", date: "2026-07-09", time: "11:00", event: "UK GDP (MoM)", country: "GBP", impact: "high", forecast: "0.2%", previous: "0.1%" },
  { id: "e7", date: "2026-07-10", time: "12:30", event: "US CPI (YoY)", country: "USD", impact: "high", forecast: "3.1%", previous: "3.3%" },
  { id: "e8", date: "2026-07-11", time: "07:00", event: "Germany CPI (YoY)", country: "EUR", impact: "medium", forecast: "2.4%", previous: "2.6%" },
];

export const portfolioGrowthData = [
  { month: "Jan", value: 100000 },
  { month: "Feb", value: 104200 },
  { month: "Mar", value: 101800 },
  { month: "Apr", value: 108500 },
  { month: "May", value: 115300 },
  { month: "Jun", value: 128940 },
];

export const dailyPnLData = [
  { day: "Mon", pnl: 420 },
  { day: "Tue", pnl: -180 },
  { day: "Wed", pnl: 890 },
  { day: "Thu", pnl: 1240 },
  { day: "Fri", pnl: 1842 },
];

export const allocationData = [
  { name: "Forex", value: 38, color: "#2563EB" },
  { name: "Stocks", value: 28, color: "#16A34A" },
  { name: "Crypto", value: 22, color: "#F59E0B" },
  { name: "Commodities", value: 12, color: "#DC2626" },
];

export const newsItems = [
  { id: "n1", title: "Fed holds rates — dollar softens across majors", category: "Forex", time: "2h ago", impact: "high" },
  { id: "n2", title: "NVIDIA earnings beat estimates by 12%", category: "Stocks", time: "4h ago", impact: "high" },
  { id: "n3", title: "Gold consolidates near $2,365 ahead of NFP", category: "Commodities", time: "5h ago", impact: "medium" },
  { id: "n4", title: "BTC breaks above $67K on ETF inflows", category: "Crypto", time: "6h ago", impact: "medium" },
  { id: "n5", title: "UK inflation falls to 2.3% — GBP weakens", category: "Forex", time: "1d ago", impact: "high" },
];
