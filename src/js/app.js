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
                vibrate: [100,50,200,50,100,200],
                actions: [
                    {action: 'confirm', title: 'Aceptar', icon: 'src/images/icons/icon-144x144.png'},
                    {action: 'cancel', title: 'Cancelar', icon: 'src/images/icons/icon-144x144.png'}
                ]
            });
        })
        .catch(err => console.log(err.message));
    }

    const requestPermission = async () =>{

        const result = await Notification.requestPermission();
        if(result !== 'granted'){
            const data = {
                message: 'El usuario no activó las notificaciones',
                timeout: 5000
            };
            Message('error').MaterialSnackbar.showSnackbar(data);
        }else{
            // configuracionSubscripcion();
            showNotification();
        }
    };

    //Seccion Notificaciones
    const BTN_NOTIFICATIONS = document.querySelector('#notificactions-install');
          BTN_NOTIFICATIONS.addEventListener('click',requestPermission,false)
  



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





