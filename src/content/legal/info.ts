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
  denomination: 'MARIA TECH',
  formeJuridique: 'SAS',
  capital: '1 200',
  siegeSocial: '173 rue de Courcelles, 75017 Paris',
  rcsVille: 'Paris',
  rcsNumero: '105 251 615',
  siret: '105 251 615 00016',
  tva: 'FR69105251615',
  directeurPublication: 'Mathieu HERNANDEZ',
  emailLegal: 'contact@maria.tech',
  telephone: '06 37 41 57 98',
  hebergeur: 'Vercel Inc.',
  hebergeurAdresse:
    '440 N Barranca Avenue #4133, Covina, CA 91723, USA, vercel.com',
  derniereMaj: '2026-06-12',
  ressortTribunaux: 'de Paris',
  proprieteMarque: 'des signes distinctifs de l’éditeur',
}
