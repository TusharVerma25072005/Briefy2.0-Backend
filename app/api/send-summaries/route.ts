import { NextRequest, NextResponse } from "next/server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        const rawEmails = await req.json();

        console.log("Received summaries:", rawEmails);

        const summaries = rawEmails.map((email: any) => ({
            emailId: email.emailId,
            summary: `Summary of: ${email.subject}`,
            priority: "HIGH",
            embedding: "dummy_embedding",
            category: "WORK"
        }));

        return NextResponse.json(summaries, { status: 200 });

    }catch(e){
        return NextResponse.json(
            { message: "Failed to send summaries" },
            { status: 500 }
        );   
    }
}