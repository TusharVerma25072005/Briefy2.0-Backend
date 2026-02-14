import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code" }, { status: 400 });
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

  console.log("Outlook tokens:", tokens);

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/set-password?email=test@outlook.com`
  );
}
