importScripts("sw.js")

self.addEventListener('message', function (e) {
  self.postMessage('You said: ' + e.data);
  console.log(e.data);
}, false);