import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/marketing/page-hero";
import { Card, Badge } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Market News & Blog",
  description: "Latest forex, stock market and financial news from AlphaTrade Markets research desk.",
};

const articles = [
  { id: "1", title: "Fed holds rates steady — what it means for USD pairs", category: "Forex", date: "June 30, 2026", readTime: "4 min", excerpt: "The Federal Reserve kept its benchmark rate unchanged at its June meeting, citing persistent core inflation and a resilient labour market. Here's what traders should watch next." },
  { id: "2", title: "Gold near record highs: is XAU/USD set for $2,500?", category: "Commodities", date: "June 29, 2026", readTime: "5 min", excerpt: "Bullion is consolidating near multi-year highs as central bank demand and risk-off sentiment converge. We break down the key levels to watch." },
  { id: "3", title: "NVIDIA crosses $3T: what the AI trade means for tech stocks", category: "Stocks", date: "June 28, 2026", readTime: "6 min", excerpt: "NVDA's market cap milestone reflects not just one company's success but a broader market thesis on AI infrastructure. Is the trade extended or just getting started?" },
  { id: "4", title: "Bitcoin ETF inflows hit $2B in a single week", category: "Crypto", date: "June 27, 2026", readTime: "3 min", excerpt: "Institutional interest in spot Bitcoin ETFs accelerated last week, pushing BTC to its highest level since March. On-chain data paints a constructive picture." },
  { id: "5", title: "GBP/USD: UK CPI surprise opens door to BoE cut", category: "Forex", date: "June 26, 2026", readTime: "4 min", excerpt: "UK inflation fell sharper than expected in May, raising the probability of a Bank of England rate cut at its August meeting — and weakening sterling across the board." },
  { id: "6", title: "S&P 500 at 5,500: stretched or sustainable?", category: "Indices", date: "June 25, 2026", readTime: "5 min", excerpt: "US equities have extended their 2026 rally with the S&P 500 approaching all-time highs. We look at valuations, seasonality and positioning." },
];

const categoryColor: Record<string, "neutral" | "success" | "danger" | "accent"> = {
  Forex: "neutral",
  Commodities: "accent",
  Stocks: "success",
  Crypto: "accent",
  Indices: "neutral",
};

export default function BlogPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="News & analysis"
        title="Market insights from our research desk"
        description="Daily market commentary, trade ideas and macro analysis written by professional traders."
        icon={Newspaper}
      />

      <section className="bg-white py-16 dark:bg-background">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone={categoryColor[article.category] ?? "neutral"}>
                    {article.category}
                  </Badge>
                  <span className="text-xs text-foreground/45">{article.date}</span>
                  <span className="text-xs text-foreground/45">{article.readTime} read</span>
                </div>
                <h2 className="font-display mt-3 text-xl font-semibold text-foreground group-hover:text-brand-secondary transition-colors">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                  {article.excerpt}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
