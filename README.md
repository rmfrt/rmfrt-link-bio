# rmfrt-site

Minimal Astro/Tailwind version of the personal site, currently targeting
`https://preview.rmfrt.xyz` for preview before replacing `rmfrt.com`.

The current v2 is English-only for now. `/` redirects to `/en/`; `/en/resume/`
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
PUBLIC_SITE_URL=https://preview.rmfrt.xyz
PUBLIC_NOINDEX=true
```

`PUBLIC_NOINDEX` should stay `true` for preview deployments and be set to
`false` only for the final production domain.

Production analytics is prepared for Umami but disabled unless all required
variables are set and `PUBLIC_NOINDEX=false`.

```txt
PUBLIC_UMAMI_SCRIPT_URL=https://analytics.rmfrt.xyz/script.js
PUBLIC_UMAMI_WEBSITE_ID=bd1aca48-e028-47bc-98c5-5cea77207e2e
PUBLIC_UMAMI_DOMAINS=rmfrt.com
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
