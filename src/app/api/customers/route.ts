import { NextResponse } from "next/server";
import {
  parseSheetsJsonResponse,
  postGoogleSheetsWebApp,
} from "@/lib/postGoogleSheetsWebApp";

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
    const { status, text } = await postGoogleSheetsWebApp(WEBAPP_URL, {
      email,
    });
    const data = parseSheetsJsonResponse(text);
    const success =
      status >= 200 && status < 300 && data.ok === true && !data.error;

    if (!success) {
      console.error("Google Sheets webapp error:", status, text);
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
