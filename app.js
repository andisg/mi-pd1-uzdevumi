const GLABASANAS_ATSLĒGA = 'pd1-uzdevumi';
const forma = document.querySelector('#task-form');
const ievade = document.querySelector('#task-input');
const saraksts = document.querySelector('#task-list');
const skaititajs = document.querySelector('#counter');
const filtruPogas = document.querySelectorAll('[data-filter]');
let uzdevumi = nolasitUzdevumus();
let aktīvaisFiltrs = 'all';

// Nolasa saglabātos uzdevumus un bojātu datu gadījumā sāk ar tukšu sarakstu.
function nolasitUzdevumus() {
  try {
    const dati = JSON.parse(localStorage.getItem(GLABASANAS_ATSLĒGA) || '[]');
    return Array.isArray(dati) ? dati.filter((ieraksts) => ieraksts && typeof ieraksts.id === 'string' && typeof ieraksts.text === 'string' && typeof ieraksts.done === 'boolean') : [];
  } catch {
    return [];
  }
}

// Saglabā pašreizējo sarakstu pārlūka krātuvē.
function saglabatUzdevumus() {
  localStorage.setItem(GLABASANAS_ATSLĒGA, JSON.stringify(uzdevumi));
}

// Pievieno ievadīto uzdevumu, ja tajā ir teksts.
function pievienotUzdevumu(notikums) {
  notikums.preventDefault();
  const teksts = ievade.value.trim();
  if (!teksts) return;
  uzdevumi.push({ id: crypto.randomUUID(), text: teksts, done: false });
  ievade.value = '';
  atjaunotSaskarni();
  ievade.focus();
}

// Pārslēdz uzdevuma izpildes stāvokli.
function mainitStatusu(id) {
  uzdevumi = uzdevumi.map((uzdevums) => uzdevums.id === id ? { ...uzdevums, done: !uzdevums.done } : uzdevums);
  atjaunotSaskarni();
}

// Izņem uzdevumu no saraksta.
function dzestUzdevumu(id) {
  uzdevumi = uzdevumi.filter((uzdevums) => uzdevums.id !== id);
  atjaunotSaskarni();
}

// Izveido viena uzdevuma HTML elementu, izmantojot drošu teksta ievietošanu.
function izveidotUzdevumaElementu(uzdevums) {
  const elements = document.createElement('li');
  elements.className = `uzdevums${uzdevums.done ? ' izpildīts' : ''}`;
  elements.dataset.id = uzdevums.id;
  const poga = document.createElement('button');
  poga.className = 'izpildes-poga';
  poga.type = 'button';
  poga.setAttribute('aria-label', uzdevums.done ? 'Atzīmēt kā aktīvu' : 'Atzīmēt kā izpildītu');
  poga.setAttribute('aria-pressed', String(uzdevums.done));
  poga.textContent = uzdevums.done ? '✓' : '';
  const teksts = document.createElement('span');
  teksts.className = 'uzdevuma-teksts';
  teksts.textContent = uzdevums.text;
  const dzest = document.createElement('button');
  dzest.className = 'dzest-poga';
  dzest.type = 'button';
  dzest.setAttribute('aria-label', `Dzēst: ${uzdevums.text}`);
  dzest.textContent = '×';
  elements.append(poga, teksts, dzest);
  return elements;
}

// Uzzīmē filtrētos uzdevumus, skaitītāju un tukšā saraksta paziņojumu.
function attēlotUzdevumus() {
  const redzamie = uzdevumi.filter((uzdevums) => aktīvaisFiltrs === 'all' || (aktīvaisFiltrs === 'active' && !uzdevums.done) || (aktīvaisFiltrs === 'completed' && uzdevums.done));
  saraksts.replaceChildren();
  redzamie.forEach((uzdevums) => saraksts.append(izveidotUzdevumaElementu(uzdevums)));
  if (redzamie.length === 0) {
    const tukss = document.createElement('li');
    tukss.className = 'tukss';
    tukss.textContent = uzdevumi.length ? 'Šajā skatā uzdevumu nav.' : 'Saraksts ir tukšs — pievieno pirmo uzdevumu!';
    saraksts.append(tukss);
  }
  const atlikusi = uzdevumi.filter((uzdevums) => !uzdevums.done).length;
  skaititajs.textContent = `Atlikuši ${atlikusi} ${atlikusi === 1 ? 'uzdevums' : 'uzdevumi'}`;
}

// Saglabā izmaiņas un atjauno redzamo sarakstu.
function atjaunotSaskarni() {
  saglabatUzdevumus();
  attēlotUzdevumus();
}

forma.addEventListener('submit', pievienotUzdevumu);
filtruPogas.forEach((poga) => poga.addEventListener('click', () => {
  aktīvaisFiltrs = poga.dataset.filter;
  filtruPogas.forEach((filtrs) => {
    const izvēlēts = filtrs === poga;
    filtrs.classList.toggle('aktīvs', izvēlēts);
    filtrs.setAttribute('aria-pressed', String(izvēlēts));
  });
  attēlotUzdevumus();
}));

saraksts.addEventListener('click', (notikums) => {
  const poga = notikums.target.closest('button');
  const elements = poga?.closest('.uzdevums');
  if (!elements) return;
  if (poga.classList.contains('izpildes-poga')) mainitStatusu(elements.dataset.id);
  if (poga.classList.contains('dzest-poga')) dzestUzdevumu(elements.dataset.id);
});

attēlotUzdevumus();
