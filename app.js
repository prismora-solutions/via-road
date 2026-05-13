// ===== ÉTAT =====
let jourActif = 0;
let checklistEtat = {};

const ICONES = {
  trajet: '🚐', hebergement: '🏕️', repas: '🍽️',
  activite: '🎯', balade: '🐾', routine: '☀️', arrivee: '🏠'
};

const PLAGES = {
  matin: '🌅 Matin', midi: '☀️ Midi',
  aprem: '🌤️ Après-midi', soir: '🌙 Soir'
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  chargerChecklistLocale();
  rendreHeader();
  rendreNavJours();
  rendreJour(0);
  sauvegarderOffline();
});

// ===== LIENS MAPS iOS =====
// google.com/maps/search ouvre l'app Google Maps si installée
// Fallback : maps.apple.com natif iOS
function lienMaps(mapsObj) {
  if (!mapsObj) return '';
  const gUrl = mapsObj.google || '#';
  const aUrl = mapsObj.apple  || '#';
  // On tente Google Maps via un lien universel qui ouvre l'app
  // Si non installée, le navigateur ouvre Google Maps web
  return `<a class="btn-maps" href="${gUrl}" target="_blank">📍 Maps</a>`;
}

// ===== HEADER =====
function rendreHeader() {
  document.getElementById('sejour-titre').textContent = SEJOUR.titre;
  document.getElementById('sejour-meta').textContent =
    `📅 ${SEJOUR.dates} · 📍 ${SEJOUR.destination}`;

  const badges = document.getElementById('sejour-badges');
  badges.innerHTML = ['🚐 Camping-Car', '🐕 Dog-friendly', '👨‍👩‍👧‍👦 Famille'].map(
    b => `<span class="badge">${b}</span>`
  ).join('');

  const total = SEJOUR.checklist.length;
  const faits = Object.values(checklistEtat).filter(Boolean).length;
  const pct   = total ? Math.round(faits / total * 100) : 0;
  badges.innerHTML += `
    <div style="width:100%;margin-top:8px">
      <div class="progress-label">✅ Checklist : ${faits}/${total}</div>
      <div class="progress-bar-wrap">
        <div class="progress-bar" style="width:${pct}%"></div>
      </div>
    </div>`;
}

// ===== NAVIGATION =====
function rendreNavJours() {
  const nav = document.getElementById('nav-jours');
  const onglets = SEJOUR.jours.map((j, i) => ({
    emoji: j.emoji, label: `J${j.numero}`,
    sub: j.label.split(' ').slice(0, 2).join(' '), index: i
  }));
  onglets.push({ emoji: '🧭', label: 'Randos', sub: '& TA', index: 4 });

  nav.innerHTML = onglets.map(o => `
    <button class="nav-jour-btn ${o.index === jourActif ? 'actif' : ''}"
            onclick="changerOnglet(${o.index})">
      <span class="nav-emoji">${o.emoji}</span>
      <span class="nav-label">${o.label}</span>
      <span class="nav-label nav-sub">${o.sub}</span>
    </button>`).join('');
}

function changerOnglet(index) {
  jourActif = index;
  document.querySelectorAll('.nav-jour-btn').forEach((btn, i) => {
    btn.classList.toggle('actif', i === index);
  });
  index === 4 ? rendreRandos() : rendreJour(index);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== RENDU JOUR =====
function rendreJour(index) {
  const jour = SEJOUR.jours[index];
  const main = document.getElementById('main-content');

  const parPlage = {};
  jour.etapes.forEach(e => {
    if (!parPlage[e.plage]) parPlage[e.plage] = [];
    parPlage[e.plage].push(e);
  });

  let html = `
    <div class="jour-header">
      <div class="jour-emoji-grand">${jour.emoji}</div>
      <div>
        <div class="jour-info-label">${jour.label}</div>
        <div class="jour-info-titre">${jour.titre}</div>
        <div class="jour-km">🥾 ${jour.km_balade}</div>
      </div>
    </div>
    <div class="jour-ambiance">${jour.ambiance}</div>`;

  ['matin','midi','aprem','soir'].forEach(plage => {
    if (!parPlage[plage]) return;
    html += `<div class="plage-label">${PLAGES[plage]}</div>`;
    parPlage[plage].forEach(e => { html += rendreEtape(e); });
  });

  main.innerHTML = html;
}

// ===== RENDU ÉTAPE =====
function rendreEtape(etape) {
  const icone   = ICONES[etape.type] || '📌';
  const tag     = rendreTag(etape.tag);
  const btnMaps = lienMaps(etape.maps);

  const btnsLiens = (etape.liens || []).map(l => {
    const isTel  = l.url.startsWith('tel:');
    const isSite = l.url.startsWith('https://') && !isTel;
    const cls    = isTel ? 'btn-lien btn-tel' : isSite ? 'btn-lien btn-site' : 'btn-lien';
    return `<a class="${cls}" href="${l.url}"${isTel ? '' : ' target="_blank"'}>${l.label}</a>`;
  }).join('');

  const footer = (tag || btnMaps || btnsLiens)
    ? `<div class="etape-footer">${btnMaps}${btnsLiens}${tag}</div>`
    : '';

  // Séparateur visuel pour les plans B (double saut de ligne dans description)
  const desc = (etape.description || '')
    .split('\n\n')
    .map((bloc, i) => {
      if (i === 0) return `<p class="etape-desc">${bloc}</p>`;
      return `<p class="etape-desc etape-planb">${bloc}</p>`;
    }).join('');

  return `
    <div class="etape-card type-${etape.type}">
      <div class="etape-accent"></div>
      <div class="etape-icone">${icone}</div>
      <div class="etape-corps">
        <div class="etape-heure">${etape.heure}</div>
        <div class="etape-titre">${etape.titre}</div>
        ${desc}
        ${footer}
      </div>
    </div>`;
}

function rendreTag(tag) {
  if (!tag) return '';
  if (tag.includes('Terra'))  return `<span class="etape-tag tag-terra">${tag}</span>`;
  if (tag.includes('🐕') || tag.includes('Animaux')) return `<span class="etape-tag tag-chien">${tag}</span>`;
  if (tag.includes('⚠️'))     return `<span class="etape-tag tag-warning">${tag}</span>`;
  if (tag.includes('📞'))     return `<span class="etape-tag tag-resa">${tag}</span>`;
  return `<span class="etape-tag" style="background:var(--gris-bg);color:var(--gris)">${tag}</span>`;
}

// ===== ONGLET RANDOS =====
function rendreRandos() {
  const main = document.getElementById('main-content');
  const typeLabel = { terra: '🎮 Terra Aventura', visorando: '🥾 Visorando' };

  let html = `
    <div class="jour-header">
      <div class="jour-emoji-grand">🧭</div>
      <div>
        <div class="jour-info-label">Récapitulatif</div>
        <div class="jour-info-titre">Randos & Terra Aventura</div>
      </div>
    </div>`;

  SEJOUR.randos.forEach(r => {
    const btnMaps   = lienMaps(r.maps);
    const btnsLiens = (r.liens || []).map(l =>
      `<a class="btn-lien btn-site" href="${l.url}" target="_blank">${l.label}</a>`
    ).join('');
    const poi = r.poi.map(p => `<li class="rando-poi-item">${p}</li>`).join('');
    const alertes = r.alertes.map(a => `<div class="rando-alerte">${a}</div>`).join('');
    const stats = r.poiz
      ? `<div class="rando-meta"><span class="rando-stat">Poï'z : ${r.poiz}</span> · ${r.theme}</div>`
      : '';

    html += `
      <div class="rando-card type-${r.type}">
        <div class="rando-header">
          <span class="rando-badge ${r.type}">${typeLabel[r.type]}</span>
          <span class="rando-jour">${r.jour}</span>
        </div>
        <div class="rando-titre">${r.emoji} ${r.titre}</div>
        ${stats}
        <div class="rando-infos">
          <span>📏 ${r.distance}</span>
          <span>⏱️ ${r.duree}</span>
          <span>💪 ${r.difficulte}</span>
        </div>
        <div class="rando-depart">📍 ${r.depart}</div>
        <p class="rando-desc">${r.description}</p>
        <div class="rando-poi-titre">Points d'intérêt</div>
        <ul class="rando-poi-liste">${poi}</ul>
        ${alertes}
        <div class="etape-footer" style="margin-top:12px">${btnMaps}${btnsLiens}</div>
      </div>`;
  });

  main.innerHTML = html;
}

// ===== CHECKLIST =====
function chargerChecklistLocale() {
  const s = localStorage.getItem(`checklist-${SEJOUR.id}`);
  checklistEtat = s ? JSON.parse(s) : {};
  SEJOUR.checklist.forEach(item => {
    if (checklistEtat[item.id] === undefined) checklistEtat[item.id] = false;
  });
}

function sauvegarderChecklist() {
  localStorage.setItem(`checklist-${SEJOUR.id}`, JSON.stringify(checklistEtat));
}

function ouvrirChecklist() {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-checklist-content');
  const parCat  = {};
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
          <input type="checkbox" id="check-${item.id}" ${fait ? 'checked' : ''}
                 onchange="toggleCheck(${item.id})" onclick="event.stopPropagation()">
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
  rendreNavJours();
}

function toggleCheck(id) {
  checklistEtat[id] = !checklistEtat[id];
  sauvegarderChecklist();
  const cb = document.querySelector(`#check-${id}`);
  if (cb) {
    cb.checked = checklistEtat[id];
    cb.closest('.checklist-item').classList.toggle('fait', checklistEtat[id]);
  }
}

function sauvegarderOffline() {
  try { localStorage.setItem(`sejour-${SEJOUR.id}`, JSON.stringify(SEJOUR)); }
  catch(e) { console.warn('Offline non dispo'); }
}
