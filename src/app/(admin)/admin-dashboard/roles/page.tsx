import { PageHeader, AdminCard } from "@/components/dashboard/admin-widgets";
import { adminRoles } from "@/data/admin";
import { KeyRound, Users } from "lucide-react";

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles & Permissions"
        sub="Manage admin access levels"
        action={
          <button className="flex items-center gap-2 rounded-lg bg-brand-secondary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            <KeyRound size={15} /> Create role
          </button>
        }
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {adminRoles.map((role) => (
          <AdminCard key={role.id} title={role.name} action={
            <div className="flex items-center gap-1 text-foreground/50">
              <Users size={13} />
              <span>{role.userCount} admin{role.userCount !== 1 ? "s" : ""}</span>
            </div>
          }>
            <p className="text-sm text-foreground/60 mb-4">{role.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {role.permissions.map((p) => (
                <span key={p} className="rounded-full bg-brand-secondary/10 px-2.5 py-1 text-xs font-medium text-brand-secondary">
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-slate-50 transition-colors dark:border-slate-700 dark:text-white dark:hover:bg-slate-800">
                Edit role
              </button>
              {role.name !== "Super Admin" && (
                <button className="rounded-lg border border-brand-danger/30 px-3 py-1.5 text-xs font-medium text-brand-danger hover:bg-red-50 transition-colors">
                  Delete
                </button>
              )}
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
