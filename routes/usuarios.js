const { Router } = require('express');
const { check } = require('express-validator');
const { usuarioGet, usuarioGetID, usuarioPost, usuarioDelete, usuarioPut } = require('../controllers/usuarios');
const { emailExiste, esRolValido, usuarioExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();
router.get('/', [
    validarJWT,
    esAdminRole
],
    usuarioGet);

router.get('/:id', [
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(usuarioExiste), validarCampos
], usuarioGetID);

router.post('/', [
    //notEmpty es para validar que no este vacio 
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("apellido", "El apellido es obligatorio").notEmpty(),
    check("email").custom(emailExiste),
    check("password", "La contraseña debe tner un minimo de 8 catacteres").isLength({ min: 8 }),
    check("direccion", "La direccion es obligatoria").notEmpty(),
    check("fechaNacimiento","La fecha de Naciemiento es obligatoria").notEmpty(),
    validarCampos
], usuarioPost);

router.put('/:id',
    [
        validarJWT,
        check("id", "no es un ID valido").isMongoId(),
        check("id").custom(usuarioExiste),
        //check("rol").custom(esRolValido),
        validarCampos
    ],
    usuarioPut);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(usuarioExiste),
    validarCampos
],
    usuarioDelete);

module.exports = router;