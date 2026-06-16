import HaloField from '../HaloField'
import Reveal from '../Reveal'

type Principe = { numero: string; titre: string; description: string }
type Props = {
  surTitre: string
  titre: string
  sousTitre?: string | null
  principes: Principe[]
}

export default function FormationPedagogie({ surTitre, titre, sousTitre, principes }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-30">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.22, x: '-8%', y: '20%', size: 660, blur: 55, duration: 38 },
        ]}
      />

      <div className="relative flex flex-col gap-14">
        <Reveal>
          <div className="flex flex-col gap-5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">{surTitre}</p>
            <h2 className="font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-paper lg:text-[52px]">
              {titre}
            </h2>
            {sousTitre && (
              <p className="max-w-[62ch] text-[17px] leading-[1.6] text-[#BFBFBF] lg:text-[18px]">{sousTitre}</p>
            )}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principes.map((p, i) => (
            <Reveal key={p.numero} delay={120 + i * 60} className="h-full">
              <article className="flex h-full flex-col gap-3 rounded-[5px] border border-white/10 bg-white/[0.04] p-9 lg:p-10">
                <span className="mb-5 font-display text-[56px] font-bold leading-none tracking-[-0.04em] text-accent">
                  {p.numero}
                </span>
                <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.018em] text-paper">
                  {p.titre}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-[#BFBFBF]">{p.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
