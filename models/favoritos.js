const { Schema, model } = require('mongoose');

const FavoritosSchema = Schema({
    producto: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario', required: true},
    fechaRegistro: { type: Date, default: Date.now },
    
   
})

module.exports = model('Favoritos', FavoritosSchema);