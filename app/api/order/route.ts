import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { GARMENTS, getProduct } from "@/data/products";
import { priceItems } from "@/lib/order";

export const runtime = "nodejs";
const clean = (v: unknown, n: number) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, n);

export async function POST(req: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID, secret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !secret) return NextResponse.json({ error: "Payments are not switched on yet." }, { status: 503 });
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Bad request" }, { status: 400 }); }

  const priced = priceItems(body?.items);
  if (!priced) return NextResponse.json({ error: "Your bag has an invalid item." }, { status: 400 });
  const c = body?.customer ?? {};
  const name = clean(c.name, 80), phone = clean(c.phone, 15).replace(/\D/g, ""), email = clean(c.email, 120);
  const address = clean(c.address, 240), pincode = clean(c.pincode, 6);
  if (!name || phone.length < 10 || !/^\S+@\S+\.\S+$/.test(email) || !address || !/^\d{6}$/.test(pincode))
    return NextResponse.json({ error: "Please check your details." }, { status: 400 });

  // Qikink line per item: "UH32 | Kohra | black | M x1"
  const lines = priced.items.map((i) => `${GARMENTS[getProduct(i.slug)!.garment].sku} ${i.slug} ${i.colour} ${i.size} x${i.qty}`);
  const notes: Record<string, string> = { name, phone, email, address, pincode, total: String(priced.total) };
  let k = 1, cur = "";
  for (const l of lines) { if ((cur + l).length > 230) { notes[`items${k++}`] = cur; cur = ""; } cur += (cur ? "; " : "") + l; }
  if (cur) notes[`items${k}`] = cur;

  try {
    const rp = new Razorpay({ key_id: keyId, key_secret: secret });
    const order = await rp.orders.create({ amount: priced.total * 100, currency: "INR", receipt: `wk_${Date.now()}`, notes });
    return NextResponse.json({ orderId: order.id, amount: order.amount, key: keyId });
  } catch {
    return NextResponse.json({ error: "Could not start payment. Try again." }, { status: 502 });
  }
}
