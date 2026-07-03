"use client";

import { useState } from "react";
import { Globe, Shield, Bell, CreditCard } from "lucide-react";
import { PageHeader, AdminCard } from "@/components/dashboard/admin-widgets";
import { cn } from "@/lib/utils";

const TABS = ["General", "Security", "Notifications", "Finance"] as const;
type Tab = (typeof TABS)[number];
const tabIcons = { General: Globe, Security: Shield, Notifications: Bell, Finance: CreditCard };

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<Tab>("General");

  return (
    <div className="space-y-6">
      <PageHeader title="Platform Settings" sub="Global configuration for AlphaTrade Markets" />

      <div className="flex gap-2 flex-wrap">
        {TABS.map((t) => {
          const Icon = tabIcons[t];
          return (
            <button key={t} onClick={() => setTab(t)} className={cn("flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors", tab === t ? "bg-brand-danger text-white" : "bg-white border border-slate-200 text-foreground/60 hover:text-foreground dark:bg-slate-900 dark:border-slate-800")}>
              <Icon size={15} />{t}
            </button>
          );
        })}
      </div>

      {tab === "General" && (
        <AdminCard title="General settings">
          <div className="max-w-lg space-y-4">
            {[
              { label: "Platform name", value: "AlphaTrade Markets" },
              { label: "Support email", value: "support@alphatrademarkets.com" },
              { label: "Compliance email", value: "compliance@alphatrademarkets.com" },
              { label: "Default currency", value: "USD" },
              { label: "Session timeout (minutes)", value: "30" },
            ].map((s) => (
              <div key={s.label}>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">{s.label}</label>
                <input defaultValue={s.value} className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-foreground focus:border-brand-danger dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
            ))}
            <button className="rounded-lg bg-brand-danger px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors">
              Save changes
            </button>
          </div>
        </AdminCard>
      )}

      {tab === "Security" && (
        <AdminCard title="Security settings">
          <div className="max-w-lg space-y-4">
            {[
              { label: "Require 2FA for all admins", on: true },
              { label: "Force password change every 90 days", on: true },
              { label: "IP allowlisting for admin panel", on: false },
              { label: "Audit log all admin actions", on: true },
              { label: "Rate limit login attempts", on: true },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-foreground dark:text-white">{s.label}</span>
                <button className={cn("h-6 w-11 rounded-full transition-colors", s.on ? "bg-brand-danger" : "bg-slate-300")}>
                  <span className={cn("block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform", s.on && "translate-x-5")} />
                </button>
              </div>
            ))}
          </div>
        </AdminCard>
      )}

      {tab === "Notifications" && (
        <AdminCard title="Admin notification preferences">
          <div className="max-w-lg space-y-4">
            {[
              { label: "AML flag alerts", desc: "Email when a new AML flag is created", on: true },
              { label: "KYC submission alerts", desc: "Email when new KYC applications arrive", on: true },
              { label: "Large withdrawal alerts", desc: "Alert on withdrawals above $50,000", on: true },
              { label: "System error alerts", desc: "Alert on platform errors and downtime", on: true },
              { label: "Weekly report digest", desc: "Automated weekly summary email", on: false },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-sm font-medium text-foreground dark:text-white">{n.label}</p>
                  <p className="text-xs text-foreground/45">{n.desc}</p>
                </div>
                <button className={cn("h-6 w-11 rounded-full transition-colors", n.on ? "bg-brand-danger" : "bg-slate-300")}>
                  <span className={cn("block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform", n.on && "translate-x-5")} />
                </button>
              </div>
            ))}
          </div>
        </AdminCard>
      )}

      {tab === "Finance" && (
        <AdminCard title="Finance settings">
          <div className="max-w-lg space-y-4">
            {[
              { label: "Minimum deposit (USD)", value: "10" },
              { label: "Minimum withdrawal (USD)", value: "10" },
              { label: "Large withdrawal threshold (USD)", value: "50000" },
              { label: "Max daily withdrawal (USD)", value: "100000" },
              { label: "Default spread markup (pips)", value: "0.2" },
            ].map((s) => (
              <div key={s.label}>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">{s.label}</label>
                <input defaultValue={s.value} type="number" className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-foreground focus:border-brand-danger dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
            ))}
            <button className="rounded-lg bg-brand-danger px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors">
              Save finance settings
            </button>
          </div>
        </AdminCard>
      )}
    </div>
  );
}
