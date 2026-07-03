import { PageHeader, AdminCard, AdminStatCard } from "@/components/dashboard/admin-widgets";
import { FileText, Download } from "lucide-react";
import { adminStats } from "@/data/admin";

const reports = [
  { id: "r1", name: "Monthly P&L Summary", description: "Aggregated profit/loss across all trader accounts", period: "June 2026", format: "PDF/CSV" },
  { id: "r2", name: "KYC Compliance Report", description: "KYC status, submission rates and rejection reasons", period: "June 2026", format: "PDF" },
  { id: "r3", name: "AML Transaction Report", description: "Flagged transactions and SAR filings summary", period: "June 2026", format: "PDF" },
  { id: "r4", name: "Revenue & Fee Report", description: "Spread revenue, swap fees, and commission breakdown", period: "June 2026", format: "XLSX" },
  { id: "r5", name: "User Acquisition Report", description: "New registrations, activation rates, and churn", period: "June 2026", format: "PDF/CSV" },
  { id: "r6", name: "Deposit & Withdrawal Report", description: "All fund movements with method and status breakdown", period: "June 2026", format: "XLSX" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports" sub="Generate and download platform reports" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <AdminStatCard label="Total users" value={adminStats.totalUsers.toLocaleString()} icon={FileText} tone="blue" />
        <AdminStatCard label="Total deposited" value={`$${(adminStats.totalDeposited / 1e9).toFixed(1)}B`} icon={FileText} tone="green" />
        <AdminStatCard label="Total withdrawn" value={`$${(adminStats.totalWithdrawn / 1e9).toFixed(1)}B`} icon={FileText} tone="amber" />
        <AdminStatCard label="Daily volume" value={`$${(adminStats.dailyVolume / 1e9).toFixed(2)}B`} icon={FileText} tone="blue" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {reports.map((r) => (
          <AdminCard key={r.id} title={r.name}>
            <p className="text-sm text-foreground/60 mb-4">{r.description}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-foreground/40">Period: {r.period}</p>
                <p className="text-xs text-foreground/40">Format: {r.format}</p>
              </div>
              <button className="flex items-center gap-2 rounded-lg bg-brand-secondary px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 transition-colors">
                <Download size={13} /> Generate
              </button>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
