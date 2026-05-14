import Link from 'next/link'

type Crumb = { label: string; href?: string }

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="font-mono text-[11px] leading-4 tracking-[0.06em] text-ink-soft">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-ink' : ''}>
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden>›</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
