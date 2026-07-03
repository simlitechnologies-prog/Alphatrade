"use client";

import { useState } from "react";
import { Check, X, AlertCircle, Eye } from "lucide-react";
import { PageHeader, AdminCard, StatusBadge, Th, Td, AdminStatCard } from "@/components/dashboard/admin-widgets";
import { ShieldCheck } from "lucide-react";
import { kycQueue } from "@/data/admin";
import type { KYCApplication } from "@/data/admin";
import { cn } from "@/lib/utils";

const kycStatusMap = {
  pending: { label: "Pending", class: "bg-amber-50 text-brand-accent" },
  approved: { label: "Approved", class: "bg-green-50 text-brand-success" },
  rejected: { label: "Rejected", class: "bg-red-50 text-brand-danger" },
  needs_info: { label: "Needs info", class: "bg-blue-50 text-brand-secondary" },
};

const riskMap = {
  low: "bg-green-50 text-brand-success",
  medium: "bg-amber-50 text-brand-accent",
  high: "bg-red-50 text-brand-danger",
};

export default function KYCPage() {
  const [apps, setApps] = useState(kycQueue);
  const [selected, setSelected] = useState<KYCApplication | null>(null);

  const pending = apps.filter((a) => a.status === "pending" || a.status === "needs_info");
  const approved = apps.filter((a) => a.status === "approved").length;
  const rejected = apps.filter((a) => a.status === "rejected").length;

  function updateStatus(id: string, status: KYCApplication["status"]) {
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
    setSelected(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="KYC Verification" sub="Know Your Customer identity review queue" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <AdminStatCard label="Total submitted" value={apps.length} icon={ShieldCheck} tone="blue" />
        <AdminStatCard label="Pending review" value={pending.length} icon={ShieldCheck} tone="amber" alert={pending.length > 0} />
        <AdminStatCard label="Approved" value={approved} icon={ShieldCheck} tone="green" />
        <AdminStatCard label="Rejected" value={rejected} icon={ShieldCheck} tone="red" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <AdminCard title="Review queue" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <Th>Applicant</Th><Th>Country</Th><Th>ID type</Th>
                  <Th>Risk</Th><Th>Submitted</Th><Th>Status</Th><Th>Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {apps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <Td>
                      <p className="font-semibold dark:text-white">{app.userName}</p>
                      <p className="text-xs text-foreground/45">{app.email}</p>
                    </Td>
                    <Td>{app.country}</Td>
                    <Td>{app.idType}</Td>
                    <Td>
                      <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase", riskMap[app.risk])}>
                        {app.risk}
                      </span>
                    </Td>
                    <Td className="text-foreground/50">{app.submittedAt}</Td>
                    <Td><StatusBadge status={app.status} map={kycStatusMap} /></Td>
                    <Td>
                      <div className="flex gap-1.5">
                        <button onClick={() => setSelected(app)} className="flex h-7 w-7 items-center justify-center rounded bg-blue-50 text-brand-secondary hover:bg-brand-secondary hover:text-white transition-colors">
                          <Eye size={13} />
                        </button>
                        {(app.status === "pending" || app.status === "needs_info") && (
                          <>
                            <button onClick={() => updateStatus(app.id, "approved")} className="flex h-7 w-7 items-center justify-center rounded bg-green-50 text-brand-success hover:bg-brand-success hover:text-white transition-colors">
                              <Check size={13} />
                            </button>
                            <button onClick={() => updateStatus(app.id, "rejected")} className="flex h-7 w-7 items-center justify-center rounded bg-red-50 text-brand-danger hover:bg-brand-danger hover:text-white transition-colors">
                              <X size={13} />
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

        {/* Detail panel */}
        <AdminCard title={selected ? `Review — ${selected.userName}` : "Select application"}>
          {!selected ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-foreground/30">
              <ShieldCheck size={32} className="mb-3 opacity-30" />
              <p className="text-sm">Click a row to review an application</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2 text-sm">
                {[
                  ["Full name", selected.userName],
                  ["Email", selected.email],
                  ["Country", selected.country],
                  ["ID type", selected.idType],
                  ["Risk level", selected.risk.toUpperCase()],
                  ["Submitted", selected.submittedAt],
                  ["Status", selected.status.replace("_", " ")],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                    <span className="text-foreground/50">{k}</span>
                    <span className="font-medium text-foreground dark:text-white">{v}</span>
                  </div>
                ))}
              </div>

              {/* Document preview placeholder */}
              <div className="flex h-32 items-center justify-center rounded-lg bg-slate-100 text-sm text-foreground/30 dark:bg-slate-800">
                Document preview (API integration)
              </div>

              {(selected.status === "pending" || selected.status === "needs_info") && (
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => updateStatus(selected.id, "approved")} className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-success py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition-colors">
                    <Check size={15} /> Approve
                  </button>
                  <button onClick={() => updateStatus(selected.id, "rejected")} className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-danger py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors">
                    <X size={15} /> Reject
                  </button>
                  <button onClick={() => updateStatus(selected.id, "needs_info")} className="col-span-2 flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-foreground hover:bg-slate-50 transition-colors dark:border-slate-700 dark:text-white dark:hover:bg-slate-800">
                    <AlertCircle size={15} /> Request more info
                  </button>
                </div>
              )}
            </div>
          )}
        </AdminCard>
      </div>
    </div>
  );
}
