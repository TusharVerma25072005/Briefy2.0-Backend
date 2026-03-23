import {  NextResponse } from "next/server";

export async function POST(req : Request){
    try{
        const emailIds = await req.json();
        console.log("Received email IDs for summaries:", emailIds);
        // Here you would typically fetch the summaries based on the email IDs
        // For demonstration, we'll just return a mock response
        const summaries = emailIds.map((id: string) => ({
            emailId: id,
            summary: `Summary for email ID ${id}`,
            priority: "high",
            embedding: "dummy_embedding",
            category: "general"
        }));

        return NextResponse.json(summaries, { status: 200 });
    }catch(e){
        return NextResponse.json({message : "Failed to get summaries"}, {status : 500})
    }
}