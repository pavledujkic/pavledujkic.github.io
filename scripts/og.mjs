// Renders the share images (public/og.png, public/og-twain.png) and the home-screen icon from HTML with the site's fonts
// and the Twain poster, at 1200×630. Uses the Chromium Playwright already has installed.
//   node scripts/og.mjs
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const font = (p) => `data:font/woff2;base64,${readFileSync(join(root, "node_modules", p)).toString("base64")}`;
const poster = `data:image/webp;base64,${readFileSync(join(root, "public/media/twain-poster.webp")).toString("base64")}`;
const css = `
@font-face { font-family: Inter; src: url(${font("@fontsource-variable/inter/files/inter-latin-wght-normal.woff2")}) format("woff2"); font-weight: 100 900; }
@font-face { font-family: Instrument; src: url(${font("@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2")}) format("woff2"); }
@font-face { font-family: Instrument; font-style: italic; src: url(${font("@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2")}) format("woff2"); }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; background: #0b0b0c; color: #ededef; font-family: Inter; display: grid; grid-template-columns: 1fr 330px; align-items: center; padding: 0 90px; position: relative; }
.glow { position: absolute; right: 40px; top: 60px; width: 520px; height: 520px; background: radial-gradient(closest-side at 35% 40%, rgba(255,122,69,.45), transparent), radial-gradient(closest-side at 70% 65%, rgba(61,169,252,.4), transparent); filter: blur(60px); }
.label { font-size: 17px; letter-spacing: .08em; text-transform: uppercase; color: #8c8c96; font-weight: 500; }
h1 { font-family: Instrument; font-weight: 400; font-size: 92px; line-height: .98; letter-spacing: -0.02em; margin-top: 22px; }
h1 em { background: linear-gradient(100deg, #ff7a45 10%, #ff9d5c 45%, #3da9fc 95%); -webkit-background-clip: text; color: transparent; padding-right: .05em; }
p { margin-top: 26px; font-size: 24px; color: #a7a7b0; }
.phone { position: relative; width: 250px; height: 541px; margin-top: 150px; justify-self: center; padding: 9px; border-radius: 40px; background: linear-gradient(150deg, #34343a, #121214 46%, #24242a); box-shadow: inset 0 0 0 1px rgba(255,255,255,.07), 0 40px 80px -20px rgba(0,0,0,.6); }
.phone img { width: 100%; height: 100%; object-fit: cover; border-radius: 32px; }
`;
const pages = {
  "og.png": `<div class="glow"></div><div><div class="label">Pavle Dujkic · Belgrade</div><h1>I build software that feels <em>instant.</em></h1><p>Lately: Twain, a face-to-face live translator.</p></div><div class="phone"><img src="${poster}"></div>`,
  "og-twain.png": `<div class="glow"></div><div><div class="label">Case study · iOS · Android</div><h1>Twain</h1><p style="font-size:30px;color:#ededef">Two languages. One conversation.</p><p>A face-to-face live translator: each person reads and hears the other in their own language.</p></div><div class="phone"><img src="${poster}"></div>`,
};
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [file, body] of Object.entries(pages)) {
  await page.setContent(`<!doctype html><html><head><style>${css}</style></head><body>${body}</body></html>`, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(root, "public", file) });
  console.log(`public/${file}`);
}
// The home-screen icon: the favicon's mark, full bleed (iOS rounds the corners itself).
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(`<!doctype html><html><body style="margin:0;width:180px;height:180px;background:#0b0b0c;display:grid;place-items:center"><div style="width:78px;height:78px;border-radius:50%;background:linear-gradient(135deg,#ff7a45,#3da9fc)"></div></body></html>`);
await page.screenshot({ path: join(root, "public", "apple-touch-icon.png") });
console.log("public/apple-touch-icon.png");
await browser.close();
