const { response, request } = require('express');
const Favorito = require('../models/fav');
const cloudinary = require('cloudinary').v2;

//Get para traer todos los productos
const favoritesGet = async (req = request, res = response) => {
    const { id } = req.params
    const{favorit,compra } = req.body;
    const query = {favorit: favorit,compra:compra, usuario:id};
    
    const [total, favoritos] = await Promise.all([
        Favorito.countDocuments(query),
        Favorito.find(query)
            
     /*        .populate('usuario','correo') */
            .populate('producto')
             
        
            
    ]);

    res.json({

        msg: 'Favoritos obtenidos',
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


//Modificar favorito
const favPut = async (req=request, res=response) => {
    const {id} = req.params;
    const{favorit,compra } = req.body;

    const usuario = req.usuario_id;
    

    let data ={
        favorit,compra
    };

    

    const producto = await Favorito.findByIdAndUpdate(id, data);

    res.status(201).json({
        msg: 'El Articulo se actualizo correctamente',
        producto
    });
}








//Eliminar un producto
const favoritesDelete = async (req = request, res = response) => {
    const { id } = req.params;

    const eliminar= await Favorito.findByIdAndDelete(id);

    res.json({
        msg: `El articulo se quito correctamente de favoritos`
    });
};

module.exports = {
    favoritesGet,
    favoritesPost,
    favPut,
    favoritesDelete
};