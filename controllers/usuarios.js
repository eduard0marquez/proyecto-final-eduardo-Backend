const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuarioGet = async (req = request, res = response) => {
    const {desde = 0, limite = 5} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(desde).limit(limite)
    ]);
    res.json({
        mensaje: "Usuarios obtenidos",
        total,
        usuarios
    });
    
}
const usuarioGetID = async (req = request, res = response) => {
    const { id } = req.params;
    //se guardan los datos del usuario que se encotraron con el ID
    const usuario = await Usuario.findById(id)
    
    res.json({
        mesange: "Usuario Obtenido",
        usuario
    })
}

const usuarioPost = async (req = request, res = response) => {
    //Recibir el cuerpo de la peticion (front)
    const datos = req.body;
   
    //se destructura lo que viene de datos
    const { nombre, apellido, email, password, direccion, fechaNacimiento } = datos;
    //se crea una nueva instancia para que los datos formen parte del modelo
    const usuario = new Usuario({ nombre, apellido, email, password, direccion, fechaNacimiento });
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    usuario.password = hash;

    //Guardar los datos en la BD
    await usuario.save();
    res.json({
        mensaje: "Usuario cargado correctamente",usuario
        

    })
}
const usuarioPut = async (req = request, res = response) => {
    const { id } = req.params;

    //Obtener datos para actualizar
    const { password, correo,direccion,fechaNacimiento, ...resto } = req.body;

    //si se actualiza el password, se tiene que encriptar
    if (password) {
        //10 son bas vueltas que se encriptara
        const salt = bcrypt.genSaltSync(10);
        //resto porque es una modificacion y pasword porque es la propiedad que se encriptara
        resto.password = bcrypt.hashSync(password, salt);
    }
    //modificacion de los datos
    resto.email = correo;
    resto.password = password;
    resto.direccion = direccion;
    resto.fechaNacimiento = fechaNacimiento;

    //buscar al usuario y actualizarlo
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });
    
    res.json({
        mesanje: "Usuario actualizado correctamente",
        usuario
    })
    
    
}
const usuarioDelete = async (req = request, res = response) => {
    //El usuario no se eliminara, solo se inhabilitara 
    const { id } = req.params;
    //Se obtiene el id del usuario

    const usuario = await Usuario.findById(id);

    if (!usuario.estado) {
        return res.json({
            mesanje:"Usuario no existe"
        })
    }
    const usuarioInhabilitado = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json({
        mesanje: "Usuario Eliminado",
        usuarioInhabilitado
    })
    
}

module.exports = {
    usuarioGet,
    usuarioGetID,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}