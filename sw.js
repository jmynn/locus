const staticCacheName = 'c-app-v1'
const dynamicCacheName = 'd-app-v1'

const assetURLs = [
    '/index.html',
    '/css/style/css',
    '/scripts/script.js',
    '/scripts/ibg.js'
]


self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName)
    await cache.addAll(assetURLs)
  })
self.addEventListener('activate', async e =>{
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.filter(name => name !== staticCacheName && name !== dynamicCacheName).map(name => caches.delete(name)))
})
self.addEventListener('fetch', async e => {
    const { request } = e
    const url = new URL(request.url)
    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(request))
    } else {
        e.respondWith(networkFirst(request))
    }
})

async function cacheFirst(request){
    const cached = await caches.match(request)
    return cached ?? await fetch(request)
}
async function networkFirst(request){
    const cache = await caches.open(dynamicCacheName)
    try {
        const response = await fetch(request)
        await cache.put(request, response.clone())
        return response
    } catch (e) {
        const cached = await cache.match(request)
        return cached ?? await caches.match('/index.html')
    }
}