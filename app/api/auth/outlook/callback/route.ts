import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "No code received" }, { status: 400 });
    }

    const tokenRes = await fetch(
      "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.AZURE_CLIENT_ID!,
          client_secret: process.env.AZURE_CLIENT_SECRET!,
          code,
          redirect_uri: process.env.AZURE_REDIRECT_URI!,
          grant_type: "authorization_code",
        }),
      }
    );

    const tokens = await tokenRes.json();

    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;

    const userRes = await fetch(
      "https://graph.microsoft.com/v1.0/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    let photoBase64: string | null = null;

    try {
        const photoRes = await fetch(
            "https://graph.microsoft.com/v1.0/me/photos/96x96/$value",
            {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            }
        );

        if (photoRes.ok) {
            const arrayBuffer = await photoRes.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            photoBase64 = buffer.toString("base64");

            console.log("Profile photo fetched");
        } else {
            console.log("No profile photo for user");
        }
    } catch (err) {
        console.log("Photo fetch failed");
    }

    const userData = await userRes.json();
    const userEmail = userData.mail || userData.userPrincipalName;
    console.log("User Data:", userData);
    console.log("User Outlook:", userEmail);
    console.log("Refresh Token:", refreshToken);
    console.log("Access Token:", accessToken);
    const photoURL = photoBase64 ? `data:image/jpeg;base64,${photoBase64}` : null;
    const passwordHash = Math.random().toString(36).slice(-8); 

    const hashEmail = crypto.createHash("sha256").update(userEmail).digest("hex");


    await prisma.user.upsert({
      where: { email: hashEmail },
      update: {
        name: userData.displayName,
        email: hashEmail,
        provider: "outlook",
        photo: photoURL,
        accessToken : accessToken,
        refreshToken : refreshToken
      },
      create: {
        name: userData.displayName,
        email: hashEmail,
        provider: "outlook",
        photo: photoURL,
        accessToken : accessToken,
        refreshToken : refreshToken,
        passwordHash: passwordHash
      }
    })


    return NextResponse.redirect(
      `https://briefy2-0-backend.onrender.com/set-password?email=${userEmail}&provider=outlook&photo=${photoBase64 ? encodeURIComponent(photoBase64) : ""}`
    );

  } catch (error) {
    console.error("Outlook OAuth Error:", error);
    return NextResponse.json({ error: "OAuth failed" }, { status: 500 });
  }
}
