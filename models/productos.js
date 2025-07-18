const { Schema, model } = require('mongoose');
const  mongoosePaginate  =require('mongoose-paginate-v2')

const ProductoSchema = Schema({
    nombre: {type: String, required: [true, 'El nombre es obligatorio'], unique:true},
    estado: {type: Boolean, required: true, default: true},
    precio: {type: Number},
    descripcion: { type: String },
    fabricante: {type: String},
    img: {type: String},
    destacado: {type: Boolean, default: false},
    stock: {type: Number, default: 0},
    fechaRegistro: {type: Date, default: Date.now},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario', required: true},
    categoria: {type: Schema.Types.ObjectId, ref: 'Categoria', required: true}
})
ProductoSchema.plugin(mongoosePaginate)

module.exports = model ('Producto', ProductoSchema);