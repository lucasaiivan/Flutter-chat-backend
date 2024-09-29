const {response} = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async ( req,res = response ) => {

    // paginacion
    const desde = Number(req.query.desde) || 0;

    // obtenemos todos los usuarios 
    const usuario = await Usuario
        .find({_id:{$ne:req.uid}})
        .sort('-online')
        .skip(desde)
        .limit(20);

    // enviar una respuesta al cliente
    res.json({
        ok:true,
        usuarios:usuario, 
    });

}

module.exports = {
    getUsuarios
}