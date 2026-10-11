// Zone del supermercato nell'ordine del giro (dall'entrata all'uscita) e dizionario per smistare i prodotti.
// Per aggiungere una parola: scriverla nella riga della zona, separata da virgola. Vince la parola più lunga trovata.
const ZONE = [
  { nome: 'Frutta e verdura', sotto: 'semi e frutta a guscio', ic: 'frutta' },
  { nome: 'Pane e pasticceria', ic: 'pane' },
  { nome: 'Rosticceria e affettati', ic: 'affettati' },
  { nome: 'Reparto fresco', ic: 'fresco' },
  { nome: 'Banco pesce', ic: 'pesce' },
  { nome: 'Banco carne', ic: 'carne' },
  { nome: 'Cereali e cracker', sotto: 'pane confezionato', ic: 'cracker' },
  { nome: 'Latte fuori frigo', ic: 'latte' },
  { nome: 'Colazione', sotto: 'fette biscottate, marmellate, miele', ic: 'vasetto' },
  { nome: 'Biologico', sotto: 'confezionato', ic: 'bio' },
  { nome: 'Caffè', ic: 'caffe' },
  { nome: 'Biscotti e dolci secchi', ic: 'biscotto' },
  { nome: 'Dolci e merendine', ic: 'merendina' },
  { nome: 'Riso e farine', ic: 'farina' },
  { nome: 'Pasta', ic: 'pasta' },
  { nome: 'Sale e passate', ic: 'pomodoro' },
  { nome: 'Legumi in scatola e salse', sotto: 'maionese, ketchup', ic: 'lattina' },
  { nome: 'Olio', ic: 'olio' },
  { nome: "Sott'olio e tonno", ic: 'tonno' },
  { nome: 'Patatine e alcolici', ic: 'vino' },
  { nome: 'Bibite e acqua', ic: 'acqua' },
  { nome: 'Casa, detersivi, farmacia', ic: 'casa' },
  { nome: 'Surgelati', ic: 'surgelati' }
]

const PAROLE = [
  /* 0 frutta e verdura */ `frutta, verdura, mela, pera, banana, arancia, mandarino, clementina, limone, lime, pompelmo, kiwi, uva, fragola, ciliegia,
    pesca, nettarina, albicocca, susina, prugna, ananas, mango, papaya, avocado, melone, anguria, cocomero, frutti di bosco, mirtillo, lampone, mora,
    cachi, kaki, fico, melograno, insalata, lattuga, rucola, valeriana, songino, misticanza, spinaci, bietola, bieta, cavolo, cavolfiore, broccolo,
    broccoli, verza, cappuccio, cavolini, zucchina, zucchine, zucca, melanzana, peperone, pomodoro, pomodorino, pomodori ciliegini, ciliegino, datterini,
    cetriolo, carota, sedano, finocchio, cipolla, cipollotto, scalogno, aglio, porro, patata, patate dolci, funghi, champignon, asparago, carciofo,
    fagiolini, taccole, radicchio, indivia, scarola, cicoria, rapa, ravanello, barbabietola, zenzero, prezzemolo, basilico, rosmarino, salvia, menta,
    timo, erba cipollina, erbe aromatiche, noce, noci, nocciole, mandorle, pistacchi, anacardi, arachidi, noccioline, semi, semi di zucca,
    semi di girasole, semi di chia, semi di lino, semi di sesamo, frutta secca, frutta a guscio, uvetta, datteri, prugne secche, albicocche secche,
    fichi secchi, castagne, germogli, cocco, melagrana`,
  /* 1 pane e pasticceria */ `pane, pane fresco, pagnotta, panino, baguette, ciabatta, rosetta, michetta, filone, pane integrale, pane di segale,
    pane ai cereali, focaccia, pizza bianca, brioche, cornetto, croissant, torta, crostata, pasticcini, bigne, krapfen, strudel, pasticceria, treccia`,
  /* 2 rosticceria e affettati */ `prosciutto, prosciutto crudo, prosciutto cotto, speck, salame, salamino, mortadella, bresaola, coppa, pancetta,
    lardo, porchetta, fesa di tacchino, affettato, affettati, carne salada, rosticceria, pollo arrosto, girarrosto, lasagne pronte, piatti pronti,
    arancini, suppli, olive ascolane, tramezzini, formaggio al taglio, insalata di riso, insalata russa, cotoletta pronta`,
  /* 3 reparto fresco */ `latte fresco, yogurt, yogurt greco, burro, panna fresca, mozzarella, burrata, stracchino, crescenza, ricotta, mascarpone,
    formaggio, formaggi, parmigiano, parmigiano reggiano, grana, grana padano, gorgonzola, fontina, asiago, emmental, provola, scamorza,
    philadelphia, formaggio spalmabile, sottilette, feta, pecorino, taleggio, puzzone, trentingrana, uova, uovo, pasta fresca, tortellini, ravioli,
    cappelletti, gnocchi, pasta sfoglia, pasta frolla, pasta brise, pasta per pizza, wurstel, pesto fresco, hummus, tofu, seitan, kefir, skyr,
    actimel, lievito di birra, spremuta, budino fresco, salmone affumicato, insalata in busta`,
  /* 4 pesce */ `pesce, salmone, tonno fresco, orata, branzino, spigola, merluzzo, baccala, gamberi, gamberetti, mazzancolle, cozze, vongole,
    calamari, seppie, polpo, pesce spada, trota, sogliola, platessa, alici fresche, filetti di pesce, salmerino, coregone`,
  /* 5 carne */ `carne, manzo, vitello, maiale, pollo, petto di pollo, cosce di pollo, fusi di pollo, ali di pollo, tacchino, petto di tacchino,
    agnello, coniglio, macinato, carne macinata, hamburger, salsiccia, luganega, bistecca, fettine, scaloppine, spezzatino, arrosto, costine,
    braciole, filetto, lonza, polpette, cotoletta, cotolette, involtini, tagliata, sovracoscia, ossobuco`,
  /* 6 cereali e cracker */ `cracker, crackers, grissini, pancarre, pan carre, pane in cassetta, pan bauletto, piadina, piadine, tortillas, gallette,
    gallette di riso, taralli, cereali, corn flakes, muesli, fiocchi d avena, avena, granola, crostini, friselle, pane per hamburger, wasa,
    pane azzimo, schiacciatine, pane confezionato`,
  /* 7 latte fuori frigo */ `latte, latte uht, latte a lunga conservazione, latte intero, latte parzialmente scremato, latte scremato,
    latte senza lattosio, latte di soia, latte di mandorla, latte di avena, latte di riso, bevanda di soia, bevanda vegetale, panna da cucina, panna`,
  /* 8 colazione */ `fette biscottate, marmellata, confettura, miele, nutella, crema spalmabile, crema di nocciole, burro di arachidi, cacao,
    sciroppo d acero, colazione`,
  /* 9 biologico */ `biologico, biologici, bio, senza glutine, gluten free, prodotti bio`,
  /* 10 caffè */ `caffe, caffe macinato, caffe in grani, capsule, cialde, lavazza, orzo, ginseng, te, the, tisana, tisane, camomilla, infuso,
    decaffeinato, caffe solubile`,
  /* 11 biscotti */ `biscotti, biscotto, frollini, wafer, savoiardi, pavesini, amaretti, cantucci, mulino bianco, oro saiwa, digestive, gocciole,
    pan di stelle, macine, abbracci, tarallucci, galletti, baiocchi, ringo, oreo`,
  /* 12 dolci e merendine */ `merendine, merendina, cioccolato, cioccolata, cioccolatini, tavoletta di cioccolato, ovetti, kinder, barrette,
    plumcake, crostatine, saccottini, brioche confezionate, budino, budini, caramelle, gomme da masticare, chewing gum, torrone, pandoro,
    panettone, colomba, gelatine, cornetti confezionati, snack dolci, dolci`,
  /* 13 riso e farine */ `riso, riso basmati, riso carnaroli, riso arborio, farina, farina 00, farina integrale, fecola, amido, lievito,
    lievito per dolci, zucchero, zucchero di canna, polenta, couscous, cous cous, orzo perlato, farro, quinoa, legumi secchi, lenticchie secche,
    pangrattato, pane grattugiato, semola, preparato per torte, bulgur, miglio, zucchero a velo, vanillina`,
  /* 14 pasta */ `pasta, spaghetti, spaghettini, penne, pennette, fusilli, rigatoni, maccheroni, farfalle, linguine, tagliatelle, lasagne,
    mezze maniche, orecchiette, trofie, paccheri, bucatini, ditalini, pastina, vermicelli, conchiglie, sedanini, tortiglioni, barilla,
    pasta integrale, pasta all uovo, noodles, fettuccine, pappardelle, gnocchetti, stelline, tempestine`,
  /* 15 sale e passate */ `sale, sale grosso, sale fino, passata, passata di pomodoro, pelati, pomodori pelati, polpa di pomodoro, polpa,
    concentrato di pomodoro, sugo, sugo pronto, ragu, pesto, spezie, pepe, origano, paprika, curry, noce moscata, cannella, dado, brodo,
    aceto, aceto balsamico, peperoncino, zafferano`,
  /* 16 legumi in scatola e salse */ `fagioli, fagioli borlotti, cannellini, ceci, lenticchie, piselli, mais, legumi, maionese, ketchup, senape,
    salsa, salse, salsa barbecue, salsa tonnata, salsa di soia, salsa rosa, fagioli in scatola`,
  /* 17 olio */ `olio, olio extravergine, olio evo, olio di oliva, olio d oliva, olio di semi, olio di girasole, olio di arachidi`,
  /* 18 sott'olio e tonno */ `tonno, tonno in scatola, rio mare, sgombro, sardine, acciughe, alici sott olio, sottoli, sott olio, sottaceti,
    olive, capperi, carciofini, funghi sott olio, giardiniera, cetriolini, salmone in scatola, carne in scatola, simmenthal, pomodori secchi`,
  /* 19 patatine e alcolici */ `patatine, chips, pringles, salatini, popcorn, vino, vino rosso, vino bianco, prosecco, spumante, champagne,
    trentodoc, birra, aperol, campari, spritz, liquore, grappa, amaro, gin, vodka, rum, whisky, aperitivo, ferrari`,
  /* 20 bibite e acqua */ `acqua, acqua frizzante, acqua naturale, bibite, bibita, coca cola, coca, cola, aranciata, sprite, fanta, chinotto,
    te freddo, the freddo, estathe, succo, succhi, succo di frutta, gassosa, red bull, energy drink, gatorade, crodino, sanbitter, tonica,
    acqua tonica, lemon soda, schweppes, pepsi, san pellegrino, levissima`,
  /* 21 casa, detersivi, farmacia */ `detersivo, detersivi, detersivo piatti, detersivo lavatrice, svelto, pastiglie lavastoviglie, lavastoviglie,
    ammorbidente, candeggina, ace, sgrassatore, anticalcare, spugne, spugnette, carta igienica, scottex, carta da cucina, carta cucina, rotoloni,
    tovaglioli, fazzoletti, sacchetti, sacchi spazzatura, sacchetti immondizia, sacchetti freezer, pellicola, alluminio, carta forno,
    carta da forno, shampoo, balsamo, bagnoschiuma, docciaschiuma, sapone, sapone mani, dentifricio, spazzolino, collutorio, filo interdentale,
    deodorante, cotton fioc, assorbenti, pannolini, salviette, salviettine, cerotti, rasoi, lamette, schiuma da barba, crema, crema solare,
    lampadine, pile, batterie, insetticida, zanzariere, dash, dixan, finish, swiffer, vileda, guanti, acqua ossigenata, alcool, disinfettante,
    amuchina, lettiera, crocchette, cibo per gatti, cibo per cani, farmacia, tachipirina, moment, vetril, mocio, scopa, accendino, fiammiferi,
    acqua demineralizzata, sale per lavastoviglie, brillantante`,
  /* 22 surgelati */ `surgelati, surgelato, surgelata, surgelate, gelato, gelati, ghiaccioli, ghiaccio, cubetti di ghiaccio, bastoncini,
    bastoncini di pesce, findus, pizza, pizze, pizza surgelata, minestrone, sofficini, quattro salti in padella, verdure surgelate`
]

function normalizza(t) {
  return String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[’'`´]/g, ' ').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim()
}

// "mela" trova anche "mele", "pomodoro" anche "pomodori", "salsiccia" anche "salsicce": l'ultima vocale delle parole lunghe è libera
function radice(p) {
  return p.split(' ').map(w => /[cg]ia$/.test(w) ? w.slice(0, -2) + 'i?[aeiou]'
    : w.length > 3 && /[aeiou]$/.test(w) ? w.slice(0, -1) + '[aeiou]' : w + 's?').join(' ')
}

const VOCI = []
PAROLE.forEach((riga, z) => riga.split(',').map(s => normalizza(s)).filter(Boolean).forEach(p =>
  VOCI.push({ z, lung: p.length, re: new RegExp('(^| )' + radice(p) + '( |$)') })))
VOCI.sort((a, b) => b.lung - a.lung)

// memoria: { "testo normalizzato": indice zona } con le correzioni fatte a mano
function trovaZona(testo, memoria) {
  const n = normalizza(testo)
  if (memoria && n in memoria) return memoria[n]
  if (/(^| )(surgel|congel)/.test(n)) return 22
  for (const v of VOCI) if (v.re.test(n)) return v.z
  return -1
}

if (typeof module !== 'undefined') module.exports = { ZONE, trovaZona, normalizza }
