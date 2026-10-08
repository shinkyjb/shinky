// Service worker minimal: hanya agar aplikasi bisa diinstal. Tidak menyimpan cache,
// jadi stok selalu yang terbaru dari server.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).catch(function () {
    return new Response('Tidak ada koneksi internet. Coba lagi.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }));
});
