/* ============================================================
   script.js - le AZIONI del sito (JavaScript)
   Questo file e' collegato a TUTTE le pagine (insieme a prodotti.js).
   Il carrello e' salvato con localStorage: un "cassetto" del browser
   dove i dati restano anche cambiando pagina.
   Ogni pagina usa solo la sua parte: controllo prima se un elemento esiste.
   ============================================================ */

var SCONTO_CODICE = 0.10;    // il codice CIAO10 vale il 10%
var SOGLIA_EXPRESS = 60;     // da 60 euro l'express e' gratis
var COSTO_EXPRESS = 6.90;

// ---------- FUNZIONI DI SERVIZIO (usate da piu' pagine) ----------

function $(id) { return document.getElementById(id); }                 // scorciatoia per cercare un elemento
function euro(n) { return n.toFixed(2).replace(".", ",") + " €"; }       // 29.9 -> "29,90 €"
function leggi(chiave, valorePredefinito) {                              // legge dal cassetto in modo sicuro
  try { var v = localStorage.getItem(chiave); return v ? JSON.parse(v) : valorePredefinito; } catch (e) { return valorePredefinito; }
}
function scrivi(chiave, valore) { try { localStorage.setItem(chiave, JSON.stringify(valore)); } catch (e) {} }
function cancella(chiave) { try { localStorage.removeItem(chiave); } catch (e) {} }

// Il carrello e' una lista: ogni riga ha prodotto, colore e quantita'
function leggiCarrello() { return leggi("carrello", []); }
function salvaCarrello(c) { scrivi("carrello", c); aggiornaContatore(); }
function quantitaTotale() { var t = 0; leggiCarrello().forEach(function (r) { t += r.qta; }); return t; }
function codiceAttivo() { return leggi("codice", "") === "CIAO10"; }

function aggiungiAlCarrello(id, colore, qta) {
  var c = leggiCarrello(), trovata = false;
  c.forEach(function (r) { if (r.id === id && r.colore === colore) { r.qta = Math.min(r.qta + qta, 20); trovata = true; } });
  if (!trovata) c.push({ id: id, colore: colore, qta: qta });
  salvaCarrello(c);
}

// Aggiorna il numero accanto a "Carrello" nella barra in alto
function aggiornaContatore() { if ($("contatore")) $("contatore").textContent = quantitaTotale(); }

// Calcola tutti gli importi: subtotale, sconto e totale
function calcola(extra) {
  var sub = 0;
  leggiCarrello().forEach(function (r) { var p = trovaProdotto(r.id); if (p) sub += p.prezzo * r.qta; });
  var sconto = codiceAttivo() ? sub * SCONTO_CODICE : 0;
  return { sub: sub, sconto: sconto, totale: sub - sconto + (extra || 0) };
}

function stelle(voto) {
  var piene = Math.round(voto), s = "";
  for (var i = 0; i < 5; i++) s += i < piene ? "★" : "☆";
  return s;
}

// Piccolo messaggio che appare in basso (es. "Aggiunto al carrello")
function toast(html) {
  var t = $("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.innerHTML = html;
  setTimeout(function () { t.classList.add("su"); }, 20);
  clearTimeout(t.timer);
  t.timer = setTimeout(function () { t.classList.remove("su"); }, 3800);
}

// Disegna la "carta" di un prodotto (usata in home e negozio)
function cardProdotto(p) {
  var c = p.colori[0], punti = "";
  p.colori.forEach(function (x) {
    punti += "<span class='punto' title='" + x.nome + "' style='background:" + (x.hex2 ? "linear-gradient(90deg," + x.hex + " 50%," + x.hex2 + " 50%)" : x.hex) + "'></span>";
  });
  return "<a class='card' href='prodotto.html?id=" + p.id + "'>" +
    (p.badge ? "<span class='badge'>" + p.badge + "</span>" : "") +
    "<div class='foto'><img src='" + foto(p, c, "studio") + "' alt='" + p.nome + "' loading='lazy' width='600' height='600'>" +
    "<img src='" + foto(p, c, "sera") + "' alt='' loading='lazy' width='600' height='600'></div>" +
    "<div class='info'><div class='stelle'>" + stelle(p.voto) + "<small>" + p.voto.toFixed(1).replace(".", ",") + " (" + p.recensioni + ")</small></div>" +
    "<h3>" + p.nome + "</h3><p class='breve'>" + p.breve + "</p>" +
    "<div class='riga'><span class='prezzo'>" + euro(p.prezzo) + "</span><span class='punti-colore'>" + punti + "</span></div></div></a>";
}

aggiornaContatore();   // appena la pagina si carica

// ---------- MENU SUL TELEFONO ----------
if ($("menu-btn")) {
  $("menu-btn").onclick = function () {
    var aperto = $("menu").classList.toggle("aperto");
    this.setAttribute("aria-expanded", aperto);
  };
}

// ---------- ANIMAZIONE: gli elementi "rivela" compaiono scorrendo la pagina ----------
(function () {
  var el = document.querySelectorAll(".rivela");
  if (!("IntersectionObserver" in window)) { el.forEach(function (e) { e.classList.add("visibile"); }); return; }
  var oss = new IntersectionObserver(function (voci) {
    voci.forEach(function (v) { if (v.isIntersecting) { v.target.classList.add("visibile"); oss.unobserve(v.target); } });
  }, { threshold: 0.12 });
  el.forEach(function (e) { oss.observe(e); });
})();

// ---------- HOME: prodotti in evidenza ----------
if ($("in-evidenza")) {
  var html = "";
  ["sorso-original", "sorso-mini", "sorso-sport", "pack-duo"].forEach(function (id) { html += cardProdotto(trovaProdotto(id)); });
  $("in-evidenza").innerHTML = html;
}

// ---------- PAGINA NEGOZIO ----------
if ($("lista-prodotti")) {
  var catAttiva = new URLSearchParams(location.search).get("cat") || "tutti";
  if (!CATEGORIE[catAttiva]) catAttiva = "tutti";

  function disegnaNegozio() {
    var lista = PRODOTTI.filter(function (p) { return catAttiva === "tutti" || p.cat === catAttiva; });
    var ord = $("ordina").value;
    if (ord === "prezzo-su") lista.sort(function (a, b) { return a.prezzo - b.prezzo; });
    if (ord === "prezzo-giu") lista.sort(function (a, b) { return b.prezzo - a.prezzo; });
    if (ord === "nome") lista.sort(function (a, b) { return a.nome.localeCompare(b.nome); });
    var html = "";
    lista.forEach(function (p) { html += cardProdotto(p); });
    $("lista-prodotti").innerHTML = html;
    $("conteggio").textContent = lista.length + (lista.length === 1 ? " prodotto" : " prodotti");
    document.querySelectorAll("#filtri button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.cat === catAttiva); });
  }
  document.querySelectorAll("#filtri button").forEach(function (b) {
    b.onclick = function () { catAttiva = b.dataset.cat; disegnaNegozio(); };
  });
  $("ordina").onchange = disegnaNegozio;
  disegnaNegozio();
}

// ---------- PAGINA PRODOTTO ----------
if ($("scheda")) {
  var params = new URLSearchParams(location.search);
  var prod = trovaProdotto(params.get("id")) || PRODOTTI[0];
  var col = trovaColore(prod, params.get("colore"));
  var vista = "studio", qtaScelta = 1;
  var VISTE = ["studio", "sera", "dettaglio"];

  document.title = prod.nome + " | Fonte Viva";
  $("bc-nome").textContent = prod.nome;
  $("nome").textContent = prod.nome;
  $("prezzo").textContent = euro(prod.prezzo);
  $("stelle").innerHTML = stelle(prod.voto) + "<small>" + prod.voto.toFixed(1).replace(".", ",") + " · " + prod.recensioni + " recensioni</small>";
  $("breve").textContent = prod.breve;
  $("descrizione").textContent = prod.descrizione;

  var punti = "";
  prod.punti.forEach(function (t) { punti += "<li><svg class='ico'><use href='#i-check'/></svg><span>" + t + "</span></li>"; });
  $("punti").innerHTML = punti;
  var righe = "";
  prod.specifiche.forEach(function (s) { righe += "<tr><th>" + s[0] + "</th><td>" + s[1] + "</td></tr>"; });
  $("specifiche").innerHTML = righe;

  function disegnaProdotto() {
    $("foto-grande").src = foto(prod, col, vista);
    $("foto-grande").alt = prod.nome + " " + col.nome + ", vista " + vista;
    var m = "";
    VISTE.forEach(function (v) {
      m += "<button type='button' data-v='" + v + "' aria-pressed='" + (v === vista) + "' aria-label='Vista " + v + "'><img src='" + foto(prod, col, v) + "' alt='' loading='lazy'></button>";
    });
    $("miniature").innerHTML = m;
    document.querySelectorAll("#miniature button").forEach(function (b) { b.onclick = function () { vista = b.dataset.v; disegnaProdotto(); }; });
    $("colore-nome").textContent = col.nome;
    var c = "";
    prod.colori.forEach(function (x) {
      var sf = x.hex2 ? "linear-gradient(90deg," + x.hex + " 50%," + x.hex2 + " 50%)" : x.hex;
      c += "<button type='button' data-c='" + x.id + "' aria-pressed='" + (x.id === col.id) + "' aria-label='" + x.nome + "'><i style='background:" + sf + "'></i></button>";
    });
    $("colori").innerHTML = c;
    document.querySelectorAll("#colori button").forEach(function (b) { b.onclick = function () { col = trovaColore(prod, b.dataset.c); disegnaProdotto(); }; });
    $("colori-box").style.display = prod.colori.length > 1 ? "block" : "none";
    $("qta").textContent = qtaScelta;
  }
  $("meno").onclick = function () { if (qtaScelta > 1) { qtaScelta--; $("qta").textContent = qtaScelta; } };
  $("piu").onclick = function () { if (qtaScelta < 10) { qtaScelta++; $("qta").textContent = qtaScelta; } };
  $("aggiungi").onclick = function () {
    aggiungiAlCarrello(prod.id, col.id, qtaScelta);
    $("messaggio").textContent = "";
    toast("Aggiunto al carrello: " + prod.nome + " <a href='carrello.html'>Vai al carrello →</a>");
  };
  disegnaProdotto();

  var simili = "";   // prodotti consigliati: gli altri, a rotazione
  PRODOTTI.filter(function (p) { return p.id !== prod.id; }).slice(0, 4).forEach(function (p) { simili += cardProdotto(p); });
  $("simili").innerHTML = simili;
}

// ---------- PAGINA CARRELLO ----------
if ($("righe-carrello")) {
  function disegnaCarrello() {
    var c = leggiCarrello();
    $("vuoto").style.display = c.length === 0 ? "block" : "none";
    $("contenuto").style.display = c.length === 0 ? "none" : "grid";
    var html = "";
    c.forEach(function (r, i) {
      var p = trovaProdotto(r.id); if (!p) return;
      var col = trovaColore(p, r.colore);
      html += "<div class='riga-carrello'><a href='prodotto.html?id=" + p.id + "&colore=" + col.id + "'><img src='" + foto(p, col, "studio") + "' alt='" + p.nome + "'></a>" +
        "<div><h3>" + p.nome + "</h3><p class='sub'>" + col.nome + " · " + euro(p.prezzo) + "</p>" +
        "<div class='quantita'><button type='button' data-i='" + i + "' data-d='-1' aria-label='Meno'>−</button><output>" + r.qta + "</output><button type='button' data-i='" + i + "' data-d='1' aria-label='Più'>+</button></div><br>" +
        "<button type='button' class='rimuovi-riga' data-i='" + i + "'>Rimuovi</button></div>" +
        "<div class='tot'>" + euro(p.prezzo * r.qta) + "</div></div>";
    });
    $("righe-carrello").innerHTML = html;
    var t = calcola(0);
    $("subtotale").textContent = euro(t.sub);
    $("sconto").textContent = "-" + euro(t.sconto);
    $("totale").textContent = euro(t.totale);
    var manca = Math.max(0, SOGLIA_EXPRESS - t.sub);
    $("barra-express").style.width = Math.min(100, t.sub / SOGLIA_EXPRESS * 100) + "%";
    $("testo-express").textContent = manca > 0 ? "Ti mancano " + euro(manca) + " per la spedizione express gratuita" : "Hai la spedizione express gratuita!";
    document.querySelectorAll(".quantita button").forEach(function (b) {
      b.onclick = function () {
        var c2 = leggiCarrello(), i = +b.dataset.i;
        c2[i].qta = Math.max(1, Math.min(20, c2[i].qta + +b.dataset.d));
        salvaCarrello(c2); disegnaCarrello();
      };
    });
    document.querySelectorAll(".rimuovi-riga").forEach(function (b) {
      b.onclick = function () { var c2 = leggiCarrello(); c2.splice(+b.dataset.i, 1); salvaCarrello(c2); disegnaCarrello(); };
    });
  }
  $("svuota").onclick = function () { salvaCarrello([]); disegnaCarrello(); };
  $("applica").onclick = function () {
    if ($("codice").value.trim().toUpperCase() === "CIAO10") {
      scrivi("codice", "CIAO10");
      $("msg-codice").textContent = "Codice applicato: -10%";
    } else {
      $("msg-codice").textContent = "Codice non valido.";
    }
    disegnaCarrello();
  };
  if (codiceAttivo()) { $("codice").value = "CIAO10"; $("msg-codice").textContent = "Codice applicato: -10%"; }
  disegnaCarrello();
}

// ---------- PAGINA CHECKOUT ----------
if ($("modulo")) {
  function costoSpedizione() {                       // leggo quale spedizione e' selezionata
    var scelta = document.querySelector("input[name=spedizione]:checked").value;
    return scelta === "express" && calcola(0).sub < SOGLIA_EXPRESS ? COSTO_EXPRESS : 0;
  }
  function costoExtra() { return $("metodo").value === "contrassegno" ? 2 : 0; }

  function disegnaRiepilogo() {
    var c = leggiCarrello();
    $("vuoto").style.display = c.length === 0 ? "block" : "none";
    $("contenuto").style.display = c.length === 0 ? "none" : "grid";
    var righe = "";
    c.forEach(function (r) {
      var p = trovaProdotto(r.id); if (!p) return;
      righe += "<div class='r'><span>" + p.nome + " (" + trovaColore(p, r.colore).nome + ") × " + r.qta + "</span><b>" + euro(p.prezzo * r.qta) + "</b></div>";
    });
    $("r-righe").innerHTML = righe;
    var t = calcola(costoSpedizione() + costoExtra());
    $("r-sub").textContent = euro(t.sub);
    $("r-sconto").textContent = "-" + euro(t.sconto);
    $("r-sped").textContent = costoSpedizione() === 0 ? "gratis" : euro(costoSpedizione());
    $("r-extra").textContent = costoExtra() === 0 ? "nessun costo" : euro(costoExtra());
    $("r-tot").textContent = euro(t.totale);
    $("prezzo-express").textContent = calcola(0).sub >= SOGLIA_EXPRESS ? "gratis" : euro(COSTO_EXPRESS);
    $("box-carta").style.display = $("metodo").value === "carta" ? "block" : "none";   // campo carta solo se serve
  }
  $("modulo").onchange = disegnaRiepilogo;            // ricalcolo a ogni modifica del modulo

  $("modulo").onsubmit = function (e) {
    e.preventDefault();                               // evito il ricaricamento della pagina
    if ($("metodo").value === "carta" && !/^[0-9]{16}$/.test($("carta").value)) {
      $("errore").textContent = "Il numero della carta deve avere 16 cifre.";
      return;                                         // mi fermo: l'ordine non parte
    }
    var sped = costoSpedizione(), express = document.querySelector("input[name=spedizione]:checked").value === "express";
    var t = calcola(sped + costoExtra());
    var ordine = {                                    // raccolgo tutto in un "oggetto"
      numero: "FV-" + Math.floor(100000 + Math.random() * 900000),
      nome: $("nome").value, email: $("email").value,
      indirizzo: $("indirizzo").value + ", " + $("cap").value + " " + $("citta").value,
      metodo: $("metodo").options[$("metodo").selectedIndex].text,
      quantita: quantitaTotale(), righe: leggiCarrello(), totale: t.totale,
      giorni: express ? "24 ore" : "3 giorni lavorativi"
    };
    scrivi("ordine", ordine);                         // lo salvo per la pagina di conferma
    cancella("carrello");                             // svuoto il carrello
    cancella("codice");
    window.location.href = "conferma.html";           // vado alla pagina successiva
  };
  disegnaRiepilogo();
}

// ---------- PAGINA CONFERMA ----------
if ($("c-num") || $("nessuno")) {
  var o = leggi("ordine", null);
  if (o) {
    $("ok").style.display = "block";
    $("c-nome").textContent = o.nome.split(" ")[0];
    $("c-num").textContent = o.numero;
    var elenco = "";
    (o.righe || []).forEach(function (r) {
      var p = trovaProdotto(r.id); if (p) elenco += "<div class='r'><span>" + p.nome + " (" + trovaColore(p, r.colore).nome + ") × " + r.qta + "</span></div>";
    });
    $("c-righe").innerHTML = elenco;
    $("c-indirizzo").textContent = o.indirizzo;
    $("c-metodo").textContent = o.metodo;
    $("c-tot").textContent = euro(o.totale);
    $("c-email").textContent = o.email;
    $("c-giorni").textContent = o.giorni;
  } else {
    $("nessuno").style.display = "block";
  }
}

// ---------- PAGINA CONTATTI ----------
if ($("form-contatti")) {
  $("form-contatti").onsubmit = function (e) {
    e.preventDefault();
    // apre il programma di posta con il messaggio gia' scritto
    window.location.href = "mailto:peregomathias@gmail.com?subject=Messaggio da " +
      encodeURIComponent($("c-n").value) + "&body=" + encodeURIComponent($("c-m").value);
  };
}
