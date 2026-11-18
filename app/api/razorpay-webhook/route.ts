// Razorpay → Qikink automation. In Razorpay: Settings → Webhooks → add
//   URL: https://www.wearkapde.com/api/razorpay-webhook   Event: order.paid   Secret: RAZORPAY_WEBHOOK_SECRET
import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { buildQikinkOrder } from "@/lib/fulfil";
import { createQikinkOrder, qikinkEnabled } from "@/lib/qikink";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const raw = await req.text();
  const sig = req.headers.get("x-razorpay-signature") || "";
  if (!secret) return NextResponse.json({ ok: false }, { status: 503 });
  const exp = Buffer.from(crypto.createHmac("sha256", secret).update(raw).digest("hex")), got = Buffer.from(sig);
  if (exp.length !== got.length || !crypto.timingSafeEqual(exp, got)) return NextResponse.json({ ok: false }, { status: 400 });

  const evt = JSON.parse(raw);
  if (evt.event !== "order.paid") return NextResponse.json({ ok: true, skipped: evt.event });
  const order = evt.payload?.order?.entity;
  if (!order?.id) return NextResponse.json({ ok: false }, { status: 400 });
  if (!qikinkEnabled()) return NextResponse.json({ ok: true, manual: true }); // place it by hand from the Razorpay email

  try {
    const res = await createQikinkOrder(buildQikinkOrder(order.id, order.notes || {}));
    console.log("qikink order created", order.id, res.slice(0, 200));
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("qikink order failed", order.id, e);
    if (String(e).toLowerCase().includes("already")) return NextResponse.json({ ok: true, duplicate: true });
    return NextResponse.json({ ok: false }, { status: 500 }); // Razorpay retries
  }
}
