import Link from "next/link";
import Hero from "@/components/Hero";
import Garment from "@/components/Garment";
import { GARMENTS, getProduct, inr, priceOf, products } from "@/data/products";

const FEATURED = ["chai-over-everything", "smart-cloth-beta", "kohra", "network-nahi-aa-raha"];
const TONES = ["a", "b", "c", "a"];

export default function Home() {
  return (
    <>
      <Hero />
      <div className="wrap sec-h"><h2 className="t72">Drop 01 · Sardi</h2><p className="stone t20" style={{ marginTop: 12 }}>Sixteen designs for winter. Fog, chai, razai, and a few jokes.</p></div>
      {FEATURED.map((slug, i) => {
        const p = getProduct(slug)!, g = GARMENTS[p.garment];
        return (
          <section key={slug} className={`tile ${TONES[i]} ${i % 2 ? "flip" : ""}`}>
            <div className="tile-copy">
              <p className="t14 stone">{p.theme}</p>
              <h3 className="t44">{p.name}</h3>
              <p className="t20 stone">{p.blurb}</p>
              <p>{g.label} · {inr(priceOf(p))}</p>
              <div className="btnrow"><Link className="btn" href={`/p/${p.slug}`}>Buy</Link><Link className="link" href={`/p/${p.slug}`}>Details</Link></div>
            </div>
            <div className="tile-art"><Garment type={g.type} colour={p.colours[0]} design={p.design} label={p.name} /></div>
          </section>
        );
      })}
      <div className="wrap" style={{ textAlign: "center", marginTop: 32 }}><Link href="/drop" className="btn ghost">See all {products.length} designs</Link></div>

      <section className="wrap sec-h">
        <h2 className="t72">Printed after you order.</h2>
        <p className="stone t20" style={{ marginTop: 12 }}>Nothing sits in a warehouse. That's why there's no sale rack and no waste.</p>
        <ol className="steps">
          <li><span className="n">1</span><h3 className="t28">You order</h3><p className="stone">Pay once, prepaid. No COD.</p></li>
          <li><span className="n">2</span><h3 className="t28">We print it</h3><p className="stone">Your piece is printed in 3–5 days.</p></li>
          <li><span className="n">3</span><h3 className="t28">It ships</h3><p className="stone">Tracking lands in your inbox.</p></li>
        </ol>
      </section>

      <section className="wrap">
        <h2 className="t44">On Instagram</h2>
        <p className="stone">A reel a day, from the lab and the street. <a className="link" href="https://www.instagram.com/wearkapde" rel="noopener">@wearkapde</a></p>
        <div className="strip">
          {products.slice(0, 6).map((p) => (
            <a key={p.slug} href="https://www.instagram.com/wearkapde" rel="noopener" aria-label={`${p.name} on Instagram`}><Garment type={GARMENTS[p.garment].type} colour={p.colours[0]} design={p.design} /></a>
          ))}
        </div>
      </section>
    </>
  );
}
