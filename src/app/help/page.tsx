import type { Metadata } from "next";
import { HelpCircle, MessageSquare, Mail, Phone, BookOpen } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/marketing/page-hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help & Support",
  description: "Get help with your AlphaTrade Markets account — live chat, email and phone support available 24/5.",
};

const channels = [
  {
    icon: MessageSquare,
    title: "Live chat",
    desc: "Available 24/5. Typical response time under 2 minutes.",
    cta: "Start chat",
    href: "#",
  },
  {
    icon: Mail,
    title: "Email support",
    desc: "Send us a message and we'll respond within 4 hours on business days.",
    cta: "support@alphatrademarkets.com",
    href: "mailto:support@alphatrademarkets.com",
  },
  {
    icon: Phone,
    title: "Phone (Elite only)",
    desc: "Dedicated phone line for Elite account holders, Monday–Friday.",
    cta: "+44 20 0000 0000",
    href: "tel:+442000000000",
  },
];

const guides = [
  { title: "How to complete KYC verification", href: "/faq" },
  { title: "How to make your first deposit", href: "/faq" },
  { title: "Understanding leverage and margin", href: "/education" },
  { title: "How to place a limit order", href: "/education" },
  { title: "Withdrawal processing times", href: "/faq" },
  { title: "Enabling two-factor authentication", href: "/faq" },
];

export default function SupportPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Support"
        title="We're here to help"
        description="Our support team is available around the clock to help with account, trading, and technical questions."
        icon={HelpCircle}
      />

      {/* Contact channels */}
      <section className="bg-white py-16 dark:bg-background">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">Get in touch</h2>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {channels.map((c) => (
              <Card key={c.title} className="flex flex-col">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary">
                  <c.icon size={20} />
                </span>
                <h3 className="font-display mt-4 text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm text-foreground/60">{c.desc}</p>
                <a href={c.href} className="mt-5 inline-flex items-center text-sm font-medium text-brand-secondary hover:underline">
                  {c.cta}
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular guides */}
      <section className="bg-brand-muted py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen size={20} className="text-brand-secondary" />
            <h2 className="font-display text-2xl font-bold text-foreground">Popular help topics</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {guides.map((g) => (
              <Link
                key={g.title}
                href={g.href}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-foreground hover:border-brand-secondary hover:text-brand-secondary transition-colors dark:border-slate-800 dark:bg-brand-primary/40"
              >
                <HelpCircle size={14} className="shrink-0 text-brand-secondary" />
                {g.title}
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-foreground/50 mb-3">Didn&apos;t find your answer?</p>
            <Link href="/contact">
              <Button variant="primary" size="md">Contact support</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
