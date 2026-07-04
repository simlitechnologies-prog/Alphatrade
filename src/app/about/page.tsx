import type { Metadata } from "next";
import {
  Info,
  Shield,
  Zap,
  BookOpen,
  TrendingUp,
  Users,
  Globe,
  Award,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/marketing/page-hero";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About AlphaTrade Markets",
  description:
    "Learn about our mission, our team and the values that guide AlphaTrade Markets.",
};

const values = [
  {
    icon: Shield,
    title: "Transparenz",
    body: "Wir veröffentlichen unsere Spreads, Gebühren und Ausführungsstatistiken. Kein Kleingedrucktes, keine Überraschungen.",
  },
  {
    icon: Zap,
    title: "Sicherheit zuerst",
    body: "Getrennte Kundengelder. 256-Bit-Verschlüsselung. Biometrische Authentifizierung. Das sind Grundlagen, keine Verkaufsargumente.",
  },
  {
    icon: BookOpen,
    title: "Bildung statt Hype",
    body: "Wir wollen, dass Sie verstehen, was Sie handeln. Deshalb ist die Academy kostenlos und wird von unserem Research-Team entwickelt.",
  },
  {
    icon: TrendingUp,
    title: "Geschwindigkeit zählt",
    body: "Durchschnittliche Ausführung unter 50 ms, denn jede Millisekunde kann Ihren Fill-Preis verändern.",
  },
];

const stats = [
  { value: "€48B+", label: "Monatliches Handelsvolumen", icon: TrendingUp },
  { value: "40+", label: "Bediente Länder", icon: Globe },
  { value: "15+", label: "Jahre Erfahrung", icon: Award },
  { value: "180+", label: "Verfügbare Märkte", icon: Users },
];

const team = [
  {
    name: "Dr. Stefan Weber",
    role: "Chief Executive Officer",
    bio: "30 Jahre Erfahrung im institutionellen FX-Handel bei der Deutschen Bank und Commerzbank, bevor er AlphaTrade mitbegründete.",
  },
  {
    name: "Thomas Schmidt",
    role: "Chief Technology Officer",
    bio: "Ehemaliger SAP-Infrastrukturingenieur mit umfangreicher Erfahrung in Hochfrequenz-Handelssystemen und Cloud-Architektur.",
  },
  {
    name: "Dr. Anna Fischer",
    role: "Chief Risk Officer",
    bio: "Ehemalige Bundesbank-Aufsichtsbeamtin mit 15 Jahren Erfahrung in der Finanz-Compliance und Risikomanagement.",
  },
  {
    name: "Michael Wagner",
    role: "Head of Markets",
    bio: "Makrohändler mit Fokus auf europäische und asiatische Märkte sowie Expertise in der Handelsstrategie-Entwicklung.",
  },
];

const features = [
  "Keine Mindesteinlage",
  "Keine versteckten Gebühren",
  "Reguliert und lizenziert",
  "Professionelle Handelsplattform",
  "24/7 Kundensupport",
  "Demo-Konto inklusive",
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Über uns"
        title="Von Tradern, für Trader entwickelt"
        description="AlphaTrade Markets wurde gegründet, um unabhängigen Tradern Zugang zu denselben Tools, Preisen und Ausführungsqualität zu bieten, die institutionelle Desks für selbstverständlich halten."
        icon={Info}
      />

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                    <Icon size={20} className="text-blue-600" />
                  </div>
                  <p className="mt-3 font-display text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-700">
              Unsere Mission
            </span>
            <h2 className="font-display mt-4 text-3xl font-bold text-gray-900">
              Demokratisierung des Zugangs zu globalen Märkten
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <p className="text-lg leading-relaxed text-gray-600 text-center max-w-3xl mx-auto">
              Die globalen Finanzmärkte waren historisch gesehen nur
              Institutionen und den Superreichen zugänglich. Wir existieren, um
              diese Kluft zu schließen — mit transparentem Zugang zu Devisen,
              Aktien, Rohstoffen und Kryptowährungen ohne
              Mindestkapitalbarriere, ohne undurchsichtige Gebühren und ohne
              Kompromisse bei der Ausführungsqualität.
            </p>
            <p className="text-lg leading-relaxed text-gray-600 text-center max-w-3xl mx-auto">
              Gegründet 2009 und heute in über 40 Ländern tätig, verarbeitet
              AlphaTrade Markets monatlich ein Handelsvolumen von über{" "}
              <span className="font-semibold text-blue-600">
                48 Milliarden EUR
              </span>{" "}
              — ein Beweis für das Vertrauen, das unsere Community in uns setzt.
            </p>
          </div>

          {/* Features Grid */}
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 max-w-3xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <Check size={16} className="text-green-500 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-700">
              Unsere Werte
            </span>
            <h2 className="font-display mt-4 text-3xl font-bold text-gray-900">
              Wofür wir stehen
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Diese Prinzipien leiten jede Entscheidung, die wir treffen, und
              jedes Produkt, das wir entwickeln.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <Card
                  key={v.title}
                  className="bg-white border border-gray-200 hover:border-blue-300 transition-colors duration-200 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      <Icon size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-gray-900">
                        {v.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                        {v.body}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-700">
              Führungsteam
            </span>
            <h2 className="font-display mt-4 text-3xl font-bold text-gray-900">
              Unser Team
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Erfahrene Fachleute aus führenden deutschen Finanzinstituten und
              Technologieunternehmen.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card
                key={member.name}
                className="bg-white border border-gray-200 hover:border-blue-300 transition-colors duration-200 p-6 text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-3xl font-bold text-blue-600">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-display mt-4 text-lg font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-blue-600">
                  {member.role}
                </p>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {member.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white">
            Bereit zu handeln?
          </h2>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Werden Sie noch heute Teil von AlphaTrade Markets und handeln Sie
            mit den besten Konditionen am Markt.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-blue-600 hover:bg-gray-50 transition-colors shadow-lg shadow-blue-700/30"
            >
              Kostenloses Konto eröffnen
            </a>
            <a
              href="/platform"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Plattform entdecken
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
