"use server"
import { NextResponse } from "next/server";
import prisma from "@/db/prisma";
import crypto from "crypto";


export async function POST(req: Request) {
    const body = await req.json();
    const {mail , password } = body;
    const hashEmail = crypto.createHash("sha256").update(mail).digest("hex");


    const user = await prisma.user.findUnique({
        where : {email : hashEmail}
    })
    if(!user){
        return NextResponse.json({
            success : false,
            message : "User Not found"
        })
    }
    if(user.passwordHash !== password){
        return NextResponse.json({
            success : false,
            message : "Incorrect Password"
        })
    }

    const refreshToken = user.refreshToken;
    const provider = user.provider;
    let accessToken = "";
    if (refreshToken) {
        if (provider === "gmail") {
            const response = await fetch(
                "https://oauth2.googleapis.com/token",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({
                        client_id: process.env.GOOGLE_CLIENT_ID!,
                        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                        refresh_token: refreshToken,
                        grant_type: "refresh_token",
                    }),
                },
            );
            const data = await response.json();
            accessToken = data.access_token;
        } else if (provider === "outlook") {
            const response = await fetch(
                "https://login.microsoftonline.com/common/oauth2/v2.0/token",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({
                        client_id: process.env.OUTLOOK_CLIENT_ID!,
                        client_secret: process.env.OUTLOOK_CLIENT_SECRET!,
                        refresh_token: refreshToken,
                        grant_type: "refresh_token",
                        scope: "https://graph.microsoft.com/.default",
                    }),
                },
            );
            const data = await response.json();

            accessToken = data.access_token;
        }
        if (!accessToken) {
            return NextResponse.json(
                { error: "Failed to refresh token" },
                { status: 500 },
            );
        }
    }




    return NextResponse.json({
        success : true,
        message : "Login Successful",
        refreshToken : user.refreshToken,
        accessToken : accessToken,
        name : user.name,
        email : mail,
        provider : user.provider,
        photo : user.photo
    })

} 