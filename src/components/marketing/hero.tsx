"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, formatPercent, cn } from "@/lib/utils";
import { featuredMarkets } from "@/data/markets";

const mockupAssets = featuredMarkets.slice(0, 4);

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-primary pt-16 pb-24 lg:pt-24 lg:pb-32">
      {/* ambient grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-secondary/30 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
            <ShieldCheck size={14} className="text-brand-accent" />
            Regulated-grade security · Trusted by traders in 40+ countries
          </span>

          <h1 className="font-display mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Trade forex.
            <br />
            Invest in stocks.
            <br />
            <span className="text-brand-accent">Grow your wealth.</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
            One platform for forex, stocks, commodities, indices, ETFs and
            crypto — institutional-grade charting, transparent pricing, and
            execution you can trust, day or night.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/register">
              <Button variant="primary" size="lg" className="group">
                Open free account
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Button>
            </Link>
            <Link href="/markets">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Explore markets
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-8 text-white/60">
            <div>
              <p className="font-display tabular text-2xl font-semibold text-white">
                2.1M+
              </p>
              <p className="text-xs">Active traders</p>
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div>
              <p className="font-display tabular text-2xl font-semibold text-white">
                180+
              </p>
              <p className="text-xs">Markets to trade</p>
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div>
              <p className="font-display tabular text-2xl font-semibold text-white">
                $48B+
              </p>
              <p className="text-xs">Monthly volume</p>
            </div>
          </div>
        </motion.div>

        {/* Floating dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="glass-panel relative rounded-2xl p-5 shadow-2xl bg-gray-400">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 ">
              <div>
                <p className="text-xs text-white/50 ">Portfolio value</p>
                <p className="font-display tabular text-3xl font-bold text-white">
                  $128,940.55
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-green-500/15 px-2.5 py-1 text-xs font-medium text-green-400">
                +4.82% today
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {mockupAssets.map((asset, i) => {
                const isUp = asset.changePercent >= 0;
                return (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          isUp ? "bg-green-400" : "bg-red-400",
                        )}
                      />
                      <span className="text-sm font-medium text-white">
                        {asset.symbol}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="tabular text-sm text-white">
                        {formatPrice(asset.price, asset.price > 100 ? 2 : 4)}
                      </p>
                      <p
                        className={cn(
                          "tabular text-xs",
                          isUp ? "text-green-400" : "text-red-400",
                        )}
                      >
                        {formatPercent(asset.changePercent)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* floating accent badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute -bottom-6 -left-6 hidden rounded-xl bg-brand-accent px-4 py-3 shadow-xl sm:block"
          >
            <p className="text-xs font-medium text-brand-primary/70">
              Order filled
            </p>
            <p className="font-display text-sm font-bold text-brand-primary">
              BTC/USD · Buy 0.42
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
