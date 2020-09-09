const staticDevCoffee = "dev-coffee-site-v1";
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/App.js",
  "/images/undraw_loading_frh4.png",
  "/images/Spinner-1s-200px.svg",
  "/images/undraw_to_do_list_a49b.png",
  "/images/undraw_to_do_list_a49b.svg",
  "/images/noun_todo list_3148616.png",
  "/images/favicon/android-chrome-192x192.png",
  "./images/icons8-microphone-48.png",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
