/**
 * Constantes SEO partagées entre pages.
 *
 * Centralise l'image OG par défaut afin que les pages qui définissent leur
 * propre bloc `openGraph` page-level puissent l'inclure sans dupliquer la
 * config — Next.js n'hérite PAS automatiquement les champs `images` d'un
 * `openGraph` parent quand l'enfant redéfinit ce bloc.
 *
 * Asset attendu : /public/og/default.jpg (1200×630). Cf. /public/og/README.md
 * pour les specs.
 */

export const DEFAULT_OG_IMAGE = {
  url: '/og/default.jpg',
  width: 1200,
  height: 630,
  alt: 'maria — agence IA pour l’interne',
} as const
