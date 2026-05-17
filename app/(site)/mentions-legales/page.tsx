import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site maria — éditeur, hébergeur, contact.',
  alternates: { canonical: `${SITE_URL}/mentions-legales` },
  robots: { index: true, follow: true },
}

export default function MentionsLegalesPage() {
  return (
    <section className="bg-paper px-6 pb-22 pt-40 lg:px-30.5 lg:pb-30 lg:pt-44">
      <div className="mx-auto flex w-full max-w-[820px] flex-col gap-10">
        <header className="flex flex-col gap-4">
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-success">
            // mentions légales
          </p>
          <h1 className="font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.032em] text-ink lg:text-[60px]">
            Mentions légales
          </h1>
        </header>

        <div className="flex flex-col gap-8 text-[16px] leading-7 text-ink-soft lg:text-[17px]">
          <Section title="Éditeur du site">
            <p>
              maria — agence digitale 100 % IA
              <br />
              Forme juridique : à compléter
              <br />
              Siège social : à compléter
              <br />
              SIREN : à compléter
              <br />
              Directeur de la publication : à compléter
              <br />
              Contact : <a href="mailto:hello@maria.tech" className="border-b border-success text-ink hover:text-success">hello@maria.tech</a>
            </p>
          </Section>

          <Section title="Hébergement">
            <p>
              Vercel Inc.
              <br />
              440 N Barranca Avenue #4133
              <br />
              Covina, CA 91723, USA
              <br />
              <a href="https://vercel.com" target="_blank" rel="noreferrer noopener" className="border-b border-success text-ink hover:text-success">vercel.com</a>
            </p>
          </Section>

          <Section title="Propriété intellectuelle">
            <p>
              L’ensemble des contenus du site (textes, images, code source, charte graphique) sont la propriété de maria ou de leurs ayants droit respectifs. Toute reproduction, totale ou partielle, sans autorisation préalable écrite est interdite.
            </p>
          </Section>

          <Section title="Liens externes">
            <p>
              Le site peut contenir des liens vers des sites tiers. maria n’est pas responsable du contenu de ces sites.
            </p>
          </Section>

          <Section title="Crédits">
            <p>
              Design et développement : maria. Typographies : Syne, Work Sans, DM Mono (Google Fonts).
            </p>
          </Section>
        </div>
      </div>
    </section>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink lg:text-[24px]">
        {title}
      </h2>
      {children}
    </div>
  )
}
