import type { Metadata } from "next";
import Link from "next/link";
import { Mail, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Verify your email" };

export default function VerifyEmailPage() {
  return (
    <Card className="bg-white text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-secondary/10 text-brand-secondary">
        <Mail size={26} />
      </span>
      <h1 className="font-display mt-4 text-xl font-bold text-foreground">Check your inbox</h1>
      <p className="mt-2 text-sm text-foreground/55">
        We sent a verification link to <strong>you@example.com</strong>. Click the link to activate your account.
      </p>
      <Button variant="outline" size="md" className="mt-6 w-full gap-2">
        <RefreshCw size={15} />
        Resend verification email
      </Button>
      <p className="mt-4 text-xs text-foreground/40">
        Wrong email?{" "}
        <Link href="/register" className="text-brand-secondary hover:underline">
          Go back and change it
        </Link>
      </p>
    </Card>
  );
}
