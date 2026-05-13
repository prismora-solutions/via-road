// ============================================================
// ViaRoad — Données du séjour
// Remplacer plus tard par fetch() vers Google Sheets
// ============================================================

// Lien Maps optimisé iPhone :
// google.com/maps/search ouvre l'app Google Maps si installée, sinon le navigateur
// maps.apple.com en fallback natif iOS
function mapsUrl(lat, lng, label) {
  const enc = encodeURIComponent(label || '');
  return {
    google: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
    apple:  `https://maps.apple.com/?q=${enc}&ll=${lat},${lng}&z=16`,
    label:  label || ''
  };
}

// Pour les liens goo.gl existants et vérifiés
function mapsGoo(gooUrl, lat, lng, label) {
  const enc = encodeURIComponent(label || '');
  return {
    google: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
    apple:  `https://maps.apple.com/?q=${enc}&ll=${lat},${lng}&z=16`,
    label:  label || ''
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
    maps: mapsGoo(null, 46.3230, -0.5892, "Aire CC Coulon 42 rue de l'Autremont")
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
      maps: mapsUrl(46.3233, -0.5861, "Quais de Coulon départ TA"),
      liens: [
        { label: "Tourisme 79", url: "https://www.tourisme-deux-sevres.com/activite/geocaching-terra-aventura-pic-nic-douille-cest-toi-la-pigouille/" }
      ],
      description: "Le parcours d'entrée en matière idéal. Avec Zarthus pour guide, on part à la découverte des ruelles et des bords de Sèvre de Coulon — 1,5 km de charme maraîchin, de maisons colorées et de canaux. Court, doux, accessible à tout le monde. Le chien est le bienvenu. 💡 Bonus : le mot mystère donne droit à un tarif réduit sur place.",
      poi: [
        "🏘️ Ruelles maraîchines de Coulon — maisons colorées, volets bois, jardinières fleuries",
        "🌿 Bords de Sèvre Niortaise — chemin de halage, barques traditionnelles amarrées",
        "⛵ Quais historiques — embarcadères, point de départ des bateliers",
        "💡 Bonus : le mot mystère = tarif réduit à la Maison du Marais"
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
        { label: "Niort Marais Tourisme", url: "https://www.niortmaraispoitevin.com/activites/geocaching-terra-aventura-flamme-bleue-en-venise-verte/" }
      ],
      description: "Le grand parcours du séjour — celui qu'on racontera au retour. Avec Zécolo, on s'enfonce dans les conches, ces bras de canaux où la végétation se referme au-dessus de la tête. Chemins ombragés, marais sauvage, énigmes à résoudre dans le silence. 3/5 en difficulté : quelques passages bourbeux possibles, les chaussures imperméables ou bottes s'imposent. Le chien est dans son élément.",
      poi: [
        "🌿 Conches du marais — bras de canaux envahis de végétation, reflets d'eau verte",
        "🌳 Frênes têtards — arbres taillés depuis des siècles, emblème du marais",
        "🐦 Hérons cendrés, aigrettes, martin-pêcheurs — discrets mais présents sur les berges",
        "⛲ Lavoir de la Grande Fontaine — patrimoine villageois XIXe, départ du parcours",
        "🌾 Prairies humides — horizon à 360°, paysage ouvert sur le marais desséché"
      ],
      alertes: [
        "⚠️ Chaussures imperméables ou bottes — passages bourbeux possible",
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
        { label: "Tourisme 79", url: "https://www.tourisme-deux-sevres.com/geocaching-terra-aventura-maraichin-contre-bras-rouge/magne/ascaqu079v502wq5" }
      ],
      description: "Zisséo est parti pêcher, mais le Bras Rouge rôde sur les berges de la Sèvre. Le sentier «De port en port» se suit grâce à des balises métalliques au sol — plat, large, sans surprise. Court et fun, idéal pour finir la journée en légèreté quand les jambes ont déjà donné le matin.",
      poi: [
        "⚓ Sentier «De port en port» — balises métalliques, patrimoine portuaire maraîchin",
        "🏚️ Anciens ports de chargement — traces du commerce du XIXe sur la Sèvre",
        "🌊 Bords de Sèvre Niortaise — vues dégagées sur le fleuve, barques amarrées",
        "🐟 Zones de pêche traditionnelle — nasses, épuisettes, gestes ancestraux"
      ],
      alertes: []
    },
    {
      id: "viso1",
      type: "visorando",
      jour: "Dimanche 17 — matin",
      emoji: "🥾",
      titre: "Le Marais Poitevin à Arçais",
      distance: "~10 km (demi-tour possible à tout moment)",
      duree: "~2h30 · selon allure",
      difficulte: "Facile",
      depart: "Parking Arçais — à définir au départ",
      maps: mapsUrl(46.299, -0.541, "Arçais départ rando Visorando"),
      liens: [
        { label: "🗺️ Visorando Arçais", url: "https://www.visorando.com/randonnee-le-marais-poitevin-a-arcais/" }
      ],
      description: "La grande boucle depuis Arçais, le long des canaux du marais mouillé. 10 km sur le papier, mais le terrain est plat et le rythme est libre — on fait demi-tour quand on veut, on s'arrête où on veut. Prairies, conches, maisons sur l'eau, silence. Le dernier grand bol d'air avant la route.",
      poi: [
        "⛵ Port d'Arçais — point de départ, barques plates, quais maraîchins",
        "🌿 Canaux du marais mouillé — végétation dense, reflets, silence absolu",
        "🏘️ Hameaux sur l'eau — maisons basses aux jardins sur les berges",
        "🌾 Prairies humides — horizon dégagé, vols de hérons, odeur de terre mouillée",
        "🥖 Boulangerie + supérette Arçais — ravitaillement avant de partir"
      ],
      alertes: [
        "ℹ️ Demi-tour possible à tout moment — pas d'obligation de boucler"
      ]
    }
  ],

  checklist: [
    { id: 1,  categorie: "📞 Réservations", texte: "Réserver barque Montfaucon — ven aprem ☎️ 05 49 35 34 97 · confirmer chien (animaux bienvenus ✅)", fait: false },
    { id: 2,  categorie: "📞 Réservations", texte: "Réserver La Passerelle Coulon — ven soir, animaux bienvenus ✅ ☎️ 05 49 35 80 03", fait: false },
    { id: 3,  categorie: "🎮 Terra Aventura", texte: "Télécharger parcours Coulon hors connexion dans l'app (Pic nic douille)", fait: false },
    { id: 4,  categorie: "🎮 Terra Aventura", texte: "Télécharger parcours St-Georges hors connexion (Flamme Bleue)", fait: false },
    { id: 5,  categorie: "🎮 Terra Aventura", texte: "Télécharger parcours Magné hors connexion (Bras Rouge)", fait: false },
    { id: 6,  categorie: "📱 Apps", texte: "Visorando — télécharger GPX Arçais (dim matin)", fait: false },
    { id: 7,  categorie: "📱 Apps", texte: "Camping-Car Park — télécharger + inscription si besoin", fait: false },
    { id: 8,  categorie: "📱 Apps", texte: "Météo France — ajouter Coulon (INSEE 79430)", fait: false },
    { id: 9,  categorie: "🐕 Chien", texte: "Gamelle pliable + eau en stock", fait: false },
    { id: 10, categorie: "🐕 Chien", texte: "Laisse courte pour les parcours", fait: false },
    { id: 11, categorie: "🐕 Chien", texte: "Sacs à déjections", fait: false },
    { id: 12, categorie: "🐕 Chien", texte: "Répulsif moustiques — surtout le soir en bord de canal", fait: false },
    { id: 13, categorie: "🐕 Chien", texte: "Chaussures imperméables pour TA Flamme Bleue (sam matin)", fait: false }
  ],

  jours: [

    // ─────────────────────────────
    // JEUDI 14 — Route + arrivée
    // ─────────────────────────────
    {
      id: "j1", numero: 1,
      label: "Jeudi 14 mai",
      titre: "On arrive",
      emoji: "🚐",
      km_balade: "~3 km · journée douce",
      ambiance: "Arrivée en douceur. On pose les sacs, on respire, on découvre Coulon au rythme du marais.",
      etapes: [
        {
          id: "j1-1", plage: "matin", heure: "09h30",
          titre: "Départ Asques",
          description: "Pique-nique du midi dans le sac. ~2h15 de route via A10 puis N11.",
          type: "trajet",
          maps: mapsUrl(44.8903, 0.4278, "Asques 33240"),
          liens: [], tag: null
        },
        {
          id: "j1-2", plage: "midi", heure: "12h00",
          titre: "Arrivée — Aire CC Coulon",
          description: "42 rue de l'Autremont, 79510 Coulon. 90 emplacements, sol stabilisé, électricité, sanitaires, WiFi. À 500m des quais à pied. On prend le temps de s'installer.",
          type: "hebergement",
          maps: mapsGoo(null, 46.3230, -0.5892, "Aire CC Coulon 42 rue Autremont"),
          liens: [
            { label: "Camping-Car Park", url: "https://www.campingcarpark.com/fr_FR/camping-car/nouvelle-aquitaine/deux-sevres/coulon" }
          ],
          tag: null
        },
        {
          id: "j1-3", plage: "midi", heure: "12h30",
          titre: "Pique-nique — Quais de Coulon",
          description: "On rejoint les quais à pied (500m). Bancs face à la Sèvre, barques qui glissent, village fleuri. Premier contact avec le marais.",
          type: "repas",
          maps: mapsUrl(46.3233, -0.5861, "Quais de Coulon"),
          liens: [], tag: "🐕 Chien OK"
        },
        {
          id: "j1-4", plage: "aprem", heure: "14h00",
          titre: "🎮 Terra Aventura — Pic nic douille",
          description: "1,5 km · ~1h · Dif 1/5. Le parcours d'entrée en matière parfait. On part chasser des indices dans les ruelles de Coulon avec Zarthus. Court, fun, tout le monde suit. Le chien choisit le rythme.",
          type: "activite",
          maps: mapsUrl(46.3233, -0.5861, "Départ TA Coulon quais"),
          liens: [
            { label: "Tourisme 79", url: "https://www.tourisme-deux-sevres.com/activite/geocaching-terra-aventura-pic-nic-douille-cest-toi-la-pigouille/" }
          ],
          tag: "Terra Aventura"
        },
        {
          id: "j1-5", plage: "aprem", heure: "15h30",
          titre: "🐾 Balade — Chemin de halage",
          description: "~1,5 km · ~30-40 min le long de la Sèvre. On longe l'eau sans objectif. Le chien se défoule, on regarde les barques passer. Premier souffle de marais.",
          type: "balade",
          maps: mapsUrl(46.3233, -0.5861, "Chemin de halage Coulon Sèvre"),
          liens: [], tag: "🐕 Chien OK"
        },
        {
          id: "j1-6", plage: "soir", heure: "18h30",
          titre: "Retour — Aire CC",
          description: "Retour à pied (500m). On s'installe, on souffle. Nuit sur place.",
          type: "hebergement",
          maps: mapsGoo(null, 46.3230, -0.5892, "Aire CC Coulon"),
          liens: [], tag: null
        },
        {
          id: "j1-7", plage: "soir", heure: "19h30",
          titre: "Dîner — à bord",
          description: "Repas préparé maison. Dehors si la météo le permet.",
          type: "repas",
          maps: null, liens: [], tag: null
        }
      ]
    },

    // ─────────────────────────────
    // VENDREDI 15 — La Garette + Barque + Resto
    // ─────────────────────────────
    {
      id: "j2", numero: 2,
      label: "Vendredi 15 mai",
      titre: "La journée carte postale",
      emoji: "🚣",
      km_balade: "~3-4 km · journée riche",
      ambiance: "La Garette le matin, la barque l'après-midi, La Passerelle le soir. La journée qu'on garde.",
      etapes: [
        {
          id: "j2-1", plage: "matin", heure: "08h30",
          titre: "Petit-déjeuner — CC",
          description: "Café chaud, sortie chien bords de Sèvre. On prépare le pique-nique pour midi. Décollage vers 10h.",
          type: "routine",
          maps: null, liens: [], tag: "🐕 Chien OK"
        },
        {
          id: "j2-2", plage: "matin", heure: "10h00",
          titre: "Trajet — La Garette",
          description: "~8 km · ~12 min depuis Coulon. On longe la Sèvre par la D1.",
          type: "trajet",
          maps: mapsUrl(46.308, -0.602, "La Garette Sansais parking"),
          liens: [], tag: null
        },
        {
          id: "j2-3", plage: "matin", heure: "10h15",
          titre: "🏘️ Balade — La Garette",
          description: "Village emblématique du marais. Une longue rue piétonne — pas de voitures — bordée de maisons de pêcheurs avec chacune son embarcadère privé côté canal. La passerelle en bois sur pilotis, le barrage-écluse du Chail. Le chien trace librement sur les berges.\n\n☀️ Si jambes vaillantes : Visorando La Garette→Coulon (9,6 km, 2h45) le long de la Sèvre — vous finissez à Coulon, il faut revenir chercher le CC.",
          type: "balade",
          maps: mapsUrl(46.308, -0.602, "La Garette village rue piétonne"),
          liens: [
            { label: "🗺️ Visorando La Garette→Coulon (option longue)", url: "https://www.visorando.com/randonnee-la-venise-verte-la-garette-coulon/" }
          ],
          tag: "🐕 Chien OK"
        },
        {
          id: "j2-4", plage: "midi", heure: "12h00",
          titre: "Pique-nique — La Garette",
          description: "Bancs ou aire de pique-nique au village. On mange face aux canaux avant de reprendre la route vers Montfaucon.",
          type: "repas",
          maps: mapsUrl(46.308, -0.602, "Aire pique-nique La Garette"),
          liens: [], tag: null
        },
        {
          id: "j2-5", plage: "aprem", heure: "13h00",
          titre: "Trajet — Port de Montfaucon",
          description: "~18 km · ~20 min via D9 direction Saint-Hilaire-la-Palud.",
          type: "trajet",
          maps: mapsUrl(46.2692, -0.7140, "Embarcadère Port de Montfaucon Saint-Hilaire-la-Palud"),
          liens: [], tag: null
        },
        {
          id: "j2-6", plage: "aprem", heure: "13h30",
          titre: "🚣 Barque guidée — Port de Montfaucon",
          description: "~1h à 2h. Une plate traditionnelle guidée à la pigouille. Les canaux se resserrent, les frênes têtards forment une voûte, les hérons décollent en silence. C'est lent, doux, inoubliable.\n\nTarif : ~18€/adulte · 9,50€/enfant · Animaux bienvenus ✅\n\n⛅ Plan B si pluie ou indisponible : flânerie libre à Coulon l'après-midi — quais, ruelles, repos au CC.",
          type: "activite",
          maps: mapsUrl(46.2692, -0.7140, "Embarcadère Port de Montfaucon"),
          liens: [
            { label: "🌐 Site officiel embarcadère", url: "https://www.embarcadere-port-montfaucon.fr/" },
            { label: "📞 Réserver ☎️ 05 49 35 34 97", url: "tel:0549353497" }
          ],
          tag: "📞 Réserver à l'avance"
        },
        {
          id: "j2-7", plage: "aprem", heure: "15h30",
          titre: "Retour Coulon — quais",
          description: "~25 km · ~30 min retour. On flâne sur les quais, on regarde les barques, on recharge les batteries avant le dîner.",
          type: "balade",
          maps: mapsUrl(46.3233, -0.5861, "Quais de Coulon"),
          liens: [], tag: "🐕 Chien OK"
        },
        {
          id: "j2-8", plage: "soir", heure: "19h30",
          titre: "🍽️ Dîner — La Passerelle",
          description: "86 Quai Louis Tardy, 79510 Coulon. En terrasse face à la Sèvre, vue sur les embarcadères. Spécialités maraîchines : anguilles, mogettes, farci poitevin. Animaux bienvenus en terrasse ✅",
          type: "repas",
          maps: mapsUrl(46.3220, -0.5882, "La Passerelle 86 quai Louis Tardy Coulon"),
          liens: [
            { label: "🌐 Site La Passerelle", url: "https://lapasserelle-coulon.fr/" },
            { label: "📞 Réserver ☎️ 05 49 35 80 03", url: "tel:0549358003" }
          ],
          tag: "🐕 Animaux bienvenus"
        },
        {
          id: "j2-9", plage: "soir", heure: "21h30",
          titre: "Retour — Aire CC Coulon",
          description: "Dernière nuit à Coulon.",
          type: "hebergement",
          maps: mapsGoo(null, 46.3230, -0.5892, "Aire CC Coulon"),
          liens: [], tag: null
        }
      ]
    },

    // ─────────────────────────────
    // SAMEDI 16 — 2 TA + Arçais
    // ─────────────────────────────
    {
      id: "j3", numero: 3,
      label: "Samedi 16 mai",
      titre: "La grande journée TA",
      emoji: "🎮",
      km_balade: "~8-9 km avec pauses",
      ambiance: "Le grand TA le matin, le petit l'après-midi. On finit en flânant à Arçais avant de s'y poser pour la nuit.",
      etapes: [
        {
          id: "j3-1", plage: "matin", heure: "08h30",
          titre: "Petit-déjeuner + préparation",
          description: "Chaussures imperméables ou bottes — passages bourbeux possible sur Flamme Bleue. Eau, pique-nique dans le sac. Décollage vers 10h.",
          type: "routine",
          maps: null, liens: [], tag: null
        },
        {
          id: "j3-2", plage: "matin", heure: "10h00",
          titre: "Trajet — Saint-Georges-de-Rex",
          description: "~15 km · ~20 min depuis Coulon. Dernier trajet depuis l'aire de Coulon.",
          type: "trajet",
          maps: mapsUrl(46.270, -0.540, "Lavoir Grande Fontaine Saint-Georges-de-Rex"),
          liens: [], tag: null
        },
        {
          id: "j3-3", plage: "matin", heure: "10h15",
          titre: "🎮 Terra Aventura — Flamme Bleue en Venise Verte",
          description: "6 km · 2h à 3h · Dif 3/5. Le grand parcours du séjour. Conches, frênes têtards, chemins qui se perdent dans le vert. On prend le temps, on fait des pauses. Le chien adore.",
          type: "activite",
          maps: mapsUrl(46.270, -0.540, "Lavoir Grande Fontaine Saint-Georges-de-Rex"),
          liens: [
            { label: "Niort Marais Tourisme", url: "https://www.niortmaraispoitevin.com/activites/geocaching-terra-aventura-flamme-bleue-en-venise-verte/" }
          ],
          tag: "Terra Aventura ⚠️ Bottes conseillées"
        },
        {
          id: "j3-4", plage: "midi", heure: "13h00",
          titre: "Pique-nique — Lavoir ou herbe",
          description: "Tables de pique-nique au lavoir ou sous les arbres à l'entrée du village. On souffle, on récupère.",
          type: "repas",
          maps: mapsUrl(46.270, -0.540, "Lavoir Saint-Georges-de-Rex"),
          liens: [], tag: null
        },
        {
          id: "j3-5", plage: "aprem", heure: "14h15",
          titre: "Trajet — Magné",
          description: "~12 km · ~15 min. Direction parking Espace du Bief.",
          type: "trajet",
          maps: mapsUrl(46.340, -0.527, "Parking Espace du Bief Magné"),
          liens: [], tag: null
        },
        {
          id: "j3-6", plage: "aprem", heure: "14h30",
          titre: "🎮 Terra Aventura — Maraîchin contre Bras Rouge",
          description: "2,5 km · 1h · Dif 2/5. Le format léger de l'après-midi. Sentier «De port en port» balisé au sol. Plat, large, fun. Parfait pour des jambes qui ont déjà donné le matin.",
          type: "activite",
          maps: mapsUrl(46.340, -0.527, "Parking Espace du Bief Magné"),
          liens: [
            { label: "Tourisme 79", url: "https://www.tourisme-deux-sevres.com/geocaching-terra-aventura-maraichin-contre-bras-rouge/magne/ascaqu079v502wq5" }
          ],
          tag: "Terra Aventura"
        },
        {
          id: "j3-7", plage: "aprem", heure: "16h00",
          titre: "Trajet + installation — Arçais",
          description: "~8 km · ~10 min. On rejoint l'aire d'Arçais pour la nuit. 26 Rue du Marais, 79210 Arçais. ~11,50€/nuit. Électricité, sanitaires, WiFi. Supérette à 300m.",
          type: "hebergement",
          maps: mapsUrl(46.2990, -0.5418, "Aire CC Arçais 26 rue du Marais"),
          liens: [], tag: null
        },
        {
          id: "j3-8", plage: "aprem", heure: "16h30",
          titre: "🏘️ Flânerie — Port d'Arçais",
          description: "Port pittoresque, venelles, maisons maraîchines. Grues en bois sur le quai. Chemin de halage le long de la Sèvre. Boutiques artisanat en saison. On s'arrête où on veut, on ne va nulle part en particulier.",
          type: "balade",
          maps: mapsUrl(46.299, -0.541, "Port d'Arçais"),
          liens: [
            { label: "📍 Chemin de halage Arçais", url: "https://maps.apple.com/?q=Chemin+halage+Arcais&ll=46.300,-0.540&z=15" }
          ],
          tag: "🐕 Chien OK"
        },
        {
          id: "j3-9", plage: "soir", heure: "19h30",
          titre: "Dîner — à bord · Nuit Arçais",
          description: "Repas préparé. Nuit tranquille à l'aire d'Arçais — supérette à 300m si besoin.",
          type: "repas",
          maps: null, liens: [], tag: null
        }
      ]
    },

    // ─────────────────────────────
    // DIMANCHE 17 — Rando Arçais + retour
    // ─────────────────────────────
    {
      id: "j4", numero: 4,
      label: "Dimanche 17 mai",
      titre: "Dernier bol d'air · Route",
      emoji: "🏠",
      km_balade: "~10 km Visorando · demi-tour possible",
      ambiance: "Un grand bol d'air sur les canaux d'Arçais. Pique-nique tardif. Route retour sans pression.",
      etapes: [
        {
          id: "j4-1", plage: "matin", heure: "08h30",
          titre: "Petit-déjeuner — CC",
          description: "Café tranquille. Pique-nique de route préparé. On part à 10h.",
          type: "routine",
          maps: null, liens: [], tag: null
        },
        {
          id: "j4-2", plage: "matin", heure: "10h00",
          titre: "🥾 Visorando — Le Marais Poitevin à Arçais",
          description: "~10 km · ~2h30 · Facile. Départ depuis l'aire ou le port d'Arçais. Boucle le long des canaux du marais mouillé, prairies, conches, silence. Terrain totalement plat.\n\nDemi-tour possible à tout moment — on fait autant qu'on veut.",
          type: "activite",
          maps: mapsUrl(46.299, -0.541, "Départ rando Arçais port"),
          liens: [
            { label: "🗺️ Visorando Arçais", url: "https://www.visorando.com/randonnee-le-marais-poitevin-a-arcais/" }
          ],
          tag: "🐕 Chien OK"
        },
        {
          id: "j4-3", plage: "midi", heure: "12h30",
          titre: "Pique-nique — Bords de canal ou aire",
          description: "On s'installe où c'est joli. Dernier repas au marais — on prend le temps.",
          type: "repas",
          maps: mapsUrl(46.299, -0.541, "Arçais bords de canal"),
          liens: [], tag: null
        },
        {
          id: "j4-4", plage: "aprem", heure: "13h30",
          titre: "Route retour — Asques",
          description: "Via A83 puis A10 · ~240 km · ~2h30.",
          type: "trajet",
          maps: mapsUrl(44.8903, 0.4278, "Asques 33240"),
          liens: [], tag: null
        },
        {
          id: "j4-5", plage: "aprem", heure: "16h00",
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
