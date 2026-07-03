"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/marketing/page-hero";
import { cn } from "@/lib/utils";
import { faqs } from "@/data/markets";

function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 dark:border-slate-800">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown
          size={18}
          className={cn("shrink-0 text-foreground/40 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-foreground/65">{answer}</p>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Everything you need to know about trading on AlphaTrade Markets."
      />
      <section className="bg-white py-16 dark:bg-background">
        <div className="mx-auto max-w-3xl px-6">
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {faqs.map((faq) => (
              <Accordion key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
