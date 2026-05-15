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
    contact{
      email,
      telephone,
      calendlyUrl,
      linkedinUrl,
      adresse{ rue, codePostalVille, pays, mention },
      horaires{ plage, mention, opens, closes }
    },
    reseauxSociaux[]{ plateforme, url },
    footer{
      mentionLegales,
      liensLegaux[]{ libelle, href }
    }
  }
`)

export const contactPageQuery = defineQuery(`
  *[_id == "parametresGlobaux"][0]{
    contact{
      email,
      telephone,
      calendlyUrl,
      linkedinUrl,
      adresse{ rue, codePostalVille, pays, mention },
      horaires{ plage, mention, opens, closes }
    },
    contactPage{
      hero{ surTitre, titre, description },
      canaux{
        surTitre,
        titre,
        sousTitre,
        cards[]{ action, titre, description, cta, href, accent }
      },
      formulaire{ surTitre, titre, sousTitre, rgpdMention, submitLabel, submitMeta },
      infosPratiques{ surTitre, titre },
      processus{
        surTitre,
        titre,
        sousTitre,
        etapes[]{ numero, titre, description }
      },
      faq{
        surTitre,
        titre,
        questions[]{ question, reponse }
      },
      merciHero{ surTitre, titre, description }
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

export const servicesMenuQuery = defineQuery(`
  *[_type == "pageService" && defined(slug.current) && defined(ordreMenu)] | order(ordreMenu asc){
    titre,
    "slug": slug.current,
    ordreMenu,
    introCourte,
    pictoMenu{ asset->{ _id, url, mimeType } }
  }
`)

export const besoinsMenuQuery = defineQuery(`
  *[_type == "pageBesoin" && defined(slug.current) && defined(ordreMenu)] | order(ordreMenu asc){
    titre,
    "slug": slug.current,
    ordreMenu,
    introCourte,
    pictoMenu{ asset->{ _id, url, mimeType } }
  }
`)

/* ============================================================================
 * BLOG
 * ============================================================================ */

// Projection commune utilisée par toutes les queries qui renvoient un article
// pour la grille (listing + featured).
const articleCardProjection = `{
  "slug": slug.current,
  titre,
  intro,
  publishedAt,
  readingTime,
  featured,
  coverImage{ asset->{ _id, url, metadata{ dimensions } }, alt },
  categorie->{ "slug": slug.current, libelle },
  auteur->{ nom, role, avatar{ asset->{ _id, url } } }
}`

export const articlesListingRecentQuery = defineQuery(`
  *[_type == "article"
    && defined(slug.current)
    && ($category == null || categorie->slug.current == $category)
    && ($search == null || $search == "" || (
      titre match $searchPattern || intro match $searchPattern
    ))
    && ($excludeSlug == null || slug.current != $excludeSlug)
  ] | order(publishedAt desc) [$start...$end] ${articleCardProjection}
`)

export const articlesListingOldestQuery = defineQuery(`
  *[_type == "article"
    && defined(slug.current)
    && ($category == null || categorie->slug.current == $category)
    && ($search == null || $search == "" || (
      titre match $searchPattern || intro match $searchPattern
    ))
    && ($excludeSlug == null || slug.current != $excludeSlug)
  ] | order(publishedAt asc) [$start...$end] ${articleCardProjection}
`)

export const articlesListingCountQuery = defineQuery(`
  count(*[_type == "article"
    && defined(slug.current)
    && ($category == null || categorie->slug.current == $category)
    && ($search == null || $search == "" || (
      titre match $searchPattern || intro match $searchPattern
    ))
    && ($excludeSlug == null || slug.current != $excludeSlug)
  ])
`)

export const featuredArticleQuery = defineQuery(`
  *[_type == "article" && defined(slug.current) && featured == true]
    | order(publishedAt desc) [0] ${articleCardProjection}
`)

// Fallback : si aucun article n'est featured, on prend le plus récent.
export const latestArticleQuery = defineQuery(`
  *[_type == "article" && defined(slug.current)]
    | order(publishedAt desc) [0] ${articleCardProjection}
`)

export const articleBySlugQuery = defineQuery(`
  *[_type == "article" && slug.current == $slug][0]{
    "slug": slug.current,
    titre,
    sousTitre,
    intro,
    publishedAt,
    "updatedAt": _updatedAt,
    readingTime,
    featured,
    coverImage{ asset->{ _id, url, metadata{ dimensions } }, alt },
    categorie->{ "slug": slug.current, libelle, description },
    auteur->{ nom, role, bio, avatar{ asset->{ _id, url } } },
    body[]{
      ...,
      _type == "imageBody" => { ..., asset->{ _id, url, metadata{ dimensions } } },
      _type == "fullWidthImage" => {
        ...,
        image{ ..., asset->{ _id, url, metadata{ dimensions } } }
      },
      _type == "video" => {
        ...,
        fichier{ asset->{ _id, url, mimeType } },
        cover{ ..., asset->{ _id, url, metadata{ dimensions } } }
      },
      markDefs[]{ ... }
    },
    tocItems[]{ anchor, label, exclure },
    sidebarCta{ titre, description, lienLibelle, lienHref, variant },
    seo{
      titre,
      description,
      ogImage{ asset->{ _id, url } }
    }
  }
`)

/** Articles suggérés : même catégorie, exclusion du courant, par date desc. */
export const relatedArticlesQuery = defineQuery(`
  *[_type == "article"
    && defined(slug.current)
    && slug.current != $slug
    && categorie->slug.current == $category
  ] | order(publishedAt desc) [0...3] ${articleCardProjection}
`)

/** Fallback : si pas assez d'articles dans la catégorie, on prend les plus récents toutes catégories. */
export const fallbackRelatedQuery = defineQuery(`
  *[_type == "article"
    && defined(slug.current)
    && slug.current != $slug
    && !(slug.current in $excludeSlugs)
  ] | order(publishedAt desc) [0...$limit] ${articleCardProjection}
`)

export const articleSlugsQuery = defineQuery(`
  *[_type == "article" && defined(slug.current)][]{ "slug": slug.current }
`)

export const articleCategoriesQuery = defineQuery(`
  *[_type == "articleCategorie" && defined(slug.current)] | order(libelle asc){
    "slug": slug.current,
    libelle,
    description
  }
`)

export const articleCategorieBySlugQuery = defineQuery(`
  *[_type == "articleCategorie" && slug.current == $slug][0]{
    "slug": slug.current,
    libelle,
    description
  }
`)

export const promosBlogQuery = defineQuery(`
  *[_type == "promoBlog" && actif == true] | order(position asc){
    position,
    label,
    titre,
    description,
    lienLibelle,
    lienHref,
    variant
  }
`)


export const pageServiceQuery = defineQuery(`
  *[_type == "pageService" && slug.current == $slug][0]{
    titre,
    "slug": slug.current,
    hero{
      surTitre,
      titre,
      titreEmphaseTone,
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
    projetPhare{
      surTitre,
      titre,
      description,
      kpis[]{ chiffre, libelle }
    },
    repartition{
      surTitre,
      titre,
      sousTitre,
      colonneA{ titre, items },
      colonneB{ titre, items }
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
