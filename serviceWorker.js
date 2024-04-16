const gameConsole = "game-console"
const assets = [
    "/",
    "/app.js",
    "/index.html",
    "/styles.css",
    "/program.js",
    "ProGFX/rendering.js"
]

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(gameConsole).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request)
        })
    )
})