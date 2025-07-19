import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { order_token } = await req.json();
  const { CASHFREE_CLIENT_ID, CASHFREE_CLIENT_SECRET } = process.env;

  if (!order_token) return NextResponse.json({ error: "Missing token" }, { status: 400 });

  const response = await fetch(`https://api.cashfree.com/pg/orders/${order_token}`, {
    method: "GET",
    headers: {
      "x-client-id": CASHFREE_CLIENT_ID!,
      "x-client-secret": CASHFREE_CLIENT_SECRET!,
      "x-api-version": "2022-09-01",
    },
  });

  const result = await response.json();
  return NextResponse.json(result);
}