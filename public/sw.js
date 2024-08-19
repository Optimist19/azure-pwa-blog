// // console.warn('ws file in public folder')

// let cacheData = "appV1";

// this.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(cacheData).then((cache) => {
//       cache.addAll([
//         "/static/js/bundle.js",
//         "/manifest.json",
//         "/favicon.ico",
//         "/logo192.png",
//         "/index.html",
//         "/",
//         "/users", // Cache the About route
//         "/about", // Cache the About route
//         "/static/media/logo512.png" // Cache the logo image
//       ]);
//     })
//   );
// });

// this.addEventListener("fetch", (event) => {
//   if (!navigator.onLine) {
//     event.respondWith(
//       caches.match(event.request).then((resp) => {
//         if (resp) {
//           return resp;
//         }
//         let requestUrl = event.request.clone()
//         fetch(requestUrl)
//       })
//     );
//   }
// });


// The code below helps to cache data from the backend while the one above does not toHaveTextContent, I only use local storage for it in the user Component. The one below is the best

const cacheData = "appDataV1"; // Name your cache

// Install event - cache static assets and initial data if needed
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheData).then(cache => {
      return cache.addAll([
        // Add your static files here
        '/',
        '/index.html',
        '/static/js/bundle.js',
        '/manifest.json',
        '/favicon.ico',
        // You can add more initial assets if needed
      ]);
    })
  );
});

// Fetch event - intercept network requests
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Cache API responses
  if (url.origin === location.origin && url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(cacheData).then(cache => {
        return cache.match(event.request).then(response => {
          // Return cached response if available, otherwise fetch from network
          return response || fetch(event.request).then(networkResponse => {
            // Cache the new response for future requests
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  } else {
    // Handle other requests normally or cache them as needed
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});


//Tomide's code that works for data cache from an api

// let cacheData = 'appV1';
 
// this.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open(cacheData).then((cache) => {
//             cache.addAll([
//                 '/static/js/main.chunk.js',
//                 '/static/js/0.chunk.js',
//                 '/static/js/bundle.js',
//                 'index.html',
//                 '/',
//                 '/mainpage',
//                 '/login',
//                 '/post'
//             ]);
//         })
//     );
// });
 
// this.addEventListener('fetch', (event) => {
//     const url = [
//         'https://jsonplaceholder.typicode.com/users',
//         'https://jsonplaceholder.typicode.com/posts',
//         'https://jsonplaceholder.typicode.com/comments',
//         'https://jsonplaceholder.typicode.com/albums',
//     ]
//     if (url.some(url => event.request.url.includes(url))) {
//         //actually check if the some of the api in url are present
//         event.respondWith(
//             caches.open(cacheData).then(async (cache) => {
//                 try {
//                     const response = await fetch(event.request);
//                     cache.put(event.request, response.clone());
//                     return response;
//                 } catch {
//                     return await caches.match(event.request);
//                 }
//             })
//         );
//     } else if (!navigator.onLine) {
//         // Handle other requests (like static assets) when offline
//         event.respondWith(
//             caches.match(event.request).then((response) => {
//                 if (response) {
//                     return response;
//                 }
//                 return fetch(event.request); // Fallback to network if not found in cache
//             })
//         );
//     }
// });