import type { Metadata } from "next";
import Link from "next/link";
import { KeyRound, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <Card className="bg-white">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary mb-4">
        <KeyRound size={20} />
      </span>
      <h1 className="font-display text-xl font-bold text-foreground">Reset your password</h1>
      <p className="mt-1 text-sm text-foreground/55">
        Enter the email address linked to your account and we&apos;ll send a reset link.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-xs font-medium text-foreground/60 mb-1.5">Email address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-brand-secondary"
          />
        </div>
        <Button variant="primary" size="md" className="w-full">
          Send reset link
        </Button>
      </div>

      <Link href="/login" className="mt-6 flex items-center justify-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors">
        <ArrowLeft size={14} />
        Back to log in
      </Link>
    </Card>
  );
}
