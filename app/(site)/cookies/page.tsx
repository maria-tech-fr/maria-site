import type { Metadata } from 'next'
import LegalPageLayout, {
  LegalSection,
  LegalSubsection,
  LegalTable,
} from '../../../src/components/legal/LegalPageLayout'
import { legalInfo } from '../../../src/content/legal/info'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

// TODO: passer index:true après validation juridique du contenu.
export const metadata: Metadata = {
  title: 'Politique cookies | maria',
  description:
    'Quels cookies utilise le site maria, pourquoi, et comment gérer votre consentement. Approche sobre, aucun cookie publicitaire.',
  alternates: { canonical: `${SITE_URL}/cookies` },
  robots: { index: false, follow: true },
}

export default function CookiesPage() {
  return (
    <LegalPageLayout
      surTitre="// cookies"
      titre="Politique de gestion des cookies"
      derniereMaj={legalInfo.derniereMaj}
    >
      <LegalSection title="Qu’est-ce qu’un cookie ?">
        <p>
          Un cookie est un petit fichier déposé sur votre terminal lors de la
          visite d’un site (mesure d’audience, mémorisation de préférences,
          etc.).
        </p>
      </LegalSection>

      <LegalSection title="Notre approche">
        <p>
          maria a fait le choix de la sobriété : <strong className="text-ink">aucun cookie publicitaire</strong> ni de
          traçage commercial. Aucun cookie non essentiel n’est déposé sans
          votre consentement préalable.
        </p>
      </LegalSection>

      <LegalSection title="Cookies utilisés">
        <LegalSubsection title="Cookies strictement nécessaires">
          <p>
            Indispensables au fonctionnement du site, ils ne nécessitent pas de
            consentement.
          </p>
          <p className="text-ink-soft/70">
            [À COMPLÉTER : lister précisément — ex. cookie mémorisant le choix
            de consentement.]
          </p>
        </LegalSubsection>

        <LegalSubsection title="Cookies de mesure d’audience">
          <p>
            Soumis à votre consentement, déposés uniquement après acceptation
            via le widget de consentement.
          </p>
          <p className="text-ink-soft/70">
            [À COMPLÉTER : outil utilisé (a priori GA4), durée de vie, finalité
            exacte.]
          </p>
        </LegalSubsection>

        <LegalTable
          caption="Récapitulatif des cookies (à compléter)"
          headers={['Cookie', 'Finalité', 'Durée', 'Consentement']}
          rows={[
            ['[À COMPLÉTER]', '[À COMPLÉTER]', '[À COMPLÉTER]', 'Nécessaire'],
            ['[À COMPLÉTER]', '[À COMPLÉTER]', '[À COMPLÉTER]', 'Soumis'],
          ]}
        />
      </LegalSection>

      <LegalSection title="Gérer votre consentement">
        <p>
          Votre consentement est modifiable et retirable à tout moment.{' '}
          <span className="text-ink-soft/70">
            [À COMPLÉTER : moyen — a priori widget Axeptio accessible en pied
            de page.]
          </span>
        </p>
        <p>
          Vous pouvez également configurer votre navigateur pour bloquer les
          cookies ; cela peut affecter certaines fonctionnalités du site.
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}
