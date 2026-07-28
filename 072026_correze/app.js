// ===== SUPABASE =====
const SUPABASE_URL = 'https://mglxaazwjmtdtjolfivb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbHhhYXp3am10ZHRqb2xmaXZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNjExNTksImV4cCI6MjEwMDczNzE1OX0.SL-ztnHckX3gCH_QPA8vGX906QRSab45Yfg61jPVE68';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const BUCKET = 'carnet-photos';

// ===== ÉTAT =====
let ongletActif = 'camping';
let vecuEtat = {};    // { [spotId]: { fait, date, commentaire, photos: [chemin,...] } }
let CATALOGUE = { terraAventura: [], randos: [], visites: [] }; // rempli depuis Supabase (table "spots")
let RESSOURCES = [];  // rempli depuis Supabase (table "ressources")
let horsLigne = false;
let erreurCatalogue = null;

// Icônes Lucide (https://lucide.dev) — un nom par usage
const ICONE = {
  camping: 'tent', terraAventura: 'gamepad-2', randos: 'footprints', visites: 'landmark', carnet: 'book-open',
  caravane: 'caravan', chien: 'dog', famille: 'users', sejour: 'compass',
  distance: 'map-pin', longueur: 'ruler', duree: 'clock', tarif: 'banknote',
  maps: 'map-pin', source: 'link', tel: 'phone', incontournable: 'lock',
  fait: 'check-circle-2', modifier: 'pencil', enregistrer: 'save', decocher: 'undo-2',
  ajouter: 'circle-plus', supprimer: 'x', ampoule: 'lightbulb', chevron: 'chevron-right',
  supermarche: 'shopping-cart', epicerie: 'store', boulangerie: 'croissant', pharmacie: 'pill', veterinaire: 'paw-print', autre: 'store',
  nautique: 'sailboat', loisirs: 'trees',
  panier: 'shopping-basket', avertissement: 'triangle-alert', interdit: 'ban', export: 'download',
  horsligne: 'wifi-off', synchro: 'refresh-cw', editer: 'file-pen-line', corbeille: 'trash-2', anecdote: 'sparkles', photo: 'camera', info: 'info', tampon: 'stamp', pouce: 'thumbs-up', avis: 'users', app: 'smartphone'
};

const CHIEN_LABEL = {
  accepte:    { texte: 'Chien accepté',          classe: 'chien-ok',   icone: ICONE.chien },
  laisse:     { texte: 'Chien accepté (laisse)', classe: 'chien-ok',   icone: ICONE.chien },
  a_verifier: { texte: 'Chien à vérifier',       classe: 'chien-warn', icone: ICONE.avertissement },
  interdit:   { texte: 'Chien interdit',         classe: 'chien-non',  icone: ICONE.interdit }
};

const CATEGORIE_LABEL = { terraAventura: 'Terra Aventura', randos: 'Rando / balade', visites: 'Visite' };
const CHIEN_OPTIONS = [
  ['accepte', 'Accepté'], ['laisse', 'Accepté (laisse)'], ['a_verifier', 'À vérifier'], ['interdit', 'Interdit']
];
const RESSOURCE_CATEGORIES = [
  ['supermarche', 'Supermarché'], ['epicerie', 'Épicerie / commerce'], ['boulangerie', 'Boulangerie'],
  ['pharmacie', 'Pharmacie'], ['veterinaire', 'Vétérinaire'],
  ['nautique', 'Activité nautique'], ['loisirs', 'Loisirs / activité'], ['autre', 'Autre']
];

const ONGLETS = [
  { id: 'camping',       icone: ICONE.camping,       label: 'Bienvenue' },
  { id: 'terraAventura', icone: ICONE.terraAventura, label: 'Terra Aventura',
    intro: "Le prétexte parfait pour explorer un village à hauteur d'enfant : on cherche les indices, on lève le nez, on découvre ce qu'on ne verrait jamais depuis la voiture." },
  { id: 'randos',        icone: ICONE.randos,        label: 'Randos',
    intro: "Des balades courtes, en forêt ou au bord de l'eau — pensées pour des petites jambes et une truffe curieuse, pas pour battre des records." },
  { id: 'visites',       icone: ICONE.visites,       label: 'Visites',
    intro: "Les haltes où on pose le sac : villages, panoramas, cascades — pour souffler et admirer, sans forcément marcher des heures." },
  { id: 'carnet',        icone: ICONE.carnet,        label: 'Carnet',
    intro: "Le résumé du séjour qui s'écrit tout seul au fil des coches — à relire ce soir, sous l'auvent." }
];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
  rendreNavOnglets();
  await Promise.all([chargerCatalogueDistant(), chargerVecuDistant()]);
  rendreHeader();
  rendreOnglet('camping');
  ecouterTempsReel();
  window.addEventListener('online', synchroniserFileAttente);
  synchroniserFileAttente();
  afficherIntroSiPremiereFois();
});

function afficherIntroSiPremiereFois() {
  if (!localStorage.getItem(`intro-vue-${SEJOUR.id}`)) ouvrirIntro();
}
function ouvrirIntro() {
  document.getElementById('intro-titre').textContent = SEJOUR.titre;
  document.getElementById('intro-texte').textContent = SEJOUR.introPopup;
  document.getElementById('intro-overlay').classList.add('visible');
  rafraichirIcones();
}
function fermerIntro() {
  document.getElementById('intro-overlay').classList.remove('visible');
  localStorage.setItem(`intro-vue-${SEJOUR.id}`, '1');
}

function rafraichirIcones() { if (window.lucide) lucide.createIcons(); }
function ic(nom, classe) { return `<i data-lucide="${nom}" class="ic ${classe || ''}"></i>`; }

// ===== NORMALISATION DES LIGNES SUPABASE =====
function normaliserSpot(row) {
  return {
    id: row.id, nom: row.nom, poiz: row.poiz, lieu: row.lieu,
    distanceKm: row.distance_km, longueur: row.longueur, duree: row.duree,
    etoiles: row.etoiles, incontournable: row.incontournable,
    chien: { statut: row.chien_statut, note: row.chien_note },
    tarif: row.tarif, description: row.description,
    anecdote: row.anecdote, anecdoteSource: row.anecdote_source || [],
    likes: row.likes,
    difficulte: row.difficulte, theme: row.theme, noteDecathlon: row.note_decathlon, nbAvis: row.nb_avis, appUrl: row.app_url,
    noteGoogle: row.note_google, avisGoogle: row.avis_google,
    imagePath: row.image_path, imageUrl: row.image_url, imageCredit: row.image_credit,
    maps: { google: row.maps_url },
    sources: row.sources || []
  };
}
function normaliserRessource(row) {
  return {
    id: row.id, nom: row.nom, categorie: row.categorie, adresse: row.adresse,
    tel: row.tel ? 'tel:' + row.tel.replace(/\s+/g, '') : null, telAffiche: row.tel,
    horaires: row.horaires, note: row.note,
    maps: { google: row.maps_url }
  };
}

// ===== CHARGEMENT DU CATALOGUE (spots + ressources) =====
async function chargerCatalogueDistant() {
  try {
    const [{ data: spots, error: e1 }, { data: ress, error: e2 }] = await Promise.all([
      sb.from('spots').select('*').eq('sejour_id', SEJOUR.id),
      sb.from('ressources').select('*').eq('sejour_id', SEJOUR.id)
    ]);
    if (e1 || e2) throw (e1 || e2);
    CATALOGUE = { terraAventura: [], randos: [], visites: [] };
    (spots || []).forEach(row => CATALOGUE[row.categorie].push(normaliserSpot(row)));
    RESSOURCES = (ress || []).map(normaliserRessource);
    erreurCatalogue = null;
  } catch (e) {
    erreurCatalogue = (e && e.message) ? e.message : String(e);
    console.error('Erreur de chargement du catalogue Supabase :', e);
  }
}

function ecouterTempsReel() {
  sb.channel(`vecu-${SEJOUR.id}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'vecu_entries', filter: `sejour_id=eq.${SEJOUR.id}` },
      (payload) => {
        if (payload.eventType === 'DELETE') delete vecuEtat[payload.old.item_id];
        else { const r = payload.new; vecuEtat[r.item_id] = { fait: r.fait, date: r.date, commentaire: r.commentaire, photos: r.photos || [] }; }
        rendreHeader(); rendreOnglet(ongletActif);
      }).subscribe();

  sb.channel(`spots-${SEJOUR.id}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'spots', filter: `sejour_id=eq.${SEJOUR.id}` },
      async () => { await chargerCatalogueDistant(); rendreHeader(); rendreOnglet(ongletActif); }).subscribe();

  sb.channel(`ressources-${SEJOUR.id}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'ressources', filter: `sejour_id=eq.${SEJOUR.id}` },
      async () => { await chargerCatalogueDistant(); rendreOnglet(ongletActif); }).subscribe();
}

// ===== IDENTIFIANTS TRAÇABLES (vécu) =====
function tousLesItemsTracables() {
  const liste = [];
  ['terraAventura', 'randos', 'visites'].forEach(cat => {
    CATALOGUE[cat].forEach(item => liste.push({ id: item.id, cat, item }));
  });
  return liste;
}

// ===== PERSISTANCE VÉCU — Supabase + file d'attente hors-ligne =====
async function chargerVecuDistant() {
  try {
    const { data, error } = await sb.from('vecu_entries').select('*').eq('sejour_id', SEJOUR.id);
    if (error) throw error;
    vecuEtat = {};
    (data || []).forEach(row => { vecuEtat[row.item_id] = { fait: row.fait, date: row.date, commentaire: row.commentaire, photos: row.photos || [] }; });
    definirStatutReseau(false);
  } catch (e) { definirStatutReseau(true); }
}

function lireFileAttente() { const s = localStorage.getItem(`file-attente-${SEJOUR.id}`); return s ? JSON.parse(s) : []; }
function ecrireFileAttente(f) { localStorage.setItem(`file-attente-${SEJOUR.id}`, JSON.stringify(f)); }
function ajouterFileAttente(op) { const f = lireFileAttente(); f.push(op); ecrireFileAttente(f); }

async function synchroniserFileAttente() {
  let file = lireFileAttente();
  if (!file.length) { definirStatutReseau(false); return; }
  const restantes = [];
  for (const op of file) {
    try {
      if (op.type === 'upsert') { const { error } = await sb.from('vecu_entries').upsert(op.donnees, { onConflict: 'sejour_id,item_id' }); if (error) throw error; }
      else if (op.type === 'delete') { const { error } = await sb.from('vecu_entries').delete().eq('sejour_id', SEJOUR.id).eq('item_id', op.id); if (error) throw error; }
    } catch (e) { restantes.push(op); }
  }
  ecrireFileAttente(restantes);
  definirStatutReseau(restantes.length > 0);
  if (restantes.length < file.length) { await chargerVecuDistant(); rendreHeader(); rendreOnglet(ongletActif); }
}

function definirStatutReseau(actif) {
  horsLigne = actif;
  const w = document.getElementById('statut-reseau');
  if (w) w.style.display = horsLigne ? 'flex' : 'none';
}

// ===== PHOTOS (Supabase Storage) =====
function cheminSanitize(nom) { return nom.replace(/[^a-zA-Z0-9.\-]/g, '_'); }
async function televerserPhotos(id, fichiers) {
  const chemins = [];
  for (let i = 0; i < fichiers.length; i++) {
    const chemin = `${SEJOUR.id}/${id}/${Date.now()}-${i}-${cheminSanitize(fichiers[i].name)}`;
    const { error } = await sb.storage.from(BUCKET).upload(chemin, fichiers[i]);
    if (!error) chemins.push(chemin);
  }
  return chemins;
}
function urlPhoto(chemin) { return sb.storage.from(BUCKET).getPublicUrl(chemin).data.publicUrl; }

function declencherPhotoSpot(id) {
  document.getElementById(`photo-spot-${id}`).click();
}
async function televerserPhotoSpotEtEnregistrer(id) {
  const input = document.getElementById(`photo-spot-${id}`);
  const fichier = input.files[0];
  if (!fichier) return;
  const chemin = `${SEJOUR.id}/spots/${id}-${Date.now()}-${cheminSanitize(fichier.name)}`;
  try {
    const { error: errUp } = await sb.storage.from(BUCKET).upload(chemin, fichier);
    if (errUp) throw errUp;
    const { error: errMaj } = await sb.from('spots').update({ image_path: chemin, updated_at: new Date().toISOString() }).eq('id', id);
    if (errMaj) throw errMaj;
  } catch (e) { alert("Impossible d'ajouter la photo — vérifie ta connexion."); return; }
  await chargerCatalogueDistant();
  rendreOnglet(ongletActif);
}
function rendrePhotosHtml(id, photos) {
  if (!photos || !photos.length) return '';
  return `<div class="vecu-photos">${photos.map(chemin => `
    <div class="vecu-photo-wrap">
      <img class="vecu-photo" src="${urlPhoto(chemin)}" loading="lazy">
      <button class="vecu-photo-suppr" onclick="supprimerUnePhoto('${id}','${chemin}')">${ic(ICONE.supprimer)}</button>
    </div>`).join('')}</div>`;
}

// ===== UTILS =====
function ajourdhuiISO() { return new Date().toISOString().slice(0, 10); }
function formaterDate(iso) { if (!iso) return ''; const d = new Date(iso + 'T12:00:00'); return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }); }
function formaterDateCourte(iso) { if (!iso) return ''; const d = new Date(iso + 'T12:00:00'); return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }); }
function echapper(txt) { const div = document.createElement('div'); div.textContent = txt || ''; return div.innerHTML; }
function val(id) { const el = document.getElementById(id); return el ? el.value : ''; }

function entreesVecuTriees() {
  return tousLesItemsTracables()
    .map(({ id, cat, item }) => ({ id, cat, item, v: vecuEtat[id] }))
    .filter(e => e.v && e.v.fait)
    .sort((a, b) => a.v.date.localeCompare(b.v.date));
}

// ===== HEADER =====
function rendreHeader() {
  document.getElementById('sejour-titre').textContent = SEJOUR.titre;
  document.getElementById('sejour-meta').textContent = `${SEJOUR.dates} · ${SEJOUR.destination}`;
  const badges = document.getElementById('sejour-badges');
  badges.innerHTML = [
    { icone: ICONE.caravane, texte: 'Caravane' }, { icone: ICONE.chien, texte: 'Alma' }, { icone: ICONE.famille, texte: 'Famille' }
  ].map(b => `<span class="badge">${ic(b.icone)} ${b.texte}</span>`).join('');

  const entrees = entreesVecuTriees();

  const friseHtml = entrees.length
    ? `<div class="header-frise-scroll">
        <svg class="header-frise-svg" id="header-frise-svg"><path id="header-frise-chemin"/></svg>
        <div class="header-frise-points" id="header-frise-points">
          ${entrees.map(e => `
            <div class="header-frise-point" title="${echapper(e.item.nom)}">
              <div class="header-frise-cercle">${ic(ONGLETS.find(o => o.id === e.cat).icone)}</div>
              <span class="header-frise-date">${formaterDateCourte(e.v.date)}</span>
            </div>`).join('')}
        </div>
      </div>`
    : `<div class="header-frise-vide">Coche ta première étape pour démarrer la frise</div>`;

  badges.innerHTML += `<div style="width:100%;margin-top:10px">${friseHtml}</div>`;
  rafraichirIcones();
  if (entrees.length) dessinerFriseHeader();
}

function dessinerFriseHeader() {
  const scroll = document.querySelector('.header-frise-scroll');
  const svg = document.getElementById('header-frise-svg');
  const chemin = document.getElementById('header-frise-chemin');
  const points = [...document.querySelectorAll('.header-frise-point')];
  if (!scroll || !points.length) return;

  requestAnimationFrame(() => {
    const largeur = document.getElementById('header-frise-points').scrollWidth;
    svg.setAttribute('viewBox', `0 0 ${largeur} 56`);
    svg.style.width = largeur + 'px';

    const centres = points.map(p => p.offsetLeft + p.offsetWidth / 2);
    let d = `M${centres[0]} 20`;
    for (let i = 1; i < centres.length; i++) {
      const xMid = (centres[i - 1] + centres[i]) / 2;
      const decalage = i % 2 === 0 ? 12 : -12;
      d += ` Q ${xMid} ${20 + decalage} ${centres[i]} 20`;
    }
    chemin.setAttribute('d', d);
  });
}

// ===== NAVIGATION =====
function rendreNavOnglets() {
  const nav = document.getElementById('nav-jours');
  nav.innerHTML = ONGLETS.map(o => `
    <button class="nav-jour-btn ${o.id === ongletActif ? 'actif' : ''}" onclick="changerOnglet('${o.id}')">
      ${ic(o.icone, 'nav-icone')}<span class="nav-label">${o.label}</span>
    </button>`).join('');
  rafraichirIcones();
}
function changerOnglet(id) {
  ongletActif = id;
  document.querySelectorAll('.nav-jour-btn').forEach((btn, i) => btn.classList.toggle('actif', ONGLETS[i].id === id));
  rendreOnglet(id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== RENDU ONGLET =====
function rendreOnglet(id) {
  const main = document.getElementById('main-content');
  if (id === 'camping') { main.innerHTML = rendreCamping(); rafraichirIcones(); return; }
  if (id === 'carnet')  { rendreCarnet(); return; }

  const items = CATALOGUE[id].slice().sort((a, b) => {
    const pouceA = (a.likes !== null && a.likes !== undefined) ? a.likes : -1;
    const pouceB = (b.likes !== null && b.likes !== undefined) ? b.likes : -1;
    if (pouceB !== pouceA) return pouceB - pouceA;
    return b.etoiles - a.etoiles || a.nom.localeCompare(b.nom);
  });
  const meta = ONGLETS.find(o => o.id === id);

  const erreurHtml = erreurCatalogue ? `
    <div class="carnet-vide" style="border:2px dashed var(--rouge);margin-bottom:14px">
      ${ic(ICONE.avertissement, 'carnet-vide-icone')}
      <p style="color:var(--rouge)"><strong>Connexion à la base impossible.</strong><br>${echapper(erreurCatalogue)}</p>
    </div>` : '';

  main.innerHTML = `
    <div class="onglet-header">
      ${ic(meta.icone, 'onglet-icone')}
      <div class="onglet-header-texte">
        <div class="onglet-titre">${meta.label}</div>
        <div class="onglet-sub">${items.length} spot${items.length > 1 ? 's' : ''} · triés par intérêt</div>
      </div>
      <button class="btn-ajouter-spot" onclick="toggleForm('nouveau-${id}')">${ic(ICONE.ajouter)} Ajouter</button>
    </div>
    ${meta.intro ? `<div class="onglet-intro">${meta.intro}</div>` : ''}
    ${erreurHtml}
    ${rendreFormSpot(id, null)}
    ${items.map(item => rendreCarteItem(item, id)).join('')}`;
  rafraichirIcones();
}

// ===== ÉTOILES =====
function rendreEtoiles(n) { let h = ''; for (let i = 1; i <= 3; i++) h += ic('star', i <= n ? 'etoile pleine' : 'etoile vide'); return h; }

// ===== CARTE ITEM (Terra Aventura / Randos / Visites) =====
function rendreCarteItem(item, cat) {
  const id = item.id;
  const chien = CHIEN_LABEL[item.chien.statut];
  const badge = item.etoiles === 3 ? `<span class="badge-incontournable">${ic(ICONE.incontournable)} Incontournable</span>` : '';

  const infos = [];
  if (item.distanceKm !== null && item.distanceKm !== undefined) infos.push(`${ic(ICONE.distance)} ${item.distanceKm === 0 ? 'Sur place' : item.distanceKm + ' km'}`);
  if (item.longueur) infos.push(`${ic(ICONE.longueur)} ${item.longueur}`);
  if (item.duree) infos.push(`${ic(ICONE.duree)} ${item.duree}`);
  if (item.tarif) infos.push(`${ic(ICONE.tarif)} ${item.tarif}`);

  const sources = (item.sources || []).map(s => `<a class="btn-source" href="${s.url}" target="_blank" rel="noopener">${ic(ICONE.source)} ${s.label}</a>`).join('');

  const anecdoteHtml = item.anecdote ? `
    <div class="jour-histoire anecdote-carte">
      <div class="jour-histoire-header" onclick="toggleHistoire('anecdote-${id}')">
        <span>${ic(ICONE.anecdote)} Une anecdote à raconter</span>
        <span class="jour-histoire-arrow" id="arrow-anecdote-${id}">${ic(ICONE.chevron)}</span>
      </div>
      <div class="jour-histoire-content" id="anecdote-${id}">
        <p>${item.anecdote}</p>
        ${(item.anecdoteSource || []).length ? `<div class="item-footer" style="margin-top:10px">${item.anecdoteSource.map(s => `<a class="btn-source" href="${s.url}" target="_blank" rel="noopener">${ic(ICONE.source)} ${s.label}</a>`).join('')}</div>` : ''}
      </div>
    </div>` : '';

  let photoHtml = '';
  if (item.imageUrl) {
    photoHtml = `<div class="item-photo-wrap"><img class="item-photo" src="${item.imageUrl}" loading="lazy">${item.imageCredit ? `<div class="item-photo-legende">${echapper(item.imageCredit)}</div>` : ''}</div>`;
  } else if (item.imagePath) {
    photoHtml = `<div class="item-photo-wrap" onclick="declencherPhotoSpot('${id}')"><img class="item-photo" src="${urlPhoto(item.imagePath)}" loading="lazy"></div>`;
  }
  const inputPhotoCache = `<input type="file" id="photo-spot-${id}" accept="image/*" style="display:none" onchange="televerserPhotoSpotEtEnregistrer('${id}')">`;

  const btnPhotoDiscret = (!item.imageUrl && !item.imagePath)
    ? `<button class="btn-icone" onclick="declencherPhotoSpot('${id}')" title="Ajouter une photo">${ic(ICONE.photo)}</button>` : '';

  return `
    <div class="item-carte">
      ${photoHtml}${inputPhotoCache}
      <div class="item-header">
        <div class="item-titre">${item.nom}</div>
        <div class="item-actions">
          ${badge}
          ${btnPhotoDiscret}
          <button class="btn-icone" onclick="toggleForm('${id}')" title="Modifier la fiche">${ic(ICONE.editer)}</button>
        </div>
      </div>
      <div class="item-lieu">${ic(ICONE.distance)} ${item.lieu || ''}</div>
      ${(item.difficulte || item.theme) ? `<div class="item-tags-decathlon">${item.difficulte ? `<span class="tag-difficulte tag-${item.difficulte}">${item.difficulte === 'facile' ? 'Facile' : 'Modérée'}</span>` : ''}${item.theme ? `<span class="tag-theme">${item.theme}</span>` : ''}</div>` : ''}
      <div class="item-etoiles">${rendreEtoiles(item.etoiles)}${(item.likes !== null && item.likes !== undefined) ? `<span class="item-likes">${ic(ICONE.pouce)} ${item.likes}</span>` : ''}${(item.noteDecathlon !== null && item.noteDecathlon !== undefined) ? `<span class="item-likes">${ic(ICONE.avis)} ${item.noteDecathlon}/5 (${item.nbAvis || 0} avis)</span>` : ''}${(item.noteGoogle !== null && item.noteGoogle !== undefined) ? `<span class="item-likes">${ic(ICONE.avis)} ${item.noteGoogle}/5 (${item.avisGoogle || 0} avis Google)</span>` : ''}</div>
      <div class="item-infos">${infos.map(i => `<span>${i}</span>`).join('')}</div>
      <p class="item-desc">${item.description || ''}</p>
      ${anecdoteHtml}
      <div class="chien-tag ${chien.classe}">${ic(chien.icone)} ${chien.texte}${item.chien.note ? ` — <span class="chien-note">${item.chien.note}</span>` : ''}</div>
      <div class="item-footer">
        ${item.maps.google ? `<a class="btn-maps" href="${item.maps.google}" target="_blank" rel="noopener">${ic(ICONE.maps)} Maps</a>` : ''}
        ${item.appUrl ? `<a class="btn-lien" href="${item.appUrl}" target="_blank" rel="noopener">${ic(ICONE.app)} Ouvrir l'app</a>` : ''}
        ${sources}
      </div>
      ${rendreFormSpot(cat, item)}
      ${rendreBlocVecu(id)}
    </div>`;
}

// ===== FORMULAIRE SPOT (ajout + édition, Terra Aventura/Randos/Visites) =====
function rendreFormSpot(cat, item) {
  const id = item ? item.id : `nouveau-${cat}`;
  const sourcesTexte = (item && item.sources || []).map(s => `${s.label}|${s.url}`).join('\n');
  return `
    <div class="spot-form" id="form-${id}" style="display:none">
      <label class="vecu-label">Nom du spot</label>
      <input type="text" class="vecu-input" id="sf-nom-${id}" value="${item ? echapper(item.nom) : ''}">

      <label class="vecu-label">Lieu</label>
      <input type="text" class="vecu-input" id="sf-lieu-${id}" value="${item ? echapper(item.lieu) : ''}">

      <div class="spot-form-grille">
        <div>
          <label class="vecu-label">Distance (km)</label>
          <input type="number" step="0.1" class="vecu-input" id="sf-distance-${id}" value="${item && item.distanceKm !== null ? item.distanceKm : ''}">
        </div>
        <div>
          <label class="vecu-label">Étoiles</label>
          <select class="vecu-input" id="sf-etoiles-${id}">
            <option value="1" ${item && item.etoiles === 1 ? 'selected' : ''}>1 étoile</option>
            <option value="2" ${!item || item.etoiles === 2 ? 'selected' : ''}>2 étoiles</option>
            <option value="3" ${item && item.etoiles === 3 ? 'selected' : ''}>3 étoiles</option>
          </select>
        </div>
      </div>

      <div class="spot-form-grille">
        <div>
          <label class="vecu-label">Longueur</label>
          <input type="text" class="vecu-input" id="sf-longueur-${id}" placeholder="ex: 6 km" value="${item ? echapper(item.longueur) : ''}">
        </div>
        <div>
          <label class="vecu-label">Durée</label>
          <input type="text" class="vecu-input" id="sf-duree-${id}" placeholder="ex: 1h30" value="${item ? echapper(item.duree) : ''}">
        </div>
      </div>

      ${cat === 'randos' ? `
      <label class="vecu-label">Difficulté (Decathlon Outdoor)</label>
      <select class="vecu-input" id="sf-difficulte-${id}">
        <option value="facile" ${item && item.difficulte === 'facile' ? 'selected' : ''}>Facile</option>
        <option value="moderee" ${item && item.difficulte === 'moderee' ? 'selected' : ''}>Modérée</option>
      </select>
      <label class="vecu-label">Thème</label>
      <input type="text" class="vecu-input" id="sf-theme-${id}" placeholder="Forêt, Cascade, Lac, Panorama..." value="${item ? echapper(item.theme) : ''}">
      <div class="spot-form-grille">
        <div>
          <label class="vecu-label">Note Decathlon</label>
          <input type="number" step="0.1" min="0" max="5" class="vecu-input" id="sf-note-${id}" value="${item && item.noteDecathlon !== null && item.noteDecathlon !== undefined ? item.noteDecathlon : ''}">
        </div>
        <div>
          <label class="vecu-label">Nombre d'avis</label>
          <input type="number" class="vecu-input" id="sf-nbavis-${id}" value="${item && item.nbAvis !== null && item.nbAvis !== undefined ? item.nbAvis : ''}">
        </div>
      </div>
      <label class="vecu-label">Lien "Ouvrir l'app" (Decathlon Outdoor)</label>
      <input type="text" class="vecu-input" id="sf-appurl-${id}" placeholder="https://..." value="${item ? echapper(item.appUrl) : ''}">
      ` : ''}

      <label class="vecu-label">Tarif (optionnel)</label>
      <input type="text" class="vecu-input" id="sf-tarif-${id}" value="${item ? echapper(item.tarif) : ''}">

      <label class="vecu-label">Statut chien</label>
      <select class="vecu-input" id="sf-chien-${id}">
        ${CHIEN_OPTIONS.map(([v, l]) => `<option value="${v}" ${item && item.chien.statut === v ? 'selected' : (!item && v === 'a_verifier' ? 'selected' : '')}>${l}</option>`).join('')}
      </select>
      <label class="vecu-label">Note chien (optionnel)</label>
      <input type="text" class="vecu-input" id="sf-chien-note-${id}" value="${item ? echapper(item.chien.note) : ''}">

      ${cat === 'terraAventura' ? `
      <label class="vecu-label">${ic(ICONE.pouce)} Nombre de pouces (page Terra Aventura)</label>
      <input type="number" class="vecu-input" id="sf-likes-${id}" value="${item && item.likes !== null && item.likes !== undefined ? item.likes : ''}">
      ` : ''}

      <label class="vecu-label">Description</label>
      <textarea class="vecu-textarea" id="sf-desc-${id}">${item ? echapper(item.description) : ''}</textarea>

      <label class="vecu-label">Anecdote à raconter (optionnel, courte — masquée par défaut dans l'app)</label>
      <textarea class="vecu-textarea" id="sf-anecdote-${id}" placeholder="Une légende, un fait amusant...">${item ? echapper(item.anecdote) : ''}</textarea>
      <label class="vecu-label">Source de l'anecdote (optionnel — format "Nom|https://...")</label>
      <input type="text" class="vecu-input" id="sf-anecdote-source-${id}" value="${item && item.anecdoteSource && item.anecdoteSource[0] ? echapper(item.anecdoteSource[0].label + '|' + item.anecdoteSource[0].url) : ''}">

      <label class="vecu-label">Lien Google Maps</label>
      <input type="text" class="vecu-input" id="sf-maps-${id}" value="${item ? echapper(item.maps.google) : ''}">

      <label class="vecu-label">${ic(ICONE.photo)} Lien de la photo (URL)</label>
      <input type="text" class="vecu-input" id="sf-image-${id}" placeholder="https://..." value="${item ? echapper(item.imageUrl) : ''}">
      <label class="vecu-label">Crédit photo (optionnel)</label>
      <input type="text" class="vecu-input" id="sf-image-credit-${id}" placeholder="Tourisme Corrèze..." value="${item ? echapper(item.imageCredit) : ''}">

      <label class="vecu-label">Sources — une par ligne, format "Nom|https://..."</label>
      <textarea class="vecu-textarea" id="sf-sources-${id}" placeholder="Office de tourisme|https://...">${sourcesTexte}</textarea>

      <p class="vecu-note-etoiles">Le tampon "Incontournable" s'affiche automatiquement à 3 étoiles.</p>

      <div class="vecu-form-actions">
        <button class="btn-vecu-save" onclick="enregistrerSpot('${cat}','${item ? item.id : ''}')">${ic(ICONE.enregistrer)} Enregistrer</button>
        <button class="btn-vecu-annuler" onclick="toggleForm('${id}')">Annuler</button>
        ${item ? `<button class="btn-vecu-suppr" onclick="supprimerSpot('${item.id}')">${ic(ICONE.corbeille)} Supprimer</button>` : ''}
      </div>
    </div>`;
}

function toggleForm(id) {
  const form = document.getElementById(`form-${id}`);
  if (!form) return;
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
  rafraichirIcones();
}

async function enregistrerSpot(cat, existingId) {
  const id = existingId || `nouveau-${cat}`;
  const nom = val(`sf-nom-${id}`).trim();
  if (!nom) { alert('Le nom est obligatoire.'); return; }

  const sourcesTexte = val(`sf-sources-${id}`).trim();
  const sources = sourcesTexte ? sourcesTexte.split('\n').filter(l => l.trim()).map(ligne => {
    const [label, url] = ligne.split('|').map(s => (s || '').trim());
    return { label: label || url, url: url || label };
  }) : [];

  const distanceTexte = val(`sf-distance-${id}`);
  const likesTexte = val(`sf-likes-${id}`);
  const anecdoteSourceTexte = val(`sf-anecdote-source-${id}`).trim();
  const [ancLabel, ancUrl] = anecdoteSourceTexte ? anecdoteSourceTexte.split('|').map(s => (s || '').trim()) : [null, null];
  const anecdoteSource = ancUrl ? [{ label: ancLabel || ancUrl, url: ancUrl }] : [];

  const donnees = {
    sejour_id: SEJOUR.id,
    categorie: cat,
    nom,
    lieu: val(`sf-lieu-${id}`).trim() || null,
    distance_km: distanceTexte !== '' ? parseFloat(distanceTexte) : null,
    longueur: val(`sf-longueur-${id}`).trim() || null,
    duree: val(`sf-duree-${id}`).trim() || null,
    etoiles: parseInt(val(`sf-etoiles-${id}`), 10) || 2,
    incontournable: (parseInt(val(`sf-etoiles-${id}`), 10) || 2) === 3,
    chien_statut: val(`sf-chien-${id}`) || 'a_verifier',
    chien_note: val(`sf-chien-note-${id}`).trim() || null,
    likes: likesTexte !== '' ? parseInt(likesTexte, 10) : null,
    difficulte: cat === 'randos' ? (val(`sf-difficulte-${id}`) || null) : null,
    theme: cat === 'randos' ? (val(`sf-theme-${id}`).trim() || null) : null,
    note_decathlon: (cat === 'randos' && val(`sf-note-${id}`) !== '') ? parseFloat(val(`sf-note-${id}`)) : null,
    nb_avis: (cat === 'randos' && val(`sf-nbavis-${id}`) !== '') ? parseInt(val(`sf-nbavis-${id}`), 10) : null,
    app_url: cat === 'randos' ? (val(`sf-appurl-${id}`).trim() || null) : null,
    tarif: val(`sf-tarif-${id}`).trim() || null,
    description: val(`sf-desc-${id}`).trim() || null,
    anecdote: val(`sf-anecdote-${id}`).trim() || null,
    anecdote_source: anecdoteSource,
    maps_url: val(`sf-maps-${id}`).trim() || null,
    image_url: val(`sf-image-${id}`).trim() || null,
    image_credit: val(`sf-image-credit-${id}`).trim() || null,
    sources,
    updated_at: new Date().toISOString()
  };

  try {
    const { error } = existingId
      ? await sb.from('spots').update(donnees).eq('id', existingId)
      : await sb.from('spots').insert(donnees);
    if (error) throw error;
  } catch (e) { alert("Pas de réseau ou erreur d'enregistrement — réessaie."); return; }

  await chargerCatalogueDistant();
  rendreHeader();
  rendreOnglet(ongletActif);
}

async function supprimerSpot(id) {
  if (!confirm('Supprimer définitivement ce spot ?')) return;
  try {
    const { error } = await sb.from('spots').delete().eq('id', id);
    if (error) throw error;
  } catch (e) { alert('Erreur de suppression — réessaie.'); return; }
  await chargerCatalogueDistant();
  rendreHeader();
  rendreOnglet(ongletActif);
}

// ===== BLOC "VÉCU" — coche, date, commentaire, photos =====
function rendreBlocVecu(id) {
  const v = vecuEtat[id];
  if (v && v.fait) {
    return `
      <div class="vecu-bloc vecu-fait">
        <div class="vecu-fait-ligne">
          <span class="vecu-fait-tag">${ic(ICONE.fait)} Fait le ${formaterDate(v.date)}</span>
          <button class="vecu-modifier" onclick="toggleForm('vecu-${id}')">${ic(ICONE.modifier)} Modifier</button>
        </div>
        ${v.commentaire ? `<p class="vecu-commentaire">${echapper(v.commentaire)}</p>` : ''}
        ${rendrePhotosHtml(id, v.photos)}
      </div>
      ${rendreFormVecu(id, v)}`;
  }
  return `
    <div class="vecu-bloc">
      <button class="btn-vecu" onclick="toggleForm('vecu-${id}')">${ic(ICONE.ajouter)} On l'a fait</button>
    </div>
    ${rendreFormVecu(id, null)}`;
}

function rendreFormVecu(id, v) {
  return `
    <div class="vecu-form" id="form-vecu-${id}" style="display:none">
      <label class="vecu-label">Date</label>
      <input type="date" class="vecu-input" id="date-${id}" value="${v ? v.date : ajourdhuiISO()}">
      <label class="vecu-label">Un souvenir, une note ?</label>
      <textarea class="vecu-textarea" id="commentaire-${id}" placeholder="Alma a adoré, le goûter était top...">${v ? (v.commentaire || '') : ''}</textarea>
      <label class="vecu-label">Photos</label>
      <input type="file" class="vecu-file" id="photo-${id}" accept="image/*" multiple>
      <div class="vecu-form-actions">
        <button class="btn-vecu-save" onclick="enregistrerVecu('${id}')">${ic(ICONE.enregistrer)} Enregistrer</button>
        ${v ? `<button class="btn-vecu-annuler" onclick="decocherVecu('${id}')">${ic(ICONE.decocher)} Décocher</button>` : `<button class="btn-vecu-annuler" onclick="toggleForm('vecu-${id}')">Annuler</button>`}
      </div>
    </div>`;
}

async function enregistrerVecu(id) {
  const date = val(`date-${id}`) || ajourdhuiISO();
  const commentaire = val(`commentaire-${id}`).trim();
  const fichiers = document.getElementById(`photo-${id}`).files;

  const existant = vecuEtat[id] || {};
  let photos = existant.photos ? [...existant.photos] : [];
  if (fichiers.length) {
    try { photos = [...photos, ...await televerserPhotos(id, fichiers)]; }
    catch (e) { /* pas de réseau — la coche/note partira quand même en file d'attente */ }
  }

  const donnees = { sejour_id: SEJOUR.id, item_id: id, fait: true, date, commentaire, photos, updated_at: new Date().toISOString() };
  vecuEtat[id] = { fait: true, date, commentaire, photos };

  try {
    const { error } = await sb.from('vecu_entries').upsert(donnees, { onConflict: 'sejour_id,item_id' });
    if (error) throw error;
    definirStatutReseau(false);
  } catch (e) { ajouterFileAttente({ type: 'upsert', donnees }); definirStatutReseau(true); }

  rendreHeader();
  rendreOnglet(ongletActif);
}

async function decocherVecu(id) {
  const v = vecuEtat[id];
  if (v && v.photos && v.photos.length) { try { await sb.storage.from(BUCKET).remove(v.photos); } catch (e) {} }
  delete vecuEtat[id];
  try {
    const { error } = await sb.from('vecu_entries').delete().eq('sejour_id', SEJOUR.id).eq('item_id', id);
    if (error) throw error;
    definirStatutReseau(false);
  } catch (e) { ajouterFileAttente({ type: 'delete', id }); definirStatutReseau(true); }
  rendreHeader();
  rendreOnglet(ongletActif);
}

async function supprimerUnePhoto(id, chemin) {
  try { await sb.storage.from(BUCKET).remove([chemin]); } catch (e) {}
  const photos = vecuEtat[id].photos.filter(p => p !== chemin);
  vecuEtat[id].photos = photos;
  const donnees = { sejour_id: SEJOUR.id, item_id: id, fait: true, date: vecuEtat[id].date, commentaire: vecuEtat[id].commentaire, photos, updated_at: new Date().toISOString() };
  try { const { error } = await sb.from('vecu_entries').upsert(donnees, { onConflict: 'sejour_id,item_id' }); if (error) throw error; }
  catch (e) { ajouterFileAttente({ type: 'upsert', donnees }); definirStatutReseau(true); }
  rendreOnglet(ongletActif);
}

// ===== FICHE CAMPING =====
function rendreCamping() {
  const c = SEJOUR.camping;
  const chien = CHIEN_LABEL[c.chien.statut];
  const sources = c.sources.map(s => `<a class="btn-source" href="${s.url}" target="_blank" rel="noopener">${ic(ICONE.source)} ${s.label}</a>`).join('');

  const histoireHtml = c.histoire ? `
    <div class="jour-histoire">
      <div class="jour-histoire-header" onclick="toggleHistoire('histoire-camping')">
        <span>${ic(ICONE.ampoule)} Le saviez-vous ?</span>
        <span class="jour-histoire-arrow" id="arrow-histoire-camping">${ic(ICONE.chevron)}</span>
      </div>
      <div class="jour-histoire-content" id="histoire-camping">
        ${c.histoire.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        ${(c.histoireSources || []).length ? `<div class="item-footer" style="margin-top:10px">${c.histoireSources.map(s => `<a class="btn-source" href="${s.url}" target="_blank" rel="noopener">${ic(ICONE.source)} ${s.label}</a>`).join('')}</div>` : ''}
      </div>
    </div>` : '';

  function rendreListeRessources(liste) {
    return liste.map(r => `
      <div class="ressource-carte">
        ${ic(ICONE[r.categorie] || 'map-pin', 'ressource-icone')}
        <div class="ressource-corps">
          <div class="ressource-nom-ligne">
            <div class="ressource-nom">${r.nom}</div>
            <button class="btn-icone" onclick="toggleForm('${r.id}')" title="Modifier">${ic(ICONE.editer)}</button>
          </div>
          <div class="ressource-adresse">${r.adresse || ''}</div>
          ${r.horaires ? `<div class="ressource-horaires">${r.horaires}</div>` : ''}
          ${r.note ? `<div class="ressource-note">${r.note}</div>` : ''}
          <div class="item-footer" style="margin-top:8px">
            ${r.maps.google ? `<a class="btn-maps" href="${r.maps.google}" target="_blank" rel="noopener">${ic(ICONE.maps)} Maps</a>` : ''}
            ${r.tel ? `<a class="btn-lien btn-tel" href="${r.tel}">${ic(ICONE.tel)} ${r.telAffiche}</a>` : ''}
          </div>
          ${rendreFormRessource(r)}
        </div>
      </div>`).join('');
  }

  const CAT_PRATIQUE = ['supermarche', 'epicerie', 'boulangerie', 'pharmacie', 'veterinaire', 'autre'];
  const ressourcesPratiques = RESSOURCES.filter(r => CAT_PRATIQUE.includes(r.categorie));
  const activites = RESSOURCES.filter(r => !CAT_PRATIQUE.includes(r.categorie));

  const ressourcesHtml = `
    <div class="onglet-header" style="margin-top:18px">
      ${ic(ICONE.panier, 'onglet-icone')}
      <div class="onglet-header-texte">
        <div class="onglet-titre" style="font-size:1.05rem">Ressources pratiques</div>
        <div class="onglet-sub">Tout sur place à Treignac</div>
      </div>
      <button class="btn-ajouter-spot" onclick="toggleForm('nouvelle-ressource')">${ic(ICONE.ajouter)} Ajouter</button>
    </div>
    ${rendreFormRessource(null)}
    ${rendreListeRessources(ressourcesPratiques)}

    <div class="onglet-header" style="margin-top:18px">
      ${ic(ICONE.nautique, 'onglet-icone')}
      <div class="onglet-header-texte">
        <div class="onglet-titre" style="font-size:1.05rem">Activités</div>
        <div class="onglet-sub">Autour du camping</div>
      </div>
    </div>
    ${rendreListeRessources(activites)}`;

  const bienvenueHtml = `
    <div class="accueil-bienvenue">
      <div class="intro-tampon">${ic('compass')}</div>
      <div class="intro-titre">Bienvenue en Corrèze</div>
      ${c.intro ? `<div class="intro-texte">${c.intro}</div>` : ''}
    </div>`;

  return `
    ${bienvenueHtml}
    ${histoireHtml}
    <div class="label-manuscrit">Notre camp de base</div>
    <div class="onglet-header camping-header-photo">
      <div class="onglet-header-ligne">
        ${ic(ICONE.camping, 'onglet-icone')}
        <div class="onglet-header-texte">
          <div class="onglet-titre">${c.nom}</div>
          <div class="onglet-sub">${c.adresse}</div>
        </div>
      </div>
      ${c.imageUrl ? `<div class="item-photo-wrap"><img class="item-photo" src="${c.imageUrl}" loading="lazy">${c.imageCredit ? `<div class="item-photo-legende">${echapper(c.imageCredit)}</div>` : ''}</div>` : ''}
    </div>
    <div class="item-carte">
      <div class="item-footer" style="margin-top:0;margin-bottom:14px">
        <a class="btn-maps" href="${c.maps.google}" target="_blank" rel="noopener">${ic(ICONE.maps)} Maps</a>
        <a class="btn-lien btn-tel" href="${c.tel}">${ic(ICONE.tel)} ${c.telAffiche}</a>
      </div>
      <div class="camping-equip-titre">Équipements</div>
      <ul class="camping-equip-liste">${c.equipements.map(e => `<li>${e}</li>`).join('')}</ul>
      <div class="chien-tag ${chien.classe}">${ic(chien.icone)} ${chien.texte} — <span class="chien-note">${c.chien.note}</span></div>
      <div class="item-footer">${sources}</div>
    </div>
    ${ressourcesHtml}`;
}

function toggleHistoire(id) {
  const el = document.getElementById(id);
  const arrow = document.getElementById('arrow-' + id);
  el.classList.toggle('open');
  arrow.classList.toggle('open');
}

// ===== FORMULAIRE RESSOURCE (ajout + édition) =====
function rendreFormRessource(item) {
  const id = item ? item.id : 'nouvelle-ressource';
  return `
    <div class="spot-form" id="form-${id}" style="display:none">
      <label class="vecu-label">Nom</label>
      <input type="text" class="vecu-input" id="rf-nom-${id}" value="${item ? echapper(item.nom) : ''}">
      <label class="vecu-label">Catégorie</label>
      <select class="vecu-input" id="rf-categorie-${id}">
        ${RESSOURCE_CATEGORIES.map(([v, l]) => `<option value="${v}" ${item && item.categorie === v ? 'selected' : ''}>${l}</option>`).join('')}
      </select>
      <label class="vecu-label">Adresse</label>
      <input type="text" class="vecu-input" id="rf-adresse-${id}" value="${item ? echapper(item.adresse) : ''}">
      <label class="vecu-label">Téléphone</label>
      <input type="text" class="vecu-input" id="rf-tel-${id}" value="${item ? echapper(item.telAffiche) : ''}">
      <label class="vecu-label">Horaires</label>
      <input type="text" class="vecu-input" id="rf-horaires-${id}" value="${item ? echapper(item.horaires) : ''}">
      <label class="vecu-label">Note (optionnel)</label>
      <input type="text" class="vecu-input" id="rf-note-${id}" value="${item ? echapper(item.note) : ''}">
      <label class="vecu-label">Lien Google Maps</label>
      <input type="text" class="vecu-input" id="rf-maps-${id}" value="${item ? echapper(item.maps.google) : ''}">
      <div class="vecu-form-actions">
        <button class="btn-vecu-save" onclick="enregistrerRessource('${item ? item.id : ''}')">${ic(ICONE.enregistrer)} Enregistrer</button>
        <button class="btn-vecu-annuler" onclick="toggleForm('${id}')">Annuler</button>
        ${item ? `<button class="btn-vecu-suppr" onclick="supprimerRessource('${item.id}')">${ic(ICONE.corbeille)} Supprimer</button>` : ''}
      </div>
    </div>`;
}

async function enregistrerRessource(existingId) {
  const id = existingId || 'nouvelle-ressource';
  const nom = val(`rf-nom-${id}`).trim();
  if (!nom) { alert('Le nom est obligatoire.'); return; }

  const donnees = {
    sejour_id: SEJOUR.id,
    categorie: val(`rf-categorie-${id}`),
    nom,
    adresse: val(`rf-adresse-${id}`).trim() || null,
    tel: val(`rf-tel-${id}`).trim() || null,
    horaires: val(`rf-horaires-${id}`).trim() || null,
    note: val(`rf-note-${id}`).trim() || null,
    maps_url: val(`rf-maps-${id}`).trim() || null,
    updated_at: new Date().toISOString()
  };

  try {
    const { error } = existingId
      ? await sb.from('ressources').update(donnees).eq('id', existingId)
      : await sb.from('ressources').insert(donnees);
    if (error) throw error;
  } catch (e) { alert("Pas de réseau ou erreur d'enregistrement — réessaie."); return; }

  await chargerCatalogueDistant();
  rendreOnglet(ongletActif);
}

async function supprimerRessource(id) {
  if (!confirm('Supprimer cette ressource ?')) return;
  try { const { error } = await sb.from('ressources').delete().eq('id', id); if (error) throw error; }
  catch (e) { alert('Erreur de suppression — réessaie.'); return; }
  await chargerCatalogueDistant();
  rendreOnglet(ongletActif);
}

// ===== ONGLET CARNET — frise auto-générée + export PDF =====
function rendreCarnet() {
  const main = document.getElementById('main-content');
  const entrees = entreesVecuTriees();

  if (!entrees.length) {
    main.innerHTML = `
      <div class="onglet-header">
        ${ic(ICONE.carnet, 'onglet-icone')}
        <div class="onglet-header-texte">
          <div class="onglet-titre">Carnet de voyage</div>
          <div class="onglet-sub">Se remplit tout seul au fil du séjour</div>
        </div>
      </div>
      <div class="onglet-intro">Le résumé du séjour qui s'écrit tout seul au fil des coches — à relire ce soir, sous l'auvent.</div>
      <div class="carnet-vide">
        ${ic(ICONE.sejour, 'carnet-vide-icone')}
        <p>Rien pour l'instant. Coche "On l'a fait" sur une visite, une rando ou un parcours Terra Aventura — elle apparaîtra ici automatiquement, avec la date, tes notes et tes photos.</p>
      </div>`;
    rafraichirIcones();
    return;
  }

  const ROTATIONS = ['-2.4deg', '1.6deg', '-1.1deg', '2.1deg', '-1.7deg', '1.1deg', '-2deg'];
  const TAPES = ['tape-bleu', 'tape-sauge', 'tape-rouille'];
  const CAT_INDEX = { terraAventura: 0, randos: 1, visites: 2 };

  main.innerHTML = `
    <div class="onglet-header carnet-header-flex">
      <div class="onglet-header-gauche">
        ${ic(ICONE.carnet, 'onglet-icone')}
        <div>
          <div class="onglet-titre">Carnet de voyage</div>
          <div class="onglet-sub">${entrees.length} souvenir${entrees.length > 1 ? 's' : ''}</div>
        </div>
      </div>
      <button class="btn-export-pdf" onclick="window.print()">${ic(ICONE.export)} Exporter</button>
    </div>
    <div class="onglet-intro">Le résumé du séjour qui s'écrit tout seul au fil des coches — à relire ce soir, sous l'auvent.</div>
    <div class="scrapbook">
      ${entrees.map((e, i) => `
        <div class="scrap-entree" style="transform: rotate(${ROTATIONS[i % ROTATIONS.length]})">
          <span class="scrap-tape ${TAPES[CAT_INDEX[e.cat]]}"></span>
          <div class="scrap-tampon">${ic(ONGLETS.find(o => o.id === e.cat).icone)}</div>
          <div class="scrap-postmark">${formaterDate(e.v.date)}</div>
          <div class="scrap-titre">${e.item.nom}</div>
          <div class="scrap-lieu">${CATEGORIE_LABEL[e.cat]} · ${e.item.lieu || ''}</div>
          ${e.v.commentaire ? `<p class="scrap-commentaire">${echapper(e.v.commentaire)}</p>` : ''}
          ${rendrePhotosHtml(e.id, e.v.photos)}
        </div>`).join('')}
    </div>`;

  rafraichirIcones();
}
