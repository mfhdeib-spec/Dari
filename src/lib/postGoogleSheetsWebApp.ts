/**
 * POST JSON to a Google Apps Script Web App URL from the server.
 *
 * Some deployments respond with redirects where a plain `fetch` + follow can
 * drop the POST body. We try the standard request first (matches pre-fix
 * behavior), then fall back to manually following redirects while re-sending
 * the same JSON body.
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

async function postWithManualRedirects(
  startUrl: string,
  payload: string
): Promise<{ status: number; text: string }> {
  let url = startUrl;
  const maxRedirects = 8;

  for (let i = 0; i < maxRedirects; i++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      redirect: "manual",
    });

    const status = res.status;

    if (
      status === 301 ||
      status === 302 ||
      status === 303 ||
      status === 307 ||
      status === 308
    ) {
      const location = res.headers.get("Location");
      await res.text().catch(() => undefined);
      if (!location) {
        return {
          status,
          text: "Redirect without Location header from Google Apps Script",
        };
      }
      url = new URL(location, url).toString();
      continue;
    }

    const text = await res.text();
    return { status, text };
  }

  return { status: 0, text: "Too many redirects from Google Apps Script URL" };
}

export async function postGoogleSheetsWebApp(
  webAppUrl: string,
  body: Record<string, unknown>
): Promise<{ status: number; text: string }> {
  const payload = JSON.stringify(body);
  const url = webAppUrl.trim();

  if (!url) {
    return { status: 0, text: "Empty GOOGLE_SHEETS_WEBAPP_URL" };
  }

  // 1) Manual redirects + same body each hop (fixes POST body lost on redirect).
  const manual = await postWithManualRedirects(url, payload);
  const manualData = parseSheetsJsonResponse(manual.text);
  if (isSheetsResponseSuccess(manual.status, manualData, manual.text)) {
    return manual;
  }

  // 2) Fallback: plain fetch with redirect follow (matches older integration).
  const simple = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    redirect: "follow",
  });
  const simpleText = await simple.text();
  return { status: simple.status, text: simpleText };
}
