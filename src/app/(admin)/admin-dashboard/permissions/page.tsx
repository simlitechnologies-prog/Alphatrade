import { PageHeader, AdminCard } from "@/components/dashboard/admin-widgets";
import { adminRoles } from "@/data/admin";
import { cn } from "@/lib/utils";

const allPermissions = [
  { group: "Users", perms: ["users.read", "users.edit", "users.suspend", "users.delete"] },
  { group: "KYC", perms: ["kyc.read", "kyc.approve", "kyc.reject"] },
  { group: "AML", perms: ["aml.read", "aml.flag", "aml.escalate", "aml.resolve"] },
  { group: "Finance", perms: ["deposits.read", "deposits.approve", "withdrawals.read", "withdrawals.approve"] },
  { group: "Trading", perms: ["trades.read", "orders.read", "positions.read"] },
  { group: "Content", perms: ["news.read", "news.write", "news.publish", "news.delete"] },
  { group: "Support", perms: ["tickets.read", "tickets.reply", "tickets.close"] },
  { group: "Admin", perms: ["admins.read", "admins.create", "roles.manage", "settings.edit"] },
  { group: "Reports", perms: ["reports.read", "reports.generate"] },
];

export default function PermissionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Permissions Matrix" sub="Role-to-permission mapping across the admin panel" />
      <AdminCard title="Permission matrix">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="pb-3 pr-4 text-left font-medium text-foreground/50">Permission</th>
                {adminRoles.map((r) => (
                  <th key={r.id} className="pb-3 pr-4 text-center font-medium text-foreground/70 dark:text-slate-300 whitespace-nowrap">
                    {r.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allPermissions.map((group) => (
                <>
                  <tr key={group.group}>
                    <td colSpan={adminRoles.length + 1} className="pt-4 pb-1 font-semibold text-xs uppercase tracking-wider text-foreground/40 dark:text-slate-500">
                      {group.group}
                    </td>
                  </tr>
                  {group.perms.map((perm) => (
                    <tr key={perm} className="border-b border-slate-50 dark:border-slate-800/50">
                      <td className="py-2 pr-4 font-mono text-xs text-foreground/60 dark:text-slate-400">{perm}</td>
                      {adminRoles.map((role) => {
                        const has = role.permissions.includes("all") || role.permissions.includes(perm);
                        return (
                          <td key={role.id} className="py-2 pr-4 text-center">
                            <span className={cn("inline-flex h-5 w-5 items-center justify-center rounded text-xs font-bold mx-auto", has ? "bg-green-50 text-brand-success" : "text-foreground/20")}>
                              {has ? "✓" : "—"}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
