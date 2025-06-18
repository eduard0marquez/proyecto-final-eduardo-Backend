const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    like: { type: Boolean },
    compra: { type: Boolean },
    usuario:{type:Schema}
    
})