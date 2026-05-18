import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Comment maria collecte, utilise et protège vos données personnelles. RGPD, durée de conservation, vos droits.',
  alternates: { canonical: `${SITE_URL}/confidentialite` },
  robots: { index: true, follow: true },
}

export default function ConfidentialitePage() {
  return (
    <section className="bg-paper px-6 pb-22 pt-40 lg:px-30.5 lg:pb-30 lg:pt-44">
      <div className="mx-auto flex w-full max-w-[820px] flex-col gap-10">
        <header className="flex flex-col gap-4">
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-success">
            // confidentialité
          </p>
          <h1 className="font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.032em] text-ink lg:text-[60px]">
            Politique de confidentialité
          </h1>
          <p className="text-[15px] text-ink-soft">
            Dernière mise à jour : à compléter
          </p>
        </header>

        <div className="flex flex-col gap-8 text-[16px] leading-7 text-ink-soft lg:text-[17px]">
          <Section title="Qui collecte vos données ?">
            <p>
              Les données collectées via ce site sont traitées par maria, agence digitale 100 % IA. Pour toute question, vous pouvez nous contacter à{' '}
              <a href="mailto:hello@maria.tech" className="border-b border-success text-ink hover:text-success">hello@maria.tech</a>.
            </p>
          </Section>

          <Section title="Quelles données ?">
            <p>
              Les données collectées concernent uniquement les informations que vous nous communiquez volontairement via le formulaire de contact : nom, prénom, email, téléphone (optionnel), message.
            </p>
            <p>
              Nous conservons également une trace technique de votre soumission (IP hashée, user-agent, page d’origine) à des fins de sécurité et de lutte contre le spam.
            </p>
          </Section>

          <Section title="Pourquoi ?">
            <p>
              Vos données nous servent exclusivement à répondre à votre demande. Elles ne sont jamais cédées à des tiers à des fins commerciales.
            </p>
          </Section>

          <Section title="Combien de temps ?">
            <p>
              Vos données de contact sont conservées 3 ans après notre dernier échange. Les traces techniques liées à la sécurité sont conservées 12 mois.
            </p>
          </Section>

          <Section title="Vos droits">
            <p>
              Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, de suppression, d’opposition et de portabilité de vos données. Pour exercer ces droits, écrivez-nous à{' '}
              <a href="mailto:hello@maria.tech" className="border-b border-success text-ink hover:text-success">hello@maria.tech</a>.
            </p>
            <p>
              Vous pouvez également introduire une réclamation auprès de la CNIL ({' '}
              <a href="https://www.cnil.fr" target="_blank" rel="noreferrer noopener" className="border-b border-success text-ink hover:text-success">cnil.fr</a>
              ).
            </p>
          </Section>

          <Section title="Cookies" anchorId="cookies">
            <p>
              Ce site n’utilise pas de cookies de tracking publicitaire. Seuls les cookies strictement nécessaires au fonctionnement du site sont déposés (préférences d’affichage, état du formulaire). Aucun consentement préalable n’est requis pour ces cookies fonctionnels.
            </p>
          </Section>

          <Section title="Sous-traitants">
            <p>
              Les données sont hébergées sur Vercel (États-Unis, avec encadrement contractuel) et stockées dans Sanity (Union européenne). Le service d’envoi d’emails Resend peut être utilisé pour les notifications transactionnelles.
            </p>
          </Section>
        </div>
      </div>
    </section>
  )
}

function Section({
  title,
  anchorId,
  children,
}: {
  title: string
  /** Si renseigné, ajoute id={anchorId} pour permettre un lien d'ancre (#anchorId). */
  anchorId?: string
  children: React.ReactNode
}) {
  return (
    <div id={anchorId} className="flex flex-col gap-3 scroll-mt-32">
      <h2 className="font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink lg:text-[24px]">
        {title}
      </h2>
      {children}
    </div>
  )
}
