import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageFormation } from '../../../src/lib/pageFormation'
import FormationHero from '../../../src/components/formation/FormationHero'
import FormationAudiences from '../../../src/components/formation/FormationAudiences'
import FormationConstat from '../../../src/components/formation/FormationConstat'
import FormationCatalogue from '../../../src/components/formation/FormationCatalogue'
import FormationPedagogie from '../../../src/components/formation/FormationPedagogie'
import FormationFormats from '../../../src/components/formation/FormationFormats'
import FormationTransversale from '../../../src/components/formation/FormationTransversale'
import Faq from '../../../src/components/Faq'
import FormationCta from '../../../src/components/formation/FormationCta'
import FormationServicesLinks from '../../../src/components/formation/FormationServicesLinks'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageFormation()
  const title = data?.seo?.titre || 'Formation IA pour les équipes en entreprise | maria'
  const description =
    data?.seo?.description ||
    'maria forme vos équipes et vos décideurs à l’IA : usages métier, sécurité des données, gouvernance. Des formations concrètes, ancrées dans votre réalité.'
  const canonical = `${SITE_URL}/formation`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, type: 'website', url: canonical },
  }
}

export default async function PageFormation() {
  const data = await getPageFormation()
  if (!data) notFound()

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Formation IA', item: `${SITE_URL}/formation` },
    ],
  }

  const faqJsonLd = data.faq?.questions && data.faq.questions.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faq.questions.map((q) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: { '@type': 'Answer', text: q.reponse },
        })),
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* 1 — Hero */}
      {data.hero?.titre && (
        <FormationHero
          surTitre={data.hero.surTitre || '// formation'}
          titre={data.hero.titre}
          sousTitre={data.hero.sousTitre}
          ctaPrimaireLibelle={data.hero.ctaPrimaireLibelle}
          ctaSecondaireLibelle={data.hero.ctaSecondaireLibelle}
        />
      )}

      {/* 2 — Pour qui */}
      {data.audiences?.cards && data.audiences.cards.length > 0 && (
        <FormationAudiences
          surTitre={data.audiences.surTitre || '// pour qui'}
          titre={data.audiences.titre || ''}
          cards={data.audiences.cards}
        />
      )}

      {/* 3 — Constat */}
      {data.constat?.titre && data.constat.paragraphes && (
        <FormationConstat
          surTitre={data.constat.surTitre || '// le constat'}
          titre={data.constat.titre}
          paragraphes={data.constat.paragraphes}
        />
      )}

      {/* 4 — Catalogue */}
      {data.catalogue?.familles && data.catalogue.familles.length > 0 && (
        <FormationCatalogue
          surTitre={data.catalogue.surTitre || '// nos formations'}
          titre={data.catalogue.titre || ''}
          sousTitre={data.catalogue.sousTitre}
          familles={data.catalogue.familles}
        />
      )}

      {/* 5 — Pédagogie */}
      {data.pedagogie?.principes && data.pedagogie.principes.length > 0 && (
        <FormationPedagogie
          surTitre={data.pedagogie.surTitre || '// notre pédagogie'}
          titre={data.pedagogie.titre || ''}
          sousTitre={data.pedagogie.sousTitre}
          principes={data.pedagogie.principes}
        />
      )}

      {/* 6 — Formats */}
      {data.formats?.cards && data.formats.cards.length > 0 && (
        <FormationFormats
          surTitre={data.formats.surTitre || '// formats'}
          titre={data.formats.titre || ''}
          cards={data.formats.cards}
        />
      )}

      {/* 7 — Transversale */}
      {data.transversale?.liens && data.transversale.liens.length > 0 && (
        <FormationTransversale
          surTitre={data.transversale.surTitre || '// transversale'}
          titre={data.transversale.titre || ''}
          intro={data.transversale.intro}
          liens={data.transversale.liens}
        />
      )}

      {/* 8 — FAQ */}
      {data.faq?.questions && data.faq.questions.length > 0 && (
        <Faq
          data={{
            surTitre: data.faq.surTitre || '// vos questions',
            titre: data.faq.titre || 'Les questions qu’on nous pose sur la formation.',
            questions: data.faq.questions,
          }}
        />
      )}

      {/* 9 — CTA final */}
      {data.ctaFinal?.titre && (
        <FormationCta
          surTitre={data.ctaFinal.surTitre || '// commencer'}
          titre={data.ctaFinal.titre}
          sousTitre={data.ctaFinal.sousTitre}
          ctaPrimaireLibelle={data.ctaFinal.ctaPrimaireLibelle}
          ctaSecondaireLibelle={data.ctaFinal.ctaSecondaireLibelle}
          mention={data.ctaFinal.mention}
        />
      )}

      {/* 10 — Services links */}
      {data.services?.cards && data.services.cards.length > 0 && (
        <FormationServicesLinks
          surTitre={data.services.surTitre || '// nos expertises'}
          titre={data.services.titre || ''}
          cards={data.services.cards}
        />
      )}
    </>
  )
}
