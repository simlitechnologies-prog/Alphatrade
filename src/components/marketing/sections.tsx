import Link from "next/link";
import {
  GraduationCap,
  Smartphone,
  Lock,
  Fingerprint,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, Badge } from "@/components/ui/card";

const academyTopics = [
  { title: "Forex trading fundamentals", level: "Beginner" },
  { title: "Reading candlestick charts", level: "Beginner" },
  { title: "Risk management essentials", level: "Intermediate" },
  { title: "Technical analysis deep dive", level: "Advanced" },
];

const newsItems = [
  { title: "Fed signals rate path ahead of Q3 review", category: "Markets", time: "2h ago" },
  { title: "Gold holds near record highs amid demand", category: "Commodities", time: "5h ago" },
  { title: "Tech earnings season: what to watch", category: "Stocks", time: "1d ago" },
];

export function Academy() {
  return (
    <section className="bg-brand-muted py-20 lg:py-28" id="academy">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-accent/15 text-brand-accent">
              <GraduationCap size={22} />
            </span>
            <h2 className="font-display mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              Learn before you trade live
            </h2>
            <p className="mt-3 max-w-md text-foreground/60">
              Free, structured lessons from trading basics to advanced
              technical analysis — built by our research desk.
            </p>
            <Link href="/education">
              <Button variant="dark" size="md" className="mt-6 group">
                Visit Trading Academy
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {academyTopics.map((topic) => (
              <Card key={topic.title} className="flex items-center justify-between bg-white">
                <span className="text-sm font-medium text-foreground">{topic.title}</span>
                <Badge tone="neutral">{topic.level}</Badge>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewsSection() {
  return (
    <section className="bg-white py-20 lg:py-28 dark:bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Latest market news
          </h2>
          <Link href="/blog">
            <Button variant="outline" size="sm">Read all news</Button>
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {newsItems.map((item) => (
            <Card key={item.title} className="hover:shadow-lg transition-shadow">
              <Badge tone="accent">{item.category}</Badge>
              <h3 className="font-display mt-3 text-base font-semibold text-foreground leading-snug">
                {item.title}
              </h3>
              <p className="mt-3 text-xs text-foreground/50">{item.time}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MobileApp() {
  return (
    <section className="bg-brand-primary py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-secondary/20 text-brand-secondary">
            <Smartphone size={22} />
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold text-white sm:text-4xl">
            Trade from anywhere
          </h2>
          <p className="mt-3 max-w-md text-white/60">
            The AlphaTrade app puts full market access, charting, and instant
            order execution in your pocket — iOS and Android.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="primary" size="md">App Store</Button>
            <Button variant="outline" size="md" className="border-white/20 text-white hover:bg-white/10">
              Google Play
            </Button>
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-8 text-center text-white/50 text-sm">
          App preview mockup
        </div>
      </div>
    </section>
  );
}

export function Security() {
  const items = [
    { icon: Lock, title: "256-bit encryption", desc: "All data encrypted in transit and at rest." },
    { icon: Fingerprint, title: "Biometric & 2FA login", desc: "Face ID, fingerprint, and authenticator app support." },
    { icon: ShieldIcon, title: "Segregated client funds", desc: "Your capital held separately from company funds." },
  ];
  return (
    <section className="bg-white py-20 lg:py-28 dark:bg-background">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Security you can verify
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title}>
              <item.icon size={22} className="mx-auto text-brand-secondary" />
              <h3 className="font-display mt-3 font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-foreground/60">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShieldIcon(props: React.ComponentProps<typeof Lock>) {
  return <Lock {...props} />;
}

export function CTA() {
  return (
    <section className="bg-brand-secondary py-16">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Ready to start trading?
        </h2>
        <p className="mt-3 text-white/80">
          Open a free account in minutes. No hidden fees, no commitment.
        </p>
        <Link href="/register">
          <Button variant="dark" size="lg" className="mt-6 bg-white text-brand-secondary hover:bg-slate-100">
            Open free account
          </Button>
        </Link>
      </div>
    </section>
  );
}

export function Newsletter() {
  return (
    <section className="bg-brand-muted py-16">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Stay ahead of the markets
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          Weekly market insights, no spam — unsubscribe anytime.
        </p>
        <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-foreground placeholder:text-foreground/40 focus:border-brand-secondary sm:w-72 dark:border-slate-700 dark:bg-brand-primary/40"
          />
          <Button variant="primary" size="md" type="submit">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
