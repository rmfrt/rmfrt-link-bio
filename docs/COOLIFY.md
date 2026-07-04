# Coolify

## Applications cible

`preview.rmfrt.xyz` sert d'environnement de preview pour valider la v2 sans
toucher aux domaines publics actuels.

La v2 est temporairement en anglais uniquement : `/` est la page d'accueil, et
le CV integre reste disponible sur `/resume/`.

```txt
GitHub repo: rmfrt/rmfrt-com

rmfrt-site-preview
  domaine: https://preview.rmfrt.xyz
  depot: rmfrt/rmfrt-com
  branche: preview
  auto-deploy: GitHub webhook push
  HTTP Basic Auth: actif via labels Traefik Coolify
  build pack: Dockerfile
  port: 3000
  env:
    PUBLIC_SITE_URL=https://preview.rmfrt.xyz
    PUBLIC_NOINDEX=true

rmfrt-site-prod
  uuid: ztnx9pvmsyhsrnaguodz7yfe
  domaine principal: https://rmfrt.com
  depot: rmfrt/rmfrt-com
  alias de redirection:
    https://www.rmfrt.com
    https://resume.rmfrt.com
  branche: main
  auto-deploy: GitHub webhook push
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

Etat apres mise en production Coolify du 2026-07-03 :

```txt
Coolify app: rmfrt-site-prod
Git branch: main
Auto-deploy: GitHub webhook push actif
Coolify status: running:healthy
```

La production Coolify repond correctement en public :

```txt
https://rmfrt.com/
https://rmfrt.com/resume/
https://rmfrt.com/en/ -> 301 https://rmfrt.com/
https://rmfrt.com/en/resume/ -> 301 https://rmfrt.com/resume/
```

DNS public apres bascule :

```txt
rmfrt.com         -> 82.67.166.248
www.rmfrt.com     -> 82.67.166.248, redirection 301 vers https://rmfrt.com/*
resume.rmfrt.com  -> 82.67.166.248, redirection 301 vers https://rmfrt.com/resume/
rmfrt.com NS      -> ada.ns.cloudflare.com, bowen.ns.cloudflare.com
```

## Deploiement automatique

`rmfrt-site-prod` suit la branche `main`.

Configuration validee le 2026-07-03 :

```txt
GitHub repository: rmfrt/rmfrt-com
Coolify auto-deploy: enabled
GitHub webhook: active
GitHub webhook events: push
GitHub webhook content type: application/json
GitHub webhook secret: stocke dans Coolify, hors depot
```

Le webhook GitHub utilise l'endpoint manuel GitHub de Coolify. Ne pas stocker
son secret dans le depot. Le webhook doit repondre `200` aux livraisons GitHub.
Le meme webhook couvre la production et la preview : Coolify filtre ensuite les
applications par branche (`main` pour prod, `preview` pour preview). Les
secrets GitHub webhook des deux applications Coolify doivent donc rester
alignes.

Flux de travail recommande :

```txt
preview branch -> https://preview.rmfrt.xyz
main branch    -> https://rmfrt.com
```

Les changements de design doivent d'abord partir sur `preview`. Apres validation
sur `preview.rmfrt.xyz`, merger ou fast-forwarder `preview` vers `main` pour la
mise en production.

La preview est protegee par HTTP Basic Auth au niveau Traefik. Les identifiants
sont stockes hors depot dans :

```txt
~/.config/coolify/rmfrt-site-preview-basic-auth.env
```

Note Coolify 4.1.2 : le flag API `is_http_basic_auth_enabled` est bien active,
mais la protection effective de `preview.rmfrt.xyz` repose aussi sur des labels
Traefik personnalises dans l'application Coolify.

Tests effectues le 2026-07-03 :

```txt
GitHub ping delivery: 200
GitHub push test delivery: 200
Coolify deployment from webhook: hg2iv6mwnsd0jbxs4xa1eeyk finished
Webhook deployment commit: 482d1e0
Real push deployment: rszjagld4hxf23hwhn6eesy5 finished
Real push deployment commit: 0431579
Preview app branch switch: preview
Preview deployment after branch switch: yw4u3wc2jfdb6cj7twowpyj8 finished
Preview deployment commit: 969e52c
```

Verification rapide :

```sh
gh api repos/rmfrt/rmfrt-com/hooks --jq '.[] | {id, active, events, last_response}'
```

Il n'y a pas de GitHub Actions dans ce depot. Le CI/CD est volontairement
minimal : `preview` et `main` declenchent le meme webhook GitHub, puis Coolify
filtre les applications par branche.

## Bascule Vercel / DNS

Etat constate le 2026-07-03 :

```txt
rmfrt.com
  registrar: OVH
  DNS public actuel: Cloudflare
  apex: 82.67.166.248
  www: 82.67.166.248
  nameservers: ada.ns.cloudflare.com, bowen.ns.cloudflare.com

rmfrt.xyz
  DNS: Cloudflare
  apex: pas d'enregistrement A/CNAME public constate
  www: Cloudflare proxy, hors application de production rmfrt-site-prod

preview.rmfrt.xyz
  A: 82.67.166.248

analytics.rmfrt.xyz
  A: 82.67.166.248
```

Procedure effectuee :

1. Deployer `rmfrt-site-prod` dans Coolify avec le domaine canonique
   `https://rmfrt.com` et les alias `https://www.rmfrt.com`,
   `https://resume.rmfrt.com`.
2. Ajouter `rmfrt.com` dans Cloudflare, renseigner les entrees cible dans
   Cloudflare, puis remplacer les nameservers OVH par ceux fournis par
   Cloudflare.
3. Pendant la propagation, remplacer aussi les anciennes entrees Vercel dans la
   zone OVH par `82.67.166.248` pour eviter que les caches encore sur OVH
   servent Vercel.
4. Dans Vercel, retirer `rmfrt.com` et `www.rmfrt.com` des domaines du projet.
5. Rediriger `https://www.rmfrt.com` vers `https://rmfrt.com/` via Nginx.
6. Rediriger `https://resume.rmfrt.com` vers `https://rmfrt.com/resume/` via
   Nginx.
7. Verifier :

```sh
curl -I https://rmfrt.com/
curl -I https://www.rmfrt.com/
curl -I https://rmfrt.com/resume/
curl -I https://resume.rmfrt.com/
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
domains: rmfrt.com
```

Ne pas proteger globalement `analytics.rmfrt.xyz` par HTTP Basic Auth dans
Coolify : le script public et l'endpoint de collecte doivent rester accessibles
depuis les sites suivis. Si l'interface d'administration doit etre durcie plus
tard, le faire sans bloquer `script.js` ni la collecte.

La notice `/privacy/` de `rmfrt.com` couvre l'usage d'Umami : mesure d'audience
agregee, sans cookies, sans publicite et sans suivi inter-sites.
