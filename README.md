# Bemotion — site de production

Site vitrine Bemotion (Next.js App Router, Tailwind v4). Site 100% statique
(SSG) : chaque page est prérendue au build, aucune vidéo brute n'est
autoplayée, les embeds Vimeo ne se chargent qu'au survol.

## Démarrer

```bash
npm install
npm run dev
```

## Contenu

Tout le contenu éditorial (équipe, services, projets, contact) vit dans
`src/lib/content/`, typé et séparé des composants. Pour ajouter un projet,
ajouter une entrée dans `src/lib/content/projects.ts` — la page
`/travaux/[slug]` est générée automatiquement via `generateStaticParams`.

Les images (`public/images/`) sont des captures extraites de la plaquette
de prod (`Prez_book_prod.pdf`) : stills des 4 cas clients, portraits de
Nils Bronner, mur de logos clients.

### À compléter avant mise en ligne

- **`vimeoId`** sur chaque projet (`src/lib/content/projects.ts`) : sans
  identifiant, les tuiles affichent le still extrait de la plaquette au
  lieu de la vidéo en loop au survol.
- **Photos de l'équipe** (`src/lib/content/team.ts`) : seul Nils Bronner a
  une vraie photo (`image`) pour l'instant ; Matteo, Dino, Nicolas et Taha
  affichent des initiales. Ajouter `image: "/images/team/xxx.jpg"` dès que
  les portraits sont disponibles.
- **6 à 8 films en home** : seuls 4 cas clients détaillés étaient
  disponibles (Once Upon a Dime, Squarea, Holly's Diner, MyFood). Ajouter
  d'autres projets dans `projects.ts` avec `featuredHome: true` pour
  compléter la grille.

## Build

```bash
npm run build
```

Génère un site entièrement statique (voir `Route (app)` dans la sortie de
build : toutes les routes sont `○` ou `●` SSG).
