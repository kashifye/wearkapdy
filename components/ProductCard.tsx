import Link from "next/link";
import Garment from "./Garment";
import { GARMENTS, inr, priceOf, Product } from "@/data/products";
export default function ProductCard({ p }: { p: Product }) {
  const g = GARMENTS[p.garment];
  return (
    <Link href={`/p/${p.slug}`} className="card">
      <div className="art"><Garment type={g.type} colour={p.colours[0]} design={p.design} label={p.name} /></div>
      <div className="meta"><h3>{p.name}</h3><p>{g.label}</p><p>{inr(priceOf(p))}</p></div>
    </Link>
  );
}
