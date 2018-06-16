let staticCacheName = 'mws-restaurant-v3';

self.addEventListener('install', function(event) {
  	event.waitUntil( // Signal process of install
    	caches.open(staticCacheName) // Pass promise: if/when it resolves, the browser knows install is complete, when it fails, service worker should be discarded
    	.then(function(cache) { // Update cache name
      	return cache.addAll([ // addAll also returns promise, so I return it
			"./",
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

self.addEventListener('fetch', function(event) { // Performs normal browser fetch, so results may come from cache
	var requestUrl = new URL(event.request.url); // Pause request URL

	if (requestUrl.origin === location.origin) { // Check if request origin is same as current origin (we only want to intercept route requests for same origin)
		if (requestUrl.pathname === '/') { // Check pathname - if it's the route, respond with
			event.respondWith( // Search for match in caches for this particular request (if there is nothing, promise = undefined)
			caches.match(event.request)); // The data straight from the cache
			return; // No need to go back to network, as data is cached as part of install step
		};
	}

	event.respondWith( // Tells browser we will handle response to all requests ourselves
    	caches.match(event.request)
    	.then(function(response) { // Match request with what is in cache
      		return response || fetch(event.request);
    	}).then(function(response) { // Response we get back from network
    		if (response.status == 404) { // If response is 404: Not found (page does not exist)
    			return new Response("Whoops, this page does not exist!"); // Respond with this message
    		}
    	})
  	);
});