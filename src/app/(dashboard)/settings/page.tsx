"use client";

import { useState } from "react";
import { ShieldCheck, User, Bell, Smartphone } from "lucide-react";
import { WidgetCard } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TABS = ["Profile", "Security", "Notifications", "Devices"] as const;
type Tab = (typeof TABS)[number];

const tabIcons = { Profile: User, Security: ShieldCheck, Notifications: Bell, Devices: Smartphone };

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("Profile");

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Settings</h2>

      <div className="flex gap-2 flex-wrap">
        {TABS.map((t) => {
          const Icon = tabIcons[t];
          return (
            <button key={t} onClick={() => setTab(t)} className={cn("flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors", tab === t ? "bg-brand-secondary text-white" : "bg-white border border-slate-200 text-foreground/60 hover:text-foreground dark:bg-brand-primary/40 dark:border-slate-800")}>
              <Icon size={15} />{t}
            </button>
          );
        })}
      </div>

      {tab === "Profile" && (
        <WidgetCard title="Profile information">
          <div className="space-y-4 max-w-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-secondary text-2xl font-bold text-white">K</div>
              <div>
                <p className="font-semibold text-foreground">Kwame Mensah</p>
                <p className="text-sm text-foreground/50">Pro Account · Member since Jan 2025</p>
                <button className="mt-1 text-xs text-brand-secondary hover:underline">Change photo</button>
              </div>
            </div>
            {[["First name", "Kwame"], ["Last name", "Mensah"], ["Email", "kwame.mensah@example.com"], ["Phone", "+233 20 000 0000"], ["Country", "Ghana"]].map(([label, val]) => (
              <div key={label}>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">{label}</label>
                <input defaultValue={val} className="h-11 w-full rounded-lg border border-slate-200 bg-brand-muted px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-900" />
              </div>
            ))}
            <Button variant="primary" size="md">Save changes</Button>
          </div>
        </WidgetCard>
      )}

      {tab === "Security" && (
        <div className="space-y-4 max-w-lg">
          <WidgetCard title="Change password">
            <div className="space-y-3">
              {["Current password", "New password", "Confirm new password"].map((l) => (
                <div key={l}>
                  <label className="block text-xs font-medium text-foreground/50 mb-1.5">{l}</label>
                  <input type="password" className="h-11 w-full rounded-lg border border-slate-200 bg-brand-muted px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-900" />
                </div>
              ))}
              <Button variant="primary" size="md">Update password</Button>
            </div>
          </WidgetCard>
          <WidgetCard title="Two-factor authentication">
            <p className="text-sm text-foreground/60 mb-4">2FA is currently <span className="font-semibold text-brand-success">enabled</span> via authenticator app.</p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">View recovery codes</Button>
              <Button variant="danger" size="sm">Disable 2FA</Button>
            </div>
          </WidgetCard>
          <WidgetCard title="Session history">
            {[
              { device: "Chrome on macOS", location: "Accra, Ghana", time: "Active now", current: true },
              { device: "AlphaTrade iOS App", location: "Accra, Ghana", time: "2 hours ago", current: false },
              { device: "Chrome on Windows", location: "London, UK", time: "3 days ago", current: false },
            ].map((s) => (
              <div key={s.device} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0 dark:border-slate-800">
                <div>
                  <p className="text-sm font-medium text-foreground">{s.device}</p>
                  <p className="text-xs text-foreground/40">{s.location} · {s.time}</p>
                </div>
                {s.current ? <span className="text-xs text-brand-success font-medium">● This device</span> : <button className="text-xs text-brand-danger hover:underline">Revoke</button>}
              </div>
            ))}
          </WidgetCard>
        </div>
      )}

      {tab === "Notifications" && (
        <WidgetCard title="Notification preferences" className="max-w-lg">
          <div className="space-y-4">
            {[
              { label: "Price alerts", desc: "Get notified when price targets are hit", on: true },
              { label: "Order filled", desc: "Notify when a limit or stop order executes", on: true },
              { label: "Position P&L updates", desc: "Daily portfolio performance summary", on: false },
              { label: "Margin calls", desc: "Critical: always on", on: true },
              { label: "News and analysis", desc: "Market-moving news from our research desk", on: true },
              { label: "Promotional emails", desc: "Platform updates and feature announcements", on: false },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 dark:border-slate-800">
                <div>
                  <p className="text-sm font-medium text-foreground">{n.label}</p>
                  <p className="text-xs text-foreground/45">{n.desc}</p>
                </div>
                <button className={cn("h-6 w-11 rounded-full transition-colors", n.on ? "bg-brand-secondary" : "bg-slate-300")}>
                  <span className={cn("block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform", n.on && "translate-x-5")} />
                </button>
              </div>
            ))}
            <Button variant="primary" size="md">Save preferences</Button>
          </div>
        </WidgetCard>
      )}

      {tab === "Devices" && (
        <WidgetCard title="Trusted devices" className="max-w-lg">
          <div className="space-y-3">
            {[
              { name: "MacBook Pro 16\" (Chrome)", added: "Added Jun 10, 2026" },
              { name: "iPhone 15 Pro (AlphaTrade App)", added: "Added May 2, 2026" },
            ].map((d) => (
              <div key={d.name} className="flex items-center justify-between rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                <div>
                  <p className="text-sm font-medium text-foreground">{d.name}</p>
                  <p className="text-xs text-foreground/40">{d.added}</p>
                </div>
                <button className="text-xs text-brand-danger hover:underline">Remove</button>
              </div>
            ))}
          </div>
        </WidgetCard>
      )}
    </div>
  );
}
