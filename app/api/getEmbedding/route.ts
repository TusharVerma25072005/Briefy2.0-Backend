import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text = body.text;

    if (!text) {
      return NextResponse.json(
        { message: "No text provided in the request" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://embedding-server-byxf.onrender.com/embed-text?text=${encodeURIComponent(text)}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();


    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Failed to get embeddings" },
      { status: 500 }
    );
  }
}