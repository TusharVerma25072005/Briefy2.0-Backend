import { NextResponse } from "next/server";
import {connectDB} from "@/db/db";
import { Summary } from "@/db/models";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await connectDB();

console.log("DB:", mongoose.connection.name);
console.log("Collection:", mongoose.connection.db?.databaseName);

const collections = await mongoose.connection.db?.listCollections().toArray();
console.log("Collections:", collections);

const count = await Summary.countDocuments();
console.log("Total docs:", count);
    return NextResponse.json({  }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Failed to fetch summaries" }, { status: 500 });
  }
}