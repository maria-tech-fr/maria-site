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
@keyframes halo-drift-1{0%{transform:translate3d(0,0,0) scale(1)}7%{transform:translate3d(2.3%,-1.7%,0) scale(1.03)}18%{transform:translate3d(4.1%,-3.2%,0) scale(1.06)}31%{transform:translate3d(3.8%,-1.8%,0) scale(1.04)}43%{transform:translate3d(1.2%,0.5%,0) scale(1.02)}56%{transform:translate3d(-1.7%,2.4%,0) scale(1.05)}68%{transform:translate3d(-3.5%,3.1%,0) scale(1.07)}79%{transform:translate3d(-2.8%,1.6%,0) scale(1.04)}91%{transform:translate3d(-1.1%,0.3%,0) scale(1.02)}100%{transform:translate3d(0,0,0) scale(1)}}
@keyframes halo-drift-2{0%{transform:translate3d(0,0,0) scale(1)}9%{transform:translate3d(-1.8%,2.1%,0) scale(1.04)}21%{transform:translate3d(-3.6%,4.2%,0) scale(1.06)}35%{transform:translate3d(-2.1%,3.7%,0) scale(1.05)}47%{transform:translate3d(0.8%,1.5%,0) scale(1.03)}60%{transform:translate3d(3.4%,-0.6%,0) scale(1.06)}73%{transform:translate3d(4.5%,-2.7%,0) scale(1.07)}85%{transform:translate3d(2.7%,-2.2%,0) scale(1.04)}93%{transform:translate3d(0.9%,-0.8%,0) scale(1.02)}100%{transform:translate3d(0,0,0) scale(1)}}
@keyframes halo-drift-3{0%{transform:translate3d(0,0,0) scale(1)}6%{transform:translate3d(2.7%,1.4%,0) scale(1.03)}19%{transform:translate3d(3.9%,3.6%,0) scale(1.05)}33%{transform:translate3d(2.1%,4.8%,0) scale(1.07)}46%{transform:translate3d(-0.5%,4.2%,0) scale(1.04)}58%{transform:translate3d(-2.8%,2.7%,0) scale(1.06)}71%{transform:translate3d(-4.1%,0.5%,0) scale(1.05)}82%{transform:translate3d(-3.0%,-1.6%,0) scale(1.03)}92%{transform:translate3d(-1.4%,-0.9%,0) scale(1.02)}100%{transform:translate3d(0,0,0) scale(1)}}
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
