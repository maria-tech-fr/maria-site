import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Faq from '../../../../src/components/Faq'
import FaqJsonLd from '../../../../src/components/FaqJsonLd'
import JsonLd from '../../../../src/components/JsonLd'
import { buildServiceSchema } from '../../../../src/lib/schema'
import ServiceAutres from '../../../../src/components/ServiceAutres'
import ServiceCitation from '../../../../src/components/ServiceCitation'
import ServiceConstat from '../../../../src/components/ServiceConstat'
import ServiceGaranties from '../../../../src/components/ServiceGaranties'
import ServiceHero from '../../../../src/components/ServiceHero'
import ServiceLivrable from '../../../../src/components/ServiceLivrable'
import ServiceLivrableRapport from '../../../../src/components/ServiceLivrableRapport'
import ServiceMethode from '../../../../src/components/ServiceMethode'
import ServicePourQui from '../../../../src/components/ServicePourQui'
import ServiceProjetPhare from '../../../../src/components/ServiceProjetPhare'
import ServiceRepartition from '../../../../src/components/ServiceRepartition'
import { getPageService, getPageServiceSlugs } from '../../../../src/lib/pageService'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

export async function generateStaticParams() {
  const slugs = await getPageServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageService(slug)
  if (!page) return { title: 'Service' }
  const canonical = `${SITE_URL}/services/${slug}`
  const title = page.titre
  const description = page.hero?.description ?? undefined
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, type: 'website', url: canonical },
  }
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params
  const page = await getPageService(slug)

  if (!page) notFound()

  // Service JSON-LD pour Google. Le BreadcrumbList est rendu par le
  // composant <Breadcrumb> à l'intérieur du Hero (source unique).
  return (
    <>
      <JsonLd
        data={buildServiceSchema({
          name: page.titre,
          url: `/services/${slug}`,
          description: page.hero?.description ?? null,
        })}
      />
      {page.hero && (
        <ServiceHero
          data={page.hero}
          breadcrumb={[
            { label: 'Accueil', href: '/' },
            { label: 'Services', href: '/services' },
            { label: page.titre },
          ]}
        />
      )}
      {page.pourQui && <ServicePourQui data={page.pourQui} />}
      {page.constat && <ServiceConstat data={page.constat} />}
      {page.livrable && <ServiceLivrable data={page.livrable} />}
      {page.methode && <ServiceMethode data={page.methode} />}
      {page.garanties && <ServiceGaranties data={page.garanties} />}
      {page.repartition && <ServiceRepartition data={page.repartition} />}
      {page.citation && <ServiceCitation data={page.citation} />}
      {page.livrableRapport && <ServiceLivrableRapport data={page.livrableRapport} />}
      {page.projetPhare && <ServiceProjetPhare data={page.projetPhare} />}
      {page.faq && (
        <>
          <Faq data={page.faq} />
          <FaqJsonLd questions={page.faq.questions} />
        </>
      )}
      {page.autresServices && <ServiceAutres data={page.autresServices} />}
    </>
  )
}
