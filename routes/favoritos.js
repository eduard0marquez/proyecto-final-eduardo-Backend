const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validar-jwt');
const { favoritoExiste } = require('../helpers/db-validators');
const { favoritosGet, favoritoPost, favoritoPut, favoritoDelete } = require('../controllers/favoritos');

const router = Router();

router.get('/',[
    validarJWT
],
    favoritosGet);

        router.post('/', [
            validarJWT,
            validarCampos
        ],
            favoritoPost);
            
        
            router.put('/:id', [
                validarJWT,
                check('id', 'No es un Id válido').isMongoId(),
                check('producto').custom(favoritoExiste),
                validarCampos
            ],
            favoritoPut);
            
            router.delete('/:id', [
                validarJWT,
                check('id', 'No es un Id válido').isMongoId(),
                check('producto').custom(favoritoExiste),
                validarCampos
            ],
                favoritoDelete);
                module.exports = router