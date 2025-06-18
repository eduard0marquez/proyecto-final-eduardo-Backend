const { Schema, model } = require('mongoose');

const FavoritosSchema = Schema({
    nombre: {type: String, required: [false, 'El nombre es obligatorio'], unique:true},
    estado: {type: Boolean, required: false, default: true},
    precio: {type: Number, default: 0},
    descripcion: { type: String },
    fabricante: {type: String},
    img: {type: String},
    destacado: {type: Boolean, default: false},
    stock: {type: Number, default: 0},
    fechaRegistro: { type: Date, default: Date.now },
    favorito:{type:Boolean},
    compra:{type:Boolean},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario', required: false},
    categoria: {type: Schema.Types.ObjectId, ref: 'Categoria', required: false}
})


module.exports = model('Favoritos', FavoritosSchema);