import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const patch = {
  contact: {
    email: 'hello@maria.tech',
    telephone: '+33 X XX XX XX XX',
    calendlyUrl: 'https://cal.com/maria-tech/decouverte',
    linkedinUrl: 'https://www.linkedin.com/company/maria-tech',
    adresse: {
      rue: '59 rue Beaubourg',
      codePostalVille: '75003 Paris',
      pays: 'France',
      mention: 'Sur rendez-vous uniquement.',
    },
    horaires: {
      plage: 'Du lundi au vendredi, 9 h à 19 h.',
      mention: 'HORS JOURS FÉRIÉS.',
      opens: '09:00',
      closes: '19:00',
    },
  },
  contactPage: {
    hero: {
      surTitre: '// contact',
      titre: 'Parlons de **votre projet IA**',
      description:
        "Sans engagement, sans frais, sans baratin. Vous choisissez le canal qui vous va — on s’adapte à votre rythme.",
    },
    canaux: {
      surTitre: '// vos options',
      titre: 'Comment souhaitez-vous\nnous parler ?',
      sousTitre:
        "Quatre façons d’entrer en contact. Choisissez celle qui vous convient le mieux.",
      cards: [
        {
          _key: 'c1',
          action: 'form',
          titre: 'Le formulaire',
          description: 'Pour une prise de contact simple. Vous nous écrivez, on vous répond sous 24 h.',
          cta: 'Remplir le formulaire',
          accent: 'green',
        },
        {
          _key: 'c2',
          action: 'infos',
          titre: "L'appel direct",
          description: 'Pour parler à un humain immédiatement. Du lundi au vendredi, 9 h à 19 h.',
          cta: 'Voir le numéro',
          accent: 'green',
        },
        {
          _key: 'c3',
          action: 'calcom',
          titre: 'Le rendez-vous',
          description: 'Pour un échange de 30 minutes, cadré, à un horaire qui vous arrange.',
          cta: 'Réserver un créneau',
          accent: 'yellow',
        },
        {
          _key: 'c4',
          action: 'disabled',
          titre: 'Le cadrage de projet',
          description:
            'Pour les projets précis. On vous pose les bonnes questions, on cadre ensemble en quelques minutes.',
          cta: 'Bientôt disponible',
          accent: 'muted',
        },
      ],
    },
    formulaire: {
      surTitre: '// formulaire',
      titre: 'Écrivez-nous.',
      sousTitre: "Quelques informations, votre message, et on revient vers vous sous 24 h.",
      rgpdMention:
        "J'accepte que mes données soient utilisées par maria pour répondre à ma demande, dans le respect de la",
      submitLabel: 'Envoyer',
      submitMeta: 'RÉPONSE SOUS 24 H · HORS WEEK-END',
    },
    infosPratiques: {
      surTitre: '// nous trouver',
      titre: 'En direct.',
    },
    processus: {
      surTitre: '// le processus',
      titre: 'Ce qui se passe après votre\nmessage.',
      sousTitre:
        "Pas de mystère. Pas de funnel à 8 étapes. Juste un processus simple, humain.",
      etapes: [
        {
          _key: 'e1',
          numero: '01 — votre message',
          titre: 'Vous nous écrivez.',
          description:
            "Quelques minutes, sans engagement, sans frais. Vous nous dites ce que vous cherchez à faire — même de façon vague.",
        },
        {
          _key: 'e2',
          numero: '02 — notre retour',
          titre: 'On vous répond sous 24 h.',
          description:
            "Un message personnel, écrit par un humain, qui propose un premier échange. Pas un mail automatique.",
        },
        {
          _key: 'e3',
          numero: "03 — l'échange",
          titre: 'On échange 30 minutes.',
          description:
            "Par téléphone ou en visio. On comprend votre contexte, on vous donne un premier avis. Toujours sans engagement.",
        },
      ],
    },
    faq: {
      surTitre: '// vos questions',
      titre: 'Avant de nous écrire.',
      questions: [
        {
          _key: 'q1',
          question: 'Faut-il avoir un projet précis avant de vous contacter ?',
          reponse:
            "Non. Beaucoup de nos premiers échanges démarrent par « on n’est pas sûrs de ce qu’on cherche, mais on sait qu’on doit s’y mettre ». Notre rôle dans ces moments-là est de poser les bonnes questions pour cadrer ensemble.",
        },
        {
          _key: 'q2',
          question: 'Combien coûte un premier échange ?',
          reponse:
            "Rien. Les 30 minutes initiales sont offertes et sans engagement. On en sort soit avec une suite envisageable, soit avec un avis honnête sur ce qu’il faut faire ailleurs.",
        },
        {
          _key: 'q3',
          question: 'Travaillez-vous avec des entreprises hors France ?',
          reponse:
            "Oui, dès lors que l’échange se fait en français ou en anglais. Nos clients sont majoritairement français, mais on intervient ponctuellement à l’international.",
        },
        {
          _key: 'q4',
          question: "Quelle confidentialité sur ce qu'on vous partage ?",
          reponse:
            "Tout ce que vous nous partagez en amont d’un contrat est confidentiel par défaut. Nous signons un NDA si vous le souhaitez, et nous ne réutilisons jamais vos données.",
        },
        {
          _key: 'q5',
          question: 'Et si je veux juste discuter sans lancer un projet tout de suite ?',
          reponse:
            "Parfait. On a une vraie culture du long terme. Beaucoup de discussions démarrent 6, 9 ou 12 mois avant un lancement. On préfère cela à un projet précipité.",
        },
      ],
    },
    merciHero: {
      surTitre: '// message reçu',
      titre: 'Merci, votre message est arrivé.',
      description:
        "On vous répond sous 24 h ouvrées. En attendant, vous pouvez consulter notre journal — on y partage nos points de vue sur l’IA en entreprise.",
    },
  },
}

// Crée le doc si pas encore présent (singleton), puis patch les champs contact.
await client.createIfNotExists({
  _id: 'parametresGlobaux',
  _type: 'parametresGlobaux',
  baseline: 'Agence digitale 100 % IA',
})

const result = await client
  .patch('parametresGlobaux')
  .set(patch)
  .commit({ autoGenerateArrayKeys: true })

console.log('PATCHED:', result._id)
