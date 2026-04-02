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
// ✅ Transform to AI server format
const formattedEmails = rawEmails.map((email: any) => ({
    id: email.id,
    text: email.body,              // 🔥 body → text
    subject: email.subject || "",
    user_id: email.user_id || "user_1", // 🔥 required field
}));

// STEP 1: Upload Emails
const formData = new FormData();

formattedEmails.forEach((email, index) => {
  formData.append(`emails[${index}].id`, email.id);
  formData.append(`emails[${index}].text`, email.text);
  formData.append(`emails[${index}].subject`, email.subject || "");
  formData.append(`emails[${index}].user_id`, email.user_id || "user_1");
});

const uploadRes = await fetch(`${AI_SERVER_URL}/upload-emails`, {
  method: "POST",
  headers: {
    "X-API-Key": API_KEY,   // ✅ ONLY this header
  },
  body: formData,          // ✅ NO JSON
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