import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Two-factor authentication" };

export default function TwoFactorPage() {
  return (
    <Card className="bg-white text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-success/10 text-brand-success">
        <ShieldCheck size={26} />
      </span>
      <h1 className="font-display mt-4 text-xl font-bold text-foreground">Two-factor authentication</h1>
      <p className="mt-2 text-sm text-foreground/55">
        Enter the 6-digit code from your authenticator app.
      </p>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            inputMode="numeric"
            className="h-12 w-11 rounded-lg border border-slate-300 bg-white text-center text-lg font-semibold text-foreground focus:border-brand-secondary"
          />
        ))}
      </div>

      <Button variant="primary" size="md" className="mt-6 w-full">
        Verify code
      </Button>

      <p className="mt-4 text-xs text-foreground/40">
        Can&apos;t access your authenticator app?{" "}
        <Link href="/support" className="text-brand-secondary hover:underline">
          Get help
        </Link>
      </p>
    </Card>
  );
}
