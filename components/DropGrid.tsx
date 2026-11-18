"use client";
import Link from "next/link";
import { useState } from "react";
import Garment from "./Garment";
import { GARMENTS, inr, priceOf, products, ProductType } from "@/data/products";
const F: { k: "all" | ProductType; l: string }[] = [{ k: "all", l: "All" }, { k: "hoodie", l: "Hoodies" }, { k: "sweatshirt", l: "Sweatshirts" }, { k: "tee", l: "Tees" }];
export default function DropGrid() {
  const [f, setF] = useState<"all" | ProductType>("all");
  const list = products.filter((p) => f === "all" || GARMENTS[p.garment].type === f);
  return (<>
    <div className="filters" role="group" aria-label="Filter by type">{F.map((x) => <button key={x.k} className="chip" aria-pressed={f === x.k} onClick={() => setF(x.k)}>{x.l}</button>)}</div>
    <div className="grid">{list.map((p) => (
      <Link key={p.slug} href={`/p/${p.slug}`} className="card">
        <div className="art"><Garment type={GARMENTS[p.garment].type} colour={p.colours[0]} design={p.design} label={p.name} /></div>
        <div className="row"><div><h3 className="t20">{p.name}</h3><p className="t14 stone">{GARMENTS[p.garment].label}</p></div><p>{inr(priceOf(p))}</p></div>
      </Link>))}</div>
  </>);
}
