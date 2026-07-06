export const STATIC_USER = {
  id: "static_demo_user",
  uid: "static_demo_user",
  firstName: "Lukas",
  lastName: "Schneider",
  email: "lukas.schneider@example.de",
  displayName: "Lukas Schneider",
  country: "DE",
  phoneNumber: "+49 176 1234567",
  emailVerified: true,
  isActive: true,
  role: "user",
  isStaticUser: true,
  createdAt: new Date("2010-01-01"),
  lastLogin: new Date(),
  settings: {
    notifications: true,
    twoFactorEnabled: false,
    theme: "dark",
  },
  address: {
    street: "Friedrichstraße 123",
    city: "Berlin",
    postalCode: "10117",
    country: "Germany",
  },
  bankDetails: {
    bankName: "Deutsche Bank",
    iban: "DE89370400440532013000",
    bic: "DEUTDEBBXXX",
  },
};

// Static portfolio data for German user
export const STATIC_PORTFOLIO = {
  balance: 48520.75,
  equity: 51230.2,
  freeMargin: 45230.2,
  usedMargin: 6000.0,
  marginLevel: 853.84,
  todayPnL: 847.3,
  todayPnLPercent: 1.68,
  weeklyPnL: 2340.15,
  allTimePnL: 12320.75,
  allTimePnLPercent: 34.2,
  currency: "EUR",
};

// Static positions
export const STATIC_POSITIONS = [
  {
    id: "pos-1",
    symbol: "EUR/USD",
    direction: "long",
    lots: 2.5,
    entryPrice: 1.085,
    currentPrice: 1.0923,
    pnl: 1825.0,
    pnlPercent: 3.36,
    openDate: new Date("2020-06-25"),
    stopLoss: 1.08,
    takeProfit: 1.1,
  },
  {
    id: "pos-2",
    symbol: "BTC/USD",
    direction: "short",
    lots: 0.5,
    entryPrice: 62400,
    currentPrice: 61850,
    pnl: 275.0,
    pnlPercent: 0.88,
    openDate: new Date("2021-10-27"),
    stopLoss: 63500,
    takeProfit: 60000,
  },
  {
    id: "pos-3",
    symbol: "DE30",
    direction: "long",
    lots: 1.0,
    entryPrice: 18650,
    currentPrice: 18820,
    pnl: 170.0,
    pnlPercent: 0.91,
    openDate: new Date("2011-07-28"),
    stopLoss: 18400,
    takeProfit: 19000,
  },
  {
    id: "pos-4",
    symbol: "Gold",
    direction: "long",
    lots: 2.0,
    entryPrice: 2320,
    currentPrice: 2345,
    pnl: 500.0,
    pnlPercent: 1.08,
    openDate: new Date("2010-03-09"),
    stopLoss: 2300,
    takeProfit: 2380,
  },
];

// Static watchlist
export const STATIC_WATCHLIST = [
  {
    id: "w-1",
    symbol: "BTC/USD",
    name: "Bitcoin",
    price: 61850,
    changePercent: 0.88,
  },
  {
    id: "w-2",
    symbol: "ETH/USD",
    name: "Ethereum",
    price: 3450,
    changePercent: -0.45,
  },
  {
    id: "w-3",
    symbol: "EUR/USD",
    name: "Euro/US Dollar",
    price: 1.0923,
    changePercent: 0.67,
  },
  {
    id: "w-4",
    symbol: "DE30",
    name: "DAX 30",
    price: 18820,
    changePercent: 0.91,
  },
  { id: "w-5", symbol: "Gold", name: "Gold", price: 2345, changePercent: 0.54 },
  {
    id: "w-6",
    symbol: "S&P 500",
    name: "S&P 500",
    price: 5480,
    changePercent: -0.23,
  },
];

// Static order history
export const STATIC_ORDERS = [
  {
    id: "ord-1",
    symbol: "EUR/USD",
    type: "market",
    direction: "buy",
    lots: 1.0,
    price: 1.085,
    status: "filled",
    createdAt: new Date("2026-06-25T10:30:00"),
    filledAt: new Date("2026-06-25T10:30:05"),
  },
  {
    id: "ord-2",
    symbol: "BTC/USD",
    type: "limit",
    direction: "sell",
    lots: 0.5,
    price: 62400,
    limitPrice: 63000,
    status: "pending",
    createdAt: new Date("2026-06-28T14:20:00"),
  },
  {
    id: "ord-3",
    symbol: "DE30",
    type: "stop",
    direction: "buy",
    lots: 1.0,
    price: 18650,
    stopPrice: 18700,
    status: "pending",
    createdAt: new Date("2026-06-29T09:15:00"),
  },
];

// Portfolio growth data
export const STATIC_PORTFOLIO_GROWTH = [
  { month: "Jan", value: 40000 },
  { month: "Feb", value: 41200 },
  { month: "Mar", value: 39800 },
  { month: "Apr", value: 42500 },
  { month: "May", value: 45200 },
  { month: "Jun", value: 48520 },
];

// Daily P&L data
export const STATIC_DAILY_PNL = [
  { day: "Mon", pnl: -120 },
  { day: "Tue", pnl: 340 },
  { day: "Wed", pnl: 280 },
  { day: "Thu", pnl: -45 },
  { day: "Fri", pnl: 392 },
  { day: "Sat", pnl: 0 },
  { day: "Sun", pnl: 0 },
];

// Asset allocation
export const STATIC_ALLOCATION = [
  { name: "Forex", value: 45, color: "#2563EB" },
  { name: "Crypto", value: 25, color: "#F59E0B" },
  { name: "Indices", value: 20, color: "#10B981" },
  { name: "Commodities", value: 10, color: "#8B5CF6" },
];

// News items
export const STATIC_NEWS = [
  {
    id: "n-1",
    title: "ECB Signals Rate Cut in September as Inflation Cools",
    category: "Central Banks",
    time: "2h ago",
    impact: "high",
  },
  {
    id: "n-2",
    title: "Bitcoin Surges Past $62,000 on Institutional Inflows",
    category: "Crypto",
    time: "4h ago",
    impact: "high",
  },
  {
    id: "n-3",
    title: "German Manufacturing PMI Beats Expectations at 48.2",
    category: "Economic Data",
    time: "6h ago",
    impact: "medium",
  },
  {
    id: "n-4",
    title: "Oil Prices Steady Amid Middle East Tensions",
    category: "Commodities",
    time: "8h ago",
    impact: "medium",
  },
];

// Calendar events
export const STATIC_CALENDAR_EVENTS = [
  {
    id: "e-1",
    event: "ECB Press Conference",
    country: "EU",
    date: "Today",
    time: "14:30",
    impact: "high",
  },
  {
    id: "e-2",
    event: "US Non-Farm Payrolls",
    country: "US",
    date: "Jul 2",
    time: "14:30",
    impact: "high",
  },
  {
    id: "e-3",
    event: "German CPI Data",
    country: "DE",
    date: "Jul 3",
    time: "08:00",
    impact: "medium",
  },
  {
    id: "e-4",
    event: "FOMC Minutes Release",
    country: "US",
    date: "Jul 5",
    time: "20:00",
    impact: "high",
  },
];
