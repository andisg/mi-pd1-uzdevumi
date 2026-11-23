# Mani uzdevumi

## Mērķis
Uzdevumu saraksta tīmekļa lietotne, kas darbojas pārlūkā bez servera.

## Faili
- index.html: lapas struktūra
- style.css: izskats
- app.js: visa loģika

## Datu struktūra
localStorage atslēga "pd1-uzdevumi", masīvs ar objektiem:
{ id: teksts, text: teksts, done: true/false, due: "GGGG-MM-DD" vai null }

Lauks due nav obligāts. Vecākiem ierakstiem bez lauka due jādarbojas bez kļūdām.

## Funkcijas app.js
nolasitUzdevumus(): Nolasa uzdevumus no pārlūka localStorage krātuves un bojātu vai nederīgu datu gadījumā atgriež tukšu masīvu.

saglabatUzdevumus(): Saglabā pašreizējo uzdevumu sarakstu pārlūka localStorage krātuvē JSON formātā.

pievienotUzdevumu(notikums): Pievieno jaunu uzdevumu sarakstam, ja ievadītais teksts nav tukšs. Saglabā izvēlēto izpildes termiņu vai null, ja termiņš nav norādīts, un atjauno saskarni.

mainitStatusu(id): Maina konkrētā uzdevuma izpildes statusu uz pretējo.

dzestUzdevumu(id): Dzēš uzdevumu no saraksta pēc tā unikālā identifikatora.

izveidotUzdevumaElementu(uzdevums): Izveido HTML elementu konkrētam uzdevumam, pievienojot izpildes pogu, uzdevuma tekstu, izpildes termiņu formātā DD.MM.GGGG un dzēšanas pogu. Ja neizpildītam uzdevumam termiņš ir pagājis, iezīmē rindu sarkanā krāsā un pievieno tekstu "Nokavēts". Uzdevumiem bez termiņa to neattēlo.

attēlotUzdevumus(): Attēlo uzdevumus atbilstoši izvēlētajam filtram, atjauno atlikušo uzdevumu skaitītāju un parāda paziņojumu, ja saraksts ir tukšs.

atjaunotSaskarni(): Saglabā pašreizējos uzdevumus pārlūka krātuvē un atjauno to attēlojumu lietotāja saskarnē.

## Konvencijas
- Tīrs HTML, CSS, JavaScript, bez bibliotēkām
- Saskarne un komentāri latviski
- Teksta attēlošanai tikai textContent
- Funkcija ne garāka par 30 rindām
