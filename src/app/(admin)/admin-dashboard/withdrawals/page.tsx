"use client";

import { useState } from "react";
import { ArrowUpFromLine } from "lucide-react";
import { PageHeader, AdminCard, AdminStatCard, StatusBadge, ActionBtn, Th, Td } from "@/components/dashboard/admin-widgets";
import { formatCurrency } from "@/lib/utils";
import { transactions } from "@/data/dashboard";

const withdrawals = transactions.filter((t) => t.type === "withdrawal").map((t, i) => ({
  id: `w00${i + 1}`,
  userId: "u001",
  userName: "Kwame Mensah",
  amount: t.amount,
  currency: t.currency,
  method: t.method ?? "Bank transfer",
  status: t.status as "completed" | "pending" | "failed",
  createdAt: t.createdAt.slice(0, 10),
  reference: t.reference,
}));

const statusMap = {
  completed: { label: "Completed", class: "bg-green-50 text-brand-success" },
  pending: { label: "Pending", class: "bg-amber-50 text-brand-accent" },
  failed: { label: "Failed", class: "bg-red-50 text-brand-danger" },
};

export default function AdminWithdrawalsPage() {
  const [items, setItems] = useState(withdrawals);
  const pendingCount = items.filter((w) => w.status === "pending").length;
  const totalPaid = items.filter((w) => w.status === "completed").reduce((s, w) => s + w.amount, 0);

  function approve(id: string) {
    setItems((prev) => prev.map((w) => w.id === id ? { ...w, status: "completed" as const } : w));
  }
  function reject(id: string) {
    setItems((prev) => prev.map((w) => w.id === id ? { ...w, status: "failed" as const } : w));
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Withdrawals" sub="Outgoing withdrawal requests" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <AdminStatCard label="Total paid out" value={formatCurrency(totalPaid)} icon={ArrowUpFromLine} tone="green" />
        <AdminStatCard label="Total requests" value={items.length} icon={ArrowUpFromLine} tone="blue" />
        <AdminStatCard label="Pending approval" value={pendingCount} icon={ArrowUpFromLine} tone="amber" alert={pendingCount > 0} />
        <AdminStatCard label="Failed" value={items.filter((w) => w.status === "failed").length} icon={ArrowUpFromLine} tone="red" />
      </div>
      <AdminCard title="All withdrawals">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <Th>Reference</Th><Th>User</Th><Th>Amount</Th><Th>Method</Th>
                <Th>Status</Th><Th>Date</Th><Th>Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {items.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <Td className="font-mono text-xs text-foreground/50">{w.reference}</Td>
                  <Td className="font-semibold dark:text-white">{w.userName}</Td>
                  <Td className="tabular font-bold text-brand-danger">−{formatCurrency(w.amount)}</Td>
                  <Td>{w.method}</Td>
                  <Td><StatusBadge status={w.status} map={statusMap} /></Td>
                  <Td className="text-foreground/50">{w.createdAt}</Td>
                  <Td>
                    {w.status === "pending" && (
                      <div className="flex gap-1.5">
                        <ActionBtn label="Approve" tone="green" onClick={() => approve(w.id)} />
                        <ActionBtn label="Reject" tone="red" onClick={() => reject(w.id)} />
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
