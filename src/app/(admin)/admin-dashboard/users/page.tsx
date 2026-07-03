"use client";

import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { PageHeader, AdminCard, StatusBadge, ActionBtn, Th, Td } from "@/components/dashboard/admin-widgets";
import { formatCurrency, cn } from "@/lib/utils";
import { adminUsers } from "@/data/admin";

const statusMap = {
  active: { label: "Active", class: "bg-green-50 text-brand-success" },
  suspended: { label: "Suspended", class: "bg-amber-50 text-brand-accent" },
  pending_kyc: { label: "Pending KYC", class: "bg-blue-50 text-brand-secondary" },
  banned: { label: "Banned", class: "bg-red-50 text-brand-danger" },
};

const kycMap = {
  verified: { label: "Verified", class: "bg-green-50 text-brand-success" },
  pending: { label: "Pending", class: "bg-amber-50 text-brand-accent" },
  rejected: { label: "Rejected", class: "bg-red-50 text-brand-danger" },
  not_submitted: { label: "Not submitted", class: "bg-slate-100 text-slate-500" },
};

const tierMap: Record<string, string> = {
  starter: "bg-slate-100 text-slate-600",
  pro: "bg-blue-50 text-brand-secondary",
  elite: "bg-amber-50 text-brand-accent",
};

export default function UsersPage() {
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [users, setUsers] = useState(adminUsers);

  const filtered = users.filter((u) => {
    const q = query.toLowerCase();
    const matchQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.includes(q);
    const matchS = filterStatus === "all" || u.status === filterStatus;
    return matchQ && matchS;
  });

  return (
    <div>
      <PageHeader
        title="Users"
        sub={`${users.length.toLocaleString()} registered accounts`}
        action={
          <button className="flex items-center gap-2 rounded-lg bg-brand-secondary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            <UserPlus size={15} /> Add user
          </button>
        }
      />

      <AdminCard title="All users">
        {/* Filters */}
        <div className="mb-4 flex flex-wrap gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, ID…"
              className="h-9 w-64 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-foreground placeholder:text-foreground/40 focus:border-brand-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div className="flex gap-1.5">
            {["all", "active", "suspended", "pending_kyc", "banned"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={cn("rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors", filterStatus === s ? "bg-brand-secondary text-white" : "bg-slate-100 text-foreground/60 hover:text-foreground dark:bg-slate-800 dark:text-slate-400")}
              >
                {s === "all" ? "All" : s.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <Th>ID</Th><Th>Name</Th><Th>Email</Th><Th>Country</Th>
                <Th>Tier</Th><Th>Balance</Th><Th>Status</Th><Th>KYC</Th>
                <Th>Joined</Th><Th>Last login</Th><Th>Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <Td className="font-mono text-xs text-foreground/50">{user.id}</Td>
                  <Td className="font-semibold dark:text-white">{user.name}</Td>
                  <Td className="text-foreground/60 dark:text-slate-400">{user.email}</Td>
                  <Td>{user.country}</Td>
                  <Td>
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase", tierMap[user.accountTier])}>
                      {user.accountTier}
                    </span>
                  </Td>
                  <Td className="tabular font-medium">{formatCurrency(user.balance)}</Td>
                  <Td><StatusBadge status={user.status} map={statusMap} /></Td>
                  <Td><StatusBadge status={user.kycStatus} map={kycMap} /></Td>
                  <Td className="text-foreground/50">{user.joinedAt}</Td>
                  <Td className="text-foreground/50">{user.lastLogin}</Td>
                  <Td>
                    <div className="flex gap-1.5">
                      <ActionBtn label="View" tone="blue" />
                      {user.status === "active"
                        ? <ActionBtn label="Suspend" tone="amber" onClick={() => setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, status: "suspended" as const } : u))} />
                        : <ActionBtn label="Activate" tone="green" onClick={() => setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, status: "active" as const } : u))} />
                      }
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-foreground/40">No users match your search.</p>
          )}
        </div>
      </AdminCard>
    </div>
  );
}
