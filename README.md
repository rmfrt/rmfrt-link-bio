# rmfrt-site

Minimal Astro/Tailwind version of the personal site. Production targets
`https://rmfrt.com` as the canonical domain, with `https://rmfrt.xyz` as an
additional public domain.

The current v2 is English-only for now. `/` is the home page; `/resume/`
contains the integrated resume.

## Commands

```sh
npm run dev
npm run check
npm run build
npm run preview
```

## Environment

```txt
PUBLIC_SITE_URL=https://rmfrt.com
PUBLIC_NOINDEX=false
```

`PUBLIC_SITE_URL` should be overridden to `https://preview.rmfrt.xyz` and
`PUBLIC_NOINDEX=true` for preview deployments.

Production analytics is prepared for Umami but disabled unless all required
variables are set and `PUBLIC_NOINDEX=false`.

```txt
PUBLIC_UMAMI_SCRIPT_URL=https://analytics.rmfrt.xyz/script.js
PUBLIC_UMAMI_WEBSITE_ID=bd1aca48-e028-47bc-98c5-5cea77207e2e
PUBLIC_UMAMI_DOMAINS=rmfrt.com,rmfrt.xyz
```

The Docker build must receive these values as build arguments because the site
is generated as static HTML before Nginx serves it.

## Metadata assets

The favicon and Open Graph image are intentionally minimal black placeholders:

```txt
public/favicon.ico
public/favicon.svg
public/apple-touch-icon.png
public/og.png
public/og.svg
```
