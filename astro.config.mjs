// Static site, no client framework: HTML and CSS, plus one small inline script for the clips.
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://pavledujkic.github.io",
  trailingSlash: "always",
  build: { inlineStylesheets: "always" },
  compressHTML: true,
});
