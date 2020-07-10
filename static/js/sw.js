//service worker has a pretty strange lifecycle, still finding way to deal with frequent installation, later we need to
//change some of the functions to promise to fit the service worker.


//Another big trouble is that I still don't really whether this works, I successed for once(successfully call the register
// but didn't receive install or activate), but after unregistering it, it NEVER SHOW UP AGAIN.


self.addEventListener('install', function(event) {
  event.waitUntil(console.log("installed"))
});

self.addEventListener('activate', function(event) {
  console.log("Activated?")
});