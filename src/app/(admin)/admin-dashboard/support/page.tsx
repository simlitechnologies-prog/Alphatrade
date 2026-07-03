"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { PageHeader, AdminCard, AdminStatCard, StatusBadge, ActionBtn, Th, Td } from "@/components/dashboard/admin-widgets";
import { adminTickets } from "@/data/admin";
import type { } from "@/data/admin";
import { cn } from "@/lib/utils";

const statusMap = {
  open: { label: "Open", class: "bg-red-50 text-brand-danger" },
  pending: { label: "Pending", class: "bg-amber-50 text-brand-accent" },
  resolved: { label: "Resolved", class: "bg-green-50 text-brand-success" },
  closed: { label: "Closed", class: "bg-slate-100 text-slate-500" },
};

const priorityColor: Record<string, string> = {
  urgent: "bg-red-50 text-brand-danger",
  high: "bg-orange-50 text-orange-600",
  normal: "bg-slate-100 text-slate-600",
  low: "bg-green-50 text-brand-success",
};

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState(adminTickets);
  const open = tickets.filter((t) => t.status === "open").length;
  const urgent = tickets.filter((t) => t.priority === "urgent").length;

  function resolve(id: string) {
    setTickets((prev) => prev.map((t) => t.id === id ? { ...t, status: "resolved" as const } : t));
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Support Tickets" sub="Customer support queue" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <AdminStatCard label="Total tickets" value={tickets.length} icon={MessageSquare} tone="blue" />
        <AdminStatCard label="Open" value={open} icon={MessageSquare} tone="red" alert={open > 0} />
        <AdminStatCard label="Urgent" value={urgent} icon={MessageSquare} tone="red" alert={urgent > 0} />
        <AdminStatCard label="Resolved" value={tickets.filter((t) => t.status === "resolved").length} icon={MessageSquare} tone="green" />
      </div>
      <AdminCard title="All tickets">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <Th>ID</Th><Th>User</Th><Th>Subject</Th><Th>Category</Th>
                <Th>Priority</Th><Th>Status</Th><Th>Assigned</Th><Th>Created</Th><Th>Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <Td className="font-mono text-xs text-foreground/50">{t.id}</Td>
                  <Td className="font-semibold dark:text-white">{t.userName}</Td>
                  <Td className="max-w-[200px] truncate">{t.subject}</Td>
                  <Td>{t.category}</Td>
                  <Td>
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize", priorityColor[t.priority])}>
                      {t.priority}
                    </span>
                  </Td>
                  <Td><StatusBadge status={t.status} map={statusMap} /></Td>
                  <Td className="text-foreground/50">{t.assignedTo ?? "Unassigned"}</Td>
                  <Td className="text-foreground/50">{t.createdAt}</Td>
                  <Td>
                    <div className="flex gap-1.5">
                      <ActionBtn label="Reply" tone="blue" />
                      {t.status === "open" && <ActionBtn label="Resolve" tone="green" onClick={() => resolve(t.id)} />}
                    </div>
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
