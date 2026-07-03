import type { Metadata } from "next";
import { GraduationCap, PlayCircle, BookOpen, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/marketing/page-hero";
import { Card, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Trading Academy",
  description: "Free trading education from basics to advanced strategy — structured lessons built by AlphaTrade's research desk.",
};

const tracks = [
  {
    title: "Forex Fundamentals",
    level: "Beginner",
    lessons: 12,
    duration: "4 hours",
    description: "Understand how the forex market works, what moves currency prices, and how to place your first trade.",
    topics: ["What is forex?", "Currency pairs explained", "Pips, lots and leverage", "Reading a forex quote", "Your first trade walkthrough"],
  },
  {
    title: "Stock Investing Basics",
    level: "Beginner",
    lessons: 10,
    duration: "3.5 hours",
    description: "Learn how stock markets work, how to evaluate companies, and how to build a long-term equity portfolio.",
    topics: ["How stock markets work", "Reading financial statements", "P/E ratios and valuation", "Dividends and earnings", "Building a watchlist"],
  },
  {
    title: "Technical Analysis",
    level: "Intermediate",
    lessons: 18,
    duration: "7 hours",
    description: "Master chart reading, trend identification, support and resistance, and the most reliable technical indicators.",
    topics: ["Candlestick patterns", "Support & resistance", "Moving averages", "RSI and MACD", "Fibonacci retracements", "Chart patterns"],
  },
  {
    title: "Risk Management",
    level: "Intermediate",
    lessons: 8,
    duration: "3 hours",
    description: "Protect your capital with proper position sizing, stop-loss strategy, and risk-to-reward discipline.",
    topics: ["The 1% rule", "Stop-loss placement", "Risk-to-reward ratios", "Portfolio diversification", "Managing drawdowns"],
  },
  {
    title: "Fundamental Analysis",
    level: "Intermediate",
    lessons: 14,
    duration: "5.5 hours",
    description: "Trade macro events, earnings, and central bank decisions with confidence using fundamental research.",
    topics: ["Economic indicators", "Central bank policy", "Earnings releases", "GDP and inflation", "Trading the news"],
  },
  {
    title: "Trading Psychology",
    level: "Advanced",
    lessons: 9,
    duration: "3.5 hours",
    description: "Understand the mental game of trading — manage emotions, build discipline, and develop a consistent process.",
    topics: ["Controlling FOMO", "Loss aversion bias", "Building a trading journal", "Routine and consistency", "Handling losing streaks"],
  },
];

const levelColor: Record<string, "neutral" | "accent" | "danger"> = {
  Beginner: "neutral",
  Intermediate: "accent",
  Advanced: "danger",
};

const glossaryTerms = [
  { term: "Pip", def: "The smallest price move in a forex pair, typically 0.0001." },
  { term: "Spread", def: "The difference between the buy (ask) and sell (bid) price." },
  { term: "Leverage", def: "Using borrowed capital to increase potential returns — and risk." },
  { term: "Margin", def: "Collateral deposited to open and maintain a leveraged position." },
  { term: "Stop-loss", def: "An automatic order to close a trade at a pre-set loss level." },
  { term: "Take profit", def: "An automatic order to close a trade when it reaches a profit target." },
];

export default function EducationPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Trading Academy"
        title="Learn to trade, free"
        description="Structured lessons from beginner to advanced — written and reviewed by professional traders on our research desk."
        icon={GraduationCap}
      />

      {/* Course tracks */}
      <section className="bg-white py-16 dark:bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Course tracks</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track) => (
              <Card key={track.title} className="flex flex-col">
                <div className="flex items-center justify-between">
                  <Badge tone={levelColor[track.level]}>{track.level}</Badge>
                  <span className="flex items-center gap-1 text-xs text-foreground/50">
                    <Clock size={12} />
                    {track.duration}
                  </span>
                </div>
                <h3 className="font-display mt-3 text-lg font-semibold text-foreground">
                  {track.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                  {track.description}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {track.topics.map((topic) => (
                    <li key={topic} className="flex items-center gap-2 text-xs text-foreground/70">
                      <BookOpen size={12} className="shrink-0 text-brand-secondary" />
                      {topic}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <PlayCircle size={15} />
                    Start course — {track.lessons} lessons
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary */}
      <section className="bg-brand-muted py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Trading glossary</h2>
          <p className="mt-2 text-sm text-foreground/60">Key terms every trader should know.</p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {glossaryTerms.map((item) => (
              <Card key={item.term} className="bg-white">
                <p className="font-display font-semibold text-brand-secondary">{item.term}</p>
                <p className="mt-1.5 text-sm text-foreground/70">{item.def}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-primary py-16 text-center">
        <h2 className="font-display text-2xl font-bold text-white">Ready to apply what you&apos;ve learned?</h2>
        <p className="mt-2 text-white/60">Open a free account and practice on a demo before going live.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button variant="primary" size="md">Open free account</Button>
          <Button variant="outline" size="md" className="border-white/20 text-white hover:bg-white/10">Try demo account</Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
