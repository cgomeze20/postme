//empezando a trabajar con node express body-parser y web-push

const express = require('express')
const webPush = require('web-push')
const bodyparser = require('body-parser')
const path = require('path')


const app = express()

app.use(bodyparser.json())

app.use(express.static(path.join(__dirname,'public')))



const publicVapidKey = 'BA74k-MUv44qCQ-0RVLwdXQrk-1tsHaPEn_hXwgJ3S7ij1SVQi1xP0a7FysQiDv1pk1TFWvglGcAKkRNwKX8kI0';
const privateVapidKey = '6UIyL4GkjJTDEHfYqZbiwfat4Nex8OK_iZ4nBMwfJO0';

webPush.setVapidDetails('mailto:carlosandres675@gmail.com',publicVapidKey,privateVapidKey);

app.get('/',(req,res)=>{
    res.send('funcionando correctamente')
});

app.post('/subscribe',(req,res)=>{
    const subscription = req.body

    res.status(201).json({});

    const payload = JSON.stringify({
        title: 'Notification desde tu backend',
        body: 'Este es el cuerpo de la notificacion pero desde un backend'
    });

    webPush.sendNotification(subscription,payload)
    .catch(error => console.log(error));
});

app.post('/message',async (req,res) => {

    const mensaje = req.body;

    const payload = JSON.stringify({
        title: 'CG Notification',
        body: 'Tienes una nueva Notificación'
    })

    try {
        await webPush.sendNotification(mensaje,payload);
        // console.log(req.body);
        
    } catch (error) {
        console.log(error);
    }
})





app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
    console.log(`server running on ${server.address().port}`);
})
