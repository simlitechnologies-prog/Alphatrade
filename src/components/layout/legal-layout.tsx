import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/marketing/page-hero";
import { Scale } from "lucide-react";

export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Legal"
        title={title}
        description={`Last updated: ${lastUpdated}`}
        icon={Scale}
      />
      <section className="bg-white py-14 dark:bg-background">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-slate prose-sm max-w-none dark:prose-invert [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-8 [&_p]:text-foreground/70 [&_p]:leading-relaxed [&_ul]:text-foreground/70">
            {children}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
