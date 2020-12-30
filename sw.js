self.addEventListener('install',(e)=>{
    console.log('SW install...');
});
self.addEventListener('activate',async(e)=>{
    console.log('SW Activate....');
});
self.addEventListener('fetch',(e)=>{
    console.log('SW Fetch....');
})