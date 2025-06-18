const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    apellido: { type: String, required: [true, 'El nombre es obligatorio'] },
    email: { type: String, required: [true, 'El email es obligatorio'], unique: true },
    password: { type: String, required: [true, 'La contraseña es obligatorio'] },
    direccion: { type: String, required: [true, 'La direccion es obligatoria'] },
    fechaNacimiento: { type: Date,required: [true,'la fecha de nacimiento es obligatoria']},
    rol: { type: String,default:"Cliente"},
    img: { type: String },
    fechaRegistro:{type:Date,default:Date.now},
    estado: { type: Boolean, default: true }
    
});


module.exports = model("Usuario", UsuarioSchema);