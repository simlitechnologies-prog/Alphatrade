import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { TestimonialItem } from "@/types/market";

const testimonials: TestimonialItem[] = [
  {
    id: "1",
    name: "Kwame Asante",
    role: "Independent trader",
    location: "Accra, Ghana",
    quote:
      "The execution speed and transparent spreads are what kept me on AlphaTrade after trying three other brokers.",
    rating: 5,
  },
  {
    id: "2",
    name: "Amara Okafor",
    role: "Part-time investor",
    location: "Lagos, Nigeria",
    quote:
      "I started with the Academy lessons and moved to live trading in under a month. The dashboard makes everything clear.",
    rating: 5,
  },
  {
    id: "3",
    name: "Daniel Mensah",
    role: "Forex trader",
    location: "Kumasi, Ghana",
    quote:
      "Withdrawals are processed fast and support actually answers. That trust matters more than flashy features.",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-20 lg:py-28 dark:bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand-secondary">
            Trusted by traders
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            What our traders say
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
