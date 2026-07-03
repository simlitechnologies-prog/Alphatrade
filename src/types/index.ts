// ─── Core enums ─────────────────────────────────────────────────────────────

export type AssetClass = "forex" | "stock" | "commodity" | "index" | "etf" | "crypto";
export type MarketStatus = "open" | "closed" | "pre-market" | "after-hours";
export type OrderType = "market" | "limit" | "stop" | "stop-limit" | "trailing-stop";
export type OrderDirection = "buy" | "sell";
export type OrderStatus = "open" | "pending" | "filled" | "cancelled" | "expired";
export type PositionStatus = "open" | "closed";
export type AccountTier = "starter" | "pro" | "elite";
export type UserStatus = "active" | "suspended" | "pending_kyc" | "banned" | "inactive";
export type KYCStatus = "not_submitted" | "pending" | "approved" | "rejected" | "needs_info";
export type TransactionType = "deposit" | "withdrawal" | "trade_profit" | "trade_loss" | "swap" | "commission" | "bonus" | "adjustment";
export type TransactionStatus = "pending" | "completed" | "failed" | "cancelled" | "reviewing";
export type AlertCondition = "above" | "below" | "percent_change";
export type TicketStatus = "open" | "pending" | "resolved" | "closed";
export type TicketPriority = "low" | "normal" | "high" | "urgent";
export type NotificationChannel = "email" | "push" | "sms";
export type AMLFlagSeverity = "low" | "medium" | "high" | "critical";
export type AMLFlagStatus = "open" | "under_review" | "resolved" | "escalated";
export type CalendarImpact = "low" | "medium" | "high";
export type VerificationDocType = "passport" | "national_id" | "drivers_license" | "utility_bill" | "bank_statement";
export type PaymentMethod = "bank_transfer" | "card" | "crypto" | "wire";

// ─── User & Auth ────────────────────────────────────────────────────────────

export interface User {
  id: string;
  uid: string; // Firebase UID
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber?: string;
  country: string;
  nationality?: string;
  dateOfBirth?: string;
  avatarUrl?: string;
  accountTier: AccountTier;
  status: UserStatus;
  kycStatus: KYCStatus;
  twoFactorEnabled: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  tradingExperience?: "beginner" | "intermediate" | "advanced" | "professional";
  annualIncome?: string;
  sourceOfFunds?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  referralCode?: string;
  referredBy?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  country: string;
  agreedToTerms: boolean;
  agreedToRisk: boolean;
}

export interface Session {
  id: string;
  userId: string;
  deviceName: string;
  ipAddress: string;
  location: string;
  userAgent: string;
  createdAt: string;
  lastActiveAt: string;
  isCurrent: boolean;
}

// ─── Market & Asset ─────────────────────────────────────────────────────────

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  assetClass: AssetClass;
  price: number;
  bid: number;
  ask: number;
  spread: number;
  changeAmount: number;
  changePercent: number;
  dayHigh: number;
  dayLow: number;
  weekHigh52?: number;
  weekLow52?: number;
  volume: number;
  marketCap?: number;
  marketStatus: MarketStatus;
  currency: string;
  exchange?: string;
  description?: string;
  sector?: string;
  country?: string;
  isin?: string;
  minLot: number;
  maxLot: number;
  lotStep: number;
  pipValue?: number;
  swapLong?: number;
  swapShort?: number;
  maxLeverage: number;
  updatedAt: string;
}

export interface Candle {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type Timeframe = "1m" | "5m" | "15m" | "1h" | "4h" | "1d" | "1w" | "1M";

// ─── Portfolio ───────────────────────────────────────────────────────────────

export interface Portfolio {
  userId: string;
  balance: number;
  equity: number;
  freeMargin: number;
  usedMargin: number;
  marginLevel: number;
  openPnL: number;
  openPnLPercent: number;
  realizedPnL: number;
  todayPnL: number;
  weeklyPnL: number;
  monthlyPnL: number;
  allTimePnL: number;
  depositTotal: number;
  withdrawalTotal: number;
  updatedAt: string;
}

export interface AssetAllocation {
  assetClass: AssetClass;
  value: number;
  percent: number;
  color: string;
}

export interface PerformanceStat {
  period: string;
  return: number;
  absolutePnL: number;
  winRate: number;
  totalTrades: number;
  avgWin: number;
  avgLoss: number;
  maxDrawdown: number;
  sharpeRatio?: number;
}

// ─── Orders & Positions ──────────────────────────────────────────────────────

export interface Order {
  id: string;
  userId: string;
  symbol: string;
  assetClass: AssetClass;
  type: OrderType;
  direction: OrderDirection;
  lots: number;
  price: number;
  stopLoss?: number;
  takeProfit?: number;
  trailingStop?: number;
  status: OrderStatus;
  filledPrice?: number;
  filledAt?: string;
  expiresAt?: string;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  id: string;
  userId: string;
  orderId: string;
  symbol: string;
  assetClass: AssetClass;
  direction: OrderDirection;
  lots: number;
  openPrice: number;
  currentPrice: number;
  closePrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  trailingStop?: number;
  pnl: number;
  pnlPercent: number;
  swap: number;
  commission: number;
  marginUsed: number;
  status: PositionStatus;
  openedAt: string;
  closedAt?: string;
  comment?: string;
}

export interface Trade {
  id: string;
  userId: string;
  positionId: string;
  symbol: string;
  assetClass: AssetClass;
  direction: OrderDirection;
  lots: number;
  openPrice: number;
  closePrice: number;
  pnl: number;
  pnlPercent: number;
  swap: number;
  commission: number;
  duration: number; // seconds
  openedAt: string;
  closedAt: string;
}

// ─── Wallet & Transactions ───────────────────────────────────────────────────

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  lockedBalance: number; // in margin
  availableBalance: number;
  pendingDeposits: number;
  pendingWithdrawals: number;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  method?: PaymentMethod;
  methodDetail?: string; // e.g. "ending ···4821"
  reference: string;
  description?: string;
  positionId?: string; // for trade P&L transactions
  createdAt: string;
  processedAt?: string;
  failureReason?: string;
}

export interface DepositRequest {
  amount: number;
  currency: string;
  method: PaymentMethod;
  returnUrl?: string;
}

export interface WithdrawalRequest {
  amount: number;
  currency: string;
  method: PaymentMethod;
  accountDetail: string;
  twoFactorCode?: string;
}

// ─── Watchlist ───────────────────────────────────────────────────────────────

export interface WatchlistItem {
  id: string;
  userId: string;
  symbol: string;
  name: string;
  assetClass: AssetClass;
  price: number;
  changePercent: number;
  alertPrice?: number;
  alertCondition?: AlertCondition;
  notes?: string;
  addedAt: string;
}

export interface Watchlist {
  id: string;
  userId: string;
  name: string;
  items: WatchlistItem[];
  createdAt: string;
  updatedAt: string;
}

// ─── Alerts ──────────────────────────────────────────────────────────────────

export interface PriceAlert {
  id: string;
  userId: string;
  symbol: string;
  condition: AlertCondition;
  targetPrice: number;
  currentPrice: number;
  percentageValue?: number;
  isActive: boolean;
  isTriggered: boolean;
  triggeredAt?: string;
  channels: NotificationChannel[];
  note?: string;
  createdAt: string;
}

// ─── Notifications ────────────────────────────────────────────────────────────

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: "trade" | "alert" | "account" | "news" | "system" | "promo";
  isRead: boolean;
  actionUrl?: string;
  iconType?: string;
  createdAt: string;
  readAt?: string;
}

// ─── News ────────────────────────────────────────────────────────────────────

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  tags: string[];
  impact: "low" | "medium" | "high";
  author: string;
  publishedAt: string;
  updatedAt: string;
  imageUrl?: string;
  relatedSymbols: string[];
  viewCount: number;
  isBookmarked?: boolean;
}

// ─── Economic Calendar ────────────────────────────────────────────────────────

export interface CalendarEvent {
  id: string;
  date: string;
  time: string;
  event: string;
  country: string;
  currency: string;
  impact: CalendarImpact;
  forecast?: string;
  previous?: string;
  actual?: string;
  description?: string;
  isHoliday: boolean;
}

// ─── KYC & Compliance ─────────────────────────────────────────────────────────

export interface KYCDocument {
  id: string;
  userId: string;
  type: VerificationDocType;
  status: KYCStatus;
  fileUrl: string;
  thumbnailUrl?: string;
  uploadedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  expiryDate?: string;
}

export interface KYCApplication {
  id: string;
  userId: string;
  userName: string;
  email: string;
  country: string;
  nationality: string;
  dateOfBirth: string;
  idType: VerificationDocType;
  idNumber?: string;
  idExpiry?: string;
  idDocument?: KYCDocument;
  addressDocument?: KYCDocument;
  selfie?: KYCDocument;
  sourceOfFunds?: string;
  annualIncome?: string;
  tradingExperience?: string;
  status: KYCStatus;
  riskLevel: "low" | "medium" | "high";
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

export interface AMLFlag {
  id: string;
  userId: string;
  userName: string;
  flagType: string;
  description: string;
  transactionIds: string[];
  severity: AMLFlagSeverity;
  status: AMLFlagStatus;
  assignedTo?: string;
  investigationNotes?: string;
  sarFiled?: boolean;
  sarFiledAt?: string;
  createdAt: string;
  resolvedAt?: string;
}

// ─── Support ──────────────────────────────────────────────────────────────────

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  email: string;
  subject: string;
  category: "deposit_withdrawal" | "kyc" | "trading" | "technical" | "account" | "other";
  body: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignedTo?: string;
  messages: TicketMessage[];
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  authorId: string;
  authorName: string;
  isStaff: boolean;
  body: string;
  attachments?: string[];
  createdAt: string;
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export interface Admin {
  id: string;
  uid: string;
  name: string;
  email: string;
  role: AdminRole;
  status: "active" | "inactive" | "suspended";
  twoFactorEnabled: boolean;
  permissions: string[];
  createdAt: string;
  lastLoginAt?: string;
  createdBy?: string;
}

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PlatformSettings {
  id: string;
  platformName: string;
  supportEmail: string;
  complianceEmail: string;
  defaultCurrency: string;
  sessionTimeoutMinutes: number;
  minDeposit: number;
  minWithdrawal: number;
  maxDailyWithdrawal: number;
  largeWithdrawalThreshold: number;
  defaultSpreadMarkup: number;
  requireTwoFactorForAdmins: boolean;
  kycRequired: boolean;
  maintenanceMode: boolean;
  maintenanceMessage?: string;
  updatedAt: string;
  updatedBy: string;
}

// ─── API response wrappers ───────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
  timestamp: string;
}

// ─── Form schemas (paired with Zod in forms/) ────────────────────────────────

export interface TradeFormValues {
  symbol: string;
  direction: OrderDirection;
  orderType: OrderType;
  lots: number;
  limitPrice?: number;
  stopPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  trailingStop?: number;
  leverage: number;
  comment?: string;
}

export interface DepositFormValues {
  amount: number;
  method: PaymentMethod;
}

export interface WithdrawalFormValues {
  amount: number;
  method: PaymentMethod;
  accountDetail: string;
  twoFactorCode: string;
}

export interface AlertFormValues {
  symbol: string;
  condition: AlertCondition;
  targetPrice: number;
  channels: NotificationChannel[];
  note?: string;
}

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  country: string;
}

export interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
