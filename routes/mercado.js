const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validar-jwt');
const { favoritoExiste } = require('../helpers/db-validators');
const { mercadoGet,mercadoPost } = require('../controllers/mercado');




const router = Router();

router.get('/', mercadoGet);

router.post('/create_preference',mercadoPost);

module.exports = router;