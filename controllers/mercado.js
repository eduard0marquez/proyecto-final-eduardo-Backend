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
    const {categoria,descripcion, precio,fabricante, img, stock,favorito,compra} = req.body;
        const nombre = req.body.nombre.toUpperCase();
        const productoDB = await Producto.findOne({ nombre });
       
    //Subir imagen a Cloudinary
    const result = await cloudinary.uploader.upload(img);
    const imagen = result.secure_url;
    
        //validar si el producto existe
        if(productoDB){
            return res.status(400).json({
                msg: `El producto ${productoDB.nombre} ya existe`,
            })
        }
    
        //Generar los datos a guardar en DB del producto
        const data = { title, quantity, unit_price, currency_id:"MXN"}
    
        const producto = new Producto(data)
    
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