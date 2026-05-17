import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const patch = {
  'contactPage.merciHero': {
    surTitre: '// merci',
    titre: 'Votre message est **bien arrivé**',
    description:
      "On vous répond personnellement sous 24 h, par un humain, pas un robot. En attendant, on a un petit jeu pour vous.",
    skipGameLibelle: 'Passer le jeu et continuer',
  },
  'contactPage.merciSuggestions': {
    surTitre: '// en attendant',
    titre: 'Vous pouvez aussi…',
    cards: [
      {
        _key: 's1',
        titre: 'Découvrir notre méthode',
        description:
          "Comment on cadre, on construit et on livre les projets IA — étape par étape, en moins de 5 minutes de lecture.",
        lienLibelle: 'Voir la méthode',
        lienHref: '/agence#processus',
        accent: 'yellow',
      },
      {
        _key: 's2',
        titre: 'Lire la charte IA',
        description:
          "Nos engagements concrets sur l’usage de l’IA : sécurité des données, transparence, formation des équipes.",
        lienLibelle: 'Lire la charte',
        lienHref: '#',
        accent: 'green',
      },
      {
        _key: 's3',
        titre: 'Parcourir le journal',
        description:
          "Études de cas, retours d’expérience, prises de position : ce qu’on partage de notre côté tech et terrain.",
        lienLibelle: 'Ouvrir le journal',
        lienHref: '/blog',
        accent: 'yellow',
      },
    ],
  },
  'contactPage.merciCalcomCta': {
    surTitre: '// gagner du temps',
    titre: 'Plutôt que d’attendre **notre retour…**',
    description:
      'Réservez directement un créneau de 30 minutes avec nous, à un horaire qui vous arrange.',
    ctaLibelle: 'Réserver un créneau Cal.com',
  },
}

const result = await client
  .patch('parametresGlobaux')
  .set(patch)
  .commit({ autoGenerateArrayKeys: true })

console.log('PATCHED:', result._id)
