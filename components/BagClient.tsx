"use client";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Garment from "./Garment";
import { useBag } from "@/lib/bag";
import { COLOURS, ColourKey, GARMENTS, getProduct, inr, priceOf } from "@/data/products";

declare global { interface Window { Razorpay?: any } }

export default function BagClient() {
  const { items, remove, setQty, clear } = useBag(), router = useRouter();
  const [busy, setBusy] = useState(false), [err, setErr] = useState("");
  const rows = items.map((i, k) => ({ ...i, k, p: getProduct(i.slug)! })).filter((r) => r.p);
  const total = rows.reduce((a, r) => a + priceOf(r.p) * r.qty, 0);

  if (rows.length === 0) return <div style={{ padding: "32px 0 64px" }}><p className="stone t20">Your bag is empty.</p><p style={{ marginTop: 20 }}><Link className="btn" href="/drop">See Drop 01</Link></p></div>;

  async function pay(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr("");
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setBusy(true);
    try {
      const res = await fetch("/api/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items, customer: f }) });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Something went wrong.");
      if (!window.Razorpay) throw new Error("Payment window didn't load. Refresh and retry.");
      const rz = new window.Razorpay({
        key: d.key, amount: d.amount, currency: "INR", order_id: d.orderId, name: "WearKapde", description: "Drop 01 · Sardi",
        prefill: { name: f.name, email: f.email, contact: f.phone }, theme: { color: "#2B3FD6" },
        modal: { ondismiss: () => setBusy(false) },
        handler: async (r: any) => {
          const v = await fetch("/api/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r) });
          if (v.ok) { clear(); router.push("/success"); } else { setErr("We couldn't confirm the payment. If money was deducted, write to us."); setBusy(false); }
        },
      });
      rz.open();
    } catch (x: any) { setErr(x.message || "Something went wrong."); setBusy(false); }
  }

  return (
    <div className="bagpage">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <section aria-label="Items">
        {rows.map((r) => { const g = GARMENTS[r.p.garment]; return (
          <div className="line" key={r.k}>
            <div className="art"><Garment type={g.type} colour={r.colour as ColourKey} design={r.p.design} /></div>
            <div><Link href={`/p/${r.p.slug}`} className="t20">{r.p.name}</Link>
              <p className="t14 stone">{g.label} · {COLOURS[r.colour as ColourKey]?.name} · {r.size}</p>
              <div className="qty"><button aria-label="Less" onClick={() => setQty(r.k, r.qty - 1)}>−</button><span>{r.qty}</span><button aria-label="More" onClick={() => setQty(r.k, r.qty + 1)}>+</button>
                <button style={{ width: "auto", border: 0, textDecoration: "underline" }} onClick={() => remove(r.k)}>Remove</button></div></div>
            <p>{inr(priceOf(r.p) * r.qty)}</p>
          </div>); })}
        <div className="total"><span>Total</span><span>{inr(total)}</span></div>
        <p className="t14 stone">Shipping included. Prepaid only. Each piece is printed after you order, so it takes 3–5 days to print plus delivery.</p>
      </section>
      <form className="co" onSubmit={pay}>
        <h2 className="t28">Delivery</h2>
        <label>Full name<input name="name" required autoComplete="name" /></label>
        <div className="two"><label>Phone<input name="phone" required inputMode="tel" autoComplete="tel" pattern="[0-9+ ]{10,15}" /></label><label>Email<input name="email" type="email" required autoComplete="email" /></label></div>
        <label>Address<textarea name="address" required rows={3} autoComplete="street-address" placeholder="House, street, area, city, state" /></label>
        <label>Pincode<input name="pincode" required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="postal-code" /></label>
        {err && <p className="err" role="alert">{err}</p>}
        <button className="btn" disabled={busy}>{busy ? "Opening payment…" : `Pay ${inr(total)}`}</button>
        <p className="t14 stone">Secure payment by Razorpay: UPI, cards, netbanking. By paying you accept our <Link className="link" href="/terms">terms</Link>.</p>
      </form>
    </div>
  );
}
