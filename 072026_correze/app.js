// ===== SUPABASE =====
const SUPABASE_URL = 'https://mglxaazwjmtdtjolfivb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbHhhYXp3am10ZHRqb2xmaXZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNjExNTksImV4cCI6MjEwMDczNzE1OX0.SL-ztnHckX3gCH_QPA8vGX906QRSab45Yfg61jPVE68';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const BUCKET = 'carnet-photos';

// ===== ÉTAT =====
let ongletActif = 'camping';
let vecuEtat = {}; // { [id]: { fait, date, commentaire, photos: [chemin,...] } }
let horsLigne = false;

// Icônes Lucide (https://lucide.dev) — un nom par usage
const ICONE = {
  camping: 'tent', terraAventura: 'gamepad-2', randos: 'footprints', visites: 'landmark', carnet: 'book-open',
  caravane: 'caravan', chien: 'dog', famille: 'users', sejour: 'compass',
  distance: 'map-pin', longueur: 'ruler', duree: 'clock', tarif: 'banknote',
  maps: 'map-pin', source: 'link', tel: 'phone', incontournable: 'lock',
  fait: 'check-circle-2', modifier: 'pencil', enregistrer: 'save', decocher: 'undo-2',
  ajouter: 'circle-plus', supprimer: 'x', ampoule: 'lightbulb', chevron: 'chevron-right',
  supermarche: 'shopping-cart', epicerie: 'store', boulangerie: 'croissant', pharmacie: 'pill', veterinaire: 'paw-print',
  panier: 'shopping-basket', avertissement: 'triangle-alert', interdit: 'ban', export: 'download',
  horsligne: 'wifi-off', synchro: 'refresh-cw'
};

const CHIEN_LABEL = {
  accepte:    { texte: 'Chien accepté',          classe: 'chien-ok',   icone: ICONE.chien },
  laisse:     { texte: 'Chien accepté (laisse)', classe: 'chien-ok',   icone: ICONE.chien },
  a_verifier: { texte: 'Chien à vérifier',       classe: 'chien-warn', icone: ICONE.avertissement },
  interdit:   { texte: 'Chien interdit',         classe: 'chien-non',  icone: ICONE.interdit }
};

const CATEGORIE_LABEL = { terraAventura: 'Terra Aventura', randos: 'Rando / balade', visites: 'Visite' };

const ONGLETS = [
  { id: 'camping',       icone: ICONE.camping,       label: 'Camping' },
  { id: 'terraAventura', icone: ICONE.terraAventura, label: 'Terra Aventura' },
  { id: 'randos',        icone: ICONE.randos,        label: 'Randos' },
  { id: 'visites',       icone: ICONE.visites,        label: 'Visites' },
  { id: 'carnet',        icone: ICONE.carnet,        label: 'Carnet' }
];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
  rendreNavOnglets();
  await chargerVecuDistant();
  rendreHeader();
  rendreOnglet('camping');
  ecouterTempsReel();
  window.addEventListener('online', synchroniserFileAttente);
  synchroniserFileAttente();
});

// Rafraîchit les icônes Lucide après chaque injection de HTML dynamique
function rafraichirIcones() {
  if (window.lucide) lucide.createIcons();
}

// Icône Lucide en tag <i>, prête à être injectée dans un template string
function ic(nom, classe) {
  return `<i data-lucide="${nom}" class="ic ${classe || ''}"></i>`;
}

// ===== IDENTIFIANTS STABLES =====
function idItem(categorie, index) { return `${categorie}-${index}`; }

function tousLesItemsTracables() {
  const liste = [];
  ['terraAventura', 'randos', 'visites'].forEach(cat => {
    SEJOUR[cat].forEach((item, i) => liste.push({ id: idItem(cat, i), cat, item }));
  });
  return liste;
}

// ===== PERSISTANCE — Supabase (données + photos) avec file d'attente hors-ligne =====
async function chargerVecuDistant() {
  try {
    const { data, error } = await sb.from('vecu_entries').select('*').eq('sejour_id', SEJOUR.id);
    if (error) throw error;
    vecuEtat = {};
    (data || []).forEach(row => {
      vecuEtat[row.item_id] = { fait: row.fait, date: row.date, commentaire: row.commentaire, photos: row.photos || [] };
    });
    definirStatutReseau(false);
  } catch (e) {
    // Pas de réseau au chargement — on repart de la file d'attente locale en attendant
    definirStatutReseau(true);
  }
}

function ecouterTempsReel() {
  sb.channel(`vecu-${SEJOUR.id}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'vecu_entries', filter: `sejour_id=eq.${SEJOUR.id}` },
      (payload) => {
        if (payload.eventType === 'DELETE') {
          delete vecuEtat[payload.old.item_id];
        } else {
          const r = payload.new;
          vecuEtat[r.item_id] = { fait: r.fait, date: r.date, commentaire: r.commentaire, photos: r.photos || [] };
        }
        rendreHeader();
        rendreOnglet(ongletActif);
      })
    .subscribe();
}

// File d'attente locale — uniquement les champs texte (coche/date/note), pas les photos (besoin du réseau)
function lireFileAttente() {
  const s = localStorage.getItem(`file-attente-${SEJOUR.id}`);
  return s ? JSON.parse(s) : [];
}
function ecrireFileAttente(file) {
  localStorage.setItem(`file-attente-${SEJOUR.id}`, JSON.stringify(file));
}
function ajouterFileAttente(operation) {
  const file = lireFileAttente();
  file.push(operation);
  ecrireFileAttente(file);
}

async function synchroniserFileAttente() {
  let file = lireFileAttente();
  if (!file.length) { definirStatutReseau(false); return; }

  const restantes = [];
  for (const op of file) {
    try {
      if (op.type === 'upsert') {
        const { error } = await sb.from('vecu_entries').upsert(op.donnees, { onConflict: 'sejour_id,item_id' });
        if (error) throw error;
      } else if (op.type === 'delete') {
        const { error } = await sb.from('vecu_entries').delete().eq('sejour_id', SEJOUR.id).eq('item_id', op.id);
        if (error) throw error;
      }
    } catch (e) {
      restantes.push(op); // toujours pas de réseau, on la garde pour la prochaine tentative
    }
  }
  ecrireFileAttente(restantes);
  definirStatutReseau(restantes.length > 0);
  if (restantes.length < file.length) { await chargerVecuDistant(); rendreHeader(); rendreOnglet(ongletActif); }
}

function definirStatutReseau(actif) {
  horsLigne = actif;
  const witness = document.getElementById('statut-reseau');
  if (witness) witness.style.display = horsLigne ? 'flex' : 'none';
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
function urlPhoto(chemin) {
  return sb.storage.from(BUCKET).getPublicUrl(chemin).data.publicUrl;
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
function formaterDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
}
function echapper(txt) {
  const div = document.createElement('div');
  div.textContent = txt;
  return div.innerHTML;
}

// ===== HEADER =====
function rendreHeader() {
  document.getElementById('sejour-titre').textContent = SEJOUR.titre;
  document.getElementById('sejour-meta').textContent = `${SEJOUR.dates} · ${SEJOUR.destination}`;

  const badges = document.getElementById('sejour-badges');
  badges.innerHTML = [
    { icone: ICONE.caravane, texte: 'Caravane' },
    { icone: ICONE.chien, texte: 'Alma' },
    { icone: ICONE.famille, texte: 'Famille' }
  ].map(b => `<span class="badge">${ic(b.icone)} ${b.texte}</span>`).join('');

  const total = tousLesItemsTracables().length;
  const faits = Object.values(vecuEtat).filter(v => v.fait).length;
  const pct = total ? Math.round(faits / total * 100) : 0;
  badges.innerHTML += `
    <div style="width:100%;margin-top:8px">
      <div class="progress-label">${ic(ICONE.sejour)} Séjour vécu : ${faits}/${total} étapes</div>
      <div class="progress-bar-wrap"><div class="progress-bar" style="width:${pct}%"></div></div>
    </div>`;
  rafraichirIcones();
}

// ===== NAVIGATION =====
function rendreNavOnglets() {
  const nav = document.getElementById('nav-jours');
  nav.innerHTML = ONGLETS.map(o => `
    <button class="nav-jour-btn ${o.id === ongletActif ? 'actif' : ''}" onclick="changerOnglet('${o.id}')">
      ${ic(o.icone, 'nav-icone')}
      <span class="nav-label">${o.label}</span>
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

  const items = SEJOUR[id].map((item, i) => ({ item, id: idItem(id, i) }))
    .sort((a, b) => {
      if (a.item.incontournable !== b.item.incontournable) return b.item.incontournable - a.item.incontournable;
      return b.item.etoiles - a.item.etoiles;
    });

  const meta = ONGLETS.find(o => o.id === id);
  main.innerHTML = `
    <div class="onglet-header">
      ${ic(meta.icone, 'onglet-icone')}
      <div>
        <div class="onglet-titre">${meta.label}</div>
        <div class="onglet-sub">${items.length} spot${items.length > 1 ? 's' : ''} · triés par intérêt</div>
      </div>
    </div>
    ${items.map(({ item, id }) => rendreCarteItem(item, id)).join('')}`;
  rafraichirIcones();
}

// ===== ÉTOILES =====
function rendreEtoiles(n) {
  let html = '';
  for (let i = 1; i <= 3; i++) html += ic('star', i <= n ? 'etoile pleine' : 'etoile vide');
  return html;
}

// ===== CARTE ITEM (Terra Aventura / Randos / Visites) =====
function rendreCarteItem(item, id) {
  const chien = CHIEN_LABEL[item.chien.statut];
  const badge = item.incontournable ? `<span class="badge-incontournable">${ic(ICONE.incontournable)} Incontournable</span>` : '';

  const infos = [];
  if (item.distanceKm !== undefined) infos.push(`${ic(ICONE.distance)} ${item.distanceKm === 0 ? 'Sur place' : item.distanceKm + ' km'}`);
  if (item.longueur) infos.push(`${ic(ICONE.longueur)} ${item.longueur}`);
  if (item.duree) infos.push(`${ic(ICONE.duree)} ${item.duree}`);
  if (item.tarif) infos.push(`${ic(ICONE.tarif)} ${item.tarif}`);

  const sources = (item.sources || []).map(s =>
    `<a class="btn-source" href="${s.url}" target="_blank" rel="noopener">${ic(ICONE.source)} ${s.label}</a>`
  ).join('');

  return `
    <div class="item-carte">
      <div class="item-header">
        <div class="item-titre">${item.nom}</div>
        ${badge}
      </div>
      <div class="item-lieu">${ic(ICONE.distance)} ${item.lieu}</div>
      <div class="item-etoiles">${rendreEtoiles(item.etoiles)}</div>
      <div class="item-infos">${infos.map(i => `<span>${i}</span>`).join('')}</div>
      <p class="item-desc">${item.description}</p>
      <div class="chien-tag ${chien.classe}">${ic(chien.icone)} ${chien.texte}${item.chien.note ? ` — <span class="chien-note">${item.chien.note}</span>` : ''}</div>
      <div class="item-footer">
        <a class="btn-maps" href="${item.maps.google}" target="_blank" rel="noopener">${ic(ICONE.maps)} Maps</a>
        ${sources}
      </div>
      ${rendreBlocVecu(id)}
    </div>`;
}

// ===== BLOC "VÉCU" — coche, date, commentaire, photos =====
function rendreBlocVecu(id) {
  const v = vecuEtat[id];

  if (v && v.fait) {
    const photosHtml = rendrePhotosHtml(id, v.photos);
    return `
      <div class="vecu-bloc vecu-fait">
        <div class="vecu-fait-ligne">
          <span class="vecu-fait-tag">${ic(ICONE.fait)} Fait le ${formaterDate(v.date)}</span>
          <button class="vecu-modifier" onclick="toggleFormVecu('${id}')">${ic(ICONE.modifier)} Modifier</button>
        </div>
        ${v.commentaire ? `<p class="vecu-commentaire">${echapper(v.commentaire)}</p>` : ''}
        ${photosHtml}
      </div>
      ${rendreFormVecu(id, v)}`;
  }

  return `
    <div class="vecu-bloc">
      <button class="btn-vecu" onclick="toggleFormVecu('${id}')">${ic(ICONE.ajouter)} On l'a fait</button>
    </div>
    ${rendreFormVecu(id, null)}`;
}

function rendreFormVecu(id, v) {
  return `
    <div class="vecu-form" id="form-${id}" style="display:none">
      <label class="vecu-label">Date</label>
      <input type="date" class="vecu-input" id="date-${id}" value="${v ? v.date : ajourdhuiISO()}">
      <label class="vecu-label">Un souvenir, une note ?</label>
      <textarea class="vecu-textarea" id="commentaire-${id}" placeholder="Alma a adoré, le goûter était top...">${v ? (v.commentaire || '') : ''}</textarea>
      <label class="vecu-label">Photos</label>
      <input type="file" class="vecu-file" id="photo-${id}" accept="image/*" multiple>
      <div class="vecu-form-actions">
        <button class="btn-vecu-save" onclick="enregistrerVecu('${id}')">${ic(ICONE.enregistrer)} Enregistrer</button>
        ${v ? `<button class="btn-vecu-annuler" onclick="decocherVecu('${id}')">${ic(ICONE.decocher)} Décocher</button>` : `<button class="btn-vecu-annuler" onclick="toggleFormVecu('${id}')">Annuler</button>`}
      </div>
    </div>`;
}

function toggleFormVecu(id) {
  const form = document.getElementById(`form-${id}`);
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
  rafraichirIcones();
}

async function enregistrerVecu(id) {
  const date = document.getElementById(`date-${id}`).value || ajourdhuiISO();
  const commentaire = document.getElementById(`commentaire-${id}`).value.trim();
  const fichiers = document.getElementById(`photo-${id}`).files;

  const existant = vecuEtat[id] || {};
  let photos = existant.photos ? [...existant.photos] : [];

  if (fichiers.length) {
    try {
      const nouvelles = await televerserPhotos(id, fichiers);
      photos = [...photos, ...nouvelles];
    } catch (e) { /* pas de reseau -- la coche/note partira quand meme en file d'attente */ }
  }

  const donnees = { sejour_id: SEJOUR.id, item_id: id, fait: true, date, commentaire, photos, updated_at: new Date().toISOString() };
  vecuEtat[id] = { fait: true, date, commentaire, photos }; // mise a jour optimiste, immediate a l'ecran

  try {
    const { error } = await sb.from('vecu_entries').upsert(donnees, { onConflict: 'sejour_id,item_id' });
    if (error) throw error;
    definirStatutReseau(false);
  } catch (e) {
    ajouterFileAttente({ type: 'upsert', donnees });
    definirStatutReseau(true);
  }

  rendreHeader();
  rendreOnglet(ongletActif);
}

async function decocherVecu(id) {
  const v = vecuEtat[id];
  if (v && v.photos && v.photos.length) {
    try { await sb.storage.from(BUCKET).remove(v.photos); } catch (e) { /* on continue quand meme */ }
  }
  delete vecuEtat[id];

  try {
    const { error } = await sb.from('vecu_entries').delete().eq('sejour_id', SEJOUR.id).eq('item_id', id);
    if (error) throw error;
    definirStatutReseau(false);
  } catch (e) {
    ajouterFileAttente({ type: 'delete', id });
    definirStatutReseau(true);
  }

  rendreHeader();
  rendreOnglet(ongletActif);
}

async function supprimerUnePhoto(id, chemin) {
  try { await sb.storage.from(BUCKET).remove([chemin]); } catch (e) { /* on continue quand meme */ }
  const photos = vecuEtat[id].photos.filter(p => p !== chemin);
  vecuEtat[id].photos = photos;

  const donnees = { sejour_id: SEJOUR.id, item_id: id, fait: true, date: vecuEtat[id].date, commentaire: vecuEtat[id].commentaire, photos, updated_at: new Date().toISOString() };
  try {
    const { error } = await sb.from('vecu_entries').upsert(donnees, { onConflict: 'sejour_id,item_id' });
    if (error) throw error;
  } catch (e) {
    ajouterFileAttente({ type: 'upsert', donnees });
    definirStatutReseau(true);
  }
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

  const ressourcesHtml = (c.ressources || []).length ? `
    <div class="onglet-header" style="margin-top:18px">
      ${ic(ICONE.panier, 'onglet-icone')}
      <div>
        <div class="onglet-titre" style="font-size:1.05rem">Ressources pratiques</div>
        <div class="onglet-sub">Tout sur place à Treignac</div>
      </div>
    </div>
    ${c.ressources.map(r => `
      <div class="ressource-carte">
        ${ic(ICONE[r.categorie] || 'map-pin', 'ressource-icone')}
        <div class="ressource-corps">
          <div class="ressource-nom">${r.nom}</div>
          <div class="ressource-adresse">${r.adresse}</div>
          ${r.horaires ? `<div class="ressource-horaires">${r.horaires}</div>` : ''}
          ${r.note ? `<div class="ressource-note">${r.note}</div>` : ''}
          <div class="item-footer" style="margin-top:8px">
            <a class="btn-maps" href="${r.maps.google}" target="_blank" rel="noopener">${ic(ICONE.maps)} Maps</a>
            ${r.tel ? `<a class="btn-lien btn-tel" href="${r.tel}">${ic(ICONE.tel)} ${r.telAffiche}</a>` : ''}
          </div>
        </div>
      </div>`).join('')}` : '';

  return `
    <div class="onglet-header">
      ${ic(ICONE.camping, 'onglet-icone')}
      <div>
        <div class="onglet-titre">${c.nom}</div>
        <div class="onglet-sub">${c.adresse}</div>
      </div>
    </div>
    ${c.intro ? `<div class="intro-texte">${c.intro}</div>` : ''}
    ${histoireHtml}
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

// ===== ONGLET CARNET — frise auto-générée + export PDF =====
function rendreCarnet() {
  const main = document.getElementById('main-content');

  const entrees = tousLesItemsTracables()
    .map(({ id, cat, item }) => ({ id, cat, item, v: vecuEtat[id] }))
    .filter(e => e.v && e.v.fait)
    .sort((a, b) => a.v.date.localeCompare(b.v.date));

  if (!entrees.length) {
    main.innerHTML = `
      <div class="onglet-header">
        ${ic(ICONE.carnet, 'onglet-icone')}
        <div>
          <div class="onglet-titre">Carnet de voyage</div>
          <div class="onglet-sub">Se remplit tout seul au fil du séjour</div>
        </div>
      </div>
      <div class="carnet-vide">
        ${ic(ICONE.sejour, 'carnet-vide-icone')}
        <p>Rien pour l'instant. Coche "On l'a fait" sur une visite, une rando ou un parcours Terra Aventura — elle apparaîtra ici automatiquement, avec la date, tes notes et tes photos.</p>
      </div>`;
    rafraichirIcones();
    return;
  }

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
    <div class="frise" id="frise-carnet">
      <svg class="frise-ligne" id="frise-svg"><path id="frise-chemin"/></svg>
      ${entrees.map(e => `
        <div class="frise-etape">
          <div class="frise-date">${formaterDate(e.v.date)}</div>
          <div class="frise-carte">
            <div class="frise-carte-header">
              ${ic(ONGLETS.find(o => o.id === e.cat).icone, 'frise-icone')}
              <div>
                <div class="frise-titre">${e.item.nom}</div>
                <div class="frise-categorie">${CATEGORIE_LABEL[e.cat]} · ${e.item.lieu}</div>
              </div>
            </div>
            ${e.v.commentaire ? `<p class="vecu-commentaire">${echapper(e.v.commentaire)}</p>` : ''}
            ${rendrePhotosHtml(e.id, e.v.photos)}
          </div>
        </div>`).join('')}
    </div>`;

  rafraichirIcones();
  dessinerFriseCarnet();
}

function dessinerFriseCarnet() {
  const conteneur = document.getElementById('frise-carnet');
  const svg = document.getElementById('frise-svg');
  const chemin = document.getElementById('frise-chemin');
  const etapes = [...conteneur.querySelectorAll('.frise-etape')];
  if (!etapes.length) return;

  requestAnimationFrame(() => {
    const hauteur = conteneur.offsetHeight;
    svg.setAttribute('viewBox', `0 0 30 ${hauteur}`);
    svg.style.height = hauteur + 'px';
    const centres = etapes.map(el => el.offsetTop + 30);
    let d = `M15 ${centres[0]}`;
    for (let i = 1; i < centres.length; i++) {
      const yMid = (centres[i - 1] + centres[i]) / 2;
      const decalage = i % 2 === 0 ? 5 : -5;
      d += ` Q ${15 + decalage} ${yMid} 15 ${centres[i]}`;
    }
    chemin.setAttribute('d', d);
  });
}
