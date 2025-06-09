const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    apellido: { type: String, required: [true, 'El nombre es obligatorio'] },
    email: { type: String, required: [true, 'El email es obligatorio'], unique: true },
    password: { type: String, required: [true, 'La contraseña es obligatorio'] },
    direccion: { type: String, required: [true, 'La direccion es obligatoria'] },
    fechaNacimiento: { type: Date,required: [true,'la fecha de nacimiento es obligatoria']},
    rol: { type: String, required: [true,'El rol es obligatorio'] },
    img: { type: String },
    fechaRegistro:{type:Date,default:Date.now},
    estado: { type: Boolean, default: true }
    
});
//Quitar datos extras en la respuesta JSON
UsuarioSchema.methods.toJSON = function () {
    const { __v, _id, password, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model("Usuario", UsuarioSchema);