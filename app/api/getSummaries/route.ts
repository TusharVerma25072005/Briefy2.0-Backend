import { NextResponse } from "next/server";
import {connectDB} from "@/db/db";
import { Summary } from "@/db/models";


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
  id: { $in: emailIds }, 
  "summary_result.summary": { $exists: true, $ne: "" }, 
  "summary_result.embedding": { $exists: true, $ne: [] },
}).select({
  id: 1,
  "summary_result.subject": 1,
  "summary_result.summary": 1,
  "summary_result.category": 1,
  "summary_result.priority": 1,
  "summary_result.embedding": 1, 
  _id: 0,
});
    console.log("Fetched summaries:", summaries);
    return NextResponse.json({ summaries }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Failed to fetch summaries" }, { status: 500 });
  }
}