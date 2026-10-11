// Tiene l'app apribile anche senza campo. A ogni aggiornamento dell'app cambiare VERSIONE.
const VERSIONE = 'spesa-1'
const FILE = ['./', './index.html', './zone.js', './manifest.json', './icona-180.png', './icona-512.png']

self.addEventListener('install', e => { e.waitUntil(caches.open(VERSIONE).then(c => c.addAll(FILE))); self.skipWaiting() })
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== VERSIONE).map(n => caches.delete(n)))).then(() => self.clients.claim()))
})
// prima la copia salvata (subito, anche offline), intanto scarica quella nuova per la prossima apertura
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return
  e.respondWith(caches.open(VERSIONE).then(async c => {
    const salvata = await c.match(e.request, { ignoreSearch: true })
    const rete = fetch(e.request).then(r => { if (r.ok || r.type === 'opaque') c.put(e.request, r.clone()); return r }).catch(() => salvata)
    return salvata || rete
  }))
})
