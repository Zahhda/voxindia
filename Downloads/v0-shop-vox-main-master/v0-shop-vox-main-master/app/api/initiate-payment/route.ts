import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const orderId = `ORDER_${Date.now()}` // ✅ Use backticks for string interpolation

    const response = await fetch("https://api.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.CASHFREE_CLIENT_ID!,
        "x-client-secret": process.env.CASHFREE_CLIENT_SECRET!,
        "x-api-version": "2022-09-01",
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: body.totalAmount,
        order_currency: "INR",
        customer_details: {
          customer_id: body.email,
          customer_email: body.email,
          customer_phone: body.phone,
        },
        order_note: "Wall panel order from Linerio",
        order_meta: {
          return_url: `https://shop.voxindia.co/checkout/success?order_id=${orderId}`, // ✅ Correct string
          notify_url: `https://shop.voxindia.co/api/payment-webhook`,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok || !data.payment_link_url) {
      console.error("❌ Cashfree API Error:", data)
      return NextResponse.json({ error: true, message: data.message || "Cashfree error" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error("Error in initiating payment:", err)
    return NextResponse.json({ error: true, message: "Server error" }, { status: 500 })
  }
}
