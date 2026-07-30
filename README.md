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

### À compléter avant mise en ligne

- **`vimeoId`** sur chaque projet (`src/lib/content/projects.ts`) : sans
  identifiant, les tuiles affichent un aplat de couleur (placeholder) au
  lieu de la vidéo en loop.
- **Photos de l'équipe** (`src/app/studio/page.tsx`) : actuellement des
  initiales sur fond neutre.
- **Logos clients** (`src/components/client-logos-band.tsx`) : rendus en
  typographie faute de fichiers logo fournis dans le brief.
- **6 à 8 films en home** : seuls 4 cas clients détaillés étaient
  disponibles dans le brief (Once Upon a Dime, Squarea, Holly's Diner,
  MyFood). Ajouter d'autres projets dans `projects.ts` avec
  `featuredHome: true` pour compléter la grille.

## Build

```bash
npm run build
```

Génère un site entièrement statique (voir `Route (app)` dans la sortie de
build : toutes les routes sont `○` ou `●` SSG).
