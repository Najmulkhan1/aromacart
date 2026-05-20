import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

/**
 * @route   GET /api/products
 * @desc    ডাটাবেস থেকে সব প্রোডাক্ট নিয়ে আসা (Search & Filter অপশনসহ)
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // URL থেকে সার্চ এবং ফিল্টার প্যারামিটারগুলো নেওয়া হচ্ছে
    const { searchParams } = new URL(request.url);
    const scentFamily = searchParams.get("scentFamily");
    const status = searchParams.get("status");

    // কোয়েরি অবজেক্ট তৈরি
    const query: Record<string, unknown> = {};
    
    if (scentFamily) {
      query.scentFamily = scentFamily;
    }
    
    // 👇 এখানে মূল পরিবর্তনটি করা হয়েছে
    if (status && status !== "all") {
      // যদি status থাকে এবং সেটি 'all' না হয়, তবেই ফিল্টার করবে
      query.status = status;
    } else if (!status) {
      // যদি status প্যারামিটার না থাকে (যেমন শপ পেজে), তখন ড্রাফট বাদে সব দেখাবে
      query.status = { $ne: "Draft" }; 
    }

    // ডাটাবেস থেকে ডাটা কোয়েরি করা
    const products = await Product.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

/**
 * @route   POST /api/products
 * @desc    নতুন প্রোডাক্ট তৈরি করা (Admin প্যানেলের জন্য)
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // স্লাগ (Slug) তৈরি করার লজিক (যেমন: Oud Wood Intense -> oud-wood-intense)
    // যদি ফ্রন্টএন্ড থেকে স্লাগ না আসে, তবে নাম থেকে অটো জেনারেট হবে
    const slug = body.slug 
      ? body.slug.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : body.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // ডাটাবেসে নতুন প্রোডাক্ট এন্ট্রি
    const newProduct = await Product.create({
      ...body,
      slug,
    });

    return NextResponse.json(
      { success: true, message: "Product created successfully!", data: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("MongoDB API Error: ", error); // <--- টার্মিনালে আসল এররটি প্রিন্ট করার জন্য
    const message = error instanceof Error ? error.message : "Failed to create product";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}