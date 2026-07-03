import { PageHeader, AdminCard, Th, Td, StatusBadge } from "@/components/dashboard/admin-widgets";
import { formatCurrency } from "@/lib/utils";
import { adminUsers } from "@/data/admin";

const tierMap = {
  starter: { label: "Starter", class: "bg-slate-100 text-slate-600" },
  pro: { label: "Pro", class: "bg-blue-50 text-brand-secondary" },
  elite: { label: "Elite", class: "bg-amber-50 text-brand-accent" },
};

export default function AccountsPage() {
  const totalBalance = adminUsers.reduce((s, u) => s + u.balance, 0);
  return (
    <div className="space-y-6">
      <PageHeader title="Accounts" sub={`${adminUsers.length} accounts · ${formatCurrency(totalBalance)} total client balance`} />
      <AdminCard title="Account overview">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <Th>User</Th><Th>Tier</Th><Th>Balance</Th><Th>Country</Th><Th>KYC</Th><Th>Joined</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {adminUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <Td>
                    <p className="font-semibold dark:text-white">{u.name}</p>
                    <p className="text-xs text-foreground/45">{u.email}</p>
                  </Td>
                  <Td><StatusBadge status={u.accountTier} map={tierMap} /></Td>
                  <Td className="tabular font-semibold">{formatCurrency(u.balance)}</Td>
                  <Td>{u.country}</Td>
                  <Td className="capitalize text-foreground/60">{u.kycStatus.replace("_", " ")}</Td>
                  <Td className="text-foreground/50">{u.joinedAt}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
