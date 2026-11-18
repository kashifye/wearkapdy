# WearKapde

Next.js (App Router, TypeScript) on Vercel → wearkapde.com. Print-on-demand via Qikink, payments via Razorpay.

```bash
npm install
npm run dev
npm run export-prints   # rebuilds designs/*.svg, designs/print/*.png (4500x5400), public/designs/*.png
npm run build
```

## Add a product (about a minute)
1. Add a design function to `scripts/designs-src.mjs` (or drop a PNG in `public/designs/`), then `npm run export-prints`.
2. Add one entry to `data/products.ts`: slug, name, theme, garment (`hoodie-oversized` | `hoodie-classic` | `sweatshirt` | `tee-240` | `tee-180`), colours, design file name, blurb.
3. Prices, GSM and Qikink SKUs per garment live in `GARMENTS` in the same file. Check them against the Qikink rate card.

## Env vars (Vercel, never git)
`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`. See `.env.example`.

## Place a Qikink order
1. Razorpay emails you when an order is paid. Open it in the Razorpay dashboard → Payments → the payment → Notes.
2. Notes hold name, phone, email, address, pincode, and `items`: lines like `UH32 kohra black M x1` (Qikink SKU, product slug, colour, size, qty).
3. In Qikink: create order → pick the SKU and size/colour → upload `designs/print/<design>.png` (design file name is in `data/products.ts`) → paste the customer address → pay.
4. Send the customer tracking when Qikink ships (3–5 days).

The server recomputes the total from `data/products.ts`; the client price is never trusted.

## Notes
- Print PNGs are rasterised with system fonts (Helvetica Neue, Menlo, Kohinoor Devanagari on macOS), so run `export-prints` on a Mac or install equivalents.
- Site mockups are generated garment silhouettes; replace with real Qikink mockups/photos once samples arrive.
- Social: see `marketing/captions.md`.
