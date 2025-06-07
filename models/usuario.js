const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    apellido: { type: String, required: [true, 'El nombre es obligatorio'] },
    email: { type: String, required: [true, 'El email es obligatorio'], unique: true },
    password: { type: String, required: [true, 'La contraseña es obligatorio'] },
    img: { type: String },
    direccion: { type: String, required: [true, 'La direccion es obligatoria'] },
    fechaNacimiento: { type: Date },
    rol: { type: String, required: true },
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