const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
const { categoriaExiste } = require('../helpers/db-validators');
const { favoritosGet, categoriaGet, favoritoPost, categoriaPut, categoriaDelete } = require('../controllers/favoritos');

const router = Router();

router.get('/',[
    validarJWT
],
    favoritosGet);

    router.get('/:id', [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(favoritoExiste),
        validarCampos
    ], 
        favoritosGet);
    

        router.post('/', [
            validarJWT,
            validarCampos
        ],
        favoritoPost);