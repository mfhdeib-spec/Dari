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

  let body: {
    total?: number;
    totalDisplay?: string;
    currency?: string;
    items?: Array<{ label?: string; size?: string; quantity?: number }>;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const total = typeof body?.total === "number" ? body.total : NaN;
  if (!Number.isFinite(total) || total <= 0) {
    return NextResponse.json(
      { error: "Valid total is required." },
      { status: 400 }
    );
  }

  try {
    const items = Array.isArray(body.items) ? body.items : [];
    const normalizedItems = items
      .map((it) => ({
        label: typeof it.label === "string" ? it.label.trim() : "",
        size: typeof it.size === "string" ? it.size.trim() : "",
        quantity:
          typeof it.quantity === "number" && Number.isFinite(it.quantity) ? it.quantity : 0,
      }))
      .filter((it) => it.quantity > 0);

    const payload: Record<string, unknown> = {
      type: "order",
      total,
      items: normalizedItems,
    };
    if (typeof body.totalDisplay === "string" && body.totalDisplay.trim()) {
      payload.totalDisplay = body.totalDisplay.trim();
    }
    if (typeof body.currency === "string" && body.currency.trim()) {
      payload.currency = body.currency.trim();
    }

    const { status, text } = await postGoogleSheetsWebApp(WEBAPP_URL, payload);
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
