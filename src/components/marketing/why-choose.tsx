"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Globe2,
  BarChart3,
  Wallet,
  Headphones,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Bank-grade security",
    desc: "Funds segregated in tier-1 institutions, with 2FA and biometric login protecting every account.",
  },
  {
    icon: Zap,
    title: "Lightning-fast execution",
    desc: "Sub-50ms average order execution across forex, stocks, and crypto markets.",
  },
  {
    icon: Globe2,
    title: "180+ global markets",
    desc: "Forex pairs, US and global stocks, commodities, indices, ETFs, and crypto — one account.",
  },
  {
    icon: BarChart3,
    title: "Pro-grade charting",
    desc: "Advanced technical indicators, drawing tools, and multi-timeframe analysis built in.",
  },
  {
    icon: Wallet,
    title: "Transparent pricing",
    desc: "Tight spreads, no hidden fees. Know your cost before every trade.",
  },
  {
    icon: Headphones,
    title: "24/5 human support",
    desc: "Real traders and support specialists, reachable by chat, email, or phone.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-white py-20 lg:py-28 dark:bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand-secondary">
            Why AlphaTrade
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            Built for traders who take it seriously
          </h2>
          <p className="mt-4 text-foreground/60">
            Every feature is designed around one goal: helping you trade with
            clarity, speed, and confidence.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Card className="h-full">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary">
                  <reason.icon size={22} />
                </span>
                <h3 className="font-display mt-4 text-lg font-semibold text-foreground">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                  {reason.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
