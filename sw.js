// self.addEventListener('install',(e)=>{
//     console.log('SW install...');
// });
// self.addEventListener('activate',async(e)=>{
//     console.log('SW Activate....');
// });
// self.addEventListener('fetch',(e)=>{
//     console.log('SW Fetch....');
// })

const CACHE_NAME_CORE = 'cache-v1';
const CACHE_FILES_CORE = [
    'src/images/icons/icon-144x144.png',
    'src/css/app.css',
    "src/images/computer.jpg",
    'src/js/app.js',
    'src/js/firebase.js',
    'src/js/db.js',
    'index.html',
    'post.html',
    '/'
];

const CACHE_NAME_INMUTABLE = 'inmutable-v1';
const CACHE_FILES_INMUTABLE = [
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://code.getmdl.io/1.3.0/material.amber-blue.min.css',
    'https://code.getmdl.io/1.3.0/material.min.js',
    'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2',
    "https://fonts.gstatic.com/s/materialicons/v70/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
    'https://unpkg.com/pwacompat'

];

const CACHE_NAME_DYNAMIC = 'Dynamic-v1';
const CACHE_FILES_DYNAMIC = [];

self.addEventListener('install',(e)=>{
    const guardandoCache = caches.open(CACHE_NAME_CORE)
    .then(cache =>  cache.addAll(CACHE_FILES_CORE))
    .catch(err => console.log(err.message));

    const guardandoCacheInmutable = caches.open(CACHE_NAME_INMUTABLE)
    .then(cache =>  cache.addAll(CACHE_FILES_INMUTABLE))
    .catch(err => console.log(err.message));

    self.skipWaiting();
    e.waitUntil(Promise.all([guardandoCache, guardandoCacheInmutable]));
});


self.addEventListener('activate',(e)=>{
    //Eliminando caches obsoletos
    const obtenercaches = caches.keys() // ['cache-v1','inmutable-v1','Dynamic-v1']
    .then(allCaches => allCaches.filter(cache => ![CACHE_NAME_CORE,CACHE_NAME_INMUTABLE,CACHE_NAME_DYNAMIC].includes(cache)).filter(cacheName => caches.delete(cacheName)))
    .catch(err => console.error(err.message))
    console.log('SW Cache limpiado exitosamente');
    e.waitUntil(obtenercaches);
    //La documentacion nos indican eliminar CACHES anteriores
    console.log('SW: Archivos exitosamente guardados...');
    // e.waitUntil(clients.claim());
});


self.addEventListener('fetch',(e)=>{

        if(!(e.request.url.indexOf('http') === 0)){
            return;
        }

        if(e.request.url.includes('firestore.googleapis.com')){
            return;
        }


        //tercera estartegia : cache pidiendo ayuda a la red
        const cacheAyudaRed = caches.match(e.request)
        .then(page => page || fetch(e.request)
        .then(eventRequest =>{
            // 
            return caches.open(CACHE_NAME_DYNAMIC).then(cache =>{
                if(![].concat(CACHE_FILES_CORE, CACHE_FILES_INMUTABLE).indexOf(e.request.url) || eventRequest.type === 'opaque' ){
                    cache.put(e.request, eventRequest.clone());
                }
                return eventRequest;
            })
        }))
        e.respondWith(cacheAyudaRed);
});

self.addEventListener('sync',(e)=>{
    console.log('------------------------');
    console.log(e); 
    console.log('------------------------');
})

self.addEventListener('push',(e)=>{
    console.log(e);
})

self.addEventListener('notificationclick', (e)=>{
    const notification = e.notification;
    const action = e.action;
    console.log(action);
    if(action === 'confirm'){
        //Cualquier accion
        notification.close();
    }else{
        notification.close();
    }
})


self.addEventListener('notificationclose', (e)=>{
  console.log('Se cerro y no haremos nada');
})