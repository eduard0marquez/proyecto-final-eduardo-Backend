const { response, request } = require('express');
//Se importan los modelos
const Favorito = require('../models/favoritos');


const favoritosGet = async (req = request, res = response) => {
    //Obtener todas las categorías 
    
    
    const [total, favoritos] = await Promise.all([
        Favorito.countDocuments(),
        Favorito.find()
            .skip(desde)
            .limit(limite)
    ])

    res.json({
        msg:'Favoritos obtenidos',
        total,
        favoritos,
        
    })
}

const favoritoPost = async (req = request, res = response) => {
    const { producto,nombre } = req.body;
    
    
        //Verificar si el favorito existe
        const favoritoBD = await Favorito.findOne({ producto });

        if (favoritoBD) {
            res.status(400).json({
                msg:`El favorito ${favoritoBD.producto} ya existe`
            })
        };

        //Generar la data que vamos a guardar
        
        const data = {producto,usuario:req.usuario.uid}
        const favorito = new Favorito(data);
        await favorito.save();

        res.status(201).json({
            msg: `Producto ${Favorito.producto.id} agregado con éxito`,
            favorito
        })

    }
    
    const favoritoPut = async (req = request, res = response) => {
        const { id } = req.params;
        const nombre = req.body.nombre.toUpperCase();
        const usuario = req.usuario._id;

        const data = {
            nombre,
            usuario
        }

        const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

        res.status(201).json({
            categoria,
            msg:'Categoria actualizada correctamente'
        })
    }
    const favoritoDelete = async (req = request, res = response) => {
        const { id } = req.params;
        const categoriaInactiva = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
        res.json({
            categoriaInactiva,
            msg:'La categoría fue eliminada correctamente | inactiva'
        })
    }

module.exports = {
    favoritosGet,
    favoritoPost,
    favoritoPut,
    favoritoDelete
}