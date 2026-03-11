import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/db/prisma";
import crypto from "crypto";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { mail, password } = body;
  const hashEmail = crypto.createHash("sha256").update(mail).digest("hex");
  // await prisma.user.update({
  //   where: { email: hashEmail },
  //   data: {
  //     passwordHash: password,
  //   },
  // })
  
  return NextResponse.json({
    success: true,
    redirectUrl: `briefy://auth-success?mail=${mail}`
  });
}