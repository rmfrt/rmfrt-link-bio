# Coolify

## Applications cible

`preview.rmfrt.xyz` sert d'environnement de preview pour valider la v2 sans
toucher aux domaines publics actuels.

```txt
rmfrt-site-preview
  domaine: https://preview.rmfrt.xyz
  branche: astro-v2
  build pack: Dockerfile
  port: 3000
  env:
    PUBLIC_SITE_URL=https://preview.rmfrt.xyz
    PUBLIC_NOINDEX=true

rmfrt-site-prod
  domaine: https://rmfrt.com
  branche: main
  build pack: Dockerfile
  port: 3000
  env:
    PUBLIC_SITE_URL=https://rmfrt.com
    PUBLIC_NOINDEX=false
    PUBLIC_UMAMI_SCRIPT_URL=https://analytics.rmfrt.xyz/script.js
    PUBLIC_UMAMI_WEBSITE_ID=bd1aca48-e028-47bc-98c5-5cea77207e2e
    PUBLIC_UMAMI_DOMAINS=rmfrt.com
```

## Production actuelle

Pendant cette phase, ne pas basculer :

```txt
https://rmfrt.com
https://resume.rmfrt.com
```

Le CV est integre dans la nouvelle route :

```txt
https://preview.rmfrt.xyz/en/resume/
```

Quand la version sera stabilisee, activer explicitement `rmfrt-site-prod` et
prevoir une redirection :

```txt
https://resume.rmfrt.com -> https://rmfrt.com/en/resume/
```

## Build

L'image Docker construit le site Astro en statique, puis sert `dist/` avec Nginx
sur le port `3000`.

`PUBLIC_SITE_URL` est utilise au build pour les canonical, Open Graph, robots
et sitemap. `PUBLIC_NOINDEX=true` garde la preview hors indexation. Pour la
future bascule, remplacer par :

```txt
PUBLIC_SITE_URL=https://rmfrt.com
PUBLIC_NOINDEX=false
```

## Analytics cible

Decision : utiliser `Umami` comme analytics mutualise pour les sites deployes
sur Coolify.

Hypothese cible :

```txt
https://analytics.rmfrt.xyz
```

Chaque site public devra avoir sa propre entree `Website` dans Umami et donc son
propre `data-website-id`. Ne pas activer le tracking sur
`preview.rmfrt.xyz` ni sur un environnement avec `PUBLIC_NOINDEX=true`.

Site Umami cree pour la future production :

```txt
name: rmfrt.com
domain: rmfrt.com
website id: bd1aca48-e028-47bc-98c5-5cea77207e2e
script: https://analytics.rmfrt.xyz/script.js
domains: rmfrt.com
```
