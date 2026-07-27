// ===== SÉJOUR CORRÈZE — TREIGNAC — 29 juillet → 5 août 2026 =====
// Depuis la V2.1 : Terra Aventura / Randos / Visites / Ressources sont gérés
// dans Supabase (tables "spots" et "ressources"), éditables directement dans l'app.
// Ne reste ici que ce qui ne change pas en cours de route : l'identité du séjour et le camping.

const SEJOUR = {
  id: "correze-2026",
  titre: "Corrèze — Treignac",
  dates: "29 juillet → 5 août 2026",
  destination: "Treignac (19) · Rayon 40 km",
  introPopup: "Une semaine entre gorges de la Vézère et plateau de Millevaches, avec Alma en laisse et les filles pour dénicher cascades, panoramas et parcours Terra Aventura. Rien n'est figé — ce carnet se construit au fil du séjour, on ajoute, on raye, on colle des photos à mesure qu'on avance.",

  // ===== CAMPING =====
  camping: {
    nom: "Flower Camping La Plage***",
    adresse: "27 Route de Guéret, Lac des Bariousses, 19260 Treignac",
    tel: "tel:+33555980854",
    telAffiche: "05 55 98 08 54",
    maps: { google: "https://maps.app.goo.gl/e9WGoXZ1gZvgC2Lt5" },
    intro: "Ici, la Vézère sculpte des gorges avant de se calmer dans le lac des Bariousses. Treignac veille dessus depuis son pont du XIIIe siècle, encadrée par les crêtes des Monédières et l'immensité du plateau de Millevaches. Une semaine pour remonter les rivières, dénicher des cascades, flâner dans des cités médiévales — et laisser Alma courir en laisse au bord de l'eau.",
    histoire: "Millevaches ne doit peut-être rien aux vaches. L'étymologie populaire y voit « mille vaches », mais plusieurs linguistes penchent pour l'occitan mila vacca, « mille sources » — un nom qui collerait bien à ce plateau qui donne naissance à la Vézère, la Vienne et la Corrèze. Le débat n'est toujours pas tranché.\n\nÀ Gimel, les trois chutes de la Montane ont inspiré Abel Hugo, frère de Victor Hugo, qui les décrivit dès 1883 dans « La France pittoresque ».",
    histoireSources: [
      { label: "Wikipédia — Plateau de Millevaches", url: "https://fr.wikipedia.org/wiki/Plateau_de_Millevaches" },
      { label: "Cascades de Gimel — le site", url: "https://www.cascadesdegimel.com/" }
    ],
    equipements: [
      "Piscine couverte chauffée",
      "Plage lac des Bariousses (Pavillon Bleu)",
      "Canoë / pédalo / SUP sur place",
      "Snack / restauration"
    ],
    chien: {
      statut: "accepte",
      note: "4€/nuit/animal. Chiens catégories 1 et 2 interdits. Carnet de vaccination obligatoire, à régler sur place. Un avis récent signale la plage du lac interdite aux chiens — à confirmer à l'accueil."
    },
    sources: [
      { label: "Tourisme Corrèze — fiche camping", url: "https://www.tourismecorreze.com/fr/tourisme_detail/flower_camping_la_plage.html" }
    ]
  }
};
