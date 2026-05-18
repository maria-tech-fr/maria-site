'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import HaloField from './HaloField'
import Logo from './Logo'
import ArrowRight from './icons/ArrowRight'

const ROUTES_WITHOUT_CTA = ['/contact/merci']

type FooterLink = { label: string; href: string }

const servicesLinks: FooterLink[] = [
  { label: 'Sites web', href: '/services/sites-web' },
  { label: 'Outils IA', href: '/services/outils-ia' },
  { label: 'Communication', href: '/services/communication' },
  { label: 'Formation', href: '/services/formation' },
]

const mariaLinks: FooterLink[] = [
  { label: 'Projets', href: '/projets' },
  { label: 'L’agence', href: '/agence' },
  { label: 'Journal', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const pathname = usePathname()
  const showCta = !ROUTES_WITHOUT_CTA.includes(pathname)
  return (
    <footer className="font-sans">
      {showCta && (
        <section className="relative overflow-hidden bg-ink px-6 py-14 lg:px-30.5 lg:py-17.5">
          <HaloField
            halos={[
              { color: '#FEC23C', alpha: 0.3, x: '18%', y: '30%', size: 450, duration: 24 },
              { color: '#3FC163', alpha: 0.22, x: '82%', y: '75%', size: 450, duration: 30 },
            ]}
          />

          <div className="relative flex flex-col items-center gap-10 lg:gap-12.5 lg:py-7.5">
            <div className="flex flex-col items-center gap-2.5">
              <div className="flex items-center justify-center gap-4 lg:gap-7.5">
                <h2 className="text-center font-display text-[36px] font-semibold leading-10 tracking-[-0.042em] text-paper lg:text-[60px] lg:leading-15.5">
                  Un projet IA en tête
                </h2>
                <svg
                  aria-hidden
                  className="h-10 w-0.75 shrink-0 lg:h-[65.52px] lg:w-[5.03px]"
                  viewBox="0 0 5.03 65.52"
                  preserveAspectRatio="none"
                >
                  <rect width="5.03" height="65.52" fill="#FEC23C">
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      dur="1s"
                      calcMode="discrete"
                      repeatCount="indefinite"
                    />
                  </rect>
                </svg>
              </div>
              <p className="max-w-166.5 text-center text-[15px] leading-6 text-[#CFCFCF] lg:text-[18px] lg:leading-[27.9px]">
                Discutons-en. 30 minutes pour cadrer votre besoin, sans engagement.
              </p>
            </div>

            <div className="flex w-full flex-col items-center gap-4.75">
              <Link
                href="/contact"
                className="inline-flex h-13 w-full max-w-75 items-center justify-center gap-2 rounded-[5px] bg-accent text-[15px] font-medium leading-[24.8px] text-ink transition-colors duration-500 ease-in-out hover:bg-accent-soft lg:h-[56.8px] lg:w-[245.36px] lg:text-[16px]"
              >
                Réserver un échange
                <ArrowRight size="md" />
              </Link>
              <p className="font-mono text-[11px] leading-4.25 tracking-[0.08em] text-[#AAAAAA]">
                RÉPONSE SOUS 24 H · DEVIS GRATUIT · SANS ENGAGEMENT
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#0F0F0F] px-6 py-12 text-paper lg:px-30.5 lg:py-15">
        <div className="flex flex-col gap-10 border-b border-white/8 pb-7.5 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          <Link href="/" aria-label="maria — accueil" className="shrink-0">
            <Logo className="h-9 w-auto text-paper lg:h-10" />
          </Link>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-10">
            <FooterColumn heading="SERVICES" items={servicesLinks} />
            <FooterColumn heading="MARIA" items={mariaLinks} />
          </div>
        </div>

        <div className="pt-5 text-[12px] leading-[18.6px] text-[#666666]">
          © 2026 maria ·{' '}
          <Link
            href="/mentions-legales"
            className="text-[#9A9A9A] transition-colors duration-300 ease-out hover:text-paper"
          >
            Mentions légales
          </Link>{' '}
          ·{' '}
          <Link
            href="/confidentialite"
            className="text-[#9A9A9A] transition-colors duration-300 ease-out hover:text-paper"
          >
            Confidentialité
          </Link>{' '}
          ·{' '}
          <Link
            href="/charte-ia"
            className="text-[#9A9A9A] transition-colors duration-300 ease-out hover:text-paper"
          >
            Charte IA
          </Link>
        </div>
      </section>
    </footer>
  )
}

function FooterColumn({ heading, items }: { heading: string; items: FooterLink[] }) {
  return (
    <div className="w-full sm:w-43.5">
      <h3 className="font-mono text-[11px] leading-4.25 tracking-[0.08em] text-paper">
        {heading}
      </h3>
      <ul className="mt-4.5 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-[14px] leading-[21.7px] text-[#9A9A9A] transition-colors duration-300 ease-out hover:text-paper"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
