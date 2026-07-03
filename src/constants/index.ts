// ─── Countries ────────────────────────────────────────────────────────────────
export const COUNTRIES = [
  { code: "GH", name: "Ghana" }, { code: "NG", name: "Nigeria" },
  { code: "KE", name: "Kenya" }, { code: "ZA", name: "South Africa" },
  { code: "EG", name: "Egypt" }, { code: "MA", name: "Morocco" },
  { code: "TZ", name: "Tanzania" }, { code: "ET", name: "Ethiopia" },
  { code: "SN", name: "Senegal" }, { code: "CI", name: "Côte d'Ivoire" },
  { code: "GB", name: "United Kingdom" }, { code: "US", name: "United States" },
  { code: "DE", name: "Germany" }, { code: "FR", name: "France" },
  { code: "AE", name: "United Arab Emirates" }, { code: "IN", name: "India" },
  { code: "JP", name: "Japan" }, { code: "SG", name: "Singapore" },
  { code: "CA", name: "Canada" }, { code: "AU", name: "Australia" },
  { code: "BR", name: "Brazil" }, { code: "MX", name: "Mexico" },
  { code: "ZW", name: "Zimbabwe" }, { code: "RW", name: "Rwanda" },
] as const;

// ─── Currencies ───────────────────────────────────────────────────────────────
export const ACCOUNT_CURRENCIES = ["USD", "EUR", "GBP", "USDT"] as const;

// ─── Leverage options ─────────────────────────────────────────────────────────
export const LEVERAGE_OPTIONS = {
  forex:       [10, 20, 50, 100, 200, 500],
  stock:       [1, 2, 5, 10, 20],
  commodity:   [10, 20, 50, 100],
  index:       [10, 20, 50, 100],
  etf:         [1, 2, 5, 10],
  crypto:      [2, 5, 10, 20, 50],
} as const;

// ─── Order types ─────────────────────────────────────────────────────────────
export const ORDER_TYPES = [
  { value: "market",     label: "Market",      desc: "Execute at best available price" },
  { value: "limit",      label: "Limit",       desc: "Execute at your price or better" },
  { value: "stop",       label: "Stop",        desc: "Trigger a market order at a set price" },
  { value: "stop-limit", label: "Stop Limit",  desc: "Trigger a limit order at a set price" },
] as const;

// ─── Timeframes ───────────────────────────────────────────────────────────────
export const TIMEFRAMES = [
  { value: "1m",  label: "1m" },  { value: "5m",  label: "5m" },
  { value: "15m", label: "15m" }, { value: "1h",  label: "1H" },
  { value: "4h",  label: "4H" },  { value: "1d",  label: "1D" },
  { value: "1w",  label: "1W" },  { value: "1M",  label: "1M" },
] as const;

// ─── Payment methods ──────────────────────────────────────────────────────────
export const PAYMENT_METHODS = [
  { value: "card",          label: "Visa / Mastercard",        note: "Instant",                icon: "CreditCard" },
  { value: "bank_transfer", label: "Bank Transfer (SWIFT)",    note: "1–3 business days",      icon: "Building2" },
  { value: "bank_transfer", label: "Bank Transfer (Local)",    note: "Same day",               icon: "Building2" },
  { value: "crypto",        label: "Cryptocurrency (USDT/BTC)", note: "Under 1 hour",          icon: "Bitcoin" },
] as const;

// ─── KYC document types ───────────────────────────────────────────────────────
export const KYC_ID_TYPES = [
  { value: "passport",       label: "Passport" },
  { value: "national_id",    label: "National ID card" },
  { value: "drivers_license", label: "Driver's licence" },
] as const;

export const KYC_ADDRESS_TYPES = [
  { value: "utility_bill",    label: "Utility bill (< 3 months)" },
  { value: "bank_statement",  label: "Bank statement (< 3 months)" },
] as const;

// ─── Support categories ───────────────────────────────────────────────────────
export const SUPPORT_CATEGORIES = [
  { value: "deposit_withdrawal", label: "Deposit / Withdrawal" },
  { value: "kyc",                label: "KYC / Verification" },
  { value: "trading",            label: "Trading issue" },
  { value: "technical",          label: "Technical problem" },
  { value: "account",            label: "Account access" },
  { value: "other",              label: "Other" },
] as const;

// ─── Asset class labels ───────────────────────────────────────────────────────
export const ASSET_CLASS_LABELS: Record<string, string> = {
  forex: "Forex", stock: "Stocks", commodity: "Commodities",
  index: "Indices", etf: "ETFs", crypto: "Crypto",
};

export const ASSET_CLASS_COLORS: Record<string, string> = {
  forex: "#2563EB", stock: "#16A34A", commodity: "#F59E0B",
  index: "#8B5CF6", etf: "#06B6D4", crypto: "#F97316",
};

// ─── Status labels ────────────────────────────────────────────────────────────
export const USER_STATUS_LABELS: Record<string, string> = {
  active: "Active", suspended: "Suspended",
  pending_kyc: "Pending KYC", banned: "Banned", inactive: "Inactive",
};

export const KYC_STATUS_LABELS: Record<string, string> = {
  not_submitted: "Not submitted", pending: "Pending",
  approved: "Verified", rejected: "Rejected", needs_info: "Needs info",
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  open: "Open", pending: "Pending", filled: "Filled",
  cancelled: "Cancelled", expired: "Expired",
};

// ─── Routes ───────────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME: "/",
  MARKETS: "/markets",
  FOREX: "/forex",
  STOCKS: "/stocks",
  COMMODITIES: "/commodities",
  INDICES: "/indices",
  ETFS: "/etfs",
  CRYPTO: "/cryptocurrency",
  EDUCATION: "/education",
  PRICING: "/pricing",
  ABOUT: "/about",
  BLOG: "/blog",
  CONTACT: "/contact",
  FAQ: "/faq",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  // Dashboard
  DASHBOARD: "/dashboard",
  PORTFOLIO: "/portfolio",
  TRADE: "/trade",
  POSITIONS: "/positions",
  ORDERS: "/orders",
  WATCHLIST: "/watchlist",
  WALLET: "/wallet",
  HISTORY: "/history",
  DEPOSITS: "/deposits",
  WITHDRAWALS: "/withdrawals",
  CALENDAR: "/calendar",
  ALERTS: "/alerts",
  SETTINGS: "/settings",
  SUPPORT: "/support",
  // Admin
  ADMIN: "/admin-dashboard",
} as const;

// ─── Pagination ───────────────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;
