"use client";

import { useRouter } from "next/navigation";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TradeCancelPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mx-auto h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
          <XCircle size={40} className="text-red-600" />
        </div>
        <h2 className="mt-6 text-3xl font-bold text-gray-800">
          Payment Cancelled
        </h2>
        <p className="mt-3 text-gray-500">
          You cancelled the payment. No charges were made to your account.
        </p>
        <div className="mt-8 space-y-3">
          <Button
            onClick={() => router.push("/trade")}
            variant="primary"
            size="lg"
            className="w-full"
          >
            <ArrowLeft size={18} className="mr-2" />
            Return to Trading
          </Button>
        </div>
      </div>
    </div>
  );
}
