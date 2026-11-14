# Mani uzdevumi

Vienkārša, atsaucīga uzdevumu saraksta tīmekļa lietotne latviešu valodā. Tā ļauj pierakstīt ikdienas darbus, atzīmēt tos kā izpildītus un apskatīt uzdevumus pēc to statusa. Dati tiek glabāti pārlūka `localStorage`, tāpēc tie saglabājas pēc lapas aizvēršanas un atkārtotas atvēršanas tajā pašā pārlūkā.

## Funkcijas

- Jauna uzdevuma pievienošana ar pogu **Pievienot** vai taustiņu **Enter**.
- Tukši uzdevumi netiek pievienoti; ievades sākuma un beigu atstarpes tiek noņemtas.
- Uzdevuma atzīmēšana kā izpildīta un atkārtota aktivizēšana.
- Uzdevuma dzēšana no saraksta.
- Uzdevumu filtrēšana: **Visi**, **Aktīvie** un **Izpildītie**.
- Atlikušo, vēl neizpildīto uzdevumu skaita attēlošana.
- Uzdevumu automātiska saglabāšana pārlūka krātuvē ar atslēgu `pd1-uzdevumi`.
- Pielāgots izkārtojums mobilajiem tālruņiem un datoriem, kā arī pieejamības atribūti palīgtehnoloģijām.

## Izmantotās tehnoloģijas

- **HTML5** — lapas semantiskā struktūra un saskarnes elementi.
- **CSS3** — izkārtojums, krāsas, pielāgošanās ekrāna izmēram un vienkāršas pārejas.
- **JavaScript (ES6+)** — uzdevumu pārvaldība, filtri, notikumu apstrāde un datu saglabāšana.
- **Web Storage API (`localStorage`)** — datu saglabāšana lietotāja pārlūkā.

Lietotne neizmanto JavaScript bibliotēkas vai ietvarus. CSS failā ir norādīti Google Fonts fonti; ja tie nav pieejami, pārlūks izmantos rezerves sans-serif fontu.

## Projekta faili

| Fails | Apraksts |
| --- | --- |
| `index.html` | Lietotnes lapas struktūra, ievades lauks, pogas un uzdevumu saraksts. |
| `style.css` | Lietotnes vizuālais noformējums un pielāgošanās dažādiem ekrāniem. |
| `app.js` | Uzdevumu pievienošana, izpildes statusa maiņa, dzēšana, filtrēšana un saglabāšana. |

## Palaišana

1. Lejupielādē vai nokopē projekta failus vienā mapē.
2. Atver šajā mapē failu `index.html` ar tīmekļa pārlūku.
3. Ieraksti uzdevumu ievades laukā un nospied **Enter** vai pogu **Pievienot**.

Papildu servera vai būvēšanas rīki nav nepieciešami. Uzdevumi paliek pieejami tajā pašā pārlūkā un pārlūka profilā; iztīrot vietnes datus vai izmantojot citu pārlūku, saglabātais saraksts nebūs pieejams.

## Datu formāts

Uzdevumi tiek saglabāti JSON masīvā. Katram uzdevumam ir unikāls identifikators, teksts un izpildes stāvoklis:

```json
[
  {
    "id": "unikāls-identifikators",
    "text": "Sagatavot prezentāciju",
    "done": false
  }
]
```
