// Minimal Qikink API client. Check field names against the API page in your Qikink dashboard
// (Settings → API / Integrations) before going live; start on the sandbox base URL.
const BASE = process.env.QIKINK_BASE_URL || "https://sandbox.qikink.com";

async function token(): Promise<string> {
  const body = new URLSearchParams({ ClientId: process.env.QIKINK_CLIENT_ID!, client_secret: process.env.QIKINK_CLIENT_SECRET! });
  const r = await fetch(`${BASE}/api/token`, { method: "POST", body });
  const d = await r.json().catch(() => ({}));
  if (!r.ok || !d.Accesstoken) throw new Error(`Qikink token failed (${r.status})`);
  return d.Accesstoken;
}

export type QkOrder = {
  order_number: string; qikink_shipping: "1"; gateway: "Prepaid"; total_order_value: string;
  line_items: { search_from_my_products: 0; quantity: string; print_type_id: number; price: string; sku: string;
    designs: { design_code: string; width_inches: string; height_inches: string; placement_sku: string; design_link: string; mockup_link: string }[] }[];
  shipping_address: { first_name: string; last_name: string; address1: string; phone: string; email: string; city: string; zip: string; province: string; country_code: "IN" };
};

export async function createQikinkOrder(order: QkOrder) {
  const r = await fetch(`${BASE}/api/order/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ClientId: process.env.QIKINK_CLIENT_ID!, Accesstoken: await token() },
    body: JSON.stringify(order),
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`Qikink order failed (${r.status}): ${text.slice(0, 300)}`);
  return text;
}
export const qikinkEnabled = () => !!(process.env.QIKINK_CLIENT_ID && process.env.QIKINK_CLIENT_SECRET);
