import { NextResponse } from "next/server";

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.AZURE_CLIENT_ID!,
    response_type: "code",
    redirect_uri: process.env.AZURE_REDIRECT_URI!,
    response_mode: "query",
    scope: [
      "openid",
      "profile",
      "email",
      "offline_access",
      "https://graph.microsoft.com/Mail.Read"
    ].join(" "),
  });

  const authUrl =
    `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params.toString()}`;

  return NextResponse.redirect(authUrl);
}
