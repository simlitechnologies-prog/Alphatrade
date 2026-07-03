import type { Metadata } from "next";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/marketing/page-hero";
import { Card, Badge } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join AlphaTrade Markets and help build the future of retail trading.",
};

const roles = [
  { title: "Senior Full-Stack Engineer", team: "Engineering", location: "Remote / London", type: "Full-time" },
  { title: "FX Analyst", team: "Research", location: "London", type: "Full-time" },
  { title: "Compliance Officer (EMEA)", team: "Legal & Compliance", location: "London", type: "Full-time" },
  { title: "UX Designer — Trading Platform", team: "Design", location: "Remote", type: "Full-time" },
  { title: "Customer Support Specialist", team: "Support", location: "Remote", type: "Full-time" },
  { title: "Data Engineer", team: "Engineering", location: "Remote", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Careers"
        title="Build the future of trading with us"
        description="We're a remote-first team of engineers, traders and designers on a mission to democratise access to global financial markets."
        icon={Briefcase}
      />

      <section className="bg-white py-16 dark:bg-background">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Open positions</h2>
          <div className="mt-8 space-y-4">
            {roles.map((role) => (
              <Card key={role.title} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display font-semibold text-foreground">{role.title}</h3>
                  <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-foreground/50">
                    <span className="flex items-center gap-1"><Briefcase size={12} />{role.team}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} />{role.location}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{role.type}</span>
                  </div>
                </div>
                <Badge tone="neutral" className="shrink-0">{role.team}</Badge>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-sm text-foreground/50">
            Don&apos;t see your role? Email{" "}
            <a href="mailto:careers@alphatrademarkets.com" className="text-brand-secondary hover:underline">
              careers@alphatrademarkets.com
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
