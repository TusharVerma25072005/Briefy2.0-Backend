import { NextResponse } from "next/server";
import {connectDB} from "@/db/db";
import { Summary } from "@/db/models";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("Received request body:", body);  
    const emailIds: string[] = body.map(
      (item: { emailId: string }) => item.emailId
    );

    if (emailIds.length === 0) {
      return NextResponse.json(
        { message: "No email IDs provided" },
        { status: 400 }
      );
    }

    const summaries = await Summary.find({
      "summary_result.email_id": { $in: emailIds },
    });
    console.log(summaries);
    summaries.forEach((doc: any, i: number) => {
  console.log(
    `Doc ${i}:`,
    typeof doc.summary_result?.summary,
    doc.summary_result?.summary
  );
});
    const response = summaries.map((doc: any) => {
      const fullSummary = doc.summary_result?.summary || "";

      const shortSummary =
        fullSummary.split("\n")[0].slice(0, 100) + "....";

      return {
        emailId: doc.summary_result?.email_id || "",
        summary: shortSummary,
        detailedSummary: fullSummary,
        priority: doc.summary_result?.priority || "Normal",
        category: doc.summary_result?.category || "General",

        embedding: JSON.stringify(doc.vector_embedding || []),
      };
    });

    // console.log(response);

    return NextResponse.json(response, { status: 200 });

  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Failed to fetch summaries" },
      { status: 500 }
    );
  }
}