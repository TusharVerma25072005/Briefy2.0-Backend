import { NextResponse } from "next/server";

const AI_SERVER_URL = process.env.AI_SERVER_URL!;
const API_KEY = process.env.AI_API_KEY!;

export async function POST(req: Request) {
  try {
    const emails = await req.json();

    console.log("Received emails for upload:", emails.length);

    const normalized = emails.map((email: any) => ({
      id: email.id,
      text: email.body || email.text,
      subject: email.subject,
      user_id: email.user_id,
      metadata: email.metadata || {},
    }));

    // Convert list to in-memory Blob (no file needed)
    const blob = new Blob([JSON.stringify(normalized)], { type: "application/json" });

    const formData = new FormData();
    formData.append("file", blob, "emails.json");

    const res = await fetch(`${AI_SERVER_URL}/upload-emails`, {
      method: "POST",
      headers: {
        "X-API-Key": API_KEY,
      },
      body: formData,
    });

    console.log("AI server response status:", res.status);

    const data = await res.json();
    console.log("AI server response data:", data);

    const embedderRes = await fetch("https://embedding-server-byxf.onrender.com/process-batch", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    collection: "emails",
    limit: 10,
    main_server_url: "https://email-summarizer-4vex.onrender.com"
  })
});

    if (!res.ok) {
      return NextResponse.json({ message: "API error", error: data }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}