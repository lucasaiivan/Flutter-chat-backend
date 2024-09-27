const {response} = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req,res=response) => {

    const {email} = req.body;

    try{

        // verificamos el email
        const existEmail = await  Usuario.findOne({email});
        if(existEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya axiste'
            });
        }

        const usuario = new Usuario(req.body);

        // encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(usuario.password,salt);

        // guardamos el nuevo usuario en la base de datos
        await usuario.save(); 

        // generar mi JWT (Json Web Token)
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }

    
}

const login = async (req,res=response) => {

    const {email,password} = req.body;

    try{
        // verificamos el email
        const usuarioDB = await  Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }
        // validar el password 
        const validPassword = bcrypt.compareSync(password,usuarioDB.password);
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }
        // generate GWT
        const token = await generarJWT(usuarioDB.id);

        const usuario = new Usuario(req.body);
        res.json({ 
            message: 'Inicio de sesión exitoso',
            usuario : usuarioDB ,
            token
        });

 

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }

    
}

const renewToken = async (req,res = response) => {

    // obtenemos el [uid]
    const uid = req.uid;
    // generar nuevo JWT
    const token = await generarJWT(uid);
    // obtenemos el usuario por el [uid]
    const usuario = await  Usuario.findById(uid);


    res.json({
        ok:true,
        usuario, 
        token
    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}