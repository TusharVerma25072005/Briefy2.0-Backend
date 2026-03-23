import {  NextResponse } from "next/server";

export async function POST(req : Request){
    try {
        const emailIds = await req.json();

        console.log("Received email IDs for summaries:", emailIds);

        const summaries = emailIds.map((item: { emailId: string }) => ({
            emailId: item.emailId,   
            summary: `Summary for email ID ${item.emailId}`,
            priority: "HIGH",    
            embedding: "dummy_embedding",
            category: "general"
        }));

        return NextResponse.json(summaries, { status: 200 });

    } catch (e) {
        return NextResponse.json(
            { message: "Failed to get summaries" },
            { status: 500 }
        );
    }
}