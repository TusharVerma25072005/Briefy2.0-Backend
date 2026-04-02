import { NextResponse } from "next/server";

const AI_SERVER_URL = process.env.AI_SERVER_URL!;
const API_KEY = process.env.AI_API_KEY!; 

export async function POST(req: Request) {
    try {
        const rawEmails = await req.json();
        console.log("Received emails for summarization:", rawEmails);
        if (!Array.isArray(rawEmails)) {
            console.log("Invalid payload, expected an array of emails:");

            return NextResponse.json(
                { message: "Invalid payload, expected array of emails" },
                { status: 400 }
            );
        }

        const uploadRes = await fetch(`${AI_SERVER_URL}/upload-emails`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": API_KEY, // 🔥 REQUIRED
            },
            body: JSON.stringify(rawEmails),
        });
        console.log("Upload response status:", uploadRes);
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
        console.log("Summarization triggered successfully");

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