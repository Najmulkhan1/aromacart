import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();
    // সব অর্ডার আনবে এবং লেটেস্ট অর্ডারটি সবার আগে দেখাবে (createdAt: -1)
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}