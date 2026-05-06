import type { Metadata } from 'next'
import { DM_Mono, Syne, Work_Sans } from 'next/font/google'
import '../globals.css'
import Nav from '../../src/components/Nav'
import Footer from '../../src/components/Footer'

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

export const metadata: Metadata = {
  title: {
    default: 'maria — agence IA',
    template: '%s · maria',
  },
  description:
    "Agence IA spécialisée dans les outils internes, l'amélioration de processus et les agents IA. Des experts humains qui contrôlent l'IA pour des projets maîtrisés et efficaces.",
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
}

// Keyframes inlinés au plus près du document. En complément de globals.css :
// si la chaîne CSS bundlée échoue (cache CDN, optimisation prod), ces règles
// restent disponibles dans le HTML servi.
const HALO_KEYFRAMES = `
@keyframes halo-drift-1{0%{transform:translate3d(0,0,0) scale(1)}14%{transform:translate3d(24%,-20%,0) scale(1.24)}28%{transform:translate3d(28%,-10%,0) scale(1.18)}44%{transform:translate3d(15%,12%,0) scale(1.28)}60%{transform:translate3d(-12%,20%,0) scale(1.22)}76%{transform:translate3d(-26%,24%,0) scale(1.30)}90%{transform:translate3d(-15%,8%,0) scale(1.15)}100%{transform:translate3d(0,0,0) scale(1)}}
@keyframes halo-drift-2{0%{transform:translate3d(0,0,0) scale(1)}18%{transform:translate3d(-22%,21%,0) scale(1.22)}35%{transform:translate3d(-8%,26%,0) scale(1.18)}50%{transform:translate3d(20%,15%,0) scale(1.28)}66%{transform:translate3d(26%,-18%,0) scale(1.20)}82%{transform:translate3d(-14%,-22%,0) scale(1.26)}100%{transform:translate3d(0,0,0) scale(1)}}
@keyframes halo-drift-3{0%{transform:translate3d(0,0,0) scale(1)}12%{transform:translate3d(20%,14%,0) scale(1.18)}26%{transform:translate3d(-12%,22%,0) scale(1.30)}42%{transform:translate3d(-26%,12%,0) scale(1.28)}58%{transform:translate3d(-18%,-16%,0) scale(1.22)}74%{transform:translate3d(15%,-22%,0) scale(1.26)}90%{transform:translate3d(8%,18%,0) scale(1.16)}100%{transform:translate3d(0,0,0) scale(1)}}
@keyframes halo-drift-4{0%{transform:translate3d(0,0,0) scale(1)}20%{transform:translate3d(-16%,-22%,0) scale(1.24)}38%{transform:translate3d(12%,-26%,0) scale(1.20)}55%{transform:translate3d(28%,-8%,0) scale(1.30)}70%{transform:translate3d(22%,16%,0) scale(1.26)}86%{transform:translate3d(-10%,22%,0) scale(1.16)}100%{transform:translate3d(0,0,0) scale(1)}}
@keyframes halo-drift-5{0%{transform:translate3d(0,0,0) scale(1)}16%{transform:translate3d(-18%,18%,0) scale(1.20)}32%{transform:translate3d(22%,22%,0) scale(1.24)}48%{transform:translate3d(28%,-14%,0) scale(1.30)}62%{transform:translate3d(8%,-26%,0) scale(1.18)}78%{transform:translate3d(-22%,-10%,0) scale(1.26)}92%{transform:translate3d(-14%,12%,0) scale(1.14)}100%{transform:translate3d(0,0,0) scale(1)}}
@keyframes marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}
@keyframes border-drift{0%{background-position:0 0,0% 50%}100%{background-position:0 0,200% 50%}}
`

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${workSans.variable} ${syne.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <style dangerouslySetInnerHTML={{ __html: HALO_KEYFRAMES }} />
        <div className="fixed inset-x-0 top-0 z-50 px-4 py-3 sm:px-6 lg:px-30.5 lg:py-6">
          <Nav />
        </div>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
