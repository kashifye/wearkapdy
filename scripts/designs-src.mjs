// 16 original WearKapde designs, Drop 01 "Sardi". Canvas 4500x5400, transparent.
// tone "light" = light ink for dark garments; tone "dark" = dark ink for light garments.
const LATIN = "Helvetica Neue, Helvetica, Arial, sans-serif";
const MONO = "Menlo, Courier New, monospace";
const DEV = "Kohinoor Devanagari, Devanagari Sangam MN, Noto Sans Devanagari, sans-serif";
const W = 4500, H = 5400, CX = W / 2;

const tones = {
  light: { ink: "#F4F5F3", soft: "#F4F5F3", acc: "#7E8CFF", faint: 0.35 },
  dark: { ink: "#15161A", soft: "#15161A", acc: "#2B3FD6", faint: 0.3 },
};
const t = (x, y, s, size, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${o.f || LATIN}" font-size="${size}" font-weight="${o.w || 700}" text-anchor="${o.a || "middle"}" fill="${o.c}" ${o.ls ? `letter-spacing="${o.ls}"` : ""} ${o.op ? `opacity="${o.op}"` : ""}>${s}</text>`;
const line = (x1, y1, x2, y2, c, w = 14, extra = "") =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" ${extra}/>`;

export const designs = [
  // ---------- Kapde Lab ----------
  { id: "wk-01-thermal-unit", name: "WK-01 Thermal Unit", theme: "Kapde Lab", tone: "light",
    body: (k) => {
      const rows = [["Fill", "400 GSM fleece"], ["Cuff", "1x1 rib"], ["Shoulder", "Drop"], ["Rated for", "4°C and below"], ["Status", "Prototype"]];
      return `<rect x="700" y="900" width="3100" height="3600" fill="none" stroke="${k.ink}" stroke-width="16"/>`
        + t(900, 1500, "WK-01", 560, { a: "start", c: k.ink, w: 800 })
        + t(900, 1900, "Thermal Unit", 260, { a: "start", c: k.acc })
        + line(700, 2150, 3800, 2150, k.ink, 12)
        + rows.map((r, i) => t(900, 2550 + i * 380, r[0], 150, { a: "start", c: k.ink, f: MONO, w: 400, op: 0.6 }) + t(3600, 2550 + i * 380, r[1], 150, { a: "end", c: k.ink, f: MONO, w: 700 })).join("")
        + t(900, 4300, "WearKapde Lab / Drop 01", 120, { a: "start", c: k.ink, f: MONO, w: 400, op: 0.6 });
    } },
  { id: "smart-cloth-beta", name: "Smart cloth v0.1 (beta)", theme: "Kapde Lab", tone: "light",
    body: (k) => t(CX, 1900, "Smart cloth", 640, { c: k.ink, w: 800 })
      + t(CX, 2500, "v0.1 (beta)", 360, { c: k.acc, f: MONO, w: 700 })
      + `<rect x="900" y="3100" width="2700" height="120" fill="none" stroke="${k.ink}" stroke-width="12"/><rect x="900" y="3100" width="340" height="120" fill="${k.acc}"/>`
      + t(900, 3560, "loading... 12%", 150, { a: "start", c: k.ink, f: MONO, w: 400, op: 0.7 })
      + `<rect x="3470" y="3480" width="130" height="90" fill="${k.ink}"/>` },
  { id: "hoodie-blueprint", name: "Hoodie blueprint", theme: "Kapde Lab", tone: "light",
    body: (k) => {
      const d = `<path d="M1500 1300 Q2250 900 3000 1300 L3700 1700 L3500 2700 L3100 2600 L3100 4300 L1400 4300 L1400 2600 L1000 2700 L800 1700 Z" fill="none" stroke="${k.ink}" stroke-width="20" stroke-linejoin="round"/>`
        + `<path d="M1750 1250 Q1650 650 2250 600 Q2850 650 2750 1250" fill="none" stroke="${k.ink}" stroke-width="20"/><path d="M1850 1250 Q2250 1900 2650 1250" fill="none" stroke="${k.ink}" stroke-width="16"/><path d="M2100 1700 v450 M2400 1700 v450" stroke="${k.acc}" stroke-width="16"/><rect x="1850" y="3300" width="800" height="400" fill="none" stroke="${k.ink}" stroke-width="12"/>`;
      return d + line(1400, 4600, 3100, 4600, k.acc, 12) + line(1400, 4520, 1400, 4680, k.acc, 12) + line(3100, 4520, 3100, 4680, k.acc, 12)
        + t(CX - 50, 4560, "58 cm", 130, { c: k.acc, f: MONO, w: 700 }).replace('x="2200"', 'x="2250"')
        + t(CX, 480, "FIG. 01 / Oversized hoodie", 130, { c: k.ink, f: MONO, w: 400, op: 0.7 });
    } },
  { id: "delhi-4c", name: "Made for 4°C Delhi mornings", theme: "Kapde Lab", tone: "light",
    body: (k) => t(CX, 3000, "4°", 2000, { c: k.ink, w: 800 })
      + t(CX, 3550, "Made for Delhi mornings", 250, { c: k.ink })
      + t(CX, 3900, "WK-01 / tested at 6:10 AM", 120, { c: k.acc, f: MONO, w: 400 }) },
  // ---------- Sardi Season ----------
  { id: "chai-over-everything", name: "Chai > Everything", theme: "Sardi Season", tone: "light",
    body: (k) => t(CX, 1800, "Chai &gt;", 900, { c: k.ink, w: 800 }) + t(CX, 2700, "Everything", 700, { c: k.ink, w: 800 })
      + `<path d="M1900 3400 h700 v500 q0 300 -350 300 t-350 -300 z" fill="none" stroke="${k.acc}" stroke-width="30"/><path d="M2600 3550 q200 0 200 180 t-200 180" fill="none" stroke="${k.acc}" stroke-width="30"/>`
      + `<path d="M2050 3250 q-80 -120 0 -240 M2250 3250 q-80 -120 0 -240 M2450 3250 q-80 -120 0 -240" fill="none" stroke="${k.ink}" stroke-width="20" stroke-linecap="round" opacity="0.6"/>` },
  { id: "razai-committee", name: "Razai Committee", theme: "Sardi Season", tone: "light",
    body: (k) => {
      let q = "";
      for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) q += `<path d="M${900 + i * 450} ${3200 + j * 330} l225 165 l225 -165 l-225 -165 z" fill="none" stroke="${k.ink}" stroke-width="12" opacity="0.45"/>`;
      return t(CX, 1600, "Razai", 800, { c: k.ink, w: 800 }) + t(CX, 2400, "Committee", 800, { c: k.ink, w: 800 })
        + t(CX, 2800, "Meeting at 11 PM. Attendance: horizontal.", 130, { c: k.acc, f: MONO, w: 400 }) + q;
    } },
  { id: "kohra", name: "Kohra", theme: "Sardi Season", tone: "light",
    body: (k) => {
      let s = "";
      const bands = 14, top = 1300, bh = 220;
      for (let i = 0; i < bands; i++) {
        const y = top + i * bh, off = i * i * 3, op = Math.max(0.12, 1 - i * 0.06);
        s += `<clipPath id="c${i}"><rect x="0" y="${y}" width="${W}" height="${bh - 14}"/></clipPath><g clip-path="url(#c${i})" opacity="${op.toFixed(2)}">${t(CX + off, 3000, "कोहरा", 1700, { c: k.ink, f: DEV, w: 700 })}</g>`;
      }
      return s + t(CX, 4700, "kohra / fog / visibility 40 m", 130, { c: k.acc, f: MONO, w: 400 });
    } },
  { id: "delhi-6am", name: "Delhi 6 AM", theme: "Sardi Season", tone: "light",
    body: (k) => `<clipPath id="hz"><rect x="0" y="0" width="${W}" height="2600"/></clipPath><circle cx="${CX}" cy="2600" r="800" fill="${k.acc}" clip-path="url(#hz)"/>`
      + line(1000, 2600, 3500, 2600, k.ink, 16)
      + t(CX, 3500, "Delhi 6 AM", 560, { c: k.ink, w: 800 }) + t(CX, 3900, "7°C / kohra / chai", 170, { c: k.ink, f: MONO, w: 400, op: 0.7 }) },
  // ---------- Desi Jokes ----------
  { id: "network-nahi-aa-raha", name: "Network Nahi Aa Raha", theme: "Desi Jokes", tone: "light",
    body: (k) => [0, 1, 2, 3].map((i) => `<rect x="${1600 + i * 330}" y="${2300 - i * 260}" width="220" height="${200 + i * 260}" fill="none" stroke="${k.ink}" stroke-width="16"/>`).join("")
      + line(1500, 1200, 3000, 2800, k.acc, 28, 'stroke-linecap="round"')
      + t(CX, 3400, "Network", 560, { c: k.ink, w: 800 }) + t(CX, 3950, "nahi aa raha", 420, { c: k.ink }) },
  { id: "jugaad-dept", name: "Jugaad Dept.", theme: "Desi Jokes", tone: "light",
    body: (k) => `<rect x="800" y="1500" width="2900" height="2100" fill="none" stroke="${k.ink}" stroke-width="30" transform="rotate(-4 2250 2550)"/>`
      + `<g transform="rotate(-4 2250 2550)">` + t(CX, 2500, "JUGAAD", 760, { c: k.ink, w: 800 }) + t(CX, 3050, "DEPT.", 400, { c: k.acc, w: 800 }) + `</g>`
      + t(CX, 4100, "Ticket #∞ / status: chalta hai", 150, { c: k.ink, f: MONO, w: 400, op: 0.7 }) },
  { id: "mummy-approved", name: "Mummy Approved", theme: "Desi Jokes", tone: "light",
    body: (k) => `<circle cx="${CX}" cy="2700" r="1300" fill="none" stroke="${k.acc}" stroke-width="40"/><circle cx="${CX}" cy="2700" r="1160" fill="none" stroke="${k.acc}" stroke-width="12"/>`
      + `<path d="M1700 2750 l400 400 l750 -900" fill="none" stroke="${k.ink}" stroke-width="90" stroke-linecap="round" stroke-linejoin="round"/>`
      + t(CX, 4400, "Mummy", 420, { c: k.ink, w: 800 }) + t(CX, 4800, "approved", 300, { c: k.ink }) },
  { id: "5-minute-mein-aaya", name: "5 Minute Mein Aaya", theme: "Desi Jokes", tone: "light",
    body: (k) => `<circle cx="${CX}" cy="2000" r="800" fill="none" stroke="${k.ink}" stroke-width="30"/>`
      + line(CX, 2000, CX, 1400, k.ink, 36, 'stroke-linecap="round"') + line(CX, 2000, CX + 380, 2200, k.acc, 36, 'stroke-linecap="round"')
      + t(CX, 3500, "5 minute", 560, { c: k.ink, w: 800 }) + t(CX, 4050, "mein aaya", 560, { c: k.ink, w: 800 })
      + t(CX, 4400, "(was at 7:40 PM)", 140, { c: k.acc, f: MONO, w: 400 }) },
  // ---------- Quiet ----------
  { id: "wk-chest-mark", name: "WK chest mark", theme: "Quiet", tone: "dark",
    body: (k) => t(1250, 1350, "WK", 340, { c: k.ink, w: 800, ls: 20 }) },
  { id: "kapde-wordmark-back", name: "कपड़े back wordmark", theme: "Quiet", tone: "dark",
    body: (k) => t(CX, 2900, "कपड़े", 1500, { c: k.ink, f: DEV, w: 700 }) },
  { id: "indigo-stitch", name: "Indigo stitch", theme: "Quiet", tone: "dark",
    body: (k) => `<path d="M700 3200 C1700 2200 2800 4200 3800 3200" fill="none" stroke="${k.acc}" stroke-width="34" stroke-dasharray="150 110" stroke-linecap="round"/>` },
  { id: "sardi-01-tag", name: "Sardi 01 tag", theme: "Quiet", tone: "dark",
    body: (k) => t(1250, 1350, "Sardi 01", 190, { c: k.ink, w: 600, ls: 10 }) + line(740, 1450, 1760, 1450, k.acc, 14) },
];

export const svgFor = (d) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><title>${d.name}</title>${d.body(tones[d.tone])}</svg>`;
