import type { Metadata } from "next";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/marketing/page-hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with AlphaTrade Markets — support, partnerships and general enquiries.",
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        description="Our support team is available 24/5 via live chat, email and phone."
        icon={MessageSquare}
      />

      <section className="bg-white py-16 dark:bg-background">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
          {/* Contact form */}
          <Card>
            <h2 className="font-display text-xl font-bold text-foreground">Send us a message</h2>
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-foreground/60 mb-1.5">First name</label>
                  <input className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-brand-primary/40" placeholder="Kwame" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/60 mb-1.5">Last name</label>
                  <input className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-brand-primary/40" placeholder="Asante" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/60 mb-1.5">Email address</label>
                <input type="email" className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-brand-primary/40" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/60 mb-1.5">Subject</label>
                <select className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-brand-primary/40">
                  <option>Account enquiry</option>
                  <option>Technical support</option>
                  <option>Deposit / Withdrawal</option>
                  <option>KYC / Verification</option>
                  <option>Partnership / Press</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/60 mb-1.5">Message</label>
                <textarea rows={5} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-brand-primary/40 resize-none" placeholder="How can we help?" />
              </div>
              <Button variant="primary" size="md" className="w-full">Send message</Button>
            </div>
          </Card>

          {/* Contact info */}
          <div className="space-y-5">
            <Card>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary">
                  <MessageSquare size={18} />
                </span>
                <div>
                  <p className="font-semibold text-foreground">Live chat</p>
                  <p className="text-sm text-foreground/60">Available 24/5 — typically replies in under 2 minutes.</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="font-semibold text-foreground">Email support</p>
                  <a href="mailto:support@alphatrademarkets.com" className="text-sm text-brand-secondary hover:underline">
                    support@alphatrademarkets.com
                  </a>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="font-semibold text-foreground">Phone</p>
                  <p className="text-sm text-foreground/60">Elite account holders: +44 20 0000 0000</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
