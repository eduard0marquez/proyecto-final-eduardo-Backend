const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validar-jwt');
const { favoritoExiste } = require('../helpers/db-validators');
const { mercadoGet } = require('../controllers/mercado');




const router = Router();

router.get('/', mercadoGet);



module.exports = router;