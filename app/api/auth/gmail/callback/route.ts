import { google } from "googleapis";
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

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    console.log("Received code:", code);
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log("OAuth Tokens:", tokens);
    const refreshToken = tokens.refresh_token;
    const accessToken = tokens.access_token;

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });
    console.log("Fetching user info with access token...");
    const userInfo = await oauth2.userinfo.get();
    const userName = userInfo.data.name;
    const userEmail = userInfo.data.email;
    const userPhoto = userInfo.data.picture;

    console.log("User Gmail:", userEmail);
    console.log("Refresh Token:", refreshToken);
    console.log("Access Token:", accessToken);
    const password = Math.random().toString(36).slice(-8);

    
    
    
    if(userEmail){
      const emailHash = crypto.createHash("sha256").update(userEmail).digest("hex");

      await prisma.user.upsert({
        update : {
          email : emailHash,
          name : userName ? userName : "No Name",
          provider : "gmail",
          photo : userPhoto,
          accessToken : accessToken,
          refreshToken : refreshToken
          
        },
        create: {
          email: emailHash,
          name: userName ? userName : "No Name",
          provider: "gmail",
          photo: userPhoto,
          accessToken: accessToken,
          refreshToken: refreshToken,
          passwordHash: password
        }
        ,where : {  
          email : emailHash
        }
      })
    }


    return NextResponse.redirect(
      `https://briefy2-0-backend.onrender.com/set-password?email=${userEmail}&provider=gmail&photo=${userPhoto ? encodeURIComponent(userPhoto) : ""}`
    );

  } catch (error) {
    console.error("OAuth Error:", error);
    return NextResponse.json({ error: "OAuth failed" }, { status: 500 });
  }
}
