// ============================================================
// ViaRoad — Données du séjour Marais Poitevin 2026
// ============================================================

function mapsUrl(lat, lng, label) {
  const enc = encodeURIComponent(label || '');
  return {
    google: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
    apple:  `https://maps.apple.com/?q=${enc}&ll=${lat},${lng}&z=16`,
    label:  label || ''
  };
}

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
      theme: "Points de vue · Nature",
      distance: "1,5 km",
      duree: "1h",
      difficulte: "1/5",
      terrain: "1/5",
      depart: "Parking de l'Autremont — 42 rue de l'Autremont, Coulon (même parking que l'aire CC)",
      maps: mapsUrl(46.3211667, -0.5893333, "Parking Autremont Coulon départ TA"),
      liens: [
        { label: "Voir +", url: "https://www.tourisme-deux-sevres.com/activite/geocaching-terra-aventura-pic-nic-douille-cest-toi-la-pigouille/" }
      ],
      description: "Zarthus vous emmène dans les ruelles et sur les quais de Coulon, capitale de la Venise Verte. En cherchant les indices, vous découvrez la pêche à l'anguille, les anciennes taxes sur les marchandises, la libellule géante de la place, les mojettes et les pigouilles. Une façon maline et amusante d'entrer dans le marais — les filles vont adorer résoudre les énigmes. Le chien est le bienvenu. 💡 Le mot mystère trouvé dans la cache donne droit à un tarif réduit à la Maison du Marais Poitevin.",
      poi: [
        "🎣 Quais de Coulon — pêche à l'anguille, nasses en osier, techniques ancestrales des maraîchins",
        "🦋 Libellule géante de Brigitte Belaud — sculpture place de la Coutume, 54 espèces dans le marais",
        "🏛️ Place de la Coutume — ancien lieu de taxation des marchandises, plus de 2 500 bateaux en 1840",
        "⛪ Église Sainte-Trinité — tradition de la Bachellerie, personnages sculptés grimaçants",
        "🪤 Poulies de la rue de l'Église — servaient à monter les sacs de mojettes dans les greniers",
        "⛵ Amiral Clochard — premier à avoir balladé les touristes dans le marais au début du XXe siècle"
      ],
      alertes: []
    },
    {
      id: "viso2",
      type: "visorando",
      jour: "Vendredi 15 — matin (boucle complète)",
      emoji: "🥾",
      titre: "Coulon · La Garette · Coulon",
      distance: "~10 km",
      duree: "~2h30-3h",
      difficulte: "Facile",
      depart: "Coulon — Parking de l'Autremont (aire CC)",
      maps: mapsUrl(46.3211667, -0.5893333, "Parking Autremont Coulon départ rando"),
      liens: [
        { label: "Visorando n°257714", url: "https://www.visorando.com/randonnee-la-venise-verte-la-garette-coulon/" }
      ],
      description: "Au cœur de la Venise Verte, on part de Coulon pour rejoindre La Garette par les berges et canaux, avant de revenir par le même esprit — à pied, sans le CC. La Garette est l'un des villages les plus typiques du marais : une rue piétonne de 800 mètres bordée d'anciennes maisons de pêcheurs-paysans, chacune avec son embarcadère côté canal. Coulon, capitale du marais mouillé, est le point d'orgue de cette boucle. Pique-nique à La Garette en milieu de parcours avant de rentrer. Saisir le n°257714 dans l'app Visorando.",
      poi: [
        "🏘️ La Garette — rue piétonne de 800m, maisons de pêcheurs, embarcadères privés côté canal",
        "🌿 Canaux de la Venise Verte — frênes têtards, conches, reflets d'eau verte",
        "⛵ Bords de Sèvre Niortaise — chemin de halage, barques traditionnelles",
        "🌊 Barrage-écluse du Chail — passerelle en bois sur pilotis à La Garette",
        "🏘️ Coulon — capitale du marais mouillé, quais historiques, village fleuri"
      ],
      alertes: [
        "ℹ️ Boucle à faire sans le CC — on repart à pied depuis l'aire CC"
      ]
    },
    {
      id: "ta2",
      type: "terra",
      jour: "Samedi 16 — matin",
      emoji: "🎮",
      titre: "Flamme Bleue en Venise Verte",
      poiz: "Zahan",
      theme: "Animaux · Marais sauvage",
      distance: "5,5 km",
      duree: "2h à 3h",
      difficulte: "3/5",
      terrain: "2/5",
      depart: "Parking salle des fêtes — Saint-Georges-de-Rex (N46°16.727' / W000°39.115')",
      maps: mapsUrl(46.2787833, -0.6519167, "Parking salle des fêtes Saint-Georges-de-Rex"),
      liens: [
        { label: "Découvrir", url: "https://www.niortmaraispoitevin.com/activites/geocaching-terra-aventura-flamme-bleue-en-venise-verte/" }
      ],
      description: "Zahan, le maraîchin, doit rejoindre ses bœufs dans les pâtures — mais quelqu'un allume des feux dans le marais. Avec lui, on traverse les conches, les chemins ombragés, les prairies humides de Saint-Georges-de-Rex, réserve naturelle de 250 hectares gérée par le Conservatoire Régional. Pigeonnier, four à pain, port, gardien du marais en bric-à-brac, cyprès chauve aux racines-tubas, hôtel à insectes… le parcours est riche en découvertes. Le chien sera dans son élément. Départ depuis le parking de la salle des fêtes, puis venelle sur la droite jusqu'au lavoir de la Grande Fontaine.",
      poi: [
        "🌿 Conches du marais sauvage — canaux envahis de végétation, réserve de 250 hectares",
        "🕊️ Pigeonnier (ou fuye) — les «boulins» symbolisaient la richesse foncière",
        "🍞 Four à pain et outils anciens — tarare bleu, râteau à foin, vie maraîchine",
        "⚓ Port de Saint-Georges-de-Rex — accès encore possible à Niort et la Baie de l'Aiguillon",
        "🌾 Gardien du marais — sculpture en bric-à-brac, frênes têtards aux branches dressées",
        "🌺 Fritillaire pintade — fleur clochette damier rose et pourpre, abri légendaire des feux follets",
        "🌳 Cyprès chauve — racines-tubas qui jaillissent à l'air libre pour vivre en milieu inondé"
      ],
      alertes: [
        "⚠️ Chaussures imperméables ou bottes si temps humide",
        "⚠️ Accès interdit en cas d'évail (crue) — vérifier avant de partir"
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
      duree: "1h",
      difficulte: "2/5",
      terrain: "1/5",
      depart: "Parking du stade — Magné (N46°18.829' / W000°32.544')",
      maps: mapsUrl(46.3134167, -0.5428167, "Parking du stade Magné sentier port en port"),
      liens: [
        { label: "Découvrir", url: "https://www.tourisme-deux-sevres.com/geocaching-terra-aventura-maraichin-contre-bras-rouge/magne/ascaqu079v502wq5" }
      ],
      description: "Zisséo est parti pêcher et n'est pas rentré — le Bras Rouge l'aurait-il capturé ? Le sentier «De port en port» est balisé par des plaques métalliques au sol représentant une plate (barque traditionnelle). On passe par l'île du Bras Rouge, l'exposition sur la pêche à l'anguille, le four à pain restauré, le quai de Sèvre, l'église Sainte-Catherine et le pont-levis métallique. Magné est une île cernée par la Sèvre et ses bras — héritage du Golfe des Pictons. Court, plat, fun. Parfait pour finir la journée.",
      poi: [
        "⚓ Sentier «De port en port» — balises métalliques au sol représentant une plate maraîchine",
        "🎣 Exposition pêche à l'anguille — bourgnon, nasses en osier, outils ancestraux",
        "🦞 Île du Bras Rouge — peupliers de remplacement pour les frênes têtards menacés",
        "🍞 Four à pain du Pontet — restauré par une association, fonctionne encore pour des événements",
        "🌊 Quai de Sèvre — ancienne voie commerciale entre Niort et la mer, gabares et chamoiseries",
        "⛪ Église Sainte-Catherine — tourelle d'escalier, architecte de l'hôtel de ville de Niort",
        "🔩 Pont-levis métallique — franchissait 9 barrages-écluses de Niort à Marans"
      ],
      alertes: []
    },
    {
      id: "viso1",
      type: "visorando",
      jour: "Dimanche 17 — matin",
      emoji: "🥾",
      titre: "Le Marais Poitevin à Arçais",
      distance: "~10 km (demi-tour possible)",
      duree: "~2h30",
      difficulte: "Facile",
      depart: "Arçais — depuis l'aire CC",
      maps: null,
      liens: [
        { label: "Visorando n°733280", url: "https://www.visorando.com/randonnee-le-marais-poitevin-a-arcais/" }
      ],
      description: "La grande boucle finale depuis Arçais, le long des canaux du marais mouillé. Terrain totalement plat, horizon dégagé, silence. On fait autant qu'on veut — demi-tour possible à tout moment, sans pression. Saisir le n°733280 dans l'app Visorando. Pique-nique tardif en chemin avant la route retour.",
      poi: [
        "⛵ Port d'Arçais — barques plates, quais maraîchins, grues en bois sur le quai",
        "🌿 Canaux du marais mouillé — végétation dense, reflets, silence absolu",
        "🏘️ Hameaux sur l'eau — maisons basses aux jardins sur les berges",
        "🌾 Prairies humides — horizon dégagé, vols de hérons",
        "🥖 Boulangerie + supérette Arçais — ravitaillement possible avant de partir"
      ],
      alertes: [
        "ℹ️ Saisir le n°733280 dans l'app Visorando",
        "ℹ️ Demi-tour possible à tout moment — pas d'obligation de boucler"
      ]
    }
  ],

  checklist: [
    { id: 1,  categorie: "📞 Réservations", texte: "Réserver barque Montfaucon — sam 16 aprem ☎️ 05 49 35 34 97 · confirmer chien (animaux bienvenus ✅)", fait: false },
    { id: 2,  categorie: "📞 Réservations", texte: "Réserver La Passerelle Coulon — si on y va, animaux bienvenus ✅ ☎️ 05 49 35 80 03", fait: false },
    { id: 3,  categorie: "🎮 Terra Aventura", texte: "Télécharger parcours Coulon hors connexion dans l'app (Pic nic douille)", fait: false },
    { id: 4,  categorie: "🎮 Terra Aventura", texte: "Télécharger parcours St-Georges hors connexion (Flamme Bleue)", fait: false },
    { id: 5,  categorie: "🎮 Terra Aventura", texte: "Télécharger parcours Magné hors connexion (Maraîchin contre Bras Rouge)", fait: false },
    { id: 6,  categorie: "📱 Apps", texte: "Visorando — télécharger GPX n°257714 (La Garette, ven) et n°733280 (Arçais, dim)", fait: false },
    { id: 7,  categorie: "📱 Apps", texte: "Camping-Car Park — télécharger + inscription si besoin", fait: false },
    { id: 8,  categorie: "📱 Apps", texte: "Météo France — ajouter Coulon (INSEE 79430)", fait: false },
    { id: 9,  categorie: "🐕 Chien", texte: "Gamelle pliable + eau en stock", fait: false },
    { id: 10, categorie: "🐕 Chien", texte: "Laisse courte pour les parcours", fait: false },
    { id: 11, categorie: "🐕 Chien", texte: "Sacs à déjections", fait: false },
    { id: 12, categorie: "🐕 Chien", texte: "Répulsif moustiques — surtout le soir en bord de canal", fait: false },
    { id: 13, categorie: "🐕 Chien", texte: "Chaussures imperméables ou bottes — TA Flamme Bleue (sam matin)", fait: false }
  ],

  jours: [

    // ─────────────────────────────
    // JEUDI 14 — Route + Coulon
    // ─────────────────────────────
    {
      id: "j1", numero: 1,
      label: "Jeudi 14 mai",
      titre: "On arrive",
      emoji: "🚐",
      km_balade: "~3 km · journée douce",
      ambiance: "Bienvenue dans le Marais Poitevin — 2e zone humide de France, façonnée par l'homme depuis le Moyen Âge. On pose le CC, on respire, on laisse le marais venir à nous.",
      etapes: [
        {
          id: "j1-1", plage: "matin", heure: "09h30",
          titre: "Départ Asques",
          description: "Pique-nique du midi dans le sac. ~2h15 de route via A10 puis N11.",
          type: "trajet",
          maps: mapsUrl(44.8903, 0.4278, "Asques 33240"),
          liens: []
        },
        {
          id: "j1-2", plage: "midi", heure: "12h00",
          titre: "Arrivée — Aire CC Coulon",
          description: "42 rue de l'Autremont, 79510 Coulon. 90 emplacements, sol stabilisé, électricité, sanitaires, WiFi. Le CC reste là jusqu'à demain soir — on explore le coin à pied.",
          type: "hebergement",
          maps: mapsGoo(null, 46.3230, -0.5892, "Aire CC Coulon 42 rue Autremont"),
          liens: [
            { label: "Camping-Car Park", url: "https://www.campingcarpark.com/fr_FR/camping-car/nouvelle-aquitaine/deux-sevres/coulon" }
          ]
        },
        {
          id: "j1-3", plage: "midi", heure: "12h30",
          titre: "Pique-nique — Quais de Coulon",
          description: "500m à pied depuis l'aire. Bancs face à la Sèvre, barques qui glissent, village fleuri. Premier contact avec le marais mouillé.",
          type: "repas",
          maps: mapsUrl(46.3233, -0.5861, "Quais de Coulon"),
          liens: [
            { label: "Découvrir Coulon", url: "https://www.niortmaraispoitevin.com/decouvrir/les-incontournables/coulon/" },
            { label: "Marais Poitevin", url: "https://www.parc-marais-poitevin.fr/" }
          ]
        },
        {
          id: "j1-4", plage: "aprem", heure: "14h00",
          titre: "🎮 Terra Aventura — Pic nic douille, c'est toi la pigouille",
          description: "1,5 km · ~1h · Dif 1/5. Départ depuis le parking de l'Autremont — juste à côté du CC. Avec Zarthus, on part chasser des indices dans les ruelles et sur les quais de Coulon. Pêche à l'anguille, libellule géante, anciennes taxes sur les marchandises, pigouilles et mojettes — une mise en bouche parfaite du marais. Tout le monde suit, le chien aussi.",
          type: "activite",
          maps: mapsUrl(46.3211667, -0.5893333, "Parking Autremont Coulon départ TA Pic nic douille"),
          liens: [
            { label: "Voir +", url: "https://www.tourisme-deux-sevres.com/activite/geocaching-terra-aventura-pic-nic-douille-cest-toi-la-pigouille/" }
          ]
        },
        {
          id: "j1-5", plage: "aprem", heure: "15h30",
          titre: "🐾 Flânerie — Quais et chemin de halage",
          description: "On rejoint les quais et on flâne sans objectif. Le chemin de halage longe la Sèvre vers l'aval — on y va autant qu'on veut, on revient quand on veut. Le marais commence à chuchoter. À éviter : le secteur autour du parking Autremont déjà fait avec le TA.",
          type: "balade",
          maps: null,
          liens: []
        },
        {
          id: "j1-6", plage: "soir", heure: "18h30",
          titre: "Retour — Aire CC",
          description: "Retour à pied (500m). On s'installe, on souffle. Nuit sur place.",
          type: "hebergement",
          maps: null,
          liens: []
        },
        {
          id: "j1-7", plage: "soir", heure: "19h30",
          titre: "Dîner — à bord",
          description: "Repas préparé maison. Dehors si la météo le permet.",
          type: "repas",
          maps: null,
          liens: []
        }
      ]
    },

    // ─────────────────────────────
    // VENDREDI 15 — Grande rando + repos
    // ─────────────────────────────
    {
      id: "j2", numero: 2,
      label: "Vendredi 15 mai",
      titre: "La Garette & retour",
      emoji: "🥾",
      km_balade: "~10 km · grande journée",
      ambiance: "La boucle du jour : Coulon → La Garette → Coulon. À pied, le long des canaux. Pique-nique à La Garette en chemin. Après-midi tranquille au CC.",
      etapes: [
        {
          id: "j2-1", plage: "matin", heure: "08h30",
          titre: "Petit-déjeuner — CC",
          description: "Café chaud, sortie chien. Pique-nique préparé pour La Garette. Décollage vers 10h. Le CC reste garé à Coulon toute la journée.",
          type: "routine",
          maps: null,
          liens: []
        },
        {
          id: "j2-2", plage: "matin", heure: "10h00",
          titre: "🥾 Visorando — Boucle Coulon · La Garette · Coulon",
          description: "~10 km · ~2h30-3h · Facile. On part à pied depuis l'aire CC, le long des canaux et berges de la Sèvre. Direction La Garette, l'un des villages les plus typiques du marais : rue piétonne de 800m bordée d'anciennes maisons de pêcheurs-paysans, embarcadères privés côté canal. On pique-nique là-bas avant de rentrer par le même univers d'eau et de verdure.\n\nSaisir le n°257714 dans l'app Visorando.",
          type: "activite",
          maps: mapsUrl(46.3211667, -0.5893333, "Départ rando Coulon parking Autremont"),
          liens: []
        },
        {
          id: "j2-3", plage: "midi", heure: "12h30",
          titre: "Pique-nique — La Garette",
          description: "On s'installe à La Garette en plein milieu de la boucle. Face aux canaux, maisons de pêcheurs tout autour. On prend le temps avant de repartir vers Coulon.",
          type: "repas",
          maps: mapsUrl(46.308, -0.602, "La Garette village"),
          liens: []
        },
        {
          id: "j2-4", plage: "aprem", heure: "15h00",
          titre: "Retour — Aire CC Coulon",
          description: "Retour à pied jusqu'au CC. On s'installe, on souffle. Après 10 km, le CC n'a jamais semblé aussi confortable.",
          type: "hebergement",
          maps: null,
          liens: []
        },
        {
          id: "j2-5", plage: "aprem", heure: "16h00",
          titre: "Repos · Flânerie libre",
          description: "Aprem au calme. On traîne autour du CC, on joue, on flâne sur les quais si l'envie reprend. Le chien profite de la Sèvre.",
          type: "balade",
          maps: null,
          liens: []
        },
        {
          id: "j2-6", plage: "soir", heure: "19h30",
          titre: "Dîner — à bord · Nuit Coulon",
          description: "Repas à bord. Dernière nuit à Coulon avant de prendre la route demain matin.",
          type: "repas",
          maps: null,
          liens: []
        }
      ]
    },

    // ─────────────────────────────
    // SAMEDI 16 — 2 TA + Arçais
    // ─────────────────────────────
    {
      id: "j3", numero: 3,
      label: "Samedi 16 mai",
      titre: "Terra Aventura x2 + Arçais",
      emoji: "🎮",
      km_balade: "~8 km avec pauses",
      ambiance: "Le grand TA le matin dans le marais sauvage, le petit l'après-midi à Magné. On finit en flânant à Arçais où on pose le CC pour la nuit.",
      etapes: [
        {
          id: "j3-1", plage: "matin", heure: "08h30",
          titre: "Petit-déjeuner + préparation",
          description: "Chaussures imperméables ou bottes dans le sac — passages boueux possible sur Flamme Bleue. Eau, pique-nique. Décollage vers 10h.",
          type: "routine",
          maps: null,
          liens: []
        },
        {
          id: "j3-2", plage: "matin", heure: "10h00",
          titre: "Trajet — Saint-Georges-de-Rex",
          description: "~15 km · ~20 min depuis Coulon. On quitte l'aire CC avec le camping-car.",
          type: "trajet",
          maps: mapsUrl(46.2787833, -0.6519167, "Parking salle des fêtes Saint-Georges-de-Rex"),
          liens: []
        },
        {
          id: "j3-3", plage: "matin", heure: "10h15",
          titre: "🎮 Terra Aventura — Flamme Bleue en Venise Verte",
          description: "5,5 km · 2h à 3h · Dif 3/5. Avec Zahan le maraîchin, on plonge dans le marais sauvage de Saint-Georges-de-Rex — conches, prairies humides, pigeonnier, port, gardien en bric-à-brac, cyprès chauve aux racines-tubas. Le grand parcours du séjour. On prend le temps, on fait des pauses, le chien adore.\n\nDépart : parking de la salle des fêtes. Suivre la venelle sur la droite jusqu'au lavoir de la Grande Fontaine.",
          type: "activite",
          maps: mapsUrl(46.2787833, -0.6519167, "Parking salle des fêtes Saint-Georges-de-Rex"),
          liens: [
            { label: "Découvrir", url: "https://www.niortmaraispoitevin.com/activites/geocaching-terra-aventura-flamme-bleue-en-venise-verte/" }
          ]
        },
        {
          id: "j3-4", plage: "midi", heure: "13h00",
          titre: "Pique-nique — Saint-Georges-de-Rex",
          description: "Tables de pique-nique au village ou sous les arbres. On souffle avant la route vers Magné.",
          type: "repas",
          maps: mapsUrl(46.2787833, -0.6519167, "Saint-Georges-de-Rex village"),
          liens: []
        },
        {
          id: "j3-5", plage: "aprem", heure: "14h15",
          titre: "Trajet — Magné",
          description: "~12 km · ~15 min. Direction parking du stade.",
          type: "trajet",
          maps: mapsUrl(46.3134167, -0.5428167, "Parking stade Magné"),
          liens: []
        },
        {
          id: "j3-6", plage: "aprem", heure: "14h30",
          titre: "🎮 Terra Aventura — Maraîchin contre Bras Rouge",
          description: "2,5 km · 1h · Dif 2/5. Zisséo n'est pas rentré de la pêche — le Bras Rouge l'a-t-il capturé ? Sentier «De port en port» balisé au sol par des plaques représentant une plate. On traverse l'île du Bras Rouge, le quai de Sèvre, le pont-levis. Court, plat, fun — parfait après le grand TA du matin.\n\nDépart : parking du stade, sentier à proximité immédiate.",
          type: "activite",
          maps: mapsUrl(46.3134167, -0.5428167, "Parking stade Magné départ sentier port en port"),
          liens: [
            { label: "Découvrir", url: "https://www.tourisme-deux-sevres.com/geocaching-terra-aventura-maraichin-contre-bras-rouge/magne/ascaqu079v502wq5" }
          ]
        },
        {
          id: "j3-7", plage: "aprem", heure: "16h00",
          titre: "Trajet + installation — Aire CC Arçais",
          description: "~8 km · ~10 min. 26 Rue du Marais, 79210 Arçais. ~11,50€/nuit. Électricité, sanitaires, WiFi. Supérette à 300m.",
          type: "hebergement",
          maps: mapsGoo("https://www.google.com/maps/place/aire+de+services+camping+car/@46.2966216,-0.6881994,17z/data=!3m1!4b1!4m6!3m5!1s0x4806d7505a596ab5:0xc3ecec50cd4dd17a!8m2!3d46.2966216!4d-0.6881994!16s%2Fg%2F11mw7lf08r", 46.2966216, -0.6881994, "Aire CC Arçais"),
          liens: [
            { label: "Voir +", url: "https://www.niortmaraispoitevin.com/aires-camping-cars/aire-communale-du-praineau/" }
          ]
        },
        {
          id: "j3-8", plage: "aprem", heure: "16h30",
          titre: "🏘️ Flânerie — Arçais",
          description: "On pose le CC et on flâne en roue libre. Port pittoresque, venelles, maisons maraîchines. Grues en bois sur le quai. Atmosphère douce. Le chien fait ce qu'il veut.",
          type: "balade",
          maps: null,
          liens: []
        },
        {
          id: "j3-9", plage: "soir", heure: "19h30",
          titre: "Dîner — à bord · Nuit Arçais",
          description: "Repas préparé. Supérette à 300m si besoin.",
          type: "repas",
          maps: null,
          liens: []
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
      km_balade: "~10 km · demi-tour possible",
      ambiance: "Un dernier grand bol d'air sur les canaux d'Arçais. Pique-nique tardif. Route retour sans pression.",
      etapes: [
        {
          id: "j4-1", plage: "matin", heure: "08h30",
          titre: "Petit-déjeuner — CC",
          description: "Café tranquille. Pique-nique de route préparé. On part vers 10h.",
          type: "routine",
          maps: null,
          liens: []
        },
        {
          id: "j4-2", plage: "matin", heure: "10h00",
          titre: "🥾 Visorando — Le Marais Poitevin à Arçais",
          description: "~10 km · ~2h30 · Facile. Départ depuis l'aire ou le port d'Arçais. Boucle le long des canaux du marais mouillé, prairies, conches, silence. Terrain totalement plat. On fait autant qu'on veut — demi-tour possible à tout moment.\n\nSaisir le n°733280 dans l'app Visorando.",
          type: "activite",
          maps: null,
          liens: [
            { label: "Visorando n°733280", url: "https://www.visorando.com/randonnee-le-marais-poitevin-a-arcais/" }
          ]
        },
        {
          id: "j4-3", plage: "midi", heure: "12h30",
          titre: "Pique-nique — Bords de canal",
          description: "On s'installe où c'est joli. Dernier repas au marais — on prend le temps.",
          type: "repas",
          maps: mapsUrl(46.299, -0.541, "Arçais bords de canal"),
          liens: []
        },
        {
          id: "j4-4", plage: "aprem", heure: "13h30",
          titre: "Route retour — Asques",
          description: "Via A83 puis A10 · ~240 km · ~2h30.",
          type: "trajet",
          maps: mapsUrl(44.8903, 0.4278, "Asques 33240"),
          liens: []
        },
        {
          id: "j4-5", plage: "aprem", heure: "16h00",
          titre: "Retour Asques 🏠",
          description: "La maison.",
          type: "arrivee",
          maps: mapsUrl(44.8903, 0.4278, "Asques 33240"),
          liens: []
        }
      ]
    }
  ]
};
