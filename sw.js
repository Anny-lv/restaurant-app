/*Examples from Udacity FEND training materials and
/*https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker
/* used for writing this code */

/*static cache name*/
var staticCacheName = 'rr-static-v1';

self.addEventListener('install', event => {
/* Array with catche files*/
const cacheFiles = [
  '/',
  'index.html',
  'restaurant.html',
  'css/styles.css',
  'js/main.js', 
  'js/dbhelper.js',
  'js/restaurant_info.js',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg'
];

/* add cache files  */ 
  event.waitUntil(
  caches.open(staticCacheName).then( cache => {
      return cache.addAll(cacheFiles);
  }).catch( err => console.log('Unable to create cache', err))
  );
});

 // intercept requests for files from the network and respond with the files from the cache 
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {return response;}
      {return fetch(event.request);}
    })
  );
});
