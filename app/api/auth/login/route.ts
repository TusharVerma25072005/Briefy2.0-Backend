export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/db/prisma";
import crypto from "crypto";


export async function POST(req: Request) {
    const body = await req.json();
    const {mail , password } = body;
    const hashEmail = crypto.createHash("sha256").update(mail).digest("hex");


    const user = await prisma.user.findUnique({
        where : {email : hashEmail}
    })
    if(!user){
        return NextResponse.json({
            success : false,
            message : "User Not found"
        })
    }
    if(user.passwordHash !== password){
        return NextResponse.json({
            success : false,
            message : "Incorrect Password"
        })
    }
    return NextResponse.json({
        success : true,
        message : "Login Successful",
        refreshToken : user.refreshToken,
        accessToken : user.accessToken,
        name : user.name,
        email : mail,
        provider : user.provider,
        photo : user.photo
    })

} 