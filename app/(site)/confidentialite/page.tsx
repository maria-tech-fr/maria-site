import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPageLayout, {
  LegalSection,
  LegalTable,
} from '../../../src/components/legal/LegalPageLayout'
import { legalInfo } from '../../../src/content/legal/info'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

// TODO: passer index:true après validation juridique du contenu.
export const metadata: Metadata = {
  title: 'Politique de confidentialité | maria',
  description:
    'Comment maria collecte, utilise et protège vos données personnelles. RGPD, durée de conservation, sous-traitants, droits, sécurité.',
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
        <p className="text-ink-soft/70">
          [À COMPLÉTER : DPO / référent données désigné ou non, coordonnées
          le cas échéant — non obligatoire pour une petite structure.]
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
              d’audience (voir politique cookies), uniquement après consentement.
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
              <strong className="text-ink">Vercel Inc.</strong> — hébergement
              du site (États-Unis, sous encadrement contractuel européen).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Sanity.io</strong> — stockage du
              contenu éditorial (Union européenne).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Resend</strong> — envoi des
              e-mails transactionnels liés au formulaire de contact (Union
              européenne).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Cal.com</strong> — prise de
              rendez-vous en ligne (États-Unis, sous accord de traitement
              des données conforme RGPD).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Axeptio</strong> — gestion du
              consentement RGPD (Union européenne).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Google Analytics 4</strong> —
              mesure d’audience, chargée <em>uniquement après votre consentement</em>,
              avec IP anonymisée et signaux publicitaires désactivés
              (États-Unis, sous accord de traitement des données conforme RGPD).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">WhatsApp Business / Meta</strong>
              {' '}— si vous cliquez sur le bouton WhatsApp du site, vous êtes
              redirigé vers les serveurs Meta (États-Unis) et vos échanges
              sont soumis aux conditions de WhatsApp.
            </span>
          </li>
        </ul>
        <p>
          Nous ne vendons ni ne louons vos données. Vos données ne sont jamais
          utilisées pour entraîner des modèles d’IA — voir notre{' '}
          <Link
            href="/charte-ia"
            className="border-b border-success text-ink hover:text-success"
          >
            Charte de gouvernance IA
          </Link>
          .
        </p>
        <p className="text-ink-soft/70">
          [À COMPLÉTER : précisions sur les transferts hors UE (Vercel,
          Google, Cal.com, Meta) et garanties applicables (Standard Contractual
          Clauses, accords adéquation) — à faire valider juridiquement.]
        </p>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <ul className="ml-1 flex flex-col gap-2">
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Demandes formulaire / RDV</strong> :
              [À COMPLÉTER : ex. 3 ans après dernier contact].
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span>
              <strong className="text-ink">Mesure d’audience</strong> :
              [À COMPLÉTER : ex. 13 mois max].
            </span>
          </li>
        </ul>
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
