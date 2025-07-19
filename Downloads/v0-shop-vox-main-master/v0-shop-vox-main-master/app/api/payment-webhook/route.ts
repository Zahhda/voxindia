import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { order_id, order_status, payment_session_id } = body

    if (order_status === "PAID") {
      // ✅ Do your post-payment logic here
      console.log("✅ Payment confirmed via webhook:", order_id)

      // Example: Update DB, send confirmation emails, etc.
    } else {
      console.warn("⚠️ Payment not completed. Status:", order_status)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Webhook error:", err)
    return NextResponse.json({ success: false, error: "Invalid webhook" }, { status: 400 })
  }
} 