#!/usr/bin/env node
// Lit les fiches médias validées et prêtes pour le site (Edge Function
// medias-ready-for-site de legrub-platform), ajoute une entrée par fiche dans
// `src/lib/content/projects.ts`, vérifie que ça compile, puis laisse le
// workflow ouvrir une PR (jamais de merge ni de push direct sur main ici).
//
// Champs qu'on ne collecte pas côté Médias (sector, categories, accent,
// logo, image...) : toujours un placeholder explicite "TODO-...", jamais de
// valeur inventée. Nils complète et relit avant de merger.

import { readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

const SUPABASE_URL = 'https://nvuregnrdspayomugvct.supabase.co'
// Clé publishable du projet : pas un secret (déjà expédiée dans le bundle du
// site), inutile de la faire transiter par un secret GitHub.
const APIKEY = 'sb_publishable_Af63pSSZejzV-Fm4h3pluQ_hb_XVsKZ'
const TOKEN = process.env.MEDIAS_INGEST_TOKEN

if (!TOKEN) {
  console.error('MEDIAS_INGEST_TOKEN manquant (secret GitHub Actions).')
  process.exit(1)
}

const headers = { Authorization: `Bearer ${TOKEN}`, apikey: APIKEY }

function extractVimeoId(links) {
  for (const l of links ?? []) {
    const m = l.url?.match(/vimeo\.com\/(\d+)/)
    if (m) return m[1]
  }
  return undefined
}

function jsString(s) {
  return JSON.stringify(s ?? '')
}

function slugFromSeo(item) {
  const raw = item.seo?.slug || ''
  const last = raw.split('/').filter(Boolean).pop()
  return last || item.id
}

function buildEntrySource(item, slug) {
  const seo = item.seo ?? {}
  const wording = item.wording ?? {}
  const title = seo.h1 || wording.titreSite || item.titre
  const hook = wording.accroche || ''
  const context = wording.storytelling || seo.sections?.[0]?.[1] || ''
  const deliverables = wording.livrables ?? []
  const keywords = [seo.motClePrincipal, ...(seo.motsClesSecondaires ?? [])].filter(Boolean)
  const vimeoId = extractVimeoId(item.links)

  const lines = []
  lines.push('  {')
  lines.push(`    slug: ${jsString(slug)},`)
  lines.push(`    client: ${jsString(item.client)},`)
  lines.push('    sector: "TODO-secteur", // à compléter avant de merger')
  lines.push(`    title: ${jsString(title)},`)
  lines.push(`    hook: ${jsString(hook)},`)
  lines.push('    categories: ["TODO-categorie"], // à compléter avant de merger')
  lines.push(`    context: ${jsString(context)},`)
  lines.push(`    deliverables: ${JSON.stringify(deliverables)},`)
  if (keywords.length) lines.push(`    keywords: ${JSON.stringify(keywords)},`)
  if (vimeoId) lines.push(`    vimeoId: ${jsString(vimeoId)},`)
  lines.push('    accent: "#5035a9", // TODO: couleur de marque à ajuster, violet Grub Motion par défaut')
  lines.push('    // image/logo/stats/credits/testimonial : pas de donnée source, à ajouter à la main.')
  lines.push('    featuredHome: false,')
  lines.push('    caseStudy: false,')
  lines.push('  },')
  return lines.join('\n')
}

async function main() {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/medias-ready-for-site`, {
    method: 'POST',
    headers,
  })
  if (!res.ok) {
    console.error('medias-ready-for-site a échoué', res.status, await res.text())
    process.exit(1)
  }
  const { items } = await res.json()

  if (!items?.length) {
    console.log('Rien à publier.')
    return
  }

  const PROJECTS_PATH = 'src/lib/content/projects.ts'
  let fileContent = readFileSync(PROJECTS_PATH, 'utf8')

  const markerIdx = fileContent.indexOf('const caseStudyOrder')
  if (markerIdx === -1) {
    console.error('Marqueur "const caseStudyOrder" introuvable dans projects.ts — abandon, rien modifié.')
    process.exit(1)
  }
  const closeIdx = fileContent.lastIndexOf('\n];', markerIdx)
  if (closeIdx === -1) {
    console.error('Fermeture du tableau `projects` introuvable — abandon, rien modifié.')
    process.exit(1)
  }

  const processed = []
  const entries = []
  for (const item of items) {
    const slug = slugFromSeo(item)
    if (fileContent.includes(`slug: "${slug}"`) || fileContent.includes(`slug: '${slug}'`)) {
      console.log(`Slug déjà présent, on saute : ${slug} (fiche ${item.id})`)
      continue
    }
    entries.push(buildEntrySource(item, slug))
    processed.push({ item, slug })
  }

  if (!entries.length) {
    console.log('Toutes les fiches prêtes ont déjà leur entrée sur le site.')
    return
  }

  const before = fileContent.slice(0, closeIdx)
  const after = fileContent.slice(closeIdx)
  fileContent = `${before}\n${entries.join('\n')}${after}`
  writeFileSync(PROJECTS_PATH, fileContent)

  console.log(`Entrées ajoutées : ${processed.map((p) => p.slug).join(', ')}`)

  try {
    execSync('npx tsc --noEmit', { stdio: 'inherit' })
  } catch {
    console.error('Le projet ne compile plus après ajout — abandon, aucun commit.')
    process.exit(1)
  }

  // Les étapes suivantes (branche, commit, push, PR, patch medias-upsert)
  // sont pilotées par le workflow, pas par ce script : il écrit juste la
  // liste des fiches traitées pour que le workflow sache quoi marquer.
  writeFileSync(
    'processed-medias.json',
    JSON.stringify(
      processed.map((p) => ({ id: p.item.id, pipeline: p.item.pipeline, slug: p.slug })),
      null,
      2,
    ),
  )
}

main()
