import Link from "next/link";
import { TrendingUp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-primary px-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-secondary/20 text-brand-secondary">
        <TrendingUp size={30} />
      </span>

      <p className="font-display mt-6 text-8xl font-bold text-white/10 select-none">
        404
      </p>

      <h1 className="font-display -mt-8 text-3xl font-bold text-white">
        Page not found
      </h1>

      <p className="mt-3 max-w-sm text-sm text-white/55">
        This page doesn&apos;t exist — but the markets are still open. Let&apos;s get you back on track.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/">
          <Button variant="primary" size="md" className="gap-2">
            <ArrowLeft size={16} />
            Back to home
          </Button>
        </Link>
        <Link href="/markets">
          <Button
            variant="outline"
            size="md"
            className="border-white/20 text-white hover:bg-white/10"
          >
            View markets
          </Button>
        </Link>
      </div>
    </main>
  );
}
