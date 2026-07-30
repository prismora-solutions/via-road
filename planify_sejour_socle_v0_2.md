# SOCLE — Planify Séjour · v0.2

> Document de référence canonique du module **Planify Séjour** (planificateur de séjours & week-ends).
> Version 0.2 — issue de la capitalisation sur le prototype **ViaRoad Corrèze V2**.
> Principe directeur : **« L'IA propose, l'humain dispose. »**

---

## 1. Positionnement & vision

Planify Séjour aide à **construire un séjour cohérent** à partir de points d'intérêt réels, en s'appuyant sur trois sources de données fiables et complémentaires. L'IA fait le travail de dégrossissage (chercher, filtrer, structurer géographiquement, estimer les temps) ; l'humain garde la main sur la sélection finale et le rythme.

Ce n'est **ni un guide touristique passif** (qui liste tout sans hiérarchie), **ni un carnet vierge** (qui laisse tout faire à la main). C'est un **assistant de curation** : il propose une présélection argumentée, l'utilisateur valide, ajuste, réorganise, puis vit son séjour et le documente.

### Différenciateur cœur — « le dernier kilomètre »

Le moment de plus forte valeur : **découvrir un lieu exceptionnel tout proche qu'aucun outil standard n'a fait remonter** (« être à 3 km d'un truc exceptionnel et ne pas le savoir »). Tout le produit est orienté vers la réduction de cet écart de découverte hyper-locale.

### Ce que la V1 (prototype) a validé

- Un séjour se construit mieux **par secteurs géographiques** que jour par jour figé.
- Les **créneaux souples** (matin / après-midi / soir) collent mieux à un séjour réel que l'agenda à l'heure.
- La **pondération d'un avis par son volume** (4,8/5 sur 5 avis ≠ 4,5/5 sur 800 avis) est indispensable pour éviter les faux positifs.
- Un carnet de voyage qui **se remplit tout seul** au fil des visites cochées a beaucoup plus de valeur qu'un journal à remplir manuellement.
- **Ne jamais laisser une carte sans photo** avec un placeholder vide : soit une vraie photo, soit rien.

---

## 2. Cible & personas

La cible est le **tourisme régional de proximité**, plus large que le seul cas d'usage familial d'origine. Willingness to pay observée : **< 10 € par séjour préparé**.

Personas types (non exhaustif, à faire vivre) :

| Persona | Contexte | Attentes prioritaires |
|---|---|---|
| **Famille itinérante** (van/camping) | Enfants, souvent un animal | Contenu enfants, contraintes chien, rythme souple, baignade/ombre |
| **Couple week-end** | 2-3 jours, voiture | Villages de caractère, gastronomie, panoramas, insolite |
| **Randonneurs / plein air** | Sportifs, autonomie | Randos qualifiées (difficulté, dénivelé, ombrage), points d'eau |
| **Slow travelers** | Déconnexion, lenteur | Hors des sentiers battus, hyper-local, calme |
| **Grands-parents + petits-enfants** | Mobilité réduite parfois | Accessibilité, distances courtes, activités multigénérationnelles |

Le socle doit rester **agnostique du persona** : les mêmes briques (sources, fiches, secteurs, carnet) servent tous, seuls **les critères de curation** changent.

---

## 3. Les 3 sources canoniques

Décision structurante de la V2 : **s'appuyer exclusivement sur trois sources fiables**, chacune avec un rôle précis. C'est le socle data réutilisable pour tous les futurs séjours.

### 3.1 Terra Aventura — le ludique / geocaching

- **Rôle** : parcours de jeu de piste (geocaching) familiaux, gratuits, qui font découvrir un site en s'amusant.
- **Accès** : ⚠️ **pages bloquées, pas de lien direct par parcours, pas de scraping possible.** On référence les parcours via les pages info des offices de tourisme, pas via l'app TA elle-même.
- **Donnée exploitable** : nom du parcours, commune, thème, « pouces » (votes de la communauté = indicateur de popularité).
- **Spécificité UI** : tri par **pouces** puis étoiles ; badge « Incontournable » dérivé automatiquement.

### 3.2 Decathlon Outdoor — la randonnée

- **Rôle** : itinéraires de randonnée qualifiés.
- **Accès** : ✅ **accessible** (pas de blocage robots), pages avec `og:image`, avis et notes réels, deep-links vers l'app.
- **Donnée exploitable** : distance, difficulté, thème, note, **nombre d'avis**, photo officielle, lien d'ouverture dans l'app.
- ⛔ **AllTrails est totalement bloqué** (robots.txt sur tout le domaine) — inexploitable même si l'utilisateur fournit une URL. Ne pas réessayer.

### 3.3 Google Places — les visites & activités

- **Rôle** : tout le reste — villages, châteaux, panoramas, sites insolites, activités nautiques, commerces, loisirs.
- **Accès** : ✅ via l'outil `places_search` (nom, adresse, coordonnées, note, nombre d'avis, types, extraits d'avis, horaires, téléphone).
- ⚠️ **Les pages Google Maps elles-mêmes ne sont pas récupérables** (SPA JS, comme AllTrails) — impossible d'en extraire une image directement. Pour les photos, passer par les offices de tourisme (voir §4).
- **Tag utile** : `tourist_attraction` comme filtre pour faire remonter des attractions pertinentes.
- **Astuce requête** : décomposer les demandes floues en plusieurs requêtes ciblées plutôt qu'une seule requête large.

### 3.4 Synthèse

| Source | Catégorie app | Lien direct | Photo native | Notes/avis |
|---|---|---|---|---|
| Terra Aventura | Terra Aventura | ❌ | ❌ | Pouces communauté |
| Decathlon Outdoor | Randos | ✅ (app) | ✅ og:image | ✅ note + nb avis |
| Google Places | Visites / Activités | ❌ (maps non fetchable) | ❌ | ✅ note + nb avis |

---

## 4. Règle photo (canonique)

Ordre de priorité pour illustrer une fiche, **dans cet ordre** :

1. **Photo officielle** : office de tourisme (`og:image` propre, souvent créditée) ou Decathlon Outdoor. **C'est ce qui marche le mieux** — fiches produit nettes, crédit disponible.
2. **Wikipédia / Wikimedia Commons** : uniquement si le lieu a une **page dédiée avec infobox claire**. En pratique moins net (longs articles encyclopédiques, pas d'`og:image` propre) → vrai dernier recours, sites/monuments notables seulement.
3. **Rien** : pas de photo plutôt qu'un placeholder vide. **Jamais de case « ajouter une photo » vide.**

Chaque photo stocke son **crédit** (`image_credit`) affiché en légende.

---

## 5. Architecture technique

### 5.1 Stack

- **Front** : HTML / CSS / JavaScript vanilla, PWA mobile-first. Hébergement **GitHub Pages** (ou équivalent statique).
- **Données** : **Supabase** (Postgres + Storage + API REST). Migration depuis le prototype fichier (`sejour.js`) vers un backend distant.
- **Génération** : API Anthropic (`claude-sonnet`) pour la curation et les propositions.
- **Pas de framework lourd** sauf justification validée.

### 5.2 Principe de séparation des données

Héritage V1 : **les données de séjour sont isolées** du code applicatif. En V2 c'est Supabase qui joue ce rôle — le front ne contient aucune donnée de séjour en dur, tout vient d'un `fetch`. Un même front sert **n'importe quel séjour** en changeant le `sejour_id`.

### 5.3 Conventions

- Variables et commentaires **en français**.
- **Jamais d'emoji dans le code** — icônes via bibliothèque (type Lucide).
- Validation systématique avant livraison (`node -c`, contrôle anti-emoji).
- RGPD & sécurité intégrés par défaut (clés API jamais exposées côté client, anon key Supabase avec Row Level Security, données perso minimales).

---

## 6. Modèle de données

### 6.1 Entité `sejour` (nouveau — cœur de la V2)

Un utilisateur peut avoir **plusieurs séjours**. Chaque séjour porte son contexte.

```
sejour {
  id                 : text (slug, ex. "correze-2026")
  titre              : text
  destination        : text (région / zone)
  date_debut         : date
  date_fin           : date
  composition        : jsonb  // {adultes, enfants:[âges], animal:bool, ...}
  contraintes        : jsonb  // {mobilite, budget_max, chien, ...}
  camp_de_base       : jsonb  // hébergement principal (nom, adresse, coords, équipements)
  meteo_contexte     : text   // ex. "canicule", "mi-saison"
  statut             : text   // brouillon | actif | archivé
  cree_le / maj_le   : timestamp
}
```

### 6.2 Entité `spot` (point d'intérêt)

Structure unifiée pour les 3 sources. Champs communs + champs spécifiques par source.

```
spot {
  sejour_id          : text (FK)
  categorie          : terraAventura | randos | visites
  source             : terra_aventura | decathlon | google_places
  nom                : text
  lieu               : text
  distance_km        : number   // depuis le camp de base
  duree              : text      // estimation ("30-45 min", "demi-journée")
  etoiles            : int 1..3  // curation éditoriale interne
  incontournable     : bool      // dérivé (etoiles===3, ou pouces élevés)
  zone               : text      // secteur géographique (voir §8)
  tarif              : text
  description         : text
  anecdote           : text      // le petit "+" narratif
  anecdote_source    : jsonb     // sources de l'anecdote
  image_url          : text
  image_credit       : text
  chien_statut       : accepte | laisse | interdit | a_verifier
  chien_note         : text
  sources            : jsonb     // liens officiels

  // Spécifique Terra Aventura
  likes              : int       // pouces communauté
  theme              : text

  // Spécifique Decathlon (randos)
  difficulte         : facile | modere | ...
  note_decathlon     : number
  nb_avis            : int
  app_url            : text      // deep-link app

  // Spécifique Google Places (visites/activités)
  note_google        : number
  avis_google        : int
}
```

### 6.3 Entité `ressource` (commerces & activités locales)

```
ressource {
  sejour_id          : text (FK)
  categorie          : supermarche | epicerie | boulangerie | pharmacie |
                       veterinaire | nautique | loisirs | autre
  nom, adresse, tel, horaires
  note               : text      // note libre
  note_google        : number    // pour catégories activités
  avis_google        : int
  maps_url           : text
}
```

Distinction d'affichage : catégories **pratiques** (courses, santé) vs **activités** (nautique, loisirs) rendues dans deux sections séparées.

### 6.4 Entité `vecu` (carnet — « on l'a fait »)

```
vecu {
  sejour_id, item_id : identifiants
  fait               : bool
  date               : date
  commentaire        : text      // note perso
  photos             : text[]    // photos perso (Storage)
}
```

Format lien Google Maps fiable (ouverture app iPhone) :
`https://www.google.com/maps/search/?api=1&query=lat,lng`

---

## 7. Le flux de construction d'un séjour ⭐

**C'est l'objet central de la V2.** En V1, tout a été fait « à la main » via l'assistant. En V2, l'utilisateur **paramètre et choisit ses critères**, l'IA construit.

### Étape 1 — Contexte du séjour

L'utilisateur renseigne (formulaire léger, valeurs par défaut intelligentes) :
- **Destination** (région / commune / rayon d'exploration).
- **Dates** (→ contexte météo/saison).
- **Composition** du groupe (adultes, enfants + âges, animal).
- **Camp de base** (hébergement) → tous les `distance_km` se calculent depuis là.
- **Contraintes** : mobilité, budget, gratuit prioritaire, etc.

### Étape 2 — Critères de curation

L'utilisateur pondère ce qui compte (sélection de tags, pas de saisie libre) :
- **Profils** : enfants / ados / chien / accessibilité.
- **Ambiances** : village pittoresque, château/ruine, panorama, insolite, cascade/eau, forêt/ombre.
- **Contraintes météo** : ex. canicule → priorité ombre + baignade.
- **Intensité** : « à la cool » ↔ « on enchaîne ».
- **Gratuit** : oui/si possible/indifférent.

### Étape 3 — Génération IA (les 3 sources)

L'IA interroge les 3 sources selon les critères et produit une **présélection argumentée** :
- **Terra Aventura** : parcours du secteur, triés par pouces.
- **Decathlon Outdoor** : randos filtrées (proximité, difficulté, ombrage, chien, note pondérée).
- **Google Places** : visites/activités (villages, châteaux, panoramas, insolite, nautique) filtrées par tag `tourist_attraction` + critères.

Chaque proposition arrive **enrichie** : distance, durée estimée, note + volume d'avis, statut chien, tarif, photo (règle §4), anecdote, secteur.

### Étape 4 — Curation humaine

L'utilisateur **garde / écarte / ajoute** chaque spot. Il peut :
- Éditer une fiche (corriger, enrichir).
- Ajouter un spot manuellement.
- Ajouter une photo si absente.

### Étape 5 — Organisation

- Assignation automatique d'un **secteur** à chaque spot.
- Proposition de **blocs de journée** (voir §9) — géographiques + thématiques, sans agenda rigide.

---

## 8. Secteurs géographiques

**Regroupement pratique** (« qu'est-ce qui est sur la route de quoi »), pas du GPS fin. Nombre fixe de secteurs par séjour (ex. 7 en Corrèze). Chaque spot porte un champ `zone`.

**Navigation (validée V2)** :
- Badge cliquable **« Secteur : X »** sur chaque carte.
- Clic → **popup glissante** listant tous les spots du secteur (toutes catégories mélangées, icône par catégorie).
- Clic sur un spot → change d'onglet, scroll jusqu'à la carte, **flash de repérage** (1,6 s).
- Fermeture par `X` ou tap extérieur → retour exact à la position précédente. Pas de navigation à empiler, pas d'état perdu.

Bénéfice : **toujours à jour automatiquement** — un nouveau spot rejoint son secteur sans retravailler quoi que ce soit.

---

## 9. Règles de génération IA

### 9.1 Sélection & pondération

- **Proximité** au camp de base (rayon paramétrable, défaut ~40 km).
- **Note pondérée par le volume d'avis** — signaler explicitement une note flatteuse sur faible volume (« 5/5 mais 3 avis »).
- **Filtres profil** : chien (statut réel si trouvé, sinon `a_verifier` — ne pas inventer), enfants (chercher confirmation dans les avis).
- **Éviter les doublons** (ex. un village déjà couvert par un parcours Terra Aventura).
- **Respecter la nature de la demande** : village/château/panorama/insolite ≠ contenu culturel lourd si l'utilisateur veut « pas trop d'histoire ».

### 9.2 Anti-surcharge (règle météo/rythme)

Héritée du cas canicule, généralisable :
- **Ne pas tout proposer** — certaines choses ressortent naturellement, c'est suffisant.
- **Ne pas surcharger une journée** : laisser respirer (grasse matinée possible, fin d'après-midi à buller).
- **Adapter à la météo** : canicule → ombre, eau, éviter les sites exposés en plein midi.
- **Ne pas meubler** avec du remplissage (pas de « prendre le temps du petit déjeuner ») — l'objet est l'**organisation optimisée des visites**, pas le narratif de vie quotidienne.

### 9.3 Blocs de journée (restitution)

L'IA propose des **regroupements** (pas un calendrier figé) mêlant activités / Terra / rando / visite / temps libre :
- **Blocs géographiques** : tout ce qui se combine dans un même secteur.
- **Blocs thématiques** : « journée zéro voiture », « petites pattes » (enfants), « nature & ombre »...
- **Flottants** : spots isolés à caser au gré de l'humeur.
- **À écarter** : les excentrés qui ne rentrent dans aucun bloc léger (ex. un parcours à 75 km / 1 jour complet) — soit journée dédiée, soit abandon.

---

## 10. Carnet de voyage

### 10.1 Principe

Le carnet **se remplit tout seul** : cocher « On l'a fait » sur un spot crée une entrée datée. Esthétique **scrapbook fait main** (washi tape, léger désordre, tampons, écriture manuscrite).

### 10.2 Auto-enrichissement

Si l'utilisateur coche sans rien ajouter, la carte reste riche : elle affiche **la photo officielle et la description du spot** (style italique distinct des notes perso manuscrites). Le carnet reste vivant même sans effort à chaque étape.

### 10.3 Export

- Export **PDF** façon carnet de route assemblé à la main.
- **Point de vigilance technique** : les navigateurs **n'impriment pas les couleurs de fond par défaut** → forcer `print-color-adjust: exact` pour préserver le décor. Garder une **légère inclinaison** à l'impression (pas de remise à plat).

---

## 11. Multi-séjours & bibliothèque

- Un utilisateur gère **plusieurs séjours** (brouillon / actif / archivé).
- Un séjour terminé devient un **carnet consultable** — la mémoire des voyages.
- **Réutilisation** : dupliquer un séjour, repartir d'un modèle.
- **Portabilité** : import/export d'un séjour en JSON (sauvegarde, partage).

---

## 12. Profil progressif (RGPD)

Système à **3 niveaux**, données personnelles minimales, conforme RGPD :

1. **Anonyme** : aucune donnée perso, tout en local / session. Construction possible sans compte.
2. **Léger** : préférences de curation mémorisées (profils, ambiances), sans identité.
3. **Complet** : compte, multi-séjours synchronisés, carnet persistant, photos.

Principe : **on n'exige rien au démarrage**. L'utilisateur monte en niveau seulement s'il veut persister/synchroniser. Consentement explicite à chaque palier.

---

## 13. Idées de développement (pistes)

Dans l'esprit du socle, à prioriser plus tard :

- **Replanification météo dynamique** : si la météo change, l'app resuggère (déplacer un site exposé, avancer une baignade).
- **Alerte « dernier kilomètre »** : géofencing léger — « tu es à 2 km d'un spot 5★ non prévu, détour de 6 min ». Le cœur du différenciateur, rendu actif.
- **Plan B intelligent** : pour chaque spot, une alternative proche préchargée (fermeture, pluie, affluence).
- **Score de charge d'une journée** : jauge « fatigue/temps de route » pour éviter les journées surchargées — cohérent avec la règle anti-surcharge.
- **Couche enfants** : contenu dédié (énigmes, quiz, « qu'est-ce qu'on va voir »), signalé sur les fiches kid-friendly.
- **Séjour collaboratif** : plusieurs personnes co-construisent un même séjour (couple, groupe d'amis).
- **Bibliothèque communautaire** : des séjours-modèles partagés par région, point de départ clé en main (mutualise l'effort de curation).
- **Mode hors-ligne complet** : PWA + cache, indispensable en van/zone blanche (déjà partiellement là via la file d'attente).
- **Guidage marche fine** : directions pas-à-pas pour les balades/flâneries — l'angle « dernier kilomètre » à l'échelle du pas.
- **Générateur de blocs de journée par IA** : passer du regroupement suggéré à des journées assemblées automatiquement, ajustables.

---

## 14. Roadmap versionnée

| Version | Contenu |
|---|---|
| **v0.1** | Socle initial (fichier), prototype ViaRoad Marais Poitevin |
| **v0.2** *(ce doc)* | Backend Supabase, 3 sources canoniques, secteurs + popup, carnet auto-enrichi, export PDF fiable, règle photo |
| **v0.3** *(à venir)* | Flux de construction paramétré (onboarding + critères + génération IA), multi-séjours |
| **v0.4** | Blocs de journée générés, score de charge, plan B |
| **v0.5** | Alerte dernier kilomètre (géofencing), mode hors-ligne complet |
| **v1.0** | Bibliothèque communautaire, séjour collaboratif |

---

## 15. Principes & conventions (rappel)

- **L'IA propose, l'humain dispose** — présélection argumentée, décision humaine.
- **AI-native, pas AI-saupoudré** — l'IA au cœur, pas en périphérie.
- **MVP fonctionnel d'abord**, UI soignée, architecture évolutive, pas de sur-ingénierie.
- **Séparation des données** — backend interchangeable sans refonte du front.
- **3 sources fiables** — Terra Aventura, Decathlon Outdoor, Google Places, chacune son rôle.
- **Jamais de case vide**, jamais d'emoji dans le code, variables/commentaires FR.
- **RGPD & sécurité par défaut** — données minimales, clés protégées, consentement par palier.
- **Terrain d'abord** — chaque itération se valide en usage réel, puis se formalise dans ce socle.
