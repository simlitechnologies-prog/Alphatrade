"use client";

import { useState } from "react";
import { Bell, Send } from "lucide-react";
import { PageHeader, AdminCard, AdminStatCard } from "@/components/dashboard/admin-widgets";

const sentNotifications = [
  { id: "nb1", title: "Platform maintenance scheduled", body: "Scheduled maintenance on July 3 from 02:00–04:00 UTC.", audience: "All users", sentAt: "2026-06-29 14:00", delivered: 2148234 },
  { id: "nb2", title: "New asset: VOO ETF now available", body: "Vanguard S&P 500 ETF is now tradeable on AlphaTrade.", audience: "Pro + Elite", sentAt: "2026-06-25 10:00", delivered: 842100 },
  { id: "nb3", title: "Margin requirement update", body: "Margin requirements for crypto instruments updated effective July 1.", audience: "All users", sentAt: "2026-06-20 09:00", delivered: 2100000 },
];

export default function NotificationsPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("All users");
  const [sent, setSent] = useState(false);

  function sendNotification() {
    if (!title.trim() || !body.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setTitle(""); setBody(""); }, 3000);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" sub="Broadcast messages to traders" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <AdminStatCard label="Total sent" value={sentNotifications.length} icon={Bell} tone="blue" />
        <AdminStatCard label="Avg. delivery" value="2.1M" icon={Bell} tone="green" />
        <AdminStatCard label="Open rate" value="68%" icon={Bell} tone="amber" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AdminCard title="Send notification">
          {sent ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-brand-success mb-3">
                <Bell size={24} />
              </div>
              <p className="font-semibold text-foreground dark:text-white">Notification sent!</p>
              <p className="text-sm text-foreground/50 mt-1">Delivering to {audience}…</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Notification title…" className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">Message body</label>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} placeholder="Notification content…" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-foreground focus:border-brand-secondary resize-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">Audience</label>
                <select value={audience} onChange={(e) => setAudience(e.target.value)} className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-foreground dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                  <option>All users</option>
                  <option>Pro + Elite</option>
                  <option>Elite only</option>
                  <option>Pending KYC</option>
                  <option>Inactive (30+ days)</option>
                </select>
              </div>
              <button onClick={sendNotification} className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-secondary py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                <Send size={15} /> Send to {audience}
              </button>
            </div>
          )}
        </AdminCard>

        <AdminCard title="Recently sent">
          <div className="space-y-4">
            {sentNotifications.map((n) => (
              <div key={n.id} className="rounded-lg border border-slate-100 p-3 dark:border-slate-800">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-sm text-foreground dark:text-white">{n.title}</p>
                  <span className="shrink-0 text-xs text-foreground/40">{n.sentAt}</span>
                </div>
                <p className="mt-1 text-xs text-foreground/55">{n.body}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-foreground/40">
                  <span>Audience: {n.audience}</span>
                  <span>Delivered: {n.delivered.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
