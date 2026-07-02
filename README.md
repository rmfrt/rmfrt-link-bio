# rmfrt-site

Minimal Astro/Tailwind version of the personal site, currently targeting
`https://preview.rmfrt.xyz` for preview before replacing `rmfrt.com`.

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
PUBLIC_CONTACT_EMAIL=
PUBLIC_NOINDEX=true
```

`PUBLIC_CONTACT_EMAIL` is optional. When omitted, no email link is rendered.
`PUBLIC_NOINDEX` should stay `true` for preview deployments and be set to
`false` only for the final production domain.
