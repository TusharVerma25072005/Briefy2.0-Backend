import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { mail, password } = body;

  await prisma.user.update({
    where: { email: mail },
    data: {
      passwordHash: password,
    },
  })
  
  return NextResponse.json({
    success: true,
    redirectUrl: `briefy://auth-success?mail=${mail}`
  });
}