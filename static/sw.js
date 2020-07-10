this.addEventListener('install', function (event) {
  console.log('Service Worker install');
});

self.addEventListener('activate', function(event) {
  console.log("Activated?")
});