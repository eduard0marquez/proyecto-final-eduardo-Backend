const { response, request, Router } = require('express');
const Mercado = require('../models/mercado');
const mercadopago=require('mercadopago');

const { MercadoPagoConfig, Preference }=require ('mercadopago');

//Get para traer todos los productos
const mercadoGet = async (req = request, res = response) => {
    const Preference = {
        items: [
            {
              
            }
        ]
    }

        res.json({
        msg: 'Server Arribaa',
        
    })
};



//Crear un favorito
const mercadoPost = async (req = request, res = response) => {
    const {title, quantity, unit_price,currency_id} = req.body;
               
        //Generar los datos a guardar en DB del producto
        const data = { title, quantity, unit_price,currency_id:"MXN"}
    
        const producto = new Mercado(data)
    
        //Grabar en BD
        await producto.save();
    
        res.status(201).json({
            msg: 'Producto creado con éxito!',
            producto,
        });
};











module.exports = {
    mercadoGet,
    mercadoPost,
};