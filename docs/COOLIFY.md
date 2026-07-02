# Coolify

## Environnement de preview/staging

`rmfrt.xyz` sert d'environnement de preview pour valider la v2 sans toucher aux
domaines publics actuels. Ce n'est pas l'environnement de production final.

```txt
rmfrt-xyz
  domaine: https://rmfrt.xyz
  branche: astro-v2
  build pack: Dockerfile
  port: 3000
  env:
    PUBLIC_SITE_URL=https://rmfrt.xyz
    PUBLIC_CONTACT_EMAIL=
```

## Production actuelle

Pendant cette phase, ne pas basculer :

```txt
https://rmfrt.com
https://resume.rmfrt.com
```

Le CV est integre dans la nouvelle route :

```txt
https://rmfrt.xyz/en/resume/
```

Quand la version sera stabilisee et que `rmfrt.com` deviendra la cible de
production, prevoir une redirection :

```txt
https://resume.rmfrt.com -> https://rmfrt.com/en/resume/
```

## Build

L'image Docker construit le site Astro en statique, puis sert `dist/` avec Nginx
sur le port `3000`.

`PUBLIC_SITE_URL` est utilise au build pour les canonical, Open Graph, robots
et sitemap. Pour la future bascule, remplacer par :

```txt
PUBLIC_SITE_URL=https://rmfrt.com
```
