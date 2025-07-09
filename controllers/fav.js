const { response, request } = require('express');
const Favorito = require('../models/fav');
const cloudinary = require('cloudinary').v2;

//Get para traer todos los productos
const favoritesGet = async (req = request, res = response) => {
    const { id } = req.params
    const query = {favorit: true, usuario:id};
    
    const [total, favoritos] = await Promise.all([
        Favorito.countDocuments(query),
        Favorito.find(query)
            
     /*        .populate('usuario','correo') */
            .populate('producto')
             
        
            
    ]);

    res.json({

        msg: 'Favoritos obtenidos'+id,
        total,
        favoritos,
    })
};
//Get para traer todos los productos
const shopGet = async (req = request, res = response) => {
    const  {usuar}  = req.params
    const query = {compra: true, usuario:usuar};
    
    const [total, favoritos] = await Promise.all([
        Favorito.countDocuments(query),
        Favorito.find(query)
            
     /*        .populate('usuario','correo') */
            .populate('producto')
             
        
            
    ]);

    res.json({

        msg: 'Favoritos obtenidos'+id,
        total,
        favoritos,
    })
};




//Crear un favorito
const favoritesPost = async (req = request, res = response) => {
    try {
        const { producto, favorit, compra } = req.body;

        const data = {
            producto,
            favorit,
            compra,
            usuario: req.usuario._id,
        };

        // Verificar si ya existe el favorito con el mismo producto y usuario
        const favoritoExistente = await Favorito.findOne({
            producto: data.producto,
            usuario: data.usuario,
        });

        if (favoritoExistente) {
            return res.status(400).json({
                msg: 'Este articulo ya está en favoritos.',
                favorito: favoritoExistente,
            });
        }

        // Crear nuevo favorito
        const favorito = new Favorito(data);
        await favorito.save();

        res.status(201).json({
            msg: 'Producto agregado con éxito!',
            favorito,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error interno al agregar favorito',
            error,
        });
    }
};


//Eliminar un producto
const favoritesDelete = async (req = request, res = response) => {
    const {id} = req.params;

    const eliminar= await Producto.findByIdAndDelete(id);

    res.json({
        msg: `El producto ${eliminar} se elimino correctamente`,
        productoInactivo
    });
};

module.exports = {
    favoritesGet,
    shopGet,
    favoritesPost,
    favoritesDelete
};