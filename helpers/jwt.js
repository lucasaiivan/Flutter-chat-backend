const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

     return new Promise((resolve,reject) => {

        const payload = { uid }

        jwt.sign(payload,process.env.JWT_KEY,{
            expiresIn:'24h'
        },(err,token) => {
            if(err){
                // no se pudo crear el token
                reject('No se puedo crear el JWT');
            }else{
                // se creo el token 
                resolve(token);
            }
        });

     });

    
}
const comprobarJWT = ( token = '' ) => {
    try{ 
        // validar token 
        const {uid} = jwt.verify(token,process.env.JWT_KEY); 
        return [true,uid];
    }catch(err){
        return [false,null]

    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}