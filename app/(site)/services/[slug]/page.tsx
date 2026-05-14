import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceConstat from '../../../../src/components/ServiceConstat'
import ServiceHero from '../../../../src/components/ServiceHero'
import ServiceLivrable from '../../../../src/components/ServiceLivrable'
import ServiceMethode from '../../../../src/components/ServiceMethode'
import ServicePourQui from '../../../../src/components/ServicePourQui'
import { getPageService, getPageServiceSlugs } from '../../../../src/lib/pageService'

export async function generateStaticParams() {
  const slugs = await getPageServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageService(slug)
  if (!page) return { title: 'Service' }
  return {
    title: page.titre,
    description: page.hero?.description ?? undefined,
  }
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params
  const page = await getPageService(slug)

  if (!page) notFound()

  return (
    <>
      {page.hero && <ServiceHero data={page.hero} />}
      {page.pourQui && <ServicePourQui data={page.pourQui} />}
      {page.constat && <ServiceConstat data={page.constat} />}
      {page.livrable && <ServiceLivrable data={page.livrable} />}
      {page.methode && <ServiceMethode data={page.methode} />}
    </>
  )
}
