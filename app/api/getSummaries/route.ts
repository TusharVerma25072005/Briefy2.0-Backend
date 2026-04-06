import { NextResponse } from "next/server";
import { connectDB } from "@/db/db";
import { Summary } from "@/db/models";

function normalizeSummary(val: any): string {
  if (typeof val === "string") return val;

  if (Array.isArray(val)) {
    // join all elements safely
    return val.map((v) => String(v)).join(" ");
  }

  if (val && typeof val === "object") {
    // fallback for unexpected objects
    return JSON.stringify(val);
  }

  return "";
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("Received request body:", body);

    // ✅ safer body handling
    let emailIds: string[] = [];

    if (Array.isArray(body)) {
      if (typeof body[0] === "string") {
        emailIds = body;
      } else {
        emailIds = body.map((item: any) => item.emailId);
      }
    } else if (body.emailIds) {
      emailIds = body.emailIds;
    }

    if (emailIds.length === 0) {
      return NextResponse.json(
        { message: "No email IDs provided" },
        { status: 400 }
      );
    }

    const summaries = await Summary.find({
      "summary_result.email_id": { $in: emailIds },
    });

    summaries.forEach((doc: any, i: number) => {
      console.log(
        `Doc ${i}:`,
        typeof doc.summary_result?.summary,
        doc.summary_result?.summary
      );
    });

    const response = summaries.map((doc: any) => {
      const normalized = normalizeSummary(
        doc.summary_result?.summary
      );

      const shortSummary =
        normalized.length > 0
          ? normalized.split("\n")[0].slice(0, 100) + "...."
          : "";

      return {
        emailId: doc.summary_result?.email_id || "",
        summary: shortSummary,
        detailedSummary: normalized,
        priority: doc.summary_result?.priority || "Normal",
        category: doc.summary_result?.category || "General",
        embedding: JSON.stringify(doc.vector_embedding || []),
      };
    });

    return NextResponse.json(response, { status: 200 });

  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Failed to fetch summaries" },
      { status: 500 }
    );
  }
}