// Prints @font-face rules for local fallbacks sized like the web fonts, so text doesn't move
// when the real fonts arrive (paste into src/styles/global.css).
import { createFontStack } from "@capsizecss/core";
import instrumentSerif from "@capsizecss/metrics/instrumentSerif";
import inter from "@capsizecss/metrics/inter";
import georgia from "@capsizecss/metrics/georgia";
import timesNewRoman from "@capsizecss/metrics/timesNewRoman";
import arial from "@capsizecss/metrics/arial";

for (const [font, fallbacks] of [[instrumentSerif, [timesNewRoman, georgia]], [inter, [arial]]]) {
  const { fontFamily, fontFaces } = createFontStack([font, ...fallbacks]);
  console.log(`/* ${fontFamily} */\n${fontFaces}\n`);
}
