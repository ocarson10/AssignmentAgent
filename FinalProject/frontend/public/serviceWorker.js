function log(...data) {
    console.log("SWv1.1", ...data);
  }
  
  log("SW Script executing - adding event listeners");
  
  
  const STATIC_CACHE_NAME = 'assignmentAgent-static-v1';
  
  self.addEventListener('install', (event) => {
     log('install', event);
    event.waitUntil(
      caches.open(STATIC_CACHE_NAME).then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/offline',
          '/tracker',
          '/classlist',
          '/calendar',
          // //CSS
          // 'static/css/App.css',
          // 'static/css/ClassList.css',
          // 'static/css/GPA.css',
          // 'static/css/index.css',
          // // '/css/offline.css',
          // 'static/css/login.css',
          // 'static/css/Tracker.css',
          // //Images
            // 'static/images/logo.svg',
          'static/media/assignment-agent-logo.72d1178b96d076fccd85.png',
          'static/media/offline.c08ecc54d6be2622f87d.png'
          // //Scripts
          // 'static/APIClient.js',
          // 'static/ClassList.js',
          // 'static/login.js',
          // 'static/HTTPClient.js',
          // 'static/Trakcker.js'
          
        ])
            .then(() => self.skipWaiting);
      })
    );
  });
  
  self.addEventListener('activate', event => {
    log('activate', event);
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            return cacheName.startsWith('assignmentAgent-') && cacheName !== STATIC_CACHE_NAME;
          }).map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });
  
  
  self.addEventListener('fetch', event => {
  var requestUrl = new URL(event.request.url);
  //Treat API calls (to our API) differently
  if(requestUrl.origin === location.origin && requestUrl.pathname.startsWith('/api')) {
    //If we are here, we are intercepting a call to our API
    if(event.request.method === "GET") {
      //Only intercept (and cache) GET API requests
      event.respondWith(
        networkFirst(event.request)
      );
    } else {
      event.respondWith(handleRequest(event.request));
    }
  }
  else {
    //If we are here, this was not a call to our API
    event.respondWith(
      networkFirst(event.request)
    );
  }

});
  
async function handleRequest(request) {
  try {
    // Try to fetch the request
    const response = await fetch(request);
    return response;
  } catch (error) {
    // If there's a network error, respond with a custom JSON response
    return new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

  // function cacheFirst(request) {
  //   return caches.match(request)
  //   .then(response => {
  //     //Return a response if we have one cached. Otherwise, get from the network
  //     return response || fetchAndCache(request);
  //   })
  //   .catch(error => {
  //     return new Response(JSON.stringify({ error: 'Offline' }), {
  //       status: 503,
  //       headers: { 'Content-Type': 'application/json' }
  //     });
  //   })
  // }

  function networkFirst(request) {
    return fetchAndCache(request)
    .catch(error => {
      //If we get an error, try to return from cache
      return caches.match(request);
    })
    .catch(error => {
      return caches.match('/offline');
    })
  }
  
  function fetchAndCache(request) {
    return fetch(request).then(response => {
      var requestUrl = new URL(request.url);
      //Cache successful GET requests that are not browser extensions
      if(response.ok && !requestUrl.protocol.startsWith('chrome-extension')) {
        caches.open(STATIC_CACHE_NAME).then((cache) => {
          cache.put(request, response);
        });
      }
      return response.clone();
    })
  
  }
  
  
  
  self.addEventListener('message', event => {
    log('message', event.data);
    if(event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
  });
  
  