/*
    Path: /api/mensaje
*/

const {Router} = require('express');
const { validarJWT } = require('../middelewares/validar-jwt'); 
const { obtenerChat } = require('../controllers/mensajes'); 
const router = Router();

router.get(
    '/:de',
    validarJWT,
    obtenerChat
);


module.exports = router;