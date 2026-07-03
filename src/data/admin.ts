export interface AdminUser {
  id: string;
  name: string;
  email: string;
  country: string;
  accountTier: "starter" | "pro" | "elite";
  status: "active" | "suspended" | "pending_kyc" | "banned";
  kycStatus: "verified" | "pending" | "rejected" | "not_submitted";
  balance: number;
  joinedAt: string;
  lastLogin: string;
}

export interface AdminTrade {
  id: string;
  userId: string;
  userName: string;
  symbol: string;
  direction: "buy" | "sell";
  lots: number;
  openPrice: number;
  closePrice?: number;
  pnl?: number;
  status: "open" | "closed";
  openedAt: string;
  closedAt?: string;
}

export interface AdminDeposit {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  method: string;
  status: "completed" | "pending" | "failed" | "reviewing";
  createdAt: string;
  reference: string;
}

export interface KYCApplication {
  id: string;
  userId: string;
  userName: string;
  email: string;
  country: string;
  submittedAt: string;
  idType: string;
  status: "pending" | "approved" | "rejected" | "needs_info";
  risk: "low" | "medium" | "high";
}

export interface AMLFlag {
  id: string;
  userId: string;
  userName: string;
  flagType: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "under_review" | "resolved" | "escalated";
  createdAt: string;
}

export interface SupportTicketAdmin {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  category: string;
  status: "open" | "pending" | "resolved" | "closed";
  priority: "low" | "normal" | "high" | "urgent";
  createdAt: string;
  assignedTo?: string;
}

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

export const adminStats = {
  totalUsers: 2148234,
  activeToday: 84312,
  newThisWeek: 4821,
  totalDeposited: 48_200_000_000,
  totalWithdrawn: 36_100_000_000,
  openPositions: 184291,
  openOrders: 62841,
  pendingKYC: 312,
  pendingWithdrawals: 48,
  openTickets: 127,
  amlFlags: 14,
  dailyVolume: 1_840_000_000,
};

export const adminUsers: AdminUser[] = [
  { id: "u001", name: "Kwame Mensah", email: "kwame.mensah@example.com", country: "Ghana", accountTier: "pro", status: "active", kycStatus: "verified", balance: 128940.55, joinedAt: "2025-01-15", lastLogin: "2026-06-30" },
  { id: "u002", name: "Amara Okafor", email: "amara.okafor@example.com", country: "Nigeria", accountTier: "starter", status: "active", kycStatus: "verified", balance: 4320.00, joinedAt: "2025-03-22", lastLogin: "2026-06-29" },
  { id: "u003", name: "Fatima Al-Rashid", email: "fatima.alrashid@example.com", country: "UAE", accountTier: "elite", status: "active", kycStatus: "verified", balance: 892400.00, joinedAt: "2024-11-08", lastLogin: "2026-06-30" },
  { id: "u004", name: "James Thornton", email: "j.thornton@example.com", country: "UK", accountTier: "pro", status: "suspended", kycStatus: "verified", balance: 22100.00, joinedAt: "2025-05-10", lastLogin: "2026-06-20" },
  { id: "u005", name: "Priya Sharma", email: "priya.sharma@example.com", country: "India", accountTier: "starter", status: "pending_kyc", kycStatus: "pending", balance: 0, joinedAt: "2026-06-28", lastLogin: "2026-06-28" },
  { id: "u006", name: "Carlos Mendez", email: "c.mendez@example.com", country: "Mexico", accountTier: "starter", status: "active", kycStatus: "verified", balance: 8750.00, joinedAt: "2025-08-14", lastLogin: "2026-06-30" },
  { id: "u007", name: "Yuki Tanaka", email: "yuki.tanaka@example.com", country: "Japan", accountTier: "elite", status: "active", kycStatus: "verified", balance: 540200.00, joinedAt: "2024-09-02", lastLogin: "2026-06-29" },
  { id: "u008", name: "Daniel Mensah", email: "d.mensah@example.com", country: "Ghana", accountTier: "pro", status: "active", kycStatus: "verified", balance: 34800.00, joinedAt: "2025-02-18", lastLogin: "2026-06-30" },
  { id: "u009", name: "Sophie Laurent", email: "sophie.laurent@example.com", country: "France", accountTier: "starter", status: "active", kycStatus: "not_submitted", balance: 500.00, joinedAt: "2026-06-25", lastLogin: "2026-06-26" },
  { id: "u010", name: "Ahmed Hassan", email: "ahmed.hassan@example.com", country: "Egypt", accountTier: "pro", status: "active", kycStatus: "verified", balance: 67200.00, joinedAt: "2025-04-11", lastLogin: "2026-06-30" },
];

export const adminTrades: AdminTrade[] = [
  { id: "tr001", userId: "u001", userName: "Kwame Mensah", symbol: "EUR/USD", direction: "buy", lots: 2.0, openPrice: 1.0812, closePrice: undefined, pnl: undefined, status: "open", openedAt: "2026-06-30T08:14:22Z" },
  { id: "tr002", userId: "u003", userName: "Fatima Al-Rashid", symbol: "XAU/USD", direction: "buy", lots: 5.0, openPrice: 2340.20, closePrice: undefined, pnl: undefined, status: "open", openedAt: "2026-06-29T11:30:00Z" },
  { id: "tr003", userId: "u007", userName: "Yuki Tanaka", symbol: "USD/JPY", direction: "sell", lots: 10.0, openPrice: 158.40, closePrice: 157.82, pnl: 4800, status: "closed", openedAt: "2026-06-28T09:00:00Z", closedAt: "2026-06-30T10:00:00Z" },
  { id: "tr004", userId: "u008", userName: "Daniel Mensah", symbol: "TSLA", direction: "buy", lots: 20, openPrice: 241.00, closePrice: 248.12, pnl: 142.40, status: "closed", openedAt: "2026-06-29T14:00:00Z", closedAt: "2026-06-30T09:30:00Z" },
  { id: "tr005", userId: "u002", userName: "Amara Okafor", symbol: "BTC/USD", direction: "buy", lots: 0.1, openPrice: 65000.00, closePrice: undefined, pnl: undefined, status: "open", openedAt: "2026-06-30T07:20:00Z" },
];

export const adminDeposits: AdminDeposit[] = [
  { id: "d001", userId: "u001", userName: "Kwame Mensah", amount: 5000, currency: "USD", method: "Bank transfer", status: "completed", createdAt: "2026-06-25", reference: "DEP-2026-0089" },
  { id: "d002", userId: "u003", userName: "Fatima Al-Rashid", amount: 50000, currency: "USD", method: "Wire transfer", status: "completed", createdAt: "2026-06-24", reference: "DEP-2026-0088" },
  { id: "d003", userId: "u005", userName: "Priya Sharma", amount: 1000, currency: "USD", method: "Card", status: "reviewing", createdAt: "2026-06-29", reference: "DEP-2026-0091" },
  { id: "d004", userId: "u006", userName: "Carlos Mendez", amount: 2500, currency: "USD", method: "Crypto (USDT)", status: "pending", createdAt: "2026-06-30", reference: "DEP-2026-0092" },
  { id: "d005", userId: "u010", userName: "Ahmed Hassan", amount: 15000, currency: "USD", method: "Bank transfer", status: "completed", createdAt: "2026-06-22", reference: "DEP-2026-0084" },
];

export const kycQueue: KYCApplication[] = [
  { id: "k001", userId: "u005", userName: "Priya Sharma", email: "priya.sharma@example.com", country: "India", submittedAt: "2026-06-28", idType: "Passport", status: "pending", risk: "low" },
  { id: "k002", userId: "u011", userName: "Marcus Webb", email: "marcus.webb@example.com", country: "South Africa", submittedAt: "2026-06-27", idType: "National ID", status: "pending", risk: "medium" },
  { id: "k003", userId: "u012", userName: "Li Wei", email: "li.wei@example.com", country: "China", submittedAt: "2026-06-26", idType: "Passport", status: "needs_info", risk: "high" },
  { id: "k004", userId: "u013", userName: "Anna Kowalski", email: "a.kowalski@example.com", country: "Poland", submittedAt: "2026-06-25", idType: "National ID", status: "pending", risk: "low" },
  { id: "k005", userId: "u014", userName: "Roberto Silva", email: "r.silva@example.com", country: "Brazil", submittedAt: "2026-06-24", idType: "Passport", status: "pending", risk: "medium" },
];

export const amlFlags: AMLFlag[] = [
  { id: "aml001", userId: "u004", userName: "James Thornton", flagType: "Structuring", description: "Multiple deposits just below reporting threshold (£9,800–£9,950) over 7 days.", severity: "high", status: "under_review", createdAt: "2026-06-28" },
  { id: "aml002", userId: "u012", userName: "Li Wei", flagType: "Unusual source of funds", description: "Single deposit of $180,000 from unknown third-party account.", severity: "critical", status: "escalated", createdAt: "2026-06-27" },
  { id: "aml003", userId: "u015", userName: "Viktor Petrov", flagType: "High-risk jurisdiction", description: "Account access from sanctioned jurisdiction detected.", severity: "critical", status: "open", createdAt: "2026-06-30" },
  { id: "aml004", userId: "u006", userName: "Carlos Mendez", flagType: "Rapid fund cycling", description: "Funds deposited and withdrawn within 2 hours without trading activity.", severity: "medium", status: "open", createdAt: "2026-06-29" },
];

export const adminTickets: SupportTicketAdmin[] = [
  { id: "TKT-0127", userId: "u001", userName: "Kwame Mensah", subject: "Withdrawal not processed after 3 days", category: "Withdrawal", status: "open", priority: "high", createdAt: "2026-06-28", assignedTo: "Sarah J." },
  { id: "TKT-0126", userId: "u005", userName: "Priya Sharma", subject: "KYC document rejected — need guidance", category: "KYC", status: "open", priority: "normal", createdAt: "2026-06-29" },
  { id: "TKT-0125", userId: "u002", userName: "Amara Okafor", subject: "Platform login issue on mobile app", category: "Technical", status: "pending", priority: "normal", createdAt: "2026-06-27", assignedTo: "Mike T." },
  { id: "TKT-0124", userId: "u008", userName: "Daniel Mensah", subject: "Stop-loss not triggered as expected", category: "Trading", status: "resolved", priority: "high", createdAt: "2026-06-25", assignedTo: "Sarah J." },
  { id: "TKT-0123", userId: "u010", userName: "Ahmed Hassan", subject: "Cannot update bank account details", category: "Account", status: "open", priority: "urgent", createdAt: "2026-06-30" },
];

export const adminRoles: AdminRole[] = [
  { id: "r1", name: "Super Admin", description: "Full platform access with destructive capabilities.", permissions: ["all"], userCount: 2 },
  { id: "r2", name: "Compliance Officer", description: "KYC, AML, and regulatory oversight.", permissions: ["kyc.read", "kyc.approve", "kyc.reject", "aml.read", "aml.flag", "users.read"], userCount: 3 },
  { id: "r3", name: "Support Agent", description: "Handle customer support tickets.", permissions: ["tickets.read", "tickets.reply", "tickets.close", "users.read"], userCount: 8 },
  { id: "r4", name: "Finance Manager", description: "Approve deposits, withdrawals and reconciliation.", permissions: ["deposits.read", "deposits.approve", "withdrawals.read", "withdrawals.approve", "reports.read"], userCount: 2 },
  { id: "r5", name: "Content Manager", description: "Manage news, education and public content.", permissions: ["news.read", "news.write", "news.publish"], userCount: 3 },
];

export const analyticsData = {
  userGrowth: [
    { month: "Jan", users: 1820000 }, { month: "Feb", users: 1890000 },
    { month: "Mar", users: 1960000 }, { month: "Apr", users: 2010000 },
    { month: "May", users: 2080000 }, { month: "Jun", users: 2148234 },
  ],
  dailyVolume: [
    { day: "Mon", volume: 1620 }, { day: "Tue", volume: 1840 },
    { day: "Wed", volume: 2100 }, { day: "Thu", volume: 1950 },
    { day: "Fri", volume: 1840 },
  ],
  revenueByMonth: [
    { month: "Jan", revenue: 2100000 }, { month: "Feb", revenue: 2400000 },
    { month: "Mar", revenue: 1980000 }, { month: "Apr", revenue: 2750000 },
    { month: "May", revenue: 3100000 }, { month: "Jun", revenue: 3480000 },
  ],
  topCountries: [
    { country: "Nigeria", users: 284000, pct: 13.2 },
    { country: "Ghana", users: 198000, pct: 9.2 },
    { country: "United Kingdom", users: 176000, pct: 8.2 },
    { country: "UAE", users: 142000, pct: 6.6 },
    { country: "India", users: 138000, pct: 6.4 },
  ],
};
