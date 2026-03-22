/**
 * POST JSON to a Google Apps Script Web App URL from the server.
 *
 * Google's /exec URL often responds with 302/307 redirects. Default fetch
 * follow behavior can drop the POST body on redirect, so Apps Script receives
 * empty data and returns errors. We follow redirects manually and re-POST the
 * same JSON body each time.
 */
export async function postGoogleSheetsWebApp(
  webAppUrl: string,
  body: Record<string, unknown>
): Promise<{ status: number; text: string }> {
  const payload = JSON.stringify(body);
  let url = webAppUrl.trim();

  if (!url) {
    return { status: 0, text: "Empty GOOGLE_SHEETS_WEBAPP_URL" };
  }

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

export function parseSheetsJsonResponse(text: string): {
  ok?: boolean;
  error?: string;
} {
  try {
    return JSON.parse(text) as { ok?: boolean; error?: string };
  } catch {
    return {};
  }
}
