// node scripts/gen-captions.mjs  -> marketing/captions.md
import { writeFileSync } from "node:fs";
const C = {
  "wk-01-thermal-unit": ["Delhi mornings need a spec sheet.", "I made a hoodie for exactly 4°C.", "400 GSM. Printed after you order.", "WK-01 Thermal Unit. 400 GSM, drop shoulder, rated for 4°C and below. Printed only after you order."],
  "smart-cloth-beta": ["We wanted to make smart clothes at 18.", "Smart cloth v0.1 (beta).", "The idea that started WearKapde.", "Where WearKapde started: smart clothes. Still in beta. The tee is not."],
  "hoodie-blueprint": ["A hoodie, drawn like a blueprint.", "The technical drawing is the print.", "Engineers will get this.", "Fig. 01: oversized hoodie, printed on an oversized sweatshirt."],
  "delhi-4c": ["It's 4° and you're in a tee.", "Made for Delhi mornings.", "6:10 AM. 4 degrees. Bold choices.", "Made for 4°C Delhi mornings. Layer it under something warmer."],
  "chai-over-everything": ["No further questions.", "Chai > everything. Argue with me.", "Your sardi personality in two words.", "Chai > Everything. 400 GSM hoodie for people who plan their day around the next cup."],
  "razai-committee": ["Meeting at 11 PM. Attendance: horizontal.", "The razai committee is in session.", "Join the committee.", "Razai Committee sweatshirt. For members who attend from under the blanket."],
  "kohra": ["कोहरा, but make it fashion.", "Watch the print fade like fog.", "Visibility: 40 m.", "Kohra. The type dissolves the way the morning does. Oversized hoodie, Drop 01."],
  "delhi-6am": ["7°C. Fog. Chai. Repeat.", "Delhi at 6 AM, on a tee.", "The sun hasn't decided yet.", "Delhi 6 AM. A tee for the hour nobody asked for."],
  "network-nahi-aa-raha": ["Hello? Hello? Can you hear me?", "Every Indian group call, in one tee.", "Network nahi aa raha.", "Network nahi aa raha. The only excuse that works every single time."],
  "jugaad-dept": ["Ticket status: chalta hai.", "Welcome to the Jugaad Dept.", "Fixed with a rubber band.", "Jugaad Dept. For people who fix things with what's lying around."],
  "mummy-approved": ["The only certification that matters.", "Mummy approved. Finally.", "Tag your mummy.", "Mummy Approved. No lab test, no audit, just one look from across the room."],
  "5-minute-mein-aaya": ["He said 5 minutes. It's been 2 hours.", "5 minute mein aaya.", "Send this to the friend who's always late.", "5 Minute Mein Aaya. He was at 7:40 PM. It is 9."],
  "wk-chest-mark": ["Small mark. Quiet tee.", "Just WK on the chest.", "Nothing loud. That's the point.", "A small WK on the chest and nothing else. Oversized 240 GSM tee."],
  "kapde-wordmark-back": ["Plain front. कपड़े on the back.", "The name, across the back.", "Quiet from the front. Loud when you leave.", "Plain front, कपड़े wordmark across the back. 400 GSM oversized hoodie."],
  "indigo-stitch": ["One line of indigo. That's the design.", "Indigo, the oldest Indian dye.", "A single stitch.", "Indigo stitch. One thread-line across the chest, in the colour of Indian cloth."],
  "sardi-01-tag": ["Sardi 01. Small tag, first season.", "The first drop, signed.", "Season one.", "A small Sardi 01 tag on the chest. Our first season, in the quietest way."],
};
const NAMES = Object.keys(C);
const tags = {
  Instagram: "#wearkapde #streetwearindia #indianstreetwear #genzindia #winterfit #sardi #oversizedhoodie #desistreetwear #delhiwinter #madeinindia",
  "YouTube Shorts": "#shorts #streetwear #indianfashion #winteroutfit #desiclothing #wearkapde",
  Pinterest: "indian streetwear, oversized hoodie outfit, winter outfit men india, gen z fashion india, aesthetic hoodie, desi streetwear, winter outfit ideas",
};
let o = `# WearKapde Drop 01 · Sardi: social captions\n\nCadence: 1 reel a day (Instagram, Facebook and YouTube Shorts from the same clip), 3–5 Pinterest pins a day.\nTools (all free): Meta Business Suite, YouTube Studio scheduling, Pinterest scheduler. Batch every Sunday.\n\nHashtags\n\n` + Object.entries(tags).map(([k, v]) => `- **${k}:** ${v}`).join("\n") + "\n\n";
for (const id of NAMES) { const [a, b, c, cap] = C[id]; o += `## ${id}\n\nHooks:\n1. ${a}\n2. ${b}\n3. ${c}\n\nCaption: ${cap} Link in bio.\n\n`; }
writeFileSync("marketing/captions.md", o);
