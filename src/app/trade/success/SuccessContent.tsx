"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      fetch(`/api/verify-payment?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "paid") {
            setLoading(false);
          } else {
            setError("Payment verification failed");
            setLoading(false);
          }
        })
        .catch(() => {
          setError("Failed to verify payment");
          setLoading(false);
        });
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-sm text-gray-500">
            Verifying your payment...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Payment Failed
          </h2>
          <p className="mt-2 text-gray-500">{error}</p>
          <Button
            onClick={() => router.push("/trade")}
            className="mt-6"
            variant="primary"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mx-auto h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="mt-6 text-3xl font-bold text-gray-800">
          Payment Successful! 🎉
        </h2>
        <p className="mt-3 text-gray-500">
          Your trade deposit has been confirmed. You can now see the funds in
          your trading account.
        </p>
        <div className="mt-8 space-y-3">
          <Button
            onClick={() => router.push("/dashboard")}
            variant="primary"
            size="lg"
            className="w-full"
          >
            Go to Dashboard
            <ArrowRight size={18} className="ml-2" />
          </Button>
          <Button
            onClick={() => router.push("/trade")}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Make Another Trade
          </Button>
        </div>
      </div>
    </div>
  );
}
