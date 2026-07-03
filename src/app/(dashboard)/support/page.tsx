"use client";

import { useState } from "react";
import { HelpCircle, MessageSquare, CheckCircle } from "lucide-react";
import { WidgetCard } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tickets = [
  { id: "TKT-0041", subject: "Withdrawal not processed after 3 days", status: "resolved", created: "2026-06-20", updated: "2026-06-22" },
  { id: "TKT-0038", subject: "KYC document rejected — passport", status: "closed", created: "2026-06-15", updated: "2026-06-16" },
];

const statusColor: Record<string, string> = {
  open: "bg-blue-50 text-brand-secondary",
  pending: "bg-amber-50 text-brand-accent",
  resolved: "bg-green-50 text-brand-success",
  closed: "bg-slate-100 text-foreground/50",
};

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Support</h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* New ticket */}
        <WidgetCard title="Open a support ticket">
          {submitted ? (
            <div className="flex flex-col items-center py-10 text-center">
              <CheckCircle size={40} className="text-brand-success mb-3" />
              <p className="font-display font-semibold text-foreground">Ticket submitted!</p>
              <p className="text-sm text-foreground/60 mt-1">We typically respond within 2 hours during business hours.</p>
              <Button variant="outline" size="sm" className="mt-5" onClick={() => setSubmitted(false)}>Open another ticket</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">Subject</label>
                <input placeholder="Briefly describe your issue" className="h-11 w-full rounded-lg border border-slate-200 bg-brand-muted px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-900" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">Category</label>
                <select className="h-11 w-full rounded-lg border border-slate-200 bg-brand-muted px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-900">
                  <option>Deposit / Withdrawal</option>
                  <option>KYC / Verification</option>
                  <option>Trading issue</option>
                  <option>Account access</option>
                  <option>Technical problem</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">Description</label>
                <textarea rows={5} placeholder="Please provide as much detail as possible…" className="w-full rounded-lg border border-slate-200 bg-brand-muted px-3 py-2.5 text-sm text-foreground focus:border-brand-secondary resize-none dark:border-slate-700 dark:bg-slate-900" />
              </div>
              <Button variant="primary" size="md" className="w-full gap-2" onClick={() => setSubmitted(true)}>
                <MessageSquare size={15} /> Submit ticket
              </Button>
            </div>
          )}
        </WidgetCard>

        {/* Ticket history */}
        <div className="space-y-4">
          <WidgetCard title="My tickets">
            {tickets.length === 0 ? (
              <p className="py-8 text-center text-sm text-foreground/40">No tickets yet.</p>
            ) : (
              <div className="space-y-3">
                {tickets.map((t) => (
                  <div key={t.id} className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs text-foreground/40">{t.id}</span>
                      <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", statusColor[t.status])}>{t.status}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{t.subject}</p>
                    <p className="text-xs text-foreground/40 mt-0.5">Last updated {t.updated}</p>
                  </div>
                ))}
              </div>
            )}
          </WidgetCard>

          <WidgetCard title="Quick help">
            <div className="space-y-2 text-sm">
              {["How do I complete KYC verification?", "How long do withdrawals take?", "What leverage is available?", "How do I enable two-factor authentication?"].map((q) => (
                <button key={q} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left hover:bg-brand-muted transition-colors dark:hover:bg-slate-900/40">
                  <HelpCircle size={14} className="shrink-0 text-brand-secondary" />
                  <span className="text-foreground/70">{q}</span>
                </button>
              ))}
            </div>
          </WidgetCard>
        </div>
      </div>
    </div>
  );
}
