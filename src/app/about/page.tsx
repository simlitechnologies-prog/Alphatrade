import type { Metadata } from "next";
import { Info } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/marketing/page-hero";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About AlphaTrade Markets",
  description: "Learn about our mission, our team and the values that guide AlphaTrade Markets.",
};

const values = [
  { title: "Transparency", body: "We publish our spreads, fees and execution stats. No fine print, no surprises." },
  { title: "Security first", body: "Client funds segregated. 256-bit encryption. Biometric auth. These are baselines, not selling points." },
  { title: "Education over hype", body: "We want you to understand what you're trading. That's why the Academy is free and built by our research desk." },
  { title: "Speed matters", body: "Sub-50ms average execution because every millisecond can change your fill price." },
];

const team = [
  { name: "Alexandra Chen", role: "Chief Executive Officer", bio: "15 years in institutional FX trading at Goldman Sachs and Barclays before co-founding AlphaTrade." },
  { name: "Marcus Obi", role: "Chief Technology Officer", bio: "Ex-Google infrastructure engineer with deep expertise in low-latency trading systems." },
  { name: "Priya Nair", role: "Chief Risk Officer", bio: "Former regulator with 12 years in financial compliance across EMEA and APAC jurisdictions." },
  { name: "James Mensah", role: "Head of Markets", bio: "Macro trader with a focus on emerging market currencies and West African equities." },
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="About us"
        title="Built by traders, for traders"
        description="AlphaTrade Markets was founded to give independent traders access to the same tools, pricing and execution quality that institutional desks take for granted."
        icon={Info}
      />

      {/* Mission */}
      <section className="bg-white py-16 dark:bg-background">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Our mission</h2>
          <p className="mt-4 leading-relaxed text-foreground/70">
            Global financial markets have historically been accessible only to institutions and the ultra-wealthy. We exist to close that gap — providing transparent access to forex, equities, commodities and crypto with no minimum capital barrier, no opaque fees, and no compromises on execution quality.
          </p>
          <p className="mt-4 leading-relaxed text-foreground/70">
            Founded in 2019 and now serving traders across 40+ countries, AlphaTrade Markets processes over $48 billion in monthly trading volume — a testament to the trust our community places in us.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-muted py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground">What we stand for</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {values.map((v) => (
              <Card key={v.title} className="bg-white">
                <h3 className="font-display font-semibold text-brand-secondary">{v.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{v.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16 dark:bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Leadership team</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.name}>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-secondary/10 text-2xl font-bold text-brand-secondary">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-display mt-3 font-semibold text-foreground">{member.name}</h3>
                <p className="text-xs text-brand-secondary">{member.role}</p>
                <p className="mt-2 text-sm text-foreground/60">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
