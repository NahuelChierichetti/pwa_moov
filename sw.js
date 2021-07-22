var cacheN = 'cacheMoov';

self.addEventListener('activate', function(event){
    //console.log('El ServiceWorker se activo nuevamente en: ', event);
});

self.addEventListener('install', function(event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(cacheN)
        .then(function(cache){
            cache.addAll(
                ['css/estilos.css',
                'index.html',
                'img/banner.png',
                'img/online.jpg',
                'img/mood.jpg',
                'img/logo.png',
                'js/script.js?v=4'
                ]
            )
        })
    );
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                if (response) 
                {
                    console.log('está en cache');
                    return response;
                }
                console.log('no está en cache');

                var requestToCache = event.request.clone();
                return fetch(requestToCache)
                    .then(function(response) {
                        if(!response || response.status !== 200) { 
                            return response;
                        }
                        var responseToCache = response.clone();
                        caches.open(cacheN)
                            .then(function(cache){
                                console.log('Se agregó a cache');
                                cache.put(requestToCache, responseToCache);
                            });
                        return response;
                    });
    }));
});

self.addEventListener('push', function(evento){
    var title = "¡Semana de DESCUENTOS!";
    options = {
        body: "Click para disfrutar de los descuentos",
        icon: "img/banner.png",
        vibrate: [200, 100, 200],
        data: {id: 1},
        actions: [{'action': 'ok', 'title': 'Quiero los descuentos', 'icon': 'img/logo.png'},
                {'action': 'no', 'title': 'No estoy interesado', 'icon': 'img/logo.png'}]
    }
    evento.waitUntil(self.registration.showNotification(title,options))
})

self.addEventListener("notificationclick", function(event){
    console.log(event);
    if(event.action === "ok"){
      console.log("Quiero los descuentos")
      clients.openWindow('http://localhost/awp-parcial2/productos.html')
    } else if (event.action === "no"){
      console.log("No estoy interesado")
    }
    event.notification.close();
})