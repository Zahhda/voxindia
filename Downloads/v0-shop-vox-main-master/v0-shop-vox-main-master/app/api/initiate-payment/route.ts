import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { CASHFREE_CLIENT_ID, CASHFREE_CLIENT_SECRET } = process.env;

  if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
    return NextResponse.json({ error: "Missing Cashfree keys" }, { status: 500 });
  }

  const order_id = "ORD_" + Date.now();

  const response = await fetch("https://api.cashfree.com/pg/orders", {
    method: "POST",
    headers: {
      "x-client-id": CASHFREE_CLIENT_ID,
      "x-client-secret": CASHFREE_CLIENT_SECRET,
      "Content-Type": "application/json",
      "x-api-version": "2022-09-01",
    },
    body: JSON.stringify({
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
        return_url: `https://shop.voxindia.co/checkout/success?order_id={order_id}&order_token={order_token}`,
        notify_url: `https://shop.voxindia.co/api/payment-webhook`
      },
    }),
  });

  const result = await response.json();
  return NextResponse.json(result);
}

