import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the JSON body sent from Android
    const body = await req.json();

    // Expecting { text: "your text here" } from Android
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
    console.log(data);

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Failed to get embeddings" },
      { status: 500 }
    );
  }
}