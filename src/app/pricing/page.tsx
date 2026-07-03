import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/marketing/page-hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing & Account Types",
  description: "Transparent pricing for every trader. Compare Starter, Pro and Elite account tiers.",
};

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "no minimum deposit",
    highlight: false,
    description: "Perfect for new traders learning the markets.",
    features: [
      { label: "180+ tradable markets", included: true },
      { label: "Demo account included", included: true },
      { label: "Basic charting tools", included: true },
      { label: "Email support", included: true },
      { label: "Economic calendar", included: true },
      { label: "Advanced indicators", included: false },
      { label: "Priority execution", included: false },
      { label: "Dedicated account manager", included: false },
    ],
    cta: "Get started free",
    ctaVariant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$0",
    period: "from $500 deposit",
    highlight: true,
    description: "For active traders who need speed and deeper tools.",
    features: [
      { label: "180+ tradable markets", included: true },
      { label: "Demo account included", included: true },
      { label: "Advanced charting tools", included: true },
      { label: "Priority live chat support", included: true },
      { label: "Economic calendar + alerts", included: true },
      { label: "30+ advanced indicators", included: true },
      { label: "Priority execution", included: true },
      { label: "Dedicated account manager", included: false },
    ],
    cta: "Open Pro account",
    ctaVariant: "primary" as const,
  },
  {
    name: "Elite",
    price: "$0",
    period: "from $10,000 deposit",
    highlight: false,
    description: "Institutional-grade access for serious capital.",
    features: [
      { label: "180+ tradable markets", included: true },
      { label: "Demo account included", included: true },
      { label: "Advanced charting tools", included: true },
      { label: "24/5 phone & chat support", included: true },
      { label: "Economic calendar + alerts", included: true },
      { label: "30+ advanced indicators", included: true },
      { label: "Ultra-low latency execution", included: true },
      { label: "Dedicated account manager", included: true },
    ],
    cta: "Open Elite account",
    ctaVariant: "dark" as const,
  },
];

export default function PricingPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Pricing"
        title="Transparent pricing, no surprises"
        description="No platform fees, no hidden charges. We earn on the spread — and we publish our spreads clearly before every trade."
      />

      <section className="bg-brand-muted py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "flex flex-col",
                  plan.highlight &&
                    "border-2 border-brand-secondary shadow-lg shadow-brand-secondary/10 relative"
                )}
              >
                {plan.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-secondary px-4 py-1 text-xs font-semibold text-white">
                    Most popular
                  </span>
                )}
                <div>
                  <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand-secondary">
                    {plan.name}
                  </p>
                  <p className="font-display mt-2 text-4xl font-bold text-foreground">
                    {plan.price}
                  </p>
                  <p className="text-xs text-foreground/50">{plan.period}</p>
                  <p className="mt-3 text-sm text-foreground/60">{plan.description}</p>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-2.5">
                      {f.included ? (
                        <Check size={15} className="shrink-0 text-brand-success" />
                      ) : (
                        <X size={15} className="shrink-0 text-foreground/25" />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          f.included ? "text-foreground/80" : "text-foreground/35"
                        )}
                      >
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button variant={plan.ctaVariant} size="md" className="w-full">
                    {plan.cta}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-foreground/45">
            Spreads from 0.6 pips on EUR/USD. Swap fees apply to overnight
            positions. All fees are published in your account settings before
            you trade.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
