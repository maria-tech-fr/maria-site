import type { ReactNode } from 'react'
import type { BreadcrumbSegment } from '../Breadcrumb'
import type { PagePillierData } from '../../lib/pagePillier'
import PillarHero from './PillarHero'
import PillarVision from './PillarVision'
import PillarArticulation from './PillarArticulation'
import PillarWhyMaria from './PillarWhyMaria'
import PillarFaq from './PillarFaq'

type Props = {
  data: NonNullable<PagePillierData>
  /** Bloc central injecté entre Vision (bloc 2) et Articulation (bloc 4). */
  children: ReactNode
  /** Fil d'Ariane signature passé au Hero. */
  breadcrumb?: BreadcrumbSegment[]
}

/**
 * Gabarit mutualisé des pages piliers (/services et /besoins).
 * 5 blocs communs + 1 bloc central injecté via children.
 *
 * Ordre : Hero → Vision → [Central] → Articulation → WhyMaria → FAQ.
 *
 * Pas de CTA final propre à la page : le bloc CTA « Un projet IA en tête »
 * du footer global tient ce rôle pour les 2 piliers.
 */
export default function PillarPageTemplate({ data, children, breadcrumb }: Props) {
  return (
    <>
      {/* 1 — Hero */}
      {data.hero?.titre && (
        <PillarHero
          surTitre={data.hero.surTitre || '// pilier'}
          titre={data.hero.titre}
          sousTitre={data.hero.sousTitre}
          ctaPrimaireLibelle={data.hero.ctaPrimaireLibelle}
          ctaPrimaireHref={data.hero.ctaPrimaireHref}
          ctaSecondaireLibelle={data.hero.ctaSecondaireLibelle}
          ctaSecondaireAncre={data.hero.ctaSecondaireAncre}
          breadcrumb={breadcrumb}
        />
      )}

      {/* 2 — Vision. Fond paper sur services, paper-soft sur besoins (rythme
            visuel : bloc central inverse — besoins central blanc, services central gris). */}
      {data.vision?.titre && data.vision.paragraphes && data.vision.paragraphes.length > 0 && (
        <PillarVision
          surTitre={data.vision.surTitre || '// notre approche'}
          titre={data.vision.titre}
          paragraphes={data.vision.paragraphes}
          bg={data.slug === 'besoins' ? 'paper-soft' : 'paper'}
        />
      )}

      {/* 3 — Bloc central injecté (ServicesCentralBlock ou NeedsCentralBlock) */}
      {children}

      {/* 4 — Articulation (+ transversal optionnel) */}
      {data.articulation?.titre && data.articulation.etapes && data.articulation.etapes.length > 0 && (
        <PillarArticulation
          surTitre={data.articulation.surTitre || '// comment ça s’articule'}
          titre={data.articulation.titre}
          intro={data.articulation.intro}
          etapes={data.articulation.etapes}
          transversal={data.articulation.transversal}
        />
      )}

      {/* 5 — Pourquoi maria */}
      {data.whyMaria?.titre && data.whyMaria.piliers && data.whyMaria.piliers.length > 0 && (
        <PillarWhyMaria
          surTitre={data.whyMaria.surTitre || '// pourquoi maria'}
          titre={data.whyMaria.titre}
          piliers={data.whyMaria.piliers}
          charteLien={data.whyMaria.charteLien}
        />
      )}

      {/* 6 — FAQ */}
      {data.faq?.questions && data.faq.questions.length > 0 && (
        <PillarFaq
          surTitre={data.faq.surTitre || '// vos questions'}
          titre={data.faq.titre || 'Les questions qu’on nous pose.'}
          questions={data.faq.questions}
        />
      )}
    </>
  )
}
