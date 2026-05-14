import type { ArticleBodyBlock } from './article'

/**
 * Slugifie un texte FR → ascii lowercase avec tirets.
 * Sert à dériver des anchors stables pour les H2.
 */
export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Extrait le texte brut d'un bloc Portable Text (concat des spans). */
export function extractBlockText(block: ArticleBodyBlock): string {
  if (!block || block._type !== 'block') return ''
  const children = (block as { children?: Array<{ _type: string; text?: string }> }).children
  if (!Array.isArray(children)) return ''
  return children
    .filter((c) => c._type === 'span')
    .map((c) => c.text ?? '')
    .join('')
}

/**
 * Compte les mots dans le body et renvoie un reading time en minutes
 * (200 mots/min, min 1).
 */
export function computeReadingTime(body: ArticleBodyBlock[] | null | undefined): number {
  if (!body || body.length === 0) return 1
  let words = 0
  for (const block of body) {
    if (block._type === 'block') {
      const text = extractBlockText(block)
      words += text.split(/\s+/).filter(Boolean).length
    } else if (block._type === 'callout' || block._type === 'warning') {
      const t = (block as { texte?: string }).texte
      if (t) words += t.split(/\s+/).filter(Boolean).length
    }
  }
  return Math.max(1, Math.round(words / 200))
}

/** Item résolu du sommaire après merge avec les overrides. */
export type TocResolvedItem = {
  anchor: string
  label: string
}

/**
 * Construit la liste finale du sommaire à partir des H2 détectés dans le
 * body, en appliquant les overrides (label custom, exclusion) du champ
 * `tocItems` de l'article.
 */
export function buildToc(
  body: ArticleBodyBlock[] | null | undefined,
  overrides: Array<{ anchor: string; label: string | null; exclure: boolean | null }> | null | undefined,
): TocResolvedItem[] {
  if (!body) return []
  const overridesByAnchor = new Map<string, { label: string | null; exclure: boolean | null }>()
  for (const o of overrides ?? []) {
    overridesByAnchor.set(o.anchor, { label: o.label, exclure: o.exclure })
  }
  const result: TocResolvedItem[] = []
  for (const block of body) {
    if (block._type !== 'block') continue
    if ((block as { style?: string }).style !== 'h2') continue
    const text = extractBlockText(block)
    const anchor = slugify(text)
    const ov = overridesByAnchor.get(anchor)
    if (ov?.exclure) continue
    result.push({ anchor, label: ov?.label || text })
  }
  return result
}
