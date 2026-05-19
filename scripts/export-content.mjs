/**
 * Export du contenu rédactionnel du site maria en markdown.
 *
 * Sortie : un dossier `export-content/` à la racine du projet, organisé par type :
 *   export-content/
 *     accueil.md
 *     agence.md
 *     projets.md
 *     contact.md
 *     charte-ia.md
 *     services-pilier.md
 *     besoins-pilier.md
 *     services/{slug}.md
 *     besoins/{slug}.md
 *     formation.md
 *     blog/{slug}.md           (un fichier par article)
 *     pages-statiques/         (mentions, confidentialité, 404)
 *
 * Objectif : format léger et lisible pour audit SEO/GEO + rédaction.
 *
 * Lancement :
 *   node --env-file=.env.local scripts/export-content.mjs
 */
import { createClient } from '@sanity/client'
import { mkdir, writeFile } from 'node:fs/promises'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT_DIR = join(ROOT, 'export-content')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-19'

if (!projectId || !dataset) {
  console.error('Variables manquantes : NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, useCdn: false })

/* ============================================================================
 * Portable Text → Markdown
 * ============================================================================ */

function inline(children = [], markDefs = []) {
  return children
    .map((c) => {
      if (c._type !== 'span') return ''
      let txt = c.text ?? ''
      const marks = c.marks ?? []
      // wraps successifs
      for (const m of marks) {
        // mark inconnu (référence markDefs) = lien
        const def = markDefs.find((d) => d._key === m)
        if (def?._type === 'link') {
          txt = `[${txt}](${def.href})`
          continue
        }
        if (m === 'strong') txt = `**${txt}**`
        else if (m === 'em') txt = `_${txt}_`
      }
      return txt
    })
    .join('')
}

function ptBlock(b) {
  if (!b || typeof b !== 'object') return ''
  const md = b.markDefs ?? []

  // Blocs standards Portable Text
  if (b._type === 'block') {
    const txt = inline(b.children, md)
    if (b.listItem === 'bullet') return `- ${txt}`
    if (b.listItem === 'number') return `1. ${txt}` // ordre rendu par md
    switch (b.style) {
      case 'h2': return `## ${txt}`
      case 'h3': return `### ${txt}`
      case 'blockquote': return `> ${txt}`
      case 'normal':
      default: return txt
    }
  }

  // Blocs custom — convertis avec une convention visuelle
  switch (b._type) {
    case 'callout':
      return `> 💡 **${b.titre || 'À retenir'}**\n> ${(b.texte || '').replace(/\n/g, '\n> ')}`
    case 'warning':
      return `> ⚠️ **${b.titre || 'Point de vigilance'}**\n> ${(b.texte || '').replace(/\n/g, '\n> ')}`
    case 'avisMaria': {
      const head = `> 🟦 **${b.titre || 'Ce qu’on en pense chez maria'}**`
      const body = (b.texte || '').replace(/\n/g, '\n> ')
      const sig = `> _${b.signature || '— l’équipe maria'}_`
      return `${head}\n> ${body}\n>\n${sig}`
    }
    case 'definition':
      return `**Définition — ${b.terme || ''}**\n\n${b.definition || ''}`
    case 'tableau': {
      const headers = b.enTetes ?? []
      const rows = (b.lignes ?? []).map((l) => l.cellules ?? [])
      if (headers.length === 0 || rows.length === 0) return ''
      const head = `| ${headers.join(' | ')} |`
      const sep = `| ${headers.map(() => '---').join(' | ')} |`
      const body = rows.map((r) => `| ${r.join(' | ')} |`).join('\n')
      const cap = b.legende ? `\n_${b.legende}_` : ''
      return `${head}\n${sep}\n${body}${cap}`
    }
    case 'quoteAttribuee':
      return `> « ${b.texte || ''} »\n>\n> — **${b.auteur || ''}**${b.role ? `, ${b.role}` : ''}`
    case 'inArticleCta': {
      const titre = b.titre || ''
      const desc = b.description || ''
      const libelle = b.lienLibelle || 'Découvrir →'
      const href = b.lienHref || '#'
      return `➡️ **CTA in-article — ${titre}**  \n${desc}  \n→ [${libelle}](${href})`
    }
    case 'imageBody':
    case 'fullWidthImage': {
      const alt = b.alt || b.image?.alt || ''
      const legende = b.legende || ''
      const url = b.asset?.url || b.image?.asset?.url || ''
      return `![${alt}](${url})${legende ? `\n_${legende}_` : ''}`
    }
    case 'video':
      return `🎥 _Vidéo — ${b.legende || b.url || 'embed'}_`
    default:
      return `_[bloc non géré : ${b._type}]_`
  }
}

function ptToMd(blocks) {
  if (!Array.isArray(blocks) || blocks.length === 0) return ''
  // Concatène en regroupant les list-items consécutifs
  const out = []
  let i = 0
  while (i < blocks.length) {
    const b = blocks[i]
    if (b?._type === 'block' && b.listItem) {
      // Bloc liste : groupe avec items suivants même listItem
      const isNumbered = b.listItem === 'number'
      let n = 0
      while (i < blocks.length && blocks[i]?._type === 'block' && blocks[i].listItem === b.listItem) {
        const t = inline(blocks[i].children, blocks[i].markDefs ?? [])
        out.push(isNumbered ? `${++n}. ${t}` : `- ${t}`)
        i++
      }
      out.push('')
      continue
    }
    const rendered = ptBlock(b)
    if (rendered) {
      out.push(rendered)
      out.push('')
    }
    i++
  }
  return out.join('\n').trim() + '\n'
}

/* ============================================================================
 * Helpers
 * ============================================================================ */

function frontmatter(obj) {
  const lines = ['---']
  for (const [k, v] of Object.entries(obj)) {
    if (v == null || v === '') continue
    if (Array.isArray(v)) {
      lines.push(`${k}: [${v.map((x) => `"${x}"`).join(', ')}]`)
    } else {
      lines.push(`${k}: ${typeof v === 'string' && v.includes('\n') ? `|\n  ${v.replace(/\n/g, '\n  ')}` : v}`)
    }
  }
  lines.push('---', '')
  return lines.join('\n')
}

function h1(s) { return `# ${s}\n` }
function h2(s) { return `## ${s}\n` }
function h3(s) { return `### ${s}\n` }
function bullets(items) { return items.filter(Boolean).map((i) => `- ${i}`).join('\n') }

async function writeMd(relPath, content) {
  const fullPath = join(OUT_DIR, relPath)
  await mkdir(dirname(fullPath), { recursive: true })
  await writeFile(fullPath, content, 'utf-8')
  console.log('  →', relPath)
}

/* ============================================================================
 * Exports par type Sanity
 * ============================================================================ */

async function exportAccueil() {
  const d = await client.fetch(`*[_id == "accueil"][0]`)
  if (!d) return
  const parts = [
    frontmatter({ page: 'Accueil', url: '/' }),
    h1('Accueil'),
    d.hero && [
      h2('Hero'),
      `**Sur-titre** : ${d.hero.surTitre}`,
      `**H1 ligne 1** : ${d.hero.titreLigne1}`,
      d.hero.titreLigne2 && `**H1 ligne 2** : ${d.hero.titreLigne2}`,
      `**Sous-titre** : ${d.hero.sousTitre}`,
      d.hero.ctaPrincipal && `**CTA principal** : ${d.hero.ctaPrincipal.libelle} → ${d.hero.ctaPrincipal.cheminInterne || d.hero.ctaPrincipal.urlExterne}`,
      d.hero.ctaSecondaire && `**CTA secondaire** : ${d.hero.ctaSecondaire.libelle} → ${d.hero.ctaSecondaire.cheminInterne || d.hero.ctaSecondaire.urlExterne}`,
    ].filter(Boolean).join('\n\n'),
    d.reassurance?.length && [h2('Bandeau réassurance'), bullets(d.reassurance.map((r) => `${r.libelle} _(picto: ${r.icone})_`))].join('\n\n'),
    d.constat && [
      h2(`Constat — ${d.constat.titre}`),
      `_Sur-titre_ : ${d.constat.surTitre}`,
      (d.constat.paragraphes || []).map((p) => p.texte).join('\n\n'),
      d.constat.citation && `> ${d.constat.citation}`,
    ].filter(Boolean).join('\n\n'),
    d.services && [
      h2(`Services — ${d.services.titre}`),
      `_Sur-titre_ : ${d.services.surTitre}`,
      d.services.description,
      ...(d.services.cards || []).map((c) => `### ${c.titre}\n${c.description}\n→ [${c.lien?.libelle}](${c.lien?.cheminInterne || c.lien?.urlExterne})`),
    ].filter(Boolean).join('\n\n'),
    d.methode && [
      h2(`Méthode — ${d.methode.titre}`),
      `_Sur-titre_ : ${d.methode.surTitre}`,
      d.methode.description,
      ...(d.methode.etapes || []).map((e) => `**${e.numero} — ${e.categorie}** · ${e.titre}\n${e.description}`),
      d.methode.lien && `→ [${d.methode.lien.libelle}](${d.methode.lien.cheminInterne || d.methode.lien.urlExterne})`,
    ].filter(Boolean).join('\n\n'),
    d.projetVedette && [
      h2(`Projet vedette — ${d.projetVedette.titre}`),
      `_Sur-titre_ : ${d.projetVedette.surTitre}`,
      (d.projetVedette.metriques || []).map((m) => `- **${m.valeur}** ${m.libelle}`).join('\n'),
      d.projetVedette.surTitreClients && `_${d.projetVedette.surTitreClients}_`,
      d.projetVedette.clients?.length && `Clients : ${d.projetVedette.clients.join(' · ')}`,
    ].filter(Boolean).join('\n\n'),
    d.pourquoiMaria && [
      h2(`Pourquoi maria — ${d.pourquoiMaria.titre}`),
      `_Sur-titre_ : ${d.pourquoiMaria.surTitre}`,
      d.pourquoiMaria.cardMachine && `**${d.pourquoiMaria.cardMachine.surTitre} — ${d.pourquoiMaria.cardMachine.titre}**\n${bullets(d.pourquoiMaria.cardMachine.items || [])}`,
      d.pourquoiMaria.cardHumain && `**${d.pourquoiMaria.cardHumain.surTitre} — ${d.pourquoiMaria.cardHumain.titre}**\n${bullets(d.pourquoiMaria.cardHumain.items || [])}`,
      d.pourquoiMaria.conclusion && `> ${d.pourquoiMaria.conclusion}`,
    ].filter(Boolean).join('\n\n'),
    d.experts && [
      h2(`Équipe — ${d.experts.titre}`),
      `_Sur-titre_ : ${d.experts.surTitre}`,
      d.experts.description,
      ...(d.experts.membres || []).map((m) => `- **${m.nom}** — ${m.role}${m.badge ? ` _(${m.badge})_` : ''}`),
      d.experts.lien && `→ [${d.experts.lien.libelle}](${d.experts.lien.cheminInterne || d.experts.lien.urlExterne})`,
    ].filter(Boolean).join('\n\n'),
  ].filter(Boolean).join('\n\n')
  await writeMd('accueil.md', parts)
}

/**
 * Dump générique d'un doc Sanity en markdown lisible pour audit/rédaction.
 *
 * Stratégie :
 *  - Ordre déterministe : on rend d'abord surTitre / titre / sousTitre /
 *    description, puis les champs simples, puis les arrays/objets, puis les
 *    sous-sections.
 *  - Les paires (lienLibelle, lienHref) ou (ctaLibelle, ctaHref) sont
 *    fusionnées en `→ [libelle](href)` propre.
 *  - Les champs purement techniques (slug, ordreMenu, _key) sont filtrés.
 *  - Les arrays d'objets typés (sections, cards, etc.) deviennent des
 *    sous-sections H3 récursives.
 */

const PRIORITY_KEYS = ['surTitre', 'eyebrow', 'titre', 'title', 'sousTitre', 'subtitle', 'description', 'intro', 'texte']
const SKIP_KEYS = new Set([
  '_id', '_type', '_rev', '_createdAt', '_updatedAt', '_key',
  'slug', 'ordreMenu', 'featured', 'readingTime',
  'asset', 'image', 'picto', 'media', 'coverImage', 'ogImage', 'fichier', 'cover',
  'icone', 'iconName', 'icon',
])

/** Retourne true si la valeur est "vide" (à ne pas afficher). */
function isEmpty(v) {
  if (v == null || v === '' || v === false) return true
  if (Array.isArray(v) && v.length === 0) return true
  return false
}

/** Cherche un champ "lien" (libelle + href) dans un objet et le rend en markdown. */
function extractLink(obj) {
  if (!obj || typeof obj !== 'object') return null
  // Variantes : ctaLibelle/ctaHref, lienLibelle/lienHref, libelle/cheminInterne, etc.
  const variants = [
    ['lienLibelle', 'lienHref'],
    ['ctaLibelle', 'ctaHref'],
    ['ctaPrimaireLibelle', 'ctaPrimaireHref'],
    ['ctaSecondaireLibelle', 'ctaSecondaireHref'],
    ['libelle', 'cheminInterne'],
    ['libelle', 'urlExterne'],
    ['label', 'href'],
  ]
  for (const [lk, hk] of variants) {
    if (obj[lk] && obj[hk]) return { label: obj[lk], href: obj[hk] }
  }
  return null
}

function isPortableTextArray(arr) {
  return Array.isArray(arr) && arr.length > 0 && arr[0]?._type === 'block'
}

function renderValue(k, v, depth) {
  if (isEmpty(v)) return ''
  // Portable Text array (body)
  if (Array.isArray(v) && isPortableTextArray(v)) {
    return ptToMd(v)
  }
  // String
  if (typeof v === 'string') {
    if (k === 'titre' || k === 'title') return `### ${v.trim()}`
    if (k === 'sousTitre' || k === 'subtitle') return v.trim()
    if (k === 'surTitre' || k === 'eyebrow') return `_${v.trim()}_`
    if (k === 'description' || k === 'intro' || k === 'texte') return v.trim()
    return `**${k}** : ${v.trim()}`
  }
  // Array of strings
  if (Array.isArray(v) && v.every((x) => typeof x === 'string')) {
    return bullets(v)
  }
  // Array of objects = sous-section
  if (Array.isArray(v)) {
    const sub = v.map((item) => renderObject(item, depth + 1)).filter(Boolean).join('\n\n---\n\n')
    return sub ? `**${k}** :\n\n${sub}` : ''
  }
  // Object = sous-section
  if (typeof v === 'object') {
    // S'il y a un lien repérable, on le rend en priorité
    const link = extractLink(v)
    if (link && Object.keys(v).every((kk) => SKIP_KEYS.has(kk) || ['lienLibelle', 'lienHref', 'ctaLibelle', 'ctaHref', 'libelle', 'cheminInterne', 'urlExterne', 'label', 'href', 'type', 'variant', 'kind'].includes(kk))) {
      return `→ [${link.label}](${link.href})`
    }
    const inner = renderObject(v, depth + 1)
    return inner ? `**${k}** :\n\n${inner}` : ''
  }
  return `**${k}** : ${String(v)}`
}

/** Couples de clés qui décrivent un même lien — détectés au niveau d'un objet
 *  parent (pas d'un sous-objet) pour fusionner « lienLibelle + lienHref » etc. */
const LINK_PAIRS = [
  ['lienLibelle', 'lienHref'],
  ['ctaLibelle', 'ctaHref'],
  ['ctaPrimaireLibelle', 'ctaPrimaireHref'],
  ['ctaSecondaireLibelle', 'ctaSecondaireHref'],
  ['libelle', 'cheminInterne'],
  ['libelle', 'urlExterne'],
]

function consumeLinkPairs(obj) {
  /** @type {{label: string, href: string}[]} */
  const links = []
  const consumed = new Set()
  for (const [lk, hk] of LINK_PAIRS) {
    if (obj[lk] && obj[hk]) {
      links.push({ label: obj[lk], href: obj[hk] })
      consumed.add(lk)
      consumed.add(hk)
    }
  }
  return { links, consumed }
}

function renderObject(obj, depth = 0) {
  if (!obj || typeof obj !== 'object') return ''
  if (Array.isArray(obj)) {
    return obj.map((o) => renderObject(o, depth)).filter(Boolean).join('\n\n')
  }
  // Si c'est un mini-objet « lien » isolé, on le rend direct
  const link = extractLink(obj)
  if (link && Object.keys(obj).filter((k) => !SKIP_KEYS.has(k)).every((kk) => ['lienLibelle', 'lienHref', 'ctaLibelle', 'ctaHref', 'libelle', 'cheminInterne', 'urlExterne', 'label', 'href', 'type', 'variant', 'kind'].includes(kk))) {
    return `→ [${link.label}](${link.href})`
  }
  // Fusion des paires de liens dans l'objet courant
  const { links, consumed } = consumeLinkPairs(obj)
  const keys = Object.keys(obj).filter((k) => !SKIP_KEYS.has(k) && !consumed.has(k) && !isEmpty(obj[k]))
  // Ordre : prioritaires d'abord, puis strings/simples, puis arrays/objects
  const sorted = [
    ...PRIORITY_KEYS.filter((k) => keys.includes(k)),
    ...keys.filter((k) => !PRIORITY_KEYS.includes(k) && (typeof obj[k] === 'string' || typeof obj[k] === 'number')),
    ...keys.filter((k) => !PRIORITY_KEYS.includes(k) && typeof obj[k] !== 'string' && typeof obj[k] !== 'number'),
  ]
  const out = []
  for (const k of sorted) {
    const rendered = renderValue(k, obj[k], depth)
    if (rendered) out.push(rendered)
  }
  // Liens fusionnés en bas
  for (const { label, href } of links) {
    out.push(`→ [${label}](${href})`)
  }
  return out.join('\n\n')
}

async function exportSingleton(id, filename, label, url) {
  const d = await client.fetch(`*[_id == $id][0]`, { id })
  if (!d) return
  const body = renderObject(d, 0)
  const content = [frontmatter({ page: label, url, _id: id }), h1(label), body].join('\n\n')
  await writeMd(filename, content)
}

async function exportArticles() {
  const articles = await client.fetch(`
    *[_type == "article" && defined(slug.current)] | order(publishedAt desc){
      "slug": slug.current,
      titre, sousTitre, intro, publishedAt,
      "updatedAt": coalesce(updatedAt, _updatedAt),
      readingTime, featured,
      categorie->{ "slug": slug.current, libelle },
      auteur->{ nom, role },
      tldr,
      body[]{
        ...,
        markDefs[]{ ... }
      },
      faq[]{ question, reponse },
      seo{ titre, description }
    }
  `)
  for (const a of articles) {
    const parts = [
      frontmatter({
        page: 'Article',
        url: `/blog/${a.slug}`,
        slug: a.slug,
        titre: a.titre,
        sousTitre: a.sousTitre,
        intro: a.intro,
        categorie: a.categorie?.libelle,
        auteur: a.auteur?.nom,
        role: a.auteur?.role,
        publishedAt: a.publishedAt,
        updatedAt: a.updatedAt,
        readingTime: a.readingTime,
        featured: a.featured,
        seoTitre: a.seo?.titre,
        seoDescription: a.seo?.description,
      }),
      h1(a.titre),
      a.sousTitre && `> ${a.sousTitre}\n`,
      a.tldr?.length && [h2('L’essentiel (TLDR)'), bullets(a.tldr)].join('\n\n'),
      a.body?.length && [h2('Corps'), ptToMd(a.body)].join('\n\n'),
      a.faq?.length && [
        h2('FAQ finale'),
        a.faq.map((q) => `### ${q.question}\n\n${q.reponse}`).join('\n\n'),
      ].join('\n\n'),
    ].filter(Boolean).join('\n\n')
    await writeMd(`blog/${a.slug}.md`, parts)
  }
}

async function exportPagesService() {
  const pages = await client.fetch(`*[_type == "pageService" && defined(slug.current)]`)
  for (const p of pages) {
    const slug = p.slug?.current
    if (!slug) continue
    await exportSingleton(p._id, `services/${slug}.md`, p.titre || `Service ${slug}`, `/services/${slug}`)
  }
}

async function exportPagesBesoin() {
  const pages = await client.fetch(`*[_type == "pageBesoin" && defined(slug.current)]`)
  for (const p of pages) {
    const slug = p.slug?.current
    if (!slug) continue
    await exportSingleton(p._id, `besoins/${slug}.md`, p.titre || `Besoin ${slug}`, `/besoins/${slug}`)
  }
}

async function exportContactFromParams() {
  const params = await client.fetch(`*[_type == "parametresGlobaux"][0]{ contact, contactPage }`)
  if (!params) return
  const parts = [
    frontmatter({ page: 'Contact', url: '/contact' }),
    h1('Contact'),
    params.contact && [
      h2('Coordonnées'),
      params.contact.email && `**Email** : ${params.contact.email}`,
      params.contact.telephone && `**Téléphone** : ${params.contact.telephone}`,
      params.contact.calendlyUrl && `**Cal.com / Calendly** : ${params.contact.calendlyUrl}`,
    ].filter(Boolean).join('\n\n'),
    params.contactPage && [h2('Contenu de la page /contact'), JSON.stringify(params.contactPage, null, 2)].join('\n\n```json\n') + '\n```',
  ].filter(Boolean).join('\n\n')
  await writeMd('contact.md', parts)
}

/* ============================================================================
 * Pages statiques (contenu en dur dans le code)
 * ============================================================================ */

const STATIC_PAGES = {
  '404.md': `---
page: 404 (Page introuvable)
url: (toute URL inconnue)
robots: noindex, follow
---

# Page introuvable. Mais tout le reste est là.

_// erreur 404_

Un lien cassé, une faute de frappe, une page qui a déménagé… Ça arrive.
Voici comment retrouver votre chemin.

## Reprenons depuis un point connu.

_// où aller_

### Retour à l’accueil
Repartir du début, là où tout est clair.
→ [Aller à l’accueil](/)

### Nos services
Audit, outils internes, agents IA, formation.
→ [Voir les services](/services)

### Vos besoins
Trouvez la situation qui ressemble à la vôtre.
→ [Voir les besoins](/besoins)

### Nous contacter
Une question précise ? On répond sous 24 h.
→ [Écrire à maria](/contact)

Vous cherchiez un article ? [Voir le journal →](/blog)

## Une page perdue, ça se fête à sa manière.

_// tant que vous êtes là_

Le temps de retrouver votre chemin, vous pouvez aider maria à esquiver les vrais problèmes du quotidien.

→ **Lancer le mini-jeu** (Espace ou tap pour sauter · Échap pour quitter)
`,

  'pages-statiques/mentions-legales.md': `---
page: Mentions légales
url: /mentions-legales
---

# Mentions légales

_// mentions légales_

## Éditeur du site
maria — agence digitale 100 % IA.
Contact : hello@maria.tech

## Hébergement
Vercel Inc. (États-Unis, encadrement contractuel européen).

## CMS / contenu structuré
Sanity.io (Union européenne).

## Propriété intellectuelle
L’ensemble du contenu publié sur ce site (textes, illustrations, code) est la propriété de maria, sauf mention contraire. Toute reproduction non autorisée est interdite.
`,

  'pages-statiques/confidentialite.md': `---
page: Confidentialité
url: /confidentialite
---

# Confidentialité

_// confidentialité_

## Données collectées
Le site maria collecte uniquement les données strictement nécessaires : nom, email, message lorsqu’un visiteur remplit le formulaire de contact ; cookies fonctionnels (préférences d’affichage, état du formulaire).

## Finalité
Répondre aux demandes des visiteurs, garantir le bon fonctionnement du site, et — pour les contacts qualifiés — initier une relation commerciale.

## Durée de conservation
Les messages de contact sont conservés tant qu’ils ont une utilité opérationnelle, puis supprimés.

## Droits RGPD
Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, de suppression, d’opposition et de portabilité de vos données. Pour exercer ces droits : hello@maria.tech.
Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).

## Cookies (#cookies)
Ce site n’utilise pas de cookies de tracking publicitaire. Seuls les cookies strictement nécessaires au fonctionnement du site sont déposés (préférences d’affichage, état du formulaire). Aucun consentement préalable n’est requis pour ces cookies fonctionnels.

## Sous-traitants
Les données sont hébergées sur Vercel (États-Unis, avec encadrement contractuel) et stockées dans Sanity (Union européenne). Le service d’envoi d’emails Resend peut être utilisé pour les notifications transactionnelles.
`,

  'pages-statiques/plan-du-site.md': `---
page: Plan du site
url: /plan-du-site
---

# Toutes les pages, d’un coup d’œil

_// plan du site_

Vous cherchez une page précise ? Voici l’ensemble du site, organisé par thématique.

Page générée dynamiquement depuis Sanity (services, besoins, ressources, légal).
Le contenu détaillé est dans les fichiers d’export correspondants.
`,
}

async function exportStaticPages() {
  for (const [path, content] of Object.entries(STATIC_PAGES)) {
    await writeMd(path, content)
  }
}

/* ============================================================================
 * Index récapitulatif
 * ============================================================================ */

async function writeIndex() {
  const articles = await client.fetch(`
    *[_type == "article" && defined(slug.current)] | order(publishedAt desc){
      "slug": slug.current, titre, publishedAt
    }
  `)
  const services = await client.fetch(`*[_type == "pageService" && defined(slug.current)]{ "slug": slug.current, titre }`)
  const besoins = await client.fetch(`*[_type == "pageBesoin" && defined(slug.current)]{ "slug": slug.current, titre } | order(slug asc)`)

  const lines = [
    '# Export contenu maria',
    '',
    `Généré le ${new Date().toISOString().split('T')[0]}.`,
    '',
    '## Pages principales',
    '- [Accueil](./accueil.md)',
    '- [L’agence](./agence.md)',
    '- [Projets](./projets.md)',
    '- [Contact](./contact.md)',
    '- [Charte IA](./charte-ia.md)',
    '',
    '## Piliers SEO',
    '- [Pilier Services](./services-pilier.md) — `/services`',
    '- [Pilier Besoins](./besoins-pilier.md) — `/besoins`',
    '',
    '## Services',
    ...services.map((s) => `- [${s.titre || s.slug}](./services/${s.slug}.md) — \`/services/${s.slug}\``),
    `- [Formation](./formation.md) — \`/formation\``,
    '',
    '## Besoins',
    ...besoins.map((b) => `- [${b.titre || b.slug}](./besoins/${b.slug}.md) — \`/besoins/${b.slug}\``),
    '',
    '## Articles de blog',
    ...articles.map((a) => `- [${a.titre}](./blog/${a.slug}.md) — _${(a.publishedAt || '').split('T')[0]}_`),
    '',
    '## Pages statiques (contenu en dur dans le code)',
    '- [Mentions légales](./pages-statiques/mentions-legales.md)',
    '- [Confidentialité (incl. cookies)](./pages-statiques/confidentialite.md)',
    '- [404](./404.md)',
    '- [Plan du site](./pages-statiques/plan-du-site.md)',
    '',
  ]
  await writeMd('README.md', lines.join('\n'))
}

/* ============================================================================
 * Run
 * ============================================================================ */

console.log(`Export → ${OUT_DIR}`)
console.log('Pages principales :')
await exportAccueil()
await exportSingleton('agence', 'agence.md', 'L’agence', '/agence')
await exportSingleton('projets', 'projets.md', 'Projets', '/projets')
await exportSingleton('pageCharteIA', 'charte-ia.md', 'Charte IA', '/charte-ia')
await exportSingleton('pageFormation', 'formation.md', 'Formation', '/formation')
await exportSingleton('pagePillierServices', 'services-pilier.md', 'Services (pilier)', '/services')
await exportSingleton('pagePillierBesoins', 'besoins-pilier.md', 'Besoins (pilier)', '/besoins')
await exportContactFromParams()

console.log('Services :')
await exportPagesService()

console.log('Besoins :')
await exportPagesBesoin()

console.log('Articles :')
await exportArticles()

console.log('Pages statiques :')
await exportStaticPages()

console.log('Index :')
await writeIndex()

console.log('\n✓ Export terminé →', OUT_DIR)
