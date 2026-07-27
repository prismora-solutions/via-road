// ===== SÉJOUR CORRÈZE — TREIGNAC — 29 juillet → 5 août 2026 =====
// Structure V2 : par catégories (plus de jours/étapes)
// Chaque item porte ses sources pour vérification

const SEJOUR = {
  id: "correze-2026",
  titre: "Corrèze — Treignac",
  dates: "29 juillet → 5 août 2026",
  destination: "Treignac (19) · Rayon 40 km",

  // ===== CAMPING =====
  camping: {
    nom: "Flower Camping La Plage***",
    adresse: "27 Route de Guéret, Lac des Bariousses, 19260 Treignac",
    tel: "tel:+33555980854",
    telAffiche: "05 55 98 08 54",
    maps: { google: "https://maps.app.goo.gl/e9WGoXZ1gZvgC2Lt5" },
    equipements: [
      "Piscine couverte chauffée",
      "Plage lac des Bariousses (Pavillon Bleu)",
      "Canoë / pédalo / SUP sur place",
      "Snack / restauration"
    ],
    chien: {
      statut: "accepte",
      note: "4€/nuit/animal. Chiens catégories 1 et 2 interdits. Carnet de vaccination obligatoire, à régler sur place. ⚠️ Un avis récent signale la plage du lac interdite aux chiens — à confirmer à l'accueil."
    },
    sources: [
      { label: "Tourisme Corrèze — fiche camping", url: "https://www.tourismecorreze.com/fr/tourisme_detail/flower_camping_la_plage.html" },
      { label: "Tarifs & conditions chien", url: "https://www.lafrancedunordausud.fr/flower-camping-la-plage_60337.html" }
    ]
  },

  // ===== TERRA AVENTURA =====
  terraAventura: [
    {
      nom: "Treignac aux Millesources",
      poiz: "Zéchopp",
      lieu: "Treignac (départ sur place)",
      distanceKm: 0,
      longueur: "3 km",
      duree: "1h30",
      etoiles: 3,
      incontournable: true,
      chien: { statut: "a_verifier", note: "Balade urbaine dans les ruelles de Treignac — pas de restriction connue, à confirmer sur place." },
      description: "Zéchopp, marchand persuasif, fait découvrir les ruelles et le patrimoine de la Petite Cité de Caractère.",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Treignac+centre" },
      sources: [
        { label: "Terres de Corrèze — Terra Aventura", url: "https://www.terresdecorreze.com/nature-activites/terra-aventura/" }
      ]
    },
    {
      nom: "Uzerche, la perle rare",
      poiz: "Zeïdon",
      lieu: "Uzerche",
      distanceKm: 22,
      longueur: "3 km",
      duree: "1h30",
      etoiles: 3,
      incontournable: true,
      chien: { statut: "a_verifier", note: "Balade dans le centre historique — pas de restriction connue, à confirmer sur place." },
      description: "Parcours dans les passages méconnus d'Uzerche. Finaliste régional 2026 du concours du meilleur parcours Terra Aventura.",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Uzerche+centre" },
      sources: [
        { label: "Corrèze Tourisme — actu concours 2026", url: "https://pro.tourismecorreze.com/la-correze-en-finale-du-concours-du-meilleur-parcours-terra-aventura/" },
        { label: "Terres de Corrèze — Terra Aventura", url: "https://www.terresdecorreze.com/nature-activites/terra-aventura/" }
      ]
    },
    {
      nom: "Roadtrip entre Monédières et Millevaches",
      poiz: "Ziraider",
      lieu: "Lestards",
      distanceKm: 10,
      longueur: "à confirmer",
      duree: "à confirmer",
      etoiles: 2,
      incontournable: false,
      chien: { statut: "a_verifier", note: "Aucune info trouvée — à vérifier auprès de l'OT Terres de Corrèze." },
      description: "Parcours au départ du petit village de Lestards, dans le Massif des Monédières.",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Lestards+19" },
      sources: [
        { label: "Terres de Corrèze — nouveau parcours", url: "https://www.terresdecorreze.com/terra-aventura-nouveau-parcours-en-terres-de-correze/" }
      ]
    },
    {
      nom: "Panique dans l'arboretum",
      poiz: "Zouch",
      lieu: "Chamberet",
      distanceKm: 15,
      longueur: "à confirmer",
      duree: "à confirmer",
      etoiles: 2,
      incontournable: false,
      chien: { statut: "a_verifier", note: "Site arboretum — statut chien non confirmé, à vérifier." },
      description: "Parcours dans un arboretum où l'on croise quelques z'animaux de temps en temps.",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Chamberet+19" },
      sources: [
        { label: "Terres de Corrèze — nouveau parcours", url: "https://www.terresdecorreze.com/terra-aventura-nouveau-parcours-en-terres-de-correze/" }
      ]
    },
    {
      nom: "Sur les traces des meuniers d'antan",
      poiz: "—",
      lieu: "Corrèze (village)",
      distanceKm: 20,
      longueur: "à confirmer",
      duree: "à confirmer",
      etoiles: 2,
      incontournable: false,
      chien: { statut: "a_verifier", note: "Balade village — à confirmer." },
      description: "Découverte du petit village de Corrèze et de son quartier historique.",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Correze+19800" },
      sources: [
        { label: "Terra Aventura — page parcours", url: "https://www.terra-aventura.fr/" }
      ]
    },
    {
      nom: "Oh, la vache !",
      poiz: "—",
      lieu: "Meilhards",
      distanceKm: 15,
      longueur: "à confirmer",
      duree: "à confirmer",
      etoiles: 1,
      incontournable: false,
      chien: { statut: "a_verifier", note: "Aucune info trouvée." },
      description: "Parcours corrézien découvert lors de la Micro Z'Aventure « La Corrèze à croquer ».",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Meilhards+19" },
      sources: [
        { label: "Terra Aventura — actu Micro Z'Aventure", url: "https://www.terra-aventura.fr/" }
      ]
    },
    {
      nom: "Ne quittez pas des yeux le busatier",
      poiz: "—",
      lieu: "Marcillac-la-Croisille",
      distanceKm: 20,
      longueur: "à confirmer",
      duree: "à confirmer",
      etoiles: 1,
      incontournable: false,
      chien: { statut: "a_verifier", note: "Aucune info trouvée." },
      description: "Parcours au départ de Marcillac-la-Croisille.",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Marcillac-la-Croisille" },
      sources: [
        { label: "Terra Aventura — top parcours Nouvelle-Aquitaine", url: "https://en-nouvelle-aquitaine.fr/partage-rencontres/loisirs-ensemble/terra-aventura-geocaching/top-parcours-terra-aventura/" }
      ]
    }
  ],

  // ===== RANDOS & BALADES =====
  randos: [
    {
      nom: "Tour du Lac des Bariousses",
      lieu: "Treignac (départ camping)",
      distanceKm: 0,
      longueur: "12 km",
      duree: "3h15",
      etoiles: 3,
      incontournable: true,
      chien: { statut: "laisse", note: "Chiens bienvenus en laisse." },
      description: "Boucle complète autour du lac des Bariousses (99 ha, Pavillon Bleu) : forêt, puis bord de lac sur toute la fin du parcours.",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Barrage+des+Bariousses+Treignac" },
      sources: [
        { label: "AllTrails — Lac des Bariousses", url: "https://www.alltrails.com/fr/randonnee/france/correze/lac-des-bariousses" },
        { label: "Tourisme Corrèze — sentiers Treignac", url: "https://www.tourismecorreze.com/fr/rando/les_sentiers_de_randonnee_a_treignac" }
      ]
    },
    {
      nom: "Le Saut du Loup",
      lieu: "Treignac (départ camping)",
      distanceKm: 0,
      longueur: "6 km",
      duree: "1h45-2h",
      etoiles: 3,
      incontournable: true,
      chien: { statut: "laisse", note: "Chiens bienvenus, tenus en laisse." },
      description: "Le plus beau panorama sur la cité médiévale de Treignac. Longe la Vézère jusqu'au site du Saut du Loup puis rejoint le lac des Bariousses. ⚠️ Prudence près du barrage (lâchers d'eau).",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Saut+du+Loup+Treignac" },
      sources: [
        { label: "Tourisme Corrèze — circuit Saut du Loup", url: "https://www.tourismecorreze.com/fr/randonnees/le-saut-du-loup/18108/circuit/43284" },
        { label: "AllTrails — Le Saut du Loup (chien confirmé)", url: "https://www.alltrails.com/fr/randonnee/france/correze/le-saut-du-loup" }
      ]
    },
    {
      nom: "Circuit de l'Eau et la Pierre",
      lieu: "Treignac (départ camping)",
      distanceKm: 0,
      longueur: "à confirmer",
      duree: "à confirmer",
      etoiles: 2,
      incontournable: false,
      chien: { statut: "a_verifier", note: "Circuit local — à confirmer auprès de l'OT." },
      description: "Sentier de randonnée référencé autour de Treignac, à 2,7 km du centre.",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Treignac+centre" },
      sources: [
        { label: "Webvilles — équipements sportifs Treignac", url: "https://www.webvilles.net/sports/activites/313887/circuit-:-le-saut-du-loup-treignac.php" }
      ]
    },
    {
      nom: "Gorges de la Vézère / Saut de la Virole",
      lieu: "Lestards",
      distanceKm: 5,
      longueur: "à confirmer",
      duree: "à confirmer",
      etoiles: 2,
      incontournable: false,
      chien: { statut: "a_verifier", note: "Aucune info trouvée." },
      description: "Site de cascade sur la Vézère, mentionné sur l'itinérance Pérols-sur-Vézère → Treignac.",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Lestards+gorges+de+la+Vezere" },
      sources: [
        { label: "Visorando — De Pérols-sur-Vézère à Treignac", url: "https://www.visorando.com/randonnee-de-perols-sur-vareze-a-treignac/" }
      ]
    },
    {
      nom: "Site du Longeyroux — sentier des Linaigrettes",
      lieu: "Saint-Merd-les-Oussines",
      distanceKm: 30,
      longueur: "1 km",
      duree: "1h",
      etoiles: 2,
      incontournable: false,
      chien: {
        statut: "interdit",
        note: "⚠️ Chiens interdits même en laisse — présence de patous gardiens de troupeaux sur zone."
      },
      description: "Plus grande tourbière du Limousin (250 ha, 8000 ans), panneaux pédagogiques, panorama exceptionnel sur le plateau de Millevaches. À faire sans Alma, ou en solo/relais.",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Tourbiere+du+Longeyroux" },
      sources: [
        { label: "IGN Rando — fiche officielle (interdiction chien)", url: "https://ignrando.fr/fr/parcours/fiche/details/id/2253990" },
        { label: "Tourisme Haute-Corrèze", url: "https://www.tourisme-hautecorreze.fr/patrimoine-naturel/tourbiere-du-longeyroux/" }
      ]
    },
    {
      nom: "Lac de Viam / Étang du Mouno / Bugeat",
      lieu: "Bugeat / Viam",
      distanceKm: 20,
      longueur: "variable",
      duree: "variable",
      etoiles: 2,
      incontournable: false,
      chien: { statut: "a_verifier", note: "Zone de baignade/loisirs — statut chien non confirmé." },
      description: "Secteur lac + étang sur l'itinérance du plateau de Millevaches, alternative baignade au Lac des Bariousses.",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Lac+de+Viam" },
      sources: [
        { label: "Visorando — De Pérols-sur-Vézère à Treignac", url: "https://www.visorando.com/randonnee-de-perols-sur-vareze-a-treignac/" }
      ]
    }
  ],

  // ===== VISITES & CURIOSITÉS =====
  visites: [
    {
      nom: "Cascades de Gimel — Parc Vuillier",
      lieu: "Gimel-les-Cascades",
      distanceKm: 40,
      duree: "~1h de visite",
      etoiles: 3,
      incontournable: true,
      chien: { statut: "laisse", note: "Chiens en laisse acceptés (confirmé site officiel)." },
      tarif: "Plein tarif 6,50€ · Réduit 4,50€",
      description: "3 chutes successives de la Montane (143 m au total). Site privé aménagé, sentiers fléchés. ⚠️ Non accessible PMR, escaliers nombreux, déconseillé aux problèmes cardiaques.",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Cascades+de+Gimel+Parc+Vuillier" },
      sources: [
        { label: "Tourisme Corrèze — fiche officielle", url: "https://www.tourismecorreze.com/fr/tourisme_detail/les_cascades_de_gimel_parc_vuillier.html" },
        { label: "Site officiel Cascades de Gimel", url: "https://www.cascadesdegimel.com/" }
      ]
    },
    {
      nom: "Uzerche — village",
      lieu: "Uzerche",
      distanceKm: 22,
      duree: "demi-journée",
      etoiles: 3,
      incontournable: true,
      chien: { statut: "a_verifier", note: "Extérieurs/ruelles — pas de restriction connue, à confirmer sur place pour les sites payants." },
      description: "« 100 Plus Beaux Détours de France ». Forêt de tours et tourelles, ruelles pavées, Parcours du Patrimoine et Parcours du Méandre (vue sur la Vézère).",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Uzerche+centre" },
      sources: [
        { label: "Terres de Corrèze — destination Uzerche", url: "https://www.terresdecorreze.com/destination/uzerche/" },
        { label: "Plus Beaux Détours de France", url: "https://www.plusbeauxdetours.com/tous-les-plus-beaux-detours/detour-par-uzerche-en-correze/" }
      ]
    },
    {
      nom: "Treignac — cité médiévale",
      lieu: "Treignac (sur place)",
      distanceKm: 0,
      duree: "1-2h",
      etoiles: 3,
      incontournable: true,
      chien: { statut: "a_verifier", note: "Balade village libre — pas de restriction connue." },
      description: "Pont du XIIIe siècle, église, halle aux grains, tour panoramique du XVe, maisons à colombages. Label Petite Cité de Caractère.",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Treignac+pont+medieval" },
      sources: [
        { label: "Tourisme Corrèze — sentiers Treignac", url: "https://www.tourismecorreze.com/fr/rando/les_sentiers_de_randonnee_a_treignac" }
      ]
    },
    {
      nom: "Barrage de Treignac",
      lieu: "Treignac (sur place)",
      distanceKm: 0,
      duree: "30 min",
      etoiles: 2,
      incontournable: false,
      chien: { statut: "a_verifier", note: "Point de vue extérieur — pas de restriction connue." },
      description: "Barrage voûte (1949-1951), panorama sur la retenue du lac des Bariousses.",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Barrage+de+Treignac" },
      sources: [
        { label: "Tourisme Corrèze — circuit Saut du Loup", url: "https://www.tourismecorreze.com/fr/randonnees/le-saut-du-loup/18108/circuit/43284" }
      ]
    },
    {
      nom: "Corrèze — village",
      lieu: "Corrèze",
      distanceKm: 20,
      duree: "1-2h",
      etoiles: 2,
      incontournable: false,
      chien: { statut: "a_verifier", note: "Petit village — pas de restriction connue, à confirmer." },
      description: "Très petit village mais quartier historique qui vaut le détour selon les guides locaux.",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Correze+19800+village" },
      sources: [
        { label: "France This Way — guide Treignac/environs", url: "https://www.fr.francethisway.com/a/treignac-correze.php" }
      ]
    },
    {
      nom: "Arboretum Al Gaulhia",
      lieu: "Près d'Uzerche",
      distanceKm: 23,
      duree: "1h",
      etoiles: 1,
      incontournable: false,
      chien: { statut: "a_verifier", note: "Aucune info trouvée." },
      description: "Arboretum de 10 hectares avec jardins, à proximité immédiate d'Uzerche — combinable avec la visite du village.",
      maps: { google: "https://www.google.com/maps/search/?api=1&query=Arboretum+Al+Gaulhia" },
      sources: [
        { label: "France This Way — guide Uzerche", url: "https://www.fr.francethisway.com/a/uzerche-correze.php" }
      ]
    }
  ],

  checklist: [
    { id: 1, categorie: "Avant de partir", texte: "Confirmer statut chien : plage camping, Longeyroux (interdit), Corrèze village, Arboretum" },
    { id: 2, categorie: "Avant de partir", texte: "Réserver Cascades de Gimel si créneau chargé en août" },
    { id: 3, categorie: "Avant de partir", texte: "Télécharger parcours Terra Aventura hors connexion (Treignac + Uzerche prioritaires)" },
    { id: 4, categorie: "Chien", texte: "Carnet de vaccination Alma pour le camping" },
    { id: 5, categorie: "Chien", texte: "Laisse courte + eau + répulsif moustiques" },
    { id: 6, categorie: "Chien", texte: "Prévoir solution garde/relais pour la sortie Longeyroux (chien interdit)" }
  ]
};
