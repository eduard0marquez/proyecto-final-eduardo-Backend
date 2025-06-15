const { response, request } = require('express');
const Favorito = require('../models/favoritos');

const favoritosGet = async (req = request, res = response) => {
    //Obtener todas las categorías 
    const { desde = 0, limite = 5 } = req.query;
    const query = { estado: true }
    
    const [total, favoritos] = await Promise.all([
        Favorito.countDocuments(query),
        Favorito.find(query)
            .skip(desde)
            .limit(limite)
    ])

    res.json({
        msg:'Favoritos obtenidos',
        total,
        categorias,
        
    })
}


const favoritoPost = async (req = request, res = response) => {
         const favoritoDB= await Producto.findOne({nombre});
        const nombre= req.body.nombre.toUpperCase();

        //Verificar si la categoria existe
        const categoriaBD = await Categoria.findOne({ nombre });

        if (categoriaBD) {
            res.status(400).json({
                msg:`La categoria ${categoriaBD.nombre} ya existe`
            })
        };

        //Generar la data que vamos a guardar
        
        const data = {nombre,descripcion,usuario:req.usuario._id}
        const categoria = new Categoria(data);
        await categoria.save();

        res.status(201).json({
            msg: `Categoría ${categoria.nombre} creada con éxito`,
            categoria
        })

    }