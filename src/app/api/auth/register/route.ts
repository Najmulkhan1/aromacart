import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "সব ঘর পূরণ করুন" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে" }, { status: 400 });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট আছে" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
    });

    return NextResponse.json(
      { success: true, message: "অ্যাকাউন্ট তৈরি সফল হয়েছে!", userId: user._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "অ্যাকাউন্ট তৈরি ব্যর্থ হয়েছে" }, { status: 500 });
  }
}
