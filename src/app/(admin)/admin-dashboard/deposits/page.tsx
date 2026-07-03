"use client";

import { useState } from "react";
import { ArrowDownToLine } from "lucide-react";
import { PageHeader, AdminCard, AdminStatCard, StatusBadge, ActionBtn, Th, Td } from "@/components/dashboard/admin-widgets";
import { formatCurrency } from "@/lib/utils";
import { adminDeposits } from "@/data/admin";
import type { } from "@/data/admin";

const statusMap = {
  completed: { label: "Completed", class: "bg-green-50 text-brand-success" },
  pending: { label: "Pending", class: "bg-amber-50 text-brand-accent" },
  failed: { label: "Failed", class: "bg-red-50 text-brand-danger" },
  reviewing: { label: "Reviewing", class: "bg-blue-50 text-brand-secondary" },
};

export default function AdminDepositsPage() {
  const [deposits, setDeposits] = useState(adminDeposits);
  const totalVolume = deposits.filter((d) => d.status === "completed").reduce((s, d) => s + d.amount, 0);
  const pending = deposits.filter((d) => d.status === "pending" || d.status === "reviewing").length;

  function approve(id: string) {
    setDeposits((prev) => prev.map((d) => d.id === id ? { ...d, status: "completed" as const } : d));
  }
  function reject(id: string) {
    setDeposits((prev) => prev.map((d) => d.id === id ? { ...d, status: "failed" as const } : d));
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Deposits" sub="All incoming deposits across the platform" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <AdminStatCard label="Total volume" value={formatCurrency(totalVolume)} icon={ArrowDownToLine} tone="green" />
        <AdminStatCard label="Total deposits" value={deposits.length} icon={ArrowDownToLine} tone="blue" />
        <AdminStatCard label="Pending review" value={pending} icon={ArrowDownToLine} tone="amber" alert={pending > 0} />
        <AdminStatCard label="Failed" value={deposits.filter((d) => d.status === "failed").length} icon={ArrowDownToLine} tone="red" />
      </div>
      <AdminCard title="All deposits">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <Th>Reference</Th><Th>User</Th><Th>Amount</Th><Th>Currency</Th>
                <Th>Method</Th><Th>Status</Th><Th>Date</Th><Th>Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {deposits.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <Td className="font-mono text-xs text-foreground/50">{d.reference}</Td>
                  <Td className="font-semibold dark:text-white">{d.userName}</Td>
                  <Td className="tabular font-bold text-brand-success">+{formatCurrency(d.amount)}</Td>
                  <Td>{d.currency}</Td>
                  <Td>{d.method}</Td>
                  <Td><StatusBadge status={d.status} map={statusMap} /></Td>
                  <Td className="text-foreground/50">{d.createdAt}</Td>
                  <Td>
                    {(d.status === "pending" || d.status === "reviewing") && (
                      <div className="flex gap-1.5">
                        <ActionBtn label="Approve" tone="green" onClick={() => approve(d.id)} />
                        <ActionBtn label="Reject" tone="red" onClick={() => reject(d.id)} />
                      </div>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
