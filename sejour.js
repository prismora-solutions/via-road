// Données du séjour — remplacer plus tard par fetch() vers Google Sheets
const SEJOUR = {
id: “marais-poitevin-2026”,
titre: “Marais Poitevin 🚐”,
sous_titre: “Pont de l’Ascension — famille Van Tongeren”,
dates: “14 – 17 mai 2026”,
depart: “Asques (33240)”,
destination: “Coulon, Marais Poitevin”,
hebergement: {
type: “Camping-Car”,
lieu: “Aire CC Coulon (J1+J2) · Aire CC Arçais (J3)”,
maps: “https://maps.app.goo.gl/6LoNAZdViieS8uG17”
},
checklist: [
{ id: 1,  categorie: “📞 Réservations”, texte: “Réserver barque Mont Faucon — ven 15 matin ☎️ 05 49 26 04 09 (confirmer chien à bord)”, fait: false },
{ id: 2,  categorie: “📞 Réservations”, texte: “Réserver La Passerelle Coulon — ven 15 soir, terrasse chien ☎️ 05 49 35 80 03”, fait: false },
{ id: 3,  categorie: “🎮 Terra Aventura”, texte: “Télécharger parcours Coulon hors connexion (Pic nic douille)”, fait: false },
{ id: 4,  categorie: “🎮 Terra Aventura”, texte: “Télécharger parcours St-Georges hors connexion (Flamme Bleue)”, fait: false },
{ id: 5,  categorie: “🎮 Terra Aventura”, texte: “Télécharger parcours Magné hors connexion (Bras Rouge)”, fait: false },
{ id: 6,  categorie: “📱 Apps”, texte: “Visorando — télécharger GPX Monfaucon + Damvix”, fait: false },
{ id: 7,  categorie: “📱 Apps”, texte: “Télécharger Camping-Car Park ou Parkfornight”, fait: false },
{ id: 8,  categorie: “📱 Apps”, texte: “Météo France — ajouter ville Coulon (INSEE 79430)”, fait: false },
{ id: 9,  categorie: “🐕 Chien”, texte: “Gamelle pliable + eau en stock”, fait: false },
{ id: 10, categorie: “🐕 Chien”, texte: “Laisse courte pour parcours”, fait: false },
{ id: 11, categorie: “🐕 Chien”, texte: “Sacs à déjections”, fait: false },
{ id: 12, categorie: “🐕 Chien”, texte: “Répulsif moustiques (marais, soir)”, fait: false },
{ id: 13, categorie: “🐕 Chien”, texte: “Chaussures imperméables / bottes TA St-Georges”, fait: false }
],
jours: [

// ─────────────────────────────────────────
// JEUDI 14 MAI
// ─────────────────────────────────────────
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
      description: "Pique-nique du midi préparé à la maison. ~2h15 de route via A10 puis N11.",
      type: "trajet",
      maps: "https://maps.google.com/?q=44.8903,0.4278",
      liens: [],
      tag: null
    },
    {
      id: "j1-2",
      plage: "matin",
      heure: "10h45",
      titre: "Arrivée — Aire CC Coulon",
      description: "Aire bien notée, ombragée, à 5 min à pied des quais. Nuit J1 et J2.",
      type: "hebergement",
      maps: "https://maps.app.goo.gl/6LoNAZdViieS8uG17",
      liens: [],
      tag: null
    },
    {
      id: "j1-3",
      plage: "midi",
      heure: "12h00",
      titre: "Pique-nique — Quais de Coulon",
      description: "Bords de Sèvre, bancs, barques qui passent. Le chien peut se dégourdir sur le chemin de halage. Village fleuri, ambiance déjà typique.",
      type: "repas",
      maps: "https://maps.app.goo.gl/HPGY1cZLr2yXBV1F9",
      liens: [],
      tag: "🐕 Chien OK"
    },
    {
      id: "j1-4",
      plage: "aprem",
      heure: "13h30",
      titre: "🎮 Terra Aventura #1 — Pic nic douille, c'est toi la pigouille",
      description: "1,5 km · 1h · Dif 1/5 · Le plus facile des 3, parfait pour l'arrivée. Ruelles maraîchines et bords de Sèvre de Coulon avec Zarthus. Possible en poussette. Chien bienvenu. Bonus : mot mystère = tarif réduit Maison du Marais.",
      type: "activite",
      maps: "https://maps.google.com/?q=46.3233,-0.5861",
      liens: [
        { label: "Terra Aventura — parcours", url: "https://www.terra-aventura.fr/parcours?field_department=79&title=pic+nic+douille" }
      ],
      tag: "Terra Aventura"
    },
    {
      id: "j1-5",
      plage: "aprem",
      heure: "14h45",
      titre: "☕ Goûter — Boulangerie Coulon",
      description: "Boulangerie locale de Coulon avant la balade.",
      type: "repas",
      maps: null,
      liens: [],
      tag: null
    },
    {
      id: "j1-6",
      plage: "aprem",
      heure: "15h30",
      titre: "🥾 Balade — Chemin de halage Coulon",
      description: "~2-3 km · ~45 min. Court, plat, chien en laisse. Longe la Sèvre.\n\nAlternative si énergie : Visorando \"Découverte du Marais à Irleau\" (6 km, 1h45 — ~8 km de Coulon).",
      type: "balade",
      maps: "https://maps.app.goo.gl/HPGY1cZLr2yXBV1F9",
      liens: [
        { label: "📍 Départ Irleau (alternative)", url: "https://maps.google.com/?q=46.3374,-0.5272" },
        { label: "Visorando Irleau", url: "https://www.visorando.com/randonnee-decouverte-du-marais-et-de-la-sevre-nior/" }
      ],
      tag: "🐕 Chien OK"
    },
    {
      id: "j1-7",
      plage: "soir",
      heure: "19h00",
      titre: "Retour — Aire CC Coulon",
      description: "Nuit sur place.",
      type: "hebergement",
      maps: "https://maps.app.goo.gl/6LoNAZdViieS8uG17",
      liens: [],
      tag: null
    },
    {
      id: "j1-8",
      plage: "soir",
      heure: "19h30",
      titre: "Dîner — CC",
      description: "Repas préparé maison.",
      type: "repas",
      maps: null,
      liens: [],
      tag: null
    }
  ]
},

// ─────────────────────────────────────────
// VENDREDI 15 MAI
// ─────────────────────────────────────────
{
  id: "j2",
  numero: 2,
  label: "Vendredi 15 mai",
  titre: "Barque + La Garette",
  emoji: "🚣",
  etapes: [
    {
      id: "j2-1",
      plage: "matin",
      heure: "08h00",
      titre: "Petit-déj CC + sortie chien",
      description: "Sortie rapide chien bords de Sèvre. Prépare le pique-nique.",
      type: "routine",
      maps: null,
      liens: [],
      tag: null
    },
    {
      id: "j2-2",
      plage: "matin",
      heure: "08h45",
      titre: "Trajet — Saint-Hilaire-la-Palud",
      description: "~18 km · 20 min. Direction Port de Mont Faucon.",
      type: "trajet",
      maps: "https://maps.app.goo.gl/AuBjhgGa9YUoCCqL7",
      liens: [],
      tag: null
    },
    {
      id: "j2-3",
      plage: "matin",
      heure: "09h15",
      titre: "🥾 Visorando — Boucle depuis Monfaucon",
      description: "8,6 km · 2h30 · Facile. En attendant l'heure de la barque. Chemins de halage, canaux, prairies humides, silence. Chien dans son élément. Aucun dénivelé. Avant-goût du marais vu depuis la berge.",
      type: "balade",
      maps: "https://maps.google.com/?q=46.265,-0.618",
      liens: [
        { label: "Visorando Monfaucon", url: "https://www.visorando.com/randonnee-saint-hilaire-la-palud.html" }
      ],
      tag: "🐕 Chien OK"
    },
    {
      id: "j2-4",
      plage: "midi",
      heure: "12h00",
      titre: "Pique-nique — Embarcadère Monfaucon",
      description: "Espaces herbe bord de chemin ou à l'embarcadère.",
      type: "repas",
      maps: "https://maps.app.goo.gl/DAHZ9CgurSZX6fyM8",
      liens: [],
      tag: null
    },
    {
      id: "j2-5",
      plage: "aprem",
      heure: "13h30",
      titre: "🚣 Barque guidée — Port Mont Faucon",
      description: "~1h30. Plate traditionnelle avec batelier local. Canaux qui se resserrent, frênes têtards en voûte végétale, hérons, silence. Magnifique. Chien à confirmer à la réservation.",
      type: "activite",
      maps: "https://maps.app.goo.gl/AuBjhgGa9YUoCCqL7",
      liens: [],
      tag: "📞 ☎️ 05 49 26 04 09"
    },
    {
      id: "j2-6",
      plage: "aprem",
      heure: "15h15",
      titre: "Trajet — La Garette",
      description: "~12 km · 15 min.",
      type: "trajet",
      maps: "https://maps.google.com/?q=46.308,-0.602",
      liens: [],
      tag: null
    },
    {
      id: "j2-7",
      plage: "aprem",
      heure: "15h45",
      titre: "🏘️ Flânerie + ☕ Goûter — La Garette",
      description: "Un des plus photogéniques du marais. Rue piétonne, maisons de pêcheurs avec embarcadère privé. Barrage-écluse du Chail, passerelle en bois. Glacier ou guinguette en saison.\n\nOption marche : Visorando La Garette→Coulon (9,6 km — vous finissez à Coulon, logistique à prévoir).",
      type: "balade",
      maps: "https://maps.google.com/?q=46.308,-0.602",
      liens: [
        { label: "Visorando La Garette→Coulon (option marche)", url: "https://www.visorando.com/randonnee-la-venise-verte-la-garette-coulon/" }
      ],
      tag: "🐕 Chien OK"
    },
    {
      id: "j2-8",
      plage: "soir",
      heure: "17h30",
      titre: "Retour — Aire CC Coulon",
      description: "~5 km · 8 min. Détente avant le dîner.",
      type: "hebergement",
      maps: "https://maps.app.goo.gl/6LoNAZdViieS8uG17",
      liens: [],
      tag: null
    },
    {
      id: "j2-9",
      plage: "soir",
      heure: "19h30",
      titre: "🍽️ Dîner — La Passerelle, Coulon",
      description: "86 Quai Louis Tardy, 79510 Coulon. Terrasse bords de Sèvre. Spécialités : anguille, mogettes, fromages locaux. Vue sur les barques.",
      type: "repas",
      maps: "https://maps.app.goo.gl/RpNqHFQR2UBm8KW7A",
      liens: [],
      tag: "📞 ☎️ 05 49 35 80 03"
    },
    {
      id: "j2-10",
      plage: "soir",
      heure: "21h30",
      titre: "Retour — Aire CC Coulon",
      description: "Nuit sur place.",
      type: "hebergement",
      maps: "https://maps.app.goo.gl/6LoNAZdViieS8uG17",
      liens: [],
      tag: null
    }
  ]
},

// ─────────────────────────────────────────
// SAMEDI 16 MAI
// ─────────────────────────────────────────
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
      liens: [],
      tag: null
    },
    {
      id: "j3-2",
      plage: "matin",
      heure: "08h30",
      titre: "Trajet — Saint-Georges-de-Rex",
      description: "~15 km · 20 min depuis Coulon.",
      type: "trajet",
      maps: "https://maps.google.com/?q=46.270,-0.540",
      liens: [],
      tag: null
    },
    {
      id: "j3-3",
      plage: "matin",
      heure: "09h00",
      titre: "🎮 Terra Aventura #2 — Flamme Bleue en Venise Verte",
      description: "6 km · 2h-3h · Dif 3/5 · Terrain 2/5. Avec Zécolo dans les conches et chemins ombragés du marais sauvage. Passages bourbeux possibles — bottes/imperméables. Vérifier crue (évail) avant départ.",
      type: "activite",
      maps: "https://maps.google.com/?q=46.270,-0.540",
      liens: [
        { label: "Terra Aventura — parcours Flamme Bleue", url: "https://www.terra-aventura.fr/parcours?field_department=79&title=flamme+bleue" }
      ],
      tag: "Terra Aventura ⚠️ Bottes si pluie"
    },
    {
      id: "j3-4",
      plage: "midi",
      heure: "12h00",
      titre: "Pique-nique — Tables du parcours",
      description: "Tables de pique-nique au lavoir ou aire herbeuse.",
      type: "repas",
      maps: null,
      liens: [],
      tag: null
    },
    {
      id: "j3-5",
      plage: "aprem",
      heure: "13h30",
      titre: "Trajet — Magné",
      description: "~12 km · 15 min.",
      type: "trajet",
      maps: "https://maps.google.com/?q=46.340,-0.527",
      liens: [],
      tag: null
    },
    {
      id: "j3-6",
      plage: "aprem",
      heure: "14h15",
      titre: "🎮 Terra Aventura #3 — Maraîchin contre Bras Rouge",
      description: "2,5 km · 1h+ · Dif 2/5 · Terrain 1/5. Avec Zisséo sur le sentier «De port en port». Balises métalliques au sol. Plat, large, possible en poussette. Fun et court — parfait pour finir la journée.",
      type: "activite",
      maps: "https://maps.google.com/?q=46.340,-0.527",
      liens: [
        { label: "Terra Aventura — parcours Bras Rouge", url: "https://www.terra-aventura.fr/parcours?field_department=79&title=maraichin+bras+rouge" }
      ],
      tag: "Terra Aventura"
    },
    {
      id: "j3-7",
      plage: "aprem",
      heure: "15h30",
      titre: "☕ Goûter — Magné ou Arçais",
      description: "Boulangerie à Magné (270 avenue Marais Poitevin) ou en route vers Arçais.",
      type: "repas",
      maps: null,
      liens: [],
      tag: null
    },
    {
      id: "j3-8",
      plage: "aprem",
      heure: "16h00",
      titre: "🏘️ Flânerie — Arçais",
      description: "Port, venelles, maisons maraîchines. Deux répliques de grues en bois sur le quai. Atmosphère paisible, chemin de halage le long de la Sèvre. Boutiques artisanat en saison.",
      type: "balade",
      maps: "https://maps.app.goo.gl/kpFHqhJpEcmAQqME7",
      liens: [
        { label: "📍 Chemin de halage Arçais", url: "https://maps.app.goo.gl/dhiFmwyBkANkw69MA" }
      ],
      tag: "🐕 Chien OK"
    },
    {
      id: "j3-9",
      plage: "soir",
      heure: "19h00",
      titre: "🏕️ Installation — Aire CC Arçais",
      description: "26 Rue du Marais, 79210 Arçais. ~11,50€/nuit. Électricité, sanitaires, WiFi. Sol herbe + goudron. Supérette à 300m. Très bien noté. Calme.",
      type: "hebergement",
      maps: "https://maps.app.goo.gl/a9yS9skjTY4Dqy12A",
      liens: [],
      tag: null
    },
    {
      id: "j3-10",
      plage: "soir",
      heure: "19h30",
      titre: "Dîner — CC",
      description: "Repas préparé à bord.",
      type: "repas",
      maps: null,
      liens: [],
      tag: null
    }
  ]
},

// ─────────────────────────────────────────
// DIMANCHE 17 MAI
// ─────────────────────────────────────────
{
  id: "j4",
  numero: 4,
  label: "Dimanche 17 mai",
  titre: "Damvix + Retour",
  emoji: "🏠",
  etapes: [
    {
      id: "j4-1",
      plage: "matin",
      heure: "08h00",
      titre: "Petit-déj CC",
      description: "Service CC si besoin. Prépare pique-nique de route.",
      type: "routine",
      maps: null,
      liens: [],
      tag: null
    },
    {
      id: "j4-2",
      plage: "matin",
      heure: "09h00",
      titre: "Trajet — Damvix",
      description: "~20 km · 25 min depuis Arçais.",
      type: "trajet",
      maps: "https://maps.app.goo.gl/ZHpVhHjqBYCsMHSb9",
      liens: [],
      tag: null
    },
    {
      id: "j4-3",
      plage: "matin",
      heure: "09h30",
      titre: "🥾 Damvix — Balade libre ou Visorando",
      description: "Option A — Balade libre (~1h, ~2 km) : Ruelles pavées, maisons basses, canaux qui longent les jardins. Calme absolu le dim matin. Boulangerie + traiteur + supérette sur place.\n\nOption B — Visorando «Boucle Damvix / Bazoin» (~9 km, 2h30) : Boucle entre le port de Damvix et le Bazoin, canaux du marais mouillé, terrain plat, passerelles sur les bras d'eau.",
      type: "balade",
      maps: "https://maps.app.goo.gl/ZHpVhHjqBYCsMHSb9",
      liens: [
        { label: "📍 Option A — Centre Damvix", url: "https://maps.app.goo.gl/ZHpVhHjqBYCsMHSb9" },
        { label: "📍 Option B — Parking port Damvix", url: "https://maps.google.com/?q=46.379,-0.737" },
        { label: "Visorando Damvix (Option B)", url: "https://www.visorando.com/randonnee-damvix.html" }
      ],
      tag: "🐕 Chien OK"
    },
    {
      id: "j4-4",
      plage: "matin",
      heure: "11h00",
      titre: "Départ retour — Asques",
      description: "Via A83/A10 · ~240 km · ~2h30. (12h00 si Option B Visorando.)",
      type: "trajet",
      maps: null,
      liens: [],
      tag: null
    },
    {
      id: "j4-5",
      plage: "midi",
      heure: "12h30",
      titre: "Pique-nique — Aire autoroutière",
      description: "Espace vert ou aire en route.",
      type: "repas",
      maps: null,
      liens: [],
      tag: null
    },
    {
      id: "j4-6",
      plage: "aprem",
      heure: "15h00",
      titre: "Retour Asques 🏠",
      description: "La maison ! (16h00 si Option B.)",
      type: "arrivee",
      maps: "https://maps.google.com/?q=Asques+33240",
      liens: [],
      tag: null
    }
  ]
}


]
};