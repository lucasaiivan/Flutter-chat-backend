
const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuarioConectado = async ( uid = '' ) => {
    
    const usuario = await Usuario.findById(uid);
    usuario.online = true;

    await usuario.save();

    return usuario;
}
const usuarioDesconectado = async ( uid = '' ) => {
    
    const usuario = await Usuario.findById(uid);
    usuario.online = false;

    await usuario.save();

    return usuario;
}

const grabarMensaje = async ( payload ) => {

    /*
        payload: {
            de: '',
            para: '',
            mensaje: ''
        }
    */

    try{

        const mensaje = Mensaje(payload);
        // grabar en la db
        await mensaje.save();

        return true;
        
    }catch(err){
        return false;
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}