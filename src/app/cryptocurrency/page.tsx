import type { Metadata } from "next";
import { MarketPageTemplate } from "@/components/marketing/market-page-template";
import { getAssetsByClass } from "@/data/markets";

export const metadata: Metadata = {
  title: "Crypto Trading",
  description: "Trade Bitcoin, Ethereum, Solana, XRP and top cryptocurrencies on AlphaTrade Markets.",
};

export default function CryptocurrencyPage() {
  return (
    <MarketPageTemplate
      eyebrow="Cryptocurrency"
      title="Trade crypto markets"
      description="Bitcoin, Ethereum, Solana, BNB, XRP, Cardano and more — trade the crypto markets with tight spreads and 24/7 access."
      assets={getAssetsByClass("crypto")}
    />
  );
}
