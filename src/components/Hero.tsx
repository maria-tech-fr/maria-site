import Link from 'next/link'
import CtaSecondaire from './CtaSecondaire'
import HaloField from './HaloField'
import Reveal from './Reveal'
import { type Hero as HeroData, type Lien, lienExterne, lienHref } from '../lib/accueil'

export default function Hero({ data }: { data: HeroData }) {
  return (
    <section className="relative flex min-h-[80vh] flex-col justify-between gap-y-12 overflow-hidden bg-paper px-6 pt-24 pb-12 sm:px-8 lg:min-h-[calc(100vh-67.09px)] lg:gap-y-22 lg:px-30.5 lg:pt-55 lg:pb-25">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.45, x: '77%', y: '26%', size: 738, duration: 25 },
          { color: '#3FC163', alpha: 0.33, x: '58%', y: '83%', size: 675, blur: 50, duration: 32 },
          { color: '#FFE482', alpha: 0.55, x: '6%', y: '83%', size: 553, duration: 28 },
        ]}
      />

      <Reveal className="relative">
        <div className="flex w-250 max-w-full flex-col gap-3.75">
          <p className="font-mono text-[12px] leading-[18.6px] tracking-[0.08em] text-success">
            {data.surTitre}
          </p>

          <h1 className="font-display text-[40px] font-semibold leading-[44px] tracking-[-0.0507em] text-ink lg:text-[80px] lg:leading-[112.52px]">
            <span className="block">{data.titreLigne1}</span>
            {data.titreLigne2?.trim() && (
              <span className="block text-ink-soft lg:mt-[-13.48px] lg:leading-20">
                {data.titreLigne2}
              </span>
            )}
          </h1>
        </div>
      </Reveal>

      <Reveal className="relative" delay={180}>
        <div className="flex w-250 max-w-full flex-col gap-5 lg:gap-7.5">
          <p className="max-w-full whitespace-pre-line text-[16px] leading-6 text-ink-soft lg:max-w-192.75 lg:text-[20px] lg:leading-7.5">
            {data.sousTitre}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:gap-x-10 lg:gap-y-4">
            <CtaPrincipal lien={data.ctaPrincipal} />
            {data.ctaSecondaire && <CtaSecondaire lien={data.ctaSecondaire} />}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function CtaPrincipal({ lien }: { lien: Lien }) {
  const href = lienHref(lien)
  const externe = lienExterne(lien)

  const content = (
    <>
      {lien.libelle}
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
        <path
          d="M1 6h13M9 1l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  )

  const className =
    'inline-flex h-[43.69px] items-center justify-center gap-2 rounded-[5px] bg-accent px-[18px] text-[14px] font-medium leading-[21.7px] text-ink transition-colors duration-500 ease-in-out hover:bg-accent-soft'

  if (externe) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  )
}

