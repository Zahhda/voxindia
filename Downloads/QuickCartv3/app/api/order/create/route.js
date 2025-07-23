import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" });

    const {
      address,
      items,
      payment_id,
      razorpay_order_id,
      signature,
      payment_mode, // optional: if COD
    } = await request.json();

    if (!address || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid data" });
    }

    // Calculate amount using product info
    const amount = await items.reduce(async (accPromise, item) => {
      const acc = await accPromise;
      const product = await Product.findById(item.product);
      if (!product) throw new Error("Invalid product");
      return acc + product.offerPrice * item.quantity;
    }, Promise.resolve(0));

    const totalAmount = amount + Math.floor(amount * 0.02);

    // 🧾 Verify Razorpay payment if not COD
    if (payment_mode !== "COD") {
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(`${razorpay_order_id}|${payment_id}`)
        .digest("hex");

      if (expectedSignature !== signature) {
        return NextResponse.json({ success: false, message: "Payment verification failed" });
      }
    }

    // 🚀 Trigger Inngest for order creation
    await inngest.send({
      name: "order/created",
      data: {
        userId,
        address,
        items,
        amount: totalAmount,
        paymentMode: payment_mode || "Razorpay",
        paymentId: payment_id || null,
        date: Date.now(),
      },
    });

    // 🧹 Clear cart
    const user = await User.findById(userId);
    if (user) {
      user.cartItems = {};
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: payment_mode === "COD" ? "COD Order Placed" : "Payment verified & order placed",
    });
  } catch (error) {
    console.log("ORDER ERROR:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
