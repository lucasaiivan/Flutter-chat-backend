const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index'); 
const {usuarioConectado,usuarioDesconectado,grabarMensaje} = require('../controllers/socket');

io.on('connection', client => { 
    console.log('Cliente conectado');
    // validate token
    const [validate,uid] = comprobarJWT(client.handshake.headers['x-token']);
    // verificar autenticación
    if(!validate){return client.disconnect();}
    // Cliente autenticado
    usuarioConectado(uid);

    // ingresar al usuario a una sala en particular
    // 1 - sala global (client.id)
    client.join(uid);
    
    // escuchar del cliente el mensaje personal 
    client.on('mensaje-personal', async (payload) => {
        //console.log(payload);
        // guardar en db
        await grabarMensaje(payload);
        // emitir 
        io.to(payload.para).emit('mensaje-personal',payload);
    });

    client.on('disconnect',() => { 
        console.log('Cliente desconectado'); 
        usuarioDesconectado(uid);
    
    }); 
}); 