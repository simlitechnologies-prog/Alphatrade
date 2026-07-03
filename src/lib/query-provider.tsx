"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export const QUERY_KEYS = {
  // Market data
  QUOTES: (symbols: string[]) => ["quotes", ...symbols] as const,
  ASSET: (symbol: string) => ["asset", symbol] as const,
  CANDLES: (symbol: string, timeframe: string) => ["candles", symbol, timeframe] as const,
  TOP_MOVERS: ["top-movers"] as const,
  SEARCH: (query: string) => ["search", query] as const,

  // Portfolio
  PORTFOLIO: (userId: string) => ["portfolio", userId] as const,
  POSITIONS: (userId: string) => ["positions", userId] as const,
  ORDERS: (userId: string) => ["orders", userId] as const,
  TRADE_HISTORY: (userId: string) => ["trade-history", userId] as const,
  WATCHLIST: (userId: string) => ["watchlist", userId] as const,

  // Finance
  WALLET: (userId: string) => ["wallet", userId] as const,
  TRANSACTIONS: (userId: string) => ["transactions", userId] as const,
  BALANCE: (userId: string) => ["balance", userId] as const,

  // Content
  NEWS: ["news"] as const,
  NEWS_ARTICLE: (id: string) => ["news", id] as const,
  CALENDAR_EVENTS: ["calendar-events"] as const,
  ALERTS: (userId: string) => ["alerts", userId] as const,
  NOTIFICATIONS: (userId: string) => ["notifications", userId] as const,
} as const;

export const STALE_TIMES = {
  LIVE_PRICES: 5_000,       // 5s — market quotes
  PORTFOLIO: 15_000,         // 15s — positions/orders
  NEWS: 5 * 60_000,          // 5min — news articles
  CALENDAR: 30 * 60_000,     // 30min — economic calendar
  USER_PROFILE: 60 * 60_000, // 1hr — profile data
} as const;

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: STALE_TIMES.PORTFOLIO,
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
