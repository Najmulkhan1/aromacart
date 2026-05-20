import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json({ error: "Public ID is required" }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    // ক্লাউডিনারি এপিআই-এর জন্য টাইমস্ট্যাম্প তৈরি
    const timestamp = Math.round(new Date().getTime() / 1000).toString();
    
    // সিকিউর SHA-1 সিগনেচার তৈরি করা হচ্ছে
    const signatureString = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(signatureString).digest("hex");

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("api_key", apiKey!);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    // Cloudinary-র অফিশিয়াল ডেস্ট্রয় এপিআই-তে রিকোয়েস্ট পাঠানো হচ্ছে
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.result === "ok") {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: data.result || "Failed to delete" }, { status: 500 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}