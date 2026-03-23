/**
 * POST JSON to a Google Apps Script Web App URL from the server.
 *
 * We intentionally send exactly one POST request per app action to avoid
 * duplicate rows from retry/fallback logic.
 */

/**
 * Match original API behavior: HTTP OK and no `error` in JSON.
 * Rejects HTML bodies (Google sometimes returns 200 + login/error HTML).
 */
export function isSheetsResponseSuccess(
  status: number,
  data: { ok?: boolean; error?: string },
  rawText?: string
): boolean {
  if (status < 200 || status >= 300) return false;
  if (rawText && /^\s*</.test(rawText)) return false;
  if (data.error) return false;
  return true;
}

export function parseSheetsJsonResponse(text: string): {
  ok?: boolean;
  error?: string;
} {
  const cleaned = text
    .replace(/^\uFEFF/, "")
    .trim()
    .replace(/^\)\]\}'\s*/, "");
  try {
    return JSON.parse(cleaned) as { ok?: boolean; error?: string };
  } catch {
    return {};
  }
}

export async function postGoogleSheetsWebApp(
  webAppUrl: string,
  body: Record<string, unknown>
): Promise<{ status: number; text: string }> {
  const payload = JSON.stringify(body);
  // Be defensive: env vars are sometimes accidentally saved with extra quotes or
  // even a duplicated `GOOGLE_SHEETS_WEBAPP_URL=` prefix inside the value.
  const normalized = webAppUrl.trim();
  const withoutKeyPrefix = normalized.replace(/^GOOGLE_SHEETS_WEBAPP_URL\s*=\s*/i, "");
  const url = withoutKeyPrefix.replace(/^["']/, "").replace(/["']$/, "");

  if (!url) {
    return { status: 0, text: "Empty GOOGLE_SHEETS_WEBAPP_URL" };
  }

  try {
    // Ensures `fetch()` receives a valid absolute URL.
    // eslint-disable-next-line no-new
    new URL(url);
  } catch {
    return { status: 0, text: `Invalid GOOGLE_SHEETS_WEBAPP_URL: ${url}` };
  }

  // Single request path: avoids duplicate order writes.
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    redirect: "follow",
  });
  const text = await res.text();
  return { status: res.status, text };
}
