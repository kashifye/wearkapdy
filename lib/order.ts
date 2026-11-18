import { COLOURS, getProduct, priceOf, SIZES } from "@/data/products";
export type RawItem = { slug: string; colour: string; size: string; qty: number };
export type Priced = { slug: string; name: string; colour: string; size: string; qty: number; unit: number };
export function priceItems(raw: unknown): { items: Priced[]; total: number } | null {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 20) return null;
  const items: Priced[] = [];
  for (const r of raw as RawItem[]) {
    const p = getProduct(String(r?.slug));
    const qty = Number(r?.qty);
    if (!p || !(r.colour in COLOURS) || !p.colours.includes(r.colour as never) || !(SIZES as readonly string[]).includes(r.size) || !Number.isInteger(qty) || qty < 1 || qty > 10) return null;
    items.push({ slug: p.slug, name: p.name, colour: r.colour, size: r.size, qty, unit: priceOf(p) });
  }
  return { items, total: items.reduce((a, i) => a + i.unit * i.qty, 0) };
}
