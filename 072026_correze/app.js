// ===== ÉTAT =====
let ongletActif = 'camping';
let checklistEtat = {};

const CHIEN_LABEL = {
  accepte:    { texte: '🐕 Chien accepté',        classe: 'chien-ok' },
  laisse:     { texte: '🐕 Chien accepté (laisse)', classe: 'chien-ok' },
  a_verifier: { texte: '🐕 Chien à vérifier',      classe: 'chien-warn' },
  interdit:   { texte: '🚫 Chien interdit',        classe: 'chien-non' }
};

const ONGLETS = [
  { id: 'camping',       emoji: '🏕️', label: 'Camping' },
  { id: 'terraAventura', emoji: '🎮', label: 'Terra Aventura' },
  { id: 'randos',        emoji: '🥾', label: 'Randos' },
  { id: 'visites',       emoji: '🏛️', label: 'Visites' }
];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  chargerChecklistLocale();
  rendreHeader();
  rendreNavOnglets();
  rendreOnglet('camping');
});

// ===== HEADER =====
function rendreHeader() {
  document.getElementById('sejour-titre').textContent = SEJOUR.titre;
  document.getElementById('sejour-meta').textContent = `📅 ${SEJOUR.dates} · 📍 ${SEJOUR.destination}`;

  const badges = document.getElementById('sejour-badges');
  badges.innerHTML = ['🏕️ Caravane', '🐕 Alma', '👨‍👩‍👧‍👦 Famille'].map(b => `<span class="badge">${b}</span>`).join('');

  const total = SEJOUR.checklist.length;
  const faits = Object.values(checklistEtat).filter(Boolean).length;
  const pct = total ? Math.round(faits / total * 100) : 0;
  badges.innerHTML += `
    <div style="width:100%;margin-top:8px">
      <div class="progress-label">✅ Checklist : ${faits}/${total}</div>
      <div class="progress-bar-wrap"><div class="progress-bar" style="width:${pct}%"></div></div>
    </div>`;
}

// ===== NAVIGATION =====
function rendreNavOnglets() {
  const nav = document.getElementById('nav-jours');
  nav.innerHTML = ONGLETS.map(o => `
    <button class="nav-jour-btn ${o.id === ongletActif ? 'actif' : ''}" onclick="changerOnglet('${o.id}')">
      <span class="nav-emoji">${o.emoji}</span>
      <span class="nav-label">${o.label}</span>
    </button>`).join('');
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
  if (id === 'camping') { main.innerHTML = rendreCamping(); return; }

  const items = [...SEJOUR[id]].sort((a, b) => {
    if (a.incontournable !== b.incontournable) return b.incontournable - a.incontournable;
    return b.etoiles - a.etoiles;
  });

  const meta = ONGLETS.find(o => o.id === id);
  main.innerHTML = `
    <div class="onglet-header">
      <div class="onglet-emoji">${meta.emoji}</div>
      <div>
        <div class="onglet-titre">${meta.label}</div>
        <div class="onglet-sub">${items.length} spot${items.length > 1 ? 's' : ''} · triés par intérêt</div>
      </div>
    </div>
    ${items.map(rendreCarteItem).join('')}`;
}

// ===== CARTE ITEM (Terra Aventura / Randos / Visites) =====
function rendreCarteItem(item) {
  const etoiles = '⭐'.repeat(item.etoiles) + '☆'.repeat(3 - item.etoiles);
  const chien = CHIEN_LABEL[item.chien.statut];
  const badge = item.incontournable ? `<span class="badge-incontournable">🔒 Incontournable</span>` : '';

  const infos = [];
  if (item.distanceKm !== undefined) infos.push(`📍 ${item.distanceKm === 0 ? 'Sur place' : item.distanceKm + ' km'}`);
  if (item.longueur) infos.push(`📏 ${item.longueur}`);
  if (item.duree) infos.push(`⏱️ ${item.duree}`);
  if (item.tarif) infos.push(`💶 ${item.tarif}`);

  const sources = (item.sources || []).map(s =>
    `<a class="btn-source" href="${s.url}" target="_blank" rel="noopener">🔗 ${s.label}</a>`
  ).join('');

  return `
    <div class="item-carte">
      <div class="item-header">
        <div class="item-titre">${item.nom}</div>
        ${badge}
      </div>
      <div class="item-lieu">📍 ${item.lieu}</div>
      <div class="item-etoiles">${etoiles}</div>
      <div class="item-infos">${infos.map(i => `<span>${i}</span>`).join('')}</div>
      <p class="item-desc">${item.description}</p>
      <div class="chien-tag ${chien.classe}">${chien.texte}${item.chien.note ? ` — <span class="chien-note">${item.chien.note}</span>` : ''}</div>
      <div class="item-footer">
        <a class="btn-maps" href="${item.maps.google}" target="_blank" rel="noopener">📍 Maps</a>
        ${sources}
      </div>
    </div>`;
}

// ===== FICHE CAMPING =====
function rendreCamping() {
  const c = SEJOUR.camping;
  const chien = CHIEN_LABEL[c.chien.statut];
  const sources = c.sources.map(s => `<a class="btn-source" href="${s.url}" target="_blank" rel="noopener">🔗 ${s.label}</a>`).join('');

  const histoireHtml = c.histoire ? `
    <div class="jour-histoire">
      <div class="jour-histoire-header" onclick="toggleHistoire('histoire-camping')">
        💡 Le saviez-vous ?
        <span class="jour-histoire-arrow" id="arrow-histoire-camping">▸</span>
      </div>
      <div class="jour-histoire-content" id="histoire-camping">
        ${c.histoire.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        ${(c.histoireSources || []).length ? `<div class="item-footer" style="margin-top:10px">${c.histoireSources.map(s => `<a class="btn-source" href="${s.url}" target="_blank" rel="noopener">🔗 ${s.label}</a>`).join('')}</div>` : ''}
      </div>
    </div>` : '';

  return `
    <div class="onglet-header">
      <div class="onglet-emoji">🏕️</div>
      <div>
        <div class="onglet-titre">${c.nom}</div>
        <div class="onglet-sub">${c.adresse}</div>
      </div>
    </div>
    ${c.intro ? `<div class="intro-texte">${c.intro}</div>` : ''}
    ${histoireHtml}
    <div class="item-carte">
      <div class="item-footer" style="margin-top:0;margin-bottom:14px">
        <a class="btn-maps" href="${c.maps.google}" target="_blank" rel="noopener">📍 Maps</a>
        <a class="btn-lien btn-tel" href="${c.tel}">📞 ${c.telAffiche}</a>
      </div>
      <div class="camping-equip-titre">Équipements</div>
      <ul class="camping-equip-liste">${c.equipements.map(e => `<li>${e}</li>`).join('')}</ul>
      <div class="chien-tag ${chien.classe}">${chien.texte} — <span class="chien-note">${c.chien.note}</span></div>
      <div class="item-footer">${sources}</div>
    </div>`;
}

function toggleHistoire(id) {
  const el = document.getElementById(id);
  const arrow = document.getElementById('arrow-' + id);
  el.classList.toggle('open');
  arrow.textContent = el.classList.contains('open') ? '▾' : '▸';
}

// ===== CHECKLIST (identique V1) =====
function chargerChecklistLocale() {
  const s = localStorage.getItem(`checklist-${SEJOUR.id}`);
  checklistEtat = s ? JSON.parse(s) : {};
  SEJOUR.checklist.forEach(item => { if (checklistEtat[item.id] === undefined) checklistEtat[item.id] = false; });
}

function sauvegarderChecklist() {
  localStorage.setItem(`checklist-${SEJOUR.id}`, JSON.stringify(checklistEtat));
}

function ouvrirChecklist() {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-checklist-content');
  const parCat = {};
  SEJOUR.checklist.forEach(item => {
    if (!parCat[item.categorie]) parCat[item.categorie] = [];
    parCat[item.categorie].push(item);
  });

  let html = '';
  Object.entries(parCat).forEach(([cat, items]) => {
    html += `<div class="checklist-categorie">${cat}</div>`;
    items.forEach(item => {
      const fait = checklistEtat[item.id] || false;
      html += `
        <div class="checklist-item ${fait ? 'fait' : ''}" onclick="toggleCheck(${item.id})">
          <input type="checkbox" id="check-${item.id}" ${fait ? 'checked' : ''} onchange="toggleCheck(${item.id})" onclick="event.stopPropagation()">
          <label for="check-${item.id}">${item.texte}</label>
        </div>`;
    });
  });
  content.innerHTML = html;
  overlay.classList.add('visible');
}

function fermerChecklist() {
  document.getElementById('modal-overlay').classList.remove('visible');
  rendreHeader();
}

function toggleCheck(id) {
  checklistEtat[id] = !checklistEtat[id];
  sauvegarderChecklist();
  const cb = document.querySelector(`#check-${id}`);
  if (cb) { cb.checked = checklistEtat[id]; cb.closest('.checklist-item').classList.toggle('fait', checklistEtat[id]); }
}
