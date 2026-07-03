export type AssetClass =
  | "forex"
  | "stock"
  | "commodity"
  | "index"
  | "etf"
  | "crypto";

export type MarketStatus = "open" | "closed" | "pre-market" | "after-hours";

export type Timeframe = "1m" | "5m" | "15m" | "1h" | "4h" | "1d" | "1w" | "1M";

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  assetClass: AssetClass;
  price: number;
  changeAmount: number;
  changePercent: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
  marketStatus: MarketStatus;
  currency: string;
}

export interface Candle {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  suffix?: string;
}

export interface NewsTeaser {
  id: string;
  title: string;
  category: string;
  publishedAt: string;
  readTime: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
