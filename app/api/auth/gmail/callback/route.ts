import { NextRequest, NextResponse } from "next/server";

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

    const userData = await userRes.json();
    const userEmail = userData.mail || userData.userPrincipalName;

    console.log("User Outlook:", userEmail);
    console.log("Refresh Token:", refreshToken);
    console.log("Access Token:", accessToken);

    return NextResponse.redirect(
      `https://briefy2-0-backend.onrender.com/set-password?email=${userEmail}&provider=outlook`
    );

  } catch (error) {
    console.error("Outlook OAuth Error:", error);
    return NextResponse.json({ error: "OAuth failed" }, { status: 500 });
  }
}
