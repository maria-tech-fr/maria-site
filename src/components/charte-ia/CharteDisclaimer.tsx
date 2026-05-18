import Reveal from '../Reveal'

type Props = {
  surTitre: string
  titre: string
  paragraphes: string[]
}

export default function CharteDisclaimer({ surTitre, titre, paragraphes }: Props) {
  return (
    <section className="bg-paper-soft px-6 py-16 lg:px-30.5 lg:py-24">
      <article className="mx-auto flex w-full max-w-[760px] flex-col gap-6">
        <Reveal>
          <header className="flex flex-col gap-4">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="font-display text-[26px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink lg:text-[32px]">
              {titre}
            </h2>
          </header>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-col gap-4 border-l-2 border-paper-edge pl-5 lg:pl-7">
            {paragraphes.map((p, i) => (
              <p key={i} className="text-[16px] leading-[1.7] text-ink-soft lg:text-[16.5px]">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </article>
    </section>
  )
}
