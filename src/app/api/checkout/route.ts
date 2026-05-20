import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { items, total, customerDetails, paymentMethod, transactionId, senderNumber } = body;

    // Create new order
    const newOrder = await Order.create({
      items,
      totalAmount: total,
      customerDetails,
      paymentMethod,
      transactionDetails: (paymentMethod === 'bkash' || paymentMethod === 'nagad') 
        ? { transactionId, senderNumber } 
        : null,
      status: "Pending",
      paymentStatus: "Unpaid",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, orderId: newOrder._id });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}