/*
  Bloc « Ce qu'il faut retenir » — synthèse finale, juste avant la FAQ.
  Doit pouvoir résumer l'article à elle seule. Les IA en extraient souvent
  les puces entières. Rendu en <ul> sémantique pour rester extractible
  côté crawler.
*/

type Props = {
  items: string[]
}

export default function ArticleKeyTakeaways({ items }: Props) {
  if (!items || items.length === 0) return null
  return (
    <section
      aria-labelledby="article-key-takeaways-heading"
      className="mt-16 rounded-[12px] border border-accent/35 bg-accent-tint px-6 py-7 lg:px-8 lg:py-8"
    >
      <p className="font-mono text-[11px] uppercase leading-4 tracking-[0.08em] text-success">
        // synthèse
      </p>
      <h2
        id="article-key-takeaways-heading"
        className="mt-2 font-display text-[24px] font-semibold leading-7 tracking-[-0.02em] text-ink lg:text-[28px] lg:leading-9"
      >
        Ce qu’il faut retenir
      </h2>
      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-[15px] leading-6 text-ink lg:text-[16px] lg:leading-[26px]"
          >
            <span
              aria-hidden
              className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-accent"
            />
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
