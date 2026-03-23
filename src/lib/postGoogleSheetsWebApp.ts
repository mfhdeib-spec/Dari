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
    if (status >= 300 && status < 400) {
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

  // Use manual redirect handling so each hop keeps the same JSON body.
  // This avoids Google Apps Script receiving an empty payload on some deployments.
  return postWithManualRedirects(url, payload);
}
