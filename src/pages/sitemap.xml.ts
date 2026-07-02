import { absoluteUrl } from "../data/site";

const pages = [
  {
    path: "/fr/",
    alternates: [
      { lang: "fr", path: "/fr/" },
      { lang: "en", path: "/en/" },
      { lang: "x-default", path: "/fr/" }
    ]
  },
  {
    path: "/en/",
    alternates: [
      { lang: "fr", path: "/fr/" },
      { lang: "en", path: "/en/" },
      { lang: "x-default", path: "/fr/" }
    ]
  },
  {
    path: "/en/resume/",
    alternates: [
      { lang: "en", path: "/en/resume/" },
      { lang: "x-default", path: "/en/resume/" }
    ]
  }
];

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(
    (page) => `<url>
  <loc>${absoluteUrl(page.path)}</loc>
${page.alternates
  .map((alternate) => `  <xhtml:link rel="alternate" hreflang="${alternate.lang}" href="${absoluteUrl(alternate.path)}" />`)
  .join("\n")}
</url>`
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
