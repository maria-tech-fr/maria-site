import Link from 'next/link'

export default function ArticleNotFound() {
  return (
    <section className="flex flex-1 items-center justify-center bg-paper px-6 py-40 lg:px-30.5">
      <div className="flex max-w-md flex-col items-center gap-5 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-success">
          // 404
        </p>
        <h1 className="font-display text-[28px] font-semibold leading-9 tracking-[-0.025em] text-ink lg:text-[36px] lg:leading-10">
          Article introuvable.
        </h1>
        <p className="text-[15px] leading-6 text-ink-soft">
          Soit il a été déplacé, soit il n’a jamais existé. Revenons au journal.
        </p>
        <Link
          href="/blog"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 font-medium text-[14px] leading-5 text-ink transition-colors duration-500 ease-in-out hover:bg-accent-soft"
        >
          Voir tous les articles
        </Link>
      </div>
    </section>
  )
}
