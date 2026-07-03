import { useQuery } from "@tanstack/react-query";
import { fetchQuotes, fetchAsset, fetchCandles, searchAssets } from "@/services/market.service";
import { QUERY_KEYS, STALE_TIMES } from "@/lib/query-provider";
import type { Timeframe } from "@/types/market";

// Fetch live quotes for multiple symbols
export function useQuotes(symbols: string[]) {
  return useQuery({
    queryKey: QUERY_KEYS.QUOTES(symbols),
    queryFn: () => fetchQuotes(symbols),
    staleTime: STALE_TIMES.LIVE_PRICES,
    refetchInterval: STALE_TIMES.LIVE_PRICES,
    enabled: symbols.length > 0,
  });
}

// Fetch a single asset
export function useAsset(symbol: string) {
  return useQuery({
    queryKey: QUERY_KEYS.ASSET(symbol),
    queryFn: () => fetchAsset(symbol),
    staleTime: STALE_TIMES.LIVE_PRICES,
    refetchInterval: STALE_TIMES.LIVE_PRICES,
    enabled: !!symbol,
  });
}

// Fetch OHLCV candles
export function useCandles(symbol: string, timeframe: Timeframe = "1h", limit = 200) {
  return useQuery({
    queryKey: QUERY_KEYS.CANDLES(symbol, timeframe),
    queryFn: () => fetchCandles(symbol, timeframe, limit),
    staleTime: STALE_TIMES.LIVE_PRICES,
    refetchInterval: STALE_TIMES.LIVE_PRICES,
    enabled: !!symbol,
  });
}

// Search instruments
export function useAssetSearch(query: string) {
  return useQuery({
    queryKey: QUERY_KEYS.SEARCH(query),
    queryFn: () => searchAssets(query),
    staleTime: 30_000,
    enabled: query.trim().length > 0,
  });
}
