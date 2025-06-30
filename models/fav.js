const { Schema, model } = require('mongoose');

const FavoritosSchema = Schema({
    
    favorit: { type: Boolean, default: false },
    compra: { type: Boolean, default: false },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
});

//  Índice único para evitar que un mismo usuario agregue dos veces el mismo producto como favorito
FavoritosSchema.index(
    { nombre: 1 },
    { unique: true, partialFilterExpression: { nombre: { $type: "string" } } }
  );

module.exports = model('Favorito', FavoritosSchema);