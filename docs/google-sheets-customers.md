# Add signups to Google Sheets (Customers & Vendors)

- **Checkout complete:** when a buyer submits their email, it is appended to the **Customers** sheet (Timestamp, Email).
- **Join as a Business:** when someone submits email, phone, and business name, it is appended to the **Vendors** sheet (Timestamp, Email, Phone, Business Name).

The same Google Apps Script web app URL is used for both; the script writes to the correct sheet based on the payload.

## 1. Add the script to your spreadsheet

1. Open your sheet:  
   [https://docs.google.com/spreadsheets/d/1AWst1lCtuNXODH9zyrSyVsw0MqY9vCy_yvmLdsAmOYw](https://docs.google.com/spreadsheets/d/1AWst1lCtuNXODH9zyrSyVsw0MqY9vCy_yvmLdsAmOYw)
2. Go to **Extensions → Apps Script**.
3. Replace the default code with the script below.
4. The script will create **Customers** and **Vendors** sheets if they don’t exist, with the right headers.

### Apps Script code

```js
function doPost(e) {
  try {
    var body = e.postData.contents ? JSON.parse(e.postData.contents) : {};

    if (body.type === "vendor") {
      return handleVendor(body);
    }
    return handleCustomer(body);
  } catch (err) {
    return createResponse(500, { error: String(err.message) });
  }
}

function handleCustomer(body) {
  var email = (body.email || "").toString().trim();
  if (!email) {
    return createResponse(400, { error: "Email is required." });
  }
  var sheet = getOrCreateSheet("Customers", ["Timestamp", "Email"]);
  sheet.appendRow([new Date(), email]);
  return createResponse(200, { ok: true });
}

function handleVendor(body) {
  var email = (body.email || "").toString().trim();
  var phone = (body.phone || "").toString().trim();
  var businessName = (body.businessName || "").toString().trim();
  if (!email || !phone || !businessName) {
    return createResponse(400, { error: "Email, phone, and business name are required." });
  }
  var sheet = getOrCreateSheet("Vendors", ["Timestamp", "Email", "Phone", "Business Name"]);
  sheet.appendRow([new Date(), email, phone, businessName]);
  return createResponse(200, { ok: true });
}

function getOrCreateSheet(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
  return sheet;
}

function createResponse(code, obj) {
  var output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
```

5. Save the project (Ctrl+S).

## 2. Deploy as web app

1. Click **Deploy → New deployment** (or **Deploy → Manage deployments** and edit the existing one, then **Version → New version** and **Deploy** so the new script is used).
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set **Execute as**: Me (your account).
4. Set **Who has access**: Anyone.
5. Click **Deploy**, authorize if prompted, then copy the **Web app URL** (e.g. `https://script.google.com/macros/s/.../exec`).

## 3. Configure the app

Set the Web app URL in your environment:

- **Local:** in `.env.local`:
  ```bash
  GOOGLE_SHEETS_WEBAPP_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
  ```
- **Production (e.g. Vercel):** set the same variable in your project’s environment variables.

Restart the dev server after changing `.env.local`. Then:

- Checkout complete submissions → **Customers** sheet (Timestamp, Email).
- Join as a Business submissions → **Vendors** sheet (Timestamp, Email, Phone, Business Name).
