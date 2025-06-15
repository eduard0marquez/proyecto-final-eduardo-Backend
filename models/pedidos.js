const { Schema, model } = require('mongoose');
const PedidosSchema = Schema({
    
    producto: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidad:{type: Number, default: 1},
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    fechaRegistro: { type: Date, default: Date.now },
    
})

module.exports = model('Favoritos', PedidosSchema);