import { PageHeader, AdminCard, Th, Td, StatusBadge } from "@/components/dashboard/admin-widgets";
import { Plus } from "lucide-react";

const admins = [
  { id: "a1", name: "Alexandra Chen", email: "a.chen@alphatrademarkets.com", role: "Super Admin", status: "active", lastLogin: "2026-06-30", twoFA: true },
  { id: "a2", name: "Sarah Johnson", email: "s.johnson@alphatrademarkets.com", role: "Compliance Officer", status: "active", lastLogin: "2026-06-30", twoFA: true },
  { id: "a3", name: "Mike Thompson", email: "m.thompson@alphatrademarkets.com", role: "Support Agent", status: "active", lastLogin: "2026-06-29", twoFA: true },
  { id: "a4", name: "Priya Nair", email: "p.nair@alphatrademarkets.com", role: "Compliance Officer", status: "active", lastLogin: "2026-06-28", twoFA: true },
  { id: "a5", name: "James Osei", email: "j.osei@alphatrademarkets.com", role: "Finance Manager", status: "active", lastLogin: "2026-06-30", twoFA: true },
  { id: "a6", name: "Emma Wilson", email: "e.wilson@alphatrademarkets.com", role: "Support Agent", status: "inactive", lastLogin: "2026-06-15", twoFA: false },
];

const statusMap = {
  active: { label: "Active", class: "bg-green-50 text-brand-success" },
  inactive: { label: "Inactive", class: "bg-slate-100 text-slate-500" },
};

export default function AdminsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Users"
        sub={`${admins.length} administrators`}
        action={
          <button className="flex items-center gap-2 rounded-lg bg-brand-danger px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors">
            <Plus size={15} /> Add admin
          </button>
        }
      />
      <AdminCard title="All administrators">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <Th>Admin</Th><Th>Role</Th><Th>Status</Th>
                <Th>2FA</Th><Th>Last login</Th><Th>Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {admins.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <Td>
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-secondary/10 text-sm font-bold text-brand-secondary">
                        {a.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold dark:text-white">{a.name}</p>
                        <p className="text-xs text-foreground/45">{a.email}</p>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <span className="rounded-full bg-brand-secondary/10 px-2.5 py-0.5 text-xs font-medium text-brand-secondary">
                      {a.role}
                    </span>
                  </Td>
                  <Td><StatusBadge status={a.status} map={statusMap} /></Td>
                  <Td>
                    <span className={a.twoFA ? "text-brand-success text-xs font-medium" : "text-brand-danger text-xs font-medium"}>
                      {a.twoFA ? "✓ Enabled" : "✗ Disabled"}
                    </span>
                  </Td>
                  <Td className="text-foreground/50">{a.lastLogin}</Td>
                  <Td>
                    <div className="flex gap-1.5">
                      <button className="rounded px-2.5 py-1 text-xs font-medium bg-slate-100 text-foreground hover:bg-slate-200 transition-colors dark:bg-slate-800 dark:text-white">Edit</button>
                      {a.name !== "Alexandra Chen" && (
                        <button className="rounded px-2.5 py-1 text-xs font-medium bg-red-50 text-brand-danger hover:bg-brand-danger hover:text-white transition-colors">Revoke</button>
                      )}
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
