# PLANIFY SÉJOUR — Socle v0.1
_Dernière mise à jour : 2026-05-20_

---

## Positionnement

**Planify Séjour** est un planificateur de séjours et weekends AI-native, léger, personnalisé.
Il s'inscrit dans l'écosystème Planify / Prismora Solutions.

**Module flagship** : ViaRoad — prototype Marais Poitevin (mai 2026, famille Van Tongeren)
**Architecture** : extensible à tout type de séjour itinérant ou de destination

Types de séjours cibles (par ordre de priorité) :
- Weekend / Pont en famille (camping-car, gîte, hôtel)
- Séjour découverte / itinérant
- Roadtrip
- Week nature / rando
- Citybreak
- Séjour solo ou en couple
- Voyage pro (évolution)

---

## Principe directeur

> "L'IA propose, l'humain dispose."
> L'IA génère la trame, détecte les incohérences, enrichit les étapes — l'humain valide, modifie, vit.

L'IA est **au cœur**, pas en option. Chaque étape, suggestion de plan B, description de spot, adaptation météo — tout est augmenté par l'IA.

---

## Stack technique

Identique au socle Planify global :
- Front : HTML / CSS / JS vanilla
- Déploiement : GitHub Pages
- Data : Google Sheets + Apps Script (ou JSON local en v0)
- IA : API Anthropic — modèle `claude-sonnet` (dernière version stable, à vérifier à chaque session)
- Architecture mobile-first dès v0 (usage terrain, offline-first anticipé)

**Spécificité séjour** : données du séjour structurées en JSON côté client (`sejour.js`) — pivot central de toute l'app.

---

## Profil Persona — Pattern universel Planify

### Philosophie
Le profil conditionne toute la personnalisation IA : sans lui, l'app est un planning statique.
Avec lui, elle devient un assistant de voyage qui sait qui voyage, avec qui, pour quoi.

Tension : **richesse du profil vs friction d'onboarding vs RGPD**.
Solution : **profil progressif + stockage local par défaut + mode rapide "je pars ce weekend"**.

---

### Structure du profil (3 niveaux)

#### Niveau 1 — Socle (obligatoire, ~30 secondes)
| Champ | Type | Usage IA |
|---|---|---|
| Prénom organisateur | Texte | Personnalisation messages |
| Type de séjour | Select | Adapte suggestions et ton |
| Destination / région | Texte | Points d'intérêt, météo locale |
| Dates | Date début + fin | Durée, calcul J-X |
| Nombre de voyageurs | Nombre | Logistique, suggestions |
| Hébergement | Select (CC / hôtel / gîte / camping / autre) | Adapte les étapes nuit |

#### Niveau 2 — Confort (optionnel, skippable)
| Champ | Type | Usage IA |
|---|---|---|
| Composition du groupe | Multi-select (enfants, ados, seniors, animaux) | Suggestions activités adaptées |
| Âges enfants | Texte libre | Filtre activités, durées |
| Animal de compagnie | Booléen + type | Filtrage spots dog-friendly |
| Budget estimé | Nombre | Suggestions budgétaires |
| Style de séjour | Select (nature / culture / sport / détente / mix) | Ton et suggestions IA |
| Mode de transport | Select (CC / voiture / train / vélo / mixte) | Logistique étapes |

#### Niveau 3 — Enrichi (optionnel, "pour une IA encore plus proche")
| Champ | Type | Usage IA |
|---|---|---|
| Intérêts spécifiques | Tags libres (rando, gastronomie, patrimoine, geocaching…) | Suggestions ultra-ciblées |
| Contraintes / allergies | Texte libre | Filtres restauration, activités |
| Précédents séjours | Texte libre | Évite les répétitions, enrichit les suggestions |
| Applis utilisées | Multi-select (Terra Aventura, Visorando, Park4Night…) | Intégrations contextuelles |
| Notes libres | Texte | Matière brute pour l'IA |

---

### Règles RGPD & Sécurité (pattern universel Planify)

1. **Stockage local par défaut** — rien ne quitte le device sans action explicite
2. **Zéro compte obligatoire** en v0 / v1
3. **API Anthropic stateless** — données non conservées côté Anthropic ; le mentionner en 1 ligne dans l'UI
4. **Mode allégé** — l'IA fonctionne avec le niveau 1 seul
5. **Droit à l'effacement** — bouton "Réinitialiser" visible à tout moment
6. **Minimisation** — ne collecter que ce qui est utile à la personnalisation
7. **Pas de données sensibles dans les prompts** sans anonymisation
8. **Sync Sheets optionnelle** — déclenchée par l'utilisateur, jamais automatique en v0

**Mention UX recommandée :**
> "Tes réponses restent sur ton appareil. L'IA les utilise pour personnaliser ton séjour, sans les conserver."

---

## Fonctionnalités — Vision complète

### F1 — Génération du séjour par l'IA
Point de départ de tout : l'utilisateur décrit son séjour en langage naturel ou remplit le profil niveau 1.
L'IA génère une trame complète :
- Découpage par jour avec plages horaires
- Étapes typées (trajet / activité / repas / hébergement / balade / routine)
- Descriptions enrichies de chaque étape
- Estimation km à pied + temps par jour
- Lien Google Maps / Apple Maps sur chaque étape géolocalisée
- **Structure JSON exportable** prête à l'emploi dans l'app

### F2 — Roadmap interactive (vue principale)
- Navigation par jour (onglets ou swipe)
- Chaque étape = carte avec : heure, icône type, titre, description, boutons Maps, liens externes
- Plages horaires (matin / midi / après-midi / soir)
- Accent couleur par type d'étape
- Lecture offline possible (données JSON locales)

### F3 — Plan B intelligent
Pour chaque étape critique (hébergement CC, activité météo-dépendante, restaurant) :
- L'IA propose 2-3 alternatives contextualisées
- Chaque plan B : nom, note pratique, lien Maps, lien Park4Night si CC
- Accessible via bouton discret sur la carte de l'étape
- **IA** : génère les plans B à la demande, adaptés au profil (chien, CC, enfants…)

### F4 — Onglet Randos & Parcours
Vue dédiée aux contenus actifs du séjour :
- Parcours Terra Aventura : Poï'z, thème, distance, durée, difficulté, départ Maps, POIs détaillés, alertes
- Randonnées Visorando : n° de rando, distance, durée, lien direct Visorando, départ Maps
- Filtres : par type (TA / Visorando), par jour, par difficulté
- **IA** : génère les descriptions enrichies des parcours à partir des données publiques (web search)

### F5 — Checklist avant départ
- Catégories auto-générées selon le profil (chien, CC, enfants, activités prévues…)
- Items cochables, persistants en local
- Progress bar visuelle dans le header
- **IA** : génère la liste complète à partir du profil + programme du séjour

### F6 — Assistant météo & adaptations
- Intégration lien direct Météo France ville du séjour (app iPhone / Android)
- **IA** : sur demande, propose les adaptations de programme selon météo saisie manuellement ("il pleut samedi matin — que fait-on ?")
- Alertes contextuelles sur les étapes météo-sensibles (TA bottes conseillées, barque annulée…)

### F7 — "Le saviez-vous" — Contenu culturel
Issu du prototype ViaRoad : section "histoire du jour" par étape ou par destination.
- Texte court (~200 mots) sur la région, le lieu, l'histoire locale
- Ton adapté au profil (famille avec enfants = accessible et fun)
- Affiché dans un bloc collapsible sur la vue jour
- **IA** : génère 100% du contenu à partir du profil + destination + web search

### F8 — Dernier kilomètre *(Sprint 2 — feedback terrain mai 2026)*
Gap identifié lors du séjour Marais Poitevin : l'app dit *quoi faire* mais pas *comment y aller une fois sur place*.
- Sur chaque étape balade/flânerie : description pas à pas depuis le parking
- Intégration GPX Visorando (tracé ou lien direct téléchargement)
- Mini-carte de l'étape (Google Maps embed ou lien statique)
- **IA** : génère les descriptions "dernier kilomètre" à partir des coordonnées + contexte terrain

### F9 — Carte globale du séjour *(Sprint 3)*
- Vue carte avec toutes les étapes géolocalisées en séquence
- Tracé du trajet jour par jour
- Clic sur un point = détail de l'étape
- **IA** : valide la cohérence géographique du planning généré

---

## Structure JSON du séjour (pivot technique)

Hérité du prototype ViaRoad (`sejour.js`). Format de référence pour toute génération IA.

```json
{
  "id": "slug-sejour",
  "titre": "...",
  "dates": "...",
  "depart": "...",
  "hebergement": { "type": "...", "lieu": "...", "maps": {} },
  "randos": [ ],
  "checklist": [ ],
  "jours": [
    {
      "id": "j1", "numero": 1, "label": "...", "titre": "...", "emoji": "...",
      "km_balade": "...", "ambiance": "...", "histoire": "...",
      "etapes": [
        {
          "id": "j1-1", "plage": "matin", "heure": "...",
          "titre": "...", "description": "...",
          "type": "trajet|activite|repas|hebergement|balade|routine|arrivee",
          "maps": { "google": "...", "apple": "..." },
          "liens": [ { "label": "...", "url": "..." } ],
          "planB": [ ]
        }
      ]
    }
  ]
}
```

L'IA génère ce JSON en sortie — l'app le consomme directement.

---

## Intégrations tierces

| Service | Usage | Type d'intégration |
|---|---|---|
| Google Maps / Apple Maps | Lien contextuel sur chaque étape | URL scheme (pas d'API) |
| Terra Aventura | Parcours geocaching enrichis | Lien + web search IA |
| Visorando | Randonnées pédestres | Lien direct + n° de rando + GPX |
| Park4Night | Plans B hébergement CC | Lien contextuel |
| Camping-Car Park | Aires officielles | Lien contextuel |
| Météo France | Météo locale | Lien app (pas d'API en v0) |
| Anthropic API | Génération de tout le contenu | API directe (claude-sonnet) |

---

## Vues de l'app

| Vue | Icône | Description |
|---|---|---|
| Roadmap | 🗺️ | Programme jour par jour — vue principale |
| Randos | 🥾 | Tous les parcours TA + Visorando du séjour |
| Checklist | ✅ | Liste avant départ, cochable |
| Carte | 📍 | Vue globale géographique (Sprint 3) |
| Météo | 🌤️ | Lien + adaptations IA |

---

## Types d'étapes — Référentiel

| Type | Couleur | Icône type |
|---|---|---|
| `trajet` | Gris | 🚗 |
| `activite` | Bleu | 🎮 🥾 🚣 |
| `repas` | Orange | 🍽️ 🥪 |
| `hebergement` | Vert | 🏕️ |
| `balade` | Vert clair | 🚶 |
| `routine` | Jaune | ☕ |
| `arrivee` | Vert | 🏠 |

---

## Moteur IA — Règles de génération

- Modèle : `claude-sonnet` dernière version stable (vérifier à chaque session)
- Chaque appel inclut : type de séjour + destination + dates + profil niveau 1 minimum
- Profil niveau 2/3 injecté pour les suggestions activités, restaurants, filtres dog-friendly
- Web search activé pour : enrichissement POIs, météo, avis spots, Terra Aventura, Visorando
- Sortie structurée JSON pour la génération complète du séjour
- Pas de données personnelles sensibles dans les prompts (prénoms OK, pas de noms complets ni adresses)
- Langue : français par défaut
- Ton adapté au profil : famille avec enfants = accessible, fun, bienveillant — solo/couple = plus libre

---

## Feedback terrain — Sprint 1 (Marais Poitevin, mai 2026)

**✅ Ce qui a fonctionné**
- Adresses directes + liens Maps → gain de temps réel sur le terrain
- Plan B hébergement CC → utilisé mentalement même sans crise
- Terra Aventura intégré → pas besoin de sortir de l'app
- Descriptions enrichies des parcours → "le saviez-vous" apprécié

**❌ Ce qui manquait**
- Vue carte globale du séjour → Sprint 3
- Modifications de trajet à la volée ("je suis là, que faire autour ?") → Sprint 2
- Tracés précis pour flâner ("flâner où — plus précisément") → F8 Dernier kilomètre
- Contenu orienté enfants → intégrer dans le profil niveau 2

---

## Roadmap versions

| Version | Périmètre |
|---|---|
| v0.1 | Prototype ViaRoad — roadmap statique JSON, randos, checklist, plan B CC (existant) |
| v0.2 | Onboarding persona + génération IA du séjour depuis profil |
| v0.3 | F8 Dernier kilomètre + adaptations météo IA |
| v1.0 | Prod stable — multi-séjours, profil RGPD complet, PWA offline |
| v1.x | Carte globale interactive, mode "je suis là" géolocalisé |

---

## Backlog idées
> Format : [date] — Idée — Contexte d'origine

- [2026-05-20] — Mode "je suis là" : suggestions POI autour de la position GPS actuelle — Feedback terrain Sprint 1
- [2026-05-20] — Intégration GPX Visorando directement dans l'app (tracé ou téléchargement) — F8 Dernier kilomètre
- [2026-05-20] — Vue enfants : interface simplifiée avec les TA du jour et les indices à trouver — Feedback terrain Sprint 1
- [2026-05-20] — Export PDF / partage du programme jour J — Usage terrain famille
- [2026-05-20] — Score de fatigue journalière (km + météo + enfants) pour adapter le planning — Insight terrain
- [2026-05-20] — Connexion Park4Night API pour enrichir les plans B CC automatiquement — F3 Plan B
