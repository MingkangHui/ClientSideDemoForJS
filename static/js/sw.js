//service worker has a pretty strange lifecycle, still finding way to deal with frequent installation, later we need to
//change some of the functions to promise to fit the service worker.



self.addEventListener('install', function(event) {
  event.waitUntil(console.log("installed"))
});

self.addEventListener('activate', function(event) {
  console.log("Activated?")
});