import { NextResponse } from "next/server";
// import connectDB from "@/lib/mongodb";
// import PageModel from "@/models/Page";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pageId, theme, sections } = body;

    if (!sections || sections.length === 0) {
      return NextResponse.json({ message: "Page cannot be empty!" }, { status: 400 });
    }

    // Database Connection & Saving Logic (MongoDB)
    // await connectDB();
    // await PageModel.findOneAndUpdate(
    //   { pageId: pageId },
    //   { theme, sections, updatedAt: new Date() },
    //   { upsert: true, new: true }
    // );

    return NextResponse.json({ message: "Success", data: body }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}