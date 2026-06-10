import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Disallow: /dashboard/
Disallow: /api/
Disallow: /_astro/

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site ? new URL(site) : new URL("https://example.com");
  const sitemapURL = new URL("sitemap-index.xml", baseUrl);

  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
