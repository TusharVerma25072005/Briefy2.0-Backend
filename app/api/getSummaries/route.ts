import { NextResponse } from "next/server";
import {connectDB} from "@/db/db";
import { Summary } from "@/db/models";
import mongoose from "mongoose";


export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json(); 
    console.log("Received body:", body);
    const emailIds: string[] = body.map((item: { emailId: string }) => item.emailId);
    console.log("Extracted email IDs:", emailIds);
    if (emailIds.length === 0) {
      return NextResponse.json({ message: "No email IDs provided" }, { status: 400 });
    }

const summaries = await Summary.find({
  "summary_result.email_id": { $in: emailIds },
});
console.log("DB Name:", mongoose.connection.name);
console.log("Total docs:", summaries.length);
console.log("Sample docs:", summaries[0]);
    console.log("Fetched summaries:", summaries);
    return NextResponse.json({ summaries }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Failed to fetch summaries" }, { status: 500 });
  }
}