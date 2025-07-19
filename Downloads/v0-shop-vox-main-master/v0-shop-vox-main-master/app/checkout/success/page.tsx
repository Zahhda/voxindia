"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    const order_token = params.get("order_token");

    if (order_token) {
      fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.order_status === "PAID") {
            setStatus("✅ Payment successful! Thank you for your order.");
          } else {
            setStatus("⚠️ Payment not completed. Please contact support.");
          }
        })
        .catch(() => setStatus("❌ Failed to verify payment."));
    }
  }, [params]);

  return (
    <div className="max-w-xl mx-auto text-center py-20">
      <h1 className="text-3xl font-bold mb-4">Order Confirmation</h1>
      <p>{status}</p>
    </div>
  );
}
