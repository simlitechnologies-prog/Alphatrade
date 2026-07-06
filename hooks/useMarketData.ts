import { useState, useEffect, useCallback } from "react";
import {
  fetchQuotes,
  fetchCandles,
  searchAssets,
} from "@/services/marketData.service";
import type { Asset, Candle } from "@/types/market";

export function useMarketData(symbols: string[], refreshInterval?: number) {
  const [data, setData] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!symbols.length) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const quotes = await fetchQuotes(symbols);
      setData(quotes);
    } catch (err: any) {
      setError(err.message || "Failed to fetch market data");
    } finally {
      setLoading(false);
    }
  }, [symbols]);

  useEffect(() => {
    fetchData();

    if (refreshInterval) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
}

export function useCandles(
  symbol: string,
  timeframe: string = "1h",
  limit: number = 100,
) {
  const [data, setData] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!symbol) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const candles = await fetchCandles(symbol, timeframe as any, limit);
      setData(candles);
    } catch (err: any) {
      setError(err.message || "Failed to fetch candle data");
    } finally {
      setLoading(false);
    }
  }, [symbol, timeframe, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export function useSearchAssets() {
  const [results, setResults] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const assets = await searchAssets(query);
      setResults(assets);
    } catch (err: any) {
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, search };
}
