

import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const rawEmails = await req.json();

        console.log("Received summaries:", rawEmails);

        return NextResponse.json({message : "Sucessfully reciueved"} ,  { status: 200 });

    }catch(e){
        return NextResponse.json(
            { message: "Failed to send summaries" },
            { status: 500 }
        );   
    }
}