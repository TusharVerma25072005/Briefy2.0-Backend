import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

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
      "http://localhost:3000/api/auth/gmail/callback"
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const refreshToken = tokens.refresh_token;
    const accessToken = tokens.access_token;

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const userInfo = await oauth2.userinfo.get();

    const userEmail = userInfo.data.email;

    console.log("User Gmail:", userEmail);
    console.log("Refresh Token:", refreshToken);
    console.log("Access Token:", accessToken);

    return NextResponse.redirect(
      `http://localhost:3000/set-password?email=${userEmail}&provider=gmail`
    );

  } catch (error) {
    console.error("OAuth Error:", error);
    return NextResponse.json({ error: "OAuth failed" }, { status: 500 });
  }
}
