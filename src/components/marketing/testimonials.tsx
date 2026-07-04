import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { TestimonialItem } from "@/types/market";

const testimonials: TestimonialItem[] = [
  {
    id: "1",
    name: "Lukas Schneider",
    role: "Independent Trader",
    location: "Berlin, Germany",
    quote:
      "The platform's execution speed and competitive spreads have significantly improved my trading experience. It's become my primary broker.",
    rating: 5,
  },
  {
    id: "2",
    name: "Sophie Müller",
    role: "Long-term Investor",
    location: "Munich, Germany",
    quote:
      "The educational resources made it easy to understand the markets, and opening my first investment account was straightforward.",
    rating: 5,
  },
  {
    id: "3",
    name: "Thomas Weber",
    role: "Forex Trader",
    location: "Frankfurt, Germany",
    quote:
      "Fast withdrawals, excellent customer support, and a reliable trading platform. Everything I need is in one place.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-20 lg:py-28 dark:bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand-secondary">
            Trusted by Traders Across Europe
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            What Our Clients Say
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.id}>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < t.rating
                        ? "fill-brand-accent text-brand-accent"
                        : "text-slate-200"
                    }
                  />
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-5">
                <p className="text-sm font-semibold text-foreground">
                  {t.name}
                </p>
                <p className="text-xs text-foreground/50">
                  {t.role} · {t.location}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
