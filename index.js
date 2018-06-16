let staticCacheName = 'mws-restaurant-v10';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) { // Update cache name
      return cache.addAll([
			"./", // /skeleton?
			"./indexController.js",
			"index.html",
			"restaurant.html",
			"css/styles.css",
			"css/responsive.css",
			"data/restaurants.json",
			"js/dbhelper.js",
			"js/main.js",
			"js/restaurant_info.js",
			"img/1.jpg",
			"img/2.jpg",
			"img/3.jpg",
			"img/4.jpg",
			"img/5.jpg",
			"img/6.jpg",
			"img/7.jpg",
			"img/8.jpg",
			"img/9.jpg",
			"img/10.jpg"
		]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil( // Wait with activation until all old caches are deleted
    caches.keys().then(function(cacheNames) { // .keys() gives us promise with all cache names
        return Promise.all( // Wrap in Promise.all() so we wait on completion of all those promises
            cacheNames.filter(function(cacheName) {
                return cacheName.startsWith('mws-') && // Only interested in caches that start with mws- (optional, so we don't delete caches from other apps)
                cacheName != staticCacheName; // And not in the cache we defined earlier
            }).map(function(cacheName) { // Map them and delete them
                return caches.delete(cacheName);
            })
        );
    })
  );
});

self.addEventListener('fetch', function(event) {
	var requestUrl = new URL(event.request.url);

	if (requestUrl.origin === location.origin) {
		if (requestUrl.pathname === '/') {
			event.respondWith(caches.match(event.request));
			return;
		};
	}
	event.respondWith(
    	caches.match(event.request).then(function(response) {
      		return response || fetch(event.request);
    	})
  	);
});
