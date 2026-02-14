import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { gmail, password } = body;

  console.log("Signup Gmail:", gmail);
  console.log("User Password:", password);
  return NextResponse.redirect(
      `briefy://auth-success?gmail=test@gmail.com&token=1234567890`
    );
}