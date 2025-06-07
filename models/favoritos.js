const { Schema, model } = require('mongoose');

const FavoritosSchema = Schema({
    fechaRegistro: { type: Date, default: Date.now },
    producto: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    categoria:{type:Schema.Types.ObjectId,ref:'Categoria',required:true}
})

module.exports = model('Favoritos', FavoritosSchema);