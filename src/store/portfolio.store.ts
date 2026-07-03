import { create } from "zustand";
import {
  portfolioStats, openPositions, pendingOrders,
  watchlistItems, transactions,
} from "@/data/dashboard";

interface PortfolioStore {
  balance: number;
  equity: number;
  freeMargin: number;
  usedMargin: number;
  openPnL: number;
  todayPnL: number;
  positions: typeof openPositions;
  orders: typeof pendingOrders;
  watchlist: typeof watchlistItems;
  transactions: typeof transactions;

  setBalance: (balance: number) => void;
  addPosition: (position: (typeof openPositions)[0]) => void;
  removePosition: (id: string) => void;
  updatePositionPrice: (symbol: string, price: number) => void;
  addOrder: (order: (typeof pendingOrders)[0]) => void;
  removeOrder: (id: string) => void;
  addToWatchlist: (item: (typeof watchlistItems)[0]) => void;
  removeFromWatchlist: (id: string) => void;
  addTransaction: (tx: (typeof transactions)[0]) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  balance: portfolioStats.balance,
  equity: portfolioStats.equity,
  freeMargin: portfolioStats.freeMargin,
  usedMargin: portfolioStats.usedMargin,
  openPnL: portfolioStats.openPnL,
  todayPnL: portfolioStats.todayPnL,
  positions: openPositions,
  orders: pendingOrders,
  watchlist: watchlistItems,
  transactions,

  setBalance: (balance) => set({ balance }),

  addPosition: (position) =>
    set((state) => ({ positions: [...state.positions, position] })),

  removePosition: (id) =>
    set((state) => ({
      positions: state.positions.filter((p) => p.id !== id),
    })),

  updatePositionPrice: (symbol, price) =>
    set((state) => ({
      positions: state.positions.map((p) =>
        p.symbol === symbol
          ? {
              ...p,
              currentPrice: price,
              pnl:
                p.direction === "buy"
                  ? (price - p.openPrice) * p.lots * 100
                  : (p.openPrice - price) * p.lots * 100,
            }
          : p
      ),
    })),

  addOrder: (order) =>
    set((state) => ({ orders: [...state.orders, order] })),

  removeOrder: (id) =>
    set((state) => ({ orders: state.orders.filter((o) => o.id !== id) })),

  addToWatchlist: (item) =>
    set((state) => ({ watchlist: [...state.watchlist, item] })),

  removeFromWatchlist: (id) =>
    set((state) => ({
      watchlist: state.watchlist.filter((w) => w.id !== id),
    })),

  addTransaction: (tx) =>
    set((state) => ({ transactions: [tx, ...state.transactions] })),
}));
