const { request, response } = require('express');

const esAdminRole = (req = response, res = response) => {
    if (!req.usuario) {
        //No validamos el tocken antes
        return res.status(500).json({
            msg:"se requiere validar el rol sin validar el token"
        })
        
    }
    const { rol, nombre, apellido } = req.usuario;
    if (rol !== "Admin") {
        return res.status(401).json({
            msg: `${nombre} ${apellido} no es Administrador del sistema`
        });
    }
}

module.exports = {
    esAdminRole
}