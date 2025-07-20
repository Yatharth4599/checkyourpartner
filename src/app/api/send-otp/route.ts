import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = "re_5xggTWdq_GKeZBq3BBqAf1cFJYjNMVgJ1";
const FROM_EMAIL = "CheckYourPartner <noreply@checkyourpartner.com>";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: "Your OTP for CheckYourPartner.com",
        html: `<h2>Your OTP is: <span style='color:#d946ef;'>${otp}</span></h2><p>Enter this code to verify your email.</p>`
      })
    });
    if (!res.ok) return NextResponse.json({ success: false, message: "Failed to send OTP" }, { status: 500 });
    // For demo, return OTP. In production, do not return OTP to client!
    return NextResponse.json({ success: true, otp });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to send OTP" }, { status: 500 });
  }
} 