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

export const projetsQuery = defineQuery(`
  *[_id == "projets"][0]{
    hero{ surTitre, titre, description },
    etudeDeCas{
      surTitre,
      titrePrefixe,
      titre,
      identite{ client, secteur, type, outils, statut },
      contexte{ surTitre, texte, emphase },
      defi{ surTitre, texte, emphase },
      approche{
        titre,
        etapes[]{ numeroLibelle, titre, description }
      },
      fonctionnalites{
        titre,
        items[]{ titre, description }
      },
      apercuOutil{
        surTitre,
        titre,
        captures[]{
          legende,
          image{ asset->{ _id, url, metadata { dimensions } } }
        }
      },
      citation{ texte, auteur, role },
      technos
    },
    savoirFaire{
      surTitre,
      titre,
      description,
      cards[]{
        titre,
        description,
        picto{ asset->{ _id, url, mimeType } }
      }
    },
    projetsPasses{
      surTitre,
      titre,
      description,
      projets[]{ categorie, titre, description }
    },
    projetsAVenir{
      surTitre,
      titre,
      description,
      projets[]{
        categorie,
        titre,
        mention,
        picto{ asset->{ _id, url, mimeType } }
      }
    }
  }
`)

export const pageServiceSlugsQuery = defineQuery(`
  *[_type == "pageService" && defined(slug.current)][]{ "slug": slug.current }
`)

export const pageServiceQuery = defineQuery(`
  *[_type == "pageService" && slug.current == $slug][0]{
    titre,
    "slug": slug.current,
    hero{
      surTitre,
      titre,
      description,
      ctaLibelle,
      ctaHref
    },
    pourQui{
      surTitre,
      titre,
      cards[]{ numero, titre, description }
    },
    constat{
      surTitre,
      titre,
      paragraphes[]{ texte, emphase }
    },
    livrable{
      surTitre,
      titre,
      sousTitre,
      items[]{
        numero,
        titre,
        description,
        picto{ asset->{ _id, url, mimeType } }
      }
    },
    methode{
      surTitre,
      titre,
      sousTitre,
      etapes[]{ numero, libelle, titre, description, duree },
      lienLibelle,
      lienHref
    },
    garanties{
      surTitre,
      titre,
      items[]{ titre, description }
    },
    citation{
      surTitre,
      texte,
      auteur,
      auteurTag
    },
    livrableRapport{
      surTitre,
      titre,
      sousTitre,
      mockupKicker,
      mockupTitre,
      mockupMeta,
      sections[]{ numero, titre, description, pages },
      annexesTitre,
      annexes
    },
    faq{
      surTitre,
      titre,
      questions[]{ question, reponse }
    },
    autresServices{
      surTitre,
      titre,
      services[]{ eyebrow, titre, description, lienLibelle, lienHref }
    }
  }
`)
