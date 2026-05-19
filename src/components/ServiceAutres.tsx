import Link from 'next/link'
import Reveal from './Reveal'
import type { AutreServiceItem, ServiceAutres as ServiceAutresData } from '../lib/pageService'

export default function ServiceAutres({ data }: { data: ServiceAutresData }) {
  return (
    <section className="bg-[#FFFBEE] px-6 py-16 lg:px-30.5 lg:py-22.5">
      <div className="flex flex-col gap-16">
        <Reveal>
          <div className="flex max-w-220 flex-col gap-6">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {data.surTitre}
            </p>
            <h2 className="font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-ink lg:text-[60px] lg:leading-[62px]">
              {data.titre}
            </h2>
          </div>
        </Reveal>

        {data.services && data.services.length > 0 && (
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
              {data.services.map((service, i) => (
                <Reveal key={i} delay={120 + i * 80}>
                  <AutreServiceCard service={service} />
                </Reveal>
              ))}
            </div>
            {/* Lien discret vers la page pilier — sous les cards, volontairement
                en retrait pour ne pas concurrencer visuellement. */}
            <Reveal delay={120 + data.services.length * 80}>
              <Link
                href="/services"
                className="self-start border-b border-success pb-0.5 font-medium text-[14.5px] leading-5 text-ink transition-colors duration-300 ease-out hover:border-success/60 hover:text-success"
              >
                Voir tous nos services →
              </Link>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  )
}

function AutreServiceCard({ service }: { service: AutreServiceItem }) {
  const lienHref = service.lienHref || '#'
  const lienLibelle = service.lienLibelle || 'En savoir plus →'
  return (
    <article className="group flex h-full flex-col gap-4 rounded-[5px] border border-paper-edge bg-paper px-11 py-12">
      <p className="font-mono text-[11px] leading-4 uppercase tracking-[0.08em] text-ink-soft">
        {service.eyebrow}
      </p>
      <h3 className="whitespace-pre-line font-display text-[24px] font-semibold leading-7.5 tracking-[-0.02em] text-ink lg:text-[26px] lg:leading-[31.2px]">
        {service.titre}
      </h3>
      <p className="whitespace-pre-line pb-2 text-[15.5px] leading-6 text-ink-soft">
        {service.description}
      </p>
      <a
        href={lienHref}
        className="self-start border-b border-accent pb-0.5 font-medium text-[14.5px] leading-5 text-ink transition-colors duration-300 ease-out hover:border-accent/60 hover:text-accent"
      >
        {lienLibelle}
      </a>
    </article>
  )
}
