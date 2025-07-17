const { MercadoPagoConfig, Preference }=require ('mercadopago');

//Se crea una constante del archivo server
const { Router } = require('express');
const Server = require('./models/server');
//se exporta dontenv con el config
require('dotenv').config();
//Se crea una constante para Cloudinary(imagenes en la nube)
const cloudinary = require('cloudinary').v2;
//credenciales para cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.API_KEY_CLOUDIMARY,
    api_secret: process.env.API_SECRET_CLOUDINARY,
    secure: true

})
//Se crea una constante para Mercado Pago (pasarela de pago)

//credenciales para mercado pago


const mercadopago= new MercadoPagoConfig({
     access_token: process.env.ACCESS_TOKE,
})



//se crea una constante (objeto )nueva de la funcion server que ya pertenerce al archivo server
const server = new Server();
//se trae su accion.listen de la constante previamente declarada
server.listen();