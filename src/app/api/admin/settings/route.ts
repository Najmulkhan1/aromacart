import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";

export async function GET() {
  await connectDB();
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  return NextResponse.json({ success: true, settings });
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    let settings = await SiteSettings.findOne();
    
    if (settings) {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, body, { new: true });
    } else {
      settings = await SiteSettings.create(body);
    }
    
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}