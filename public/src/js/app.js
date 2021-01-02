// Declaracion de variables globales
let MAIN;
let MODAL_POST;
let BTN_SHOW_POST;
let BTN_CANCEL_POST;
let deferredPrompt;
let TITLE;
let DESCRIPTION;
// let BTN_NOTIFICATIONS;

//Funciones

const showPostalModal = ()=>{
    MAIN.style.display = 'none';
    MODAL_POST.style.display = 'block';
    setTimeout(()=>{
        MODAL_POST.style.transform = 'TranslateY(0)';
    },1);
};

const sendData = async (e) =>{
   try {
       e.preventDefault();
       TITLE = document.querySelector('#title').value;
       DESCRIPTION = document.querySelector('#description').value;
       if(TITLE && DESCRIPTION){
           await db.collection('posts').add({
               title:TITLE,
               description: DESCRIPTION,
               timestamp: firebase.firestore.FieldValue.serverTimestamp()
           });
           const data = {
               message: 'Registro eexitosamente almacenado',
               timeout: 1500
           };
           Message().MaterialSnackbar.showSnackbar(data);
       }else{
           const data = {
               message: 'Faltan campor por llenar',
               timeout: 1500 
           };
           Message('error').MaterialSnackbar.showSnackbar(data);
       }
   } catch (error) {
       const data ={
           message: error.message,
           timeout: 1500
       };
       Message('error').MaterialSnackbar.showSnackbar(data);
   }
};

const closePostalModal = ()=>{
    MAIN.style.display = 'block';
    MODAL_POST.style.transform = 'translateY(100vh)'
}

window.addEventListener('beforeinstallprompt',(e)=>{

    e.preventDefault();
    deferredPrompt = e;
});

//Cuando se cargue todo el DOM
window.addEventListener('load',async ()=>{
    MAIN = document.querySelector('#main');
    MODAL_POST = document.querySelector('#modal-post-section');
    BTN_SHOW_POST = document.querySelector('#btn-upload-post');
    BTN_SHOW_POST.addEventListener('click',showPostalModal);
    BTN_CANCEL_POST = document.querySelector('#btn-post-cancel');
    BTN_CANCEL_POST.addEventListener('click', closePostalModal);

   // await Notification.requestPermission();

    if('serviceWorker' in navigator){
        const response = await navigator.serviceWorker.register('sw.js');
        if(response){
            // console.log('Service Worker registrado');
        //     const ready = await navigator.serviceWorker.ready;
        //     ready.showNotification('Hola Visitante',{
        //         body: 'Este sera un mensaje mas largo',
        //         vibrate: [200,100,200,100,200,100,200,100,200,100,200]
        //     })
        }
    }

    window.Message = (option = 'success', container = document.querySelector('#toast-container')) =>{
        container.classList.remove('success');
        container.classList.remove('error');
        container.classList.add(option);
        return container;
    };

    window.Loading = (option = 'block')  => {
        document.querySelector('#loading').style.display = option;
    };

    const showNotification = () =>{
        // new Notification('Notificaciones exitosamente activadas');
        navigator.serviceWorker.getRegistration()
        .then(Instancia =>{
            Instancia.showNotification('Notificaciones Activadas', {
                body: 'Cuerpo de la Noticiacion',
                icon: 'src/images/computer.jpg',
                image: 'src/images/icons/icon-144x144.png',
                badge: 'src/images/icons/icon-144x144.png',
                dir: 'ltr',
                tag: 'notificacion-postme',
                requireInteraction: 'true',
                vibrate: [1000,50,2000],
                actions: [
                    {action: 'confirm', title: 'Aceptar', icon: 'src/images/icons/icon-144x144.png'},
                    {action: 'cancel', title: 'Cancelar', icon: 'src/images/icons/icon-144x144.png'}
                ]
            });
        })
        .catch(err => console.log(err.message));
    }

    const urlBase64ToUint8Array = (base64String) =>{
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);

        for(var i = 0; i < rawData.length; ++i){
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    const configuracionSubscripcion = () => {
        if (navigator.serviceWorker) {
          let reg;
          navigator.serviceWorker.ready
           .then(sw => {
             reg = sw;
             return sw.pushManager.getSubscription()
           })
           .then(sub => {
             // hemos ejecutado web-push generate-vapid-keys
             var vapidPublicKey = 'BA74k-MUv44qCQ-0RVLwdXQrk-1tsHaPEn_hXwgJ3S7ij1SVQi1xP0a7FysQiDv1pk1TFWvglGcAKkRNwKX8kI0';
             var convertedublicKeyToVapid = urlBase64ToUint8Array(vapidPublicKey);
             return reg.pushManager.subscribe({
               userVisibleOnly: true,  // Que la notificacion entrante sea visible
               applicationServerKey: convertedublicKeyToVapid
             })
           })
           .then(res => {
             const urlRD = '/subscribe';
             return fetch(urlRD, {
               method: 'POST',
               cors: 'no-cors',
               headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json'
               },
               body: JSON.stringify(res)
             })
           })
           .then(() => {})// showNotification())
           .catch(err => console.error(err.message))
        }
      }

    //   --------------------------------------Mensaje-----------------------------------------------------------------------

    // const configuracionSubscripcionn = () => {

        const form = document.querySelector('#myform');
        const message = document.querySelector('#mensaje');
        
        
        form.addEventListener('submit', e => {
            if (navigator.serviceWorker) {
                let reg;
                navigator.serviceWorker.ready
                 .then(sw => {
                   reg = sw;
                   return sw.pushManager.getSubscription()
                 })
                 .then(sub => {
                   // hemos ejecutado web-push generate-vapid-keys
                   var vapidPublicKey = 'BA74k-MUv44qCQ-0RVLwdXQrk-1tsHaPEn_hXwgJ3S7ij1SVQi1xP0a7FysQiDv1pk1TFWvglGcAKkRNwKX8kI0';
                   var convertedublicKeyToVapid = urlBase64ToUint8Array(vapidPublicKey);
                   return reg.pushManager.subscribe({
                     userVisibleOnly: true,  // Que la notificacion entrante sea visible
                     applicationServerKey: convertedublicKeyToVapid
                   })
                 })
                 .then(res => {
                   const urlR = '/message';
                   return fetch(urlR, {
                     method: 'POST',
                     cors: 'no-cors',
                     headers: {
                       'Content-Type': 'application/json',
                       'Accept': 'application/json'
                     },
                     body: JSON.stringify(res)
                   })
                 })
                 .then(() => {})// showNotification())
                 .catch(err => console.error(err.message))
              }
        })
        

    // ---------------------------------------Fin Mensaje--------------------------------------------------------------------

    const requestPermission = async () =>{

        const result = await Notification.requestPermission();
        if(result !== 'granted'){
            const data = {
                message: 'El usuario no activó las notificaciones',
                timeout: 5000
            };
            Message('error').MaterialSnackbar.showSnackbar(data);
        }else{
            configuracionSubscripcion();
            // showNotification();
        }
    };

    //Seccion Notificaciones
    const BTN_NOTIFICATIONS = document.querySelector('#notificactions-install');
          BTN_NOTIFICATIONS.addEventListener('click',requestPermission,false);


         
  



    //Tomando el boton enviar POSt
    const btnPostSubmit = document.querySelector('#btn-post-submit');
    btnPostSubmit.addEventListener('click',(e)=> sendData(e));


    const bannerInstall = document.querySelector('#banner-install');
bannerInstall.addEventListener('click', async ()=>{
    if(deferredPrompt){
        deferredPrompt.prompt();
        const response = await deferredPrompt.userChoice;
        if(response.outcome === 'dismissed'){
            console.log('El usuario canceló la instalación');
        }
    }
});


//IndexDB
    // const request = window.indexedDB.open('mi-base-datos',1);

    // //Observer
    // request.onupgradeneeded = e =>{
    //     let db = e.target.result;
    //     db.createObjectStore('cursos',{
    //         keyPath: 'id'
    //     });
    // };

    // //Errores

    // request.onerror = (e) =>{
    //     console.log(e);
    // };

    // //Success
    // request.onsuccess = (e) =>{
    //     //Agregar
    //     let db = e.target.result;

    //     const cursosData = [
    //         {
    //         id: 1,
    //         curso:"Mi primnera PWA",
    //         descripcion: 'Este sera un curso para aprender'
    //     },
    //         {
    //             id: 2,
    //             curso:"Mi primnera App",
    //             descripcion: 'Este sera un curso para aprender 2'
    //         },
    //         {
    //             id: 3,
    //             curso:"Mi primnera App React",
    //             descripcion: 'Este sera un curso para aprender 3'
    //         }
    //     ]

    //     let cursosTransaccion = db.transaction('cursos','readwrite');
    //     //Cuando ucurre un error en la transaciion
    //     cursosTransaccion.onerror = (e) =>{
    //         console.log('IDB', e.target.error);
    //     }

    //     //Informa sobre el exito de la transaccion
    //     cursosTransaccion.oncomplete = (e) =>{
    //         console.log('IDB', e);
    //     }

    //     let cursosStore = cursosTransaccion.objectStore('cursos');

    //     for( let curso of cursosData){
    //         cursosStore.add(curso);
    //     }

    //       //Informa sobre el exito de la transaccion
    //       cursosTransaccion.onsuccess = (e) =>{
    //         console.log('Nuevo curso agregado al IDb');
    //     }

    // }

});





