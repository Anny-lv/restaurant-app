/*Examples from Udacity FEND training materials and
/*https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker
/* used for writing this code */

/*static cache name*/
var staticCacheName = 'rr-static-v1';

/* Array with catche files*/
const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/main.js', 
  '/js/dbhelper.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

self.addEventListener('install', event => {
// add cache files  //
  event.waitUntil(
  	caches.open(staticCacheName).then( cache => {
      	return cache.addAll(cacheFiles);
  		}).catch( err => console.log('Unable to create cache', err))
  	);
});


//Activte cache and delete previous cache //
self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then( cacheNames => {
		return Promise.all(
			cacheNames.filter( cacheName => {
			//checks the cache name//
			return cacheName.startsWith('rr-') &&
				cacheName != staticCacheName;
				}).map( cacheName => {
					return caches.delete( cacheName );
				})
			);
		})
	);
});


 // intercept requests for files from the network and respond with the files from the cache //
self.addEventListener('fetch', event => {
	event.respondWith(
		//open new dynamic cache//
		caches.open('rr-dynamic').then( cache => {
			return caches.match(event.request).then( response => {
				return response || fetch(event.request).then( response => {
				cache.put(event.request, response.clone());
					return response;
				});
			});
		})
	);
});
