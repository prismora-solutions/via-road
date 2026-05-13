// Données du séjour — remplacer plus tard par fetch() vers Google Sheets
const SEJOUR = {
  id: "marais-poitevin-2026",
  titre: "Marais Poitevin 🚐",
  sous_titre: "Pont de l'Ascension — famille Van Tongeren",
  dates: "14 – 17 mai 2026",
  depart: "Asques (33240)",
  destination: "Coulon, Marais Poitevin",
  hebergement: {
    type: "Camping-Car",
    lieu: "Aire CC Coulon",
    maps: "https://maps.app.goo.gl/6LoNAZdViieS8uG17"
  },
  checklist: [
    { id: 1, categorie: "🎮 Terra Aventura", texte: "Télécharger les 4 parcours hors connexion", fait: false },
    { id: 2, categorie: "📱 Apps", texte: "Télécharger appli Camping-Car Park", fait: false },
    { id: 3, categorie: "📞 Réservations", texte: "Réserver barque Saint-Hilaire : 05 49 26 04 09", fait: false },
    { id: 4, categorie: "📞 Réservations", texte: "Appeler parc ornitho pour chien (05 49 26 04 09)", fait: false },
    { id: 5, categorie: "📞 Réservations", texte: "Réserver restaurant Coulon — vendredi soir terrasse chien", fait: false },
    { id: 6, categorie: "🐕 Chien", texte: "Gamelle pliable + eau en stock", fait: false },
    { id: 7, categorie: "🐕 Chien", texte: "Laisse courte pour parcours", fait: false },
    { id: 8, categorie: "🐕 Chien", texte: "Sacs à déjections", fait: false },
    { id: 9, categorie: "🐕 Chien", texte: "Répulsif moustiques (marais, soir)", fait: false },
    { id: 10, categorie: "🐕 Chien", texte: "Confirmer chien accepté : parc ornitho / barque / restaurant", fait: false }
  ],
  jours: [
    {
      id: "j1",
      numero: 1,
      label: "Jeudi 14 mai",
      titre: "Route + Coulon",
      emoji: "🚐",
      etapes: [
        {
          id: "j1-1",
          plage: "matin",
          heure: "08h30",
          titre: "Départ Asques",
          description: "Pique-nique du midi préparé à la maison.",
          type: "trajet",
          maps: null,
          tag: null
        },
        {
          id: "j1-2",
          plage: "matin",
          heure: "10h45",
          titre: "Arrivée aire CC Coulon",
          description: "Installation camping-car.",
          type: "hebergement",
          maps: "https://maps.app.goo.gl/6LoNAZdViieS8uG17",
          tag: null
        },
        {
          id: "j1-3",
          plage: "midi",
          heure: "12h00",
          titre: "Pique-nique — Quais de Coulon",
          description: "Bords de Sèvre, village fleuri. Le beagle se balade en laisse.",
          type: "repas",
          maps: "https://maps.app.goo.gl/W2RpxTCnCr5T7SvC7",
          tag: "🐕 Chien OK"
        },
        {
          id: "j1-4",
          plage: "aprem",
          heure: "13h30",
          titre: "🎮 Terra Aventura — Coulon",
          description: "~1h15. Départ depuis les quais, ruelles maraîchines, bords de Sèvre.",
          type: "activite",
          maps: "https://maps.app.goo.gl/EZ5wCnfxkEacWCav6",
          tag: "Terra Aventura"
        },
        {
          id: "j1-5",
          plage: "aprem",
          heure: "15h00",
          titre: "Maison du Marais Poitevin",
          description: "Écomusée, ~45 min. ⚠️ Vérifier accueil chien.",
          type: "culture",
          maps: null,
          tag: "⚠️ Vérifier chien"
        },
        {
          id: "j1-6",
          plage: "aprem",
          heure: "16h15",
          titre: "Goûter",
          description: "Terrasse ou boulangerie de Coulon. Crêpes, gaufres selon météo.",
          type: "repas",
          maps: null,
          tag: null
        },
        {
          id: "j1-7",
          plage: "aprem",
          heure: "17h00",
          titre: "Balade — Arçais",
          description: "Chemin de halage, ports, venelles. ~45 min, chien en laisse.",
          type: "balade",
          maps: "https://maps.app.goo.gl/qkdsUoG6e9YdvEQz7",
          tag: "🐕 Chien OK"
        },
        {
          id: "j1-8",
          plage: "soir",
          heure: "19h30",
          titre: "Dîner — CC",
          description: "Repas préparé, provisions maison.",
          type: "repas",
          maps: null,
          tag: null
        }
      ]
    },
    {
      id: "j2",
      numero: 2,
      label: "Vendredi 15 mai",
      titre: "Parc ornitho + Barque",
      emoji: "🦅",
      etapes: [
        {
          id: "j2-1",
          plage: "matin",
          heure: "08h00",
          titre: "Petit-déj CC + sortie chien",
          description: "Sortie rapide chien bords de Sèvre. Prépare le pique-nique.",
          type: "routine",
          maps: null,
          tag: null
        },
        {
          id: "j2-2",
          plage: "matin",
          heure: "09h15",
          titre: "Parc ornithologique",
          description: "8 hectares, 85 espèces, baudets du Poitou, chèvres, 3 km. Jeux de piste enfants, film 20 min.",
          type: "activite",
          maps: "https://maps.app.goo.gl/hAUTrhCPpQxxh6qS9",
          tag: "⚠️ Appeler avant pour chien"
        },
        {
          id: "j2-3",
          plage: "midi",
          heure: "12h00",
          titre: "Pique-nique — aire du parc",
          description: "Aire prévue au parc ou à proximité.",
          type: "repas",
          maps: "https://maps.app.goo.gl/DAHZ9CgurSZX6fyM8",
          tag: null
        },
        {
          id: "j2-4",
          plage: "aprem",
          heure: "13h30",
          titre: "🚣 Barque guidée",
          description: "~1h30. Canaux sauvages commentés. Port de Mont Faucon. À RÉSERVER.",
          type: "activite",
          maps: "https://maps.app.goo.gl/AuBjhgGa9YUoCCqL7",
          tag: "📞 Réserver à l'avance"
        },
        {
          id: "j2-5",
          plage: "aprem",
          heure: "16h00",
          titre: "Balade + Goûter — La Garette",
          description: "Passerelle en bois sur la Sèvre, barrage-écluse du Chail. ~30 min, idéal pour le chien.",
          type: "balade",
          maps: "https://maps.app.goo.gl/SoGrGDtQraPoNCJL8",
          tag: "🐕 Chien OK"
        },
        {
          id: "j2-6",
          plage: "soir",
          heure: "19h30",
          titre: "🍽️ Dîner au restaurant — Coulon",
          description: "Le seul resto du séjour. Terrasse bords de Sèvre, spécialités maraîchines. «Au Marais» ou «La Passerelle» — vérifier avis.",
          type: "repas",
          maps: null,
          tag: "📞 Réserver terrasse chien"
        }
      ]
    },
    {
      id: "j3",
      numero: 3,
      label: "Samedi 16 mai",
      titre: "Terra Aventura — grand jour",
      emoji: "🎮",
      etapes: [
        {
          id: "j3-1",
          plage: "matin",
          heure: "07h30",
          titre: "Petit-déj + préparation sacs",
          description: "Chaussures imperméables, eau + gamelle chien. Pique-nique préparé.",
          type: "routine",
          maps: null,
          tag: null
        },
        {
          id: "j3-2",
          plage: "matin",
          heure: "09h00",
          titre: "🎮 Terra Aventura — Les Gardiens du Marais",
          description: "6 km, 2-3h. Départ lavoir de la Grande Fontaine, Saint-Georges-de-Rex. Conches, chemins ombragés.",
          type: "activite",
          maps: null,
          tag: "Terra Aventura"
        },
        {
          id: "j3-3",
          plage: "midi",
          heure: "12h00",
          titre: "Pique-nique — tables du parcours",
          description: "Tables de pique-nique sur le parcours.",
          type: "repas",
          maps: null,
          tag: null
        },
        {
          id: "j3-4",
          plage: "aprem",
          heure: "14h15",
          titre: "🎮 Terra Aventura — Maraîchin contre Bras Rouge",
          description: "2,5 km, ~1h. Format léger. Départ Magné.",
          type: "activite",
          maps: null,
          tag: "Terra Aventura"
        },
        {
          id: "j3-5",
          plage: "aprem",
          heure: "15h30",
          titre: "Goûter + flânerie — Arçais",
          description: "Boulangerie à Magné ou Arçais. Port, venelles, boutiques artisanat local.",
          type: "balade",
          maps: null,
          tag: null
        },
        {
          id: "j3-6",
          plage: "soir",
          heure: "19h30",
          titre: "Dîner — CC",
          description: "Repas préparé.",
          type: "repas",
          maps: null,
          tag: null
        }
      ]
    },
    {
      id: "j4",
      numero: 4,
      label: "Dimanche 17 mai",
      titre: "Damvix + retour",
      emoji: "🏠",
      etapes: [
        {
          id: "j4-1",
          plage: "matin",
          heure: "08h00",
          titre: "Petit-déj CC + service",
          description: "Service CC si besoin. Prépare pique-nique de route.",
          type: "routine",
          maps: null,
          tag: null
        },
        {
          id: "j4-2",
          plage: "matin",
          heure: "09h30",
          titre: "Balade — Damvix",
          description: "Ruelles pavées, maisons maraîchines, canaux. ~1h, chien en laisse. Calme le dimanche matin.",
          type: "balade",
          maps: null,
          tag: "🐕 Chien OK"
        },
        {
          id: "j4-3",
          plage: "matin",
          heure: "11h00",
          titre: "Départ retour — Asques",
          description: "Via A83/A10, ~2h30.",
          type: "trajet",
          maps: null,
          tag: null
        },
        {
          id: "j4-4",
          plage: "midi",
          heure: "12h30",
          titre: "Pique-nique — aire autoroutière",
          description: "Espace vert ou aire en route.",
          type: "repas",
          maps: null,
          tag: null
        },
        {
          id: "j4-5",
          plage: "aprem",
          heure: "15h00",
          titre: "Retour Asques 🏠",
          description: "La maison !",
          type: "arrivee",
          maps: null,
          tag: null
        }
      ]
    }
  ]
};
