import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{

        const rawEmails = await req.json();
        console.log("Received summaries:", rawEmails);
        return NextResponse.json({message : "Summaries sent successfully"}, {status : 200})

    }catch(e){
        return NextResponse.json({message : "Failed to send summaries"}, {status : 500})   
    }
}