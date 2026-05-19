/**
 * Données factuelles des pages légales — point unique de mise à jour.
 *
 * Les chaînes commençant par « [À COMPLÉTER » sont des marqueurs visibles :
 * elles s'affichent telles quelles dans le site tant qu'elles ne sont pas
 * remplies. Une fois validées juridiquement :
 *  1. Remplacer les valeurs ici.
 *  2. Mettre à jour `derniereMaj` (format AAAA-MM-JJ).
 *  3. Basculer chaque page sur `robots: { index: true, follow: true }`
 *     (chaque page a un TODO commenté à cet effet).
 */

export type LegalInfo = {
  denomination: string
  formeJuridique: string
  capital: string
  siegeSocial: string
  rcsVille: string
  rcsNumero: string
  siret: string
  tva: string
  directeurPublication: string
  emailLegal: string
  telephone: string
  hebergeur: string
  hebergeurAdresse: string
  /** Date de dernière mise à jour, format AAAA-MM-JJ. */
  derniereMaj: string
  /** Ressort des tribunaux compétents, ex. « de Paris ». */
  ressortTribunaux: string
  /** Statut INPI du nom maria. */
  proprieteMarque: string
}

export const legalInfo: LegalInfo = {
  denomination: '[À COMPLÉTER : dénomination sociale]',
  formeJuridique: '[À COMPLÉTER : SAS / SASU / SARL / …]',
  capital: '[À COMPLÉTER]',
  siegeSocial: '[À COMPLÉTER : adresse complète]',
  rcsVille: '[À COMPLÉTER : ville d’immatriculation]',
  rcsNumero: '[À COMPLÉTER : n° RCS]',
  siret: '[À COMPLÉTER : 14 chiffres]',
  tva: '[À COMPLÉTER : FR + 11 chiffres]',
  directeurPublication: '[À COMPLÉTER : nom du directeur de la publication]',
  emailLegal: '[À COMPLÉTER : contact légal — ex. legal@maria.tech]',
  telephone: '[À COMPLÉTER : numéro de contact]',
  hebergeur: 'Vercel Inc.',
  hebergeurAdresse:
    '440 N Barranca Avenue #4133, Covina, CA 91723, USA — vercel.com',
  derniereMaj: '[À COMPLÉTER : date AAAA-MM-JJ]',
  ressortTribunaux: '[À COMPLÉTER : ressort des tribunaux compétents]',
  proprieteMarque:
    '[À COMPLÉTER : marque déposée INPI ou signes distinctifs de l’éditeur]',
}
