const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validar-jwt');
const { favoritoExiste } = require('../helpers/db-validators');
const { favoritesGet, favoritesPost, favoritesDelete,shopGet} = require('../controllers/fav');


const router = Router();

router.get('/:id', favoritesGet);

router.get('/:usuario', shopGet);

router.post('/',
    [
        validarJWT,
        
    ],
    favoritesPost
);



router.delete('/:id',
    [
        validarJWT,
        check('id', 'El id no es válido').isMongoId(),
        check('id').custom(favoritoExiste),
      
    ],
    favoritesDelete
);

module.exports = router;