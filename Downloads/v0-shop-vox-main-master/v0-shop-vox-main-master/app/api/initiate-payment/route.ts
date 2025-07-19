import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { CASHFREE_CLIENT_ID, CASHFREE_CLIENT_SECRET } = process.env;

  if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
    return NextResponse.json({ error: "Missing Cashfree keys" }, { status: 500 });
  }

  const response = await fetch("https://api.cashfree.com/pg/links", {
    method: "POST",
    headers: {
      "x-client-id": CASHFREE_CLIENT_ID,
      "x-client-secret": CASHFREE_CLIENT_SECRET,
      "Content-Type": "application/json",
      "x-api-version": "2022-09-01",
    },
    body: JSON.stringify({
      customer_details: {
        customer_id: body.email,
        customer_email: body.email,
        customer_phone: body.phone,
        customer_name: body.fullName,
      },
      order_amount: body.totalAmount,
      order_currency: "INR",
      order_id: "ORD_" + Date.now(),
      order_note: "Payment for your purchase",
      order_meta: {
        return_url: "https://v0-shop.vercel.app/checkout/success?order_id={order_id}", // Replace with your domain
      },
    }),
  });

  const result = await response.json();

  return NextResponse.json(result);
}
