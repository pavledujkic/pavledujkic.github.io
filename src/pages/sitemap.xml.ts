// A small sitemap: the home page and every case study.
import type { APIRoute } from "astro";
import { projects } from "../projects";

export const GET: APIRoute = ({ site }) => {
  const pages = ["/", ...projects.filter((p) => p.page).map((p) => `/work/${p.slug}/`)];
  const urls = pages.map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { "Content-Type": "application/xml" },
  });
};
