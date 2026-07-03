import { create } from "zustand";
import { tickerAssets } from "@/data/markets";
import type { Asset, AssetClass, Timeframe } from "@/types/market";

interface MarketStore {
  assets: Asset[];
  selectedSymbol: string | null;
  selectedTimeframe: Timeframe;
  activeClass: AssetClass | "all";
  isLive: boolean;
  lastUpdated: string | null;

  setAssets: (assets: Asset[]) => void;
  updateAssetPrice: (symbol: string, price: number, changePercent: number) => void;
  setSelectedSymbol: (symbol: string | null) => void;
  setTimeframe: (timeframe: Timeframe) => void;
  setActiveClass: (assetClass: AssetClass | "all") => void;
  setLive: (live: boolean) => void;

  getByClass: (assetClass: AssetClass) => Asset[];
  getTopMovers: (limit?: number) => Asset[];
  search: (query: string) => Asset[];
}

export const useMarketStore = create<MarketStore>((set, get) => ({
  assets: tickerAssets as unknown as Asset[],
  selectedSymbol: null,
  selectedTimeframe: "1h",
  activeClass: "all",
  isLive: false,
  lastUpdated: null,

  setAssets: (assets) =>
    set({ assets, lastUpdated: new Date().toISOString() }),

  updateAssetPrice: (symbol, price, changePercent) =>
    set((state) => ({
      assets: state.assets.map((a) =>
        a.symbol === symbol
          ? { ...a, price, changePercent, updatedAt: new Date().toISOString() }
          : a
      ),
      lastUpdated: new Date().toISOString(),
    })),

  setSelectedSymbol: (selectedSymbol) => set({ selectedSymbol }),
  setTimeframe: (selectedTimeframe) => set({ selectedTimeframe }),
  setActiveClass: (activeClass) => set({ activeClass }),
  setLive: (isLive) => set({ isLive }),

  getByClass: (assetClass) =>
    get().assets.filter((a) => a.assetClass === assetClass),

  getTopMovers: (limit = 10) =>
    [...get().assets]
      .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
      .slice(0, limit),

  search: (query) => {
    const q = query.toLowerCase();
    return get().assets.filter(
      (a) =>
        a.symbol.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q)
    );
  },
}));
