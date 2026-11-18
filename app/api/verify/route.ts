import crypto from "node:crypto";
import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return NextResponse.json({ ok: false }, { status: 503 });
  const b = await req.json().catch(() => ({}));
  const { razorpay_order_id: o, razorpay_payment_id: p, razorpay_signature: s } = b ?? {};
  if (typeof o !== "string" || typeof p !== "string" || typeof s !== "string") return NextResponse.json({ ok: false }, { status: 400 });
  const expected = crypto.createHmac("sha256", secret).update(`${o}|${p}`).digest("hex");
  const a = Buffer.from(expected), c = Buffer.from(s);
  const ok = a.length === c.length && crypto.timingSafeEqual(a, c);
  return NextResponse.json({ ok }, { status: ok ? 200 : 400 });
}
