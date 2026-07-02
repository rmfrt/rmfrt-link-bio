import { absoluteUrl, siteNoindex } from "../data/site";

export function GET() {
  const directive = siteNoindex ? "Disallow: /" : "Allow: /";

  return new Response(`User-agent: *\n${directive}\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
