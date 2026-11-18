// Qikink catalogue mapping. Fill these from your Qikink dashboard (Products → the blank → SKU column).
// Qikink SKUs look like "<product code>-<colour code>-<size>". Check one real SKU per garment and adjust.
import type { ColourKey, GarmentKey } from "./products";

export const QK_PRODUCT: Record<GarmentKey, string> = {
  "hoodie-oversized": "UH32",
  "hoodie-classic": "UH24",   // TODO confirm the unisex hoodie code
  sweatshirt: "UH35",
  "tee-240": "UC22",
  "tee-180": "US22",
};
export const QK_COLOUR: Record<ColourKey, string> = {
  black: "Bk", charcoal: "Ch", navy: "Nb", white: "Wh", sand: "Bg", ash: "Gr", bone: "Of",
};
export const qkSku = (g: GarmentKey, c: ColourKey, size: string) => `${QK_PRODUCT[g]}-${QK_COLOUR[c]}-${size}`;

// Print placement. "fr" = front, "bk" = back. 4500x5400 px at 300 DPI = 15 x 18 in; we print at A3-ish 11.7 x 14 in.
export const PRINT = { placement: "fr", width_inches: "11.7", height_inches: "14", print_type_id: 1 /* 1 = DTG */ };
export const BACK_PRINT = new Set(["kapde-wordmark-back"]);
