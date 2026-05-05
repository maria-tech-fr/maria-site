import { defineQuery } from 'next-sanity'

const lienProjection = `{
  libelle,
  type,
  cheminInterne,
  urlExterne
}`

export const parametresGlobauxQuery = defineQuery(`
  *[_id == "parametresGlobaux"][0]{
    baseline,
    navigation[]{ libelle, href },
    contact{ email, telephone, calendlyUrl },
    reseauxSociaux[]{ plateforme, url },
    footer{
      mentionLegales,
      liensLegaux[]{ libelle, href }
    }
  }
`)

export const accueilQuery = defineQuery(`
  *[_id == "accueil"][0]{
    hero{
      surTitre,
      titreLigne1,
      titreLigne2,
      sousTitre,
      ctaPrincipal${lienProjection},
      ctaSecondaire${lienProjection}
    },
    reassurance[]{
      icone,
      libelle
    },
    constat{
      surTitre,
      titre,
      paragraphes[]{ texte, emphase },
      citation
    },
    services{
      surTitre,
      titre,
      description,
      cards[]{
        icone,
        titre,
        description,
        lien${lienProjection}
      }
    },
    methode{
      surTitre,
      titre,
      description,
      etapes[]{ numero, categorie, titre, description },
      lien${lienProjection}
    },
    projetVedette{
      surTitre,
      titre,
      metriques[]{ valeur, libelle, couleur },
      lien${lienProjection},
      surTitreClients,
      clients
    },
    pourquoiMaria{
      surTitre,
      titre,
      cardMachine{ surTitre, titre, items },
      cardHumain{ surTitre, titre, items },
      conclusion
    },
    experts{
      surTitre,
      titre,
      description,
      membres[]{ nom, role, badge },
      lien${lienProjection}
    }
  }
`)

export const agenceQuery = defineQuery(`
  *[_id == "agence"][0]{
    hero{ surTitre, titre, description },
    manifeste{
      surTitre,
      titre,
      paragraphes[]{ texte, emphase }
    },
    valeurs{
      surTitre,
      titre,
      principes[]{ icone, nom, description }
    },
    nonNegociables{
      surTitre,
      titre,
      sousTitre,
      points[]{ titre, description }
    },
    processus{
      surTitre,
      titre,
      sousTitre,
      etapes[]{ numero, titre, description }
    },
    technos{
      surTitre,
      titre,
      sousTitre,
      categories[]{ surTitre, titre, technos }
    },
    engagements{
      surTitre,
      titre,
      points
    },
    faq{
      surTitre,
      titre,
      questions[]{ question, reponse }
    }
  }
`)
