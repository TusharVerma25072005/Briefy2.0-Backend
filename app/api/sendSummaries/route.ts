import { NextResponse } from "next/server";

const AI_SERVER_URL = process.env.AI_SERVER_URL!;
const API_KEY = process.env.AI_API_KEY!;

export async function POST(req: Request) {
  try {
    const email = await req.json(); // { id, subject, body, metadata }
    console.log("Received email for summarization:", email[0]);
    // Transform to AI server format
    const payload = {
      id: email.id,
      text: email.body,           // match curl's "text"
      metadata: email.metadata || {},
    };

    const res = await fetch(`${AI_SERVER_URL}/summarize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
      },
      body: JSON.stringify(payload),
    });
    console.log("AI server response status:", res);
    const data = await res.json();
    console.log("AI server response data:", data);
    if (!res.ok) {
      return NextResponse.json({ message: "API error", error: data }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}