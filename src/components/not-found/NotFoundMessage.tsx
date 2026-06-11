import HaloField from '../HaloField'
import Reveal from '../Reveal'

/*
  Bloc 1 du /404 : message d'erreur sombre, plein écran.
  Pas de surlignage jaune sur le H1 (décision design étendue à toutes les
  pages). Le cursor-blink final est l'unique signature de la page.
*/
export default function NotFoundMessage() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-ink px-6 pb-25 pt-35 lg:px-30.5 lg:pb-25 lg:pt-35">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.38, x: '50%', y: '50%', size: 820, blur: 60, duration: 36 },
          { color: '#3FC163', alpha: 0.28, x: '60%', y: '55%', size: 700, blur: 60, duration: 42 },
          { color: '#FEC23C', alpha: 0.32, x: '8%', y: '12%', size: 560, blur: 50, duration: 40 },
          { color: '#3FC163', alpha: 0.26, x: '92%', y: '88%', size: 540, blur: 50, duration: 46 },
        ]}
      />

      <div className="relative mx-auto flex w-full max-w-[1000px] flex-col items-center text-center">
        <Reveal>
          <p className="font-mono text-[13px] leading-[19.2px] tracking-[0.10em] text-success-soft">
            // erreur 404
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-9 max-w-[18ch] font-display text-[48px] font-semibold leading-[1.02] tracking-[-0.035em] text-balance text-paper lg:text-[96px]">
            Cette page est introuvable, mais tout le reste est là.
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-9 max-w-[58ch] text-[17px] leading-[1.55] text-[#CFCFCF] lg:text-[19px]">
            Un lien cassé, une faute de frappe, une page qui a déménagé…
            Ça arrive. Voici comment retrouver votre chemin.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
