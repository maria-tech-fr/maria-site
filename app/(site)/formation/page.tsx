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
import JsonLd from '../../../src/components/JsonLd'
import {
  buildCourseSchema,
  buildFaqSchema,
  buildServiceSchema,
} from '../../../src/lib/schema'
import { resolveSeo } from '../../../src/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageFormation()
  return resolveSeo(data?.seo, {
    title: 'Formation IA pour les équipes en entreprise | maria',
    description:
      'maria forme vos équipes et vos décideurs à l’IA : usages métier, sécurité des données, gouvernance. Des formations concrètes, ancrées dans votre réalité.',
    path: '/formation',
  })
}

export default async function PageFormation() {
  const data = await getPageFormation()
  if (!data) notFound()

  return (
    <>
      <JsonLd
        data={buildServiceSchema({
          name: 'Formation IA pour les équipes',
          description:
            data.hero?.sousTitre ??
            'Formations IA en entreprise : usages métier, sécurité des données, gouvernance.',
          url: '/formation',
          serviceType: 'Formation IA',
        })}
      />
      <JsonLd
        data={buildCourseSchema({
          name: 'Formation IA pour les équipes',
          description:
            data.hero?.sousTitre ??
            'Formations IA en entreprise : usages métier, sécurité des données, gouvernance.',
          url: '/formation',
        })}
      />
      <JsonLd data={buildFaqSchema(data.faq?.questions)} />

      {/* 1 — Hero */}
      {data.hero?.titre && (
        <FormationHero
          surTitre={data.hero.surTitre || '// formation'}
          titre={data.hero.titre}
          sousTitre={data.hero.sousTitre}
          ctaPrimaireLibelle={data.hero.ctaPrimaireLibelle}
          ctaSecondaireLibelle={data.hero.ctaSecondaireLibelle}
          breadcrumb={[
            { label: 'Accueil', href: '/' },
            { label: 'Formation' },
          ]}
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
