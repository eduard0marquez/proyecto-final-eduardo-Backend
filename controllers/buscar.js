const { response, request } = require('express');

//Importar los modelos

const Producto = require('../models/productos');

//Definir las colecciones permitidas 
const coleccionesPermitidas = [ 'productos'];




//Buscar Productos
const buscarProductos = async (termino, res = response) => {
    const regex = new RegExp(termino, "i");

    const productos = await Producto.find({
        $or: [{ nombre: regex }, { descripcion: regex },{fabricante: regex}],
        $and: [{ estado: true }],
    });

    res.json({
        msg: 'Productos encontrados',
        results: productos,
    })
}

//Función principal para las búsquedas
const buscar = (req = request, res = response) => {
    const { coleccion, termino } = req.params;

    //Validar la colección
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
        });
    }

    //En función de la colección, buscar por el termino
    switch (coleccion) {
        
        case 'productos':
            buscarProductos(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Hubo un error al hacer la búsqueda',
            });
            break;
    }
}

module.exports = {
    buscar
}