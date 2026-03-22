import { NextResponse } from "next/server";
import {
  isSheetsResponseSuccess,
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

  let body: { email?: string; phone?: string; businessName?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const businessName =
    typeof body?.businessName === "string" ? body.businessName.trim() : "";

  if (!email || !phone || !businessName) {
    return NextResponse.json(
      { error: "Email, phone, and business name are required." },
      { status: 400 }
    );
  }

  try {
    const { status, text } = await postGoogleSheetsWebApp(WEBAPP_URL, {
      type: "vendor",
      email,
      phone,
      businessName,
    });
    const data = parseSheetsJsonResponse(text);
    if (!isSheetsResponseSuccess(status, data, text)) {
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
