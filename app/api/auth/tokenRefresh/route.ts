import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import db from "@/db/prisma";

export async function POST(req: NextRequest) {
    try {
        console.log("Token refresh request received");
        const body = await req.json();
        const { mail, password } = body;
        console.log("Received email:", mail);
        console.log("Received password: ", password);
        if (!mail || !password) {
            return NextResponse.json({
                success: false,
                message: "Email and Password are required",
            });
        }
        const hashEmail = crypto.createHash("sha256").update(mail).digest(
            "hex",
        );
        console.log("Hashed email:", hashEmail);
        const user = await db.user.findUnique({
            where: {
                email: hashEmail,
            },
        });

        console.log("User found:", !!user);
        if (!user || user.passwordHash !== password || !user.refreshToken) {
            return NextResponse.json({
                success: false,
                message: "Something went wrong please login again",
            });
        }
        console.log(user);
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
            console.log(accessToken);
            
            return NextResponse.json({
                success : true,
                accessToken : accessToken,
            })

        }
    } catch (e) {
        return NextResponse.json({
            success : false,
            message : "Internal Server Error",
        })
    }
}
