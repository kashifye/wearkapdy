// Single source of truth. Confirm base prices on the Qikink dashboard and update here.
export type GarmentKey = "hoodie-oversized" | "hoodie-classic" | "sweatshirt" | "tee-240" | "tee-180";
export type ProductType = "hoodie" | "sweatshirt" | "tee";

export const GARMENTS: Record<GarmentKey, { label: string; type: ProductType; sku: string; price: number; gsm: number; fit: string }> = {
  "hoodie-oversized": { label: "Oversized hoodie", type: "hoodie", sku: "UH32", price: 1999, gsm: 400, fit: "Oversized, drop shoulder" },
  "hoodie-classic": { label: "Classic hoodie", type: "hoodie", sku: "UNISEX-HOODIE", price: 1599, gsm: 320, fit: "Regular" },
  sweatshirt: { label: "Oversized sweatshirt", type: "sweatshirt", sku: "UH35", price: 1499, gsm: 340, fit: "Oversized, drop shoulder" },
  "tee-240": { label: "Oversized tee", type: "tee", sku: "UC22", price: 1099, gsm: 240, fit: "Oversized, drop shoulder" },
  "tee-180": { label: "Oversized tee (lite)", type: "tee", sku: "US22", price: 699, gsm: 180, fit: "Oversized, drop shoulder" },
};

export const COLOURS = {
  black: { name: "Black", hex: "#15161A", dark: true },
  charcoal: { name: "Charcoal", hex: "#3A3C41", dark: true },
  navy: { name: "Midnight", hex: "#1B2250", dark: true },
  kora: { name: "Off white", hex: "#F4F5F3", dark: false },
  sand: { name: "Sand", hex: "#D9D2C3", dark: false },
  ash: { name: "Ash", hex: "#C9CCCF", dark: false },
} as const;
export type ColourKey = keyof typeof COLOURS;

export const SIZES = ["XS", "S", "M", "L", "XL", "2XL"] as const;
export type Size = (typeof SIZES)[number];

export type Product = {
  slug: string; name: string; theme: string; garment: GarmentKey;
  colours: ColourKey[]; design: string; blurb: string; hero?: boolean;
};

const D: ColourKey[] = ["black", "charcoal", "navy"];
const L: ColourKey[] = ["kora", "sand", "ash"];

export const products: Product[] = [
  { slug: "wk-01-thermal-unit", name: "WK-01 Thermal Unit", theme: "Kapde Lab", garment: "hoodie-oversized", colours: D, design: "wk-01-thermal-unit", hero: true, blurb: "A spec sheet for the one thing it does: keep you warm at 4°C." },
  { slug: "smart-cloth-beta", name: "Smart cloth v0.1", theme: "Kapde Lab", garment: "tee-240", colours: D, design: "smart-cloth-beta", blurb: "Where WearKapde started. Still in beta, like most of us." },
  { slug: "hoodie-blueprint", name: "Hoodie blueprint", theme: "Kapde Lab", garment: "sweatshirt", colours: D, design: "hoodie-blueprint", blurb: "The technical drawing, printed on the thing it describes." },
  { slug: "delhi-4c", name: "Made for 4°C", theme: "Kapde Lab", garment: "tee-180", colours: D, design: "delhi-4c", blurb: "Made for Delhi mornings. Wear it under something warmer." },
  { slug: "chai-over-everything", name: "Chai > Everything", theme: "Sardi Season", garment: "hoodie-oversized", colours: D, design: "chai-over-everything", blurb: "No further questions." },
  { slug: "razai-committee", name: "Razai Committee", theme: "Sardi Season", garment: "sweatshirt", colours: D, design: "razai-committee", blurb: "Meeting at 11 PM. Attendance: horizontal." },
  { slug: "kohra", name: "Kohra", theme: "Sardi Season", garment: "hoodie-oversized", colours: D, design: "kohra", blurb: "कोहरा, fading out the way the morning does." },
  { slug: "delhi-6-am", name: "Delhi 6 AM", theme: "Sardi Season", garment: "tee-240", colours: D, design: "delhi-6am", blurb: "7°C, fog, and a sun that hasn't decided yet." },
  { slug: "network-nahi-aa-raha", name: "Network Nahi Aa Raha", theme: "Desi Jokes", garment: "tee-180", colours: D, design: "network-nahi-aa-raha", blurb: "Hello? Hello? Can you hear me?" },
  { slug: "jugaad-dept", name: "Jugaad Dept.", theme: "Desi Jokes", garment: "hoodie-classic", colours: D, design: "jugaad-dept", blurb: "Ticket status: chalta hai." },
  { slug: "mummy-approved", name: "Mummy Approved", theme: "Desi Jokes", garment: "tee-240", colours: D, design: "mummy-approved", blurb: "The only certification that matters." },
  { slug: "5-minute-mein-aaya", name: "5 Minute Mein Aaya", theme: "Desi Jokes", garment: "tee-180", colours: D, design: "5-minute-mein-aaya", blurb: "He was at 7:40 PM. It is 9." },
  { slug: "wk-chest-mark", name: "WK chest mark", theme: "Quiet", garment: "tee-240", colours: L, design: "wk-chest-mark", blurb: "A small WK on the chest. That's all." },
  { slug: "kapde-wordmark", name: "कपड़े back wordmark", theme: "Quiet", garment: "hoodie-oversized", colours: L, design: "kapde-wordmark-back", blurb: "Plain front. The name across the back." },
  { slug: "indigo-stitch", name: "Indigo stitch", theme: "Quiet", garment: "sweatshirt", colours: L, design: "indigo-stitch", blurb: "One line of indigo thread, drawn across the chest." },
  { slug: "sardi-01-tag", name: "Sardi 01", theme: "Quiet", garment: "tee-240", colours: L, design: "sardi-01-tag", blurb: "A small tag for a first season." },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const priceOf = (p: Product) => GARMENTS[p.garment].price;
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export const SIZE_CHART: { size: Size; chest: number; length: number }[] = [
  { size: "XS", chest: 104, length: 66 }, { size: "S", chest: 108, length: 68 }, { size: "M", chest: 112, length: 70 },
  { size: "L", chest: 116, length: 72 }, { size: "XL", chest: 120, length: 74 }, { size: "2XL", chest: 124, length: 76 },
];
