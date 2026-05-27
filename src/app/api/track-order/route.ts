import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import mongoose from "mongoose";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json({ error: "Order ID or Phone number is required" }, { status: 400 });
    }

    let order;

    // 1. First check if this is a valid Order ID (MongoDB ObjectId)
    if (mongoose.Types.ObjectId.isValid(query)) {
      order = await Order.findById(query);
    }

    // 2. If not found by ID, search by phone number (returns the latest order)
    if (!order) {
      order = await Order.findOne({ "customerDetails.phone": query }).sort({ createdAt: -1 });
    }

    if (!order) {
      return NextResponse.json({ error: "Order not found. Please check your ID or Phone number." }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Tracking Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}