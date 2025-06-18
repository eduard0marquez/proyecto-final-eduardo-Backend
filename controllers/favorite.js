const { response, request } = require('express');
const Favorito = require('../models/favoritos');
const cloudinary = require('cloudinary').v2;

//Get para traer todos los productos
const favoritesGet = async (req=request, res=response) => {
    const {desde = 0, limite = 5} = req.query;
   

    const [total, favoritos] = await Promise.all([
        Favorito.countDocuments(),
        Favorito.find()
            .skip(Number(desde))
            .limit(Number(limite))
     /*        .populate('usuario','correo') */
            .populate('producto'),
             
        
            
    ]);

    res.json({
        msg: 'Favoritos obtenidos',
        total,
        favoritos,
    })
};




//Crear un favorito
const favoritesPost = async (req=request, res=response) => {
    const {producto} = req.body;
    const favoritosDB= await Favorito.findOne(producto);

    

    //validar si el 
    if(favoritosDB){
        return res.status(400).json({
            msg: `El producto ${favoritosDB.id} ya existe`,
        })
    }

    //Generar los datos a guardar en DB del producto
    const data = { producto,  usuario:usuario._id}

    const favorito = new Favorito(data)

    //Grabar en BD
    await favorito.save();

    res.status(201).json({
        msg: 'Producto agregado con éxito!',
        favorito,
    });
}


//Inhabilitar un producto
const favoritesDelete = async (req, res) => {
    const {id} = req.params;

    const productoInactivo = await Producto.findByIdAndUpdate(id, {estado: false}, {new:true});

    res.json({
        msg: `El producto ${productoInactivo.nombre} se elimino correctamente`,
        productoInactivo
    });
};

module.exports = {
    favoritesGet,
    favoritesPost,
    favoritesDelete
};