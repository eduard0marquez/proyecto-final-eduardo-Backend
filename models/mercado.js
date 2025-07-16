const { Schema, model } = require('mongoose');
const MercadoSchema = Schema({
    
    accessToken: { type: String, required: [true, 'El rol es obligatorio'] }
})

module.exports = model('Mercado', MercadoSchema);