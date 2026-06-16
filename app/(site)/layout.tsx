import type { Metadata, Viewport } from 'next'
import { DM_Mono, Syne, Work_Sans } from 'next/font/google'
import '../globals.css'
import Nav from '../../src/components/Nav'
import Footer from '../../src/components/Footer'
import OrganizationJsonLd from '../../src/components/OrganizationJsonLd'
// Widget WhatsApp : import via un wrapper client qui le charge en
// `dynamic(..., { ssr: false })` après hydratation. Le bundle du widget
// (carte + pill + sessionStorage) est sorti du critical path.
import WhatsappWidgetLazy from '../../src/components/whatsapp/WhatsappWidgetLazy'
import ConsentBanner from '../../src/components/analytics/ConsentBanner'
import GtmLoader from '../../src/components/analytics/GtmLoader'
import { getContactPage } from '../../src/lib/contact'
import { getBesoinsMenu } from '../../src/lib/pageBesoin'
import { getServicesMenu } from '../../src/lib/pageService'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
  display: 'swap',
})

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
})

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'maria — agence IA',
    template: '%s · maria',
  },
  description:
    "Agence IA spécialisée dans les outils internes, l'amélioration de processus et les agents IA. Des experts humains qui contrôlent l'IA pour des projets maîtrisés et efficaces.",
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
  },
  openGraph: {
    siteName: 'maria',
    locale: 'fr_FR',
    type: 'website',
    // Image OG générique du site — 1200×630.
    // ASSET À FOURNIR : /public/og/default.jpg (cf. README ci-dessous).
    // Toutes les pages non-articles héritent automatiquement de cette
    // image. Les articles ont leur propre cascade (ogImage → coverImage
    // → fallback ici). `metadataBase` (défini plus haut) convertit le
    // chemin relatif en URL absolue.
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'maria — agence IA pour l’interne',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/default.jpg'],
  },
}

// Keyframes inlinés au plus près du document. En complément de globals.css :
// si la chaîne CSS bundlée échoue (cache CDN, optimisation prod), ces règles
// restent disponibles dans le HTML servi.
const HALO_KEYFRAMES = `
@keyframes halo-wander-1{0%{transform:translate3d(0,0,0) scale(1)}14%{transform:translate3d(calc(var(--wx) * 0.85),calc(var(--wy) * -0.65),0) scale(1.20)}28%{transform:translate3d(calc(var(--wx) * 0.45),calc(var(--wy) * -0.95),0) scale(1.14)}42%{transform:translate3d(calc(var(--wx) * -0.30),calc(var(--wy) * -0.50),0) scale(1.26)}56%{transform:translate3d(calc(var(--wx) * -0.85),calc(var(--wy) * 0.20),0) scale(1.18)}70%{transform:translate3d(calc(var(--wx) * -0.55),calc(var(--wy) * 0.75),0) scale(1.24)}84%{transform:translate3d(calc(var(--wx) * 0.10),calc(var(--wy) * 0.95),0) scale(1.16)}100%{transform:translate3d(0,0,0) scale(1)}}
@keyframes halo-wander-2{0%{transform:translate3d(0,0,0) scale(1)}16%{transform:translate3d(calc(var(--wx) * -0.70),calc(var(--wy) * -0.55),0) scale(1.18)}32%{transform:translate3d(calc(var(--wx) * -0.95),calc(var(--wy) * 0.40),0) scale(1.24)}48%{transform:translate3d(calc(var(--wx) * -0.20),calc(var(--wy) * 0.85),0) scale(1.16)}64%{transform:translate3d(calc(var(--wx) * 0.65),calc(var(--wy) * 0.50),0) scale(1.28)}80%{transform:translate3d(calc(var(--wx) * 0.90),calc(var(--wy) * -0.45),0) scale(1.22)}92%{transform:translate3d(calc(var(--wx) * 0.30),calc(var(--wy) * -0.85),0) scale(1.14)}100%{transform:translate3d(0,0,0) scale(1)}}
@keyframes halo-wander-3{0%{transform:translate3d(0,0,0) scale(1)}12%{transform:translate3d(calc(var(--wx) * 0.50),calc(var(--wy) * 0.70),0) scale(1.20)}26%{transform:translate3d(calc(var(--wx) * -0.65),calc(var(--wy) * 0.85),0) scale(1.16)}40%{transform:translate3d(calc(var(--wx) * -0.95),calc(var(--wy) * -0.20),0) scale(1.28)}55%{transform:translate3d(calc(var(--wx) * -0.30),calc(var(--wy) * -0.85),0) scale(1.18)}70%{transform:translate3d(calc(var(--wx) * 0.75),calc(var(--wy) * -0.65),0) scale(1.26)}85%{transform:translate3d(calc(var(--wx) * 0.95),calc(var(--wy) * 0.30),0) scale(1.14)}100%{transform:translate3d(0,0,0) scale(1)}}
@keyframes halo-wander-4{0%{transform:translate3d(0,0,0) scale(1)}18%{transform:translate3d(calc(var(--wx) * 0.40),calc(var(--wy) * -0.95),0) scale(1.18)}32%{transform:translate3d(calc(var(--wx) * 0.95),calc(var(--wy) * -0.30),0) scale(1.24)}48%{transform:translate3d(calc(var(--wx) * 0.50),calc(var(--wy) * 0.75),0) scale(1.20)}62%{transform:translate3d(calc(var(--wx) * -0.45),calc(var(--wy) * 0.95),0) scale(1.30)}76%{transform:translate3d(calc(var(--wx) * -0.95),calc(var(--wy) * 0.10),0) scale(1.16)}90%{transform:translate3d(calc(var(--wx) * -0.50),calc(var(--wy) * -0.75),0) scale(1.22)}100%{transform:translate3d(0,0,0) scale(1)}}
@keyframes halo-wander-5{0%{transform:translate3d(0,0,0) scale(1)}20%{transform:translate3d(calc(var(--wx) * 0.85),calc(var(--wy) * 0.50),0) scale(1.18)}36%{transform:translate3d(calc(var(--wx) * 0.20),calc(var(--wy) * 0.95),0) scale(1.26)}52%{transform:translate3d(calc(var(--wx) * -0.85),calc(var(--wy) * 0.55),0) scale(1.20)}68%{transform:translate3d(calc(var(--wx) * -0.95),calc(var(--wy) * -0.35),0) scale(1.16)}84%{transform:translate3d(calc(var(--wx) * 0.30),calc(var(--wy) * -0.85),0) scale(1.24)}100%{transform:translate3d(0,0,0) scale(1)}}
@keyframes marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}
@keyframes border-drift{0%{background-position:0 0,0% 50%}100%{background-position:0 0,200% 50%}}
`

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [services, besoins, contactData] = await Promise.all([
    getServicesMenu(),
    getBesoinsMenu(),
    getContactPage(),
  ])
  const calcomUrl = contactData?.contact?.calendlyUrl ?? null
  return (
    <html
      lang="fr"
      className={`${workSans.variable} ${syne.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {/* Google Consent Mode v2 — defaults `denied` posés AVANT tout autre
            script (GTM, GA, etc.). Axeptio met ensuite à jour les flags via
            `gtag('consent','update', …)` après la décision utilisateur,
            intégration native côté Axeptio. Inline pour garantir l'ordre
            d'exécution synchrone pendant le parsing du body. */}
        <script
          id="consent-mode-defaults"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'analytics_storage':'denied','ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','wait_for_update':500});`,
          }}
        />
        <OrganizationJsonLd />
        <style dangerouslySetInnerHTML={{ __html: HALO_KEYFRAMES }} />
        <div className="fixed inset-x-0 top-0 z-50 px-4 py-3 sm:px-6 lg:px-30.5 lg:py-6">
          <Nav services={services} besoins={besoins} />
        </div>
        <main className="flex-1">{children}</main>
        <Footer calcomUrl={calcomUrl} />
        <WhatsappWidgetLazy />
        {/* Consentement (Axeptio) + Google Tag Manager. ConsentBanner est
            no-op si `NEXT_PUBLIC_AXEPTIO_CLIENT_ID` est absente. GtmLoader
            n'injecte GTM qu'après la 1re décision dans Axeptio (accepter
            ou refuser) ; il est no-op si `NEXT_PUBLIC_GTM_ID` est absente.
            GA4 et autres tags marketing sont configurés dans GTM, pas
            directement côté site. */}
        <ConsentBanner />
        <GtmLoader gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      </body>
    </html>
  )
}
