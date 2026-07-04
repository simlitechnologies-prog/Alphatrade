import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/marketing/hero";
import { TickerTape } from "@/components/marketing/ticker-tape";
import { FeaturedMarkets } from "@/components/marketing/featured-markets";
import { WhyChoose } from "@/components/marketing/why-choose";
import { Stats } from "@/components/marketing/stats";
import { Testimonials } from "@/components/marketing/testimonials";
import {
  Academy,
  NewsSection,
  Security,
  CTA,
  Newsletter,
} from "@/components/marketing/sections";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TickerTape />
      <FeaturedMarkets />
      <WhyChoose />
      <Stats />
      <Academy />
      <Testimonials />
      <NewsSection />

      <Security />
      <CTA />
      <Newsletter />
      <Footer />
    </main>
  );
}
