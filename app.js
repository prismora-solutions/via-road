// ===== ÉTAT =====
let jourActif = 0;
let checklistEtat = {}; // { id: bool }

// ===== ICÔNES PAR TYPE =====
const ICONES = {
  trajet:      '🚐',
  hebergement: '🏕️',
  repas:       '🍽️',
  activite:    '🎯',
  culture:     '🏛️',
  balade:      '🐾',
  routine:     '☀️',
  arrivee:     '🏠'
};

const PLAGES = {
  matin:  '🌅 Matin',
  midi:   '☀️ Midi',
  aprem:  '🌤️ Après-midi',
  soir:   '🌙 Soir'
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  chargerChecklistLocale();
  rendreHeader();
  rendreNavJours();
  rendreJour(0);
  sauvegarderOffline();
});

// ===== HEADER =====
function rendreHeader() {
  document.getElementById('sejour-titre').textContent = SEJOUR.titre;
  document.getElementById('sejour-meta').textContent =
    `📅 ${SEJOUR.dates} · 📍 ${SEJOUR.destination}`;

  const badges = document.getElementById('sejour-badges');
  const infos = [
    `🚐 ${SEJOUR.hebergement.type}`,
    '🐕 Dog-friendly',
    '👨‍👩‍👧‍👦 Famille'
  ];
  badges.innerHTML = infos.map(b => `<span class="badge">${b}</span>`).join('');

  // Progress checklist
  const total = SEJOUR.checklist.length;
  const faits = Object.values(checklistEtat).filter(Boolean).length;
  const pct = total ? Math.round(faits / total * 100) : 0;

  badges.innerHTML += `
    <div style="width:100%; margin-top:8px;">
      <div class="progress-label">✅ Checklist : ${faits}/${total}</div>
      <div class="progress-bar-wrap">
        <div class="progress-bar" id="progress-bar" style="width:${pct}%"></div>
      </div>
    </div>`;
}

// ===== NAVIGATION JOURS =====
function rendreNavJours() {
  const nav = document.getElementById('nav-jours');
  nav.innerHTML = SEJOUR.jours.map((j, i) => `
    <button class="nav-jour-btn ${i === jourActif ? 'actif' : ''}"
            onclick="changerJour(${i})">
      <span class="nav-emoji">${j.emoji}</span>
      <span class="nav-label">J${j.numero}</span>
      <span class="nav-label" style="font-weight:400;opacity:.7">${j.label.split(' ').slice(0,2).join(' ')}</span>
    </button>
  `).join('');
}

function changerJour(index) {
  jourActif = index;
  document.querySelectorAll('.nav-jour-btn').forEach((btn, i) => {
    btn.classList.toggle('actif', i === index);
  });
  rendreJour(index);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== RENDU JOUR =====
function rendreJour(index) {
  const jour = SEJOUR.jours[index];
  const main = document.getElementById('main-content');

  // Grouper étapes par plage
  const parPlage = {};
  jour.etapes.forEach(e => {
    if (!parPlage[e.plage]) parPlage[e.plage] = [];
    parPlage[e.plage].push(e);
  });

  const ordreParPlage = ['matin', 'midi', 'aprem', 'soir'];

  let html = `
    <div class="jour-header">
      <div class="jour-emoji-grand">${jour.emoji}</div>
      <div>
        <div class="jour-info-label">${jour.label}</div>
        <div class="jour-info-titre">${jour.titre}</div>
      </div>
    </div>`;

  ordreParPlage.forEach(plage => {
    if (!parPlage[plage]) return;
    html += `<div class="plage-label">${PLAGES[plage]}</div>`;
    parPlage[plage].forEach(etape => {
      html += rendreEtape(etape);
    });
  });

  main.innerHTML = html;
}

// ===== RENDU ÉTAPE =====
function rendreEtape(etape) {
  const icone = ICONES[etape.type] || '📌';
  const tag = rendreTag(etape.tag);
  const btnMaps = etape.maps
    ? `<a class="btn-maps" href="${etape.maps}" target="_blank">Ouvrir Maps</a>`
    : '';

  const footer = (tag || btnMaps)
    ? `<div class="etape-footer">${btnMaps}${tag}</div>`
    : '';

  return `
    <div class="etape-card type-${etape.type}">
      <div class="etape-accent"></div>
      <div class="etape-icone">${icone}</div>
      <div class="etape-corps">
        <div class="etape-heure">${etape.heure}</div>
        <div class="etape-titre">${etape.titre}</div>
        <div class="etape-desc">${etape.description}</div>
        ${footer}
      </div>
    </div>`;
}

function rendreTag(tag) {
  if (!tag) return '';
  if (tag.includes('Terra'))   return `<span class="etape-tag tag-terra">${tag}</span>`;
  if (tag.includes('Chien') || tag.includes('🐕')) return `<span class="etape-tag tag-chien">${tag}</span>`;
  if (tag.includes('⚠️'))      return `<span class="etape-tag tag-warning">${tag}</span>`;
  if (tag.includes('📞'))      return `<span class="etape-tag tag-resa">${tag}</span>`;
  return `<span class="etape-tag" style="background:var(--gris-bg);color:var(--gris)">${tag}</span>`;
}

// ===== CHECKLIST =====
function chargerChecklistLocale() {
  const sauvegarde = localStorage.getItem(`checklist-${SEJOUR.id}`);
  if (sauvegarde) {
    checklistEtat = JSON.parse(sauvegarde);
  } else {
    SEJOUR.checklist.forEach(item => { checklistEtat[item.id] = false; });
  }
}

function sauvegarderChecklist() {
  localStorage.setItem(`checklist-${SEJOUR.id}`, JSON.stringify(checklistEtat));
}

function ouvrirChecklist() {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-checklist-content');

  // Grouper par catégorie
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
  // Refresh progress header
  rendreHeader();
  rendreNavJours();
}

function toggleCheck(id) {
  checklistEtat[id] = !checklistEtat[id];
  sauvegarderChecklist();

  // Refresh l'item dans le DOM
  const item = document.querySelector(`.checklist-item [id="check-${id}"]`);
  if (item) {
    const parent = item.closest('.checklist-item');
    item.checked = checklistEtat[id];
    parent.classList.toggle('fait', checklistEtat[id]);
  }
}

// ===== OFFLINE — sauvegarde les données du séjour =====
function sauvegarderOffline() {
  try {
    localStorage.setItem(`sejour-${SEJOUR.id}`, JSON.stringify(SEJOUR));
  } catch(e) {
    console.warn('Stockage offline non disponible');
  }
}
