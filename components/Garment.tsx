import { COLOURS, ColourKey, ProductType } from "@/data/products";

const SHAPES: Record<ProductType, { body: string; detail: string; box: [number, number] }> = {
  tee: {
    body: "M215 70 Q300 120 385 70 L520 140 L575 270 L490 300 L465 250 L465 640 L135 640 L135 250 L110 300 L25 270 L80 140 Z",
    detail: "M215 70 Q300 150 385 70", box: [190, 190],
  },
  sweatshirt: {
    body: "M220 60 Q300 105 380 60 L490 100 L585 570 L500 590 L460 310 L460 620 L140 620 L140 310 L100 590 L15 570 L110 100 Z",
    detail: "M220 60 Q300 140 380 60 M140 585 H460",
    box: [190, 180],
  },
  hoodie: {
    body: "M205 95 Q170 -5 300 -5 Q430 -5 395 95 L495 125 L585 575 L500 595 L460 330 L460 630 L140 630 L140 330 L100 595 L15 575 L105 125 Z",
    detail: "M205 95 Q300 215 395 95 M245 140 v70 M355 140 v70 M200 520 H400 L420 630 M200 520 L180 630 M140 600 H460",
    box: [190, 215],
  },
};

export default function Garment({ type, colour, design, className, label }: {
  type: ProductType; colour: ColourKey; design: string; className?: string; label?: string;
}) {
  const s = SHAPES[type], c = COLOURS[colour];
  const stroke = c.dark ? "rgba(255,255,255,.14)" : "rgba(21,22,26,.16)";
  return (
    <svg viewBox="0 0 600 680" className={className} role="img" aria-label={label}>
      <path d={s.body} fill={c.hex} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      <path d={s.detail} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <image href={`/designs/${design}.png`} x={s.box[0]} y={s.box[1]} width="220" height="264" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}
