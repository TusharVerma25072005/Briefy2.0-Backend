import { NextResponse } from "next/server";

const AI_SERVER_URL = process.env.AI_SERVER_URL!;
const API_KEY = process.env.AI_API_KEY!; // <-- add this

export async function POST(req: Request) {
    try {
        const rawEmails = await req.json();

        if (!Array.isArray(rawEmails)) {
            return NextResponse.json(
                { message: "Invalid payload, expected array of emails" },
                { status: 400 }
            );
        }

        // ✅ STEP 1: Upload Emails (ADD API KEY HERE)
        const uploadRes = await fetch(`${AI_SERVER_URL}/upload-emails`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": API_KEY, // 🔥 REQUIRED
            },
            body: JSON.stringify(rawEmails),
        });

        if (!uploadRes.ok) {
            const error = await uploadRes.text();
            return NextResponse.json(
                { message: "Upload failed", error },
                { status: 500 }
            );
        }

        // ✅ STEP 2: Trigger summarization (ALSO HERE)
        fetch(`${AI_SERVER_URL}/batch_summarize`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": API_KEY, // 🔥 REQUIRED
            },
            body: JSON.stringify({
                collection: "emails",
                limit: rawEmails.length,
            }),
        }).catch(err => {
            console.error("Summarization trigger failed:", err);
        });

        return NextResponse.json({
            message: "Emails uploaded and summarization started",
        });

    } catch (e) {
        console.error("Error:", e);

        return NextResponse.json(
            { message: "Failed to process emails" },
            { status: 500 }
        );
    }
}