"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "2.1M+", label: "Active traders worldwide" },
  { value: "$48B+", label: "Monthly trading volume" },
  { value: "180+", label: "Tradable markets" },
  { value: "99.98%", label: "Platform uptime" },
];

export function Stats() {
  return (
    <section className="bg-brand-primary py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-display tabular text-3xl font-bold text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-white/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
