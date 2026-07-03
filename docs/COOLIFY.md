# Coolify

## Applications cible

`preview.rmfrt.xyz` sert d'environnement de preview pour valider la v2 sans
toucher aux domaines publics actuels.

La v2 est temporairement en anglais uniquement : `/` est la page d'accueil, et
le CV integre reste disponible sur `/resume/`.

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
  domaine principal: https://rmfrt.com
  domaine additionnel: https://rmfrt.xyz
  branche: main
  build pack: Dockerfile
  port: 3000
  env:
    PUBLIC_SITE_URL=https://rmfrt.com
    PUBLIC_NOINDEX=false
    PUBLIC_UMAMI_SCRIPT_URL=https://analytics.rmfrt.xyz/script.js
    PUBLIC_UMAMI_WEBSITE_ID=bd1aca48-e028-47bc-98c5-5cea77207e2e
    PUBLIC_UMAMI_DOMAINS=rmfrt.com,rmfrt.xyz
```

## Production actuelle

Pendant cette phase, ne pas basculer :

```txt
https://rmfrt.xyz
https://rmfrt.com
https://resume.rmfrt.com
```

Le CV est integre dans la nouvelle route :

```txt
https://preview.rmfrt.xyz/resume/
```

Quand la version sera stabilisee, activer explicitement `rmfrt-site-prod` et
prevoir une redirection :

```txt
https://resume.rmfrt.com -> https://rmfrt.com/resume/
```

## Bascule Vercel / DNS

Etat constate le 2026-07-03 :

```txt
rmfrt.xyz
  DNS: Cloudflare
  apex: pas d'enregistrement A/CNAME public constate
  www: Cloudflare proxy

rmfrt.com
  registrar: OVH
  DNS public actuel: OVH
  apex: 76.76.21.21 (Vercel)
  www: 76.76.21.21 (Vercel)

preview.rmfrt.xyz
  A: 82.67.166.248

analytics.rmfrt.xyz
  A: 82.67.166.248
```

Procedure cible :

1. Deployer `rmfrt-site-prod` dans Coolify avec les domaines
   `https://rmfrt.com` et `https://rmfrt.xyz`.
2. Dans Vercel, retirer `rmfrt.com` et `www.rmfrt.com` des domaines du projet,
   ou detacher le projet si le domaine ne doit plus jamais etre gere par Vercel.
3. Au moment du DNS, choisir explicitement le gestionnaire DNS de `rmfrt.com` :
   - soit rester temporairement sur les DNS OVH et remplacer les entrees Vercel
     par `82.67.166.248` ;
   - soit ajouter `rmfrt.com` dans Cloudflare, renseigner les entrees cible
     dans Cloudflare, puis remplacer les nameservers OVH par ceux fournis par
     Cloudflare.
4. Dans Cloudflare, pointer `rmfrt.xyz` vers `82.67.166.248`.
5. Prevoir ensuite la redirection de `https://resume.rmfrt.com` vers
   `https://rmfrt.com/resume/`.
6. Verifier apres propagation :

```sh
curl -I https://rmfrt.com/
curl -I https://rmfrt.com/resume/
curl -I https://rmfrt.xyz/
curl -I https://rmfrt.xyz/resume/
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

Les variables `PUBLIC_UMAMI_*` doivent egalement etre disponibles au moment du
build Docker en production. Comme le site est statique et servi ensuite par
Nginx, une variable ajoutee uniquement au runtime ne modifie pas le HTML genere.

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
domains: rmfrt.com,rmfrt.xyz
```
