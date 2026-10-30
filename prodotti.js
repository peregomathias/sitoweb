/* ============================================================
   prodotti.js - il CATALOGO del negozio (tutti i prodotti in un posto solo)
   Per aggiungere un prodotto basta copiare un blocco e cambiare i dati.
   Le foto si chiamano: img/<tipo>-<colore>-<vista>.webp  (vista = studio, sera, dettaglio)
   ============================================================ */

var PRODOTTI = [
  {
    id: "sorso-original", tipo: "original", nome: "Sorso Original", cat: "borracce", prezzo: 29.90, badge: "Più venduta", voto: 4.9, recensioni: 218,
    breve: "La borraccia smart da 750 ml che si illumina e conta i litri.",
    descrizione: "Sorso Original è la borraccia che ti ricorda di bere. Un anello di LED nel tappo si accende ogni ora, mentre un sensore misura ogni sorso e segna i litri della giornata. Doppia parete in acciaio inox riciclato: l'acqua resta fredda 24 ore.",
    colori: [
      { id: "corallo", nome: "Corallo", hex: "#E2553F" }, { id: "ghiaccio", nome: "Ghiaccio", hex: "#BFE3EC" },
      { id: "notte", nome: "Notte", hex: "#10222C" }, { id: "sole", nome: "Sole", hex: "#F4B92C" }
    ],
    punti: ["Luce LED che si accende ogni ora", "Sensore nel tappo: conta ogni sorso", "Doppia parete: fredda 24 ore, calda 12", "Acciaio inox riciclato, senza BPA"],
    specifiche: [["Capacità", "750 ml"], ["Materiale", "Acciaio inox 18/8 riciclato, senza BPA"], ["Peso", "340 g"], ["Altezza", "26 cm"], ["Batteria", "Ricarica USB-C, dura 30 giorni"], ["Mantiene fredda", "24 ore"], ["Mantiene calda", "12 ore"], ["Garanzia", "2 anni"]]
  },
  {
    id: "sorso-mini", tipo: "mini", nome: "Sorso Mini", cat: "borracce", prezzo: 22.90, badge: "Novità", voto: 4.8, recensioni: 96,
    breve: "350 ml, entra in ogni zaino. Perfetta per scuola e palestra.",
    descrizione: "La versione compatta di Sorso: stessa luce, stesso sensore, ma solo 350 ml e 230 grammi. Entra nel portabottiglie dello zaino e nelle tasche laterali. Ideale per le lezioni, l'allenamento e i bambini più grandi.",
    colori: [{ id: "menta", nome: "Menta", hex: "#8FD6BD" }, { id: "rosa", nome: "Rosa", hex: "#F0A9B8" }, { id: "notte", nome: "Notte", hex: "#10222C" }],
    punti: ["Compatta: solo 230 g", "Stessa luce LED e stesso sensore", "Si infila in ogni tasca laterale", "Anello per il moschettone"],
    specifiche: [["Capacità", "350 ml"], ["Materiale", "Acciaio inox 18/8 riciclato, senza BPA"], ["Peso", "230 g"], ["Altezza", "19 cm"], ["Batteria", "Ricarica USB-C, dura 30 giorni"], ["Mantiene fredda", "18 ore"], ["Garanzia", "2 anni"]]
  },
  {
    id: "sorso-sport", tipo: "sport", nome: "Sorso Sport", cat: "borracce", prezzo: 34.90, badge: "", voto: 4.8, recensioni: 143,
    breve: "Beccuccio a una mano e guscio antiurto. Nata per allenarsi.",
    descrizione: "Sorso Sport ha un beccuccio che si apre con una mano sola, anche in corsa o in bici. Il corpo ha un rivestimento gommato antiscivolo e un fondo rinforzato che assorbe gli urti. Il sensore calcola anche il ritmo: ti avvisa se stai bevendo troppo poco durante l'allenamento.",
    colori: [{ id: "grafite", nome: "Grafite", hex: "#34393D" }, { id: "lime", nome: "Lime", hex: "#B7D933" }, { id: "oceano", nome: "Oceano", hex: "#1D6F9C" }],
    punti: ["Beccuccio con apertura a una mano", "Rivestimento gommato antiscivolo", "Fondo rinforzato antiurto", "Allarme ritmo durante l'allenamento"],
    specifiche: [["Capacità", "750 ml"], ["Materiale", "Acciaio inox riciclato con rivestimento soft-touch"], ["Peso", "380 g"], ["Altezza", "28 cm"], ["Batteria", "Ricarica USB-C, dura 30 giorni"], ["Mantiene fredda", "24 ore"], ["Garanzia", "2 anni"]]
  },
  {
    id: "sorso-max", tipo: "max", nome: "Sorso Max", cat: "borracce", prezzo: 39.90, badge: "1 litro", voto: 4.7, recensioni: 61,
    breve: "Un litro intero, per le giornate lunghe in magazzino o in ufficio.",
    descrizione: "Per chi non vuole riempire la borraccia più volte al giorno. Sorso Max contiene un litro d'acqua, ha una bocca larga per inserire il ghiaccio e un obiettivo giornaliero configurabile: due riempimenti e hai bevuto i tuoi due litri.",
    colori: [{ id: "ardesia", nome: "Ardesia", hex: "#46525A" }, { id: "perla", nome: "Perla", hex: "#E9ECEC" }],
    punti: ["1 litro: due riempimenti al giorno", "Bocca larga, entra il ghiaccio", "Obiettivo giornaliero configurabile", "Manico integrato nel tappo"],
    specifiche: [["Capacità", "1000 ml"], ["Materiale", "Acciaio inox 18/8 riciclato, senza BPA"], ["Peso", "450 g"], ["Altezza", "31 cm"], ["Batteria", "Ricarica USB-C, dura 30 giorni"], ["Mantiene fredda", "36 ore"], ["Garanzia", "2 anni"]]
  },
  {
    id: "pack-duo", tipo: "duo", nome: "Pack Duo", cat: "pack", prezzo: 54.90, badge: "Risparmi 5 €", voto: 5.0, recensioni: 74,
    breve: "Due Sorso Original in confezione regalo. Una per te, una da regalare.",
    descrizione: "Due Sorso Original da 750 ml in una confezione regalo in cartone riciclato, con biglietto personalizzabile. Due colori che stanno bene insieme, a 5 € in meno rispetto all'acquisto separato.",
    colori: [{ id: "ghiaccio-corallo", file: "ghiaccio_corallo", nome: "Ghiaccio + Corallo", hex: "#BFE3EC", hex2: "#E2553F" }, { id: "notte-sole", file: "notte_sole", nome: "Notte + Sole", hex: "#10222C", hex2: "#F4B92C" }],
    punti: ["2 Sorso Original da 750 ml", "Confezione regalo in cartone riciclato", "Biglietto di auguri incluso", "Risparmi 5 € rispetto a due singole"],
    specifiche: [["Contenuto", "2 borracce Sorso Original, 2 cavi USB-C"], ["Capacità", "2 × 750 ml"], ["Confezione", "Scatola regalo in cartone riciclato"], ["Garanzia", "2 anni su ogni borraccia"]]
  },
  {
    id: "custodia-termica", tipo: "custodia", nome: "Custodia termica", cat: "accessori", prezzo: 14.90, badge: "", voto: 4.6, recensioni: 52,
    breve: "Neoprene da 4 mm con tracolla: protegge la borraccia dagli urti.",
    descrizione: "Una custodia in neoprene da 4 mm che protegge la borraccia da graffi e urti e isola ancora di più. Ha una tracolla regolabile con cui portarla a tracolla o agganciarla allo zaino. Adatta a Sorso Original e Sport.",
    colori: [{ id: "sabbia", nome: "Sabbia", hex: "#D8C4A0" }, { id: "grafite", nome: "Grafite", hex: "#34393D" }, { id: "blu", nome: "Blu", hex: "#25507A" }],
    punti: ["Neoprene da 4 mm", "Tracolla regolabile", "Fondo rinforzato impermeabile", "Lavabile in lavatrice a 30°"],
    specifiche: [["Materiale", "Neoprene 4 mm, fondo in PU"], ["Adatta a", "Sorso Original e Sorso Sport"], ["Peso", "90 g"], ["Lavaggio", "In lavatrice a 30°"]]
  },
  {
    id: "base-ricarica", tipo: "base", nome: "Base di ricarica", cat: "accessori", prezzo: 19.90, badge: "", voto: 4.7, recensioni: 88,
    breve: "Appoggia la borraccia e si ricarica da sola. Niente cavi nel tappo.",
    descrizione: "Una base a induzione: appoggi la borraccia e inizia a ricaricarsi, senza aprire nessuno sportellino. L'anello luminoso giallo mostra lo stato di carica. Compatibile con tutte le borracce Sorso.",
    colori: [{ id: "unico", nome: "Nero grafite", hex: "#1B2226" }],
    punti: ["Ricarica a induzione, senza cavi sul tappo", "Anello LED con stato di carica", "Compatibile con tutte le Sorso", "Cavo USB-C incluso"],
    specifiche: [["Potenza", "5 W a induzione"], ["Ingresso", "USB-C, cavo da 1,2 m incluso"], ["Diametro", "11 cm"], ["Compatibile", "Tutte le borracce Sorso"], ["Garanzia", "2 anni"]]
  },
  {
    id: "kit-pulizia", tipo: "kit", nome: "Kit pulizia", cat: "accessori", prezzo: 9.90, badge: "", voto: 4.8, recensioni: 120,
    breve: "Spazzola con setole in cocco e 12 pastiglie igienizzanti.",
    descrizione: "Tutto per tenere la borraccia come nuova: una spazzola lunga con setole naturali che arriva in fondo, e 12 pastiglie igienizzanti effervescenti, senza cloro. Metti una pastiglia, riempi d'acqua e dopo 15 minuti sciacqua.",
    colori: [{ id: "unico", nome: "Naturale", hex: "#E9DCC0" }],
    punti: ["Spazzola lunga con setole in cocco", "12 pastiglie igienizzanti senza cloro", "Scatolina in latta riutilizzabile", "Elimina odori e depositi"],
    specifiche: [["Contenuto", "1 spazzola, 12 pastiglie, scatola in latta"], ["Lunghezza spazzola", "34 cm"], ["Pastiglie", "Senza cloro, biodegradabili"]]
  },
  {
    id: "tappo-ricambio", tipo: "tappo", nome: "Tappo di ricambio", cat: "accessori", prezzo: 7.90, badge: "", voto: 4.9, recensioni: 39,
    breve: "Tappo con sensore e LED, più due guarnizioni di scorta.",
    descrizione: "Hai perso il tappo o vuoi averne uno di scorta? Questo ricambio include sensore, LED e batteria già installati, più due guarnizioni in silicone alimentare. Si avvita in un attimo.",
    colori: [{ id: "unico", nome: "Nero fumo", hex: "#262F34" }],
    punti: ["Sensore e LED già installati", "2 guarnizioni di scorta incluse", "Compatibile con Original, Mini, Sport e Max", "Silicone alimentare"],
    specifiche: [["Contenuto", "1 tappo, 2 guarnizioni"], ["Compatibile", "Tutta la gamma Sorso"], ["Batteria", "Ricarica USB-C, dura 30 giorni"]]
  },
  {
    id: "clip-moschettone", tipo: "clip", nome: "Moschettone", cat: "accessori", prezzo: 5.90, badge: "", voto: 4.5, recensioni: 27,
    breve: "Moschettone in alluminio per agganciare Sorso a zaino o cintura.",
    descrizione: "Un moschettone in alluminio anodizzato giallo, leggero e resistente fino a 15 kg. Si aggancia all'anello del tappo e ti lascia le mani libere.",
    colori: [{ id: "unico", nome: "Giallo", hex: "#FFD23F" }],
    punti: ["Alluminio anodizzato", "Resiste fino a 15 kg", "Solo 18 grammi", "Si aggancia al tappo"],
    specifiche: [["Materiale", "Alluminio anodizzato"], ["Portata", "15 kg"], ["Peso", "18 g"]]
  }
];

var CATEGORIE = { tutti: "Tutti", borracce: "Borracce", pack: "Pack", accessori: "Accessori" };

function trovaProdotto(id) {
  for (var i = 0; i < PRODOTTI.length; i++) if (PRODOTTI[i].id === id) return PRODOTTI[i];
  return null;
}
function trovaColore(p, idColore) {
  for (var i = 0; i < p.colori.length; i++) if (p.colori[i].id === idColore) return p.colori[i];
  return p.colori[0];
}
// percorso della foto: vista = "studio" | "sera" | "dettaglio"
function foto(p, c, vista) { return "img/" + p.tipo + "-" + (c.file || c.id) + "-" + vista + ".webp"; }
