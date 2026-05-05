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
}

// Keyframes inlinés au plus près du document. En complément de globals.css :
// si la chaîne CSS bundlée échoue (cache CDN, optimisation prod), ces règles
// restent disponibles dans le HTML servi.
const HALO_KEYFRAMES = `
@keyframes halo-drift-1{0%{transform:translate3d(0,0,0) scale(1)}18%{transform:translate3d(15%,-12%,0) scale(1.18)}35%{transform:translate3d(18%,-5%,0) scale(1.12)}55%{transform:translate3d(-8%,12%,0) scale(1.20)}72%{transform:translate3d(-15%,15%,0) scale(1.22)}88%{transform:translate3d(-10%,5%,0) scale(1.10)}100%{transform:translate3d(0,0,0) scale(1)}}
@keyframes halo-drift-2{0%{transform:translate3d(0,0,0) scale(1)}20%{transform:translate3d(-14%,13%,0) scale(1.16)}42%{transform:translate3d(12%,8%,0) scale(1.22)}60%{transform:translate3d(15%,-10%,0) scale(1.14)}80%{transform:translate3d(-8%,-13%,0) scale(1.18)}100%{transform:translate3d(0,0,0) scale(1)}}
@keyframes halo-drift-3{0%{transform:translate3d(0,0,0) scale(1)}16%{transform:translate3d(13%,9%,0) scale(1.13)}33%{transform:translate3d(-15%,7%,0) scale(1.22)}50%{transform:translate3d(-11%,16%,0) scale(1.18)}68%{transform:translate3d(9%,-11%,0) scale(1.20)}85%{transform:translate3d(-5%,13%,0) scale(1.10)}100%{transform:translate3d(0,0,0) scale(1)}}
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
