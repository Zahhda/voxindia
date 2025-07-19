import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { CASHFREE_CLIENT_ID, CASHFREE_CLIENT_SECRET } = process.env;

  if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
    return NextResponse.json({ error: "Missing Cashfree keys" }, { status: 500 });
  }
if (req.method !== "POST") {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
  const order_id = "ORD_" + Date.now();

  const payload = {
    order_id,
    order_amount: body.totalAmount,
    order_currency: "INR",
    customer_details: {
      customer_id: body.email,
      customer_email: body.email,
      customer_phone: body.phone,
      customer_name: body.fullName,
    },
    order_note: "Payment for your purchase",
    order_meta: {
      return_url: `https://shop.voxindia.co/checkout/success`,  // keep clean return
      notify_url: `https://shop.voxindia.co/api/payment-webhook`,
    },
  };

  try {
    const response = await fetch("https://api.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "x-client-id": CASHFREE_CLIENT_ID,
        "x-client-secret": CASHFREE_CLIENT_SECRET,
        "Content-Type": "application/json",
        "x-api-version": "2022-09-01",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Cashfree API Error:", result);
      return NextResponse.json({ error: "Cashfree API failed", details: result }, { status: 500 });
    }

    console.log("✅ Payment Init Success:", result);

    return NextResponse.json({
      success: true,
      order_id,
      order_token: result.order_token,
      payment_link: result.payment_link,  // for redirecting
    });
  } catch (err) {
    console.error("❌ Server error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
