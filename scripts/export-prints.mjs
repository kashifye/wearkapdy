// npm run export-prints
// Writes designs/*.svg, designs/print/*.png (4500x5400 transparent) and public/designs/*.png (900px web preview).
// Text is rasterised with system fonts (Helvetica Neue, Menlo, Kohinoor Devanagari on macOS), so the PNGs have it baked in.
import { Resvg } from "@resvg/resvg-js";
import { mkdirSync, writeFileSync } from "node:fs";
import { designs, svgFor } from "./designs-src.mjs";

for (const d of ["designs/print", "public/designs"]) mkdirSync(d, { recursive: true });
for (const d of designs) {
  const svg = svgFor(d);
  writeFileSync(`designs/${d.id}.svg`, svg);
  const render = (w) => new Resvg(svg, { fitTo: { mode: "width", value: w }, font: { loadSystemFonts: true } }).render().asPng();
  writeFileSync(`designs/print/${d.id}.png`, render(4500));
  writeFileSync(`public/designs/${d.id}.png`, render(900));
  console.log("ok", d.id);
}
