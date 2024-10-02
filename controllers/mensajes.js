
const Mensaje = require('../models/mensaje');

const obtenerChat = async(req,res) => {

    const miId = req.uid;
    const mensajeDe = req.params.de;

    // cargamos los ultimos 30 mensajes 
    const last30 = await Mensaje.find({
        // condicional : para devolver los registros relacionados 
        $or: [{de:miId,para:mensajeDe},{de:mensajeDe,para:miId}]
    }).sort({createdAt: 'desc'}).limit(30);

    res.json({
        ok: true,
        msg:'Hola mensaje',
        mensajes: last30
    });

}
module.exports = {
    obtenerChat
}