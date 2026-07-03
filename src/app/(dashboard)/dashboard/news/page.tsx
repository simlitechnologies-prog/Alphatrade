import { WidgetCard } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/card";

const fullNews = [
  { id: "1", title: "Fed holds rates steady — dollar softens across major pairs", category: "Forex", time: "2h ago", impact: "high", excerpt: "The Federal Reserve kept its benchmark rate unchanged at 5.25%–5.50%, citing continued disinflation progress but cautioning that more data is needed before cutting." },
  { id: "2", title: "NVIDIA earnings beat estimates by 12% — shares surge", category: "Stocks", time: "4h ago", impact: "high", excerpt: "NVIDIA posted Q2 revenue of $30.04B vs the $28.68B consensus estimate, driven by data centre demand. The stock gained 7% in after-hours trading." },
  { id: "3", title: "Gold consolidates near $2,365 ahead of Non-Farm Payrolls", category: "Commodities", time: "5h ago", impact: "medium", excerpt: "Bullion is holding just below recent record highs as markets await Friday's jobs report. A soft print could push XAU/USD toward $2,400." },
  { id: "4", title: "Bitcoin breaks above $67,000 on spot ETF inflow data", category: "Crypto", time: "6h ago", impact: "medium", excerpt: "Bitcoin extended its recovery rally, driven by $1.2B in net inflows to spot BTC ETFs last week. On-chain indicators suggest sustained institutional accumulation." },
  { id: "5", title: "UK inflation falls to 2.3% — GBP weakens across the board", category: "Forex", time: "1d ago", impact: "high", excerpt: "UK CPI fell to 2.3% YoY in May, below the 2.5% forecast, increasing the probability of a Bank of England rate cut at the August meeting." },
  { id: "6", title: "S&P 500 approaches 5,500 as rate cut hopes revive", category: "Indices", time: "1d ago", impact: "medium", excerpt: "US equities pushed higher for the third consecutive week. Q2 earnings season, which kicks off in mid-July, could test current valuations." },
];

const impactColor: Record<string, "danger" | "accent" | "neutral"> = {
  high: "danger",
  medium: "accent",
  low: "neutral",
};

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Market News</h2>

      <div className="grid grid-cols-1 gap-4">
        {fullNews.map((article) => (
          <WidgetCard key={article.id} title="">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge tone={impactColor[article.impact]}>{article.impact.toUpperCase()} IMPACT</Badge>
              <Badge tone="neutral">{article.category}</Badge>
              <span className="text-xs text-foreground/40">{article.time}</span>
            </div>
            <h3 className="font-display font-semibold text-foreground hover:text-brand-secondary cursor-pointer transition-colors">
              {article.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/60">{article.excerpt}</p>
          </WidgetCard>
        ))}
      </div>
    </div>
  );
}
