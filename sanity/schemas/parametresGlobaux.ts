import { defineField, defineType } from 'sanity'
import { seoField } from './fields/seo'

export const parametresGlobaux = defineType({
  name: 'parametresGlobaux',
  title: 'Paramètres globaux',
  type: 'document',
  fields: [
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        defineField({ name: 'email', title: 'Email', type: 'string', description: 'Ex : hello@maria.tech' }),
        defineField({ name: 'telephone', title: 'Téléphone', type: 'string', description: 'Format affichage : « +33 X XX XX XX XX »' }),
        defineField({
          name: 'calendlyUrl',
          title: 'Lien Cal.com / Calendly',
          type: 'url',
          description: 'URL complète. Cal.com sera embedé en popin sur la page contact.',
        }),
        defineField({
          name: 'linkedinUrl',
          title: 'LinkedIn maria',
          type: 'url',
        }),
        defineField({
          name: 'adresse',
          title: 'Adresse',
          type: 'object',
          fields: [
            defineField({ name: 'rue', title: 'Rue', type: 'string' }),
            defineField({ name: 'codePostalVille', title: 'Code postal + ville', type: 'string' }),
            defineField({ name: 'pays', title: 'Pays', type: 'string', initialValue: 'France' }),
            defineField({
              name: 'mention',
              title: 'Mention complémentaire',
              type: 'string',
              description: 'Ex : « Sur rendez-vous uniquement. »',
            }),
          ],
        }),
        defineField({
          name: 'horaires',
          title: 'Horaires',
          type: 'object',
          fields: [
            defineField({
              name: 'plage',
              title: 'Plage horaire',
              description: 'Ex : « Du lundi au vendredi, 9 h à 19 h. »',
              type: 'string',
            }),
            defineField({
              name: 'mention',
              title: 'Mention',
              description: 'Ex : « HORS JOURS FÉRIÉS. »',
              type: 'string',
            }),
            defineField({ name: 'opens', title: 'Heure d\'ouverture (Schema.org)', description: 'Format 24h, ex : « 09:00 ». Sert au JSON-LD.', type: 'string', initialValue: '09:00' }),
            defineField({ name: 'closes', title: 'Heure de fermeture (Schema.org)', description: 'Format 24h, ex : « 19:00 ». Sert au JSON-LD.', type: 'string', initialValue: '19:00' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'contactPage',
      title: 'Page contact',
      type: 'object',
      description: 'Contenu administrable de la page /contact.',
      fields: [
        seoField(),
        defineField({
          name: 'hero',
          title: 'Hero',
          type: 'object',
          fields: [
            defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// contact' }),
            defineField({
              name: 'titre',
              title: 'Titre (H1)',
              description: 'Encadrer un fragment avec **...** pour le mettre en jaune accent.',
              type: 'text',
              rows: 2,
              validation: (r) => r.required().max(200),
            }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.max(400) }),
          ],
        }),
        defineField({
          name: 'canaux',
          title: 'Bloc « 4 canaux »',
          type: 'object',
          fields: [
            defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// vos options' }),
            defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
            defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 2 }),
            defineField({
              name: 'cards',
              title: 'Cards (4 canaux)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'cardCanal',
                  fields: [
                    defineField({
                      name: 'action',
                      title: 'Action',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Scroll vers le formulaire', value: 'form' },
                          { title: 'Scroll vers infos pratiques', value: 'infos' },
                          { title: 'Ouvrir Cal.com en popin', value: 'calcom' },
                          { title: 'Désactivée (bientôt disponible)', value: 'disabled' },
                          { title: 'Lien custom', value: 'link' },
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'form',
                      validation: (r) => r.required(),
                    }),
                    defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
                    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: (r) => r.required().max(240) }),
                    defineField({ name: 'cta', title: 'Libellé du CTA', type: 'string', validation: (r) => r.required().max(60) }),
                    defineField({
                      name: 'href',
                      title: 'Lien custom (si action = Lien custom)',
                      type: 'string',
                      hidden: ({ parent }) => parent?.action !== 'link',
                    }),
                    defineField({
                      name: 'accent',
                      title: 'Couleur d\'accent du CTA',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Vert (success)', value: 'green' },
                          { title: 'Jaune (accent)', value: 'yellow' },
                          { title: 'Gris (désactivée)', value: 'muted' },
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'green',
                    }),
                  ],
                  preview: { select: { title: 'titre', subtitle: 'action' } },
                },
              ],
              validation: (r) => r.min(1).max(6),
            }),
          ],
        }),
        defineField({
          name: 'formulaire',
          title: 'Bloc « Formulaire »',
          type: 'object',
          fields: [
            defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// formulaire' }),
            defineField({ name: 'titre', title: 'Titre (H2)', type: 'string', initialValue: 'Écrivez-nous.' }),
            defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 2 }),
            defineField({ name: 'rgpdMention', title: 'Mention RGPD (case à cocher)', description: 'Préfixe avant le lien vers la politique de confidentialité. La phrase est complétée automatiquement par « politique de confidentialité ».', type: 'text', rows: 2, initialValue: "J'accepte que mes données soient utilisées par maria pour répondre à ma demande, dans le respect de la" }),
            defineField({ name: 'submitLabel', title: 'Libellé du bouton', type: 'string', initialValue: 'Envoyer' }),
            defineField({ name: 'submitMeta', title: 'Mention sous le bouton', type: 'string', initialValue: 'RÉPONSE SOUS 24 H · HORS WEEK-END' }),
          ],
        }),
        defineField({
          name: 'infosPratiques',
          title: 'Bloc « En direct »',
          type: 'object',
          fields: [
            defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// nous trouver' }),
            defineField({ name: 'titre', title: 'Titre (H2)', type: 'string', initialValue: 'En direct.' }),
          ],
        }),
        defineField({
          name: 'processus',
          title: 'Bloc « Ce qui se passe ensuite »',
          type: 'object',
          fields: [
            defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// le processus' }),
            defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
            defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 2 }),
            defineField({
              name: 'etapes',
              title: 'Étapes (3 typiquement)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'etapeProcessus',
                  fields: [
                    defineField({ name: 'numero', title: 'Numéro + libellé', description: 'Ex : « 01 — votre message ». Affiché en vert mono.', type: 'string', validation: (r) => r.required().max(60) }),
                    defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
                    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(280) }),
                  ],
                  preview: { select: { title: 'titre', subtitle: 'numero' } },
                },
              ],
              validation: (r) => r.min(1).max(6),
            }),
          ],
        }),
        defineField({
          name: 'faq',
          title: 'Bloc « FAQ »',
          type: 'object',
          fields: [
            defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// vos questions' }),
            defineField({ name: 'titre', title: 'Titre (H2)', type: 'string', initialValue: 'Avant de nous écrire.' }),
            defineField({
              name: 'questions',
              title: 'Questions',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'questionFaqContact',
                  fields: [
                    defineField({ name: 'question', title: 'Question', type: 'text', rows: 2, validation: (r) => r.required().max(200) }),
                    defineField({ name: 'reponse', title: 'Réponse', type: 'text', rows: 5, validation: (r) => r.required().max(600) }),
                  ],
                  preview: { select: { title: 'question' } },
                },
              ],
              validation: (r) => r.min(1).max(20),
            }),
          ],
        }),
        defineField({
          name: 'merciHero',
          title: 'Page /contact/merci — confirmation',
          type: 'object',
          fields: [
            defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// merci' }),
            defineField({
              name: 'titre',
              title: 'Titre (H1)',
              description: 'Encadrer un fragment avec **...** pour le rendre en jaune.',
              type: 'text',
              rows: 2,
              initialValue: 'Votre message est **bien arrivé**',
            }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, initialValue: 'On vous répond personnellement sous 24 h, par un humain, pas un robot.' }),
            defineField({ name: 'skipGameLibelle', title: 'Lien « Passer le jeu »', type: 'string', initialValue: 'Passer le jeu et continuer' }),
          ],
        }),
        defineField({
          name: 'merciSuggestions',
          title: 'Page /contact/merci — suggestions',
          type: 'object',
          fields: [
            defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// en attendant' }),
            defineField({ name: 'titre', title: 'Titre (H2)', type: 'string', initialValue: 'Vous pouvez aussi…' }),
            defineField({
              name: 'cards',
              title: 'Cards de suggestions',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'merciSuggestionCard',
                  fields: [
                    defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
                    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: (r) => r.required().max(160) }),
                    defineField({ name: 'lienLibelle', title: 'Libellé du lien', type: 'string', validation: (r) => r.required().max(40) }),
                    defineField({ name: 'lienHref', title: 'Destination', type: 'string', validation: (r) => r.required() }),
                    defineField({
                      name: 'accent',
                      title: 'Couleur du picto',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Jaune', value: 'yellow' },
                          { title: 'Vert', value: 'green' },
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'yellow',
                    }),
                  ],
                  preview: { select: { title: 'titre', subtitle: 'lienHref' } },
                },
              ],
              validation: (r) => r.min(1).max(6),
            }),
          ],
        }),
        defineField({
          name: 'merciCalcomCta',
          title: 'Page /contact/merci — CTA Cal.com',
          type: 'object',
          fields: [
            defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// gagner du temps' }),
            defineField({
              name: 'titre',
              title: 'Titre (H2)',
              description: 'Encadrer un fragment avec **...** pour le rendre en jaune.',
              type: 'text',
              rows: 2,
              initialValue: 'Plutôt que d’attendre **notre retour…**',
            }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, initialValue: 'Réservez directement un créneau de 30 minutes avec nous, à un horaire qui vous arrange.' }),
            defineField({ name: 'ctaLibelle', title: 'Libellé du CTA', type: 'string', initialValue: 'Réserver un créneau Cal.com' }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Paramètres globaux' }),
  },
})
