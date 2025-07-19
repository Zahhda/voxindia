// === File: app/checkout/success/page.tsx ===
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem("cart")
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-20">
      <CheckCircle className="text-green-600 w-16 h-16 mb-6 animate-bounce" />
      <h1 className="text-4xl font-bold text-green-700 mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Your order has been confirmed and we will get in touch with you shortly.
      </p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 rounded-lg bg-black text-white text-lg font-medium hover:opacity-90"
      >
        Back to Home
      </button>
    </div>
  )
}
