import type { Asset, FaqItem } from "@/types/market";

export const tickerAssets: Asset[] = [
  { id: "1", symbol: "EUR/USD", name: "Euro / US Dollar", assetClass: "forex", price: 1.0847, changeAmount: 0.0021, changePercent: 0.19, dayHigh: 1.0861, dayLow: 1.0812, volume: 98234123, marketStatus: "open", currency: "USD" },
  { id: "2", symbol: "GBP/USD", name: "British Pound / US Dollar", assetClass: "forex", price: 1.2734, changeAmount: -0.0046, changePercent: -0.36, dayHigh: 1.2790, dayLow: 1.2719, volume: 64123456, marketStatus: "open", currency: "USD" },
  { id: "3", symbol: "USD/JPY", name: "US Dollar / Japanese Yen", assetClass: "forex", price: 157.82, changeAmount: 0.64, changePercent: 0.41, dayHigh: 158.10, dayLow: 156.95, volume: 71234567, marketStatus: "open", currency: "JPY" },
  { id: "4", symbol: "AAPL", name: "Apple Inc.", assetClass: "stock", price: 213.45, changeAmount: 2.18, changePercent: 1.03, dayHigh: 214.10, dayLow: 210.88, volume: 48213400, marketStatus: "open", currency: "USD" },
  { id: "5", symbol: "TSLA", name: "Tesla, Inc.", assetClass: "stock", price: 248.12, changeAmount: -5.34, changePercent: -2.11, dayHigh: 255.02, dayLow: 246.90, volume: 91234500, marketStatus: "open", currency: "USD" },
  { id: "6", symbol: "XAU/USD", name: "Gold Spot", assetClass: "commodity", price: 2364.80, changeAmount: 11.20, changePercent: 0.48, dayHigh: 2371.40, dayLow: 2349.10, volume: 0, marketStatus: "open", currency: "USD" },
  { id: "7", symbol: "WTI", name: "Crude Oil WTI", assetClass: "commodity", price: 78.34, changeAmount: -0.92, changePercent: -1.16, dayHigh: 79.80, dayLow: 77.95, volume: 0, marketStatus: "open", currency: "USD" },
  { id: "8", symbol: "BTC/USD", name: "Bitcoin", assetClass: "crypto", price: 67340.55, changeAmount: 1280.40, changePercent: 1.93, dayHigh: 68120.00, dayLow: 65890.20, volume: 0, marketStatus: "open", currency: "USD" },
  { id: "9", symbol: "ETH/USD", name: "Ethereum", assetClass: "crypto", price: 3512.90, changeAmount: -42.10, changePercent: -1.18, dayHigh: 3580.00, dayLow: 3470.30, volume: 0, marketStatus: "open", currency: "USD" },
  { id: "10", symbol: "SPX500", name: "S&P 500 Index", assetClass: "index", price: 5489.12, changeAmount: 18.40, changePercent: 0.34, dayHigh: 5495.00, dayLow: 5462.70, volume: 0, marketStatus: "open", currency: "USD" },
  { id: "11", symbol: "GHS/USD", name: "Ghana Cedi / US Dollar", assetClass: "forex", price: 0.0658, changeAmount: -0.0003, changePercent: -0.45, dayHigh: 0.0662, dayLow: 0.0656, volume: 12450000, marketStatus: "open", currency: "USD" },
  { id: "12", symbol: "VOO", name: "Vanguard S&P 500 ETF", assetClass: "etf", price: 502.67, changeAmount: 3.21, changePercent: 0.64, dayHigh: 503.90, dayLow: 498.10, volume: 3214500, marketStatus: "open", currency: "USD" },

  // Additional Forex pairs
  { id: "13", symbol: "USD/CHF", name: "US Dollar / Swiss Franc", assetClass: "forex", price: 0.9012, changeAmount: -0.0014, changePercent: -0.16, dayHigh: 0.9041, dayLow: 0.8998, volume: 33450000, marketStatus: "open", currency: "USD" },
  { id: "14", symbol: "AUD/USD", name: "Australian Dollar / US Dollar", assetClass: "forex", price: 0.6654, changeAmount: 0.0032, changePercent: 0.48, dayHigh: 0.6671, dayLow: 0.6610, volume: 29870000, marketStatus: "open", currency: "USD" },
  { id: "15", symbol: "USD/CAD", name: "US Dollar / Canadian Dollar", assetClass: "forex", price: 1.3702, changeAmount: 0.0019, changePercent: 0.14, dayHigh: 1.3725, dayLow: 1.3678, volume: 24310000, marketStatus: "open", currency: "USD" },
  { id: "16", symbol: "NZD/USD", name: "New Zealand Dollar / US Dollar", assetClass: "forex", price: 0.6112, changeAmount: -0.0021, changePercent: -0.34, dayHigh: 0.6140, dayLow: 0.6098, volume: 14200000, marketStatus: "open", currency: "USD" },
  { id: "17", symbol: "USD/ZAR", name: "US Dollar / South African Rand", assetClass: "forex", price: 18.24, changeAmount: 0.12, changePercent: 0.66, dayHigh: 18.36, dayLow: 18.05, volume: 9870000, marketStatus: "open", currency: "USD" },
  { id: "18", symbol: "USD/NGN", name: "US Dollar / Nigerian Naira", assetClass: "forex", price: 1542.30, changeAmount: -3.80, changePercent: -0.25, dayHigh: 1548.00, dayLow: 1538.10, volume: 5230000, marketStatus: "open", currency: "USD" },

  // Additional Stocks
  { id: "19", symbol: "MSFT", name: "Microsoft Corporation", assetClass: "stock", price: 441.58, changeAmount: 4.02, changePercent: 0.92, dayHigh: 443.20, dayLow: 436.10, volume: 21450000, marketStatus: "open", currency: "USD" },
  { id: "20", symbol: "GOOGL", name: "Alphabet Inc.", assetClass: "stock", price: 178.34, changeAmount: -1.12, changePercent: -0.62, dayHigh: 180.50, dayLow: 177.80, volume: 18230000, marketStatus: "open", currency: "USD" },
  { id: "21", symbol: "AMZN", name: "Amazon.com, Inc.", assetClass: "stock", price: 192.71, changeAmount: 2.45, changePercent: 1.29, dayHigh: 193.90, dayLow: 189.20, volume: 34120000, marketStatus: "open", currency: "USD" },
  { id: "22", symbol: "NVDA", name: "NVIDIA Corporation", assetClass: "stock", price: 124.87, changeAmount: 3.91, changePercent: 3.23, dayHigh: 126.40, dayLow: 119.85, volume: 211450000, marketStatus: "open", currency: "USD" },
  { id: "23", symbol: "META", name: "Meta Platforms, Inc.", assetClass: "stock", price: 503.22, changeAmount: -6.78, changePercent: -1.33, dayHigh: 512.10, dayLow: 500.40, volume: 14320000, marketStatus: "open", currency: "USD" },
  { id: "24", symbol: "JPM", name: "JPMorgan Chase & Co.", assetClass: "stock", price: 211.05, changeAmount: 1.34, changePercent: 0.64, dayHigh: 212.30, dayLow: 208.90, volume: 8120000, marketStatus: "open", currency: "USD" },

  // Additional Commodities
  { id: "25", symbol: "XAG/USD", name: "Silver Spot", assetClass: "commodity", price: 29.84, changeAmount: 0.34, changePercent: 1.15, dayHigh: 30.10, dayLow: 29.30, volume: 0, marketStatus: "open", currency: "USD" },
  { id: "26", symbol: "NATGAS", name: "Natural Gas", assetClass: "commodity", price: 2.68, changeAmount: -0.05, changePercent: -1.83, dayHigh: 2.76, dayLow: 2.64, volume: 0, marketStatus: "open", currency: "USD" },
  { id: "27", symbol: "COCOA", name: "Cocoa", assetClass: "commodity", price: 8210.00, changeAmount: 145.00, changePercent: 1.80, dayHigh: 8280.00, dayLow: 8040.00, volume: 0, marketStatus: "open", currency: "USD" },
  { id: "28", symbol: "BRENT", name: "Crude Oil Brent", assetClass: "commodity", price: 82.41, changeAmount: -0.61, changePercent: -0.73, dayHigh: 83.50, dayLow: 81.90, volume: 0, marketStatus: "open", currency: "USD" },

  // Additional Indices
  { id: "29", symbol: "NAS100", name: "Nasdaq 100 Index", assetClass: "index", price: 19840.30, changeAmount: 64.20, changePercent: 0.32, dayHigh: 19910.00, dayLow: 19720.40, volume: 0, marketStatus: "open", currency: "USD" },
  { id: "30", symbol: "UK100", name: "FTSE 100 Index", assetClass: "index", price: 8245.60, changeAmount: -12.30, changePercent: -0.15, dayHigh: 8270.00, dayLow: 8210.50, volume: 0, marketStatus: "open", currency: "GBP" },
  { id: "31", symbol: "GER40", name: "DAX 40 Index", assetClass: "index", price: 18432.90, changeAmount: 88.40, changePercent: 0.48, dayHigh: 18470.20, dayLow: 18310.10, volume: 0, marketStatus: "open", currency: "EUR" },
  { id: "32", symbol: "JPN225", name: "Nikkei 225 Index", assetClass: "index", price: 39120.45, changeAmount: -134.20, changePercent: -0.34, dayHigh: 39410.00, dayLow: 38990.30, volume: 0, marketStatus: "open", currency: "JPY" },

  // Additional ETFs
  { id: "33", symbol: "QQQ", name: "Invesco QQQ Trust", assetClass: "etf", price: 482.19, changeAmount: 2.88, changePercent: 0.60, dayHigh: 484.50, dayLow: 477.30, volume: 28340000, marketStatus: "open", currency: "USD" },
  { id: "34", symbol: "SPY", name: "SPDR S&P 500 ETF Trust", assetClass: "etf", price: 548.92, changeAmount: 1.95, changePercent: 0.36, dayHigh: 549.80, dayLow: 545.10, volume: 42310000, marketStatus: "open", currency: "USD" },
  { id: "35", symbol: "GLD", name: "SPDR Gold Shares", assetClass: "etf", price: 218.34, changeAmount: 1.12, changePercent: 0.52, dayHigh: 219.10, dayLow: 216.80, volume: 6230000, marketStatus: "open", currency: "USD" },
  { id: "36", symbol: "ARKK", name: "ARK Innovation ETF", assetClass: "etf", price: 47.62, changeAmount: -0.84, changePercent: -1.73, dayHigh: 48.90, dayLow: 47.10, volume: 9870000, marketStatus: "open", currency: "USD" },

  // Additional Crypto
  { id: "37", symbol: "SOL/USD", name: "Solana", assetClass: "crypto", price: 168.42, changeAmount: 6.21, changePercent: 3.83, dayHigh: 171.90, dayLow: 159.30, volume: 0, marketStatus: "open", currency: "USD" },
  { id: "38", symbol: "BNB/USD", name: "BNB", assetClass: "crypto", price: 584.30, changeAmount: -8.40, changePercent: -1.42, dayHigh: 596.20, dayLow: 580.10, volume: 0, marketStatus: "open", currency: "USD" },
  { id: "39", symbol: "XRP/USD", name: "Ripple", assetClass: "crypto", price: 0.5234, changeAmount: 0.0187, changePercent: 3.71, dayHigh: 0.5310, dayLow: 0.5021, volume: 0, marketStatus: "open", currency: "USD" },
  { id: "40", symbol: "ADA/USD", name: "Cardano", assetClass: "crypto", price: 0.4123, changeAmount: -0.0098, changePercent: -2.32, dayHigh: 0.4280, dayLow: 0.4080, volume: 0, marketStatus: "open", currency: "USD" },
];

export const featuredMarkets: Asset[] = tickerAssets.slice(0, 8);

export function getAssetsByClass(assetClass: Asset["assetClass"]): Asset[] {
  return tickerAssets.filter((a) => a.assetClass === assetClass);
}

export const faqs: FaqItem[] = [
  { id: "1", question: "How do I open an AlphaTrade account?", answer: "Click \"Open free account\", verify your email, complete the KYC identity check, and fund your wallet to start trading — usually takes under 10 minutes." },
  { id: "2", question: "What is the minimum deposit?", answer: "You can open a Starter account with no minimum deposit. Pro and Elite tiers have minimum funding requirements outlined on the Pricing page." },
  { id: "3", question: "Which markets can I trade?", answer: "Forex pairs, global stocks, commodities, indices, ETFs, and major cryptocurrencies — all from a single account." },
  { id: "4", question: "How long do withdrawals take?", answer: "Card and bank withdrawals are typically processed within 1-3 business days. Crypto withdrawals are usually completed within a few hours." },
  { id: "5", question: "Is my money safe with AlphaTrade?", answer: "Client funds are held in segregated accounts at tier-1 banking partners, separate from company operating funds, and protected with bank-grade encryption." },
  { id: "6", question: "Do I need to complete KYC verification?", answer: "Yes. KYC verification is required by regulation before you can deposit funds or place live trades, protecting both you and the platform." },
  { id: "7", question: "What leverage is available?", answer: "Leverage varies by asset class and account tier, from 1:10 up to 1:100 on major forex pairs, shown clearly before every trade." },
  { id: "8", question: "Can I trade from my phone?", answer: "Yes — the AlphaTrade app for iOS and Android gives you full market access, charting, and order execution on the go." },
];
