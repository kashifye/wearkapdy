import { COLOURS, ColourKey, getProduct, GARMENTS, priceOf } from "@/data/products";
import { BACK_PRINT, PRINT, qkSku } from "@/data/qikink";
import type { QkOrder } from "./qikink";

const SITE = process.env.SITE_URL || "https://www.wearkapde.com";

// notes.items1..n hold "slug|colour|size|qty;slug|colour|size|qty"
export function parseItems(notes: Record<string, string>) {
  return Object.keys(notes).filter((k) => /^items\d+$/.test(k)).sort().flatMap((k) => notes[k].split(";")).filter(Boolean)
    .map((s) => { const [slug, colour, size, qty] = s.split("|"); return { slug, colour, size, qty: Number(qty) }; });
}

export function buildQikinkOrder(orderId: string, notes: Record<string, string>): QkOrder {
  const [first, ...rest] = (notes.name || "Customer").split(" ");
  const line_items = parseItems(notes).map((i) => {
    const p = getProduct(i.slug);
    if (!p || !(i.colour in COLOURS)) throw new Error(`Unknown item ${i.slug}/${i.colour}`);
    return {
      search_from_my_products: 0 as const, quantity: String(i.qty), print_type_id: PRINT.print_type_id, price: String(priceOf(p)),
      sku: qkSku(p.garment, i.colour as ColourKey, i.size),
      designs: [{ design_code: p.design, width_inches: PRINT.width_inches, height_inches: PRINT.height_inches,
        placement_sku: BACK_PRINT.has(p.design) ? "bk" : PRINT.placement,
        design_link: `${SITE}/print/${p.design}.png`, mockup_link: `${SITE}/designs/${p.design}.png` }],
    };
  });
  return {
    order_number: orderId.replace(/^order_/, "WK"), qikink_shipping: "1", gateway: "Prepaid", total_order_value: notes.total,
    line_items,
    shipping_address: { first_name: first, last_name: rest.join(" ") || ".", address1: notes.address, phone: notes.phone, email: notes.email,
      city: notes.city, zip: notes.pincode, province: notes.state, country_code: "IN" },
  };
}
export { GARMENTS };
