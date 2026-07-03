/**
 * Mock data generators — call these to seed a development Firestore instance
 * or export to JSON for offline testing.
 *
 * Usage (Node.js script or browser console):
 *   import { generateUsers, generateTrades, generateNewsArticles } from "@/data/generators";
 *   const users = generateUsers(200);
 *   const trades = generateTrades(users.slice(0, 50), 5000);
 */

import { tickerAssets } from "@/data/markets";

// ─── Seeded pseudo-random (deterministic) ────────────────────────────────────

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

// ─── Name pools ───────────────────────────────────────────────────────────────

const FIRST_NAMES = [
  "Kwame", "Amara", "Fatima", "Daniel", "Priya", "Carlos", "Yuki", "Ahmed",
  "Sophie", "James", "Aisha", "Marcus", "Emma", "Roberto", "Anna", "Li",
  "Sarah", "Michael", "Olivia", "Liam", "Chioma", "Kofi", "Ama", "Abena",
  "Nana", "Kweku", "Efua", "Akosua", "Yaw", "Adwoa", "Kojo", "Esi",
  "Tariq", "Layla", "Hassan", "Nadia", "Omar", "Mariam", "Sanjay", "Pita",
];

const LAST_NAMES = [
  "Mensah", "Okafor", "Al-Rashid", "Thornton", "Sharma", "Mendez", "Tanaka",
  "Hassan", "Laurent", "Wilson", "Nkrumah", "Asante", "Owusu", "Boateng",
  "Adjei", "Appiah", "Darko", "Acheampong", "Ofori", "Amoah", "Sarpong",
  "Gyasi", "Frimpong", "Quartey", "Tetteh", "Ankrah", "Botchway", "Quaye",
  "Silva", "Kowalski", "Wei", "Petrov", "Webb", "Chen", "Kim", "Patel",
];

const COUNTRIES = [
  "Ghana", "Nigeria", "Kenya", "South Africa", "Egypt", "Morocco",
  "United Kingdom", "United States", "Germany", "France", "UAE",
  "India", "Japan", "Singapore", "Canada", "Australia", "Brazil",
];

const DOMAINS = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "protonmail.com"];

// ─── User generator ───────────────────────────────────────────────────────────

export interface GeneratedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  country: string;
  accountTier: "starter" | "pro" | "elite";
  status: "active" | "suspended" | "pending_kyc";
  kycStatus: "verified" | "pending" | "not_submitted";
  balance: number;
  joinedAt: string;
  lastLogin: string;
}

export function generateUsers(count = 200, seed = 42): GeneratedUser[] {
  const rand = seededRandom(seed);
  const users: GeneratedUser[] = [];

  for (let i = 0; i < count; i++) {
    const first = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)];
    const last = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)];
    const country = COUNTRIES[Math.floor(rand() * COUNTRIES.length)];
    const domain = DOMAINS[Math.floor(rand() * DOMAINS.length)];

    const tierRoll = rand();
    const tier = tierRoll > 0.9 ? "elite" : tierRoll > 0.6 ? "pro" : "starter";

    const statusRoll = rand();
    const status =
      statusRoll > 0.97 ? "suspended" : statusRoll > 0.88 ? "pending_kyc" : "active";

    const kycRoll = rand();
    const kyc =
      status === "pending_kyc" ? "pending" : kycRoll > 0.9 ? "not_submitted" : "verified";

    const balanceBase = tier === "elite" ? 50000 : tier === "pro" ? 5000 : 500;
    const balance = parseFloat((balanceBase * (0.5 + rand() * 9.5)).toFixed(2));

    const joinYear = 2024 + Math.floor(rand() * 2);
    const joinMonth = 1 + Math.floor(rand() * 12);
    const joinDay = 1 + Math.floor(rand() * 28);

    users.push({
      id: `USR${String(i + 1).padStart(6, "0")}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@${domain}`,
      firstName: first,
      lastName: last,
      displayName: `${first} ${last}`,
      country,
      accountTier: tier,
      status,
      kycStatus: kyc,
      balance,
      joinedAt: `${joinYear}-${String(joinMonth).padStart(2, "0")}-${String(joinDay).padStart(2, "0")}`,
      lastLogin: "2026-06-30",
    });
  }

  return users;
}

// ─── Trade generator ──────────────────────────────────────────────────────────

export interface GeneratedTrade {
  id: string;
  userId: string;
  symbol: string;
  direction: "buy" | "sell";
  lots: number;
  openPrice: number;
  closePrice: number;
  pnl: number;
  pnlPercent: number;
  openedAt: string;
  closedAt: string;
}

export function generateTrades(
  users: Pick<GeneratedUser, "id">[],
  count = 5000,
  seed = 99
): GeneratedTrade[] {
  const rand = seededRandom(seed);
  const trades: GeneratedTrade[] = [];
  const assets = tickerAssets.filter((a) => a.assetClass !== "index");

  for (let i = 0; i < count; i++) {
    const user = users[Math.floor(rand() * users.length)];
    const asset = assets[Math.floor(rand() * assets.length)];
    const direction: "buy" | "sell" = rand() > 0.5 ? "buy" : "sell";

    const openPrice = asset.price * (0.95 + rand() * 0.1);
    const pnlFactor = (rand() - 0.47) * 0.04;
    const closePrice = openPrice * (1 + pnlFactor);
    const lots = parseFloat((0.1 + rand() * 4.9).toFixed(2));
    const pnl = parseFloat(((closePrice - openPrice) * lots * 1000 * (direction === "sell" ? -1 : 1)).toFixed(2));
    const pnlPercent = parseFloat(((pnl / (openPrice * lots * 100)) * 100).toFixed(2));

    const dayOffset = Math.floor(rand() * 365);
    
    const durationHours = 0.5 + rand() * 47.5;
    const openedAt = new Date(Date.now() - dayOffset * 86400000).toISOString();
    const closedAt = new Date(
      new Date(openedAt).getTime() + durationHours * 3600000
    ).toISOString();

    trades.push({
      id: `TRD${String(i + 1).padStart(8, "0")}`,
      userId: user.id,
      symbol: asset.symbol,
      direction,
      lots,
      openPrice: parseFloat(openPrice.toFixed(asset.price > 100 ? 2 : 4)),
      closePrice: parseFloat(closePrice.toFixed(asset.price > 100 ? 2 : 4)),
      pnl,
      pnlPercent,
      openedAt,
      closedAt,
    });
  }

  return trades;
}

// ─── Order generator ──────────────────────────────────────────────────────────

export interface GeneratedOrder {
  id: string;
  userId: string;
  symbol: string;
  type: "market" | "limit" | "stop";
  direction: "buy" | "sell";
  lots: number;
  price: number;
  status: "filled" | "pending" | "cancelled";
  createdAt: string;
}

export function generateOrders(
  users: Pick<GeneratedUser, "id">[],
  count = 1000,
  seed = 77
): GeneratedOrder[] {
  const rand = seededRandom(seed);
  const orders: GeneratedOrder[] = [];
  const assets = tickerAssets.slice(0, 20);

  for (let i = 0; i < count; i++) {
    const user = users[Math.floor(rand() * users.length)];
    const asset = assets[Math.floor(rand() * assets.length)];
    const typeRoll = rand();
    const type = typeRoll > 0.65 ? "market" : typeRoll > 0.35 ? "limit" : "stop";
    const statusRoll = rand();
    const status =
      type === "market" ? "filled" : statusRoll > 0.6 ? "filled" : statusRoll > 0.2 ? "pending" : "cancelled";

    orders.push({
      id: `ORD${String(i + 1).padStart(7, "0")}`,
      userId: user.id,
      symbol: asset.symbol,
      type,
      direction: rand() > 0.5 ? "buy" : "sell",
      lots: parseFloat((0.1 + rand() * 9.9).toFixed(2)),
      price: parseFloat((asset.price * (0.98 + rand() * 0.04)).toFixed(asset.price > 100 ? 2 : 4)),
      status,
      createdAt: new Date(Date.now() - Math.floor(rand() * 180) * 86400000).toISOString(),
    });
  }

  return orders;
}

// ─── News generator ───────────────────────────────────────────────────────────

const NEWS_TEMPLATES = [
  { category: "Forex",       titles: ["Central bank holds rates — {ccy} reaction", "GDP miss pushes {ccy} lower", "{ccy} breaks key support on dovish signals", "NFP beats forecast: dollar surges across majors"] },
  { category: "Stocks",      titles: ["{sym} earnings beat by {pct}%", "{sym} announces share buyback", "Tech sector rallies on AI optimism", "{sym} hits 52-week high after analyst upgrade"] },
  { category: "Commodities", titles: ["Gold holds near ${price} ahead of Fed", "Oil falls on demand concerns", "Silver breaks out — targets ${price}", "Cocoa prices surge on supply shortage"] },
  { category: "Crypto",      titles: ["Bitcoin tests ${price} resistance", "Ethereum upgrade drives ETH higher", "Crypto ETF inflows hit ${amt}B in a week", "Altcoins rally as BTC dominance falls"] },
  { category: "Indices",     titles: ["S&P 500 approaches all-time high", "FTSE 100 lags as GBP strengthens", "DAX gains on positive German data", "Nikkei 225 dips on JPY strength"] },
];

export interface GeneratedNews {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  impact: "low" | "medium" | "high";
  publishedAt: string;
  readTime: string;
  author: string;
}

export function generateNewsArticles(count = 500, seed = 55): GeneratedNews[] {
  const rand = seededRandom(seed);
  const articles: GeneratedNews[] = [];
  const authors = ["Research Desk", "Market Analysis Team", "FX Strategy", "Equity Research", "Macro View"];

  for (let i = 0; i < count; i++) {
    const template = NEWS_TEMPLATES[Math.floor(rand() * NEWS_TEMPLATES.length)];
    const title = template.titles[Math.floor(rand() * template.titles.length)]
      .replace("{ccy}", ["USD", "GBP", "EUR", "JPY"][Math.floor(rand() * 4)])
      .replace("{sym}", ["AAPL", "TSLA", "NVDA", "MSFT", "META"][Math.floor(rand() * 5)])
      .replace("{pct}", String(Math.floor(rand() * 15 + 3)))
      .replace("{price}", String(Math.floor(rand() * 500 + 100)))
      .replace("{amt}", String((rand() * 3 + 0.5).toFixed(1)));

    const impactRoll = rand();
    const impact: "low" | "medium" | "high" =
      impactRoll > 0.65 ? "high" : impactRoll > 0.3 ? "medium" : "low";

    const daysAgo = Math.floor(rand() * 90);
    const publishedAt = new Date(Date.now() - daysAgo * 86400000).toISOString();

    articles.push({
      id: `NEWS${String(i + 1).padStart(6, "0")}`,
      title,
      category: template.category,
      excerpt: `Market analysis and trading implications for ${template.category.toLowerCase()} traders following the latest developments. Key levels and risk scenarios are discussed below.`,
      impact,
      publishedAt,
      readTime: `${2 + Math.floor(rand() * 6)} min`,
      author: authors[Math.floor(rand() * authors.length)],
    });
  }

  return articles;
}

// ─── Watchlist generator ──────────────────────────────────────────────────────

export function generateWatchlists(
  users: Pick<GeneratedUser, "id">[],
  count = 100,
  seed = 33
) {
  const rand = seededRandom(seed);
  return users.slice(0, count).map((user) => ({
    id: `WL${user.id}`,
    userId: user.id,
    name: "My Watchlist",
    symbols: tickerAssets
      .slice(0, Math.floor(rand() * 10 + 3))
      .map((a) => a.symbol),
    createdAt: new Date(Date.now() - Math.floor(rand() * 365) * 86400000).toISOString(),
  }));
}

// ─── FAQ generator (50 items) ─────────────────────────────────────────────────

export function generateFAQs() {
  return [
    { id: "faq01", q: "How do I open an AlphaTrade account?", a: "Click 'Open free account', verify your email, complete KYC, and fund your wallet — usually under 10 minutes." },
    { id: "faq02", q: "What is the minimum deposit?", a: "Starter accounts have no minimum. Pro requires $500, Elite requires $10,000." },
    { id: "faq03", q: "Which markets can I trade?", a: "Forex, stocks, commodities, indices, ETFs, and crypto — all from one account." },
    { id: "faq04", q: "How long do withdrawals take?", a: "Bank and card withdrawals take 1–3 business days. Crypto withdrawals usually complete within a few hours." },
    { id: "faq05", q: "Is my money safe?", a: "Client funds are held in segregated tier-1 bank accounts, separate from company funds, with 256-bit encryption." },
    { id: "faq06", q: "Do I need to complete KYC?", a: "Yes — KYC is required by regulation before depositing or trading live. It typically takes under 24 hours to review." },
    { id: "faq07", q: "What leverage is available?", a: "Up to 1:500 on major forex pairs, 1:20 on stocks, 1:50 on crypto, depending on account tier and jurisdiction." },
    { id: "faq08", q: "Can I practice with a demo account?", a: "Yes — every account includes a free $10,000 virtual demo account with real market data." },
    { id: "faq09", q: "What are the trading hours?", a: "Forex and crypto trade 24/5 and 24/7 respectively. Stock market hours depend on the exchange." },
    { id: "faq10", q: "How do stop-loss orders work?", a: "A stop-loss automatically closes your position if the market moves against you to a price you set — protecting your capital." },
    { id: "faq11", q: "What spreads do you offer?", a: "Spreads start from 0.6 pips on EUR/USD. All spreads are displayed before you place any trade." },
    { id: "faq12", q: "Are there overnight fees?", a: "Yes — swap fees apply to positions held overnight. Rates are shown on each instrument's detail page." },
    { id: "faq13", q: "Can I trade on mobile?", a: "Yes — the AlphaTrade app for iOS and Android gives full access to markets, charting, and order execution." },
    { id: "faq14", q: "What is margin trading?", a: "Margin trading means using borrowed capital to trade larger positions. It multiplies both profits and potential losses." },
    { id: "faq15", q: "How do I enable two-factor authentication?", a: "Go to Settings → Security and follow the instructions to link an authenticator app to your account." },
  ];
}

// ─── Economic events generator (50 items) ────────────────────────────────────

export function generateCalendarEvents(count = 50, seed = 11) {
  const rand = seededRandom(seed);
  const events = [
    { event: "Non-Farm Payrolls", currency: "USD", impact: "high" as const },
    { event: "CPI (YoY)", currency: "USD", impact: "high" as const },
    { event: "Federal Reserve Interest Rate Decision", currency: "USD", impact: "high" as const },
    { event: "GDP (QoQ)", currency: "USD", impact: "high" as const },
    { event: "Unemployment Rate", currency: "USD", impact: "high" as const },
    { event: "Bank of England Rate Decision", currency: "GBP", impact: "high" as const },
    { event: "UK CPI (YoY)", currency: "GBP", impact: "high" as const },
    { event: "ECB Main Refinancing Rate", currency: "EUR", impact: "high" as const },
    { event: "Eurozone CPI (YoY)", currency: "EUR", impact: "medium" as const },
    { event: "German IFO Business Climate", currency: "EUR", impact: "medium" as const },
    { event: "Bank of Japan Rate Decision", currency: "JPY", impact: "high" as const },
    { event: "ISM Manufacturing PMI", currency: "USD", impact: "medium" as const },
    { event: "US Retail Sales (MoM)", currency: "USD", impact: "medium" as const },
    { event: "Initial Jobless Claims", currency: "USD", impact: "medium" as const },
    { event: "FOMC Meeting Minutes", currency: "USD", impact: "high" as const },
  ];

  return Array.from({ length: count }, (_, i) => {
    const template = events[Math.floor(rand() * events.length)];
    const daysFromNow = Math.floor(rand() * 60) - 5;
    const date = new Date(Date.now() + daysFromNow * 86400000);
    const hour = 8 + Math.floor(rand() * 10);

    return {
      id: `EVT${String(i + 1).padStart(4, "0")}`,
      date: date.toISOString().slice(0, 10),
      time: `${String(hour).padStart(2, "0")}:00`,
      event: template.event,
      country: template.currency,
      impact: template.impact,
      forecast: `${(rand() * 5).toFixed(1)}%`,
      previous: `${(rand() * 5).toFixed(1)}%`,
      actual: daysFromNow < 0 ? `${(rand() * 5).toFixed(1)}%` : undefined,
      isHoliday: false,
    };
  });
}
