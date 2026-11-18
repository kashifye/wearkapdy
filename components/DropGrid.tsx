"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { GARMENTS, products, ProductType } from "@/data/products";
type K = "all" | ProductType;
const F: { k: K; l: string }[] = [{ k: "all", l: "All" }, { k: "hoodie", l: "Hoodies" }, { k: "sweatshirt", l: "Sweatshirts" }, { k: "tee", l: "Tees" }];
export default function DropGrid() {
  const [f, setF] = useState<K>("all");
  useEffect(() => { const t = new URLSearchParams(location.search).get("type"); if (t && F.some((x) => x.k === t)) setF(t as K); }, []);
  const list = products.filter((p) => f === "all" || GARMENTS[p.garment].type === f);
  return (<>
    <div className="filters" role="group" aria-label="Filter by type">{F.map((x) => <button key={x.k} className="chip" aria-pressed={f === x.k} onClick={() => setF(x.k)}>{x.l}</button>)}</div>
    <div className="grid">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
  </>);
}
