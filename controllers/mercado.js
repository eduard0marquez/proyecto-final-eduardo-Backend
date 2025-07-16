const { response, request } = require('express');
const Mercado = require('../models/mercado');



//Get para traer todos los productos
const mercadoGet = async (req = request, res = response) => {
        res.json({
        msg: 'Server Arribaa',
        
    })
};



//Crear un favorito
const mercadoPost = async (req = request, res = response) => {
     
};











module.exports = {
    mercadoGet,
    mercadoPost,
};