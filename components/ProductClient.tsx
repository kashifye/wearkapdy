"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Garment from "./Garment";
import { useBag } from "@/lib/bag";
import { COLOURS, GARMENTS, inr, priceOf, Product, SIZES, SIZE_CHART } from "@/data/products";

export default function ProductClient({ product: p }: { product: Product }) {
  const g = GARMENTS[p.garment], { add } = useBag(), router = useRouter();
  const [colour, setColour] = useState(p.colours[0]);
  const [size, setSize] = useState<string>("");
  const [err, setErr] = useState("");
  const go = () => {
    if (!size) { setErr("Pick a size first."); return; }
    add({ slug: p.slug, colour, size, qty: 1 }); router.push("/bag");
  };
  return (
    <div className="pdp">
      <div className="stage"><Garment type={g.type} colour={colour} design={p.design} label={`${p.name} in ${COLOURS[colour].name}`} /></div>
      <div className="panel">
        <div><p className="stone t14">{p.theme}</p><h1 className="t44">{p.name}</h1><p className="stone t20" style={{ marginTop: 8 }}>{p.blurb}</p></div>
        <p className="t28">{inr(priceOf(p))} <span className="stone t14">incl. shipping</span></p>
        <div className="field"><span className="t14">Colour: {COLOURS[colour].name}</span>
          <div className="swatches">{p.colours.map((c) => <button key={c} className="sw" style={{ background: COLOURS[c].hex }} aria-label={COLOURS[c].name} aria-pressed={colour === c} onClick={() => setColour(c)} />)}</div></div>
        <div className="field"><span className="t14">Size</span>
          <div className="sizes" role="group" aria-label="Size">{SIZES.map((s) => <button key={s} className="sz" aria-pressed={size === s} onClick={() => { setSize(s); setErr(""); }}>{s}</button>)}</div>
          {err && <p className="err" role="alert">{err}</p>}</div>
        <button className="btn" onClick={go}>Add to bag</button>
        <p className="t14 stone">Printed after you order. Ships in 3–5 days after printing. Prepaid only.</p>
        <div className="facts">
          <div><span>Garment</span><span>{g.label}</span></div>
          <div><span>Fabric weight</span><span>{g.gsm} GSM cotton</span></div>
          <div><span>Fit</span><span>{g.fit}</span></div>
          <div><span>Print</span><span>Direct to garment</span></div>
        </div>
        <details><summary>Size chart (cm)</summary>
          <table><thead><tr><th>Size</th><th>Chest</th><th>Length</th></tr></thead><tbody>{SIZE_CHART.map((r) => <tr key={r.size}><td>{r.size}</td><td>{r.chest}</td><td>{r.length}</td></tr>)}</tbody></table>
          <p className="t14 stone" style={{ marginTop: 8 }}>Approximate, garment measurements. Between sizes? Size down for a regular fit.</p></details>
      </div>
    </div>
  );
}
