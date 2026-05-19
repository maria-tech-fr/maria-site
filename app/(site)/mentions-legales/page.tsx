import type { Metadata } from 'next'
import LegalPageLayout, {
  LegalSection,
} from '../../../src/components/legal/LegalPageLayout'
import { legalInfo } from '../../../src/content/legal/info'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

// TODO: passer index:true après validation juridique du contenu.
export const metadata: Metadata = {
  title: 'Mentions légales | maria',
  description:
    'Mentions légales du site maria : éditeur, directeur de la publication, hébergeur, propriété intellectuelle, droit applicable.',
  alternates: { canonical: `${SITE_URL}/mentions-legales` },
  robots: { index: false, follow: true },
}

export default function MentionsLegalesPage() {
  return (
    <LegalPageLayout
      surTitre="// mentions légales"
      titre="Mentions légales"
      derniereMaj={legalInfo.derniereMaj}
    >
      <LegalSection title="Éditeur du site">
        <p>Le site maria est édité par :</p>
        <p>
          <strong className="text-ink">{legalInfo.denomination}</strong> — {legalInfo.formeJuridique}
          <br />
          Capital social : {legalInfo.capital} €
          <br />
          Siège social : {legalInfo.siegeSocial}
          <br />
          RCS {legalInfo.rcsVille} n° {legalInfo.rcsNumero}
          <br />
          SIRET : {legalInfo.siret}
          <br />
          N° TVA intracommunautaire : {legalInfo.tva}
          <br />
          E-mail :{' '}
          <a
            href={`mailto:${legalInfo.emailLegal}`}
            className="border-b border-success text-ink hover:text-success"
          >
            {legalInfo.emailLegal}
          </a>
          <br />
          Téléphone : {legalInfo.telephone}
        </p>
      </LegalSection>

      <LegalSection title="Directeur de la publication">
        <p>{legalInfo.directeurPublication}</p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>
          Le Site est hébergé par : <strong className="text-ink">{legalInfo.hebergeur}</strong>
          <br />
          {legalInfo.hebergeurAdresse}
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          L’ensemble des éléments du Site (textes, graphismes, logo, identité
          visuelle, illustrations, structure, mascotte) est la propriété
          exclusive de {legalInfo.denomination}, sauf mention contraire, et est
          protégé par le droit de la propriété intellectuelle. Toute reproduction
          non autorisée est interdite.
        </p>
        <p>
          La marque « maria » et son logo sont {legalInfo.proprieteMarque}.
        </p>
      </LegalSection>

      <LegalSection title="Liens hypertextes">
        <p>
          Le Site peut contenir des liens vers des sites tiers. maria n’exerce
          aucun contrôle sur ces sites et décline toute responsabilité quant à
          leur contenu.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          maria s’efforce d’assurer l’exactitude des informations diffusées
          mais ne peut garantir leur exhaustivité ou l’absence d’erreur. Les
          informations sont fournies à titre indicatif et susceptibles
          d’évoluer.
        </p>
      </LegalSection>

      <LegalSection title="Droit applicable">
        <p>
          Les présentes mentions sont régies par le droit français. Tout
          litige relève des tribunaux compétents {legalInfo.ressortTribunaux}.
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}
