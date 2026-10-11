// Tiene l'app apribile anche senza campo. A ogni aggiornamento dell'app cambiare VERSIONE (e VERSIONE_APP in index.html).
const VERSIONE = 'spesa-5'
const FILE = ['./', './index.html', './zone.js', './manifest.json', './icona-180.png', './icona-512.png']

// cache:'reload' scavalca la memoria del browser: GitHub Pages la fa durare 10 minuti (max-age=600) e ridava i file vecchi
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSIONE).then(c => c.addAll(FILE.map(f => new Request(f, { cache: 'reload' })))))
  self.skipWaiting()
})
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== VERSIONE).map(n => caches.delete(n)))).then(() => self.clients.claim()))
})
// prima la copia salvata (subito, anche offline), intanto chiede a GitHub quella nuova per la prossima apertura
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return
  const stessoSito = new URL(e.request.url).origin === location.origin
  e.respondWith(caches.open(VERSIONE).then(async c => {
    const salvata = await c.match(e.request, { ignoreSearch: true })
    const rete = fetch(e.request, stessoSito ? { cache: 'no-cache' } : undefined)
      .then(r => { if (r.ok || r.type === 'opaque') c.put(e.request, r.clone()); return r }).catch(() => salvata)
    return salvata || rete
  }))
})
