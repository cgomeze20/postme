// Declaracion de variables globales
let MAIN;
let MODAL_POST;
let BTN_SHOW_POST;
let BTN_CANCEL_POST;
let deferredPrompt;

//Funciones

const showPostalModal = ()=>{
    MAIN.style.display = 'none';
    MODAL_POST.style.display = 'block';
    setTimeout(()=>{
        MODAL_POST.style.transform = 'TranslateY(0)';
    },1);
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

    if('serviceWorker' in navigator){
        const response = await navigator.serviceWorker.register('sw.js');
        if(response){
            console.log('Service Worker registrado');
        }
    }
});


const bannerInstall = document.querySelector('#banner-install');
bannerInstall.addEventListener('click', async ()=>{
    if(deferredPrompt){
        deferredPrompt.prompt();
        const response = await deferredPrompt.userChoice;
        if(response.outcome === 'dismissed'){
            console.log('El usuario canceló la instalación');
        }
    }
})
