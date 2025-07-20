import { NextRequest, NextResponse } from "next/server";

const SHEETDB_ENDPOINT = "https://sheetdb.io/api/v1/v532e45i76efm";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // SheetDB expects { data: { ...fields } }
    const sheetRes = await fetch(SHEETDB_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    if (!sheetRes.ok) {
      const err = await sheetRes.text();
      return NextResponse.json({ success: false, message: "Failed to save to Google Sheets", error: err }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: "Form submitted and saved to Google Sheets!" });
  } catch (_error) {
    return NextResponse.json({ success: false, message: "Failed to submit form." }, { status: 400 });
  }
} 