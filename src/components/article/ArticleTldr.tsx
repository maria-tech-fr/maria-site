/*
  Bloc « L'essentiel » (TL;DR) — affiché juste après le chapô.
  Le bloc le plus extrait par les moteurs génératifs (ChatGPT, Perplexity,
  AI Overviews). Rendu en <ul> sémantique réel, pas en image ni en JS différé,
  pour rester crawlable hors render JS.
*/

type Props = {
  items: string[]
}

export default function ArticleTldr({ items }: Props) {
  if (!items || items.length === 0) return null
  return (
    <aside
      aria-labelledby="article-tldr-heading"
      className="mt-10 rounded-xl border border-success/30 bg-success-tint px-6 py-6 lg:px-7 lg:py-7"
    >
      <h2
        id="article-tldr-heading"
        className="font-mono text-[11px] uppercase leading-4 tracking-[0.08em] text-success"
      >
        // l’essentiel
      </h2>
      <ul className="mt-3 flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-[15px] leading-6 text-ink lg:text-[16px] lg:leading-[26px]">
            <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
