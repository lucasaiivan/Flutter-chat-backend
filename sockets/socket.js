const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index'); 
const {usuarioConectado,usuarioDesconectado} = require('../controllers/socket');

io.on('connection', client => { 
    console.log('Cliente conectado');
    // validate token
    const [validate,uid] = comprobarJWT(client.handshake.headers['x-token']);
    // verificar autenticación
    if(!validate){return client.disconnect();}
    // Cliente autenticado
    usuarioConectado(uid);
    
    //console.log('Cliente autenticado');

    client.on('disconnect',() => { 
        console.log('Cliente desconectado'); 
        usuarioDesconectado(uid);
    
    }); 
}); 