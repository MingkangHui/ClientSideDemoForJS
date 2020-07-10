//service worker has a pretty strange lifecycle, still finding way to deal with frequent installation



self.addEventListener('install', function(event) {
  event.waitUntil(console.log("installed"))
});

self.addEventListener('activate', function(event) {
  console.log("Activated?")
});