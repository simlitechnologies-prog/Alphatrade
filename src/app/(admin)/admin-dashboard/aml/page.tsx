"use client";

import { useState } from "react";
import { AlertTriangle, FileSearch, CheckCircle } from "lucide-react";
import { PageHeader, AdminCard, AdminStatCard, StatusBadge, Th, Td } from "@/components/dashboard/admin-widgets";
import { amlFlags } from "@/data/admin";
import type { AMLFlag } from "@/data/admin";
import { cn } from "@/lib/utils";

const statusMap = {
  open: { label: "Open", class: "bg-red-50 text-brand-danger" },
  under_review: { label: "Under review", class: "bg-amber-50 text-brand-accent" },
  resolved: { label: "Resolved", class: "bg-green-50 text-brand-success" },
  escalated: { label: "Escalated", class: "bg-purple-50 text-purple-600" },
};

const severityColor: Record<string, string> = {
  low: "bg-slate-100 text-slate-600",
  medium: "bg-amber-50 text-brand-accent",
  high: "bg-orange-50 text-orange-600",
  critical: "bg-red-50 text-brand-danger",
};

export default function AMLPage() {
  const [flags, setFlags] = useState(amlFlags);
  const [selected, setSelected] = useState<AMLFlag | null>(null);

  const openCount = flags.filter((f) => f.status === "open").length;
  const criticalCount = flags.filter((f) => f.severity === "critical").length;
  const escalatedCount = flags.filter((f) => f.status === "escalated").length;

  function update(id: string, status: AMLFlag["status"]) {
    setFlags((prev) => prev.map((f) => f.id === id ? { ...f, status } : f));
    if (selected?.id === id) setSelected((s) => s ? { ...s, status } : null);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="AML Compliance" sub="Anti-Money Laundering monitoring and case management" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <AdminStatCard label="Total flags" value={flags.length} icon={AlertTriangle} tone="amber" />
        <AdminStatCard label="Open" value={openCount} icon={AlertTriangle} tone="red" alert={openCount > 0} />
        <AdminStatCard label="Critical" value={criticalCount} icon={AlertTriangle} tone="red" alert={criticalCount > 0} />
        <AdminStatCard label="Escalated" value={escalatedCount} icon={AlertTriangle} tone="amber" />
      </div>

      {/* Alert banner for critical flags */}
      {criticalCount > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-brand-danger/30 bg-red-50 p-4 dark:bg-red-950/20">
          <AlertTriangle size={18} className="shrink-0 text-brand-danger" />
          <p className="text-sm font-medium text-brand-danger">
            {criticalCount} critical AML flag{criticalCount > 1 ? "s require" : " requires"} immediate attention. SAR filing may be required.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <AdminCard title="Active flags" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <Th>User</Th><Th>Flag type</Th><Th>Severity</Th>
                  <Th>Status</Th><Th>Raised</Th><Th>Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {flags.map((flag) => (
                  <tr key={flag.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => setSelected(flag)}>
                    <Td>
                      <p className="font-semibold dark:text-white">{flag.userName}</p>
                      <p className="text-xs text-foreground/45">{flag.userId}</p>
                    </Td>
                    <Td>{flag.flagType}</Td>
                    <Td>
                      <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold uppercase", severityColor[flag.severity])}>
                        {flag.severity}
                      </span>
                    </Td>
                    <Td><StatusBadge status={flag.status} map={statusMap} /></Td>
                    <Td className="text-foreground/50">{flag.createdAt}</Td>
                    <Td>
                      <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {flag.status === "open" && (
                          <button onClick={() => update(flag.id, "under_review")} className="rounded px-2 py-1 text-xs font-medium bg-amber-50 text-brand-accent hover:bg-brand-accent hover:text-white transition-colors">
                            Review
                          </button>
                        )}
                        {flag.status === "under_review" && (
                          <>
                            <button onClick={() => update(flag.id, "resolved")} className="rounded px-2 py-1 text-xs font-medium bg-green-50 text-brand-success hover:bg-brand-success hover:text-white transition-colors">
                              Resolve
                            </button>
                            <button onClick={() => update(flag.id, "escalated")} className="rounded px-2 py-1 text-xs font-medium bg-red-50 text-brand-danger hover:bg-brand-danger hover:text-white transition-colors">
                              Escalate
                            </button>
                          </>
                        )}
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>

        <AdminCard title={selected ? `Flag — ${selected.flagType}` : "Select flag"}>
          {!selected ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-foreground/30">
              <FileSearch size={32} className="mb-3 opacity-30" />
              <p className="text-sm">Click a row to view flag details</p>
            </div>
          ) : (
            <div className="space-y-4 text-sm">
              <div className="space-y-2">
                {[
                  ["Flag ID", selected.id],
                  ["User", selected.userName],
                  ["User ID", selected.userId],
                  ["Flag type", selected.flagType],
                  ["Severity", selected.severity.toUpperCase()],
                  ["Status", selected.status.replace("_", " ")],
                  ["Raised", selected.createdAt],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                    <span className="text-foreground/50">{k}</span>
                    <span className="font-medium text-foreground dark:text-white">{v}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-medium text-foreground/50 mb-1">Description</p>
                <p className="text-sm text-foreground/70 dark:text-slate-400">{selected.description}</p>
              </div>
              <textarea
                rows={3}
                placeholder="Add investigation notes…"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-foreground resize-none focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => update(selected.id, "resolved")} className="flex items-center justify-center gap-1 rounded-lg bg-brand-success py-2 text-xs font-semibold text-white">
                  <CheckCircle size={13} /> Resolve
                </button>
                <button onClick={() => update(selected.id, "escalated")} className="flex items-center justify-center gap-1 rounded-lg bg-brand-danger py-2 text-xs font-semibold text-white">
                  <AlertTriangle size={13} /> Escalate / SAR
                </button>
              </div>
            </div>
          )}
        </AdminCard>
      </div>
    </div>
  );
}
