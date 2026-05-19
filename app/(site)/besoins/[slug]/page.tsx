import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getPageBesoinBySlug,
  getPageBesoinSlugs,
  getFamilleMeta,
  type PageBesoinData,
} from '../../../../src/lib/pageBesoin'
import BesoinHero from '../../../../src/components/besoin/BesoinHero'
import BesoinProblem from '../../../../src/components/besoin/BesoinProblem'
import BesoinCost from '../../../../src/components/besoin/BesoinCost'
import BesoinAnswer from '../../../../src/components/besoin/BesoinAnswer'
import BesoinTransformation from '../../../../src/components/besoin/BesoinTransformation'
import BesoinServiceAssocie from '../../../../src/components/besoin/BesoinServiceAssocie'
import Faq from '../../../../src/components/Faq'
import BesoinRelated from '../../../../src/components/besoin/BesoinRelated'
import JsonLd from '../../../../src/components/JsonLd'
import { buildBreadcrumbSchema, buildFaqSchema } from '../../../../src/lib/schema'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

export async function generateStaticParams() {
  const slugs = await getPageBesoinSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = await getPageBesoinBySlug(slug)
  if (!data) return {}

  const title = data.seo?.titre || `${data.titre} — Besoin | maria`
  const description = data.seo?.description || data.introCourte || undefined
  const canonical = `${SITE_URL}/besoins/${data.slug}`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description: description ?? undefined,
      type: 'website',
      url: canonical,
    },
  }
}

export default async function PageBesoin({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = await getPageBesoinBySlug(slug)
  if (!data) notFound()

  const famille = getFamilleMeta(data.famille)

  // Le breadcrumb passe par /besoins (pilier) pour signaler la hiérarchie
  // « Accueil > Besoins > [titre du besoin] ».
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Accueil', url: '/' },
          { name: 'Besoins', url: '/besoins' },
          { name: data.titre, url: `/besoins/${data.slug}` },
        ])}
      />
      <JsonLd data={buildFaqSchema(data.faq?.questions)} />

      {renderBlocks(data, famille?.titre)}
    </>
  )
}

function renderBlocks(data: NonNullable<PageBesoinData>, famille: string | undefined) {
  return (
    <>
      {/* 1 — Hero */}
      {data.hero?.titre && (
        <BesoinHero
          surTitre={data.hero.surTitre || '// besoin'}
          titre={data.hero.titre}
          sousTitre={data.hero.sousTitre}
          ctaPrimaireLibelle={data.hero.ctaPrimaireLibelle}
          ctaSecondaireLibelle={data.hero.ctaSecondaireLibelle}
        />
      )}

      {/* Hairline divider hero → problème (2 sections claires) */}
      <div className="h-px bg-linear-to-r from-transparent via-ink/10 to-transparent" />

      {/* 2 — Le problème */}
      {data.probleme?.titre && data.probleme?.symptomes && (
        <BesoinProblem
          surTitre={data.probleme.surTitre || '// le problème'}
          titre={data.probleme.titre}
          paragraphes={data.probleme.paragraphes ?? []}
          recogSurTitre={data.probleme.recogSurTitre || '// vous reconnaissez ?'}
          recogTitre={data.probleme.recogTitre || 'Quelques situations qu’on entend souvent'}
          symptomes={data.probleme.symptomes}
        />
      )}

      {/* 3 — Le vrai coût */}
      {data.cout?.titre && data.cout?.items && (
        <BesoinCost
          surTitre={data.cout.surTitre || '// le vrai coût'}
          titre={data.cout.titre}
          items={data.cout.items}
        />
      )}

      {/* 4 — Notre réponse */}
      {data.reponse?.titre && data.reponse?.leviers && (
        <BesoinAnswer
          surTitre={data.reponse.surTitre || '// notre réponse'}
          titre={data.reponse.titre}
          sousTitre={data.reponse.sousTitre}
          leviers={data.reponse.leviers}
        />
      )}

      {/* 5 — Le quotidien d'après */}
      {data.transformation?.titre && data.transformation?.avant && data.transformation?.apres && (
        <BesoinTransformation
          surTitre={data.transformation.surTitre || '// le quotidien d’après'}
          titre={data.transformation.titre}
          avant={data.transformation.avant}
          apres={data.transformation.apres}
          closing={data.transformation.closing}
        />
      )}

      {/* 6 — Service associé */}
      {data.serviceAssocie?.cards && (
        <BesoinServiceAssocie
          surTitre={data.serviceAssocie.surTitre || '// le service qui répond à ce besoin'}
          titre={data.serviceAssocie.titre || 'Comment on s’y prend concrètement.'}
          cards={data.serviceAssocie.cards}
          formationMention={data.serviceAssocie.formationMention}
        />
      )}

      {/* 7 — FAQ */}
      {data.faq?.questions && data.faq.questions.length > 0 && (
        <Faq
          data={{
            surTitre: data.faq.surTitre || '// vos questions',
            titre: data.faq.titre || 'Les questions qu’on nous pose sur ce sujet.',
            questions: data.faq.questions,
          }}
        />
      )}

      {/* 7bis — Besoins liés */}
      {data.besoinsLies?.references && data.besoinsLies.references.length > 0 && (
        <BesoinRelated
          surTitre={data.besoinsLies.surTitre || '// besoins liés'}
          titre={data.besoinsLies.titre || 'Vous pourriez aussi avoir besoin de…'}
          references={data.besoinsLies.references}
        />
      )}

      {/* SR-only : info famille pour le contexte */}
      {famille && <span className="sr-only">Famille de besoin : {famille}</span>}
    </>
  )
}
