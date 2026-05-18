import Link from 'next/link'
import HaloField from '../HaloField'
import Reveal from '../Reveal'
import ArrowRight from '../icons/ArrowRight'

type ExitCardData = {
  href: string
  title: string
  description: string
  ctaLabel: string
  icon: 'home' | 'gear' | 'target' | 'bubble'
  tone: 'accent' | 'success'
}

const CARDS: ExitCardData[] = [
  {
    href: '/',
    title: 'Retour à l’accueil',
    description: 'Repartir du début, là où tout est clair.',
    ctaLabel: 'Aller à l’accueil',
    icon: 'home',
    tone: 'accent',
  },
  {
    href: '/services',
    title: 'Nos services',
    description: 'Audit, outils internes, agents IA, formation.',
    ctaLabel: 'Voir les services',
    icon: 'gear',
    tone: 'success',
  },
  {
    href: '/besoins',
    title: 'Vos besoins',
    description: 'Trouvez la situation qui ressemble à la vôtre.',
    ctaLabel: 'Voir les besoins',
    icon: 'target',
    tone: 'accent',
  },
  {
    href: '/contact',
    title: 'Nous contacter',
    description: 'Une question précise ? On répond sous 24 h.',
    ctaLabel: 'Écrire à maria',
    icon: 'bubble',
    tone: 'success',
  },
]

export default function NotFoundExits() {
  return (
    <section className="relative overflow-hidden bg-paper px-6 pb-30 pt-35 lg:px-30.5">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.30, x: '92%', y: '12%', size: 520, blur: 50, duration: 38 },
        ]}
      />

      <div className="relative mx-auto flex w-full max-w-[1100px] flex-col items-center">
        <Reveal>
          <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
            // où aller
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 max-w-[22ch] text-center font-display text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] text-ink lg:text-[44px]">
            Reprenons depuis un point connu.
          </h2>
        </Reveal>

        <ul className="mt-14 grid w-full max-w-[920px] grid-cols-1 gap-4.5 lg:grid-cols-2">
          {CARDS.map((card, i) => (
            <Reveal key={card.href} delay={160 + i * 70}>
              <li className="h-full">
                <ExitCard data={card} />
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={500}>
          <p className="mt-10 text-center text-[14.5px] leading-6 text-[#666]">
            Vous cherchiez un article ?{' '}
            <Link
              href="/blog"
              className="font-medium text-success underline decoration-1 underline-offset-[3px] transition-[text-decoration-thickness] duration-300 ease-out hover:decoration-2"
            >
              Voir le journal →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function ExitCard({ data }: { data: ExitCardData }) {
  const iconBg = data.tone === 'accent' ? 'bg-accent-tint' : 'bg-success-tint'
  const iconBorder = data.tone === 'accent' ? 'border-[#F1E4BE]' : 'border-[#C9EAD3]'
  return (
    <Link
      href={data.href}
      className="group flex h-full flex-col gap-3.5 rounded-[16px] border border-paper-edge bg-paper p-8 pb-7 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-[3px] hover:border-ink hover:shadow-[0_18px_36px_-22px_rgba(33,33,33,0.25)]"
    >
      <span
        aria-hidden
        className={`flex h-[42px] w-[42px] items-center justify-center rounded-[11px] border ${iconBg} ${iconBorder}`}
      >
        <ExitIcon name={data.icon} />
      </span>
      <h3 className="font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
        {data.title}
      </h3>
      <p className="text-[15px] leading-[1.55] text-ink-soft">{data.description}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-1.5 text-[14px] font-medium text-ink transition-colors duration-300 ease-out group-hover:text-success">
        {data.ctaLabel}
        <ArrowRight
          size="sm"
          className="transition-transform duration-300 ease-out group-hover:translate-x-[3px]"
        />
      </span>
    </Link>
  )
}

function ExitIcon({ name }: { name: ExitCardData['icon'] }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: '#212121',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  if (name === 'home') {
    return (
      <svg {...common}>
        <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9z" />
      </svg>
    )
  }
  if (name === 'gear') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
      </svg>
    )
  }
  if (name === 'target') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.4" fill="#212121" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
    </svg>
  )
}
