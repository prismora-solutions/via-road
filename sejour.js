// ============================================================
// Données du séjour — remplacer plus tard par fetch() Sheets
// ============================================================

// Lien Maps dual-format iOS : tente Google Maps, fallback Apple Plans
function mapsUrl(lat, lng, label) {
  const enc = encodeURIComponent(label || '');
  return {
    google: `comgooglemaps://?q=${lat},${lng}&zoom=16`,
    apple:  `https://maps.apple.com/?q=${enc}&ll=${lat},${lng}&z=16`,
    web:    `https://maps.google.com/?q=${lat},${lng}`
  };
}
function mapsGoo(gooUrl, lat, lng, label) {
  const enc = encodeURIComponent(label || '');
  return {
    google: gooUrl,
    apple:  `https://maps.apple.com/?q=${enc}&ll=${lat},${lng}&z=16`,
    web:    gooUrl
  };
}

const SEJOUR = {
  id: "marais-poitevin-2026",
  titre: "Marais Poitevin 🌿",
  sous_titre: "Pont de l'Ascension — Van Tongeren en vadrouille",
  dates: "14 – 17 mai 2026",
  depart: "Asques (33240)",
  destination: "Coulon · Arçais · Damvix",
  hebergement: {
    type: "Camping-Car",
    lieu: "Aire CC Coulon (J1+J2) · Aire CC Arçais (J3)",
    maps: mapsGoo("https://maps.app.goo.gl/6LoNAZdViieS8uG17", 46.3247, -0.5868, "Aire CC Coulon")
  },

  // ─────────────────────────────────────────────────
  // ONGLET RANDOS & TA
  // ─────────────────────────────────────────────────
  randos: [
    {
      id: "ta1",
      type: "terra",
      jour: "Jeudi 14 — après-midi",
      emoji: "🎮",
      titre: "Pic nic douille, c'est toi la pigouille",
      poiz: "Zarthus",
      theme: "Nature & Biodiversité",
      distance: "1,5 km",
      duree: "1h",
      difficulte: "1/5",
      terrain: "1/5",
      depart: "Quais de Coulon (79510)",
      maps: mapsUrl(46.3233, -0.5861, "Départ TA Coulon quais"),
      liens: [
        { label: "🎮 Terra Aventura", url: "https://www.terra-aventura.fr/parcours?field_department=79&title=pic+nic+douille" },
        { label: "Tourisme 79", url: "https://www.tourisme-deux-sevres.com/activite/geocaching-terra-aventura-pic-nic-douille-cest-toi-la-pigouille/" }
      ],
      description: "Le parcours d'entrée en matière idéal. Avec Zarthus pour guide, on part à la découverte des ruelles et des bords de Sèvre de Coulon — 1,5 km de charme maraîchin, de maisons colorées et de canaux. Court, doux, accessible en poussette. Le chien est le bienvenu, et les filles peuvent souffler entre deux énigmes.",
      poi: [
        "🏘️ Ruelles maraîchines de Coulon — maisons colorées, volets bois, jardinières fleuries",
        "🌿 Bords de Sèvre Niortaise — chemin de halage, barques traditionnelles amarrées",
        "⛵ Quais historiques — point de départ des bateliers, vue sur les canaux",
        "💡 Bonus : le mot mystère donne droit à un tarif réduit à la Maison du Marais"
      ],
      alertes: []
    },
    {
      id: "ta2",
      type: "terra",
      jour: "Samedi 16 — matin",
      emoji: "🎮",
      titre: "Flamme Bleue en Venise Verte",
      poiz: "Zécolo",
      theme: "Sites préservés & Écologie",
      distance: "6 km",
      duree: "2h à 3h",
      difficulte: "3/5",
      terrain: "2/5",
      depart: "Lavoir de la Grande Fontaine — Saint-Georges-de-Rex (79210)",
      maps: mapsUrl(46.270, -0.540, "Lavoir Grande Fontaine Saint-Georges-de-Rex"),
      liens: [
        { label: "🎮 Terra Aventura", url: "https://www.terra-aventura.fr/parcours?field_department=79&title=flamme+bleue" },
        { label: "Niort Marais Tourisme", url: "https://www.niortmaraispoitevin.com/activites/geocaching-terra-aventura-flamme-bleue-en-venise-verte/" }
      ],
      description: "Le grand parcours du séjour — celui qu'on racontera au retour. Avec Zécolo, on s'enfonce dans les conches, ces bras de canaux où la végétation se referme au-dessus de la tête. Chemins ombragés, marais sauvage, énigmes à résoudre au milieu du silence. 3/5 en difficulté : quelques passages bourbeux possible, les bottes ou chaussures imperméables s'imposent. Le chien est dans son élément.",
      poi: [
        "🌿 Conches du marais — bras de canaux envahis de végétation, reflets d'eau verte",
        "🌳 Frênes têtards — arbres taillés depuis des siècles, figure emblématique du marais",
        "🐦 Hérons cendrés, aigrettes, martin-pêcheurs — discrets mais présents sur les berges",
        "⛲ Lavoir de la Grande Fontaine — patrimoine villageois XIXe, départ du parcours",
        "🌾 Prairies humides — horizon plat à 360°, paysage ouvert sur le marais desséché"
      ],
      alertes: [
        "⚠️ Bottes conseillées par temps de pluie",
        "⚠️ Accès interdit en cas d'évail (crue) — vérifier avant de partir",
        "⚠️ Vérifier dates de battues au gibier : mairie de Saint-Georges-de-Rex"
      ]
    },
    {
      id: "ta3",
      type: "terra",
      jour: "Samedi 16 — après-midi",
      emoji: "🎮",
      titre: "Maraîchin contre Bras Rouge !",
      poiz: "Zisséo",
      theme: "Patrimoine maritime",
      distance: "2,5 km",
      duree: "1h à 1h30",
      difficulte: "2/5",
      terrain: "1/5",
      depart: "Parking Espace du Bief — Magné (79460)",
      maps: mapsUrl(46.340, -0.527, "Parking Espace du Bief Magné"),
      liens: [
        { label: "🎮 Terra Aventura", url: "https://www.terra-aventura.fr/parcours?field_department=79&title=maraichin+bras+rouge" },
        { label: "Tourisme 79", url: "https://www.tourisme-deux-sevres.com/geocaching-terra-aventura-maraichin-contre-bras-rouge/magne/ascaqu079v502wq5" }
      ],
      description: "Zisséo est parti pêcher, mais le Bras Rouge rôde. Le sentier «De port en port» se suit grâce à des balises métalliques au sol — plat, large, possible en poussette. Court et fun, idéal pour finir la journée en légèreté quand les jambes ont déjà donné le matin.",
      poi: [
        "⚓ Sentier «De port en port» — balises métalliques, patrimoine portuaire maraîchin",
        "🏚️ Anciens ports de chargement — traces de l'activité marchande du XIXe",
        "🌊 Bords de Sèvre Niortaise — vues sur le fleuve, barques amarrées aux berges",
        "🐟 Zones de pêche traditionnelle — nasses, épuisettes, gestes ancestraux"
      ],
      alertes: []
    },
    {
      id: "viso1",
      type: "visorando",
      jour: "Dimanche 17 — matin",
      emoji: "🥾",
      titre: "Balade libre à Damvix",
      distance: "~2 km",
      duree: "~1h",
      difficulte: "Très facile",
      depart: "Place André Audouin — Damvix",
      maps: mapsGoo("https://maps.app.goo.gl/ZHpVhHjqBYCsMHSb9", 46.379, -0.737, "Parking Damvix Place Audouin"),
      liens: [
        { label: "🗺️ Visorando Damvix (~6km si énergie)", url: "https://www.visorando.com/randonnee-damvix.html" }
      ],
      description: "Le dernier matin, en douceur. Damvix le dimanche, c'est le calme absolu — ruelles pavées, maisons maraîchines basses, canaux qui longent les jardins. On flâne, le chien choisit le chemin, les enfants découvrent la boulangerie. Si les jambes sont encore là, la boucle Visorando Damvix/Bazoin (~6 km) longe les canaux jusqu'au Bazoin.",
      poi: [
        "⛵ Port de Damvix — dernier port actif du marais mouillé, barques plates amarrées",
        "🏘️ Ruelles pavées — maisons basses, jardins sur l'eau, volets colorés",
        "🌿 Canal du Bazoin (option rando) — aulnes, frênes, passerelles sur les bras d'eau",
        "🥖 Boulangerie + traiteur + supérette — ravitaillement possible avant la route"
      ],
      alertes: []
    }
  ],

  checklist: [
    { id: 1,  categorie: "📞 Réservations", texte: "Réserver barque Mont Faucon — ven 15 aprem ☎️ 05 49 26 04 09 · confirmer chien à bord", fait: false },
    { id: 2,  categorie: "📞 Réservations", texte: "Réserver La Passerelle Coulon — ven 15 soir, terrasse chien ☎️ 05 49 35 80 03", fait: false },
    { id: 3,  categorie: "🎮 Terra Aventura", texte: "Télécharger parcours Coulon hors connexion (Pic nic douille)", fait: false },
    { id: 4,  categorie: "🎮 Terra Aventura", texte: "Télécharger parcours St-Georges hors connexion (Flamme Bleue)", fait: false },
    { id: 5,  categorie: "🎮 Terra Aventura", texte: "Télécharger parcours Magné hors connexion (Bras Rouge)", fait: false },
    { id: 6,  categorie: "📱 Apps", texte: "Visorando — télécharger GPX Damvix (option dim matin)", fait: false },
    { id: 7,  categorie: "📱 Apps", texte: "Camping-Car Park ou Parkfornight — télécharger", fait: false },
    { id: 8,  categorie: "📱 Apps", texte: "Météo France — ajouter Coulon (INSEE 79430)", fait: false },
    { id: 9,  categorie: "🐕 Chien", texte: "Gamelle pliable + eau en stock", fait: false },
    { id: 10, categorie: "🐕 Chien", texte: "Laisse courte pour les parcours", fait: false },
    { id: 11, categorie: "🐕 Chien", texte: "Sacs à déjections", fait: false },
    { id: 12, categorie: "🐕 Chien", texte: "Répulsif moustiques — surtout le soir en bord de canal", fait: false },
    { id: 13, categorie: "🐕 Chien", texte: "Chaussures imperméables — TA Flamme Bleue sam matin", fait: false }
  ],

  jours: [

    // ─────────────────────────────────
    // JEUDI 14 — Route + arrivée douce
    // ─────────────────────────────────
    {
      id: "j1", numero: 1,
      label: "Jeudi 14 mai",
      titre: "On arrive",
      emoji: "🚐",
      km_balade: "~3 km · journée tranquille",
      ambiance: "Arrivée en douceur. On pose les sacs, on respire, on découvre.",
      etapes: [
        {
          id: "j1-1", plage: "matin", heure: "09h30",
          titre: "Départ Asques",
          description: "Pique-nique du midi dans le sac. La route est belle, ~2h15 via A10 puis N11 — c'est plat et direct.",
          type: "trajet",
          maps: mapsUrl(44.8903, 0.4278, "Asques 33240"),
          liens: [], tag: null
        },
        {
          id: "j1-2", plage: "midi", heure: "12h00",
          titre: "Arrivée — Aire CC Coulon",
          description: "Installation. L'aire est ombragée, à 5 minutes des quais à pied. On prend le temps.",
          type: "hebergement",
          maps: mapsGoo("https://maps.app.goo.gl/6LoNAZdViieS8uG17", 46.3247, -0.5868, "Aire CC Coulon"),
          liens: [], tag: null
        },
        {
          id: "j1-3", plage: "midi", heure: "12h30",
          titre: "Pique-nique — Quais de Coulon",
          description: "Premier contact avec le marais. Les barques glissent, la Sèvre est là, le village fleuri aussi. On mange sur les bancs en regardant passer les canaux.",
          type: "repas",
          maps: mapsGoo("https://maps.app.goo.gl/HPGY1cZLr2yXBV1F9", 46.3233, -0.5861, "Quais de Coulon"),
          liens: [], tag: "🐕 Chien OK"
        },
        {
          id: "j1-4", plage: "aprem", heure: "14h00",
          titre: "🎮 Terra Aventura — Pic nic douille",
          description: "1,5 km · ~1h · Dif 1/5. Le parcours d'entrée en matière parfait. On part en chasse d'indices dans les ruelles de Coulon avec Zarthus. Court, fun, accessible à tout le monde. Le chien choisit le rythme.",
          type: "activite",
          maps: mapsUrl(46.3233, -0.5861, "Départ TA Coulon quais"),
          liens: [
            { label: "🎮 Terra Aventura", url: "https://www.terra-aventura.fr/parcours?field_department=79&title=pic+nic+douille" }
          ],
          tag: "Terra Aventura"
        },
        {
          id: "j1-5", plage: "aprem", heure: "15h30",
          titre: "☕ Goûter — Boulangerie de Coulon",
          description: "Une pause méritée. Boulangerie locale, terrasse si le soleil est là.",
          type: "repas",
          maps: null, liens: [], tag: null
        },
        {
          id: "j1-6", plage: "aprem", heure: "16h30",
          titre: "🐾 Balade — Chemin de halage",
          description: "~1,5 km · ~30-40 min. On longe la Sèvre sans objectif précis. Le chien se défoule, les filles traînent les pieds ou courent — selon l'humeur. Le marais commence à chuchoter.",
          type: "balade",
          maps: mapsGoo("https://maps.app.goo.gl/HPGY1cZLr2yXBV1F9", 46.3233, -0.5861, "Halage Coulon bords de Sèvre"),
          liens: [], tag: "🐕 Chien OK"
        },
        {
          id: "j1-7", plage: "soir", heure: "19h00",
          titre: "Retour — Aire CC Coulon",
          description: "On rentre, on s'installe, on souffles. Nuit sur place.",
          type: "hebergement",
          maps: mapsGoo("https://maps.app.goo.gl/6LoNAZdViieS8uG17", 46.3247, -0.5868, "Aire CC Coulon"),
          liens: [], tag: null
        },
        {
          id: "j1-8", plage: "soir", heure: "19h30",
          titre: "Dîner — à bord",
          description: "Repas préparé maison. On mange dans le CC ou dehors si la météo le permet.",
          type: "repas",
          maps: null, liens: [], tag: null
        }
      ]
    },

    // ─────────────────────────────────
    // VENDREDI 15 — La Garette + Barque + Resto
    // ─────────────────────────────────
    {
      id: "j2", numero: 2,
      label: "Vendredi 15 mai",
      titre: "La journée carte postale",
      emoji: "🚣",
      km_balade: "~3 km · barque comprise",
      ambiance: "Le village le plus photogénique du marais, et une barque sur les canaux. La journée qu'on garde en mémoire.",
      etapes: [
        {
          id: "j2-1", plage: "matin", heure: "08h30",
          titre: "Petit-déjeuner — CC",
          description: "On prend le temps. Café chaud, sortie chien bords de Sèvre. Pique-nique préparé pour midi.",
          type: "routine",
          maps: null, liens: [], tag: "🐕 Chien OK"
        },
        {
          id: "j2-2", plage: "matin", heure: "10h00",
          titre: "Trajet — La Garette",
          description: "~8 km · 12 min depuis Coulon. On roule doucement.",
          type: "trajet",
          maps: mapsUrl(46.308, -0.602, "La Garette Sansais"),
          liens: [], tag: null
        },
        {
          id: "j2-3", plage: "matin", heure: "10h15",
          titre: "🏘️ Balade — La Garette",
          description: "~2 km · ~45 min. Une longue rue piétonne bordée de maisons de pêcheurs, chacune avec son petit embarcadère privé côté canal. La passerelle en bois sur pilotis, le barrage-écluse du Chail, le silence. Le chien peut tracer le long des berges. C'est joli, vraiment.",
          type: "balade",
          maps: mapsUrl(46.308, -0.602, "La Garette village"),
          liens: [
            { label: "🗺️ Visorando La Garette→Coulon", url: "https://www.visorando.com/randonnee-la-venise-verte-la-garette-coulon/" }
          ],
          tag: "🐕 Chien OK"
        },
        {
          id: "j2-4", plage: "midi", heure: "12h00",
          titre: "Pique-nique — La Garette ou Monfaucon",
          description: "On mange sur place à La Garette ou en route vers l'embarcadère de Mont Faucon.",
          type: "repas",
          maps: mapsGoo("https://maps.app.goo.gl/DAHZ9CgurSZX6fyM8", 46.265, -0.618, "Aire pique-nique Monfaucon"),
          liens: [], tag: null
        },
        {
          id: "j2-5", plage: "aprem", heure: "13h00",
          titre: "Trajet — Port de Mont Faucon",
          description: "~18 km · 20 min depuis La Garette. Direction Saint-Hilaire-la-Palud.",
          type: "trajet",
          maps: mapsGoo("https://maps.app.goo.gl/AuBjhgGa9YUoCCqL7", 46.265, -0.618, "Embarcadère Mont Faucon"),
          liens: [], tag: null
        },
        {
          id: "j2-6", plage: "aprem", heure: "13h30",
          titre: "🚣 Barque guidée — Mont Faucon",
          description: "~1h30. Une plate traditionnelle guidée par un batelier local. Les canaux se resserrent, les frênes têtards forment une voûte au-dessus de l'eau, les hérons décollent en silence. C'est lent, doux, magnifique.\n\n☀️ Si beau temps et chien accepté.\n\n⛅ Plan B pluie / chien refusé → flânerie libre à Coulon + goûter en terrasse.",
          type: "activite",
          maps: mapsGoo("https://maps.app.goo.gl/AuBjhgGa9YUoCCqL7", 46.265, -0.618, "Embarcadère Mont Faucon"),
          liens: [
            { label: "📞 Réserver ☎️ 05 49 26 04 09", url: "tel:0549260409" }
          ],
          tag: "📞 Réserver à l'avance"
        },
        {
          id: "j2-7", plage: "aprem", heure: "15h15",
          titre: "Retour Coulon — détente quais",
          description: "On rentre tranquillement. On flâne sur les quais, on regarde les barques, on recharge les batteries avant le dîner.",
          type: "balade",
          maps: mapsGoo("https://maps.app.goo.gl/HPGY1cZLr2yXBV1F9", 46.3233, -0.5861, "Quais de Coulon"),
          liens: [], tag: "🐕 Chien OK"
        },
        {
          id: "j2-8", plage: "soir", heure: "19h30",
          titre: "🍽️ Dîner — La Passerelle",
          description: "86 Quai Louis Tardy, 79510 Coulon. Terrasse bords de Sèvre, vue sur les barques. Anguille, mogettes, fromages locaux. Le chien en terrasse — à confirmer à la réservation.",
          type: "repas",
          maps: mapsGoo("https://maps.app.goo.gl/RpNqHFQR2UBm8KW7A", 46.3233, -0.5880, "La Passerelle Coulon"),
          liens: [
            { label: "📞 Réserver ☎️ 05 49 35 80 03", url: "tel:0549358003" }
          ],
          tag: "📞 Réserver terrasse chien"
        },
        {
          id: "j2-9", plage: "soir", heure: "21h30",
          titre: "Retour — Aire CC Coulon",
          description: "Nuit sur place, dernière à Coulon.",
          type: "hebergement",
          maps: mapsGoo("https://maps.app.goo.gl/6LoNAZdViieS8uG17", 46.3247, -0.5868, "Aire CC Coulon"),
          liens: [], tag: null
        }
      ]
    },

    // ─────────────────────────────────
    // SAMEDI 16 — 2 TA + Arçais
    // ─────────────────────────────────
    {
      id: "j3", numero: 3,
      label: "Samedi 16 mai",
      titre: "La grande journée TA",
      emoji: "🎮",
      km_balade: "~8-9 km · avec pauses",
      ambiance: "Le grand parcours le matin, le petit l'après-midi. On finit en beauté à Arçais.",
      etapes: [
        {
          id: "j3-1", plage: "matin", heure: "08h30",
          titre: "Petit-déjeuner + sacs",
          description: "Chaussures imperméables ou bottes — le TA Flamme Bleue peut être boueux. Eau, gamelle chien, pique-nique dans le sac. On part à 10h.",
          type: "routine",
          maps: null, liens: [], tag: null
        },
        {
          id: "j3-2", plage: "matin", heure: "10h00",
          titre: "Trajet — Saint-Georges-de-Rex",
          description: "~15 km · 20 min depuis Coulon. Dernier trajet depuis l'aire de Coulon.",
          type: "trajet",
          maps: mapsUrl(46.270, -0.540, "Lavoir Grande Fontaine Saint-Georges-de-Rex"),
          liens: [], tag: null
        },
        {
          id: "j3-3", plage: "matin", heure: "10h15",
          titre: "🎮 Terra Aventura — Flamme Bleue en Venise Verte",
          description: "6 km · 2h à 3h · Dif 3/5. Le grand parcours du séjour — celui qu'on racontera. Conches, frênes têtards, chemins qui se perdent dans le vert. Énigmes à résoudre, marais à traverser. On prend le temps, on fait des pauses.",
          type: "activite",
          maps: mapsUrl(46.270, -0.540, "Lavoir Grande Fontaine Saint-Georges-de-Rex"),
          liens: [
            { label: "🎮 Terra Aventura", url: "https://www.terra-aventura.fr/parcours?field_department=79&title=flamme+bleue" },
            { label: "Niort Marais Tourisme", url: "https://www.niortmaraispoitevin.com/activites/geocaching-terra-aventura-flamme-bleue-en-venise-verte/" }
          ],
          tag: "Terra Aventura ⚠️ Bottes si pluie"
        },
        {
          id: "j3-4", plage: "midi", heure: "12h30",
          titre: "Pique-nique — Lavoir ou herbe",
          description: "Tables de pique-nique au lavoir ou sous les arbres à l'entrée du village. On souffle.",
          type: "repas",
          maps: mapsUrl(46.270, -0.540, "Lavoir Saint-Georges-de-Rex"),
          liens: [], tag: null
        },
        {
          id: "j3-5", plage: "aprem", heure: "14h00",
          titre: "Trajet — Magné",
          description: "~12 km · 15 min. Direction parking Espace du Bief.",
          type: "trajet",
          maps: mapsUrl(46.340, -0.527, "Parking Espace du Bief Magné"),
          liens: [], tag: null
        },
        {
          id: "j3-6", plage: "aprem", heure: "14h15",
          titre: "🎮 Terra Aventura — Maraîchin contre Bras Rouge",
          description: "2,5 km · 1h · Dif 2/5. Le format léger de l'après-midi. Sentier «De port en port» balisé au sol, plat, large. Fun et accessible même pour des jambes un peu fatiguées. Le Bras Rouge ne fait pas vraiment peur.",
          type: "activite",
          maps: mapsUrl(46.340, -0.527, "Parking Espace du Bief Magné"),
          liens: [
            { label: "🎮 Terra Aventura", url: "https://www.terra-aventura.fr/parcours?field_department=79&title=maraichin+bras+rouge" },
            { label: "Tourisme 79", url: "https://www.tourisme-deux-sevres.com/geocaching-terra-aventura-maraichin-contre-bras-rouge/magne/ascaqu079v502wq5" }
          ],
          tag: "Terra Aventura"
        },
        {
          id: "j3-7", plage: "aprem", heure: "15h30",
          titre: "☕ Goûter — Boulangerie Magné",
          description: "Boulangerie à Magné (270 avenue Marais Poitevin) — ou on attend Arçais si l'envie prend.",
          type: "repas",
          maps: mapsUrl(46.3385, -0.5280, "Boulangerie Magné"),
          liens: [], tag: null
        },
        {
          id: "j3-8", plage: "aprem", heure: "16h15",
          titre: "Trajet + installation — Arçais",
          description: "~8 km · 10 min. On rejoint l'aire d'Arçais pour la nuit.",
          type: "hebergement",
          maps: mapsGoo("https://maps.app.goo.gl/a9yS9skjTY4Dqy12A", 46.2990, -0.5418, "Aire CC Arçais"),
          liens: [], tag: null
        },
        {
          id: "j3-9", plage: "aprem", heure: "17h00",
          titre: "🏘️ Flânerie — Port d'Arçais",
          description: "On pose les vélos (ou les pieds) et on flâne. Port pittoresque, venelles, maisons maraîchines, deux répliques de grues en bois sur le quai. Le chien court le long du chemin de halage. Boutiques artisanat en saison.",
          type: "balade",
          maps: mapsGoo("https://maps.app.goo.gl/kpFHqhJpEcmAQqME7", 46.299, -0.541, "Port d'Arçais"),
          liens: [
            { label: "📍 Chemin de halage Arçais", url: "https://maps.app.goo.gl/dhiFmwyBkANkw69MA" }
          ],
          tag: "🐕 Chien OK"
        },
        {
          id: "j3-10", plage: "soir", heure: "19h30",
          titre: "Dîner — à bord · Nuit Arçais",
          description: "Aire CC Arçais — 26 Rue du Marais, 79210 Arçais. ~11,50€/nuit. Électricité, sanitaires, WiFi. Supérette à 300m. Calme, bien noté.",
          type: "repas",
          maps: mapsGoo("https://maps.app.goo.gl/a9yS9skjTY4Dqy12A", 46.2990, -0.5418, "Aire CC Arçais"),
          liens: [], tag: null
        }
      ]
    },

    // ─────────────────────────────────
    // DIMANCHE 17 — Damvix + route
    // ─────────────────────────────────
    {
      id: "j4", numero: 4,
      label: "Dimanche 17 mai",
      titre: "Damvix, et on rentre",
      emoji: "🏠",
      km_balade: "~2 km balade libre · option ~6 km Visorando",
      ambiance: "Le dernier matin. On prend le temps, on respire encore un peu, et on rentre heureux.",
      etapes: [
        {
          id: "j4-1", plage: "matin", heure: "08h30",
          titre: "Petit-déjeuner — CC",
          description: "Service CC si besoin. Pique-nique de route préparé. Dernier café dans le calme d'Arçais.",
          type: "routine",
          maps: null, liens: [], tag: null
        },
        {
          id: "j4-2", plage: "matin", heure: "10h00",
          titre: "Trajet — Damvix",
          description: "~20 km · 25 min depuis Arçais. Dernier village du séjour.",
          type: "trajet",
          maps: mapsGoo("https://maps.app.goo.gl/ZHpVhHjqBYCsMHSb9", 46.379, -0.737, "Parking Damvix Place Audouin"),
          liens: [], tag: null
        },
        {
          id: "j4-3", plage: "matin", heure: "10h30",
          titre: "🐾 Balade — Damvix",
          description: "Ruelles pavées, maisons maraîchines basses, canaux qui longent les jardins. Le dimanche matin, c'est calme absolu — on croise le boulanger et les chats. Le chien choisit la direction.\n\nSi énergie : Visorando Boucle Damvix/Bazoin (~6 km · 1h45) pour longer les canaux jusqu'au Bazoin.",
          type: "balade",
          maps: mapsGoo("https://maps.app.goo.gl/ZHpVhHjqBYCsMHSb9", 46.379, -0.737, "Centre Damvix"),
          liens: [
            { label: "📍 Port de Damvix", url: "https://maps.apple.com/?q=Port+Damvix&ll=46.379,-0.737&z=15" },
            { label: "🗺️ Visorando Damvix (~6km)", url: "https://www.visorando.com/randonnee-damvix.html" }
          ],
          tag: "🐕 Chien OK"
        },
        {
          id: "j4-4", plage: "midi", heure: "11h30",
          titre: "Route retour — Asques",
          description: "Via A83/A10 · ~240 km · ~2h30. On s'arrête quelque part manger.",
          type: "trajet",
          maps: mapsUrl(44.8903, 0.4278, "Asques 33240"),
          liens: [], tag: null
        },
        {
          id: "j4-5", plage: "midi", heure: "12h30",
          titre: "Pique-nique — Aire de repos",
          description: "Une aire avec de l'herbe, de la place pour le chien. On prend le temps avant la dernière ligne droite.",
          type: "repas",
          maps: null, liens: [], tag: null
        },
        {
          id: "j4-6", plage: "aprem", heure: "14h30",
          titre: "Retour Asques 🏠",
          description: "La maison.",
          type: "arrivee",
          maps: mapsUrl(44.8903, 0.4278, "Asques 33240"),
          liens: [], tag: null
        }
      ]
    }
  ]
};
