import type { Metadata } from 'next'
import Link from 'next/link'
import HaloField from '../../../../src/components/HaloField'
import Reveal from '../../../../src/components/Reveal'
import { getContactPage } from '../../../../src/lib/contact'

export const metadata: Metadata = {
  title: 'Message reçu — Merci',
  description: "Votre message est bien arrivé. On vous répond sous 24 h ouvrées.",
  robots: { index: false, follow: true },
  alternates: { canonical: '/contact/merci' },
}

export default async function ContactMerciPage() {
  const data = await getContactPage()
  const hero = data?.contactPage?.merciHero ?? null

  const surTitre = hero?.surTitre || '// message reçu'
  const titre = hero?.titre || 'Merci, votre message est arrivé.'
  const description =
    hero?.description ||
    "On vous répond sous 24 h ouvrées. En attendant, vous pouvez consulter notre journal — on y partage nos points de vue sur l'IA en entreprise."

  return (
    <section className="relative flex flex-1 items-center overflow-hidden bg-ink px-6 pb-22 pt-45.5 lg:px-30.5 lg:pb-30 lg:pt-45.5">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.32, x: '15%', y: '40%', size: 700, blur: 50, duration: 38 },
          { color: '#FEC23C', alpha: 0.24, x: '85%', y: '60%', size: 620, blur: 50, duration: 42 },
        ]}
      />

      <div className="relative mx-auto flex w-full max-w-[820px] flex-col gap-7 text-center">
        <Reveal>
          <p className="font-mono text-[12px] leading-[18.6px] tracking-[0.08em] text-success-soft">
            {surTitre}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-paper lg:text-[64px] lg:leading-[68px]">
            {titre}
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="mx-auto max-w-[640px] text-[16px] leading-7 text-[#CFCFCF] lg:text-[18px] lg:leading-[28px]">
            {description}
          </p>
        </Reveal>
        <Reveal delay={260}>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-[8px] bg-accent px-6 py-3.5 font-medium text-[15px] leading-5 text-ink transition-colors duration-500 ease-in-out hover:bg-accent-soft"
            >
              Lire le journal
              <ArrowRight />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-3.5 font-medium text-[15px] leading-5 text-paper underline underline-offset-4 transition-colors hover:text-success-soft"
            >
              Retour à l’accueil
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ArrowRight() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
      <path
        d="M1 6h13M9 1l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
