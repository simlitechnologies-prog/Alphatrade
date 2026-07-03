/**
 * Market data service — plug in any of:
 *   Alpha Vantage  · https://www.alphavantage.co
 *   Twelve Data    · https://twelvedata.com
 *   Finnhub        · https://finnhub.io
 *   Polygon.io     · https://polygon.io
 *   Yahoo Finance  · via rapid-api
 *
 * All functions return typed mock data until an API key is configured.
 * Set NEXT_PUBLIC_MARKET_DATA_PROVIDER and the matching API key in .env.local.
 */

import { tickerAssets } from "@/data/markets";
import type { Asset, Candle, Timeframe } from "@/types/market";

const PROVIDER = process.env.NEXT_PUBLIC_MARKET_DATA_PROVIDER ?? "mock";
const API_KEY  = process.env.NEXT_PUBLIC_MARKET_DATA_API_KEY  ?? "";

// Fetch latest quotes for a list of symbols
export async function fetchQuotes(symbols: string[]): Promise<Asset[]> {
  if (PROVIDER === "mock" || !API_KEY) {
    await new Promise((r) => setTimeout(r, 200));
    return tickerAssets.filter((a) => symbols.includes(a.symbol));
  }

  // Twelve Data example:
  // const joined = symbols.join(",");
  // const res = await fetch(`https://api.twelvedata.com/quote?symbol=${joined}&apikey=${API_KEY}`);
  // const data = await res.json();
  // return mapTwelveDataQuotes(data);

  // Finnhub example:
  // return Promise.all(symbols.map(async (sym) => {
  //   const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${sym}&token=${API_KEY}`);
  //   const q = await res.json();
  //   return mapFinnhubQuote(sym, q);
  // }));

  return tickerAssets.filter((a) => symbols.includes(a.symbol));
}

// Fetch a single asset's full details
export async function fetchAsset(symbol: string): Promise<Asset | null> {
  if (PROVIDER === "mock" || !API_KEY) {
    await new Promise((r) => setTimeout(r, 150));
    return tickerAssets.find((a) => a.symbol === symbol) ?? null;
  }
  const results = await fetchQuotes([symbol]);
  return results[0] ?? null;
}

// Fetch OHLCV candle data for charting
export async function fetchCandles(
  symbol: string,
  timeframe: Timeframe = "1h",
  limit = 200
): Promise<Candle[]> {
  if (PROVIDER === "mock" || !API_KEY) {
    return generateMockCandles(symbol, timeframe, limit);
  }

  // Twelve Data:
  // const res = await fetch(
  //   `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${timeframe}&outputsize=${limit}&apikey=${API_KEY}`
  // );
  // const data = await res.json();
  // return mapTwelveDataCandles(data.values ?? []);

  return generateMockCandles(symbol, timeframe, limit);
}

// Search instruments by query string
export async function searchAssets(query: string): Promise<Asset[]> {
  if (PROVIDER === "mock" || !API_KEY) {
    await new Promise((r) => setTimeout(r, 100));
    const q = query.toLowerCase();
    return tickerAssets.filter(
      (a) => a.symbol.toLowerCase().includes(q) || a.name.toLowerCase().includes(q)
    );
  }

  // Twelve Data:
  // const res = await fetch(`https://api.twelvedata.com/symbol_search?symbol=${query}&apikey=${API_KEY}`);
  // const data = await res.json();
  // return mapTwelveDataSearch(data.data ?? []);

  return [];
}

// ─── Mock candle generator ────────────────────────────────────────────────────

function generateMockCandles(symbol: string, timeframe: Timeframe, limit: number): Candle[] {
  const asset = tickerAssets.find((a) => a.symbol === symbol);
  const basePrice = asset?.price ?? 1.0;

  const msPerCandle: Record<Timeframe, number> = {
    "1m": 60_000, "5m": 300_000, "15m": 900_000,
    "1h": 3_600_000, "4h": 14_400_000, "1d": 86_400_000,
    "1w": 604_800_000, "1M": 2_592_000_000,
  };

  const candles: Candle[] = [];
  let price = basePrice;
  const now = Date.now();
  const interval = msPerCandle[timeframe];

  for (let i = limit; i >= 0; i--) {
    const open = price;
    const change = (Math.random() - 0.495) * basePrice * 0.008;
    const close = Math.max(open * 0.7, open + change);
    const high = Math.max(open, close) * (1 + Math.random() * 0.004);
    const low  = Math.min(open, close) * (1 - Math.random() * 0.004);
    const volume = Math.floor(Math.random() * 50_000 + 10_000);

    candles.push({ timestamp: now - i * interval, open, high, low, close, volume });
    price = close;
  }

  return candles;
}
