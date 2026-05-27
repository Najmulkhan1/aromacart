import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Review from "@/models/Review";
import Product from "@/models/Product";

// GET /api/reviews?productId=xxx  — product এর সব reviews
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const productId = request.nextUrl.searchParams.get("productId");
    if (!productId) {
      return NextResponse.json({ success: false, error: "productId required" }, { status: 400 });
    }
    const reviews = await Review.find({ product: productId }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// POST /api/reviews  — নতুন review submit (login required)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "LOGIN_REQUIRED" },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await request.json();
    const { productId, rating, comment } = body;

    if (!productId || !rating || !comment?.trim()) {
      return NextResponse.json({ success: false, error: "All fields required" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, error: "Rating must be 1–5" }, { status: 400 });
    }

    // Product exists check
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    const userId = (session.user as any).id;

    // duplicate check
    const existing = await Review.findOne({ product: productId, user: userId });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "ALREADY_REVIEWED" },
        { status: 409 }
      );
    }

    const review = await Review.create({
      product: productId,
      user: userId,
      userName: session.user.name || session.user.email || "User",
      rating,
      comment: comment.trim(),
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    console.error("Review POST error:", error);
    return NextResponse.json({ success: false, error: "Failed to submit review" }, { status: 500 });
  }
}
