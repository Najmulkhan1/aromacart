import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    // চেক করা হচ্ছে আগে থেকে কোনো অ্যাডমিন আছে কি না
    const adminExists = await User.findOne({ email: "admin@aromacart.com" });
    
    if (adminExists) {
      return NextResponse.json({ message: "Admin already exists!" });
    }

    // পাসওয়ার্ড হ্যাশ করা (ডিফল্ট পাসওয়ার্ড: 123456)
    const hashedPassword = await bcrypt.hash("123456", 10);

    // অ্যাডমিন ইউজার তৈরি করা
    const adminUser = await User.create({
      name: "Super Admin",
      email: "admin@aromacart.com",
      password: hashedPassword,
      role: "admin",
    });

    return NextResponse.json({ 
      success: true, 
      message: "Admin account created successfully!",
      credentials: {
        email: "admin@aromacart.com",
        password: "123456"
      }
    });

  } catch (error) {
    console.error("Setup Error:", error);
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
  }
}