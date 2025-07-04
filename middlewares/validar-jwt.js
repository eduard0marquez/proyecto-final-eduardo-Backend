const { reques, reponse, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    //Preguntar si enviaron el token
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    //Si envio en token
    try {
        //Verificar el token y obtener el uid
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //Obtener los datos del usuario autenticado (uid)
        const usuario = await Usuario.findById(uid);
        //Validar si existe el usuario
        if (!usuario) {
            return res.status(401).json({
                msg:'Token no valido - el usuario no existe'
            })
        }
        //Validar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(401).json({
                msg:'Token no valido - usuario inactivo'
            })
        }
        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no válido'
        })
        
   }
}

module.exports = {
    validarJWT
}