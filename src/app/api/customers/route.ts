import { NextResponse } from "next/server";

const WEBAPP_URL = process.env.GOOGLE_SHEETS_WEBAPP_URL;

export async function POST(request: Request) {
  if (!WEBAPP_URL) {
    return NextResponse.json(
      { error: "Google Sheets integration not configured." },
      { status: 503 }
    );
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  if (!email) {
    return NextResponse.json(
      { error: "Email is required." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const text = await res.text();
    let data: { ok?: boolean; error?: string };
    try {
      data = JSON.parse(text);
    } catch {
      data = {};
    }

    if (!res.ok || data.error) {
      console.error("Google Sheets webapp error:", res.status, text);
      return NextResponse.json(
        { error: "Failed to save to sheet." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Google Sheets request failed:", err);
    return NextResponse.json(
      { error: "Failed to save to sheet." },
      { status: 502 }
    );
  }
}
