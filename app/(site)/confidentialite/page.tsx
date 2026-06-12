import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPageLayout, {
  LegalSection,
  LegalSubsection,
  LegalTable,
} from '../../../src/components/legal/LegalPageLayout'
import { legalInfo } from '../../../src/content/legal/info'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

// Volontairement noindex : la page reste atteignable via les liens (footer,
// formulaire contact) - pas d'enjeu SEO à l'indexer. À revoir si la page
// devient un actif éditorial autonome.
export const metadata: Metadata = {
  title: 'Politique de confidentialité | maria',
  description:
    'Comment maria collecte, utilise et protège vos données personnelles. RGPD, durée de conservation, sous-traitants, cookies, droits.',
  alternates: { canonical: `${SITE_URL}/confidentialite` },
  robots: { index: false, follow: true },
}

export default function ConfidentialitePage() {
  return (
    <LegalPageLayout
      surTitre="// confidentialité"
      titre="Politique de confidentialité"
      chapo="maria accorde une importance particulière à la protection des données personnelles. Cette politique explique quelles données nous collectons, pourquoi, et quels sont vos droits."
      derniereMaj={legalInfo.derniereMaj}
      breadcrumb={[
        { label: 'Accueil', href: '/' },
        { label: 'Politique de confidentialité' },
      ]}
    >
      <LegalSection title="Responsable du traitement">
        <p>
          {legalInfo.denomination}, {legalInfo.siegeSocial}. Contact données :{' '}
          <a
            href={`mailto:${legalInfo.emailLegal}`}
            className="border-b border-success text-ink hover:text-success"
          >
            {legalInfo.emailLegal}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Données que nous collectons">
        <p>Uniquement les données que vous nous transmettez activement :</p>
        <ul className="ml-1 flex flex-col gap-2">
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Formulaire de contact</strong> :
              nom, prénom, e-mail, téléphone (facultatif), contenu du message.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Prise de rendez-vous</strong> :
              informations renseignées lors de la réservation d’un créneau.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Navigation</strong> : mesure
              d’audience, uniquement après consentement (voir section Cookies
              plus bas).
            </span>
          </li>
        </ul>
        <p>Aucune donnée sensible, aucun profilage publicitaire.</p>
      </LegalSection>

      <LegalSection title="Finalités et bases légales">
        <LegalTable
          headers={['Donnée', 'Finalité', 'Base légale']}
          rows={[
            ['Formulaire de contact', 'Répondre à votre demande', 'Intérêt légitime / mesures précontractuelles'],
            ['Prise de rendez-vous', 'Organiser l’échange', 'Mesures précontractuelles'],
            ['Mesure d’audience', 'Améliorer le site', 'Consentement'],
          ]}
        />
      </LegalSection>

      <LegalSection title="Destinataires / sous-traitants">
        <p>
          Pour faire fonctionner le site, nous nous appuyons sur les
          sous-traitants suivants :
        </p>
        <ul className="ml-1 flex flex-col gap-2">
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Vercel Inc.</strong> - hébergement
              du site (États-Unis, sous encadrement contractuel européen).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Sanity.io</strong> - stockage du
              contenu éditorial (Union européenne).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Resend</strong> - envoi des
              e-mails transactionnels liés au formulaire de contact (Union
              européenne).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Cal.com</strong> - prise de
              rendez-vous en ligne (États-Unis, sous accord de traitement
              des données conforme RGPD).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Axeptio</strong> - gestion du
              consentement RGPD (Union européenne).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Google Analytics 4</strong> -
              mesure d’audience, chargée <em>uniquement après votre consentement</em>,
              avec IP anonymisée et signaux publicitaires désactivés
              (États-Unis, sous accord de traitement des données conforme RGPD).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">WhatsApp Business / Meta</strong> - si vous cliquez sur le bouton WhatsApp du site, vous êtes
              redirigé vers les serveurs Meta (États-Unis) et vos échanges
              sont soumis aux conditions de WhatsApp.
            </span>
          </li>
        </ul>
        <p>
          Nous ne vendons ni ne louons vos données. Vos données ne sont jamais
          utilisées pour entraîner des modèles d’IA - voir notre{' '}
          <Link
            href="/charte-ia"
            className="border-b border-success text-ink hover:text-success"
          >
            Charte de gouvernance IA
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <ul className="ml-1 flex flex-col gap-2">
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Demandes formulaire / RDV</strong> :
              3 ans à compter du dernier contact (conforme aux recommandations
              CNIL pour la prospection commerciale).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Mesure d’audience</strong> :
              13 mois maximum (durée recommandée par la CNIL pour les cookies
              analytiques).
            </span>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          maria a fait le choix de la sobriété :{' '}
          <strong className="text-ink">aucun cookie publicitaire</strong> ni de
          traçage commercial. Aucun cookie non essentiel n’est déposé sans
          votre consentement préalable.
        </p>

        <LegalSubsection title="Cookies strictement nécessaires">
          <p>
            Indispensables au fonctionnement du site, ils ne nécessitent pas de
            consentement. Concrètement, un cookie est utilisé pour mémoriser
            votre choix de consentement afin de ne pas vous le redemander à
            chaque visite.
          </p>
        </LegalSubsection>

        <LegalSubsection title="Cookies de mesure d’audience">
          <p>
            Soumis à votre consentement, déposés uniquement après acceptation
            via le widget de consentement. Outil utilisé : Google Analytics 4,
            avec IP anonymisée, sans Google Signals et sans personnalisation
            publicitaire. Durée de vie : 13 mois maximum.
          </p>
        </LegalSubsection>

        <LegalSubsection title="Gérer votre consentement">
          <p>
            Votre consentement est modifiable et retirable à tout moment via le
            lien « Gérer mes cookies » présent en pied de page, qui réouvre la
            fenêtre de gestion. Vous pouvez également configurer votre
            navigateur pour bloquer les cookies ; cela peut affecter certaines
            fonctionnalités du site.
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Conformément au RGPD, vous disposez de droits d’accès, rectification,
          effacement, limitation, opposition, et portabilité. Pour les exercer :{' '}
          <a
            href={`mailto:${legalInfo.emailLegal}`}
            className="border-b border-success text-ink hover:text-success"
          >
            {legalInfo.emailLegal}
          </a>
          . Vous pouvez également introduire une réclamation auprès de la CNIL (
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noreferrer noopener"
            className="border-b border-success text-ink hover:text-success"
          >
            cnil.fr
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection title="Sécurité">
        <p>
          Mesures techniques et organisationnelles raisonnables pour protéger
          vos données. Engagements spécifiques sur les données de projets
          clients détaillés dans la{' '}
          <Link
            href="/charte-ia"
            className="border-b border-success text-ink hover:text-success"
          >
            Charte de gouvernance IA
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Évolution de cette politique">
        <p>
          Cette politique peut évoluer. Toute modification substantielle sera
          signalée sur cette page, avec mise à jour de la date affichée en
          en-tête.
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}
