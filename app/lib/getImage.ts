"use server"
import db from "@/db/prisma";
import crypto from "crypto";
export async function getImage(email :string){
    const emailHash = crypto.createHash("sha256").update(email).digest("hex");
    const user = await db.user.findUnique({
        where : {
            email :emailHash
        }
    })
    return user?.photo || user?.name.charAt(0).toUpperCase() || "U";
}