const express = require('express');
const path = require('path');
const http = require('http');
require('dotenv').config();

// app de express
const app = express();

// node server
const server = http.createServer(app);
module.exports.io = require('socket.io')(server);
// mensajes de socket
require('./sockets/socket');

// path public
const publicPath = path.resolve(__dirname,'public');

app.use( express.static(publicPath));

server.listen(process.env.PORT ,(err) => {
    if(err) throw Error(err);

    console.log('Servidor corriendo en el puerto!!',process.env.PORT);
});