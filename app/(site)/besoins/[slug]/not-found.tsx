import Link from 'next/link'

export default function BesoinNotFound() {
  return (
    <section className="flex flex-1 items-center justify-center bg-paper px-6 py-32 lg:py-40">
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-6 text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-success">
          // page introuvable
        </p>
        <h1 className="font-display text-[36px] font-semibold leading-[1.1] tracking-[-0.025em] text-ink lg:text-[52px]">
          Ce besoin n’existe pas (ou pas encore).
        </h1>
        <p className="text-[16px] leading-[1.6] text-ink-soft lg:text-[18px]">
          Le besoin que vous cherchez n’est pas dans notre catalogue. Le sous-menu « Besoins » de la navigation liste tous les cas que nous couvrons — ou écrivez-nous pour qu’on en discute.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-[5px] bg-accent px-6 py-3 font-medium text-[15px] text-ink transition-colors duration-500 ease-in-out hover:bg-accent-soft"
          >
            Nous écrire
          </Link>
          <Link
            href="/"
            className="border-b border-success pb-0.5 font-medium text-[15px] text-success transition-colors duration-300 ease-out hover:text-success-soft"
          >
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </section>
  )
}
