const { response, request } = require('express');
const Categoria = require('../models/categoria_producto');

const categoriasGet = async (req = request, res = response) => {
    //Obtener todas las categorías 
    const { desde = 0, limite = 5 } = req.query;
    const query = { estado: true }
    
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(desde)
            .limit(limite)
    ])

    res.json({
        msg:'Categorías obtenidas',
        total,
        categorias,
        
    })
}

const categoriaGet = async (req = request, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre apellido email');

    res.json({
        msg: 'Categoría obtenida según pedido del usuario',
        categoria
    })
}


const categoriaPost = async (req = request, res = response) => {
    const { descripcion } = req.body;
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
    
const categoriaPut = async (req = request, res = response) => {
    const { descripcion } = req.body;
        const { id } = req.params;
        const nombre = req.body.nombre.toUpperCase();
        const usuario = req.usuario._id;

        const data = {
            nombre,
            usuario,
            descripcion
        }

        const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

        res.status(201).json({
            categoria,
            msg:'Categoria actualizada correctamente'
        })
    }
    const categoriaDelete = async (req = request, res = response) => {
        const { id } = req.params;
        const categoriaInactiva = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
        res.json({
            categoriaInactiva,
            msg:'La categoría fue eliminada correctamente | inactiva'
        })
    }

module.exports = {
    categoriaGet,
    categoriasGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete
}