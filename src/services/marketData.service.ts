// services/marketData.service.ts

import { tickerAssets } from "@/data/markets";
import type { Asset, Candle, Timeframe } from "@/types/market";

// ─── Type Definitions ────────────────────────────────────────────────────

interface TwelveDataQuote {
  symbol: string;
  name?: string;
  price: string;
  percent_change: string;
  high: string;
  low: string;
  volume: string;
}

interface TwelveDataCandle {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

interface TwelveDataSearchResult {
  symbol: string;
  name: string;
  type?: string;
}

interface FinnhubQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High
  l: number; // Low
  o: number; // Open
  pc: number; // Previous close
}

interface FinnhubCandleData {
  s: string; // Status
  t: number[]; // Timestamps
  o: number[]; // Opens
  h: number[]; // Highs
  l: number[]; // Lows
  c: number[]; // Closes
  v: number[]; // Volumes
}

interface FinnhubSearchResult {
  symbol: string;
  description: string;
  type: string;
}

interface AlphaVantageQuote {
  "Global Quote"?: {
    "05. price": string;
    "10. change percent": string;
    "03. high": string;
    "04. low": string;
    "02. open": string;
    "08. previous close": string;
  };
}

interface AlphaVantageCandleValues {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

interface PolygonQuote {
  results?: Array<{
    c: number; // Close
    o: number; // Open
    h: number; // High
    l: number; // Low
    v: number; // Volume
  }>;
}

interface PolygonCandle {
  t: number; // Timestamp
  o: number; // Open
  h: number; // High
  l: number; // Low
  c: number; // Close
  v: number; // Volume
}

// ─── Configuration ───────────────────────────────────────────────────────

const PROVIDER = process.env.NEXT_PUBLIC_MARKET_DATA_PROVIDER ?? "mock";
const API_KEY = process.env.NEXT_PUBLIC_MARKET_DATA_API_KEY ?? "";

// ─── Main API Functions ────────────────────────────────────────────────────

// Fetch latest quotes for a list of symbols
export async function fetchQuotes(symbols: string[]): Promise<Asset[]> {
  if (PROVIDER === "mock" || !API_KEY) {
    await new Promise((r) => setTimeout(r, 200));
    return tickerAssets.filter((a) => symbols.includes(a.symbol));
  }

  try {
    switch (PROVIDER) {
      case "twelvedata":
        return await fetchTwelveDataQuotes(symbols);
      case "finnhub":
        return await fetchFinnhubQuotes(symbols);
      case "alphavantage":
        return await fetchAlphaVantageQuotes(symbols);
      case "polygon":
        return await fetchPolygonQuotes(symbols);
      default:
        console.warn(`Unknown provider: ${PROVIDER}, falling back to mock`);
        return tickerAssets.filter((a) => symbols.includes(a.symbol));
    }
  } catch (error) {
    console.error(`Error fetching quotes from ${PROVIDER}:`, error);
    return tickerAssets.filter((a) => symbols.includes(a.symbol));
  }
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
  limit = 200,
): Promise<Candle[]> {
  if (PROVIDER === "mock" || !API_KEY) {
    return generateMockCandles(symbol, timeframe, limit);
  }

  try {
    switch (PROVIDER) {
      case "twelvedata":
        return await fetchTwelveDataCandles(symbol, timeframe, limit);
      case "finnhub":
        return await fetchFinnhubCandles(symbol, timeframe, limit);
      case "alphavantage":
        return await fetchAlphaVantageCandles(symbol, timeframe, limit);
      case "polygon":
        return await fetchPolygonCandles(symbol, timeframe, limit);
      default:
        return generateMockCandles(symbol, timeframe, limit);
    }
  } catch (error) {
    console.error(`Error fetching candles from ${PROVIDER}:`, error);
    return generateMockCandles(symbol, timeframe, limit);
  }
}

// Search instruments by query string
export async function searchAssets(query: string): Promise<Asset[]> {
  if (PROVIDER === "mock" || !API_KEY) {
    await new Promise((r) => setTimeout(r, 100));
    const q = query.toLowerCase();
    return tickerAssets.filter(
      (a) =>
        a.symbol.toLowerCase().includes(q) || a.name.toLowerCase().includes(q),
    );
  }

  try {
    switch (PROVIDER) {
      case "twelvedata":
        return await searchTwelveData(query);
      case "finnhub":
        return await searchFinnhub(query);
      case "alphavantage":
        return await searchAlphaVantage(query);
      default:
        return [];
    }
  } catch (error) {
    console.error(`Error searching from ${PROVIDER}:`, error);
    return [];
  }
}

// ─── Provider Implementations ─────────────────────────────────────────────

// 1. TWELVE DATA
async function fetchTwelveDataQuotes(symbols: string[]): Promise<Asset[]> {
  const joined = symbols.join(",");
  const url = `https://api.twelvedata.com/quote?symbol=${joined}&apikey=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Twelve Data API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    return [mapTwelveDataQuote(data)];
  }

  return data.map(mapTwelveDataQuote);
}

function mapTwelveDataQuote(data: TwelveDataQuote): Asset {
  const asset = tickerAssets.find((a) => a.symbol === data.symbol);
  const price = parseFloat(data.price) || 0;
  const changePercent = parseFloat(data.percent_change) || 0;

  return {
    id: data.symbol,
    symbol: data.symbol,
    name: asset?.name || data.name || data.symbol,
    price: price,
    changePercent: changePercent,
    changeAmount: (price * changePercent) / 100,
    assetClass: asset?.assetClass || "forex",
    dayHigh: parseFloat(data.high) || 0,
    dayLow: parseFloat(data.low) || 0,
    volume: parseFloat(data.volume) || 0,
    marketStatus: "open",
    currency: "EUR",
  };
}

async function fetchTwelveDataCandles(
  symbol: string,
  timeframe: Timeframe,
  limit: number,
): Promise<Candle[]> {
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${timeframe}&outputsize=${limit}&apikey=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Twelve Data API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.values || !Array.isArray(data.values)) {
    return [];
  }

  return data.values.map((candle: TwelveDataCandle) => ({
    timestamp: new Date(candle.datetime).getTime(),
    open: parseFloat(candle.open),
    high: parseFloat(candle.high),
    low: parseFloat(candle.low),
    close: parseFloat(candle.close),
    volume: parseFloat(candle.volume),
  }));
}

async function searchTwelveData(query: string): Promise<Asset[]> {
  const url = `https://api.twelvedata.com/symbol_search?symbol=${encodeURIComponent(query)}&apikey=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Twelve Data API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.data || !Array.isArray(data.data)) {
    return [];
  }

  return data.data.map((item: TwelveDataSearchResult) => ({
    id: item.symbol,
    symbol: item.symbol,
    name: item.name || item.symbol,
    price: 0,
    changePercent: 0,
    changeAmount: 0,
    assetClass: (item.type || "stock").toLowerCase(),
    dayHigh: 0,
    dayLow: 0,
    volume: 0,
    marketStatus: "closed",
    currency: "EUR",
  }));
}

// 2. FINNHUB
async function fetchFinnhubQuotes(symbols: string[]): Promise<Asset[]> {
  const promises = symbols.map(async (symbol) => {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Finnhub API error for ${symbol}: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return mapFinnhubQuote(symbol, data);
  });

  return Promise.all(promises);
}

function mapFinnhubQuote(symbol: string, data: FinnhubQuote): Asset {
  const asset = tickerAssets.find((a) => a.symbol === symbol);
  const currentPrice = data.c || 0;
  const changePercent = data.dp || 0;

  return {
    id: symbol,
    symbol,
    name: asset?.name || symbol,
    price: currentPrice,
    changePercent,
    changeAmount: (currentPrice * changePercent) / 100,
    assetClass: asset?.assetClass || "stock",
    dayHigh: data.h || 0,
    dayLow: data.l || 0,
    open: data.o || 0,
    previousClose: data.pc || 0,
    volume: 0,
    marketStatus: "open",
    currency: "EUR",
  };
}

async function fetchFinnhubCandles(
  symbol: string,
  timeframe: Timeframe,
  limit: number,
): Promise<Candle[]> {
  const resolutionMap: Record<Timeframe, string> = {
    "1m": "1",
    "5m": "5",
    "15m": "15",
    "1h": "60",
    "4h": "240",
    "1d": "D",
    "1w": "W",
    "1M": "M",
  };

  const resolution = resolutionMap[timeframe] || "D";
  const to = Math.floor(Date.now() / 1000);
  const from = to - limit * 86400;

  const url = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Finnhub API error: ${response.statusText}`);
  }

  const data: FinnhubCandleData = await response.json();

  if (data.s === "no_data" || !data.t) {
    return [];
  }

  return data.t.map((timestamp: number, index: number) => ({
    timestamp: timestamp * 1000,
    open: data.o[index],
    high: data.h[index],
    low: data.l[index],
    close: data.c[index],
    volume: data.v[index],
  }));
}

async function searchFinnhub(query: string): Promise<Asset[]> {
  const url = `https://finnhub.io/api/v1/search?q=${encodeURIComponent(query)}&token=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Finnhub API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.result || !Array.isArray(data.result)) {
    return [];
  }

  return data.result.map((item: FinnhubSearchResult) => ({
    id: item.symbol,
    symbol: item.symbol,
    name: item.description || item.symbol,
    price: 0,
    changePercent: 0,
    changeAmount: 0,
    assetClass: (item.type || "stock").toLowerCase(),
    dayHigh: 0,
    dayLow: 0,
    volume: 0,
    marketStatus: "closed",
    currency: "EUR",
  }));
}

// 3. ALPHA VANTAGE
async function fetchAlphaVantageQuotes(symbols: string[]): Promise<Asset[]> {
  const promises = symbols.map(async (symbol) => {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Alpha Vantage API error for ${symbol}: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return mapAlphaVantageQuote(symbol, data);
  });

  return Promise.all(promises);
}

function mapAlphaVantageQuote(symbol: string, data: AlphaVantageQuote): Asset {
  const quote = data["Global Quote"];
  const asset = tickerAssets.find((a) => a.symbol === symbol);

  const price = parseFloat(quote?.["05. price"] ?? "0") || 0;
  const changePercent =
    parseFloat(quote?.["10. change percent"]?.replace("%", "") ?? "0") || 0;
  const dayHigh = parseFloat(quote?.["03. high"] ?? "0") || 0;
  const dayLow = parseFloat(quote?.["04. low"] ?? "0") || 0;
  const open = parseFloat(quote?.["02. open"] ?? "0") || 0;
  const previousClose = parseFloat(quote?.["08. previous close"] ?? "0") || 0;

  return {
    id: symbol,
    symbol,
    name: asset?.name || symbol,
    price,
    changePercent,
    changeAmount: (price * changePercent) / 100,
    assetClass: asset?.assetClass || "stock",
    dayHigh,
    dayLow,
    open,
    previousClose,
    volume: 0,
    marketStatus: "open",
    currency: "EUR",
  };
}

async function fetchAlphaVantageCandles(
  symbol: string,
  timeframe: Timeframe,
  limit: number,
): Promise<Candle[]> {
  const intervalMap: Record<Timeframe, string> = {
    "1m": "1min",
    "5m": "5min",
    "15m": "15min",
    "1h": "60min",
    "4h": "60min",
    "1d": "daily",
    "1w": "weekly",
    "1M": "monthly",
  };

  const functionMap: Record<string, string> = {
    "1m": "TIME_SERIES_INTRADAY",
    "5m": "TIME_SERIES_INTRADAY",
    "15m": "TIME_SERIES_INTRADAY",
    "1h": "TIME_SERIES_INTRADAY",
    "4h": "TIME_SERIES_INTRADAY",
    "1d": "TIME_SERIES_DAILY",
    "1w": "TIME_SERIES_WEEKLY",
    "1M": "TIME_SERIES_MONTHLY",
  };

  const interval = intervalMap[timeframe] || "daily";
  const functionName = functionMap[timeframe] || "TIME_SERIES_DAILY";

  let url = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbol}&apikey=${API_KEY}`;
  if (timeframe !== "1d" && timeframe !== "1w" && timeframe !== "1M") {
    url += `&interval=${interval}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Alpha Vantage API error: ${response.statusText}`);
  }

  const data = await response.json();

  const timeSeriesKey = Object.keys(data).find((key) =>
    key.includes("Time Series"),
  );
  if (!timeSeriesKey || !data[timeSeriesKey]) {
    return [];
  }

  const timeSeries = data[timeSeriesKey];
  const candles: Candle[] = [];

  for (const [datetime, values] of Object.entries(timeSeries).slice(0, limit)) {
    const v = values as AlphaVantageCandleValues;
    candles.push({
      timestamp: new Date(datetime).getTime(),
      open: parseFloat(v["1. open"]),
      high: parseFloat(v["2. high"]),
      low: parseFloat(v["3. low"]),
      close: parseFloat(v["4. close"]),
      volume: parseFloat(v["5. volume"]),
    });
  }

  return candles.sort((a, b) => a.timestamp - b.timestamp);
}

async function searchAlphaVantage(query: string): Promise<Asset[]> {
  const q = query.toLowerCase();
  return tickerAssets.filter(
    (a) =>
      a.symbol.toLowerCase().includes(q) || a.name.toLowerCase().includes(q),
  );
}

// 4. POLYGON.IO
async function fetchPolygonQuotes(symbols: string[]): Promise<Asset[]> {
  const promises = symbols.map(async (symbol) => {
    const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Polygon API error for ${symbol}: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return mapPolygonQuote(symbol, data);
  });

  return Promise.all(promises);
}

function mapPolygonQuote(symbol: string, data: PolygonQuote): Asset {
  const results = data.results?.[0] || { c: 0, o: 0, h: 0, l: 0, v: 0 };
  const asset = tickerAssets.find((a) => a.symbol === symbol);
  const price = results.c || 0;
  const open = results.o || 0;
  const change = price - open;
  const changePercent = open > 0 ? (change / open) * 100 : 0;

  return {
    id: symbol,
    symbol,
    name: asset?.name || symbol,
    price,
    changePercent,
    changeAmount: change,
    assetClass: asset?.assetClass || "stock",
    dayHigh: results.h || 0,
    dayLow: results.l || 0,
    open: open,
    volume: results.v || 0,
    marketStatus: "open",
    currency: "EUR",
  };
}

async function fetchPolygonCandles(
  symbol: string,
  timeframe: Timeframe,
  limit: number,
): Promise<Candle[]> {
  const multiplierMap: Record<Timeframe, number> = {
    "1m": 1,
    "5m": 5,
    "15m": 15,
    "1h": 60,
    "4h": 240,
    "1d": 1,
    "1w": 7,
    "1M": 30,
  };

  const timespanMap: Record<Timeframe, string> = {
    "1m": "minute",
    "5m": "minute",
    "15m": "minute",
    "1h": "minute",
    "4h": "hour",
    "1d": "day",
    "1w": "day",
    "1M": "day",
  };

  const multiplier = multiplierMap[timeframe] || 1;
  const timespan = timespanMap[timeframe] || "day";

  const to = Math.floor(Date.now() / 1000);
  const from = to - limit * 86400;

  const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/${multiplier}/${timespan}/${from}/${to}?adjusted=true&sort=asc&apiKey=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Polygon API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.results || !Array.isArray(data.results)) {
    return [];
  }

  return data.results.map((candle: PolygonCandle) => ({
    timestamp: candle.t,
    open: candle.o,
    high: candle.h,
    low: candle.l,
    close: candle.c,
    volume: candle.v,
  }));
}

// ─── Mock candle generator ──────────────────────────────────────────────────

function generateMockCandles(
  symbol: string,
  timeframe: Timeframe,
  limit: number,
): Candle[] {
  const asset = tickerAssets.find((a) => a.symbol === symbol);
  const basePrice = asset?.price ?? 1.0;

  const msPerCandle: Record<Timeframe, number> = {
    "1m": 60_000,
    "5m": 300_000,
    "15m": 900_000,
    "1h": 3_600_000,
    "4h": 14_400_000,
    "1d": 86_400_000,
    "1w": 604_800_000,
    "1M": 2_592_000_000,
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
    const low = Math.min(open, close) * (1 - Math.random() * 0.004);
    const volume = Math.floor(Math.random() * 50_000 + 10_000);

    candles.push({
      timestamp: now - i * interval,
      open,
      high,
      low,
      close,
      volume,
    });
    price = close;
  }

  return candles;
}
