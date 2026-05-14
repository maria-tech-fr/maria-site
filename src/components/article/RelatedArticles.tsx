import type { ArticleCard as ArticleCardData } from '../../lib/article'
import BlogArticleCard from '../BlogArticleCard'
import Reveal from '../Reveal'

export default function RelatedArticles({ articles }: { articles: ArticleCardData[] }) {
  if (!articles || articles.length === 0) return null
  return (
    <aside
      aria-label="Articles suggérés"
      className="bg-paper px-6 py-16 lg:px-30.5 lg:py-22.5"
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-10">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
            // à lire aussi
          </p>
          <h2 className="font-display text-[28px] font-semibold leading-9 tracking-[-0.025em] text-ink lg:text-[36px] lg:leading-10">
            Sur le même sujet
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <Reveal key={article.slug} delay={i * 80}>
              <BlogArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>
    </aside>
  )
}
